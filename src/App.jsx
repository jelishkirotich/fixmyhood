import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import ReportPage from './pages/ReportPage'
import MyReportsPage from './pages/MyReportsPage'
import ProfilePage from './pages/ProfilePage'
import useLocation from './lib/useLocation'
import { loadReports, saveReport, upvoteReport } from './lib/reports'
import './App.css'

function App() {
  const { location } = useLocation()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReports().then((data) => {
      setReports(data)
      setLoading(false)
    })
  }, [])

  async function handleSubmit(formData) {
    const saved = await saveReport({
      category: formData.category,
      description: formData.description,
      lat: location.lat,
      lng: location.lng,
      photoFiles: formData.photoFiles,
    })
    if (saved) {
      setReports((prev) => [saved, ...prev])
    }
  }

  async function handleUpvote(id) {
    const report = reports.find((r) => r.id === id)
    const updated = await upvoteReport(id, report.upvotes)
    if (updated) {
      setReports((prev) => prev.map((r) => (r.id === id ? updated : r)))
    }
  }

  return (
    <div className="app-shell">
      <TopBar />

      <div className="page-content">
        {loading ? (
          <p style={{ padding: '16px' }}>Loading…</p>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage reports={reports} />} />
            <Route
              path="/map"
              element={<MapPage location={location} reports={reports} onUpvote={handleUpvote} />}
            />
            <Route path="/report" element={<ReportPage onSubmit={handleSubmit} />} />
            <Route path="/my-reports" element={<MyReportsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default App