import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-[#0BB7B7] to-[#0BB7B7]/80">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Ready to move from experiments to results?
          </h2>
          
          <p className="mt-6 text-lg leading-8 sm:text-xl text-white/90">
            In 30 days, your company could have its first profitable AI project — 
            and a team that masters AI by using it.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              asChild 
              size="lg"
              className="w-full sm:w-auto bg-white hover:bg-white/90 text-[#001639] px-8 py-6 text-lg rounded-2xl shadow-xl font-semibold transition-all duration-300"
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
              className="w-full sm:w-auto border-2 border-white bg-white text-[#001639] hover:bg-white/90 px-8 py-6 text-lg rounded-2xl font-semibold transition-all duration-300"
            >
              <Link href="mailto:contact@surfing.digital">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Strategy Call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

