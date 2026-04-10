import Link from 'next/link'
import { CreateBusinessForm } from '@/components/CreateBusinessForm'

export default function NewBusinessPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-[#1A1A1A]">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center gap-4">
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

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8 animate-fade-up">
          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            New Business
          </h1>
          <p className="text-[#666] text-sm">
            Create a business profile and get your unique link page.
          </p>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-1">
          <CreateBusinessForm />
        </div>
      </main>
    </div>
  )
}
