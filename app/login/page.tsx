'use client'

import { useState } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    const supabase = createSupabaseBrowser()

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email to confirm your account, then log in.')
        setIsSignUp(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else {
        router.push('/')
        router.refresh()
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-9 h-9 bg-[#C8FF00] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <span
            className="text-white font-bold text-2xl tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            LinkBase
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-7">
          <h2
            className="text-white text-lg font-semibold mb-1 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-[#666] text-sm text-center mb-6">
            {isSignUp ? 'Sign up to start managing your links' : 'Sign in to your dashboard'}
          </p>

          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-950/50 border border-green-800 text-green-300 text-sm px-4 py-3 rounded-xl mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#666] mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8FF00]/50 transition-colors placeholder:text-[#444]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs text-[#666] mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8FF00]/50 transition-colors placeholder:text-[#444]"
                placeholder="Min 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C8FF00] text-black text-sm font-semibold py-3 rounded-xl hover:bg-[#D4FF33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage('') }}
              className="text-[#666] text-sm hover:text-white transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <p className="text-[#333] text-xs text-center mt-6 font-mono">
          LINKBASE — Business Link Pages
        </p>
      </div>
    </div>
  )
}
