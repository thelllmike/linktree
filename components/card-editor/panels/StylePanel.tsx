'use client'

import { CardConfig } from '@/types'

const FONTS = [
  { value: 'DM Sans', label: 'DM Sans' },
  { value: 'Syne', label: 'Syne' },
  { value: 'Space Mono', label: 'Space Mono' },
  { value: 'system-ui', label: 'System' },
  { value: 'Georgia', label: 'Georgia' },
]

const BUTTON_STYLES = [
  { value: 'rounded', label: 'Rounded' },
  { value: 'pill', label: 'Pill' },
  { value: 'square', label: 'Square' },
]

interface Props {
  config: CardConfig
  onConfigChange: (partial: Partial<CardConfig>) => void
}

export function StylePanel({ config, onConfigChange }: Props) {
  return (
    <div className="space-y-5">
      <h3 className="text-white text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
        Style
      </h3>

      {/* Font */}
      <div className="space-y-2">
        <label className="text-[#666] text-xs uppercase tracking-wider">Font Family</label>
        <div className="space-y-1.5">
          {FONTS.map((font) => (
            <button
              key={font.value}
              onClick={() => onConfigChange({ font_family: font.value })}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                config.font_family === font.value
                  ? 'bg-[#C8FF00]/10 border border-[#C8FF00]/30 text-white'
                  : 'bg-[#141414] border border-[#2A2A2A] text-[#888] hover:text-white hover:border-[#444]'
              }`}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text color */}
      <div className="space-y-2">
        <label className="text-[#666] text-xs uppercase tracking-wider">Text Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.text_color}
            onChange={(e) => onConfigChange({ text_color: e.target.value })}
            className="w-10 h-10 rounded-lg border border-[#2A2A2A] cursor-pointer bg-transparent p-0.5"
          />
          <input
            type="text"
            value={config.text_color}
            onChange={(e) => onConfigChange({ text_color: e.target.value })}
            className="flex-1 bg-[#141414] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* Button style */}
      <div className="space-y-2">
        <label className="text-[#666] text-xs uppercase tracking-wider">Button Shape</label>
        <div className="grid grid-cols-3 gap-2">
          {BUTTON_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => onConfigChange({ button_style: style.value })}
              className={`py-2.5 text-xs font-medium transition-colors ${
                config.button_style === style.value
                  ? 'bg-[#C8FF00]/10 border border-[#C8FF00]/30 text-white'
                  : 'bg-[#141414] border border-[#2A2A2A] text-[#888] hover:text-white'
              }`}
              style={{
                borderRadius: style.value === 'pill' ? '9999px' : style.value === 'square' ? '6px' : '10px',
              }}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Button color */}
      <div className="space-y-2">
        <label className="text-[#666] text-xs uppercase tracking-wider">Button Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.button_color}
            onChange={(e) => onConfigChange({ button_color: e.target.value })}
            className="w-10 h-10 rounded-lg border border-[#2A2A2A] cursor-pointer bg-transparent p-0.5"
          />
          <input
            type="text"
            value={config.button_color}
            onChange={(e) => onConfigChange({ button_color: e.target.value })}
            className="flex-1 bg-[#141414] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none font-mono"
          />
        </div>
      </div>
    </div>
  )
}
