"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Users, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const teamProjects = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with advanced features and seamless user experience.",
    image: "/ecommerce-platform.svg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    team: ["Alex Chen", "Sarah Johnson", "Mike Rodriguez"],
    status: "Completed",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "Healthcare Dashboard",
    description: "Comprehensive dashboard for healthcare professionals to manage patient data.",
    image: "/healthcare-dashboard.svg",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Chart.js"],
    team: ["Emily Davis", "Mike Rodriguez"],
    status: "In Progress",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "Learning Management System",
    description: "Interactive platform for online education with video streaming and assessments.",
    image: "/learning-management-system.svg",
    technologies: ["Next.js", "TypeScript", "Prisma", "AWS"],
    team: ["Alex Chen", "Sarah Johnson", "Emily Davis"],
    status: "Completed",
    links: {
      demo: "#",
      github: "#",
    },
  },
]

const individualProjects = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing design and development skills.",
    image: "/portfolio-website.svg",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    author: "Sarah Johnson",
    status: "Completed",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "Task Management App",
    description: "Productivity app with real-time collaboration features.",
    image: "/task-management-app.svg",
    technologies: ["Vue.js", "Firebase", "Vuetify"],
    author: "Emily Davis",
    status: "Completed",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "Weather Analytics",
    description: "Data visualization tool for weather patterns and forecasting.",
    image: "/weather-analytics.svg",
    technologies: ["Python", "Django", "D3.js", "API"],
    author: "Mike Rodriguez",
    status: "In Progress",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "Mobile Banking UI",
    description: "Modern mobile banking interface with intuitive user experience.",
    image: "/mobile-banking-ui.svg",
    technologies: ["React Native", "Redux", "Node.js"],
    author: "Alex Chen",
    status: "Completed",
    links: {
      demo: "#",
      github: "#",
    },
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background elements matching other sections */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full animate-sophisticated-float blur-2xl" />
      <div className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-l from-primary/8 to-accent/8 animate-liquid-morph blur-xl" />
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-chart-3/10 to-accent/10 animate-sophisticated-float animation-delay-500 rounded-full blur-xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            <span className="inline-block">Our</span>{" "}
            <span className="inline-block">
              Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our collaborative team projects and individual portfolio pieces that showcase our expertise and creativity
          </p>
        </div>

        <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-16 h-12 bg-card/50 backdrop-blur-sm border border-border/50">
            <TabsTrigger value="team" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-white transition-all duration-300">
              <Users className="w-4 h-4" />
              Team Projects
            </TabsTrigger>
            <TabsTrigger value="individual" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-white transition-all duration-300">
              <User className="w-4 h-4" />
              Individual Work
            </TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamProjects.map((project, index) => (
                <div
                  key={project.title}
                  className={`group relative animate-scale-in`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Enhanced card with modern design */}
                  <div className="relative rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col">
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Project image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Status badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                          project.status === "Completed" 
                            ? "bg-green-500/20 text-green-300 border-green-500/30" 
                            : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                        }`}>
                          {project.status}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <div
                            key={tech}
                            className="px-2.5 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium border border-accent/20 hover:bg-accent/20 transition-colors duration-300"
                            style={{ animationDelay: `${techIndex * 0.1}s` }}
                          >
                            {tech}
                          </div>
                        ))}
                      </div>

                      {/* Team info */}
                      <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="font-medium">{project.team.join(", ")}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3 mt-auto">
                        <div className="flex-1 group/btn bg-accent/10 hover:bg-accent border border-accent/20 hover:border-accent text-accent hover:text-white rounded-lg px-4 py-2.5 transition-all duration-300 cursor-pointer text-center">
                          <div className="flex items-center justify-center gap-2 text-sm font-medium">
                            <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                            Demo
                          </div>
                        </div>
                        <div className="flex-1 group/btn bg-primary/10 hover:bg-primary border border-primary/20 hover:border-primary text-primary hover:text-white rounded-lg px-4 py-2.5 transition-all duration-300 cursor-pointer text-center">
                          <div className="flex items-center justify-center gap-2 text-sm font-medium">
                            <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                            Code
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="individual">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {individualProjects.map((project, index) => (
                <div
                  key={project.title}
                  className={`group relative animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Enhanced compact card */}
                  <div className="relative rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col">
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Project image - compact */}
                    <div className="relative overflow-hidden h-40">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Status badge */}
                      <div className="absolute top-3 right-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                          project.status === "Completed" 
                            ? "bg-green-500/20 text-green-300 border-green-500/30" 
                            : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                        }`}>
                          {project.status}
                        </div>
                      </div>
                    </div>

                    {/* Content - compact */}
                    <div className="relative z-10 p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3 flex-grow line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies - compact */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 2).map((tech, techIndex) => (
                          <div
                            key={tech}
                            className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs font-medium border border-accent/20"
                          >
                            {tech}
                          </div>
                        ))}
                        {project.technologies.length > 2 && (
                          <div className="px-2 py-0.5 bg-muted/50 text-muted-foreground rounded text-xs">
                            +{project.technologies.length - 2}
                          </div>
                        )}
                      </div>

                      {/* Author info */}
                      <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                        <User className="w-3 h-3 text-accent" />
                        <span className="font-medium">{project.author}</span>
                      </div>

                      {/* Action buttons - compact */}
                      <div className="flex gap-2 mt-auto">
                        <div className="flex-1 group/btn bg-accent/10 hover:bg-accent border border-accent/20 hover:border-accent text-accent hover:text-white rounded-lg px-3 py-2 transition-all duration-300 cursor-pointer text-center">
                          <div className="flex items-center justify-center gap-1 text-xs font-medium">
                            <ExternalLink className="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-200" />
                            Demo
                          </div>
                        </div>
                        <div className="flex-1 group/btn bg-primary/10 hover:bg-primary border border-primary/20 hover:border-primary text-primary hover:text-white rounded-lg px-3 py-2 transition-all duration-300 cursor-pointer text-center">
                          <div className="flex items-center justify-center gap-1 text-xs font-medium">
                            <Github className="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-200" />
                            Code
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
