import { mockReports } from '../data/mockReports'

const STORAGE_KEY = 'fixmyhood_reports'

export function loadReports() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockReports))
  return mockReports
}

export function saveReport(reports, newReport) {
  const updated = [newReport, ...reports]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
export function upvoteReport(reports, id) {
  const updated = reports.map((r) =>
    r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
export function distanceKm(a, b) {
  const R = 6371 // Earth's radius in km
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}