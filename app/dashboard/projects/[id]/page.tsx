"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Github, 
  Calendar,
  User,
  Users,
  Loader2,
  Eye,
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
  isTeamProject: boolean
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

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [projectId, setProjectId] = useState<string>('')

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
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProject(data.project)
      } else {
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive",
        })
        router.push('/dashboard/projects')
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      toast({
        title: "Error",
        description: "An error occurred while loading project",
        variant: "destructive",
      })
      router.push('/dashboard/projects')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    router.push(`/dashboard/projects/${projectId}/edit`)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return
    }

    try {
      setDeleteLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        })
        router.push('/dashboard/projects')
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to delete project",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the project",
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'default'
      case 'draft':
        return 'secondary'
      case 'in progress':
        return 'outline'
      case 'completed':
        return 'default'
      case 'planning':
        return 'secondary'
      case 'in-progress':
        return 'outline'
      case 'review':
        return 'outline'
      case 'testing':
        return 'outline'
      case 'on-hold':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published':
      case 'completed':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'draft':
      case 'planning':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'in progress':
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
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been deleted.</p>
            <button 
              onClick={() => router.push('/dashboard/projects')} 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
              style={{ pointerEvents: 'all', zIndex: 1000 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </button>
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
            <button
              onClick={() => router.push('/dashboard/projects')}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 cursor-pointer"
              style={{ pointerEvents: 'all', zIndex: 1000 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
              <p className="text-muted-foreground mt-1">{project.shortDescription}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 cursor-pointer"
              style={{ pointerEvents: 'all', zIndex: 1000 }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3 cursor-pointer"
              style={{ pointerEvents: 'all', zIndex: 1000 }}
            >
              {deleteLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </button>
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
                  Project Description
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
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>

                <Separator />

                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Category</span>
                  <Badge variant="outline">{project.category}</Badge>
                </div>

                <Separator />

                {/* Type */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Type</span>
                  <div className="flex items-center gap-1">
                    {project.isTeamProject ? (
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
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Featured</span>
                  <Badge variant={project.featured ? "default" : "secondary"}>
                    {project.featured ? "Yes" : "No"}
                  </Badge>
                </div>

                <Separator />

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
                  <span className="text-sm font-medium text-muted-foreground">Creator</span>
                  <div className="flex items-center gap-1 text-sm">
                    <User className="w-4 h-4" />
                    {project.createdBy.name}
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
                  <button
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="inline-flex items-center justify-start rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full cursor-pointer"
                    style={{ pointerEvents: 'all', zIndex: 1000 }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
                  </button>
                )}
                
                {project.githubUrl && (
                  <button
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="inline-flex items-center justify-start rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full cursor-pointer"
                    style={{ pointerEvents: 'all', zIndex: 1000 }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </button>
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
