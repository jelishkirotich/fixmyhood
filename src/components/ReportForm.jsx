import { useState } from 'react'
import { CATEGORIES } from '../data/mockReports'

function ReportForm({ onCancel, onSubmit }) {
  const [category, setCategory] = useState('road')
  const [description, setDescription] = useState('')
  const [photoFiles, setPhotoFiles] = useState([])
  const [photoPreviews, setPhotoPreviews] = useState([])
  const [submitting, setSubmitting] = useState(false)

  function handlePhotoChange(e) {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    setPhotoFiles((prev) => [...prev, ...files])
    setPhotoPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))])
  }

  function removePhoto(index) {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index))
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await onSubmit({ category, description, photoFiles })
    setSubmitting(false)
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

        <label className="field-label" htmlFor="photo">Photos (optional, add as many as you need)</label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handlePhotoChange}
        />

        {photoPreviews.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            {photoPreviews.map((src, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img
                  src={src}
                  alt={`Preview ${i + 1}`}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    background: '#1a1a18', color: 'white', border: 'none',
                    borderRadius: '50%', width: '20px', height: '20px', fontSize: '12px', cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="sheet-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={!description.trim() || submitting}>
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportForm