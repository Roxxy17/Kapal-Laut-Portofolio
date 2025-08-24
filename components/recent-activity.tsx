"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw, Clock, User, FolderOpen, Settings, Eye, Users } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Activity {
  _id: string
  type: string
  title: string
  description: string
  metadata?: {
    projectId?: string
    projectTitle?: string
    teamName?: string
    viewCount?: number
  }
  createdAt: string
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'project_created':
    case 'project_updated':
    case 'project_deleted':
      return <FolderOpen className="w-4 h-4" />
    case 'profile_updated':
      return <Settings className="w-4 h-4" />
    case 'profile_viewed':
      return <Eye className="w-4 h-4" />
    case 'team_joined':
      return <Users className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'project_created':
      return 'bg-green-500/10 text-green-600 border-green-500/20'
    case 'project_updated':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    case 'project_deleted':
      return 'bg-red-500/10 text-red-600 border-red-500/20'
    case 'profile_updated':
      return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    case 'profile_viewed':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
    case 'team_joined':
      return 'bg-teal-500/10 text-teal-600 border-teal-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

const formatTimeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString()
  }
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const loadActivities = async (showRefreshState = false) => {
    try {
      if (showRefreshState) setIsRefreshing(true)
      
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token')
      }

      const response = await fetch('/api/activities?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch activities')
      }

      const data = await response.json()
      setActivities(data.activities || [])
    } catch (error) {
      console.error('Error loading activities:', error)
      toast({
        title: "Error",
        description: "Failed to load recent activities",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
      if (showRefreshState) setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadActivities()
  }, [])

  const handleRefresh = () => {
    loadActivities(true)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30 animate-pulse">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No recent activities</p>
            <p className="text-sm mt-1">Your activities will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity._id} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground leading-tight mb-1">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                    {activity.metadata?.projectId && (
                      <Badge variant="outline" className="text-xs">
                        Project
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
