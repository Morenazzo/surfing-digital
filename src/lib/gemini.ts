/**
 * Gemini AI Integration Library
 * 
 * This module provides functions to interact with Google's Gemini AI
 * for generating comprehensive AI assessment reports with web research capabilities.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Lazy initialization to avoid errors during build time
let geminiInstance: GoogleGenerativeAI | null = null;

function getGemini(): GoogleGenerativeAI {
  if (!geminiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    geminiInstance = new GoogleGenerativeAI(apiKey);
  }
  return geminiInstance;
}

export interface GeminiAssessmentData {
  // Profile
  companyName: string;
  website: string | null;
  industry: string;
  country: string | null;
  companySize: string;
  role: string | null;
  
  // Problems
  strategicThreats: unknown[];
  currentChallenges: string;
  
  // Goals
  primaryGoal: string | null;
  topKPI: string | null;
  urgency: string | null;
  goals: string;
  
  // AI Maturity
  currentAIUsage: string | null;
  aiCapabilities: unknown[];
  dataQuality: string | null;
  aiTalent: string | null;
  aiBudget: string | null;
  aiStrategy: string | null;
}

export interface GeminiResearchResult {
  industryInsights: string;
  competitorAnalysis: string;
  marketTrends: string;
  keyOpportunities: string[];
  successCases: string[];
  benchmarkData: {
    typicalROI: string;
    implementationCosts: string;
    timeToValue: string;
  };
}

/**
 * Conduct deep research using Gemini 1.5 Pro with web search
 * This provides context for OpenAI to generate specific recommendations
 */
export async function conductGeminiResearch(
  data: GeminiAssessmentData
): Promise<GeminiResearchResult> {
  
  const gemini = getGemini();
  const model = gemini.getGenerativeModel({ 
    model: 'gemini-1.5-pro',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    }
  });

  // Format strategic threats and AI capabilities
  const threats = Array.isArray(data.strategicThreats) 
    ? data.strategicThreats.map(t => `- ${t}`).join('\n')
    : 'No specific threats mentioned';
    
  const aiCaps = Array.isArray(data.aiCapabilities)
    ? data.aiCapabilities.map(c => `- ${c}`).join('\n')
    : 'No AI capabilities currently in use';

  const prompt = `You are an expert Market Research Analyst conducting DEEP WEB RESEARCH for an AI transformation consulting project.

# COMPANY PROFILE
- Company: ${data.companyName}
- Website: ${data.website || 'Not provided'}
- Industry: ${data.industry}
- Country: ${data.country || 'Not specified'}
- Company Size: ${data.companySize} employees

# STRATEGIC CONTEXT
Strategic Threats:
${threats}

Current Challenges:
${data.currentChallenges}

Primary Goal: ${data.primaryGoal || 'Not specified'}
Top KPI: ${data.topKPI || 'Not specified'}
Goals: ${data.goals}

# CURRENT AI MATURITY
- Current AI Usage: ${data.currentAIUsage || 'None'}
- AI Capabilities: ${aiCaps}
- Data Quality: ${data.dataQuality || 'Unknown'}
- AI Talent: ${data.aiTalent || 'Unknown'}
- AI Budget: ${data.aiBudget || 'Unknown'}
- AI Strategy: ${data.aiStrategy || 'Unknown'}

---

# YOUR TASK: DEEP WEB RESEARCH

You are conducting research that will be used by an AI strategist to create specific project recommendations. Focus on gathering REAL, CURRENT DATA from the web.

## RESEARCH AREAS:

### 1. INDUSTRY ANALYSIS
- Current state of the ${data.industry} industry in ${data.country || 'global markets'}
- Major trends, disruptions, and challenges in 2025
- How leading companies are responding to these challenges
- Industry growth metrics and forecasts
- Regulatory environment and compliance requirements

### 2. AI ADOPTION IN THE INDUSTRY
- How ${data.industry} companies are currently using AI
- Specific AI use cases that are delivering results
- Success stories with concrete ROI data
- Failed implementations and lessons learned
- Emerging AI technologies being adopted

### 3. COMPETITOR INTELLIGENCE
- Identify 3-5 leading companies in ${data.industry}
- Their AI initiatives and public results
- Technologies and vendors they're using
- Investment amounts and timelines reported
- Competitive advantages gained through AI

### 4. MARKET BENCHMARKS
- Typical AI implementation costs for ${data.companySize}-employee companies in ${data.industry}
- ROI ranges reported by similar companies
- Time-to-value expectations (months to see results)
- Success rates and common pitfalls
- Budget allocation recommendations

### 5. KEY OPPORTUNITIES
- Specific AI opportunities relevant to their challenges
- Technologies that address their strategic threats
- Quick wins vs long-term transformation plays
- Emerging opportunities they should consider

### 6. SUCCESS CASES
- 3-5 real case studies of AI implementations in ${data.industry}
- Include company names, technologies used, costs, ROI
- Focus on companies of similar size (${data.companySize} employees)

## CRITICAL REQUIREMENTS:
1. **SEARCH THE WEB**: Use your web search capabilities extensively
2. **BE SPECIFIC**: Name real companies, vendors, products, statistics
3. **CITE SOURCES**: When you find data, mention the source
4. **BE CURRENT**: Focus on 2024-2025 information
5. **BE QUANTITATIVE**: Include numbers, percentages, dollar amounts

## OUTPUT FORMAT (JSON):

{
  "industryInsights": "3-4 paragraphs about the ${data.industry} industry. Include current trends, challenges, growth metrics, and how AI is being adopted. Cite specific statistics and sources you find.",
  
  "competitorAnalysis": "2-3 paragraphs analyzing how competitors/leaders in ${data.industry} are using AI. Name specific companies and their initiatives. Include reported results and ROI when available.",
  
  "marketTrends": "2-3 paragraphs about AI trends specifically relevant to ${data.industry} companies of size ${data.companySize}. Include market growth data, investment trends, and emerging technologies.",
  
  "keyOpportunities": [
    "Specific AI opportunity 1 with brief explanation",
    "Specific AI opportunity 2 with brief explanation",
    "Specific AI opportunity 3 with brief explanation",
    "Specific AI opportunity 4 with brief explanation",
    "Specific AI opportunity 5 with brief explanation"
  ],
  
  "successCases": [
    "Company Name 1: Brief description of their AI implementation, technology used, and results (with numbers if available)",
    "Company Name 2: Brief description of their AI implementation, technology used, and results (with numbers if available)",
    "Company Name 3: Brief description of their AI implementation, technology used, and results (with numbers if available)"
  ],
  
  "benchmarkData": {
    "typicalROI": "ROI range found in research (e.g., '15-30% cost reduction' or '20-40% productivity gain'). Cite source.",
    "implementationCosts": "Cost ranges for AI projects in this industry/company size (e.g., '$50K-$200K for initial projects'). Cite source.",
    "timeToValue": "Typical time to see results (e.g., '3-6 months for initial ROI, 12-18 months for full transformation'). Cite source."
  }
}

IMPORTANT: This research will be used by an AI strategist to create specific project recommendations. Your job is to provide rich, data-driven context. The more specific and quantitative your research, the better the final recommendations will be.

Use your web search extensively. Don't make assumptions - find real data. If you can't find specific data for this exact industry/size, find the closest comparable data and note that.`;

  try {
    console.log('🔍 Calling Gemini 1.5 Pro with web research...');
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('✅ Gemini response received, parsing JSON...');
    
    // Extract JSON from response (in case there's extra text)
    let jsonText = text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }
    
    const assessment = JSON.parse(jsonText);
    
    console.log('✅ Gemini assessment parsed successfully');
    console.log('📊 Projects generated:', assessment.topProjects?.length || 0);
    
    return assessment;
    
  } catch (error) {
    console.error('❌ Error calling Gemini:', error);
    throw new Error(`Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

