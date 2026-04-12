'use client'

import { CardConfig } from '@/types'

interface Props {
  config: CardConfig
  onConfigChange: (partial: Partial<CardConfig>) => void
}

export function LogoPanel({ config, onConfigChange }: Props) {
  return (
    <div className="space-y-5">
      <h3 className="text-white text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
        Logo
      </h3>

      <div className="space-y-2">
        <label className="text-[#666] text-xs uppercase tracking-wider">Logo Image URL</label>
        <input
          type="url"
          value={config.logo_url}
          onChange={(e) => onConfigChange({ logo_url: e.target.value })}
          placeholder="https://example.com/logo.png"
          className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#C8FF00]/50 transition-colors placeholder:text-[#444]"
        />
        <p className="text-[#555] text-[10px]">Use a transparent PNG for best results</p>
      </div>

      {/* Preview */}
      {config.logo_url ? (
        <div className="space-y-2">
          <label className="text-[#666] text-xs uppercase tracking-wider">Preview</label>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 flex items-center justify-center">
            <img
              src={config.logo_url}
              alt="Logo preview"
              className="max-w-[120px] max-h-[120px] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
          <button
            onClick={() => onConfigChange({ logo_url: '' })}
            className="text-red-400 text-xs hover:text-red-300"
          >
            Remove logo
          </button>
        </div>
      ) : (
        <div className="bg-[#141414] border border-dashed border-[#2A2A2A] rounded-xl p-8 text-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" className="mx-auto mb-3">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <p className="text-[#555] text-xs">Paste a logo URL above</p>
        </div>
      )}
    </div>
  )
}
