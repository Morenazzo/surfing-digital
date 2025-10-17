import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background gradient - Brandboard oceanic colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001639] via-[#00586A] to-[#0BB7B7]" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCA0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="relative mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-[#FFD08D]" />
            <span className="text-sm font-semibold text-white">Surf The AI Wave</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Ride the AI Wave to{' '}
            <span className="text-[#FFD08D] drop-shadow-[0_0_20px_rgba(255,208,141,0.3)]">Measurable ROI</span>{' '}
            in Under{' '}
            <span className="text-[#FFD08D] drop-shadow-[0_0_20px_rgba(255,208,141,0.3)]">90 Days</span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl font-light">
            Your team learns by doing — you see real impact on revenue or cost reduction, fast.
          </p>
          
          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              asChild 
              size="lg"
              className="w-full sm:w-auto bg-[#0BB7B7] hover:bg-[#0BB7B7]/90 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-[#0BB7B7]/20 font-semibold"
            >
              <Link href="/discover">
                Start Your Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl font-semibold backdrop-blur-sm"
            >
              <Link href="#how-it-works">
                Learn More
              </Link>
            </Button>
          </div>
          
          {/* Trust Bullets */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#FFD08D]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#FFD08D]" />
              <span>Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#FFD08D]" />
              <span>5-minute assessment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

