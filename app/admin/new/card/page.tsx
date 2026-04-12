import Link from 'next/link'
import { CreateCardForm } from '@/components/CreateCardForm'

export default function NewCardPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="border-b border-[#1A1A1A]">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link
            href="/admin/new"
            className="flex items-center gap-2 text-[#666] hover:text-white transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
          <span className="text-[#2A2A2A]">/</span>
          <span className="text-white text-sm font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>
            New Business Card
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8 animate-fade-up">
          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            New Business Card
          </h1>
          <p className="text-[#666] text-sm">
            Set up your business card basics, then customize the design.
          </p>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-1">
          <CreateCardForm />
        </div>
      </main>
    </div>
  )
}
