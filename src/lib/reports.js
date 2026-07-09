import { supabase } from './supabaseClient'

export async function loadReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading reports:', error)
    return []
  }
  return data
}

async function uploadPhoto(file) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('report-photos')
    .upload(fileName, file)

  if (uploadError) {
    console.error('Error uploading photo:', uploadError)
    return null
  }

  const { data } = supabase.storage
    .from('report-photos')
    .getPublicUrl(fileName)

  return data.publicUrl
}

async function uploadPhotos(files) {
  const uploadedUrls = []
  for (const file of files) {
    const url = await uploadPhoto(file)
    if (url) uploadedUrls.push(url)
  }
  return uploadedUrls
}

export async function saveReport({ category, description, lat, lng, photoFiles }) {
  let photoUrls = []
  if (photoFiles && photoFiles.length > 0) {
    photoUrls = await uploadPhotos(photoFiles)
  }

  const { data, error } = await supabase
    .from('reports')
    .insert([{ category, description, lat, lng, upvotes: 0, photo_urls: photoUrls }])
    .select()
    .single()

  if (error) {
    console.error('Error saving report:', error)
    return null
  }
  return data
}

export async function upvoteReport(id, currentUpvotes) {
  const { data, error } = await supabase
    .from('reports')
    .update({ upvotes: currentUpvotes + 1 })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error upvoting report:', error)
    return null
  }
  return data
}

export function distanceKm(a, b) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}