'use client'

import { useState } from 'react'
import { BankAccount } from '@/types'

export function PublicBankAccount({
  account,
  themeColor,
}: {
  account: BankAccount
  themeColor: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(account.account_number)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <div className="w-full rounded-2xl px-5 py-4 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: themeColor + '22', color: themeColor }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21h18" />
            <path d="M3 10h18" />
            <path d="M5 6l7-3 7 3" />
            <path d="M4 10v11" />
            <path d="M20 10v11" />
            <path d="M8 14v3" />
            <path d="M12 14v3" />
            <path d="M16 14v3" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-semibold text-sm truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {account.bank_name}
          </p>
          {account.branch && (
            <p className="text-gray-500 text-xs truncate">{account.branch} Branch</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Account Name</p>
          <p className="text-gray-200 text-sm truncate">{account.account_name}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Account Number</p>
          <div className="flex items-center gap-2">
            <p className="text-white text-base font-mono font-semibold tracking-wide flex-1 truncate">
              {account.account_number}
            </p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Copy account number"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
