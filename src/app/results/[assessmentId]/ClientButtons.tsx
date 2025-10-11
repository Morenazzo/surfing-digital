'use client'

import { Mail, Download } from 'lucide-react'

interface ClientButtonsProps {
  assessmentId: string
  companyName?: string | null
}

export function ClientButtons({ assessmentId, companyName }: ClientButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href={`mailto:hello@surfing.digital?subject=AI Assessment Follow-up - ${companyName || 'Company'}&body=Hi, I just completed my AI assessment (ID: ${assessmentId}) and I'd like to discuss the next steps.`}
        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0BB7B7] rounded-lg hover:bg-gray-50 transition-colors font-bold text-lg shadow-lg"
      >
        <Mail className="w-5 h-5" />
        Schedule a Call
      </a>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-bold text-lg border-2 border-white/30"
      >
        <Download className="w-5 h-5" />
        Download Report
      </button>
    </div>
  )
}

export function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-3 bg-[#0BB7B7] text-white rounded-lg hover:bg-[#0BB7B7]/90 transition-colors font-medium"
    >
      Refresh Page
    </button>
  )
}

