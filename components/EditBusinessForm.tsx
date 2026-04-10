'use client'

import { useActionState } from 'react'
import { updateBusiness, deleteBusiness } from '@/app/actions'
import { Business } from '@/types'
import { useState } from 'react'

function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

interface Props {
  business: Business
}

type FormState = { error?: string; success?: boolean }

const INITIAL: FormState = { error: undefined, success: false }

export function EditBusinessForm({ business }: Props) {
  const updateWithId = updateBusiness.bind(null, business.id)
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const result = await updateWithId(formData)
      return result ?? INITIAL
    },
    INITIAL
  )
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    await deleteBusiness(business.id)
  }

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-5">
        {state.error && (
          <div className="bg-red-950/50 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl">
            {state.error}
          </div>
        )}
        {state.success && !state.error && (
          <div className="bg-green-950/50 border border-green-800 text-green-300 text-sm px-4 py-3 rounded-xl">
            Changes saved successfully.
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
            Business Name *
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={business.name}
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
            URL Slug *
          </label>
          <div className="flex items-center bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl overflow-hidden focus-within:border-[#C8FF00] transition-colors">
            <span className="text-[#444] text-sm px-4 py-3 border-r border-[#2A2A2A] whitespace-nowrap font-mono">
              linkbase.app/
            </span>
            <input
              type="text"
              name="slug"
              defaultValue={business.slug}
              required
              className="flex-1 bg-transparent px-3 py-3 text-[#C8FF00] placeholder-[#444] focus:outline-none text-sm font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={business.description ?? ''}
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
            Logo / Avatar URL
          </label>
          <input
            type="url"
            name="avatar_url"
            defaultValue={business.avatar_url ?? ''}
            placeholder="https://example.com/logo.png"
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
            Brand Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              name="theme_color"
              defaultValue={business.theme_color}
              className="w-12 h-12 rounded-xl border border-[#2A2A2A] cursor-pointer bg-transparent p-1"
            />
            <p className="text-[#555] text-xs">Used on your public profile page</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#C8FF00] text-black text-sm font-semibold py-3 rounded-xl hover:bg-[#D4FF33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Danger Zone */}
      <div className="border-t border-[#2A2A2A] pt-5">
        <p className="text-xs font-semibold text-[#666] uppercase tracking-widest mb-3">
          Danger Zone
        </p>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`w-full text-sm py-3 rounded-xl border transition-colors disabled:opacity-50 ${
            confirmDelete
              ? 'bg-red-900/80 border-red-700 text-red-200 hover:bg-red-800'
              : 'border-red-900/50 text-red-500 hover:border-red-700 hover:text-red-400'
          }`}
        >
          {deleting ? 'Deleting...' : confirmDelete ? 'Confirm Delete — This cannot be undone' : 'Delete Business'}
        </button>
        {confirmDelete && !deleting && (
          <button
            onClick={() => setConfirmDelete(false)}
            className="w-full text-xs text-[#666] py-2 hover:text-[#888] transition-colors mt-1"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
