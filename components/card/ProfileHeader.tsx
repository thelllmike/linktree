interface ProfileHeaderProps {
  avatarUrl: string | null
  name: string
  title: string
  themeColor: string
}

export function ProfileHeader({
  avatarUrl,
  name,
  title,
  themeColor,
}: ProfileHeaderProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="flex flex-col items-center animate-fade-up">
      {/* Avatar with gradient ring */}
      <div className="relative mb-5">
        <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-purple-500 via-fuchsia-500 to-emerald-400 animate-pulse-glow">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full rounded-full object-cover border-2 border-[#0a0a0a]"
            />
          ) : (
            <div
              className="w-full h-full rounded-full flex items-center justify-center border-2 border-[#0a0a0a] text-white text-2xl font-bold"
              style={{ backgroundColor: themeColor || '#1a1a2e' }}
            >
              {initials}
            </div>
          )}
        </div>
        {/* Verified badge */}
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-[2.5px] border-[#0a0a0a]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>

      {/* Name */}
      <h1
        className="text-2xl font-bold text-white text-center animate-fade-up animate-fade-up-delay-1"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {name}
      </h1>

      {/* Title */}
      {title && (
        <p className="text-gray-400 text-sm text-center mt-1.5 animate-fade-up animate-fade-up-delay-2">
          {title}
        </p>
      )}
    </div>
  )
}
