import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateAIAssessment } from '@/lib/openai'

/**
 * Background function to process assessment with AI
 */
async function processAssessmentWithAI(
  assessmentId: string,
  data: {
    companyName: string
    industry: string
    companySize: string
    currentChallenges: string
    goals: string
  }
) {
  try {
    console.log('🤖 Starting AI processing for assessment:', assessmentId)

    // Generate AI recommendations
    const aiResult = await generateAIAssessment(data)

    console.log('🎯 AI processing complete:', {
      projects: aiResult.topProjects.length,
      assessmentId,
    })

    // Update assessment with AI results
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        topProjects: aiResult.topProjects,
        roiEstimates: {
          project1: aiResult.topProjects[0]?.estimatedROI || 'N/A',
          project2: aiResult.topProjects[1]?.estimatedROI || 'N/A',
          project3: aiResult.topProjects[2]?.estimatedROI || 'N/A',
        },
        actionPlan: aiResult.actionPlan,
        status: 'completed',
      },
    })

    console.log('✅ Assessment updated with AI results:', assessmentId)
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

    // Example: Extract specific fields - using the actual Fillout field names
    const {
      Email,
      email,
      'Company Name': companyName,
      Industry: industry,
      'Number of employees': companySize,
      'What are your current business challenges?': currentChallenges,
      'What goals do you want to achieve with AI?': goals,
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

    const emailValue = Email || email || emailFromType || emailFromRegex
    
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
          name: formData.name || formData.Name || null,
        },
      })
    }

    // Create assessment record
    const assessment = await prisma.assessment.create({
      data: {
        userId: user.id,
        companyName: companyName || null,
        industry: industry || null,
        companySize: companySize ? String(companySize) : null,
        currentChallenges: currentChallenges || null,
        goals: goals || null,
        status: 'in_progress',
        // Store full form data in JSON for reference
        topProjects: {
          submissionId: submissionId || 'unknown',
          formId: formId || 'unknown',
          formName: formName || 'unknown',
          submissionTime: submissionTime || new Date().toISOString(),
          rawData: formData,
          fullPayload: payload,
        },
      },
    })

    console.log('✅ Assessment created:', assessment.id)

    // Process with AI (in background - don't block response)
    processAssessmentWithAI(assessment.id, {
      companyName: companyName || 'Unknown Company',
      industry: industry || 'General',
      companySize: companySize ? String(companySize) : '50',
      currentChallenges: currentChallenges || 'Not specified',
      goals: goals || 'Not specified',
    }).catch((error) => {
      console.error('❌ Error processing assessment with AI:', error)
    })

    // Get the base URL for the results page
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const resultsUrl = `${baseUrl}/results/${assessment.id}`

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      userId: user.id,
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

