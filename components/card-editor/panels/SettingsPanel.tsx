'use client'

interface Props {
  businessData: { name: string; description: string; slug: string }
  onBizDataChange: (partial: Partial<{ name: string; description: string; slug: string }>) => void
}

export function SettingsPanel({ businessData, onBizDataChange }: Props) {
  return (
    <div className="space-y-5">
      <h3 className="text-white text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
        Settings
      </h3>

      {/* URL Slug */}
      <div className="space-y-2">
        <label className="text-[#666] text-xs uppercase tracking-wider">Page URL</label>
        <div className="flex items-center bg-[#141414] border border-[#2A2A2A] rounded-lg overflow-hidden">
          <span className="text-[#444] text-xs px-3 py-2.5 border-r border-[#2A2A2A] whitespace-nowrap font-mono">
            /
          </span>
          <input
            type="text"
            value={businessData.slug}
            onChange={(e) => onBizDataChange({ slug: e.target.value })}
            className="flex-1 bg-transparent px-2 py-2.5 text-[#C8FF00] text-xs focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4">
        <p className="text-[#666] text-xs leading-relaxed">
          Changes are saved when you click &quot;Save Progress&quot;. Click &quot;Publish&quot; to save and view your live card.
        </p>
      </div>
    </div>
  )
}
