import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import './Auth.css'

function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { verifyEmail, loading, error } = useAuthStore()
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (token && !verified && !loading) {
      handleVerification()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleVerification = async () => {
    const result = await verifyEmail(token)
    if (result.success) {
      setVerified(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Invalid Verification Link</h2>
          <p>No verification token provided.</p>
          <Link to="/login" className="submit-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '20px' }}>
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  if (verified) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Email Verified!</h2>
          <div className="success-message">
            <p>Your email has been successfully verified.</p>
            <p>Redirecting to login page...</p>
          </div>
          <Link to="/login" className="submit-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '20px' }}>
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verifying Email</h2>
        {loading && <p>Verifying your email address...</p>}
        {error && (
          <div className="error-message">
            {error}
            <Link to="/login" style={{ display: 'block', marginTop: '10px', color: '#667eea' }}>
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail

