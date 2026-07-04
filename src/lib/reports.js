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

export async function saveReport(newReport) {
  const { data, error } = await supabase
    .from('reports')
    .insert([newReport])
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