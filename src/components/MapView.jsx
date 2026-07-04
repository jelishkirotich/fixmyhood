import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { CATEGORIES } from '../data/mockReports'

function makeIcon(category) {
  const color = CATEGORIES[category].color
  return L.divIcon({
    className: '',
    html: `<div style="width:20px;height:20px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.4);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

function MapView({ center, reports, onSelect }) {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[center.lat, center.lng]} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.lat, report.lng]}
            icon={makeIcon(report.category)}
            eventHandlers={{ click: () => onSelect(report) }}
          />
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView