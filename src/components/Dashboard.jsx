import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import './Dashboard.css'

function Dashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome to Dashboard!</h1>
        <div className="user-info">
          <h2>User Information</h2>
          <p><strong>ID:</strong> {user?.id}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => navigate('/profile')} className="logout-button" style={{ background: '#667eea' }}>
            View Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

