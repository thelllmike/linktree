import { SocialLink } from '@/types'
import { PLATFORMS } from '@/components/platforms'
import { PlatformIcon } from '@/components/PlatformIcon'

interface SocialGridProps {
  links: SocialLink[]
}

const ACTION_PLATFORMS = new Set(['phone', 'email', 'whatsapp', 'website'])

function getIconColor(platformColor: string): string {
  const hex = platformColor.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.25 ? '#e0e0e0' : platformColor
}

export function SocialGrid({ links }: SocialGridProps) {
  const socialLinks = links.filter((l) => !ACTION_PLATFORMS.has(l.platform))

  if (socialLinks.length === 0) return null

  return (
    <div className="w-full">
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold mb-3 ml-1">
        Connect
      </p>
      <div className="grid grid-cols-3 gap-3">
        {socialLinks.map((link) => {
          const platform = PLATFORMS[link.platform] ?? PLATFORMS.other
          const iconColor = getIconColor(platform.color)

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:scale-105 hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div
                style={{ color: iconColor }}
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <PlatformIcon platform={link.platform} size={24} />
              </div>
              <span className="text-[11px] text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                {link.label || platform.name}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
