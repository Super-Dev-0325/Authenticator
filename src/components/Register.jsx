import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { useEffect, useState } from 'react'
import './Auth.css'

function Register() {
  const { register: registerUser, isAuthenticated, loading, error, clearError } = useAuthStore()
  const navigate = useNavigate()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const password = watch('password')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    return () => clearError()
  }, [clearError])

  const onSubmit = async (data) => {
    clearError()
    const result = await registerUser(data.email, data.username, data.password)
    
    if (result.success) {
      setRegistrationSuccess(true)
    }
  }

  if (registrationSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Registration Successful!</h2>
          <div className="success-message">
            <p>Please check your email to verify your account.</p>
            <p>You can login after verifying your email.</p>
          </div>
          <Link to="/login" className="submit-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be less than 20 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Username can only contain letters, numbers, and underscores',
                },
              })}
              autoComplete="username"
            />
            {errors.username && (
              <span className="error-text">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                },
              })}
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || loading} 
            className="submit-button"
          >
            {isSubmitting || loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
