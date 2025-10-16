import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { URLS } from "@/config/urls";

export function Hero() {
  return (
    <section className="relative isolate pt-20 overflow-hidden">
      {/* Background gradients - Deep oceanic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001639] via-[#004F6E] to-[#0BB7B7]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCA0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink to-peach opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      
      <div className="relative py-12 sm:py-16 lg:py-20 min-h-[85vh] flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-turquoise/20 px-4 py-2 mb-6 backdrop-blur-sm border border-turquoise/30">
              <Sparkles className="h-4 w-4 text-peach" />
              <span className="text-sm font-bold text-white font-sans">Surf The AI Wave</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white font-sans leading-tight">
              Discover Your Top 3 AI Projects with Measurable <span className="text-accent-peach drop-shadow-[0_0_20px_rgba(255,208,141,0.5)]">ROI</span>
              <span className="text-accent-peach drop-shadow-[0_0_20px_rgba(255,208,141,0.5)]"> in Just 5 Minutes</span>
            </h1>
            <p className="mt-6 text-lg leading-7 text-white/90 font-body font-light">
              Through our smart business assessment, we identify high-impact use cases,
              estimate financial returns, and generate a 30-60-90 day action plan
              to turn AI insights into real profit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-brand-500 hover:bg-brand-600 text-white shadow-2xl hover:shadow-xl transition-all rounded-xl font-sans font-bold group w-full sm:w-auto"
              >
                <Link href={URLS.FILLOUT_FORM} target="_blank" rel="noopener noreferrer">
                  Start Your Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 hover:border-white backdrop-blur-sm rounded-xl font-sans font-bold w-full sm:w-auto bg-transparent"
              >
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white/80 text-sm font-body font-light">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-peach flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-peach flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-peach flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5-minute assessment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink to-peach opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
