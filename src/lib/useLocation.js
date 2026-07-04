import { useEffect, useState } from 'react'

// Fallback if location is denied — Eldoret, Uasin Gishu
const FALLBACK = { lat: 0.5143, lng: 35.2698 }

function useLocation() {
  const [location, setLocation] = useState(null)
  const [status, setStatus] = useState('requesting')

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      setLocation(FALLBACK)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setStatus('granted')
      },
      () => {
        setStatus('denied')
        setLocation(FALLBACK)
      }
    )
  }, [])

  return { location, status }
}

export default useLocation