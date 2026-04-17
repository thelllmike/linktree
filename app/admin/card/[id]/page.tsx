import { createSupabaseServer } from '@/lib/supabase-server'
import { Business, SocialLink } from '@/types'
import { notFound } from 'next/navigation'
import { CardEditorShell } from '@/components/card-editor/CardEditorShell'

export const dynamic = 'force-dynamic'

async function getCard(id: string): Promise<Business | null> {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('businesses')
    .select('*, social_links(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !data) return null
  if (data.social_links) {
    data.social_links.sort((a: SocialLink, b: SocialLink) => a.display_order - b.display_order)
  }
  return data
}

export default async function CardEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const business = await getCard(id)

  if (!business) notFound()

  return <CardEditorShell business={business} />
}
