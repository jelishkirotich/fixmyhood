import { useNavigate } from 'react-router-dom'
import ReportForm from '../components/ReportForm'

function ReportPage({ onSubmit }) {
  const navigate = useNavigate()

  async function handleSubmit(formData) {
    await onSubmit(formData)
    navigate('/map')
  }

  return (
    <div className="page">
      <ReportForm onCancel={() => navigate('/map')} onSubmit={handleSubmit} />
    </div>
  )
}

export default ReportPage