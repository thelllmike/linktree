'use client'

import { CardConfig } from '@/types'

const PRESET_COLORS = [
  '#87CEEB', '#A8D8EA', '#B5EAD7', '#FFD3B5', '#FFDAC1',
  '#E2F0CB', '#C7CEEA', '#F8B4B4', '#2d3748', '#1A1A2E',
  '#0F3460', '#533483', '#16213E', '#1B1B2F', '#162447',
]

interface Props {
  config: CardConfig
  onConfigChange: (partial: Partial<CardConfig>) => void
}

export function BackgroundPanel({ config, onConfigChange }: Props) {
  return (
    <div className="space-y-5">
      <h3 className="text-white text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
        Background
      </h3>

      {/* Color picker */}
      <div className="space-y-2">
        <label className="text-[#666] text-xs uppercase tracking-wider">Background Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.background_color}
            onChange={(e) => onConfigChange({ background_color: e.target.value })}
            className="w-10 h-10 rounded-lg border border-[#2A2A2A] cursor-pointer bg-transparent p-0.5"
          />
          <input
            type="text"
            value={config.background_color}
            onChange={(e) => onConfigChange({ background_color: e.target.value })}
            className="flex-1 bg-[#141414] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* Preset colors */}
      <div className="space-y-2">
        <label className="text-[#666] text-xs uppercase tracking-wider">Presets</label>
        <div className="grid grid-cols-5 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onConfigChange({ background_color: color })}
              className={`w-full aspect-square rounded-lg border-2 transition-all ${
                config.background_color === color ? 'border-[#C8FF00] scale-110' : 'border-[#2A2A2A] hover:border-[#444]'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Background image */}
      <div className="space-y-2 border-t border-[#1A1A1A] pt-4">
        <label className="text-[#666] text-xs uppercase tracking-wider">Background Image URL</label>
        <input
          type="url"
          value={config.background_url}
          onChange={(e) => onConfigChange({ background_url: e.target.value })}
          placeholder="https://example.com/bg.jpg"
          className="w-full bg-[#141414] border border-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#C8FF00]/50 transition-colors placeholder:text-[#444]"
        />
        {config.background_url && (
          <button
            onClick={() => onConfigChange({ background_url: '' })}
            className="text-red-400 text-xs hover:text-red-300"
          >
            Remove image
          </button>
        )}
      </div>
    </div>
  )
}
