import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2 } from 'lucide-react'

const timeline = [
  {
    week: 'Week 0',
    title: 'Executive Diagnostic',
    description: 'Define your North-Star KPI (revenue or savings), baseline, and safe data access.',
    color: 'bg-[#00BFA5]',
  },
  {
    week: 'Weeks 1–3',
    title: 'Prototype',
    description: 'Build a minimal AI agent or workflow in a controlled setting. Test with real users.',
    color: 'bg-[#00BFA5]',
  },
  {
    week: 'Weeks 4–6',
    title: 'Pilot & Measurement',
    description: 'Run controlled experiments. Track tangible ROI and operational impact.',
    color: 'bg-[#00BFA5]',
  },
  {
    week: 'Weeks 7–8',
    title: 'Decision Time',
    description: 'Go/No-Go based on results. If it works — scale with confidence.',
    color: 'bg-[#FF6F61]',
  },
  {
    week: 'Weeks 9–12',
    title: 'Scale Up (optional)',
    description: 'Integrate across departments, establish data governance, and communicate wins.',
    color: 'bg-gray-400',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-[#00BFA5]/10 text-[#00BFA5] hover:bg-[#00BFA5]/20 px-4 py-1">
            AI Profit Sprint™
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A proven 8–12 week framework to go from chaos to measurable ROI.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00BFA5] via-[#FF6F61] to-gray-300 md:left-1/2 md:-ml-px" />
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className="relative flex items-start md:items-center"
                >
                  {/* Circle */}
                  <div className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full ${item.color} md:left-1/2 md:-ml-4`}>
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                      <div className="text-sm font-semibold text-[#00BFA5] mb-2">
                        {item.week}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

