"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Upload, LinkIcon, Github, Loader2 } from "lucide-react"
import Link from "next/link"

const availableTechnologies = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
  "Docker",
  "AWS",
  "Vercel",
  "Netlify",
  "Tailwind CSS",
  "Material-UI",
  "Chakra UI",
  "Styled Components",
  "Figma",
  "Adobe XD",
  "Sketch",
  "Framer Motion",
  "GSAP",
]

export function AddProjectForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
    technologies: [] as string[],
    demoUrl: "",
    githubUrl: "",
    imageUrl: "",
    collaborators: [] as string[],
  })
  const [newTech, setNewTech] = useState("")
  const [newCollaborator, setNewCollaborator] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Project data:", formData)
    setSuccess(true)
    setIsLoading(false)

    // Redirect after success
    setTimeout(() => {
      router.push("/dashboard/projects")
    }, 1500)
  }

  const addTechnology = () => {
    if (newTech && !formData.technologies.includes(newTech)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech],
      }))
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const addCollaborator = () => {
    if (newCollaborator && !formData.collaborators.includes(newCollaborator)) {
      setFormData((prev) => ({
        ...prev,
        collaborators: [...prev.collaborators, newCollaborator],
      }))
      setNewCollaborator("")
    }
  }

  const removeCollaborator = (collaborator: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((c) => c !== collaborator),
    }))
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <div className="text-center py-16 px-8">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <Plus className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Project Added Successfully! 🎉
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Your project has been added to your portfolio and is now live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary/90 hover:bg-primary">
              <Link href="/dashboard/projects">View My Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center space-x-4 pb-6 border-b border-border/50">
        <Button variant="ghost" size="icon" asChild className="hover:bg-accent/50">
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Add New Project
          </h2>
          <p className="text-muted-foreground text-lg mt-2">
            Share your latest work with the team and showcase your skills
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card className="animate-slide-in-left border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-serif">Basic Information</CardTitle>
              <CardDescription>Tell us about your project and what makes it special</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-semibold">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  placeholder="My Awesome Project"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                  className="h-12 border-border/50 focus:border-primary/50 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your project does, the problems it solves, and what makes it unique..."
                  className="min-h-[120px] border-border/50 focus:border-primary/50 bg-background/50 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="type" className="text-sm font-semibold">
                    Project Type *
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="h-12 border-border/50 bg-background/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Project</SelectItem>
                      <SelectItem value="team">Team Collaboration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="status" className="text-sm font-semibold">
                    Status *
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="h-12 border-border/50 bg-background/50">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media & Links */}
          <Card className="animate-slide-in-right animation-delay-200 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-serif">Media & Links</CardTitle>
              <CardDescription>Add visuals and project links to showcase your work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="imageUrl" className="text-sm font-semibold">
                  Project Image URL
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    className="h-12 border-border/50 focus:border-primary/50 bg-background/50"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-border/50 hover:bg-accent/50 bg-transparent"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="demoUrl" className="text-sm font-semibold">
                  Demo URL
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="demoUrl"
                    placeholder="https://myproject.com"
                    className="pl-12 h-12 border-border/50 focus:border-primary/50 bg-background/50"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="githubUrl" className="text-sm font-semibold">
                  GitHub URL
                </Label>
                <div className="relative">
                  <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/username/repo"
                    className="pl-12 h-12 border-border/50 focus:border-primary/50 bg-background/50"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                  />
                </div>
              </div>

              {formData.imageUrl && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Preview</Label>
                  <div className="border border-border/50 rounded-xl overflow-hidden bg-accent/10">
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Project preview"
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=160&width=320"
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Technologies */}
        <Card className="animate-fade-in-up animation-delay-400 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-serif">Technologies Used</CardTitle>
            <CardDescription>Add the technologies, frameworks, and tools used in this project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-3">
              <Select value={newTech} onValueChange={setNewTech}>
                <SelectTrigger className="flex-1 h-12 border-border/50 bg-background/50">
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  {availableTechnologies
                    .filter((tech) => !formData.technologies.includes(tech))
                    .map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={addTechnology}
                disabled={!newTech}
                className="h-12 px-6 bg-primary/90 hover:bg-primary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {formData.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent/70 transition-colors"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Collaborators (only for team projects) */}
        {formData.type === "team" && (
          <Card className="animate-fade-in-up animation-delay-600 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Collaborators</CardTitle>
              <CardDescription>Add team members who worked on this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter collaborator name"
                  value={newCollaborator}
                  onChange={(e) => setNewCollaborator(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCollaborator())}
                />
                <Button type="button" onClick={addCollaborator} disabled={!newCollaborator}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.collaborators.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.collaborators.map((collaborator) => (
                    <Badge key={collaborator} variant="outline" className="flex items-center gap-1">
                      {collaborator}
                      <button
                        type="button"
                        onClick={() => removeCollaborator(collaborator)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Submit */}
        <div className="flex justify-end space-x-4 animate-fade-in-up animation-delay-800 pt-6 border-t border-border/50">
          <Button
            type="button"
            variant="outline"
            asChild
            className="h-12 px-8 border-border/50 hover:bg-accent/50 bg-transparent"
          >
            <Link href="/dashboard/projects">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !formData.title || !formData.description || !formData.type || !formData.status}
            className="h-12 px-8 bg-primary/90 hover:bg-primary hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding Project...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
