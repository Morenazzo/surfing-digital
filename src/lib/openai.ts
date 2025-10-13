import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIProjectRecommendation {
  title: string;
  name?: string; // Alias for title
  description: string;
  estimatedROI: string;
  timeToImplement: string;
  priority: 'High' | 'Medium' | 'Low';
  benefits?: string[];
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
   - **Estimated ROI**: Specific percentage or dollar amount with timeframe
     * Example: "25% reduction in customer churn → $500K annual savings in 12 months"
     * Must be realistic for their industry and company size
   - **Time to Implement**: Must align with their urgency (e.g., "6-8 weeks" if urgency is 30d)
   - **Priority**: High/Medium/Low (based on ROI, urgency, and strategic threat severity)
   - **Benefits**: Array of 3-4 SPECIFIC benefits (not generic)
     * Each benefit should be measurable and relevant to their KPI
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

Return the response in valid JSON format with this exact structure:
{
  "topProjects": [
    {
      "title": "Project Name",
      "description": "Detailed description of the project",
      "estimatedROI": "25% cost reduction in 12 months",
      "timeToImplement": "3-6 months",
      "priority": "High",
      "benefits": [
        "Benefit 1",
        "Benefit 2",
        "Benefit 3"
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
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Más económico y rápido
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI business consultant with deep expertise in AI transformation strategies. You analyze companies based on their strategic threats, goals, and KPIs to provide highly tailored, actionable AI project recommendations. Always respond with valid, well-structured JSON.',
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

