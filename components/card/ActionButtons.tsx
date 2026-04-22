import { SocialLink } from '@/types'

interface ActionButtonsProps {
  links: SocialLink[]
  personName: string
  personTitle: string
  companyName: string
}

export function ActionButtons({
  links,
  personName,
  personTitle,
  companyName,
}: ActionButtonsProps) {
  const phoneLink = links.find((l) => l.platform === 'phone')
  const emailLink = links.find((l) => l.platform === 'email')
  const whatsappLink = links.find((l) => l.platform === 'whatsapp')

  const handleAddToContacts = () => {
    const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${personName}`]
    if (personTitle) lines.push(`TITLE:${personTitle}`)
    if (companyName) lines.push(`ORG:${companyName}`)
    if (phoneLink) {
      const phone = phoneLink.url.replace(/^tel:/, '')
      lines.push(`TEL;TYPE=CELL:${phone}`)
    }
    if (emailLink) {
      const email = emailLink.url.replace(/^mailto:/, '')
      lines.push(`EMAIL:${email}`)
    }
    lines.push('END:VCARD')

    const blob = new Blob([lines.join('\n')], {
      type: 'text/vcard;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${personName.replace(/\s+/g, '_')}.vcf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full space-y-3">
      {/* Add to Contacts — gradient border */}
      <div className="p-[1px] rounded-xl bg-gradient-to-r from-purple-500/60 via-fuchsia-500/40 to-emerald-400/60">
        <button
          onClick={handleAddToContacts}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-[11px] bg-[#0f0f0f] text-white text-sm font-medium hover:bg-[#141414] active:bg-[#0a0a0a] transition-colors duration-200 cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-400"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
          Add to Contacts
        </button>
      </div>

      {/* Call and Email — split */}
      {(phoneLink || emailLink) && (
        <div className="flex gap-3">
          {phoneLink && (
            <a
              href={phoneLink.url}
              className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-medium hover:bg-white/[0.1] transition-all duration-200"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-400"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call
            </a>
          )}
          {emailLink && (
            <a
              href={
                emailLink.url.startsWith('mailto:')
                  ? emailLink.url
                  : `mailto:${emailLink.url}`
              }
              className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-medium hover:bg-white/[0.1] transition-all duration-200"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>
          )}
        </div>
      )}

      {/* Chat on WhatsApp */}
      {whatsappLink && (
        <a
          href={whatsappLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-sm font-semibold hover:shadow-lg hover:shadow-green-500/20 active:scale-[0.98] transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>
      )}
    </div>
  )
}
