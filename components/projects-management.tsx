"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Calendar,
  FolderOpen,
} from "lucide-react"
import Link from "next/link"

// Mock projects data
const mockProjects = [
  {
    id: "1",
    title: "Personal Portfolio v2",
    description: "Updated portfolio with new projects and improved design system",
    status: "In Progress",
    type: "individual",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/placeholder.svg?height=200&width=300",
    views: 245,
    likes: 18,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-18",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "2",
    title: "E-commerce Dashboard",
    description: "Comprehensive admin dashboard for managing online store operations",
    status: "Completed",
    type: "individual",
    technologies: ["React", "TypeScript", "Chart.js", "Material-UI"],
    image: "/placeholder.svg?height=200&width=300",
    views: 189,
    likes: 24,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "3",
    title: "Healthcare Platform",
    description: "Collaborative healthcare management system with team members",
    status: "In Progress",
    type: "team",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    image: "/placeholder.svg?height=200&width=300",
    views: 156,
    likes: 31,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-17",
    collaborators: ["Sarah Johnson", "Mike Rodriguez"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "4",
    title: "Mobile App UI Kit",
    description: "Comprehensive UI components library for mobile applications",
    status: "Planning",
    type: "individual",
    technologies: ["Figma", "React Native", "Expo", "Styled Components"],
    image: "/placeholder.svg?height=200&width=300",
    views: 67,
    likes: 12,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
    links: {
      demo: "#",
      github: "#",
    },
  },
]

export function ProjectsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "individual") return matchesSearch && project.type === "individual"
    if (activeTab === "team") return matchesSearch && project.type === "team"

    return matchesSearch
  })

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-foreground">My Projects</h2>
          <p className="text-muted-foreground">Manage your individual and collaborative projects</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
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
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Projects Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={project.type === "team" ? "default" : "secondary"}>
                      {project.type === "team" ? "Team" : "Individual"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "default"
                          : project.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute top-0 right-0 p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {project.collaborators && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Collaborators:</strong> {project.collaborators.join(", ")}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>{project.views} views</span>
                      <span>{project.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first project"}
              </p>
              <Button asChild>
                <Link href="/dashboard/projects/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
