'use client'

import { useState } from 'react'
import { Business, SocialLink, CardConfig } from '@/types'
import { ProfileHeader } from './ProfileHeader'
import { ToggleSwitch } from './ToggleSwitch'
import { ActionButtons } from './ActionButtons'
import { SocialGrid } from './SocialGrid'
import { GlassCard } from './GlassCard'
import { PlatformIcon } from '@/components/PlatformIcon'

interface Props {
  business: Business
  links: SocialLink[]
  config: CardConfig
}

export function BusinessCardPage({ business, links, config }: Props) {
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>(
    'personal',
  )

  const websiteLink = links.find((l) => l.platform === 'website')
  const emailLink = links.find((l) => l.platform === 'email')
  const whatsappLink = links.find((l) => l.platform === 'whatsapp')

  const getDisplayUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  const handleLeaveMessage = () => {
    if (emailLink) {
      const href = emailLink.url.startsWith('mailto:')
        ? emailLink.url
        : `mailto:${emailLink.url}`
      window.location.href = href
    } else if (whatsappLink) {
      window.open(whatsappLink.url, '_blank')
    }
  }

  const showLeaveMessage = !!(emailLink || whatsappLink)

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] relative overflow-hidden"
      style={{ fontFamily: `'${config.font_family}', 'DM Sans', sans-serif` }}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.07),transparent)]" />
      {/* Subtle dot grid */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative w-full max-w-[420px] mx-auto px-5 pt-12 pb-28 flex flex-col items-center">
        {/* Profile Header */}
        <ProfileHeader
          avatarUrl={business.avatar_url || config.logo_url || null}
          name={config.person_name || business.name}
          title={config.person_title || ''}
          themeColor={config.background_color || business.theme_color}
        />

        {/* Toggle Switch */}
        <div className="mt-7 mb-7 w-full flex justify-center">
          <ToggleSwitch activeTab={activeTab} onToggle={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div key={activeTab} className="w-full animate-fade-in flex flex-col gap-5">
          {activeTab === 'personal' ? (
            <>
              {/* Action Buttons */}
              <ActionButtons
                links={links}
                personName={config.person_name || business.name}
                personTitle={config.person_title || ''}
                companyName={business.name}
              />

              {/* Social Grid */}
              <SocialGrid links={links} />

              {/* Website link */}
              {websiteLink && (
                <GlassCard className="px-5 py-4">
                  <a
                    href={websiteLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                      <PlatformIcon platform="website" size={16} />
                    </div>
                    <span className="text-sm text-gray-300 flex-1 group-hover:text-white transition-colors">
                      {websiteLink.label || getDisplayUrl(websiteLink.url)}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600 group-hover:text-gray-400 transition-colors"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </GlassCard>
              )}

              {/* Notes */}
              {business.description && (
                <div>
                  <p className="text-[10px] text-purple-400 uppercase tracking-[0.2em] font-semibold mb-3 ml-1">
                    Notes
                  </p>
                  <GlassCard className="p-5 relative overflow-hidden">
                    <span className="absolute top-1 right-4 text-7xl font-serif text-purple-500/[0.08] leading-none select-none pointer-events-none">
                      &ldquo;
                    </span>
                    <p className="text-sm text-gray-300 leading-relaxed relative z-10">
                      {business.description}
                    </p>
                  </GlassCard>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Company Card */}
              <GlassCard className="p-5">
                <div className="flex items-center gap-4">
                  {config.logo_url ? (
                    <img
                      src={config.logo_url}
                      alt={business.name}
                      className="w-14 h-14 rounded-xl object-contain bg-white/[0.04] p-1"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {business.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-lg truncate">
                      {business.name}
                    </h3>
                    {config.person_title && (
                      <p className="text-purple-400 text-sm mt-0.5 flex items-center gap-1.5">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-purple-400 shrink-0"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="truncate">{config.person_title}</span>
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* Professional Summary */}
              {business.description && (
                <div>
                  <p className="text-[10px] text-purple-400 uppercase tracking-[0.2em] font-semibold mb-3 ml-1">
                    Professional Summary
                  </p>
                  <GlassCard className="p-5">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {business.description}
                    </p>
                  </GlassCard>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10">
          <p className="text-[11px] text-center font-mono text-gray-600">
            powered by{' '}
            <span className="font-semibold text-gray-500">CLEVER PROJECT</span>
          </p>
        </div>
      </div>

      {/* Floating Leave a Message button */}
      {showLeaveMessage && (
        <button
          onClick={handleLeaveMessage}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-300 cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="shrink-0"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
          Leave a Message
        </button>
      )}
    </div>
  )
}
