'use client'

import { useActionState, useRef } from 'react'
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

export function CreateCardForm() {
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
      <input type="hidden" name="type" value="businesscard" />

      {state.error && (
        <div className="bg-red-950/50 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl">
          {state.error}
        </div>
      )}

      {/* Business / Company Name */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          Company Name *
        </label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          required
          onChange={handleNameChange}
          placeholder="Clever Project"
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
            placeholder="clever-project"
            className="flex-1 bg-transparent px-3 py-3 text-[#C8FF00] placeholder-[#444] focus:outline-none text-sm font-mono"
          />
        </div>
      </div>

      {/* Description / Tagline */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
          Tagline
        </label>
        <input
          type="text"
          name="description"
          placeholder="Slogan here"
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
            defaultValue="#87CEEB"
            className="w-12 h-12 rounded-xl border border-[#2A2A2A] cursor-pointer bg-transparent p-1"
          />
          <p className="text-[#555] text-xs">Main color for your card design</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Link
          href="/admin/new"
          className="flex-1 text-center border border-[#2A2A2A] text-[#888] text-sm py-3 rounded-xl hover:border-[#444] hover:text-white transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-[#C8FF00] text-black text-sm font-semibold py-3 rounded-xl hover:bg-[#D4FF33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creating...' : 'Create & Design Card'}
        </button>
      </div>
    </form>
  )
}
