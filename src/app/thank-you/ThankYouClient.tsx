'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { TrendingUp, Loader2 } from 'lucide-react'

export default function ThankYouClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'checking' | 'processing' | 'ready' | 'error'>('checking')
  const [progress, setProgress] = useState(0)
  const email = searchParams.get('email')

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | undefined
    let checkInterval: NodeJS.Timeout | undefined
    let attemptCount = 0
    const maxAttempts = 60 // 2 minutos (60 x 2 segundos)

    const checkLatestAssessment = async () => {
      try {
        attemptCount++
        
        let apiUrl = '/api/assessment/find-latest'
        if (email) {
          apiUrl += `?email=${encodeURIComponent(email)}`
        }

        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          if (attemptCount >= maxAttempts) {
            throw new Error('Timeout waiting for assessment')
          }
          // Seguir intentando...
          return
        }

        const data = await response.json()
        
        if (data.assessmentId) {
          if (data.status === 'completed') {
            setStatus('ready')
            clearInterval(progressInterval)
            clearInterval(checkInterval)
            
            // Redirect después de 1 segundo
            setTimeout(() => {
              router.push(`/results/${data.assessmentId}`)
            }, 1000)
          } else {
            setStatus('processing')
          }
        }
      } catch (error) {
        console.error('Error checking assessment:', error)
        if (attemptCount >= maxAttempts) {
          setStatus('error')
          clearInterval(progressInterval)
          clearInterval(checkInterval)
        }
      }
    }

    // Simular progreso visual
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90
        return prev + Math.random() * 10
      })
    }, 500)

    // Verificar cada 2 segundos
    checkInterval = setInterval(checkLatestAssessment, 2000)
    
    // Primera verificación inmediata (después de 1 segundo para dar tiempo al webhook)
    setTimeout(checkLatestAssessment, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(checkInterval)
    }
  }, [email, router])

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⏱️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Processing Taking Longer Than Expected
          </h1>
          <p className="text-gray-600 mb-6">
            Your form is still being processed. Please check your email for the results link, or contact our support team.
          </p>
          <a
            href="mailto:support@surfing.digital"
            className="inline-block px-6 py-3 bg-[#0BB7B7] text-white rounded-lg hover:bg-[#0BB7B7]/90 transition-colors font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    )
  }

  if (status === 'ready') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Ready!
          </h1>
          <p className="text-gray-600">
            Redirecting to your results...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BB7B7]/5 via-white to-[#0BB7B7]/10">
      {/* Header with Logo */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/70 bg-clip-text text-transparent">
              Surfing.Digital
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4 py-12">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0BB7B7]/10 mb-6 animate-pulse">
              <TrendingUp className="w-10 h-10 text-[#0BB7B7]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Thank You for Completing the Assessment! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Our AI is analyzing your data and generating personalized recommendations...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">Analysis Progress</span>
              <span className="text-sm font-bold text-[#0BB7B7]">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/70 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Status Messages */}
          <div className="space-y-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
                <span className="text-green-600 text-lg font-bold">✓</span>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">Form Received</p>
                <p className="text-sm text-gray-600">Your responses were processed successfully</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Loader2 className="flex-shrink-0 w-8 h-8 text-[#0BB7B7] animate-spin" />
              <div>
                <p className="text-base font-semibold text-gray-900">AI Analysis in Progress</p>
                <p className="text-sm text-gray-600">
                  {status === 'checking' && 'Connecting to our AI system...'}
                  {status === 'processing' && 'Generating 3 personalized AI projects for your company...'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300" />
              <div>
                <p className="text-base font-semibold text-gray-900">Results Ready</p>
                <p className="text-sm text-gray-600">Preparing your transformation roadmap</p>
              </div>
            </div>
          </div>

                 {/* Footer */}
                 <div className="mt-10 text-center space-y-4">
                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                     <p className="text-base text-yellow-800 font-semibold">
                       ⏱️ Our AI Profit Crew is working hard for you!
                     </p>
                     <p className="text-sm text-yellow-700 mt-2">
                       Our 5 specialized AI agents are researching the web, analyzing your industry, 
                       calculating ROI, and creating a personalized roadmap. This comprehensive 
                       analysis takes <span className="font-bold">2-4 minutes</span>.
                     </p>
                   </div>
                   <p className="text-base text-gray-600">
                     Please keep this page open. You will be automatically redirected when your results are ready.
                   </p>
                   <p className="text-sm text-gray-500">
                     The wait is worth it - you'll get a professional, data-driven report!
                   </p>
            <div className="pt-6 border-t border-gray-200 mt-6">
              <p className="text-xs text-gray-400">
                Powered by <span className="font-semibold text-[#0BB7B7]">Surfing.Digital</span> AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

