'use client'

import { useState, useActionState } from 'react'
import { addSocialLink, updateSocialLink, deleteSocialLink } from '@/app/actions'
import { SocialLink } from '@/types'
import { PLATFORMS, PLATFORM_ORDER } from './platforms'
import { PlatformIcon } from './PlatformIcon'
import { useRouter } from 'next/navigation'

interface Props {
  businessId: string
  links: SocialLink[]
}

type AddFormState = { error?: string; success?: boolean }

const ADD_INIT: AddFormState = { error: undefined, success: false }

function AddLinkForm({ businessId, onSuccess }: { businessId: string; onSuccess: () => void }) {
  const addWithId = addSocialLink.bind(null, businessId)
  const [state, formAction, isPending] = useActionState(
    async (_prev: AddFormState, formData: FormData): Promise<AddFormState> => {
      const result = await addWithId(formData)
      if (result?.success) {
        onSuccess()
        return ADD_INIT
      }
      return result ?? ADD_INIT
    },
    ADD_INIT
  )
  const [selectedPlatform, setSelectedPlatform] = useState('whatsapp')
  const platformConfig = PLATFORMS[selectedPlatform]

  return (
    <form action={formAction} className="space-y-4 bg-[#0F0F0F] border border-[#C8FF00]/30 rounded-2xl p-5">
      <h4 className="text-white text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
        Add New Link
      </h4>

      {state.error && (
        <div className="bg-red-950/50 border border-red-800 text-red-300 text-xs px-3 py-2 rounded-lg">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          Platform
        </label>
        <select
          name="platform"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="w-full bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
        >
          {PLATFORM_ORDER.map((key) => (
            <option key={key} value={key}>
              {PLATFORMS[key].name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          URL
        </label>
        <input
          type="url"
          name="url"
          required
          placeholder={platformConfig?.placeholder ?? 'https://...'}
          className="w-full bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          Label <span className="text-[#555] normal-case">(optional)</span>
        </label>
        <input
          type="text"
          name="label"
          placeholder={platformConfig?.name ?? 'Custom label'}
          className="w-full bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-[#C8FF00] text-black text-sm font-semibold py-2.5 rounded-xl hover:bg-[#D4FF33] transition-colors disabled:opacity-50"
        >
          {isPending ? 'Adding...' : 'Add Link'}
        </button>
      </div>
    </form>
  )
}

function LinkRow({ link, businessId }: { link: SocialLink; businessId: string }) {
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const platform = PLATFORMS[link.platform] ?? PLATFORMS.other
  const displayLabel = link.label || platform.name

  async function handleDelete() {
    setDeleting(true)
    await deleteSocialLink(link.id, businessId)
    router.refresh()
  }

  const updateWithIds = updateSocialLink.bind(null, link.id, businessId)
  const [state, formAction, isPending] = useActionState(
    async (_prev: AddFormState, formData: FormData): Promise<AddFormState> => {
      const result = await updateWithIds(formData)
      if (result?.success) {
        setEditing(false)
        router.refresh()
        return {}
      }
      return result ?? {}
    },
    {} as AddFormState
  )

  if (editing) {
    return (
      <form action={formAction} className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-4 space-y-3">
        {state.error && (
          <p className="text-red-400 text-xs">{state.error}</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#666] mb-1">Platform</label>
            <select
              name="platform"
              defaultValue={link.platform}
              className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#C8FF00]"
            >
              {PLATFORM_ORDER.map((key) => (
                <option key={key} value={key}>{PLATFORMS[key].name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#666] mb-1">Label</label>
            <input
              type="text"
              name="label"
              defaultValue={link.label ?? ''}
              className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#C8FF00]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#666] mb-1">URL</label>
          <input
            type="url"
            name="url"
            required
            defaultValue={link.url}
            className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#C8FF00]"
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setEditing(false)} className="flex-1 border border-[#2A2A2A] text-[#888] text-xs py-2 rounded-lg hover:text-white transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isPending} className="flex-1 bg-[#C8FF00] text-black text-xs font-semibold py-2 rounded-lg hover:bg-[#D4FF33] transition-colors disabled:opacity-50">
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="flex items-center gap-3 bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-3 group hover:border-[#333] transition-colors">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: platform.bg, color: platform.color }}
      >
        <PlatformIcon platform={link.platform} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{displayLabel}</p>
        <p className="text-[#555] text-xs truncate font-mono">{link.url}</p>
      </div>
      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#666] hover:text-white hover:border-[#444] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#666] hover:text-red-400 hover:border-red-900 transition-colors disabled:opacity-50"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function LinksManager({ businessId, links }: Props) {
  const [showAdd, setShowAdd] = useState(false)
  const router = useRouter()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
            Social Links
          </h3>
          <p className="text-[#555] text-xs mt-0.5">{links.length} link{links.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
            showAdd
              ? 'bg-[#2A2A2A] text-[#888]'
              : 'bg-[#C8FF00] text-black hover:bg-[#D4FF33]'
          }`}
        >
          {showAdd ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Link
            </>
          )}
        </button>
      </div>

      {showAdd && (
        <AddLinkForm
          businessId={businessId}
          onSuccess={() => {
            setShowAdd(false)
            router.refresh()
          }}
        />
      )}

      {links.length === 0 && !showAdd ? (
        <div className="text-center py-10 border border-dashed border-[#2A2A2A] rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <p className="text-[#555] text-sm">No links yet</p>
          <p className="text-[#444] text-xs mt-1">Add WhatsApp, Instagram, and more</p>
        </div>
      ) : (
        <div className="space-y-2">
          {links.map((link) => (
            <LinkRow key={link.id} link={link} businessId={businessId} />
          ))}
        </div>
      )}
    </div>
  )
}
