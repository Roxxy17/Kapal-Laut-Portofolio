"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AddProjectForm } from "@/components/add-project-form"
import { useToast } from "@/hooks/use-toast"

interface EditProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [projectId, setProjectId] = useState<string | null>(null)

  // Resolve params
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setProjectId(resolvedParams.id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user && projectId) {
      fetchProject()
    }
  }, [user, projectId])

  const fetchProject = async () => {
    if (!projectId) return
    
    try {
      setLoading(true)
      const response = await fetch(`/api/projects/${projectId}`)
      
      if (!response.ok) {
        throw new Error('Project not found')
      }
      
      const data = await response.json()
      console.log('Project data received:', data.project) // Debug log
      setProject(data.project) // Extract project from response
    } catch (error) {
      console.error('Error fetching project:', error)
      toast({
        title: "Error",
        description: "Failed to load project data",
        variant: "destructive",
      })
      router.push('/dashboard/projects')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground">Project not found</h2>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <AddProjectForm initialData={project} isEdit={true} />
    </DashboardLayout>
  )
}
