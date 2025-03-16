import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { authAPI } from '../services/api'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Initialize auth state
      initialize: async () => {
        set({ loading: true })
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const userData = await authAPI.getCurrentUser()
            set({ user: userData, isAuthenticated: true, loading: false })
          } catch (error) {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            set({ user: null, isAuthenticated: false, loading: false })
          }
        } else {
          set({ loading: false })
        }
      },

      // Login
      login: async (username, password) => {
        set({ loading: true, error: null })
        try {
          const response = await authAPI.login(username, password)
          localStorage.setItem('token', response.access_token)
          localStorage.setItem('refreshToken', response.refresh_token)
          
          const userData = await authAPI.getCurrentUser()
          set({ 
            user: userData, 
            isAuthenticated: true, 
            loading: false,
            error: null
          })
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.detail || 'Login failed'
          set({ 
            isAuthenticated: false, 
            loading: false,
            error: errorMessage
          })
          return { success: false, error: errorMessage }
        }
      },

      // Register
      register: async (email, username, password) => {
        set({ loading: true, error: null })
        try {
          await authAPI.register(email, username, password)
          set({ loading: false, error: null })
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.detail || 'Registration failed'
          set({ loading: false, error: errorMessage })
          return { success: false, error: errorMessage }
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        set({ 
          user: null, 
          isAuthenticated: false,
          error: null
        })
      },

      // Refresh token
      refreshToken: async () => {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          get().logout()
          return false
        }

        try {
          const response = await authAPI.refreshToken(refreshToken)
          localStorage.setItem('token', response.access_token)
          localStorage.setItem('refreshToken', response.refresh_token)
          return true
        } catch (error) {
          get().logout()
          return false
        }
      },

      // Verify email
      verifyEmail: async (token) => {
        set({ loading: true, error: null })
        try {
          await authAPI.verifyEmail(token)
          set({ loading: false, error: null })
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.detail || 'Verification failed'
          set({ loading: false, error: errorMessage })
          return { success: false, error: errorMessage }
        }
      },

      // Resend verification
      resendVerification: async (email) => {
        set({ loading: true, error: null })
        try {
          await authAPI.resendVerification(email)
          set({ loading: false, error: null })
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.detail || 'Failed to resend verification'
          set({ loading: false, error: errorMessage })
          return { success: false, error: errorMessage }
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

export default useAuthStore

