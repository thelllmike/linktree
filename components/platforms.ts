export interface PlatformConfig {
  name: string
  color: string
  bg: string
  placeholder: string
}

export const PLATFORMS: Record<string, PlatformConfig> = {
  whatsapp: {
    name: 'WhatsApp',
    color: '#25D366',
    bg: '#E7F8EE',
    placeholder: 'https://wa.me/94771234567',
  },
  instagram: {
    name: 'Instagram',
    color: '#E1306C',
    bg: '#FEE9F0',
    placeholder: 'https://instagram.com/yourbusiness',
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    bg: '#E8F1FF',
    placeholder: 'https://facebook.com/yourbusiness',
  },
  tiktok: {
    name: 'TikTok',
    color: '#010101',
    bg: '#F0F0F0',
    placeholder: 'https://tiktok.com/@yourbusiness',
  },
  twitter: {
    name: 'Twitter / X',
    color: '#000000',
    bg: '#F0F0F0',
    placeholder: 'https://twitter.com/yourbusiness',
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    bg: '#E8F1FB',
    placeholder: 'https://linkedin.com/company/yourbusiness',
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    bg: '#FFE8E8',
    placeholder: 'https://youtube.com/@yourbusiness',
  },
  telegram: {
    name: 'Telegram',
    color: '#2AABEE',
    bg: '#E6F6FD',
    placeholder: 'https://t.me/yourbusiness',
  },
  snapchat: {
    name: 'Snapchat',
    color: '#FFFC00',
    bg: '#FFFDE6',
    placeholder: 'https://snapchat.com/add/yourbusiness',
  },
  pinterest: {
    name: 'Pinterest',
    color: '#E60023',
    bg: '#FEE6E9',
    placeholder: 'https://pinterest.com/yourbusiness',
  },
  github: {
    name: 'GitHub',
    color: '#ffffff',
    bg: '#1A1B1E',
    placeholder: 'https://github.com/yourusername',
  },
  website: {
    name: 'Website',
    color: '#6B7280',
    bg: '#F3F4F6',
    placeholder: 'https://yourbusiness.com',
  },
  email: {
    name: 'Email',
    color: '#EA4335',
    bg: '#FEE8E6',
    placeholder: 'mailto:hello@yourbusiness.com',
  },
  phone: {
    name: 'Phone',
    color: '#34A853',
    bg: '#E6F9ED',
    placeholder: 'tel:+94771234567',
  },
  other: {
    name: 'Other Link',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    placeholder: 'https://...',
  },
}

export const PLATFORM_ORDER = [
  'whatsapp',
  'instagram',
  'facebook',
  'tiktok',
  'twitter',
  'linkedin',
  'youtube',
  'telegram',
  'snapchat',
  'pinterest',
  'github',
  'website',
  'email',
  'phone',
  'other',
]
