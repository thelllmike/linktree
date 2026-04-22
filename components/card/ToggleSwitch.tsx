interface ToggleSwitchProps {
  activeTab: 'personal' | 'business'
  onToggle: (tab: 'personal' | 'business') => void
}

export function ToggleSwitch({ activeTab, onToggle }: ToggleSwitchProps) {
  return (
    <div className="relative flex bg-white/[0.06] rounded-full p-1 w-[260px] border border-white/[0.08] animate-fade-up animate-fade-up-delay-3">
      {/* Sliding indicator */}
      <div
        className="absolute top-1 bottom-1 rounded-full bg-white/[0.1] transition-all duration-300 ease-out"
        style={{
          width: 'calc(50% - 4px)',
          left: activeTab === 'personal' ? '4px' : '50%',
        }}
      />
      <button
        onClick={() => onToggle('personal')}
        className={`relative z-10 flex-1 py-2.5 text-sm font-medium text-center rounded-full transition-colors duration-300 cursor-pointer ${
          activeTab === 'personal'
            ? 'text-white'
            : 'text-gray-500 hover:text-gray-400'
        }`}
      >
        Personal
      </button>
      <button
        onClick={() => onToggle('business')}
        className={`relative z-10 flex-1 py-2.5 text-sm font-medium text-center rounded-full transition-colors duration-300 cursor-pointer ${
          activeTab === 'business'
            ? 'text-white'
            : 'text-gray-500 hover:text-gray-400'
        }`}
      >
        Business
      </button>
    </div>
  )
}
