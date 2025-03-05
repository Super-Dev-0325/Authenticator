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

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
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
}

export default api

