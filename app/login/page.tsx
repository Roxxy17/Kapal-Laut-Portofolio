"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-context"
import { ArrowLeft, Eye, EyeOff, Loader2, Rocket, Code, Palette } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [demoUsers, setDemoUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Fetch team members from database
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/users')
        if (response.ok) {
          const data = await response.json()
          setDemoUsers(data.users || [])
        }
      } catch (error) {
        console.error('Failed to fetch team members:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (success) {
      // Check for redirect parameter
      const redirectTo = searchParams.get('redirect') || '/dashboard'
      router.push(redirectTo)
    } else {
      setError("Invalid email or password. Try with the updated credentials from seed output")
    }
  }

  const getRoleDisplay = (user: any) => {
    // Map user names to roles
    const roleMap: { [key: string]: string } = {
      'Kalila Atha Achmad': 'Full Stack & Mobile Dev',
      'Rifqi Dani Putranto': 'Full Stack & Mobile Dev', 
      'Nada Satya Maharani': 'Frontend & UI/UX Designer'
    }
    return roleMap[user.name] || user.role || 'Team Member'
  }

  const getRoleIcon = (user: any) => {
    const roleName = getRoleDisplay(user)
    if (roleName.includes('Designer')) return Palette
    if (roleName.includes('Dev')) return Code
    return Rocket
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2 animate-fade-in-up">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Sign in to manage your portfolio</p>
        </div>

        <Card className="animate-scale-in animation-delay-200 backdrop-blur-sm bg-background/80 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@teamportfolio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="animate-shake">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full group" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Our Team Members:</p>
              <div className="space-y-2">
                {loading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="ml-2 text-sm text-muted-foreground">Loading team members...</span>
                  </div>
                ) : (
                  demoUsers.map((user: any, index: number) => {
                    const IconComponent = getRoleIcon(user)
                    const roleDisplay = getRoleDisplay(user)
                    
                    return (
                      <div
                        key={user.email || index}
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-muted"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{roleDisplay}</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Meet our talented team members
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
