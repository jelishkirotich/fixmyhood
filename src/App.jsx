import { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import MapView from './components/MapView'
import ReportForm from './components/ReportForm'
import ReportDetail from './components/ReportDetail'
import useLocation from './lib/useLocation'
import { loadReports, saveReport, upvoteReport, distanceKm } from './lib/reports'
import './App.css'

function App() {
  const { location, status } = useLocation()
  const [showForm, setShowForm] = useState(false)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadReports().then((data) => {
      setReports(data)
      setLoading(false)
    })
  }, [])

  async function handleSubmit(formData) {
    const newReport = {
      category: formData.category,
      description: formData.description,
      lat: location.lat,
      lng: location.lng,
      upvotes: 0,
    }
    const saved = await saveReport(newReport)
    if (saved) {
      setReports((prev) => [saved, ...prev])
    }
    setShowForm(false)
  }

  async function handleUpvote(id) {
    const report = reports.find((r) => r.id === id)
    const updated = await upvoteReport(id, report.upvotes)
    if (updated) {
      setReports((prev) => prev.map((r) => (r.id === id ? updated : r)))
      setSelected(updated)
    }
  }

  let visibleReports = reports
  if (filter === 'mostUpvoted') {
    visibleReports = [...reports].sort((a, b) => b.upvotes - a.upvotes)
  }
  if (filter === 'nearMe' && location) {
    visibleReports = reports.filter((r) => distanceKm(location, r) <= 2)
  }

  return (
    <div className="app-shell">
      <TopBar />
      {location ? (
        <MapView center={location} reports={visibleReports} onSelect={setSelected} />
      ) : (
        <p>Finding your location…</p>
      )}

      {loading && <p style={{ padding: '8px 16px' }}>Loading reports…</p>}

      <div className="filter-row">
        <button className={filter === 'all' ? 'chip chip-active' : 'chip'} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={filter === 'mostUpvoted' ? 'chip chip-active' : 'chip'} onClick={() => setFilter('mostUpvoted')}>
          Most upvoted
        </button>
        <button className={filter === 'nearMe' ? 'chip chip-active' : 'chip'} onClick={() => setFilter('nearMe')}>
          Near me
        </button>
      </div>

      <button className="fab" onClick={() => setShowForm(true)}>
        + Report
      </button>
      {showForm && (
        <ReportForm onCancel={() => setShowForm(false)} onSubmit={handleSubmit} />
      )}
      {selected && (
        <ReportDetail report={selected} onClose={() => setSelected(null)} onUpvote={handleUpvote} />
      )}
    </div>
  )
}

export default App