import { CATEGORIES } from '../data/mockReports'

function ReportDetail({ report, onClose, onUpvote }) {
  const cat = CATEGORIES[report.category]

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <span className="category-badge" style={{ background: cat.color + '22', color: cat.color }}>
          {cat.label}
        </span>
        <p className="detail-description">{report.description}</p>
        <div className="sheet-actions">
          <button type="button" onClick={onClose}>Close</button>
          <button type="button" onClick={() => onUpvote(report.id)}>
            👍 Still a problem ({report.upvotes})
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportDetail