import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5]/5 via-white to-[#FF6F61]/5" />
      
      <div className="relative mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Ride the AI Wave to{' '}
            <span className="text-[#00BFA5]">Measurable ROI</span>{' '}
            in Under 90 Days
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            Your team learns by doing — you see real impact on revenue or cost reduction, fast.
          </p>
          
          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              asChild 
              size="lg"
              className="w-full sm:w-auto bg-[#00BFA5] hover:bg-[#00BFA5]/90 text-white px-8 py-6 text-lg rounded-2xl shadow-lg"
            >
              <Link href="/discover">
                Take the Free AI Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-[#FF6F61] text-[#FF6F61] hover:bg-[#FF6F61]/10 px-8 py-6 text-lg rounded-2xl"
            >
              <Link href="#how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>
          
          {/* Trust Bullets */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#00BFA5]" />
              <span>Tangible results in 30–90 days</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#00BFA5]" />
              <span>Proven methodology + executive coaching</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#00BFA5]" />
              <span>No noise. No paralysis. Just performance.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

