import { CATEGORIES } from '../data/mockReports'

function ReportDetail({ report, onClose, onUpvote }) {
  const cat = CATEGORIES[report.category]
  const photos = Array.isArray(report.photo_urls) ? report.photo_urls : []

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <span className="category-badge" style={{ background: cat.color + '22', color: cat.color }}>
          {cat.label}
        </span>

        {photos.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '12px' }}>
            {photos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Reported issue ${i + 1}`}
                style={{
                  width: '160px', height: '160px', objectFit: 'cover',
                  borderRadius: '10px', flexShrink: 0,
                }}
              />
            ))}
          </div>
        )}

        <p className="detail-description">{report.description}</p>
        <div className="sheet-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn-primary" onClick={() => onUpvote(report.id)}>
            👍 Still a problem ({report.upvotes})
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportDetail