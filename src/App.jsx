import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuthStore from './store/authStore'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import VerifyEmail from './components/VerifyEmail'
import PasswordReset from './components/PasswordReset'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, initialize } = useAuthStore()
  
  useEffect(() => {
    initialize()
  }, [initialize])
  
  if (loading) {
    return <LoadingSpinner message="Loading..." />
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppRoutes() {
  const { isAuthenticated, initialize } = useAuthStore()
  
  useEffect(() => {
    initialize()
  }, [initialize])
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} 
      />
      <Route 
        path="/verify-email" 
        element={<VerifyEmail />} 
      />
      <Route 
        path="/password-reset" 
        element={<PasswordReset />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <AppRoutes />
      </div>
    </ErrorBoundary>
  )
}

export default App

