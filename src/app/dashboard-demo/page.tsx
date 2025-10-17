'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, TrendingUp, Zap, Calendar, Award, Target } from 'lucide-react'

const sampleProjects = [
  {
    title: 'Sales Copilot for CRM',
    description: '+5–12% conversion uplift via next-best-action prompts.',
    roi: '+8% conversion',
    impact: 'High',
    color: 'from-[#00BFA5] to-[#00BFA5]/80',
  },
  {
    title: 'Ops Automation — Docs to Decisions',
    description: '−30% manual processing time with LLM + RPA.',
    roi: '−30% processing time',
    impact: 'High',
    color: 'from-[#FF6F61] to-[#FF6F61]/80',
  },
  {
    title: 'CX Auto-Resolution',
    description: '−20–40% AHT, higher CSAT via guided responses.',
    roi: '−25% AHT',
    impact: 'Medium',
    color: 'from-purple-500 to-purple-400',
  },
]

export default function DashboardDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-screen-xl px-6 py-4 md:px-10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#00BFA5] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-2xl font-bold text-[#00BFA5]">
              Surfing.Digital
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-xl px-6 py-12 md:px-10">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Demo User! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Here's your AI transformation roadmap.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your AI Projects
              </h2>
              <div className="space-y-6">
                {sampleProjects.map((project, index) => (
                  <Card 
                    key={index}
                    className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {project.title}
                          </h3>
                          <Badge 
                            className={`bg-${project.impact === 'High' ? '[#00BFA5]' : 'amber-500'} text-white`}
                          >
                            {project.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-[#00BFA5]" />
                          <span className="font-semibold text-[#00BFA5]">
                            {project.roi}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white rounded-xl"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      View 30-Day Plan
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-6">
            {/* Points Card */}
            <Card className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-[#00BFA5] to-[#00BFA5]/80 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Your Points</h3>
                <Zap className="h-6 w-6" />
              </div>
              <div className="text-5xl font-bold mb-4">420</div>
              <Progress value={65} className="h-2 bg-white/20 [&>div]:bg-white" />
              <p className="text-sm text-white/80 mt-3">
                Level 3 · 180 points to Level 4
              </p>
            </Card>

            {/* Badges Card */}
            <Card className="rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-[#FF6F61]" />
                <h3 className="text-lg font-bold text-gray-900">Badges</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-[#00BFA5]/10">
                  <div className="text-3xl mb-1">🎯</div>
                  <div className="text-xs text-gray-600 font-medium">First Sprint</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-[#FF6F61]/10">
                  <div className="text-3xl mb-1">🚀</div>
                  <div className="text-xs text-gray-600 font-medium">Quick Start</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-purple-100">
                  <div className="text-3xl mb-1">💎</div>
                  <div className="text-xs text-gray-600 font-medium">ROI Master</div>
                </div>
              </div>
            </Card>

            {/* Progress Card */}
            <Card className="rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-[#00BFA5]" />
                <h3 className="text-lg font-bold text-gray-900">Sprint Progress</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Week 1-3: Prototype</span>
                    <span className="font-semibold text-[#00BFA5]">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Week 4-6: Pilot</span>
                    <span className="font-semibold text-[#00BFA5]">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Week 7-8: Decision</span>
                    <span className="font-semibold text-gray-400">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

