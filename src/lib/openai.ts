import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIProjectRecommendation {
  title: string;
  name?: string; // Alias for title
  description: string;
  estimatedROI: string;
  totalCost?: string; // Total implementation cost
  implementationCost?: string; // Alias for totalCost
  timeToImplement: string;
  priority: 'High' | 'Medium' | 'Low';
  benefits?: string[];
  assumptions?: string[]; // Key assumptions and hypotheses
  risks?: string[]; // Potential risks
  timeline?: {
    days30: string[];
    days60: string[];
    days90: string[];
  };
}

export interface AIAssessmentResult {
  topProjects: AIProjectRecommendation[];
  actionPlan: {
    days30: string[];
    days60: string[];
    days90: string[];
  };
  executiveSummary: string;
}

export async function generateAIAssessment(data: {
  // Profile
  companyName: string;
  website?: string | null;
  industry: string;
  country?: string | null;
  companySize: string;
  role?: string | null;
  
  // Problems
  strategicThreats?: unknown[];
  currentChallenges: string;
  
  // Goals
  primaryGoal?: string | null;
  topKPI?: string | null;
  urgency?: string | null;
  goals: string;
}): Promise<AIAssessmentResult> {
  const prompt = `You are an AI business consultant specializing in AI transformation for mid-size companies.

═══════════════════════════════════════════════
COMPANY PROFILE
═══════════════════════════════════════════════
Company Name: ${data.companyName}
Industry: ${data.industry}
Country: ${data.country || 'Not specified'}
Company Size: ${data.companySize} employees
Contact Role: ${data.role || 'Not specified'}
Website: ${data.website || 'Not provided'}

═══════════════════════════════════════════════
STRATEGIC PROBLEMS & THREATS
═══════════════════════════════════════════════
Strategic Threats Identified:
${data.strategicThreats && Array.isArray(data.strategicThreats) && data.strategicThreats.length > 0 
  ? data.strategicThreats.map((t, i) => `${i + 1}. ${t}`).join('\n') 
  : 'Not specified'}

Biggest Business Problems:
${data.currentChallenges}

═══════════════════════════════════════════════
GOALS & PRIORITIES
═══════════════════════════════════════════════
Primary Goal with AI: ${data.primaryGoal || 'Not specified'}
Top KPI to Move: ${data.topKPI || 'Not specified'}
Urgency for Results: ${data.urgency || 'Not specified'}

What They Want to Achieve with AI:
${data.goals}

═══════════════════════════════════════════════
YOUR TASK
═══════════════════════════════════════════════

Analyze this company's complete profile, strategic threats, and goals to provide:

1. **Top 3 AI Project Recommendations** (prioritized by ROI and feasibility)
   
   CRITICAL REQUIREMENTS for each project:
   - MUST directly address at least one of their Strategic Threats
   - MUST align with their Primary Goal with AI
   - MUST impact their Top KPI
   - MUST be achievable within their Urgency timeframe
   - MUST be viable for their industry, company size, and country context
   
   For EACH project, provide:
   - **Title**: Concise, business-focused name (e.g., "AI-Powered Customer Retention System")
   - **Description**: 2-3 sentences explaining:
     * What the solution is
     * Which specific strategic threat(s) it addresses
     * How it moves their Top KPI
   - **Total Cost**: REALISTIC total implementation investment
     * Include: Technology ($X), Team/Consulting ($X), Training ($X)
     * Example for ${data.companySize} employees: "$80K-$150K total investment"
     * Must be realistic for company size and industry
     * Format: "$XXK - $XXXK" or specific amount like "$120K"
   - **Estimated ROI**: Specific percentage or dollar amount with timeframe
     * Example: "25% reduction in customer churn → $500K annual savings in 12 months"
     * Must be realistic for their industry and company size
     * Show ROI vs Total Cost for credibility
   - **Time to Implement**: Must align with their urgency (e.g., "6-8 weeks" if urgency is 30d)
   - **Priority**: High/Medium/Low (based on ROI, urgency, and strategic threat severity)
   - **Benefits**: Array of 3-4 SPECIFIC benefits (not generic)
     * Each benefit should be measurable and relevant to their KPI
   - **Assumptions**: Array of 3-5 KEY ASSUMPTIONS that must be true for this ROI to be realistic
     * Example: "Current customer churn rate is ~20%"
     * Example: "Team dedicates 20 hours/week to implementation"
     * Example: "AI system achieves 85% accuracy after training"
     * Example: "User adoption reaches 70% within 60 days"
     * Be SPECIFIC and REALISTIC - these validate your ROI claims
   - **Risks**: Array of 2-3 POTENTIAL RISKS that could impact success
     * Example: "Low user adoption if training is insufficient"
     * Example: "Data quality issues may delay initial results"
     * Be honest and pragmatic
   - **Timeline**: A SPECIFIC 30-60-90 day implementation plan FOR THIS PROJECT:
     * days30: 3-4 concrete actions for the first 30 days
     * days60: 3-4 concrete actions for days 31-60
     * days90: 3-4 concrete actions for days 61-90

2. **Executive Summary** (2-3 paragraphs)
   - Acknowledge their specific strategic threats
   - Explain why these 3 projects are the best fit for their situation
   - Reference their Primary Goal, Top KPI, and Urgency

IMPORTANT: 
- Each project must have its OWN timeline specific to implementing THAT project
- Projects must be prioritized by their ability to address the Strategic Threats
- All recommendations must be tailored to their industry, size, and country

ROI REALISM GUIDELINES (CRITICAL):
- Be CONSERVATIVE with ROI estimates - credibility is more important than impressive numbers
- Base ROI on REALISTIC industry benchmarks for ${data.industry} and ${data.companySize} employees
- Consider adoption challenges, learning curves, and integration complexity
- Show your math in assumptions (e.g., "If churn drops from 20% to 15%, and avg customer value is $50K...")
- Typical AI project ROI timeframes: 6-18 months (not 2-3 months)
- Include risks that could reduce ROI
- Remember: A 30-50% improvement is GREAT for most AI projects (not 200-300%)

Return the response in valid JSON format with this exact structure:
{
  "topProjects": [
    {
      "title": "Project Name",
      "description": "Detailed description of the project",
      "totalCost": "$80K - $150K",
      "estimatedROI": "25% cost reduction → $500K savings in 12 months",
      "timeToImplement": "3-6 months",
      "priority": "High",
      "benefits": [
        "Specific benefit 1 with numbers",
        "Specific benefit 2 with numbers",
        "Specific benefit 3 with numbers"
      ],
      "assumptions": [
        "Current baseline metric assumption (e.g., 20% churn rate)",
        "Team commitment assumption (e.g., 20 hrs/week)",
        "Technical assumption (e.g., 85% AI accuracy)",
        "Adoption assumption (e.g., 70% user adoption in 60 days)"
      ],
      "risks": [
        "Risk 1: Low adoption if training insufficient",
        "Risk 2: Data quality may delay results"
      ],
      "timeline": {
        "days30": [
          "Specific action 1 for THIS project",
          "Specific action 2 for THIS project",
          "Specific action 3 for THIS project"
        ],
        "days60": [
          "Specific action 1 for THIS project",
          "Specific action 2 for THIS project",
          "Specific action 3 for THIS project"
        ],
        "days90": [
          "Specific action 1 for THIS project",
          "Specific action 2 for THIS project",
          "Specific action 3 for THIS project"
        ]
      }
    }
  ],
  "actionPlan": {
    "days30": ["Overall action 1", "Overall action 2"],
    "days60": ["Overall action 1", "Overall action 2"],
    "days90": ["Overall action 1", "Overall action 2"]
  },
  "executiveSummary": "string"
}

CRITICAL: totalCost must show REALISTIC investment amount based on company size (${data.companySize} employees) and industry (${data.industry}). Don't be vague - give specific ranges.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Más económico y rápido
      messages: [
        {
          role: 'system',
          content: 'You are a CONSERVATIVE and REALISTIC AI business consultant with deep expertise in AI transformation strategies. You analyze companies based on their strategic threats, goals, and KPIs to provide highly tailored, actionable AI project recommendations. CRITICAL: Be conservative with ROI estimates - better to under-promise and over-deliver. Always include realistic assumptions and potential risks. Your credibility depends on being honest about what is achievable. Always respond with valid, well-structured JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000, // Increased for more detailed responses with 13 data points
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    const result: AIAssessmentResult = JSON.parse(responseContent);
    return result;
  } catch (error) {
    console.error('❌ Error generating AI assessment:', error);
    throw new Error('Failed to generate AI assessment');
  }
}

