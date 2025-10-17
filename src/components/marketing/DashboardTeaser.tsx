import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TrendingUp, Users, Shield, Zap, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'ROI Tracker',
    description: 'Monthly impact on revenue or cost savings.',
  },
  {
    icon: Users,
    title: 'Adoption Metrics',
    description: 'Usage, streaks, and team progress.',
  },
  {
    icon: Shield,
    title: 'Risk & Compliance Panel',
    description: 'Live governance and safety checks.',
  },
  {
    icon: Zap,
    title: 'Backlog ICE Score',
    description: 'Next high-impact AI opportunities.',
  },
]

export default function DashboardTeaser() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Your AI Command Center
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Track progress, measure impact, and keep your team aligned — all in one place.
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0BB7B7]/20">
                <feature.icon className="h-5 w-5 text-[#0BB7B7]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild 
            size="lg"
            className="bg-[#00BFA5] hover:bg-[#00BFA5]/90 text-white px-8 py-6 text-lg rounded-2xl shadow-lg"
          >
            <Link href="/dashboard">
              View Dashboard Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

