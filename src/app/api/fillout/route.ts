import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { generateAIAssessment } from '@/lib/openai'
import { conductGeminiResearch } from '@/lib/gemini'
import { analyzeWithCrewAI, parseCrewAIOutput } from '@/lib/crewai'
import { parseIndustry } from '@/lib/industries'
import { calculateAIMaturity } from '@/lib/ai-maturity'

// Toggle between AI providers
const USE_GEMINI_RESEARCH = process.env.USE_GEMINI === 'true'
const USE_CREWAI = process.env.USE_CREWAI === 'true'

/**
 * Helper function to normalize field values
 * If it's an array with one item, return that item as string
 * If it's an array with multiple items, join with commas
 * Otherwise return as is
 */
function normalizeFieldValue(value: unknown): string | null {
  if (value === null || value === undefined) return null
  if (Array.isArray(value)) {
    if (value.length === 0) return null
    if (value.length === 1) return String(value[0])
    return value.join(', ')
  }
  return String(value)
}

/**
 * Background function to process assessment with AI
 */
async function processAssessmentWithAI(
  assessmentId: string,
  data: {
    // Profile
    companyName: string
    website: string | null
    industry: string
    country: string | null
    companySize: string
    role: string | null
    
    // Problems
    strategicThreats: unknown[]
    currentChallenges: string
    
    // Goals
    primaryGoal: string | null
    topKPI: string | null
    urgency: string | null
    goals: string
    
    // AI Maturity - NEW
    currentAIUsage: string | null
    aiCapabilities: unknown[]
    dataQuality: string | null
    aiTalent: string | null
    aiBudget: string | null
    aiStrategy: string | null
  }
) {
  try {
    const aiProvider = USE_GEMINI_RESEARCH ? 'Gemini Research + OpenAI Strategy' : (USE_CREWAI ? 'CrewAI' : 'OpenAI')
    console.log(`🤖 Starting AI processing for assessment: ${assessmentId} (using ${aiProvider})`)

    // Calculate AI Maturity Score FIRST
    console.log('📊 Calculating AI Maturity Score...')
    const maturityResult = calculateAIMaturity({
      // Context
      industry: data.industry,
      companySize: data.companySize,
      strategicThreats: data.strategicThreats,
      currentChallenges: data.currentChallenges,
      primaryGoal: data.primaryGoal,
      topKPI: data.topKPI,
      urgency: data.urgency,
      goals: data.goals,
      // AI Maturity (from form)
      currentAIUsage: data.currentAIUsage,
      aiCapabilities: data.aiCapabilities,
      dataQuality: data.dataQuality,
      aiTalent: data.aiTalent,
      aiBudget: data.aiBudget,
      aiStrategy: data.aiStrategy,
    })
    
    console.log(`✅ AI Maturity Score calculated: ${maturityResult.score}/100 (${maturityResult.level})`)

    let aiResult
    let crewaiReport: string | null = null

    if (USE_GEMINI_RESEARCH) {
      // HYBRID APPROACH: Gemini Research → OpenAI Strategy
      console.log('🔍 Phase 1: Conducting Gemini Deep Research...')
      const researchResult = await conductGeminiResearch(data)
      
      console.log('✅ Gemini research complete:', {
        hasIndustryInsights: !!researchResult.industryInsights,
        hasCompetitorAnalysis: !!researchResult.competitorAnalysis,
        keyOpportunities: researchResult.keyOpportunities.length,
        successCases: researchResult.successCases.length,
      })
      
      console.log('🤖 Phase 2: Generating AI Strategy with OpenAI (using research context)...')
      aiResult = await generateAIAssessment(data, researchResult)
      
      console.log('✅ Hybrid analysis complete:', {
        projects: aiResult.topProjects.length,
      })
    } else if (USE_CREWAI) {
      // Use CrewAI (5-agent crew)
      console.log('🚀 Calling Surfing Digital AI Profit Crew...')
      const crewResult = await analyzeWithCrewAI(data)
      
      if (!crewResult.success || !crewResult.output) {
        throw new Error('CrewAI analysis failed')
      }
      
      // Store the full markdown report
      crewaiReport = crewResult.output
      
      // Parse the output to extract structured data
      aiResult = parseCrewAIOutput(crewResult.output)
      
      console.log('✅ CrewAI analysis complete:', {
        projects: aiResult.topProjects.length,
        reportLength: crewaiReport.length,
      })
    } else {
      // Use OpenAI only (single agent, no research)
      console.log('🤖 Calling OpenAI GPT-4o-mini (standalone)...')
      aiResult = await generateAIAssessment(data)
      
      console.log('✅ OpenAI analysis complete:', {
        projects: aiResult.topProjects.length,
      })
    }

    // Update assessment with AI results AND maturity score
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        topProjects: aiResult.topProjects as unknown as Prisma.InputJsonValue,
        roiEstimates: {
          project1: aiResult.topProjects[0]?.estimatedROI || 'N/A',
          project2: aiResult.topProjects[1]?.estimatedROI || 'N/A',
          project3: aiResult.topProjects[2]?.estimatedROI || 'N/A',
        } as unknown as Prisma.InputJsonValue,
        actionPlan: aiResult.actionPlan as unknown as Prisma.InputJsonValue,
        crewaiReport: crewaiReport, // Store full CrewAI report if used
        aiMaturityScore: maturityResult.score, // NEW
        aiMaturityLevel: maturityResult.level, // NEW
        status: 'completed', // ✅ Marca como completado cuando AI termina
      },
    })

    console.log(`✅ Assessment updated with ${USE_CREWAI ? 'CrewAI' : 'OpenAI'} results:`, assessmentId)
  } catch (error) {
    console.error('❌ AI processing failed:', error)
    
    // Update status to failed
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { status: 'failed' },
    })
  }
}

/**
 * Fillout Webhook Handler
 * 
 * This endpoint receives form submissions from Fillout.com
 * when a user completes the AI assessment form.
 * 
 * POST /api/fillout
 */
export async function POST(req: NextRequest) {
  try {
    // Validate secret parameter for security
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')
    const expectedSecret = process.env.FILLOUT_WEBHOOK_SECRET || 'super_secret_123'
    
    if (secret !== expectedSecret) {
      console.warn('⚠️ Invalid webhook secret attempt')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Parse the incoming webhook payload
    const payload = await req.json()
    
    console.log('📝 Fillout webhook received:', JSON.stringify(payload, null, 2))

    // Extract form data from Fillout payload
    const {
      formId,
      formName,
      submission = {},
    } = payload

    const {
      submissionId = '',
      submissionTime = '',
      questions = [],
    } = submission

    // Map Fillout questions to our data structure
    const formData: Record<string, unknown> = {}
    if (questions && Array.isArray(questions)) {
      console.log(`📊 Processing ${questions.length} questions:`)
      questions.forEach((q: { id: string; name: string; value: unknown; type: string }, index: number) => {
        // Fillout sends: { id, name, value, type }
        console.log(`  Question ${index + 1}:`, {
          id: q.id,
          name: q.name,
          value: q.value,
          type: q.type
        })
        const key = q.name || q.id
        formData[key] = q.value
      })
    } else {
      console.log('⚠️ No questions array found or not an array')
    }
    
    console.log('🔍 Extracted form data:', formData)
    console.log('🔍 All formData keys:', Object.keys(formData))

    // Extract all 19 fields from Fillout (4 sections: Profile, Problems, Goals, AI Maturity)
    const {
      // Email (for user identification)
      Email,
      email,
      'Work email': workEmail,
      
      // PROFILE SECTION (6 fields)
      'Company Name': companyName,
      Website: website,
      'Select your primary Industry': industry,
      Industry: industryAlt,
      Country: country,
      'Company size': companySize,
      Role: role,
      
      // PROBLEMS SECTION (2 fields)
      'Pick up up to 3 strategic threats': strategicThreats,
      'What are your biggest problems as a business?': currentChallenges,
      
      // GOALS SECTION (4 fields) - Some may be multi-select
      'Primary Goal with AI?': primaryGoal,
      'Top KPI you want to move': topKPI,
      'Urgency for results': urgency,
      'What do you want to achieve with AI?': goals,
      
      // AI MATURITY SECTION (6 fields) - NEW
      'What best describes your current AI/ML usage?': currentAIUsage,
      'Which of these AI capabilities does your company currently use?': aiCapabilities,
      'How would you rate your data quality and accessibility?': dataQuality,
      'Does your company have dedicated AI/Data Science talent?': aiTalent,
      'What\'s your annual budget for AI/ML initiatives?': aiBudget,
      'Do you have a formal AI strategy or roadmap?': aiStrategy,
    } = formData

    // Try to find email with different possible field names or by question type/regex
    const emailFromType = Array.isArray(questions)
      ? questions.find((q: { type?: string; value?: unknown }) => {
          const t = String(q?.type || '').toLowerCase()
          return t.includes('email')
        })?.value
      : undefined

    const emailFromRegex = Object.values(formData).find(
      (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    ) as string | undefined

    const emailValue = Email || email || workEmail || emailFromType || emailFromRegex
    
    console.log('🔍 Email found:', emailValue)

    // If this is a test webhook (no email), return success
    if (!emailValue) {
      console.log('⚠️ Test webhook or missing email - returning success')
      console.log('Available fields:', Object.keys(formData).join(', '))
      console.log('Email detection debug:', {
        Email,
        email,
        emailFromType,
        emailFromRegex,
      })
      return NextResponse.json(
        { 
          success: true, 
          message: 'Webhook endpoint is working. Email is required for actual submissions.',
          debug: {
            receivedFields: Object.keys(formData),
            questionsCount: questions?.length || 0
          }
        },
        { status: 200 }
      )
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: emailValue },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: emailValue,
          name: (formData.name as string) || (formData.Name as string) || null,
        },
      })
    }

    // Parse industry value (could be slug or label from Fillout)
    const industryValue = (industry as string) || (industryAlt as string)
    const parsedIndustry = industryValue ? parseIndustry(industryValue) : { label: null, slug: null }

    // Create assessment record with structured data
    const assessment = await prisma.assessment.create({
      data: {
        userId: user.id,
        
        // PROFILE SECTION
        companyName: (companyName as string) || null,
        website: (website as string) || null,
        industry: parsedIndustry.label || null,
        industrySlug: parsedIndustry.slug || null,
        country: (country as string) || null,
        companySize: companySize ? String(companySize) : null,
        role: (role as string) || null,
        
        // PROBLEMS SECTION
        strategicThreats: Array.isArray(strategicThreats) 
          ? (strategicThreats as unknown as Prisma.InputJsonValue)
          : ([] as unknown as Prisma.InputJsonValue),
        currentChallenges: (currentChallenges as string) || null,
        
        // GOALS SECTION (normalize in case they're multi-select now)
        primaryGoal: normalizeFieldValue(primaryGoal),
        topKPI: normalizeFieldValue(topKPI),
        urgency: normalizeFieldValue(urgency),
        goals: normalizeFieldValue(goals),
        
        // AI MATURITY SECTION - NEW (normalize text fields, preserve arrays)
        currentAIUsage: normalizeFieldValue(currentAIUsage),
        aiCapabilities: Array.isArray(aiCapabilities)
          ? (aiCapabilities as unknown as Prisma.InputJsonValue)
          : ([] as unknown as Prisma.InputJsonValue),
        dataQuality: normalizeFieldValue(dataQuality),
        aiTalent: normalizeFieldValue(aiTalent),
        aiBudget: normalizeFieldValue(aiBudget),
        aiStrategy: normalizeFieldValue(aiStrategy),
        
        // Store full form responses in structured JSON
        formResponses: {
          profile: {
            companyName: (companyName as string) || null,
            website: (website as string) || null,
            industry: parsedIndustry.label || null,
            industrySlug: parsedIndustry.slug || null,
            country: (country as string) || null,
            companySize: companySize ? String(companySize) : null,
            role: (role as string) || null,
          },
          problems: {
            strategicThreats: strategicThreats || [],
            currentChallenges: (currentChallenges as string) || null,
          },
          goals: {
            primaryGoal: (primaryGoal as string) || null,
            topKPI: (topKPI as string) || null,
            urgency: (urgency as string) || null,
            whatToAchieve: (goals as string) || null,
          },
          aiMaturity: {
            currentAIUsage: (currentAIUsage as string) || null,
            aiCapabilities: aiCapabilities || [],
            dataQuality: (dataQuality as string) || null,
            aiTalent: (aiTalent as string) || null,
            aiBudget: (aiBudget as string) || null,
            aiStrategy: (aiStrategy as string) || null,
          },
          metadata: {
            submissionId: submissionId || 'unknown',
            formId: formId || 'unknown',
            formName: formName || 'unknown',
            submissionTime: submissionTime || new Date().toISOString(),
          },
          rawData: formData,
        } as unknown as Prisma.InputJsonValue,
        
        status: 'in_progress',
      },
    })

    console.log('✅ Assessment created:', assessment.id)

    // Process with AI (in background - don't block response)
    processAssessmentWithAI(assessment.id, {
      // Profile
      companyName: (companyName as string) || 'Unknown Company',
      website: (website as string) || null,
      industry: parsedIndustry.label || 'General',
      country: (country as string) || null,
      companySize: companySize ? String(companySize) : '50',
      role: (role as string) || null,
      
      // Problems
      strategicThreats: Array.isArray(strategicThreats) ? strategicThreats : [],
      currentChallenges: (currentChallenges as string) || 'Not specified',
      
      // Goals (normalize in case they're multi-select)
      primaryGoal: normalizeFieldValue(primaryGoal),
      topKPI: normalizeFieldValue(topKPI),
      urgency: normalizeFieldValue(urgency),
      goals: normalizeFieldValue(goals) || 'Not specified',
      
      // AI Maturity - NEW (normalize text fields)
      currentAIUsage: normalizeFieldValue(currentAIUsage),
      aiCapabilities: Array.isArray(aiCapabilities) ? aiCapabilities : [],
      dataQuality: normalizeFieldValue(dataQuality),
      aiTalent: normalizeFieldValue(aiTalent),
      aiBudget: normalizeFieldValue(aiBudget),
      aiStrategy: normalizeFieldValue(aiStrategy),
    }).catch((error) => {
      console.error('❌ Error processing assessment with AI:', error)
    })

    // Get the base URL for the processing/results page
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const processingUrl = `${baseUrl}/processing?email=${encodeURIComponent(emailValue)}`
    const resultsUrl = `${baseUrl}/results/${assessment.id}`

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      userId: user.id,
      processingUrl: processingUrl, // ✨ Nueva URL para "Thank You Page"
      resultsUrl: resultsUrl,
      message: 'Assessment received and saved. AI processing started.',
    })

  } catch (error) {
    console.error('❌ Error processing Fillout webhook:', error)
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/fillout
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'fillout-webhook',
    message: 'Webhook is ready to receive POST requests',
  })
}

