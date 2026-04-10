'use client'

import { useActionState, useEffect, useRef } from 'react'
import { createBusiness } from '@/app/actions'
import Link from 'next/link'

function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

type FormState = { error?: string }

const INITIAL_STATE: FormState = { error: undefined }

export function CreateBusinessForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const result = await createBusiness(formData)
      return result ?? INITIAL_STATE
    },
    INITIAL_STATE
  )

  const nameRef = useRef<HTMLInputElement>(null)
  const slugRef = useRef<HTMLInputElement>(null)
  const slugManuallyEdited = useRef(false)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugManuallyEdited.current && slugRef.current) {
      slugRef.current.value = toSlug(e.target.value)
    }
  }

  function handleSlugChange() {
    slugManuallyEdited.current = true
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="bg-red-950/50 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl">
          {state.error}
        </div>
      )}

      {/* Business Name */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          Business Name *
        </label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          required
          onChange={handleNameChange}
          placeholder="Anura Optical"
          className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          URL Slug *
        </label>
        <div className="flex items-center bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl overflow-hidden focus-within:border-[#C8FF00] transition-colors">
          <span className="text-[#444] text-sm px-4 py-3 border-r border-[#2A2A2A] whitespace-nowrap font-mono">
            linkbase.app/
          </span>
          <input
            ref={slugRef}
            type="text"
            name="slug"
            onChange={handleSlugChange}
            placeholder="anura-optical"
            className="flex-1 bg-transparent px-3 py-3 text-[#C8FF00] placeholder-[#444] focus:outline-none text-sm font-mono"
          />
        </div>
        <p className="text-[#555] text-xs">Auto-generated from name. Can be customized.</p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Free eye tests in Colombo! Book your frames & lenses today!"
          className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm resize-none"
        />
      </div>

      {/* Avatar URL */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          Logo / Avatar URL
        </label>
        <input
          type="url"
          name="avatar_url"
          placeholder="https://example.com/logo.png"
          className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
        />
      </div>

      {/* Theme Color */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          Brand Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            name="theme_color"
            defaultValue="#000000"
            className="w-12 h-12 rounded-xl border border-[#2A2A2A] cursor-pointer bg-transparent p-1"
          />
          <p className="text-[#555] text-xs">Used on your public profile page</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Link
          href="/"
          className="flex-1 text-center border border-[#2A2A2A] text-[#888] text-sm py-3 rounded-xl hover:border-[#444] hover:text-white transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-[#C8FF00] text-black text-sm font-semibold py-3 rounded-xl hover:bg-[#D4FF33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creating...' : 'Create Business'}
        </button>
      </div>
    </form>
  )
}
