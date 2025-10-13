// src/app/results/[assessmentId]/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, TrendingUp, Calendar } from 'lucide-react'
import { ClientButtons, RefreshButton } from './ClientButtons'

interface PageProps {
  params: Promise<{
    assessmentId: string
  }>
}

async function getAssessment(assessmentId: string) {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        user: true,
      },
    })

    return assessment
  } catch (error) {
    console.error('Error fetching assessment:', error)
    return null
  }
}

export default async function ResultsPage({ params }: PageProps) {
  const { assessmentId } = await params
  const assessment = await getAssessment(assessmentId)

  if (!assessment) {
    notFound()
  }

  // Parse the AI-generated data
  const topProjects = Array.isArray(assessment.topProjects)
    ? assessment.topProjects
    : []
  
  const actionPlan = typeof assessment.actionPlan === 'object' && assessment.actionPlan !== null
    ? assessment.actionPlan as Record<string, unknown>
    : {}

  const isProcessing = assessment.status === 'in_progress'
  const isFailed = assessment.status === 'failed'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BB7B7]/5 via-white to-[#0BB7B7]/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#0BB7B7] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/70 bg-clip-text text-transparent">
              Surfing.Digital
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Processing State */}
        {isProcessing && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0BB7B7]/10 mb-6 animate-pulse">
              <TrendingUp className="w-8 h-8 text-[#0BB7B7]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🤖 Processing Your AI Assessment...
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our AI is analyzing your business data and generating personalized recommendations.
              This usually takes 10-30 seconds.
            </p>
            <RefreshButton />
          </div>
        )}

        {/* Failed State */}
        {isFailed && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
              <span className="text-3xl">❌</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Processing Failed
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We encountered an error while processing your assessment. Please contact support at{' '}
              <a href="mailto:support@surfing.digital" className="text-[#0BB7B7] hover:underline">
                support@surfing.digital
              </a>
            </p>
          </div>
        )}

        {/* Success State - Show Results */}
        {assessment.status === 'completed' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-6">
                <CheckCircle2 className="w-4 h-4" />
                Assessment Complete
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your AI Transformation Roadmap
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                {assessment.companyName || 'Your Company'}
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                {assessment.industry && <span>{assessment.industry}</span>}
                {assessment.companySize && <span>• {assessment.companySize} employees</span>}
                {assessment.country && <span>• {assessment.country}</span>}
                {assessment.urgency && (
                  <span className="px-3 py-1 bg-[#0BB7B7]/10 text-[#0BB7B7] rounded-full font-medium">
                    ⏱️ {assessment.urgency} urgency
                  </span>
                )}
              </div>
            </div>

            {/* Key Objectives Section */}
            {(assessment.primaryGoal || assessment.topKPI || assessment.strategicThreats) && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Strategic Objectives</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {assessment.primaryGoal && (
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">Primary Goal</div>
                      <div className="text-lg font-semibold text-gray-900">{assessment.primaryGoal}</div>
                    </div>
                  )}
                  {assessment.topKPI && (
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">Top KPI to Move</div>
                      <div className="text-lg font-semibold text-gray-900">{assessment.topKPI}</div>
                    </div>
                  )}
                  {assessment.strategicThreats && Array.isArray(assessment.strategicThreats) && assessment.strategicThreats.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">Strategic Threats</div>
                      <div className="space-y-1">
                        {(assessment.strategicThreats as string[]).slice(0, 3).map((threat, i) => (
                          <div key={i} className="text-sm text-gray-700">• {threat}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Top 3 AI Projects - Each with its own section */}
            <section className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Your AI Transformation Roadmap
                </h2>
                <p className="text-xl text-gray-600">
                  Three high-impact projects, prioritized by ROI and implementation feasibility
                </p>
              </div>

              {topProjects.map((project: Record<string, unknown>, index: number) => {
                // Determine timeline based on project or default
                const timeline = project.timeline || actionPlan
                
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
                  >
                    {/* Project Header */}
                    <div className="bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/80 text-white p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-4xl font-black">#{index + 1}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white/80 mb-1">
                              {project.priority || 'High'} Priority
                            </div>
                            <h3 className="text-3xl font-bold">
                              {project.name || project.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-lg text-white/90 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6 p-8">
                      {/* ROI & Investment */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-[#0BB7B7]" />
                          ROI & Investment
                        </h4>
                        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                          <div className="text-sm text-green-700 font-medium mb-1">
                            Estimated ROI
                          </div>
                          <div className="text-3xl font-bold text-green-800">
                            {project.estimatedROI || 'High Impact'}
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                          <div className="text-sm text-blue-700 font-medium mb-1">
                            Time to Implement
                          </div>
                          <div className="text-2xl font-bold text-blue-800">
                            {project.timeToImplement || '3-6 months'}
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <CheckCircle2 className="w-6 h-6 text-[#0BB7B7]" />
                          Key Benefits
                        </h4>
                        <div className="space-y-3">
                          {project.benefits ? (
                            Array.isArray(project.benefits) ? (
                              project.benefits.map((benefit: string, i: number) => (
                                <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{benefit}</span>
                                </div>
                              ))
                            ) : (
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <span className="text-gray-700">{project.benefits}</span>
                              </div>
                            )
                          ) : (
                            <>
                              <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">Measurable impact on business metrics</span>
                              </div>
                              <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">Scalable solution for long-term growth</span>
                              </div>
                              <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">Quick time to value</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Implementation Timeline for this project */}
                    <div className="p-8 bg-gray-50 border-t border-gray-200">
                      <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-[#0BB7B7]" />
                        30-60-90 Day Implementation Timeline
                      </h4>
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* 30 Days */}
                        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#0BB7B7]">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#0BB7B7]/10 flex items-center justify-center">
                              <span className="text-xl font-bold text-[#0BB7B7]">30</span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">First</div>
                              <div className="text-lg font-bold text-gray-900">30 Days</div>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {timeline?.days30 ? (
                              Array.isArray(timeline.days30) ? (
                                timeline.days30.map((action: string, i: number) => (
                                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-[#0BB7B7] font-bold">•</span>
                                    {action}
                                  </li>
                                ))
                              ) : (
                                <li className="text-sm text-gray-600">{timeline.days30}</li>
                              )
                            ) : (
                              <>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Project kickoff & team alignment
                                </li>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Requirements gathering
                                </li>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Initial setup and configuration
                                </li>
                              </>
                            )}
                          </ul>
                        </div>

                        {/* 60 Days */}
                        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#0BB7B7]/70">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#0BB7B7]/10 flex items-center justify-center">
                              <span className="text-xl font-bold text-[#0BB7B7]">60</span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Days</div>
                              <div className="text-lg font-bold text-gray-900">31-60</div>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {timeline?.days60 ? (
                              Array.isArray(timeline.days60) ? (
                                timeline.days60.map((action: string, i: number) => (
                                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-[#0BB7B7] font-bold">•</span>
                                    {action}
                                  </li>
                                ))
                              ) : (
                                <li className="text-sm text-gray-600">{timeline.days60}</li>
                              )
                            ) : (
                              <>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Core implementation
                                </li>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Testing and validation
                                </li>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Team training
                                </li>
                              </>
                            )}
                          </ul>
                        </div>

                        {/* 90 Days */}
                        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#0BB7B7]/40">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#0BB7B7]/10 flex items-center justify-center">
                              <span className="text-xl font-bold text-[#0BB7B7]">90</span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Days</div>
                              <div className="text-lg font-bold text-gray-900">61-90</div>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {timeline?.days90 ? (
                              Array.isArray(timeline.days90) ? (
                                timeline.days90.map((action: string, i: number) => (
                                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-[#0BB7B7] font-bold">•</span>
                                    {action}
                                  </li>
                                ))
                              ) : (
                                <li className="text-sm text-gray-600">{timeline.days90}</li>
                              )
                            ) : (
                              <>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Full deployment
                                </li>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Performance monitoring
                                </li>
                                <li className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#0BB7B7] font-bold">•</span>
                                  Optimization and scaling
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </section>


            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/80 rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Turn These Insights Into Action?
              </h2>
               <p className="text-xl mb-8 text-white/90">
                 Let&apos;s schedule a call to discuss your AI transformation strategy
               </p>
              <ClientButtons assessmentId={assessmentId} companyName={assessment.companyName} />
            </section>

            {/* Assessment Details */}
            <div className="text-center text-sm text-gray-500">
              <p>Assessment ID: {assessmentId}</p>
              <p>Created: {new Date(assessment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p className="mb-2">
            Built with ❤️ by <span className="font-bold text-[#0BB7B7]">Surfing Digital</span>
          </p>
          <p className="text-sm">Ride the AI Wave — from Idea to ROI</p>
        </div>
      </footer>
    </div>
  )
}

