import { supabase } from '@/lib/supabase'
import { Business, SocialLink } from '@/types'
import { PLATFORMS } from '@/components/platforms'
import { PlatformIcon } from '@/components/PlatformIcon'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

async function getBusinessBySlug(slug: string): Promise<(Business & { social_links: SocialLink[] }) | null> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*, social_links(*)')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  // sort links by display_order
  if (data.social_links) {
    data.social_links.sort((a: SocialLink, b: SocialLink) => a.display_order - b.display_order)
  }
  return data
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)
  if (!business) return { title: 'Not Found' }
  return {
    title: business.name,
    description: business.description ?? `${business.name} — links`,
  }
}

export default async function PublicBusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)

  if (!business) notFound()

  const links = business.social_links ?? []
  const themeColor = business.theme_color || '#000000'
  const initials = business.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  // Generate a subtle pastel tint from the theme color for backgrounds
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 }
  }
  const rgb = hexToRgb(themeColor)

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(${rgb.r},${rgb.g},${rgb.b},0.12) 0%, transparent 60%), #F8F8F6`,
      }}
    >
      <div className="w-full max-w-md mx-auto px-5 py-14 flex flex-col items-center">

        {/* Avatar */}
        <div className="relative mb-5 animate-fade-up">
          {business.avatar_url ? (
            <img
              src={business.avatar_url}
              alt={business.name}
              className="w-24 h-24 rounded-full object-cover shadow-lg"
              style={{ border: `3px solid ${themeColor}` }}
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`,
                border: `3px solid ${themeColor}`,
              }}
            >
              {initials}
            </div>
          )}
          {/* Online dot */}
          <div
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#F8F8F6]"
            style={{ backgroundColor: themeColor }}
          />
        </div>

        {/* Name */}
        <h1
          className="text-2xl font-bold text-gray-900 text-center mb-2 animate-fade-up animate-fade-up-delay-1"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {business.name}
        </h1>

        {/* Description */}
        {business.description && (
          <p className="text-gray-500 text-sm text-center leading-relaxed max-w-xs mb-8 animate-fade-up animate-fade-up-delay-2">
            {business.description}
          </p>
        )}
        {!business.description && <div className="mb-6" />}

        {/* Links */}
        {links.length === 0 ? (
          <p className="text-gray-400 text-sm text-center animate-fade-up animate-fade-up-delay-3">
            No links available yet.
          </p>
        ) : (
          <div className="w-full space-y-3">
            {links.map((link, i) => {
              const platform = PLATFORMS[link.platform] ?? PLATFORMS.other
              const label = link.label || platform.name
              const delay = Math.min(i + 3, 6)

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 w-full bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group animate-fade-up animate-fade-up-delay-${delay}`}
                  style={{
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: platform.bg,
                      color: platform.color,
                    }}
                  >
                    <PlatformIcon platform={link.platform} size={22} />
                  </div>

                  {/* Label */}
                  <span
                    className="text-gray-800 font-semibold text-sm flex-1"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {label}
                  </span>

                  {/* Arrow */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-300 group-hover:text-gray-500 transition-colors group-hover:translate-x-0.5 duration-200"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              )
            })}
          </div>
        )}

        {/* Powered by */}
        <div className="mt-12 animate-fade-up">
          <p className="text-gray-300 text-xs text-center font-mono">
            powered by{' '}
            <span className="font-semibold text-gray-400">CLEVERPROJECT</span>
          </p>
        </div>
      </div>
    </div>
  )
}
