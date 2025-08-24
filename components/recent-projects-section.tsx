"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Eye, Heart, Users, User, ExternalLink, Github } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface Project {
  _id: string
  title: string
  description: string
  shortDescription: string
  category: string
  technologies: string[]
  image?: string
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
}

export function RecentProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Configuration
  const projectsPerSlide = 1 // Changed to show only 1 project per slide
  const totalSlides = Math.ceil(projects.length / projectsPerSlide)

  useEffect(() => {
    fetchRecentProjects()
  }, [])

  const fetchRecentProjects = async () => {
    try {
      const response = await fetch('/api/projects?limit=10&status=completed&sort=createdAt')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || data)
      }
    } catch (error) {
      console.error('Error fetching recent projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
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
        return 'Other'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  // Auto-play functionality
  useEffect(() => {
    if (projects.length > 1) {
      const interval = setInterval(() => {
        nextSlide()
      }, 8000) // Change slide every 8 seconds for better reading time

      return () => clearInterval(interval)
    }
  }, [projects.length, currentSlide])

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Recent Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our latest work and innovations
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Recent Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No projects available at the moment
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Recent Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our latest work and innovations
          </p>
        </div>

        {/* Projects Carousel with extra bottom padding */}
        <div className="relative pb-20">
          {/* Projects Grid */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 flex justify-center">
                  <div className="max-w-6xl w-full px-4">
                    {projects
                      .slice(slideIndex * projectsPerSlide, (slideIndex + 1) * projectsPerSlide)
                      .map((project, index) => (
                        <div
                          key={project._id}
                          className="group relative animate-scale-in mb-12"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Enhanced large card with auto height */}
                          <div className="relative rounded-3xl bg-card/90 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-2xl overflow-hidden">
                            
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Flexible grid layout with equal heights */}
                            <div className="flex flex-col lg:flex-row min-h-[600px]">
                              
                              {/* Project image section - responsive height */}
                              <div className="relative overflow-hidden lg:w-1/2 h-[300px] lg:h-auto lg:min-h-[600px]">
                                <img
                                  src={project.image || "/placeholder.jpg"}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                
                                {/* View Details overlay button on image */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                                  <Link 
                                    href={`/projects/${project._id}`}
                                    className="group/btn bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 hover:border-white/50 text-white rounded-xl px-8 py-4 transition-all duration-300 text-center"
                                  >
                                    <div className="flex items-center justify-center gap-3 text-lg font-semibold">
                                      <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                                      View Project Details
                                    </div>
                                  </Link>
                                </div>
                                
                                {/* Featured and Status badges */}
                                <div className="absolute top-6 right-6 flex flex-col gap-3">
                                  {project.featured && (
                                    <div className="px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm bg-accent/20 text-accent border-accent/30">
                                      ⭐ Featured
                                    </div>
                                  )}
                                  <div className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${getStatusBadgeColor(project.status)}`}>
                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                  </div>
                                </div>
                              </div>

                              {/* Content section with matching height */}
                              <div className="relative z-10 lg:w-1/2 p-8 lg:p-12 pb-16 lg:pb-24 flex flex-col min-h-[300px] lg:min-h-[600px]">
                                
                                {/* Category */}
                                <div className="mb-6">
                                  <Badge variant="outline" className="text-sm px-4 py-2">
                                    {getCategoryDisplayName(project.category)}
                                  </Badge>
                                </div>

                                <h3 className="font-bold text-2xl lg:text-3xl text-foreground mb-6 group-hover:text-accent transition-colors duration-300 leading-tight">
                                  {project.title}
                                </h3>
                                
                                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8">
                                  {project.shortDescription || project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                    <div
                                      key={tech}
                                      className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium border border-accent/20 hover:bg-accent/20 transition-colors duration-200"
                                    >
                                      {tech}
                                    </div>
                                  ))}
                                  {project.technologies.length > 4 && (
                                    <div className="px-3 py-1 bg-muted/50 text-muted-foreground rounded-lg text-sm font-medium">
                                      +{project.technologies.length - 4} more
                                    </div>
                                  )}
                                </div>

                                {/* Spacer to push content to bottom */}
                                <div className="flex-grow"></div>

                                {/* Project stats and author info */}
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <Eye className="w-4 h-4" />
                                      <span className="font-medium">{project.views?.toLocaleString() || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Heart className="w-4 h-4" />
                                      <span className="font-medium">{project.likes?.toLocaleString() || 0}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    {project.type === 'team' ? (
                                      <Users className="w-4 h-4 text-accent" />
                                    ) : (
                                      <User className="w-4 h-4 text-accent" />
                                    )}
                                    <span className="font-medium text-xs lg:text-sm">
                                      by {project.type === 'team' ? 'Kapal Laut Team' : project.createdBy.name}
                                    </span>
                                  </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-3">
                                  {project.liveUrl && (
                                    <a 
                                      href={project.liveUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex-1 group/btn bg-accent/10 hover:bg-accent border border-accent/20 hover:border-accent text-accent hover:text-white rounded-xl px-4 py-3 transition-all duration-300 text-center"
                                    >
                                      <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                                        Live Demo
                                      </div>
                                    </a>
                                  )}
                                  {project.githubUrl && (
                                    <a 
                                      href={project.githubUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex-1 group/btn bg-primary/10 hover:bg-primary border border-primary/20 hover:border-primary text-primary hover:text-white rounded-xl px-4 py-3 transition-all duration-300 text-center"
                                    >
                                      <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                                        <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                                        View Code
                                      </div>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm border-accent/20 hover:border-accent hover:bg-accent hover:text-white z-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm border-accent/20 hover:border-accent hover:bg-accent hover:text-white z-10"
                onClick={nextSlide}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-12 gap-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-accent scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-20">
          <Link 
            href="/projects"
            className="relative z-50 inline-flex items-center justify-center rounded-xl text-lg font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 shadow-lg hover:shadow-xl px-8 py-4"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
