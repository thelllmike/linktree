export type BusinessType = 'linkpage' | 'businesscard'

export interface CardConfig {
  template: string
  person_name: string
  person_title: string
  background_url: string
  background_color: string
  logo_url: string
  font_family: string
  text_color: string
  button_style: string
  button_color: string
}

export interface Business {
  id: string
  user_id?: string
  name: string
  slug: string
  type: BusinessType
  description: string | null
  avatar_url: string | null
  theme_color: string
  card_config: CardConfig | null
  created_at: string
  social_links?: SocialLink[]
  bank_accounts?: BankAccount[]
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

export interface BankAccount {
  id: string
  business_id: string
  bank_name: string
  account_name: string
  account_number: string
  branch: string | null
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
  | 'github'
  | 'other'
