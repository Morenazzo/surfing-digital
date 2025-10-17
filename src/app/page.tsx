import Hero from '@/components/marketing/Hero'
import ExecMessage from '@/components/marketing/ExecMessage'
import WhatYouGet from '@/components/marketing/WhatYouGet'
import HowItWorks from '@/components/marketing/HowItWorks'
import ResultsFirst from '@/components/marketing/ResultsFirst'
import WhyItWorks from '@/components/marketing/WhyItWorks'
import DashboardTeaser from '@/components/marketing/DashboardTeaser'
import Plans from '@/components/marketing/Plans'
import Signs from '@/components/marketing/Signs'
import FAQ from '@/components/marketing/FAQ'
import FinalCTA from '@/components/marketing/FinalCTA'
import SiteFooter from '@/components/marketing/SiteFooter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ExecMessage />
      <WhatYouGet />
      <HowItWorks />
      <ResultsFirst />
      <WhyItWorks />
      <DashboardTeaser />
      <Plans />
      <Signs />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  )
}
