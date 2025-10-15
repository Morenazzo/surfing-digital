"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Mail, Loader2, ArrowLeft } from 'lucide-react';

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Check if user exists
      const response = await fetch(`/api/dashboard?email=${encodeURIComponent(email)}`);
      
      if (response.ok) {
        // User exists, redirect to dashboard
        router.push(`/dashboard?email=${encodeURIComponent(email)}`);
      } else if (response.status === 404) {
        setError('No account found with this email. Please complete an assessment first.');
        setLoading(false);
      } else {
        setError('An error occurred. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BB7B7]/5 via-white to-[#0BB7B7]/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#0BB7B7] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#0BB7B7] to-[#0BB7B7]/70 bg-clip-text text-transparent">
              Surfing.Digital
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0BB7B7]/10 mb-4">
                <LogIn className="w-8 h-8 text-[#0BB7B7]" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Access Your Dashboard
              </h1>
              <p className="text-gray-600">
                Enter your email to view your AI assessments
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0BB7B7] focus:border-transparent text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0BB7B7] text-white rounded-lg hover:bg-[#0BB7B7]/90 transition-colors font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Access Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Don&apos;t have an account yet?
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#0BB7B7] hover:text-[#0BB7B7]/80 font-medium"
              >
                Take Your First Assessment
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-1">📊 View All Assessments</h3>
              <p className="text-sm text-blue-700">
                Access your complete assessment history and track your AI journey over time
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-1">🚀 AI Maturity Score</h3>
              <p className="text-sm text-green-700">
                See your AI readiness level and get personalized recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

