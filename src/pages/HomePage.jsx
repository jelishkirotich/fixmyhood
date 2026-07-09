import { Link } from 'react-router-dom'

function HomePage({ reports }) {
  const recent = reports.slice(0, 3)

  return (
    <div className="page" style={{ padding: '16px' }}>
      <h2>Good day 👋</h2>
      <p style={{ color: '#77756c' }}>Here's what's happening in your area.</p>

      <Link to="/report" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '16px', marginTop: '16px' }}>
        + Report an Issue
      </Link>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <div style={{ flex: 1, background: '#f1efe8', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{reports.length}</p>
          <p style={{ fontSize: '12px', color: '#77756c', margin: 0 }}>Total reports</p>
        </div>
      </div>

      <h3 style={{ marginTop: '24px' }}>Nearby issues</h3>
      {recent.length === 0 && <p style={{ color: '#77756c' }}>No reports yet.</p>}
      {recent.map((r) => (
        <div key={r.id} style={{ border: '1px solid #e4e2d8', borderRadius: '10px', padding: '12px', marginBottom: '8px' }}>
          <p style={{ fontWeight: 600, margin: 0 }}>{r.category}</p>
          <p style={{ fontSize: '13px', color: '#77756c', margin: '4px 0 0' }}>{r.description}</p>
        </div>
      ))}
    </div>
  )
}

export default HomePage