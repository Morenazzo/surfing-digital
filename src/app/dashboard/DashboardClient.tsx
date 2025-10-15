"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Calendar, ArrowRight, Loader2, AlertCircle, BarChart3, Target, Zap } from 'lucide-react';
import { calculateAIMaturity, AIMaturityResult } from '@/lib/ai-maturity';

interface Assessment {
  id: string;
  companyName: string | null;
  industry: string | null;
  companySize: string | null;
  status: string;
  createdAt: string;
  strategicThreats: unknown;
  currentChallenges: string | null;
  primaryGoal: string | null;
  topKPI: string | null;
  urgency: string | null;
  goals: string | null;
  // AI Maturity - NEW
  currentAIUsage: string | null;
  aiCapabilities: unknown;
  dataQuality: string | null;
  aiTalent: string | null;
  aiBudget: string | null;
  aiStrategy: string | null;
  aiMaturityScore: number | null;
  aiMaturityLevel: string | null;
}

interface DashboardData {
  user: {
    email: string;
    name: string | null;
  };
  assessments: Assessment[];
}

export default function DashboardClient({ email }: { email: string }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maturityScore, setMaturityScore] = useState<AIMaturityResult | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch(`/api/dashboard?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const dashboardData: DashboardData = await response.json();
        setData(dashboardData);

        // Use AI Maturity Score from database (if available) or calculate it
        if (dashboardData.assessments.length > 0) {
          const latestAssessment = dashboardData.assessments[0];
          
          // If score is already calculated and stored, use it
          if (latestAssessment.aiMaturityScore !== null && latestAssessment.aiMaturityLevel) {
            const maturity = calculateAIMaturity({
              industry: latestAssessment.industry,
              companySize: latestAssessment.companySize,
              strategicThreats: latestAssessment.strategicThreats,
              currentChallenges: latestAssessment.currentChallenges,
              primaryGoal: latestAssessment.primaryGoal,
              topKPI: latestAssessment.topKPI,
              urgency: latestAssessment.urgency,
              goals: latestAssessment.goals,
              currentAIUsage: latestAssessment.currentAIUsage,
              aiCapabilities: latestAssessment.aiCapabilities,
              dataQuality: latestAssessment.dataQuality,
              aiTalent: latestAssessment.aiTalent,
              aiBudget: latestAssessment.aiBudget,
              aiStrategy: latestAssessment.aiStrategy,
            });
            setMaturityScore(maturity);
          } else {
            // Fallback: calculate if not in database (old assessments)
            const maturity = calculateAIMaturity({
              industry: latestAssessment.industry,
              companySize: latestAssessment.companySize,
              strategicThreats: latestAssessment.strategicThreats,
              currentChallenges: latestAssessment.currentChallenges,
              primaryGoal: latestAssessment.primaryGoal,
              topKPI: latestAssessment.topKPI,
              urgency: latestAssessment.urgency,
              goals: latestAssessment.goals,
            });
            setMaturityScore(maturity);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [email]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BB7B7]/5 via-white to-[#0BB7B7]/10 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#0BB7B7] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h1>
          <p className="text-gray-600 mb-6">{error || 'Failed to load dashboard data'}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#0BB7B7] text-white rounded-lg hover:bg-[#0BB7B7]/90 transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const completedAssessments = data.assessments.filter(a => a.status === 'completed');
  const processingAssessments = data.assessments.filter(a => a.status === 'in_progress');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BB7B7]/5 via-white to-[#0BB7B7]/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/70 bg-clip-text text-transparent"
            >
              Surfing.Digital
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Welcome back</div>
                <div className="font-medium text-gray-900">{data.user.name || data.user.email}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Your AI Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your AI transformation journey and access your personalized recommendations
          </p>
        </div>

        {/* AI Maturity Score */}
        {maturityScore && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  AI Maturity Score
                </h2>
                <p className="text-gray-600">
                  Based on your latest assessment
                </p>
              </div>
              <div className="text-6xl">
                {maturityScore.emoji}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Score Gauge */}
              <div>
                <div className="flex items-end gap-4 mb-4">
                  <div className="text-6xl font-bold" style={{ color: maturityScore.color }}>
                    {maturityScore.score}
                  </div>
                  <div className="text-2xl text-gray-400 mb-2">/100</div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                  <div
                    className="h-4 rounded-full transition-all duration-1000"
                    style={{
                      width: `${maturityScore.score}%`,
                      backgroundColor: maturityScore.color,
                    }}
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold" style={{ color: maturityScore.color }}>
                    {maturityScore.level}
                  </span>
                  <span className="text-gray-500">Level</span>
                </div>

                <p className="text-gray-700">
                  {maturityScore.description}
                </p>
              </div>

              {/* Strengths & Improvements */}
              <div className="space-y-6">
                {/* Strengths */}
                {maturityScore.strengths.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-bold text-gray-900">Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                      {maturityScore.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500 font-bold mt-1">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Areas for Improvement */}
                {maturityScore.improvements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-amber-600" />
                      <h3 className="text-lg font-bold text-gray-900">Focus Areas</h3>
                    </div>
                    <ul className="space-y-2">
                      {maturityScore.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-amber-500 font-bold mt-1">▸</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Assessments</h3>
              <BarChart3 className="w-5 h-5 text-[#0BB7B7]" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{data.assessments.length}</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{completedAssessments.length}</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Processing</h3>
              <Loader2 className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-amber-600">{processingAssessments.length}</div>
          </div>
        </div>

        {/* Assessment History */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment History</h2>

          {data.assessments.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assessments Yet</h3>
              <p className="text-gray-600 mb-6">
                Take your first AI Readiness Assessment to get personalized recommendations
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0BB7B7] text-white rounded-lg hover:bg-[#0BB7B7]/90 transition-colors font-medium"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {data.assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {assessment.companyName || 'Unnamed Assessment'}
                        </h3>
                        {assessment.status === 'completed' && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            ✓ Completed
                          </span>
                        )}
                        {assessment.status === 'in_progress' && (
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Processing
                          </span>
                        )}
                        {assessment.status === 'failed' && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            ✗ Failed
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        {assessment.industry && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Industry:</span> {assessment.industry}
                          </span>
                        )}
                        {assessment.companySize && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Size:</span> {assessment.companySize} employees
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(assessment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      {assessment.primaryGoal && (
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Goal:</span> {assessment.primaryGoal}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {assessment.status === 'completed' && (
                        <Link
                          href={`/results/${assessment.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0BB7B7] text-white rounded-lg hover:bg-[#0BB7B7]/90 transition-colors font-medium text-sm whitespace-nowrap"
                        >
                          View Report
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      {assessment.status === 'in_progress' && (
                        <Link
                          href={`/results/${assessment.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm whitespace-nowrap"
                        >
                          Check Status
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        {data.assessments.length > 0 && (
          <div className="bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/80 rounded-2xl p-8 text-center text-white mt-8">
            <h2 className="text-2xl font-bold mb-3">
              Ready for a Fresh Assessment?
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Track your progress and get updated recommendations as your AI strategy evolves
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0BB7B7] rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg"
            >
              Take New Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
          <p className="text-sm mb-2">
            Built with ❤️ by <span className="font-bold text-[#0BB7B7]">Surfing Digital</span>
          </p>
          <p className="text-xs">
            <Link href="/privacy" className="hover:text-[#0BB7B7] transition-colors">
              Privacy Policy
            </Link>
            {" · "}
            &copy; {new Date().getFullYear()} Surfing Digital SAPI de CV
          </p>
        </div>
      </footer>
    </div>
  );
}

