import { useState } from 'react'
import MapView from '../components/MapView'
import ReportDetail from '../components/ReportDetail'

function MapPage({ location, reports, onUpvote }) {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  let visibleReports = reports
  if (filter === 'mostUpvoted') {
    visibleReports = [...reports].sort((a, b) => b.upvotes - a.upvotes)
  }

  return (
    <div className="page">
      {location ? (
        <MapView center={location} reports={visibleReports} onSelect={setSelected} />
      ) : (
        <p>Finding your location…</p>
      )}

      <div className="filter-row">
        <button className={filter === 'all' ? 'chip chip-active' : 'chip'} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={filter === 'mostUpvoted' ? 'chip chip-active' : 'chip'} onClick={() => setFilter('mostUpvoted')}>
          Most upvoted
        </button>
      </div>

      {selected && (
        <ReportDetail report={selected} onClose={() => setSelected(null)} onUpvote={onUpvote} />
      )}
    </div>
  )
}

export default MapPage