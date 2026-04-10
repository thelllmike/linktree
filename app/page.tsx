import { supabase } from '@/lib/supabase'
import { Business } from '@/types'
import { BusinessCard } from '@/components/BusinessCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*, social_links(*)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    return []
  }
  return data ?? []
}

export default async function AdminDashboard() {
  const businesses = await getBusinesses()

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-[#1A1A1A] sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#C8FF00] rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span
              className="text-white font-bold text-lg tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              LinkBase
            </span>
          </div>
          <Link
            href="/admin/new"
            className="flex items-center gap-2 bg-[#C8FF00] text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#D4FF33] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Business
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-10 animate-fade-up">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Your Businesses
          </h1>
          <p className="text-[#666] text-base">
            {businesses.length === 0
              ? 'No businesses yet — create your first one.'
              : `${businesses.length} business${businesses.length !== 1 ? 'es' : ''} with unique link pages.`}
          </p>
        </div>

        {businesses.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-[#2A2A2A] rounded-3xl animate-fade-up">
            <div className="w-16 h-16 bg-[#141414] rounded-2xl flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-semibold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              No businesses yet
            </h2>
            <p className="text-[#555] text-sm mb-6 text-center max-w-xs">
              Create your first business profile and get a unique link page with all your social links.
            </p>
            <Link
              href="/admin/new"
              className="flex items-center gap-2 bg-[#C8FF00] text-black text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#D4FF33] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create First Business
            </Link>
          </div>
        ) : (
          /* Business grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map((business, i) => (
              <div
                key={business.id}
                className={`animate-fade-up animate-fade-up-delay-${Math.min(i + 1, 6)}`}
              >
                <BusinessCard business={business} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-[#1A1A1A] mt-10">
        <p className="text-[#444] text-xs font-mono text-center">
          LINKBASE — Business Link Pages
        </p>
      </footer>
    </div>
  )
}
