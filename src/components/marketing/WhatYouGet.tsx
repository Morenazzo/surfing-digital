import { Card } from '@/components/ui/card'
import { Target, TrendingUp, Calendar, BarChart3 } from 'lucide-react'

const benefits = [
  {
    icon: Target,
    title: '3 AI use cases prioritized by ROI',
    description: 'Sales, ops, service, compliance — we identify what moves the needle.',
  },
  {
    icon: TrendingUp,
    title: 'A working pilot with clear KPIs',
    description: 'Before/after metrics and a Go/No-Go decision based on real data.',
  },
  {
    icon: Calendar,
    title: '30-day integration playbook',
    description: 'For people, processes, and data — no guesswork, just action.',
  },
  {
    icon: BarChart3,
    title: 'Executive dashboard',
    description: 'Track progress, savings, and wins in real-time.',
  },
]

export default function WhatYouGet() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            What You Get
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to go from idea to measurable impact.
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-gray-100"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#00BFA5]/10">
                <benefit.icon className="h-6 w-6 text-[#00BFA5]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

