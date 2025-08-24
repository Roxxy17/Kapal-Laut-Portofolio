"use client"

import { useAuth } from "@/components/auth-context"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function AuthDebugger() {
  const { user, isLoading, logout } = useAuth()
  const [token, setToken] = useState<string | null>(null)
  const [cookieToken, setCookieToken] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check localStorage token
    const localToken = localStorage.getItem('token')
    setToken(localToken)

    // Check cookie token
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1]
    setCookieToken(cookie || null)
  }, [user])

  const clearAuth = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.reload()
  }

  if (!show) {
    return (
      <Button 
        onClick={() => setShow(true)}
        className="fixed bottom-4 right-4 z-50"
        size="sm"
        variant="secondary"
      >
        Debug Auth
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-sm">Auth Debug Info</h3>
        <Button size="sm" variant="ghost" onClick={() => setShow(false)}>×</Button>
      </div>
      <div className="text-xs space-y-1 mb-3">
        <div>
          <strong>User:</strong> {user ? `${user.name} (${user.role})` : 'Not logged in'}
        </div>
        <div>
          <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>LocalStorage Token:</strong> {token ? '✅ Exists' : '❌ Missing'}
        </div>
        <div>
          <strong>Cookie Token:</strong> {cookieToken ? '✅ Exists' : '❌ Missing'}
        </div>
        <div>
          <strong>Token Preview:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}
        </div>
      </div>
      <div className="space-y-2">
        <Button size="sm" variant="destructive" onClick={clearAuth} className="w-full">
          Clear All Auth
        </Button>
        <Button size="sm" variant="outline" onClick={logout} className="w-full">
          Logout (Context)
        </Button>
      </div>
    </div>
  )
}
