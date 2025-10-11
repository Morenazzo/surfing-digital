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
  companyName: string;
  industry: string;
  companySize: string;
  currentChallenges: string;
  goals: string;
}): Promise<AIAssessmentResult> {
  const prompt = `You are an AI business consultant specializing in AI transformation for mid-size companies.

Company Profile:
- Name: ${data.companyName}
- Industry: ${data.industry}
- Company Size: ${data.companySize} employees
- Current Challenges: ${data.currentChallenges}
- Goals: ${data.goals}

Please analyze this company and provide:

1. Top 3 AI Project Recommendations (prioritized by ROI and feasibility)
   For EACH project, provide:
   - Title (concise, business-focused name)
   - Description (2-3 sentences explaining the solution and how it addresses their challenges)
   - Estimated ROI (specific percentage or dollar amount with timeframe, e.g., "25% revenue increase in 12 months")
   - Time to Implement (e.g., "3-6 months", "6-12 months")
   - Priority (High/Medium/Low)
   - Benefits (array of 3-4 specific benefits)
   - Timeline: A SPECIFIC 30-60-90 day implementation plan FOR THIS PROJECT:
     * days30: 3-4 specific actions for the first 30 days
     * days60: 3-4 specific actions for days 31-60
     * days90: 3-4 specific actions for days 61-90

2. Executive Summary (2-3 paragraphs explaining why these projects are ideal for this company)

IMPORTANT: Each project must have its OWN timeline that is specific to implementing THAT project.

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
          content: 'You are an expert AI business consultant. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
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

