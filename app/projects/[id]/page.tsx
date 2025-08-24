"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar,
  Users,
  User,
  Loader2,
  Eye,
  Heart,
  Code,
  Globe
} from 'lucide-react'

interface Project {
  _id: string
  title: string
  description: string
  shortDescription: string
  category: string
  technologies: string[]
  image?: string
  gallery?: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  status: string
  type: 'individual' | 'team'
  views: number
  likes: number
  createdBy: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PublicProjectDetailPage({ params }: ProjectDetailPageProps) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [projectId, setProjectId] = useState<string>('')
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setProjectId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  const fetchProject = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/projects/${projectId}`)

      if (response.ok) {
        const data = await response.json()
        setProject(data.project)
        
        // Increment view count
        incrementViews()
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const incrementViews = async () => {
    try {
      await fetch(`/api/projects/${projectId}/view`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/like`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const data = await response.json()
        setProject(prev => prev ? { ...prev, likes: data.likes } : null)
        setLiked(!liked)
      }
    } catch (error) {
      console.error('Error liking project:', error)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'draft':
      case 'planning':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'in-progress':
      case 'review':
      case 'testing':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'on-hold':
        return 'bg-red-500/10 text-red-600 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'web-development':
        return 'Web Development'
      case 'mobile-development':
        return 'Mobile Development'
      case 'ui-ux-design':
        return 'UI/UX Design'
      case 'data-science':
        return 'Data Science'
      case 'devops':
        return 'DevOps'
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="text-lg text-muted-foreground">Loading project details...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
              <p className="text-muted-foreground mt-1">{project.shortDescription}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Views and Likes */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{project.views.toLocaleString()}</span>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors ${
                  liked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span>{project.likes.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Image */}
            {project.image && (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  About This Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="aspect-video overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`${project.title} gallery ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                  <Badge className={getStatusBadgeColor(project.status)}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>

                <Separator />

                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Category</span>
                  <Badge variant="outline">{getCategoryDisplayName(project.category)}</Badge>
                </div>

                <Separator />

                {/* Type */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Type</span>
                  <div className="flex items-center gap-1">
                    {project.type === 'team' ? (
                      <>
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Team Project</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4" />
                        <span className="text-sm">Individual</span>
                      </>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Featured */}
                {project.featured && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Featured</span>
                      <Badge variant="default">⭐ Featured</Badge>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Created Date */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Created</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Creator */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Created by</span>
                  <div className="flex items-center gap-1 text-sm">
                    {project.type === 'team' ? (
                      <>
                        <Users className="w-4 h-4" />
                        <span>Kapal Laut Team</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4" />
                        <span>{project.createdBy.name}</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.liveUrl && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
                  </Button>
                )}
                
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </Button>
                )}

                {!project.liveUrl && !project.githubUrl && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No external links available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
