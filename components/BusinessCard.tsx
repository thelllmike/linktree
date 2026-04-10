'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Business } from '@/types'

interface BusinessCardProps {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  const [copied, setCopied] = useState(false)

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${business.slug}`
    : `/${business.slug}`

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(publicUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const initials = business.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="group relative bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#C8FF00] transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,255,0,0.06)]">
      {/* Avatar */}
      <div className="flex items-start gap-4 mb-5">
        {business.avatar_url ? (
          <img
            src={business.avatar_url}
            alt={business.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#2A2A2A] flex-shrink-0"
          />
        ) : (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 border-2 border-[#2A2A2A]"
            style={{ backgroundColor: business.theme_color }}
          >
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-white font-semibold text-base leading-tight truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
            {business.name}
          </h3>
          {business.description && (
            <p className="text-[#666] text-xs mt-1 line-clamp-2 leading-relaxed">
              {business.description}
            </p>
          )}
        </div>
      </div>

      {/* Links count */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[#444] text-xs font-mono">
          {business.social_links?.length ?? 0} links
        </span>
        <span className="w-1 h-1 rounded-full bg-[#333]" />
        <span className="text-[#444] text-xs font-mono">
          {new Date(business.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* URL slug */}
      <button
        onClick={copyUrl}
        className="w-full flex items-center gap-2 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 mb-4 hover:border-[#C8FF00]/40 transition-colors group/url"
        title="Click to copy URL"
      >
        <span className="text-[#C8FF00]/60 text-xs font-mono flex-1 text-left truncate">
          linkbase.app/{business.slug}
        </span>
        <span className="text-[#444] group-hover/url:text-[#C8FF00] transition-colors flex-shrink-0">
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </span>
      </button>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/admin/${business.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#C8FF00] text-black text-xs font-semibold py-2.5 rounded-lg hover:bg-[#D4FF33] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </Link>
        <Link
          href={`/${business.slug}`}
          target="_blank"
          className="flex items-center justify-center gap-1.5 border border-[#2A2A2A] text-[#888] text-xs py-2.5 px-3 rounded-lg hover:border-[#444] hover:text-white transition-colors"
          title="View public page"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View
        </Link>
      </div>
    </div>
  )
}
