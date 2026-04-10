import { supabase } from '@/lib/supabase'
import { Business, SocialLink } from '@/types'
import { EditBusinessForm } from '@/components/EditBusinessForm'
import { LinksManager } from '@/components/LinksManager'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function getBusiness(id: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data
}

async function getLinks(businessId: string): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .eq('business_id', businessId)
    .order('display_order', { ascending: true })

  if (error) return []
  return data ?? []
}

export default async function EditBusinessPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [business, links] = await Promise.all([getBusiness(id), getLinks(id)])

  if (!business) notFound()

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-[#1A1A1A] sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#666] hover:text-white transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Dashboard
            </Link>
            <span className="text-[#2A2A2A]">/</span>
            <span className="text-white text-sm truncate max-w-[200px]" style={{ fontFamily: 'Syne, sans-serif' }}>
              {business.name}
            </span>
          </div>
          <Link
            href={`/${business.slug}`}
            target="_blank"
            className="flex items-center gap-2 border border-[#2A2A2A] text-[#888] text-xs px-3 py-2 rounded-xl hover:border-[#444] hover:text-white transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Page
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Business profile header */}
        <div className="flex items-center gap-5 mb-10 animate-fade-up">
          {business.avatar_url ? (
            <img
              src={business.avatar_url}
              alt={business.name}
              className="w-16 h-16 rounded-2xl object-cover border border-[#2A2A2A]"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold border border-[#2A2A2A]"
              style={{ backgroundColor: business.theme_color }}
            >
              {business.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
            </div>
          )}
          <div>
            <h1
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {business.name}
            </h1>
            <p className="text-[#C8FF00]/70 text-sm font-mono mt-0.5">
              linkbase.app/{business.slug}
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Business info */}
          <div className="animate-fade-up animate-fade-up-delay-1">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
              <h2
                className="text-white font-semibold text-sm mb-5"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Business Details
              </h2>
              <EditBusinessForm business={business} />
            </div>
          </div>

          {/* Right: Links */}
          <div className="animate-fade-up animate-fade-up-delay-2">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
              <LinksManager businessId={business.id} links={links} />
            </div>
          </div>
        </div>

        {/* Preview hint */}
        <div className="mt-8 bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 flex items-center justify-between animate-fade-up animate-fade-up-delay-3">
          <div>
            <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
              Your public link page is live
            </p>
            <p className="text-[#555] text-xs mt-0.5 font-mono">
              linkbase.app/{business.slug}
            </p>
          </div>
          <Link
            href={`/${business.slug}`}
            target="_blank"
            className="flex items-center gap-2 bg-[#C8FF00] text-black text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#D4FF33] transition-colors whitespace-nowrap"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open Page
          </Link>
        </div>
      </main>
    </div>
  )
}
