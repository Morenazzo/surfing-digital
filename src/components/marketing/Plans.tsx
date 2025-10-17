import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$999',
    period: 'month per team',
    description: '3–6 people',
    badge: 'Best for pilot teams',
    features: [
      '30–60 day sprint',
      'Weekly coaching',
      'Dashboard access',
      'Community access',
      'ROI tracking',
    ],
  },
  {
    name: 'Corporate',
    price: 'from $4,999',
    period: 'month',
    description: 'Multiple teams',
    badge: 'Enterprise-ready',
    features: [
      'Multiple teams',
      'Enterprise dashboards',
      'Executive enablement',
      'Annual roadmap',
      'Priority support',
      'Custom integrations',
    ],
  },
]

export default function Plans() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that fits your team size and ambition.
          </p>
        </div>
        
        {/* Plans Grid */}
        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`rounded-2xl p-8 shadow-xl ${
                index === 1 ? 'border-2 border-[#00BFA5] relative' : 'border-gray-200'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#00BFA5] text-white hover:bg-[#00BFA5]/90 px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600"> USD / {plan.period}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#00BFA5] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild 
                className={`w-full py-6 text-lg rounded-xl ${
                  index === 1 
                    ? 'bg-[#00BFA5] hover:bg-[#00BFA5]/90 text-white' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                <Link href="mailto:contact@surfing.digital">
                  Book a Strategy Call
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

