'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookiesAccepted')
    if (!hasAccepted) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🍪</div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze our traffic, 
                    and provide personalized AI assessments. By clicking "Accept", you consent 
                    to our use of cookies.{' '}
                    <Link 
                      href="/privacy" 
                      className="text-[#0BB7B7] hover:text-[#0BB7B7]/80 underline font-medium"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={declineCookies}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-white bg-[#0BB7B7] hover:bg-[#0BB7B7]/90 rounded-lg transition-colors shadow-sm"
              >
                Accept Cookies
              </button>
              <button
                onClick={declineCookies}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

