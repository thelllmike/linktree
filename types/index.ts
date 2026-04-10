export interface Business {
  id: string
  name: string
  slug: string
  description: string | null
  avatar_url: string | null
  theme_color: string
  created_at: string
  social_links?: SocialLink[]
}

export interface SocialLink {
  id: string
  business_id: string
  platform: string
  url: string
  label: string | null
  display_order: number
  created_at: string
}

export type Platform =
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'twitter'
  | 'linkedin'
  | 'youtube'
  | 'website'
  | 'email'
  | 'phone'
  | 'telegram'
  | 'snapchat'
  | 'pinterest'
  | 'other'
