interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl ${className}`}
    >
      {children}
    </div>
  )
}
