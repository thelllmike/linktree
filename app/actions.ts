'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createBusiness(formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const avatar_url = (formData.get('avatar_url') as string)?.trim() || null
  const theme_color = (formData.get('theme_color') as string) || '#000000'
  const customSlug = (formData.get('slug') as string)?.trim()

  if (!name) return { error: 'Business name is required' }

  const slug = customSlug ? toSlug(customSlug) : toSlug(name)
  if (!slug) return { error: 'Invalid slug' }

  const { data, error } = await supabase
    .from('businesses')
    .insert({ name, slug, description, avatar_url, theme_color })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') return { error: 'This URL is already taken. Try a different slug.' }
    return { error: error.message }
  }

  revalidatePath('/')
  redirect(`/admin/${data.id}`)
}

export async function updateBusiness(id: string, formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const avatar_url = (formData.get('avatar_url') as string)?.trim() || null
  const theme_color = (formData.get('theme_color') as string) || '#000000'
  const slug = toSlug((formData.get('slug') as string)?.trim() || '')

  if (!name) return { error: 'Business name is required' }
  if (!slug) return { error: 'Invalid slug' }

  const { error } = await supabase
    .from('businesses')
    .update({ name, slug, description, avatar_url, theme_color })
    .eq('id', id)

  if (error) {
    if (error.code === '23505') return { error: 'This URL is already taken.' }
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath(`/admin/${id}`)
  return { success: true }
}

export async function deleteBusiness(id: string) {
  const { error } = await supabase.from('businesses').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  redirect('/')
}

export async function addSocialLink(businessId: string, formData: FormData) {
  const platform = (formData.get('platform') as string)?.trim()
  const url = (formData.get('url') as string)?.trim()
  const label = (formData.get('label') as string)?.trim() || null

  if (!platform || !url) return { error: 'Platform and URL are required' }

  // get current max order
  const { data: existing } = await supabase
    .from('social_links')
    .select('display_order')
    .eq('business_id', businessId)
    .order('display_order', { ascending: false })
    .limit(1)

  const display_order = existing && existing.length > 0 ? existing[0].display_order + 1 : 0

  const { error } = await supabase
    .from('social_links')
    .insert({ business_id: businessId, platform, url, label, display_order })

  if (error) return { error: error.message }

  revalidatePath(`/admin/${businessId}`)
  return { success: true }
}

export async function updateSocialLink(linkId: string, businessId: string, formData: FormData) {
  const platform = (formData.get('platform') as string)?.trim()
  const url = (formData.get('url') as string)?.trim()
  const label = (formData.get('label') as string)?.trim() || null

  if (!platform || !url) return { error: 'Platform and URL are required' }

  const { error } = await supabase
    .from('social_links')
    .update({ platform, url, label })
    .eq('id', linkId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/${businessId}`)
  return { success: true }
}

export async function deleteSocialLink(linkId: string, businessId: string) {
  const { error } = await supabase.from('social_links').delete().eq('id', linkId)
  if (error) return { error: error.message }
  revalidatePath(`/admin/${businessId}`)
  return { success: true }
}
