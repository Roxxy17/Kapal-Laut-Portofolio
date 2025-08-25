"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Start with loading true

  // Check for stored auth on mount and validate token
  useEffect(() => {
    async function validateStoredAuth() {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        
        // Also check cookie as fallback
        const cookieToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth-token='))
          ?.split('=')[1]
        
        if (storedUser && (token || cookieToken)) {
          // Use the token from localStorage first, then fallback to cookie
          const authToken = token || cookieToken
          
          // If we have cookieToken but no localStorage token, sync them
          if (cookieToken && !token) {
            localStorage.setItem('token', cookieToken)
          }
          
          // Validate token by making a test API call
          try {
            const response = await fetch('/api/auth/validate', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
              }
            })
            
            if (response.ok) {
              const validationData = await response.json()
              setUser(validationData.user)
              
              // Update localStorage with fresh data from server
              localStorage.setItem('user', JSON.stringify(validationData.user))
            } else {
              // Clear invalid auth
              localStorage.removeItem('user')
              localStorage.removeItem('token')
              document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            }
          } catch (error) {
            // Clear invalid auth
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          }
        } else {
          // No valid stored auth found
        }
      }
      setIsLoading(false)
    }

    validateStoredAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user and token in localStorage only
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', data.token)
        }
        
        // Set user state
        setUser(data.user)
        return true
      } else {
        console.error('Login failed:', data.error)
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // Call logout API to clear server-side cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Logout API error:', error)
    }

    // Clear client-side storage regardless of API success
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      
      // Remove cookie client-side as well
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
