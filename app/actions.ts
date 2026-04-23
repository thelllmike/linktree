'use server'

import { createSupabaseServer } from '@/lib/supabase-server'
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
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const avatar_url = (formData.get('avatar_url') as string)?.trim() || null
  const theme_color = (formData.get('theme_color') as string) || '#000000'
  const customSlug = (formData.get('slug') as string)?.trim()

  if (!name) return { error: 'Business name is required' }

  const slug = customSlug ? toSlug(customSlug) : toSlug(name)
  if (!slug) return { error: 'Invalid slug' }

  const type = (formData.get('type') as string) || 'linkpage'

  const { data, error } = await supabase
    .from('businesses')
    .insert({ name, slug, description, avatar_url, theme_color, user_id: user.id, type })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') return { error: 'This URL is already taken. Try a different slug.' }
    return { error: error.message }
  }

  revalidatePath('/')
  if (type === 'businesscard') {
    redirect(`/admin/card/${data.id}`)
  }
  redirect(`/admin/${data.id}`)
}

export async function updateBusiness(id: string, formData: FormData) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

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
    .eq('user_id', user.id)

  if (error) {
    if (error.code === '23505') return { error: 'This URL is already taken.' }
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath(`/admin/${id}`)
  return { success: true }
}

export async function deleteBusiness(id: string) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('businesses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/')
  redirect('/')
}

export async function addSocialLink(businessId: string, formData: FormData) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const platform = (formData.get('platform') as string)?.trim()
  const url = (formData.get('url') as string)?.trim()
  const label = (formData.get('label') as string)?.trim() || null

  if (!platform || !url) return { error: 'Platform and URL are required' }

  // Verify ownership
  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!biz) return { error: 'Not authorized' }

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
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const platform = (formData.get('platform') as string)?.trim()
  const url = (formData.get('url') as string)?.trim()
  const label = (formData.get('label') as string)?.trim() || null

  if (!platform || !url) return { error: 'Platform and URL are required' }

  // Verify ownership
  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!biz) return { error: 'Not authorized' }

  const { error } = await supabase
    .from('social_links')
    .update({ platform, url, label })
    .eq('id', linkId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/${businessId}`)
  return { success: true }
}

export async function deleteSocialLink(linkId: string, businessId: string) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Verify ownership
  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!biz) return { error: 'Not authorized' }

  const { error } = await supabase.from('social_links').delete().eq('id', linkId)
  if (error) return { error: error.message }
  revalidatePath(`/admin/${businessId}`)
  return { success: true }
}

export async function addBankAccount(businessId: string, formData: FormData) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const bank_name = (formData.get('bank_name') as string)?.trim()
  const account_name = (formData.get('account_name') as string)?.trim()
  const account_number = (formData.get('account_number') as string)?.trim()
  const branch = (formData.get('branch') as string)?.trim() || null

  if (!bank_name || !account_name || !account_number) {
    return { error: 'Bank name, account name, and account number are required' }
  }

  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!biz) return { error: 'Not authorized' }

  const { data: existing } = await supabase
    .from('bank_accounts')
    .select('display_order')
    .eq('business_id', businessId)
    .order('display_order', { ascending: false })
    .limit(1)

  const display_order = existing && existing.length > 0 ? existing[0].display_order + 1 : 0

  const { error } = await supabase
    .from('bank_accounts')
    .insert({ business_id: businessId, bank_name, account_name, account_number, branch, display_order })

  if (error) return { error: error.message }

  revalidatePath(`/admin/${businessId}`)
  return { success: true }
}

export async function updateBankAccount(accountId: string, businessId: string, formData: FormData) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const bank_name = (formData.get('bank_name') as string)?.trim()
  const account_name = (formData.get('account_name') as string)?.trim()
  const account_number = (formData.get('account_number') as string)?.trim()
  const branch = (formData.get('branch') as string)?.trim() || null

  if (!bank_name || !account_name || !account_number) {
    return { error: 'Bank name, account name, and account number are required' }
  }

  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!biz) return { error: 'Not authorized' }

  const { error } = await supabase
    .from('bank_accounts')
    .update({ bank_name, account_name, account_number, branch })
    .eq('id', accountId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/${businessId}`)
  return { success: true }
}

export async function deleteBankAccount(accountId: string, businessId: string) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!biz) return { error: 'Not authorized' }

  const { error } = await supabase.from('bank_accounts').delete().eq('id', accountId)
  if (error) return { error: error.message }
  revalidatePath(`/admin/${businessId}`)
  return { success: true }
}

export async function updateCardConfig(id: string, cardConfig: Record<string, string>) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('businesses')
    .update({ card_config: cardConfig })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath(`/admin/card/${id}`)
  return { success: true }
}

export async function updateCardDetails(id: string, formData: FormData) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const slug = toSlug((formData.get('slug') as string)?.trim() || '')

  if (!name) return { error: 'Business name is required' }
  if (!slug) return { error: 'Invalid slug' }

  const card_config = {
    template: (formData.get('template') as string) || 'classic',
    person_name: (formData.get('person_name') as string)?.trim() || '',
    person_title: (formData.get('person_title') as string)?.trim() || '',
    background_url: (formData.get('background_url') as string)?.trim() || '',
    background_color: (formData.get('background_color') as string) || '#87CEEB',
    logo_url: (formData.get('logo_url') as string)?.trim() || '',
    font_family: (formData.get('font_family') as string) || 'DM Sans',
    text_color: (formData.get('text_color') as string) || '#000000',
    button_style: (formData.get('button_style') as string) || 'rounded',
    button_color: (formData.get('button_color') as string) || '#2d3748',
  }

  const { error } = await supabase
    .from('businesses')
    .update({ name, description, slug, card_config })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    if (error.code === '23505') return { error: 'This URL is already taken.' }
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath(`/admin/card/${id}`)
  return { success: true }
}
