import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LinkBase — Business Link Pages',
  description: 'Create beautiful link-in-bio pages for your business',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
