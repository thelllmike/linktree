'use client'

import { CardConfig, SocialLink } from '@/types'
import { PLATFORMS, PLATFORM_ORDER } from '@/components/platforms'
import { PlatformIcon } from '@/components/PlatformIcon'
import { addSocialLink, deleteSocialLink } from '@/app/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  config: CardConfig
  businessData: { name: string; description: string; slug: string }
  businessId: string
  links: SocialLink[]
  onConfigChange: (partial: Partial<CardConfig>) => void
  onBizDataChange: (partial: Partial<{ name: string; description: string; slug: string }>) => void
}

export function ContentPanel({ config, businessData, businessId, links, onConfigChange, onBizDataChange }: Props) {
  const [addingLink, setAddingLink] = useState(false)
  const [newPlatform, setNewPlatform] = useState('phone')
  const [newUrl, setNewUrl] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const router = useRouter()

  async function handleAddLink() {
    if (!newUrl) return
    const formData = new FormData()
    formData.set('platform', newPlatform)
    formData.set('url', newUrl)
    formData.set('label', newLabel)
    await addSocialLink(businessId, formData)
    setNewUrl('')
    setNewLabel('')
    setAddingLink(false)
    router.refresh()
  }

  async function handleDeleteLink(linkId: string) {
    await deleteSocialLink(linkId, businessId)
    router.refresh()
  }

  return (
    <div className="space-y-5">
      <h3 className="text-white text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
        Content
      </h3>

      {/* Company name */}
      <div className="space-y-1.5">
        <label className="text-[#666] text-xs uppercase tracking-wider">Company Name</label>
        <input
          type="text"
          value={businessData.name}
          onChange={(e) => onBizDataChange({ name: e.target.value })}
          className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#C8FF00]/50 transition-colors"
        />
      </div>

      {/* Tagline */}
      <div className="space-y-1.5">
        <label className="text-[#666] text-xs uppercase tracking-wider">Tagline</label>
        <input
          type="text"
          value={businessData.description}
          onChange={(e) => onBizDataChange({ description: e.target.value })}
          placeholder="Slogan here"
          className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#C8FF00]/50 transition-colors placeholder:text-[#444]"
        />
      </div>

      {/* Person name */}
      <div className="space-y-1.5">
        <label className="text-[#666] text-xs uppercase tracking-wider">Your Name</label>
        <input
          type="text"
          value={config.person_name}
          onChange={(e) => onConfigChange({ person_name: e.target.value })}
          placeholder="David Zhang"
          className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#C8FF00]/50 transition-colors placeholder:text-[#444]"
        />
      </div>

      {/* Person title */}
      <div className="space-y-1.5">
        <label className="text-[#666] text-xs uppercase tracking-wider">Job Title</label>
        <input
          type="text"
          value={config.person_title}
          onChange={(e) => onConfigChange({ person_title: e.target.value })}
          placeholder="Architect"
          className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#C8FF00]/50 transition-colors placeholder:text-[#444]"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-[#1A1A1A] pt-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[#666] text-xs uppercase tracking-wider">Contact Links</label>
          <button
            onClick={() => setAddingLink(!addingLink)}
            className="text-[#C8FF00] text-xs font-medium hover:opacity-80"
          >
            {addingLink ? 'Cancel' : '+ Add'}
          </button>
        </div>

        {/* Existing links */}
        <div className="space-y-2">
          {links.map((link) => {
            const platform = PLATFORMS[link.platform] ?? PLATFORMS.other
            return (
              <div
                key={link.id}
                className="flex items-center gap-2 bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-2.5"
              >
                <PlatformIcon platform={link.platform} size={16} />
                <span className="text-white text-xs flex-1 truncate">
                  {link.label || platform.name}
                </span>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="text-[#666] hover:text-red-400 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>

        {/* Add link form */}
        {addingLink && (
          <div className="mt-3 space-y-2 bg-[#141414] border border-[#C8FF00]/30 rounded-lg p-3">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2 focus:outline-none"
            >
              {PLATFORM_ORDER.map((p) => (
                <option key={p} value={p}>{PLATFORMS[p].name}</option>
              ))}
            </select>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="URL or number"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2 focus:outline-none placeholder:text-[#444]"
            />
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Label (optional)"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2 focus:outline-none placeholder:text-[#444]"
            />
            <button
              onClick={handleAddLink}
              className="w-full bg-[#C8FF00] text-black text-xs font-semibold py-2 rounded-lg hover:bg-[#D4FF33] transition-colors"
            >
              Add Link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
