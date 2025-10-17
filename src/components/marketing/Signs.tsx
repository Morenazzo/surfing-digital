import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowRight } from 'lucide-react'

const signs = [
  'Too many PoCs, not enough ROI.',
  'Teams using AI tools randomly — you need governance + speed.',
  'Pressure to show quick, measurable wins that inspire adoption.',
]

export default function Signs() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FF6F61]/10 via-white to-[#FF6F61]/5">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6F61]/10">
              <AlertCircle className="h-7 w-7 text-[#FF6F61]" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Signs It's Time to Start
            </h2>
          </div>
          
          {/* Signs List */}
          <div className="space-y-4 mb-12">
            {signs.map((sign, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-lg"
              >
                <div className="flex-shrink-0 rounded-full bg-[#FF6F61] h-8 w-8 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 pt-1">
                  {sign}
                </p>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              Take the Free Assessment <span className="text-gray-900 font-semibold">(5-minute diagnostic)</span>
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white px-8 py-6 text-lg rounded-2xl shadow-lg"
            >
              <Link href="/discover">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

