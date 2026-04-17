'use client'

import { CardConfig } from '@/types'

const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    preview: { background_color: '#87CEEB', text_color: '#000000', button_color: '#2d3748', button_style: 'rounded' },
  },
  {
    id: 'dark',
    name: 'Dark',
    preview: { background_color: '#1A1A2E', text_color: '#ffffff', button_color: '#16213E', button_style: 'rounded' },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: { background_color: '#ffffff', text_color: '#1a1a1a', button_color: '#f5f5f5', button_style: 'pill' },
  },
  {
    id: 'bold',
    name: 'Bold',
    preview: { background_color: '#FF6B6B', text_color: '#ffffff', button_color: '#c0392b', button_style: 'square' },
  },
  {
    id: 'nature',
    name: 'Nature',
    preview: { background_color: '#B5EAD7', text_color: '#2d3436', button_color: '#00b894', button_style: 'pill' },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    preview: { background_color: '#dfe6e9', text_color: '#2d3436', button_color: '#0984e3', button_style: 'rounded' },
  },
]

interface Props {
  config: CardConfig
  onConfigChange: (partial: Partial<CardConfig>) => void
}

export function TemplatesPanel({ config, onConfigChange }: Props) {
  function applyTemplate(template: typeof TEMPLATES[0]) {
    onConfigChange({
      template: template.id,
      ...template.preview,
    })
  }

  return (
    <div className="space-y-5">
      <h3 className="text-white text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
        Templates
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => applyTemplate(template)}
            className={`rounded-xl overflow-hidden border-2 transition-all ${
              config.template === template.id
                ? 'border-[#C8FF00] scale-[1.02]'
                : 'border-[#2A2A2A] hover:border-[#444]'
            }`}
          >
            {/* Mini preview */}
            <div
              className="aspect-[3/4] flex flex-col items-center justify-center p-3"
              style={{ backgroundColor: template.preview.background_color }}
            >
              <div
                className="w-6 h-6 rounded-full mb-1.5"
                style={{ backgroundColor: template.preview.text_color + '33' }}
              />
              <div
                className="w-12 h-1 rounded-full mb-1"
                style={{ backgroundColor: template.preview.text_color + '66' }}
              />
              <div
                className="w-8 h-0.5 rounded-full mb-2"
                style={{ backgroundColor: template.preview.text_color + '33' }}
              />
              <div
                className="w-full h-3 rounded mb-1"
                style={{
                  backgroundColor: template.preview.button_color,
                  borderRadius: template.preview.button_style === 'pill' ? '9999px'
                    : template.preview.button_style === 'square' ? '3px' : '5px'
                }}
              />
              <div
                className="w-full h-3 rounded"
                style={{
                  backgroundColor: template.preview.button_color,
                  borderRadius: template.preview.button_style === 'pill' ? '9999px'
                    : template.preview.button_style === 'square' ? '3px' : '5px'
                }}
              />
            </div>
            <div className="bg-[#141414] px-2 py-2">
              <p className="text-white text-[10px] font-medium text-center">{template.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
