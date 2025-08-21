"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-context"
import { FolderOpen, Plus, TrendingUp, Users, Eye, Github } from "lucide-react"
import Link from "next/link"

// Mock data for user projects
const mockUserProjects = [
  {
    id: "1",
    title: "Personal Portfolio v2",
    description: "Updated portfolio with new projects and improved design",
    status: "In Progress",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    views: 245,
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    title: "E-commerce Dashboard",
    description: "Admin dashboard for managing online store",
    status: "Completed",
    technologies: ["React", "TypeScript", "Chart.js"],
    views: 189,
    lastUpdated: "1 week ago",
  },
  {
    id: "3",
    title: "Mobile App UI Kit",
    description: "Comprehensive UI components for mobile applications",
    status: "Planning",
    technologies: ["Figma", "React Native", "Expo"],
    views: 67,
    lastUpdated: "3 days ago",
  },
]

export function DashboardOverview() {
  const { user } = useAuth()

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <FolderOpen className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              12
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-200 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <div className="p-2 bg-chart-2/10 rounded-lg">
              <Eye className="h-4 w-4 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-chart-2 to-chart-2/70 bg-clip-text text-transparent">
              2,847
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +15% from last month
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
              8
            </div>
            <p className="text-xs text-muted-foreground">Active collaborations</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in animation-delay-600 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <div className="p-2 bg-chart-4/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-chart-4 to-chart-4/70 bg-clip-text text-transparent">
              +23%
            </div>
            <p className="text-xs text-muted-foreground">Portfolio engagement</p>
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
            {mockUserProjects.map((project, index) => (
              <div
                key={project.id}
                className="group flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-accent/30 hover:border-primary/20 transition-all duration-300 hover:shadow-md"
              >
                <div className="space-y-2 flex-1">
                  <h4 className="font-semibold group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "default"
                          : project.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {project.views} views
                    </span>
                    <span className="text-xs text-muted-foreground">{project.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
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
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-accent/20 border border-border/30">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <span className="text-foreground font-medium">Updated "Personal Portfolio v2"</span>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10 border border-border/20">
                  <div className="w-2 h-2 bg-chart-2 rounded-full mt-2"></div>
                  <div>
                    <span className="text-foreground font-medium">Joined team project "Healthcare Dashboard"</span>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10 border border-border/20">
                  <div className="w-2 h-2 bg-chart-3 rounded-full mt-2"></div>
                  <div>
                    <span className="text-foreground font-medium">Profile viewed 23 times this week</span>
                    <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
