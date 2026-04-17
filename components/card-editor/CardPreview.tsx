'use client'

import { CardConfig, Business, SocialLink } from '@/types'
import { PLATFORMS } from '@/components/platforms'
import { PlatformIcon } from '@/components/PlatformIcon'

interface Props {
  mode: 'mobile' | 'desktop'
  config: CardConfig
  business: Pick<Business, 'name' | 'description' | 'theme_color'>
  links: SocialLink[]
}

export function CardPreview({ mode, config, business, links }: Props) {
  const isMobile = mode === 'mobile'
  const containerClass = isMobile
    ? 'w-[375px] h-[720px] rounded-[40px] border-[8px] border-[#1A1A1A] shadow-2xl'
    : 'w-[800px] h-[500px] rounded-xl border border-[#2A2A2A] shadow-xl'

  const bgStyle: React.CSSProperties = {
    backgroundColor: config.background_color || business.theme_color,
    fontFamily: `${config.font_family}, sans-serif`,
    color: config.text_color,
  }

  if (config.background_url) {
    bgStyle.backgroundImage = `url(${config.background_url})`
    bgStyle.backgroundSize = 'cover'
    bgStyle.backgroundPosition = 'center'
  }

  const initials = business.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const buttonRadius = config.button_style === 'pill' ? '9999px'
    : config.button_style === 'square' ? '8px'
    : '12px'

  return (
    <div className={`${containerClass} overflow-hidden relative`} style={bgStyle}>
      {/* Background image overlay */}
      {config.background_url && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      )}

      <div className={`relative h-full flex flex-col items-center ${isMobile ? 'px-6 pt-12 pb-8' : 'px-16 pt-10 pb-6'} overflow-auto`}>
        {/* Logo */}
        {config.logo_url ? (
          <img
            src={config.logo_url}
            alt="Logo"
            className={`${isMobile ? 'w-20 h-20' : 'w-16 h-16'} object-contain mb-2`}
          />
        ) : (
          <div
            className={`${isMobile ? 'w-20 h-20' : 'w-16 h-16'} rounded-full flex items-center justify-center text-white text-xl font-bold mb-2`}
            style={{ backgroundColor: business.theme_color + 'aa' }}
          >
            {initials}
          </div>
        )}

        {/* Company name */}
        <h2 className={`font-bold text-center mb-0.5 uppercase tracking-wider ${isMobile ? 'text-sm' : 'text-base'}`}>
          {business.name}
        </h2>

        {/* Tagline */}
        {business.description && (
          <p className={`text-center opacity-70 mb-4 ${isMobile ? 'text-[10px]' : 'text-xs'} uppercase tracking-widest`}>
            {business.description}
          </p>
        )}

        {/* Person name */}
        {config.person_name && (
          <h1 className={`font-bold text-center ${isMobile ? 'text-2xl mt-4 mb-1' : 'text-3xl mt-3 mb-1'}`}
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {config.person_name}
          </h1>
        )}

        {/* Person title */}
        {config.person_title && (
          <p className={`text-center font-medium mb-4 ${isMobile ? 'text-sm' : 'text-base'}`}>
            {config.person_title}
          </p>
        )}

        {/* Contact buttons */}
        <div className={`w-full space-y-3 mt-auto ${isMobile ? 'px-2' : 'max-w-md mx-auto px-8'}`}>
          {links.map((link) => {
            const platform = PLATFORMS[link.platform] ?? PLATFORMS.other
            const label = link.label || platform.name

            return (
              <div
                key={link.id}
                className="flex items-center gap-3 px-5 py-3.5 backdrop-blur-sm cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: config.button_color + 'cc',
                  borderRadius: buttonRadius,
                  color: '#ffffff',
                }}
              >
                <PlatformIcon platform={link.platform} size={18} />
                <span className="font-medium text-sm flex-1 text-center">{label}</span>
              </div>
            )
          })}

          {links.length === 0 && (
            <div className="text-center opacity-50 py-8">
              <p className="text-sm">No contact links yet</p>
              <p className="text-xs mt-1">Add links from the Content tab</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
