/**
 * CrewAI Integration Library
 * 
 * This module provides functions to interact with the Surfing Digital AI Profit Crew
 * for generating comprehensive AI assessment reports.
 */

export interface CrewAIAssessmentData {
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
}

export interface CrewAIResult {
  success: boolean;
  output?: string;
  error?: string;
  message?: string;
}

/**
 * Call the CrewAI analysis endpoint
 * 
 * @param assessmentData - The assessment data to analyze
 * @returns Promise with CrewAI result
 */
export async function analyzeWithCrewAI(
  assessmentData: CrewAIAssessmentData
): Promise<CrewAIResult> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/crewai/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentData),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'CrewAI analysis failed');
    }
    
    return result;
  } catch (error) {
    console.error('Error calling CrewAI:', error);
    throw error;
  }
}

/**
 * Parse CrewAI output to extract structured data
 * 
 * The crew generates a markdown report. This function attempts to parse it
 * into the structure expected by the database.
 */
export function parseCrewAIOutput(output: string): {
  topProjects: Array<{
    title: string;
    description: string;
    estimatedROI: string;
    timeToImplement: string;
    priority: string;
    benefits: string[];
    timeline?: {
      days30: string[];
      days60: string[];
      days90: string[];
    };
  }>;
  actionPlan: {
    days30: string[];
    days60: string[];
    days90: string[];
  };
  executiveSummary: string;
} {
  // This is a simplified parser
  // In a production system, you might want more robust parsing
  
  try {
    // Extract executive summary (Section 1)
    const executiveSummaryMatch = output.match(/## Section 1: Executive Summary\n\n([\s\S]*?)\n\n---/);
    const executiveSummary = executiveSummaryMatch ? executiveSummaryMatch[1].trim() : 'Summary not found';
    
    // Extract projects (Section 2)
    const projectsSection = output.match(/## Section 2: Top 3 AI Opportunities\n\n([\s\S]*?)\n\n---\n\n## Section 3/);
    const projects: Array<{
      title: string;
      description: string;
      estimatedROI: string;
      timeToImplement: string;
      priority: string;
      benefits: string[];
    }> = [];
    
    if (projectsSection) {
      const projectBlocks = projectsSection[1].split(/###\sProject\s#\d+:/g).filter(Boolean);
      
      projectBlocks.forEach((block) => {
        const titleMatch = block.match(/^(.*?)\s—\s\[(.*?)\]/);
        const descMatch = block.match(/\n\n([\s\S]*?)\n\n\*\*Key Benefits/);
        const roiMatch = block.match(/\*\*Expected ROI:\*\*\s(.*?)\n/);
        const timeMatch = block.match(/\*\*Implementation Timeframe:\*\*\s(.*?)\n/);
        const benefitsMatch = block.match(/\*\*Key Benefits:\*\*\n([\s\S]*?)\n\n\*\*Expected ROI/);
        
        if (titleMatch) {
          const benefits: string[] = [];
          if (benefitsMatch) {
            const benefitLines = benefitsMatch[1].split('\n').filter(line => line.trim().startsWith('-'));
            benefitLines.forEach(line => {
              const benefit = line.replace(/^-\s*/, '').trim();
              if (benefit) benefits.push(benefit);
            });
          }
          
          projects.push({
            title: titleMatch[1].trim(),
            priority: titleMatch[2].trim(),
            description: descMatch ? descMatch[1].trim() : '',
            estimatedROI: roiMatch ? roiMatch[1].trim() : 'High impact',
            timeToImplement: timeMatch ? timeMatch[1].trim() : '90 days',
            benefits,
          });
        }
      });
    }
    
    // Extract roadmap (Section 3)
    const roadmapSection = output.match(/## Section 3: Implementation Roadmap\n\n([\s\S]*?)\n\n---\n\n## Section 4/);
    const actionPlan = {
      days30: ['Project kickoff and initial setup'],
      days60: ['Core implementation and testing'],
      days90: ['Full deployment and optimization'],
    };
    
    if (roadmapSection) {
      const roadmapText = roadmapSection[1];
      
      const phase1Match = roadmapText.match(/\*\*Phase 1[\s\S]*?days\s1-30[\s\S]*?\*Milestone:\s(.*?)\*/i);
      const phase2Match = roadmapText.match(/\*\*Phase 2[\s\S]*?days\s31-60[\s\S]*?\*Milestone:\s(.*?)\*/i);
      const phase3Match = roadmapText.match(/\*\*Phase 3[\s\S]*?days\s61-90[\s\S]*?\*Milestone:\s(.*?)\*/i);
      
      if (phase1Match) actionPlan.days30 = [phase1Match[1].trim()];
      if (phase2Match) actionPlan.days60 = [phase2Match[1].trim()];
      if (phase3Match) actionPlan.days90 = [phase3Match[1].trim()];
    }
    
    return {
      topProjects: projects,
      actionPlan,
      executiveSummary,
    };
  } catch (error) {
    console.error('Error parsing CrewAI output:', error);
    
    // Return fallback data
    return {
      topProjects: [
        {
          title: 'AI Project 1',
          description: 'See full report for details',
          estimatedROI: 'High impact',
          timeToImplement: '90 days',
          priority: 'High',
          benefits: ['Detailed analysis available in full report'],
        }
      ],
      actionPlan: {
        days30: ['See full report for detailed roadmap'],
        days60: ['Implementation phases defined in report'],
        days90: ['Full deployment plan in report'],
      },
      executiveSummary: 'Full analysis complete. See detailed report for comprehensive recommendations.',
    };
  }
}

