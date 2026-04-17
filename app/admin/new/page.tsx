import Link from 'next/link'

export default function NewBusinessPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#666] hover:text-white transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
          <span className="text-[#2A2A2A]">/</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#C8FF00] rounded flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span className="text-white text-sm font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>
              LinkBase
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12 animate-fade-up">
          <h1
            className="text-3xl font-bold text-white mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            What would you like to create?
          </h1>
          <p className="text-[#666] text-sm">
            Choose the type of page for your business
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {/* Business Card Option */}
          <Link
            href="/admin/new/card"
            className="group bg-[#141414] border border-[#2A2A2A] rounded-2xl p-7 hover:border-[#C8FF00]/50 transition-all duration-300 animate-fade-up animate-fade-up-delay-1"
          >
            <div className="w-14 h-14 bg-[#1A1A1A] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C8FF00]/10 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <circle cx="8" cy="11" r="2" />
                <path d="M14 10h4M14 14h4M6 16c0-1 1-2 2-2s2 1 2 2" />
              </svg>
            </div>
            <h3
              className="text-white text-lg font-semibold mb-2"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Business Card
            </h3>
            <p className="text-[#666] text-sm leading-relaxed">
              Create a professional digital business card with your logo, contact info, and custom design.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[#C8FF00] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Link Page Option */}
          <Link
            href="/admin/new/linkpage"
            className="group bg-[#141414] border border-[#2A2A2A] rounded-2xl p-7 hover:border-[#C8FF00]/50 transition-all duration-300 animate-fade-up animate-fade-up-delay-2"
          >
            <div className="w-14 h-14 bg-[#1A1A1A] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C8FF00]/10 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <h3
              className="text-white text-lg font-semibold mb-2"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Link Page
            </h3>
            <p className="text-[#666] text-sm leading-relaxed">
              Build a link-in-bio page with all your social media and website links in one place.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[#C8FF00] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
