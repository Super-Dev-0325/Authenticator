import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import './Dashboard.css'

function UserProfile() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>User Profile</h1>
        <div className="user-info">
          <h2>Account Information</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.is_verified !== undefined && (
            <p>
              <strong>Email Verified:</strong>{' '}
              <span style={{ color: user.is_verified ? '#3c3' : '#c33' }}>
                {user.is_verified ? 'Yes' : 'No'}
              </span>
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => navigate('/dashboard')} className="logout-button" style={{ background: '#667eea' }}>
            Back to Dashboard
          </button>
          <button onClick={() => { logout(); navigate('/login') }} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

