import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const response = await authAPI.refreshToken(refreshToken)
          localStorage.setItem('token', response.access_token)
          localStorage.setItem('refreshToken', response.refresh_token)
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${response.access_token}`
          return api(originalRequest)
        } catch (refreshError) {
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      } else {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: async (username, password) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    const response = await axios.post(`${API_BASE_URL}/token`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  register: async (email, username, password) => {
    const response = await api.post('/register', {
      email,
      username,
      password,
    })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/me')
    return response.data
  },

  refreshToken: async (refreshToken) => {
    const response = await api.post('/refresh', {
      refresh_token: refreshToken,
    })
    return response.data
  },

  verifyEmail: async (token) => {
    const response = await api.post('/verify-email', {
      token,
    })
    return response.data
  },

  resendVerification: async (email) => {
    const response = await api.post('/resend-verification', { email })
    return response.data
  },

  requestPasswordReset: async (email) => {
    const response = await api.post('/password-reset', { email })
    return response.data
  },

  confirmPasswordReset: async (token, newPassword) => {
    const response = await api.post('/password-reset/confirm', {
      token,
      new_password: newPassword,
    })
    return response.data
  },
}

export default api

