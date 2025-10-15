/**
 * AI Maturity Score Calculator
 * 
 * Calculates a company's AI readiness based on their assessment data.
 * Score range: 0-100
 * 
 * Levels:
 * - 0-25: Beginner (🌱)
 * - 26-50: Developing (🌿)
 * - 51-75: Advanced (🌳)
 * - 76-100: Leader (🚀)
 */

export interface AIMaturityResult {
  score: number; // 0-100
  level: 'Beginner' | 'Developing' | 'Advanced' | 'Leader';
  emoji: string;
  color: string;
  description: string;
  strengths: string[];
  improvements: string[];
}

export function calculateAIMaturity(assessmentData: {
  // Context fields
  industry?: string | null;
  companySize?: string | null;
  strategicThreats?: unknown;
  currentChallenges?: string | null;
  primaryGoal?: string | null;
  topKPI?: string | null;
  urgency?: string | null;
  goals?: string | null;
  // AI Maturity fields (NEW - from form)
  currentAIUsage?: string | null;
  aiCapabilities?: unknown;
  dataQuality?: string | null;
  aiTalent?: string | null;
  aiBudget?: string | null;
  aiStrategy?: string | null;
}): AIMaturityResult {
  let score = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];

  // ═══════════════════════════════════════════════════════════
  // REAL AI MATURITY SCORING (Based on actual form responses)
  // ═══════════════════════════════════════════════════════════

  // 1. Current AI Usage (25 points) - MOST IMPORTANT
  const aiUsage = assessmentData.currentAIUsage?.toLowerCase() || '';
  if (aiUsage.includes('multiple') || aiUsage.includes('integrated')) {
    score += 25;
    strengths.push('Multiple AI systems in production');
  } else if (aiUsage.includes('1-2') || aiUsage.includes('production')) {
    score += 15;
    strengths.push('AI systems deployed in production');
  } else if (aiUsage.includes('exploring') || aiUsage.includes('pilot')) {
    score += 8;
    strengths.push('Active AI exploration and pilots');
  } else {
    score += 0;
    improvements.push('Start with AI pilot projects to gain experience');
  }

  // 2. AI Capabilities (15 points)
  const capabilities = Array.isArray(assessmentData.aiCapabilities)
    ? assessmentData.aiCapabilities
    : [];
  const capCount = capabilities.filter(c => c !== 'None yet' && c !== null).length;
  
  if (capCount >= 4) {
    score += 15;
    strengths.push(`Diverse AI capabilities (${capCount} types in use)`);
  } else if (capCount >= 2) {
    score += 10;
  } else if (capCount >= 1) {
    score += 5;
  } else {
    improvements.push('Implement your first AI capability');
  }

  // 3. Data Quality (20 points) - CRITICAL
  const dataQual = assessmentData.dataQuality?.toLowerCase() || '';
  if (dataQual.includes('excellent') || dataQual.includes('clean')) {
    score += 20;
    strengths.push('Excellent data infrastructure');
  } else if (dataQual.includes('good') || dataQual.includes('centralized')) {
    score += 12;
    strengths.push('Good data foundation');
  } else if (dataQual.includes('fair') || dataQual.includes('some')) {
    score += 6;
  } else {
    score += 0;
    improvements.push('Improve data quality and accessibility');
  }

  // 4. AI Talent (20 points) - CRITICAL
  const talent = assessmentData.aiTalent?.toLowerCase() || '';
  if (talent.includes('established') || talent.includes('team')) {
    score += 20;
    strengths.push('Dedicated AI/Data Science team');
  } else if (talent.includes('small') || talent.includes('3-5')) {
    score += 12;
    strengths.push('Growing AI talent pool');
  } else if (talent.includes('1-2')) {
    score += 6;
  } else {
    score += 0;
    improvements.push('Hire or train AI/Data Science talent');
  }

  // 5. AI Budget (10 points)
  const budget = assessmentData.aiBudget?.toLowerCase() || '';
  if (budget.includes('250') || budget.includes('over')) {
    score += 10;
    strengths.push('Strong AI investment commitment');
  } else if (budget.includes('50') && budget.includes('250')) {
    score += 6;
  } else if (budget.includes('50')) {
    score += 3;
  } else {
    improvements.push('Allocate dedicated AI budget');
  }

  // 6. AI Strategy (10 points)
  const strategy = assessmentData.aiStrategy?.toLowerCase() || '';
  if (strategy.includes('yes') || strategy.includes('documented') || strategy.includes('executive')) {
    score += 10;
    strengths.push('Formal AI strategy with executive support');
  } else if (strategy.includes('development') || strategy.includes('being developed')) {
    score += 6;
  } else if (strategy.includes('informal')) {
    score += 3;
  } else {
    improvements.push('Develop a formal AI strategy and roadmap');
  }

  // ═══════════════════════════════════════════════════════════
  // CONTEXT SCORING (Bonus points for good fundamentals)
  // ═══════════════════════════════════════════════════════════

  // 7. Strategic Awareness (Bonus - up to 3 points)
  const threats = Array.isArray(assessmentData.strategicThreats) 
    ? assessmentData.strategicThreats 
    : [];
  
  if (threats.length >= 3) {
    score += 3;
  } else if (threats.length >= 1) {
    score += 1;
  }

  // 8. Goal Clarity (Bonus - up to 2 points)
  if (assessmentData.primaryGoal && assessmentData.topKPI) {
    score += 2;
  }

  // Determine level based on score
  let level: AIMaturityResult['level'];
  let emoji: string;
  let color: string;
  let description: string;

  if (score >= 76) {
    level = 'Leader';
    emoji = '🚀';
    color = '#10B981'; // green
    description = 'Your organization shows strong AI readiness with clear strategy and commitment. Ready for advanced AI implementations.';
  } else if (score >= 51) {
    level = 'Advanced';
    emoji = '🌳';
    color = '#3B82F6'; // blue
    description = 'Good AI readiness with solid foundation. Focus on execution and quick wins to build momentum.';
  } else if (score >= 26) {
    level = 'Developing';
    emoji = '🌿';
    color = '#F59E0B'; // amber
    description = 'Growing AI awareness. Strengthen your strategy and define clear goals before large investments.';
  } else {
    level = 'Beginner';
    emoji = '🌱';
    color = '#EF4444'; // red
    description = 'Early AI journey. Focus on education, small pilots, and building internal awareness before scaling.';
  }

  // Ensure we always have at least 2 improvements
  if (improvements.length === 0) {
    improvements.push('Continue building on current AI strategy');
    improvements.push('Explore emerging AI technologies relevant to your industry');
  } else if (improvements.length === 1) {
    improvements.push('Document lessons learned for future projects');
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    level,
    emoji,
    color,
    description,
    strengths: strengths.slice(0, 5), // Max 5 strengths
    improvements: improvements.slice(0, 3), // Max 3 improvements
  };
}

