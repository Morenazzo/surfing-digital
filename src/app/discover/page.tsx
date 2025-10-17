'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { URLS } from '@/config/urls'

export default function DiscoverPage() {
  const router = useRouter()

  const handleSimulateSubmission = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00BFA5]/5 via-white to-[#FF6F61]/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-screen-xl px-6 py-4 md:px-10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#00BFA5] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-2xl font-bold text-[#00BFA5]">
              Surfing.Digital
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-16 md:px-10">
        {/* Intro */}
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#00BFA5]/10">
            <Sparkles className="h-7 w-7 text-[#00BFA5]" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Free AI Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer a few questions about your business, and we'll identify your top 3 AI opportunities 
            with estimated ROI — in just 5 minutes.
          </p>
        </div>

        {/* Form Card - Placeholder for Fillout */}
        <Card className="rounded-2xl p-8 shadow-xl mb-8">
          <div className="text-center py-12">
            <div className="mb-4 text-6xl">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Embed Fillout Form Here
            </h2>
            <p className="text-gray-600 mb-6">
              Replace this placeholder with the actual Fillout.com embed code.
            </p>
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-700 font-mono">
              {URLS.FILLOUT_FORM}
            </div>
          </div>
        </Card>

        {/* Simulate Submission CTA */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            For testing purposes:
          </p>
          <Button 
            onClick={handleSimulateSubmission}
            className="bg-[#00BFA5] hover:bg-[#00BFA5]/90 text-white px-8 py-6 text-lg rounded-2xl shadow-lg"
          >
            Simulate Submission → Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  )
}

