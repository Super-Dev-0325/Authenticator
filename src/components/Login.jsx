import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { useEffect } from 'react'
import './Auth.css'

function Login() {
  const { login, isAuthenticated, loading, error, clearError } = useAuthStore()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

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
    const result = await login(data.username, data.password)
    
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="error-message">{error}</div>}
          
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
              })}
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || loading} 
            className="submit-button"
          >
            {isSubmitting || loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
