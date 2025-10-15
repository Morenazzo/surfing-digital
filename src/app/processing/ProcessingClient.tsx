'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, Loader2 } from 'lucide-react'

export default function ProcessingClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'checking' | 'processing' | 'ready' | 'error'>('checking')
  const [progress, setProgress] = useState(0)
  const email = searchParams.get('email')

  useEffect(() => {
    if (!email) {
      setStatus('error')
      return
    }

    let progressInterval: NodeJS.Timeout | undefined
    let checkInterval: NodeJS.Timeout | undefined

    const checkAssessment = async () => {
      try {
        const response = await fetch(`/api/assessment/find-latest?email=${encodeURIComponent(email)}`)
        
        if (!response.ok) {
          // Keep trying...
          console.log('Assessment not found yet, retrying...')
          return
        }

        const data = await response.json()
        
        if (data.success && data.assessmentId) {
          if (data.status === 'completed') {
            setStatus('ready')
            clearInterval(progressInterval)
            clearInterval(checkInterval)
            setProgress(100)
            
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
        // Seguir intentando...
      }
    }

    // Simular progreso visual
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90 // No llegar a 100% hasta que esté listo
        return prev + Math.random() * 10
      })
    }, 500)

    // Verificar cada 2 segundos
    checkInterval = setInterval(checkAssessment, 2000)
    
    // Primera verificación inmediata
    checkAssessment()

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
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error
          </h1>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar tu assessment. Por favor, intenta llenar el formulario nuevamente.
          </p>
          <a
            href="https://form.fillout.com/t/41HWtPX4dCus"
            className="inline-block px-6 py-3 bg-[#0BB7B7] text-white rounded-lg hover:bg-[#0BB7B7]/90 transition-colors font-medium"
          >
            Volver al formulario
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
            ¡Listo!
          </h1>
          <p className="text-gray-600">
            Redirigiendo a tus resultados...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BB7B7]/5 via-white to-[#0BB7B7]/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0BB7B7]/10 mb-6 animate-pulse">
            <TrendingUp className="w-10 h-10 text-[#0BB7B7]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🤖 Procesando tu AI Assessment
          </h1>
          <p className="text-lg text-gray-600">
            Nuestra IA está analizando tus datos y generando recomendaciones personalizadas...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso</span>
            <span className="text-sm font-bold text-[#0BB7B7]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/70 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-4 bg-gray-50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-sm">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Datos recibidos</p>
              <p className="text-xs text-gray-500">Formulario procesado correctamente</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Loader2 className="flex-shrink-0 w-6 h-6 text-[#0BB7B7] animate-spin" />
            <div>
              <p className="text-sm font-medium text-gray-900">Análisis con IA</p>
              <p className="text-xs text-gray-500">
                {status === 'checking' && 'Iniciando análisis...'}
                {status === 'processing' && 'Generando 3 proyectos de IA personalizados...'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 opacity-50">
            <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300" />
            <div>
              <p className="text-sm font-medium text-gray-900">Resultados listos</p>
              <p className="text-xs text-gray-500">Preparando tu roadmap de transformación</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-base text-yellow-800 font-semibold">
              ⏱️ Análisis Profundo en Progreso
            </p>
            <p className="text-sm text-yellow-700 mt-2">
              Nuestros 5 agentes de IA están investigando tu industria, analizando competidores, 
              calculando ROI real, y construyendo tu roadmap personalizado. Esto toma <span className="font-bold">2-4 minutos</span>.
            </p>
          </div>
          <p className="text-sm text-gray-600">
            Por favor mantén esta página abierta - serás redirigido automáticamente!
          </p>
          <p className="text-xs text-gray-500">
            El análisis detallado vale la pena la espera 🚀
          </p>
          <p className="text-xs text-gray-400 mt-4">
            <Link href="/privacy" className="hover:text-[#0BB7B7] transition-colors underline">
              Privacy Policy
            </Link>
            {" · "}
            &copy; {new Date().getFullYear()} Surfing Digital SAPI de CV
          </p>
        </div>
      </div>
    </div>
  )
}

