import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { URLS } from "@/config/urls";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-teal to-turquoise opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCA0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-turquoise/20 px-4 py-2 mb-6 backdrop-blur-sm border border-turquoise/30">
            <Sparkles className="h-4 w-4 text-peach" />
            <span className="text-sm font-bold text-white font-sans">From Insight to Impact</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white font-sans mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          
          <p className="text-lg leading-8 text-white/90 font-body font-light mb-10">
            Join hundreds of companies already discovering their most profitable AI opportunities.
            Get your personalized assessment report in just 5 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-brand-500 hover:bg-brand-600 text-white shadow-2xl transition-all rounded-xl font-sans font-bold group w-full sm:w-auto"
            >
              <Link href={URLS.FILLOUT_FORM} target="_blank" rel="noopener noreferrer">
                Start Your Free Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-2 border-brand-500 text-brand-500 bg-white hover:bg-brand-50 rounded-xl font-sans font-bold w-full sm:w-auto"
            >
              <Link href="#faq">
                View Sample Report
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-8 text-white/80 text-sm font-body font-light">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-peach" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-peach" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-pink to-peach opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
}
