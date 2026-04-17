'use client'

import { useState } from 'react'
import { Business, CardConfig } from '@/types'
import { CardPreview } from './CardPreview'
import { SidebarTabs } from './SidebarTabs'
import { updateCardDetails, updateCardConfig } from '@/app/actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DEFAULT_CONFIG: CardConfig = {
  template: 'classic',
  person_name: '',
  person_title: '',
  background_url: '',
  background_color: '#87CEEB',
  logo_url: '',
  font_family: 'DM Sans',
  text_color: '#000000',
  button_style: 'rounded',
  button_color: '#2d3748',
}

interface Props {
  business: Business
}

export function CardEditorShell({ business }: Props) {
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile')
  const [config, setConfig] = useState<CardConfig>({
    ...DEFAULT_CONFIG,
    ...business.card_config,
  })
  const [businessData, setBusinessData] = useState({
    name: business.name,
    description: business.description || '',
    slug: business.slug,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  function updateConfig(partial: Partial<CardConfig>) {
    setConfig(prev => ({ ...prev, ...partial }))
    setSaved(false)
  }

  function updateBizData(partial: Partial<typeof businessData>) {
    setBusinessData(prev => ({ ...prev, ...partial }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    const formData = new FormData()
    formData.set('name', businessData.name)
    formData.set('description', businessData.description)
    formData.set('slug', businessData.slug)
    Object.entries(config).forEach(([k, v]) => formData.set(k, v))

    await updateCardDetails(business.id, formData)
    setSaving(false)
    setSaved(true)
  }

  async function handlePublish() {
    await handleSave()
    router.push(`/${businessData.slug}`)
  }

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A]">
      {/* Top bar */}
      <header className="h-14 border-b border-[#1A1A1A] flex items-center justify-between px-5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[#666] hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#C8FF00] rounded flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>
              {businessData.name || 'Business Card'}
            </span>
          </div>
        </div>

        {/* Preview Toggle */}
        <div className="flex items-center bg-[#141414] border border-[#2A2A2A] rounded-lg overflow-hidden">
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
              previewMode === 'mobile' ? 'bg-[#2A2A2A] text-white' : 'text-[#666] hover:text-white'
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" />
            </svg>
            Mobile
          </button>
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
              previewMode === 'desktop' ? 'bg-[#2A2A2A] text-white' : 'text-[#666] hover:text-white'
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            Desktop
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="border border-[#2A2A2A] text-white text-xs font-medium px-4 py-2 rounded-lg hover:border-[#444] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? 'Saved' : 'Save Progress'}
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="bg-[#C8FF00] text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#D4FF33] transition-colors disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Preview area */}
        <div className="flex-1 flex items-center justify-center bg-[#0F0F0F] overflow-auto p-8">
          <CardPreview
            mode={previewMode}
            config={config}
            business={{ ...business, ...businessData }}
            links={business.social_links ?? []}
          />
        </div>

        {/* Sidebar */}
        <SidebarTabs
          config={config}
          businessData={businessData}
          businessId={business.id}
          links={business.social_links ?? []}
          onConfigChange={updateConfig}
          onBizDataChange={updateBizData}
        />
      </div>
    </div>
  )
}
