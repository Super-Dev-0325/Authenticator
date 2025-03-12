import { useForm } from 'react-hook-form'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import './Auth.css'

function PasswordReset() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [step, setStep] = useState(token ? 'reset' : 'request')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmitRequest = async (data) => {
    setLoading(true)
    setError('')
    try {
      await authAPI.requestPasswordReset(data.email)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  const onSubmitReset = async (data) => {
    setLoading(true)
    setError('')
    try {
      await authAPI.confirmPasswordReset(token, data.newPassword)
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if (success && step === 'request') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Reset Email Sent</h2>
          <div className="success-message">
            <p>If the email exists, a password reset link has been sent.</p>
            <p>Please check your inbox.</p>
          </div>
          <Link to="/login" className="submit-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '20px' }}>
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  if (success && step === 'reset') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Password Reset Successful</h2>
          <div className="success-message">
            <p>Your password has been reset successfully.</p>
            <p>Redirecting to login...</p>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'reset') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmitReset)}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                {...register('newPassword', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                autoComplete="new-password"
              />
              {errors.newPassword && (
                <span className="error-text">{errors.newPassword.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => {
                    const newPassword = document.getElementById('newPassword').value
                    return value === newPassword || 'Passwords do not match'
                  },
                })}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmitRequest)}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              autoComplete="email"
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="auth-link">
          Remember your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default PasswordReset

