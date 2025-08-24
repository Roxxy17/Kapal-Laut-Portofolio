"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Calendar,
  FolderOpen,
  Loader2,
} from "lucide-react"

export function ProjectsManagement() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = () => {
        router.push('/dashboard/projects/new')
      }
      window.addEventListener('add-project-clicked', handler)
      return () => window.removeEventListener('add-project-clicked', handler)
    }
  }, [router])
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  // Load projects
  useEffect(() => {
    loadProjects()
  }, [statusFilter])

  const loadProjects = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams()
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const response = await fetch(`/api/projects/user?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
      } else {
        console.error('Failed to load projects')
        setProjects([])
      }
    } catch (error) {
      console.error('Error loading projects:', error)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  // Filter projects
  const searchFilteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies?.some((tech: string) => 
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const getAllProjects = () => searchFilteredProjects
  const getIndividualProjects = () => searchFilteredProjects.filter(project => 
    project.type === 'individual' || (!project.type && !project.isTeamProject)
  )
  const getTeamProjects = () => searchFilteredProjects.filter(project => 
    project.type === 'team' || (!project.type && project.isTeamProject)
  )

  // Handlers
  const handleAddProject = () => {
    router.push('/dashboard/projects/new')
  }

  const handleViewProject = (id: string) => {
    router.push(`/dashboard/projects/${id}`)
  }

  const handleEditProject = (id: string) => {
    router.push(`/dashboard/projects/${id}/edit`)
  }

  const handleDeleteProject = async (projectId: string) => {
    setDeleteLoading(projectId)
    try {
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
        loadProjects()
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
      setDeleteLoading(null)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
  }

  const handleOpenUrl = (url: string) => {
    window.open(url, '_blank')
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and track progress
          </p>
        </div>
          <button 
            onClick={handleAddProject}
            style={{ border: '', pointerEvents: 'all', zIndex: 1000 }}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]" style={{ border: '', pointerEvents: 'all', zIndex: 1000 }}>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="review">In Review</SelectItem>
            <SelectItem value="testing">Testing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all" style={{ border: '', pointerEvents: 'all', zIndex: 1000 }}>All Projects</TabsTrigger>
          <TabsTrigger value="individual" style={{ border: '', pointerEvents: 'all', zIndex: 1000 }}>Individual</TabsTrigger>
          <TabsTrigger value="team" style={{ border: '', pointerEvents: 'all', zIndex: 1000 }}>Team</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ProjectGrid 
            projects={getAllProjects()} 
            onView={handleViewProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onOpenUrl={handleOpenUrl}
            onAddProject={handleAddProject}
            deleteLoading={deleteLoading}
          />
        </TabsContent>

        <TabsContent value="individual" className="mt-6">
          <ProjectGrid 
            projects={getIndividualProjects()} 
            onView={handleViewProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onOpenUrl={handleOpenUrl}
            onAddProject={handleAddProject}
            deleteLoading={deleteLoading}
          />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <ProjectGrid 
            projects={getTeamProjects()} 
            onView={handleViewProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onOpenUrl={handleOpenUrl}
            onAddProject={handleAddProject}
            deleteLoading={deleteLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ProjectGridProps {
  projects: any[]
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onOpenUrl: (url: string) => void
  onAddProject: () => void
  deleteLoading: string | null
}

function ProjectGrid({ 
  projects, 
  onView, 
  onEdit, 
  onDelete, 
  onOpenUrl, 
  onAddProject, 
  deleteLoading 
}: ProjectGridProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null)

  if (projects.length === 0) {
    return (
      <div className="text-center py-12" style={{ position: 'relative', zIndex: 9999, pointerEvents: 'all' }}>
        <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No projects</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by creating a new project.
        </p>
        <div className="mt-6" style={{ position: 'relative', zIndex: 9999 }}>
          <button 
            onClick={onAddProject}
            style={{ position: 'relative', zIndex: 9999, pointerEvents: 'all' }}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card
            key={project._id}
            className="group hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border border-border bg-card rounded-lg overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={project.image || "/placeholder.jpg"}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 z-10">
                <Badge variant={project.type === "team" ? "default" : "secondary"}>
                  {project.type === "team" ? "Team" : "Individual"}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 z-10">
                <Badge
                  variant={
                    project.status === "completed"
                      ? "default"
                      : project.status === "in-progress"
                        ? "secondary"
                        : "outline"
                  }
                  className="bg-background/90 text-foreground shadow-sm border"
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </Badge>
              </div>
              
              {/* Action buttons overlay */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button
                    onClick={() => onView(project._id)}
                    style={{ zIndex: 1000 }}
                    className="p-2 bg-background/90 border border-border text-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(project._id)}
                    style={{ zIndex: 1000 }}
                    className="p-2 bg-blue-500/90 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(project._id)}
                    style={{ zIndex: 1000 }}
                    className="p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold line-clamp-1 mb-1">
                {project.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-0">
              <div className="flex flex-wrap gap-1">
                {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs py-1 px-2">
                    {tech}
                  </Badge>
                ))}
                {project.technologies?.length > 3 && (
                  <Badge variant="outline" className="text-xs py-1 px-2">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              {project.collaborators && project.collaborators.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Collaborators:</strong> {project.collaborators.join(", ")}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span>{project.views || 0} views</span>
                  <span>{project.likes || 0} likes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(project.updatedAt || project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {project.liveUrl && (
                  <button 
                    onClick={() => onOpenUrl(project.liveUrl)}
                    style={{ zIndex: 1000 }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white h-9 px-3 flex-1 cursor-pointer shadow-sm"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Demo
                  </button>
                )}
                {project.githubUrl && (
                  <button 
                    onClick={() => onOpenUrl(project.githubUrl)}
                    style={{ zIndex: 1000 }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white h-9 px-3 flex-1 cursor-pointer shadow-sm"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simple Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg border shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Project</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex space-x-2 justify-end">
              <button
                onClick={() => setShowDeleteDialog(null)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(showDeleteDialog)
                  setShowDeleteDialog(null)
                }}
                disabled={deleteLoading === showDeleteDialog}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 cursor-pointer"
              >
                {deleteLoading === showDeleteDialog ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
