export const CATEGORIES = {
  road: { label: 'Road damage', color: '#E24B4A' },
  light: { label: 'Lighting', color: '#EF9F27' },
  water: { label: 'Water', color: '#378ADD' },
}

export const mockReports = [
  {
    id: '1',
    category: 'road',
    description: 'Deep pothole near the roundabout.',
    lat: 0.5167,
    lng: 35.2698,
    upvotes: 3,
  },
  {
    id: '2',
    category: 'light',
    description: 'Streetlight not working outside the shops.',
    lat: 0.512,
    lng: 35.274,
    upvotes: 1,
  },
]