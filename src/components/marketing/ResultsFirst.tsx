import { Card } from '@/components/ui/card'
import { ShoppingCart, Cog, Headphones, FileText } from 'lucide-react'

const domains = [
  {
    icon: ShoppingCart,
    title: 'Sales & Marketing',
    examples: 'AI copilots for CRM, personalized offers, faster RFPs.',
    results: '+5–15% conversion',
  },
  {
    icon: Cog,
    title: 'Operations',
    examples: 'Workflow automation, QA, forecasting.',
    results: '−30% repetitive tasks',
  },
  {
    icon: Headphones,
    title: 'Customer Service',
    examples: 'AI chat & auto-resolution, NPS boosts.',
    results: '−20–40% handling time',
  },
  {
    icon: FileText,
    title: 'Back Office',
    examples: 'Report generation, compliance, and documentation.',
    results: '−30% manual processing',
  },
]

export default function ResultsFirst() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Where You'll See Results First
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            High-impact AI opportunities across your business.
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain, index) => (
            <Card 
              key={index}
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-gray-100 hover:border-[#00BFA5]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6F61]/10">
                <domain.icon className="h-6 w-6 text-[#FF6F61]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {domain.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {domain.examples}
              </p>
              <div className="inline-flex items-center rounded-full bg-[#00BFA5]/10 px-3 py-1 text-sm font-semibold text-[#00BFA5]">
                {domain.results}
              </div>
            </Card>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-gray-900">Typical results:</span>{' '}
            +5–15% conversion · −20–40% handling time · −30% repetitive tasks
          </p>
        </div>
      </div>
    </section>
  )
}

