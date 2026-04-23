import { supabase } from '@/lib/supabase'
import { Business, SocialLink, BankAccount, CardConfig } from '@/types'
import { PLATFORMS } from '@/components/platforms'
import { PlatformIcon } from '@/components/PlatformIcon'
import { PublicBankAccount } from '@/components/PublicBankAccount'
import { BusinessCardPage } from '@/components/card/BusinessCardPage'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

async function getBusinessBySlug(
  slug: string
): Promise<(Business & { social_links: SocialLink[]; bank_accounts: BankAccount[] }) | null> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*, social_links(*), bank_accounts(*)')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  if (data.social_links) {
    data.social_links.sort((a: SocialLink, b: SocialLink) => a.display_order - b.display_order)
  }
  if (data.bank_accounts) {
    data.bank_accounts.sort((a: BankAccount, b: BankAccount) => a.display_order - b.display_order)
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

/* ─── Link Page Layout (original) ─── */
function LinkPageView({
  business,
  links,
  bankAccounts,
}: {
  business: Business
  links: SocialLink[]
  bankAccounts: BankAccount[]
}) {
  const themeColor = business.theme_color || '#000000'
  const initials = business.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 0, g: 0, b: 0 }
  }
  const rgb = hexToRgb(themeColor)

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="fixed inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(${rgb.r},${rgb.g},${rgb.b},0.10) 0%, transparent 70%)`,
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative w-full max-w-md mx-auto px-5 py-14 flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mb-5 animate-fade-up">
          <div
            className="w-24 h-24 rounded-full p-[3px] animate-pulse-glow"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeColor}88, rgba(139,92,246,0.6))`,
            }}
          >
            {business.avatar_url ? (
              <img
                src={business.avatar_url}
                alt={business.name}
                className="w-full h-full rounded-full object-cover border-2 border-[#0a0a0a]"
              />
            ) : (
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-[#0a0a0a]"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`,
                }}
              >
                {initials}
              </div>
            )}
          </div>
          <div
            className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-[2.5px] border-[#0a0a0a]"
            style={{ backgroundColor: themeColor }}
          />
        </div>

        {/* Name */}
        <h1
          className="text-2xl font-bold text-white text-center mb-2 animate-fade-up animate-fade-up-delay-1"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {business.name}
        </h1>

        {/* Description */}
        {business.description && (
          <p className="text-gray-400 text-sm text-center leading-relaxed max-w-xs mb-8 animate-fade-up animate-fade-up-delay-2">
            {business.description}
          </p>
        )}
        {!business.description && <div className="mb-6" />}

        {/* Links */}
        {links.length === 0 ? (
          <p className="text-gray-500 text-sm text-center animate-fade-up animate-fade-up-delay-3">
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
                  className={`flex items-center gap-4 w-full rounded-2xl px-5 py-4 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-200 hover:-translate-y-0.5 group animate-fade-up animate-fade-up-delay-${delay}`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: platform.color + '18', color: platform.color }}
                  >
                    <PlatformIcon platform={link.platform} size={22} />
                  </div>
                  <span className="text-gray-200 font-semibold text-sm flex-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {label}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-gray-600 group-hover:text-gray-400 transition-colors group-hover:translate-x-0.5 duration-200">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              )
            })}
          </div>
        )}

        {/* Bank Accounts */}
        {bankAccounts.length > 0 && (
          <div className="w-full mt-10 animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-white/10" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                Bank Details
              </p>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="space-y-3">
              {bankAccounts.map((account) => (
                <PublicBankAccount
                  key={account.id}
                  account={account}
                  themeColor={themeColor}
                />
              ))}
            </div>
            <p className="text-gray-500 text-[11px] text-center mt-4 leading-relaxed">
              Once payment is complete, please send the receipt or screenshot.
            </p>
          </div>
        )}

        {/* Powered by */}
        <div className="mt-12 animate-fade-up">
          <p className="text-gray-600 text-xs text-center font-mono">
            powered by{' '}
            <span className="font-semibold text-gray-500">CLEVER PROJECT</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default async function PublicBusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)

  if (!business) notFound()

  const links = business.social_links ?? []
  const bankAccounts = business.bank_accounts ?? []

  if (business.type === 'businesscard' && business.card_config) {
    return (
      <BusinessCardPage
        business={business}
        links={links}
        config={business.card_config as CardConfig}
      />
    )
  }

  return <LinkPageView business={business} links={links} bankAccounts={bankAccounts} />
}
