import { useState } from 'react'
import { CATEGORIES } from '../data/mockReports'

function ReportForm({ onCancel, onSubmit }) {
  const [category, setCategory] = useState('road')
  const [description, setDescription] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ category, description })
  }

  return (
    <div className="sheet-backdrop" onClick={onCancel}>
      <form className="sheet" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>Report an issue</h2>

        <label className="field-label">Category</label>
        <div className="category-grid">
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <button
              type="button"
              key={key}
              className={`category-chip ${category === key ? 'active' : ''}`}
              onClick={() => setCategory(key)}
            >
              {val.label}
            </button>
          ))}
        </div>

        <label className="field-label" htmlFor="description">Describe it</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's the issue?"
          rows={3}
        />

        <div className="sheet-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit" disabled={!description.trim()}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ReportForm