'use client'

import { useState } from 'react'
import { CardConfig, SocialLink } from '@/types'
import { ContentPanel } from './panels/ContentPanel'
import { BackgroundPanel } from './panels/BackgroundPanel'
import { LogoPanel } from './panels/LogoPanel'
import { StylePanel } from './panels/StylePanel'
import { TemplatesPanel } from './panels/TemplatesPanel'
import { SettingsPanel } from './panels/SettingsPanel'

type TabId = 'templates' | 'content' | 'background' | 'logo' | 'style' | 'settings'

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: 'templates',
    label: 'Templates',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'content',
    label: 'Content',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    id: 'background',
    label: 'Bkground',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 16l5-5 4 4 4-4 5 5" />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'logo',
    label: 'Logo',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'style',
    label: 'Style',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
]

interface Props {
  config: CardConfig
  businessData: { name: string; description: string; slug: string }
  businessId: string
  links: SocialLink[]
  onConfigChange: (partial: Partial<CardConfig>) => void
  onBizDataChange: (partial: Partial<{ name: string; description: string; slug: string }>) => void
}

export function SidebarTabs({ config, businessData, businessId, links, onConfigChange, onBizDataChange }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('content')

  return (
    <div className="flex flex-shrink-0">
      {/* Icon sidebar */}
      <div className="w-[72px] bg-[#0A0A0A] border-l border-[#1A1A1A] flex flex-col items-center pt-4 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg w-[60px] transition-colors ${
              activeTab === tab.id
                ? 'text-[#C8FF00] bg-[#C8FF00]/10'
                : 'text-[#666] hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            {tab.icon}
            <span className="text-[9px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="w-[300px] bg-[#0A0A0A] border-l border-[#1A1A1A] overflow-auto">
        <div className="p-5">
          {activeTab === 'templates' && (
            <TemplatesPanel config={config} onConfigChange={onConfigChange} />
          )}
          {activeTab === 'content' && (
            <ContentPanel
              config={config}
              businessData={businessData}
              businessId={businessId}
              links={links}
              onConfigChange={onConfigChange}
              onBizDataChange={onBizDataChange}
            />
          )}
          {activeTab === 'background' && (
            <BackgroundPanel config={config} onConfigChange={onConfigChange} />
          )}
          {activeTab === 'logo' && (
            <LogoPanel config={config} onConfigChange={onConfigChange} />
          )}
          {activeTab === 'style' && (
            <StylePanel config={config} onConfigChange={onConfigChange} />
          )}
          {activeTab === 'settings' && (
            <SettingsPanel businessData={businessData} onBizDataChange={onBizDataChange} />
          )}
        </div>
      </div>
    </div>
  )
}
