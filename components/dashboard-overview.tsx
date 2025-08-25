"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-context"
import { RecentActivity } from "@/components/recent-activity"
import { FolderOpen, Plus, TrendingUp, Users, Eye, Github } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Types
interface Project {
  _id: string
  title: string
  description: string
  shortDescription?: string
  category: string
  technologies: string[]
  status: 'draft' | 'completed' | 'archived'
  featured: boolean
  type: 'individual' | 'team'
  createdBy: {
    _id: string
    name: string
    email: string
  }
  liveUrl?: string
  githubUrl?: string
  image: string
  createdAt: string
  updatedAt: string
}

interface DashboardStats {
  totalProjects: number
  userProjects: number
  userIndividualProjects: number
  teamProjects: number
  individualProjects: number
  featuredProjects: number
  categoriesCount: number
  technologiesCount: number
  totalViews: number
  growthPercentage: number
  completionRate: number
  averageProjectAge: number
  completedProjects: number // Add this field
  projectsByStatus: { [key: string]: number }
}

export function DashboardOverview() {
  const { user, isLoading: authLoading } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    userProjects: 0,
    userIndividualProjects: 0,
    teamProjects: 0,
    individualProjects: 0,
    featuredProjects: 0,
    categoriesCount: 0,
    technologiesCount: 0,
    totalViews: 0,
    growthPercentage: 0,
    completionRate: 0,
    averageProjectAge: 0,
    completedProjects: 0,
    projectsByStatus: {}
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting')

  // Fetch projects and calculate stats
  useEffect(() => {
    async function fetchDashboardData() {
      // Wait for auth to complete before making API calls
      if (authLoading) return
      
      if (!user) {
        setError('Please log in to view dashboard')
        setLoading(false)
        return
      }

      try {
        setError(null)
        setConnectionStatus('connecting')
        
        // Get token from localStorage or auth context
        const token = localStorage.getItem('token')
        if (!token) {
          setError('No authentication token found. Please log in again.')
          setConnectionStatus('error')
          setLoading(false)
          return
        }

        const response = await fetch('/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (data.success) {
          const { stats } = data
          setProjects(stats.recentProjects || [])
          
          setStats({
            totalProjects: stats.totalProjects || 0,
            userProjects: stats.userProjects || 0,
            userIndividualProjects: stats.userIndividualProjects || 0,
            teamProjects: stats.teamProjects || 0,
            individualProjects: stats.individualProjects || 0,
            featuredProjects: stats.featuredProjects || 0,
            categoriesCount: stats.categoriesCount || 0,
            technologiesCount: stats.technologiesCount || 0,
            totalViews: stats.totalViews || 0,
            growthPercentage: stats.growthPercentage || 0,
            completionRate: stats.completionRate || 0,
            averageProjectAge: stats.averageProjectAge || 0,
            completedProjects: stats.completedProjects || 0,
            projectsByStatus: stats.projectsByStatus || {}
          })
          setConnectionStatus('connected')
        } else {
          throw new Error(data.error || 'Failed to fetch dashboard data')
        }
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error)
        setConnectionStatus('error')
        
        // Check if it's a MongoDB connection error
        if (error?.message?.includes('MongooseServerSelectionError') || 
            error?.message?.includes('Could not connect to any servers')) {
          setError('Database connection failed. Please check MongoDB Atlas configuration.')
        } else if (error?.message?.includes('IP') || error?.message?.includes('whitelist')) {
          setError('IP address not whitelisted. Please add your IP to MongoDB Atlas.')
        } else if (error?.message?.includes('authentication')) {
          setError('Database authentication failed. Please check credentials.')
        } else {
          setError(error?.message || 'Failed to load dashboard data. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, authLoading]) // Add authLoading and user as dependencies

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  // Helper function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'draft': return 'secondary'
      case 'archived': return 'outline'
      default: return 'outline'
    }
  }

  // Show loading state during auth check
  if (authLoading) {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-chart-3/10 p-8 border border-border/50">
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded-lg animate-pulse w-2/3"></div>
            <div className="h-4 bg-muted rounded-lg animate-pulse w-1/2"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 border rounded-lg">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-8 bg-muted rounded animate-pulse w-1/2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-chart-3/10 p-8 border border-border/50">
        <div className="relative z-10">
          <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Here's what's happening with your projects and portfolio. Ready to create something amazing today?
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
      </div>

      {/* Error Alert */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="text-red-800 dark:text-red-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Database Connection Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
            <div className="space-y-2 text-sm text-red-600 dark:text-red-400">
              <p><strong>Quick Fix:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Go to <a href="https://cloud.mongodb.com/" target="_blank" className="underline">MongoDB Atlas Dashboard</a></li>
                <li>Navigate to "Network Access"</li>
                <li>Add your IP address: <code className="bg-red-100 dark:bg-red-900 px-1 rounded">103.86.100.23</code></li>
                <li>Or use <code className="bg-red-100 dark:bg-red-900 px-1 rounded">0.0.0.0/0</code> for development</li>
              </ol>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900"
              onClick={() => window.location.reload()}
            >
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Connection Status Indicator */}
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${
          connectionStatus === 'connected' ? 'bg-green-500' : 
          connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
          'bg-red-500'
        }`}></div>
        <span className="text-muted-foreground">
          Database: {
            connectionStatus === 'connected' ? 'Connected' : 
            connectionStatus === 'connecting' ? 'Connecting...' : 
            'Connection Failed'
          }
        </span>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Projects</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <FolderOpen className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {loading ? "..." : stats.userProjects}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              Your portfolio projects
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-200 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Individual</CardTitle>
            <div className="p-2 bg-chart-2/10 rounded-lg">
              <Eye className="h-4 w-4 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-chart-2 to-chart-2/70 bg-clip-text text-transparent">
              {loading ? "..." : stats.userIndividualProjects}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              Personal work
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-400 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Projects</CardTitle>
            <div className="p-2 bg-chart-3/10 rounded-lg">
              <Users className="h-4 w-4 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-chart-3 to-chart-3/70 bg-clip-text text-transparent">
              {loading ? "..." : stats.teamProjects}
            </div>
            <p className="text-xs text-muted-foreground">All collaborative work</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-600 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <FolderOpen className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              {loading ? "..." : stats.completedProjects}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              Finished projects
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-700 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FolderOpen className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              {loading ? "..." : (stats.projectsByStatus?.['in-progress'] || 0)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-blue-500" />
              Active projects
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-750 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planning</CardTitle>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <FolderOpen className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              {loading ? "..." : (stats.projectsByStatus?.['planning'] || 0)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-yellow-500" />
              Upcoming projects
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-800 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Growth</CardTitle>
            <div className="p-2 bg-chart-5/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-chart-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-chart-5 to-chart-5/70 bg-clip-text text-transparent">
              {loading ? "..." : `+${stats.growthPercentage}%`}
            </div>
            <p className="text-xs text-muted-foreground">Monthly growth rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-scale-in animation-delay-1000 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {loading ? "..." : stats.categoriesCount}
            </div>
            <p className="text-xs text-muted-foreground">Project categories</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-1200 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technologies</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              {loading ? "..." : stats.technologiesCount}
            </div>
            <p className="text-xs text-muted-foreground">Tech stack diversity</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-1400 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {loading ? "..." : `${stats.completionRate}%`}
            </div>
            <p className="text-xs text-muted-foreground">Project success rate</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-1600 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Project Age</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {loading ? "..." : `${stats.averageProjectAge}d`}
            </div>
            <p className="text-xs text-muted-foreground">Days since creation</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="animate-slide-in-left border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-serif">Recent Projects</CardTitle>
              <CardDescription>Your latest portfolio additions</CardDescription>
            </div>
            <Button size="sm" asChild className="bg-primary/90 hover:bg-primary">
              <Link href="/dashboard/projects">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              // Loading skeletons
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-border/50 rounded-xl animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-full mb-3"></div>
                    <div className="flex space-x-2">
                      <div className="h-5 bg-muted rounded w-16"></div>
                      <div className="h-5 bg-muted rounded w-12"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="group flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-accent/30 hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                >
                  <div className="space-y-2 flex-1">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">{project.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.shortDescription || project.description}
                    </p>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={getStatusVariant(project.status)}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                      {project.type === 'team' && (
                        <Badge variant="outline" className="text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          Team
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        Category: {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {project.liveUrl && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No projects found. Start by creating your first project!</p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/projects/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-slide-in-right animation-delay-200 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full justify-start h-12 bg-primary/90 hover:bg-primary hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link href="/dashboard/projects/new">
                <Plus className="w-5 h-5 mr-3" />
                Add New Project
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-12 bg-transparent hover:bg-accent/50 border-border/50 hover:border-primary/30 transition-all duration-300"
              asChild
            >
              <Link href="/dashboard/settings">
                <Users className="w-5 h-5 mr-3" />
                Update Profile
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-12 bg-transparent hover:bg-accent/50 border-border/50 hover:border-primary/30 transition-all duration-300"
              asChild
            >
              <Link href="/">
                <Eye className="w-5 h-5 mr-3" />
                View Public Portfolio
              </Link>
            </Button>

            <div className="pt-6 border-t border-border/50">
              <h4 className="font-semibold mb-4 text-foreground">Recent Activity</h4>
              <RecentActivity />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
