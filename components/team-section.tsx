"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface TeamMember {
  _id: string
  name: string
  email: string
  role: string
  avatar: string
  skills: string[]
  projects: number
  social: {
    github: string
    linkedin: string
    instagram: string
  }
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/team')
        const data = await response.json()
        
        if (data.success) {
          setTeamMembers(data.teamMembers)
        } else {
          setError('Failed to load team members')
        }
      } catch (err) {
        console.error('Error fetching team members:', err)
        setError('Failed to load team members')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  return (
    <section id="team" className="py-24 px-4 relative overflow-hidden">
      {/* Background elements matching hero section */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full animate-sophisticated-float blur-2xl" />
      <div className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-l from-primary/8 to-accent/8 animate-liquid-morph blur-xl" />
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-gradient-to-br from-chart-3/10 to-accent/10 animate-sophisticated-float animation-delay-500 rounded-full blur-xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            <span className="inline-block">Meet</span>{" "}
            <span className="inline-block">Our</span>{" "}
            <span className="inline-block ">
              Team
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the talented individuals of Kapal Laut Team, working together to create exceptional digital experiences with passion and expertise
          </p>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="group relative animate-pulse h-full">
                <div className="relative p-8 rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 h-full flex flex-col">
                  <div className="text-center flex flex-col h-full">
                    <div className="w-28 h-28 rounded-full bg-muted mx-auto mb-6" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-5 bg-muted rounded mb-4" />
                    <div className="flex flex-wrap gap-2 justify-center mb-6 flex-grow">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-6 w-16 bg-muted rounded-full" />
                      ))}
                    </div>
                    <div className="mt-auto">
                      <div className="h-4 bg-muted rounded mb-6" />
                      <div className="flex justify-center space-x-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-10 h-10 rounded-full bg-muted" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member._id}
                className={`group relative animate-scale-in h-full`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Enhanced card with modern design */}
                <div className="relative p-8 rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl h-full flex flex-col">
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating particles around avatar */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-accent/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-8 left-6 w-1 h-1 bg-chart-3/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                  <div className="relative z-10 text-center flex flex-col h-full">
                    {/* Enhanced avatar with orbital ring */}
                    <div className="relative mb-6 inline-block mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-spin-slow scale-110" />
                      <div className="absolute inset-0 rounded-full border border-primary/20 animate-reverse-spin-slow scale-125" />
                      
                      <img
                        src={member.avatar || "/placeholder-user.jpg"}
                        alt={member.name}
                        className="relative w-28 h-28 rounded-full object-cover border-4 border-background group-hover:border-accent/50 transition-all duration-300 shadow-xl z-10"
                      />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                    </div>

                    {/* Enhanced typography */}
                    <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4 text-lg group-hover:text-accent transition-colors duration-300">
                      {member.role}
                    </p>

                    {/* Enhanced skills badges */}
                    <div className="flex flex-wrap gap-2 justify-center mb-6 flex-grow">
                      {member.skills.map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20 hover:bg-accent/20 transition-colors duration-300"
                          style={{ animationDelay: `${skillIndex * 0.1}s` }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>

                    {/* Projects counter with icon - positioned at bottom */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="font-medium">{member.projects} projects completed</span>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      </div>

                      {/* Enhanced social links */}
                      <div className="flex justify-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer group/social"
                          onClick={() => {
                            const url = member.social?.github
                            if (url && url !== '#') {
                              window.open(url, '_blank')
                            }
                          }}
                        >
                          <Github className="w-4 h-4 group-hover/social:scale-110 transition-transform duration-200" />
                        </div>
                        <div 
                          className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group/social"
                          onClick={() => {
                            const url = member.social?.linkedin
                            if (url && url !== '#') {
                              window.open(url, '_blank')
                            }
                          }}
                        >
                          <Linkedin className="w-4 h-4 group-hover/social:scale-110 transition-transform duration-200" />
                        </div>
                        <div 
                          className="w-10 h-10 rounded-full bg-chart-3/10 border border-chart-3/20 flex items-center justify-center hover:bg-chart-3 hover:text-white transition-all duration-300 cursor-pointer group/social"
                          onClick={() => {
                            const url = member.social?.instagram
                            console.log('Instagram URL clicked:', url) // Debug log
                            if (url && url !== '#') {
                              window.open(url, '_blank')
                            } else {
                              console.log('Instagram URL is empty or placeholder')
                            }
                          }}
                        >
                          <Instagram className="w-4 h-4 group-hover/social:scale-110 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Call to action section */}
        <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">Join Our Team</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for creating amazing digital experiences.
          </p>
          <div className="inline-flex items-center px-8 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors duration-300 cursor-pointer hover:scale-105 transform">
            View Open Positions
          </div>
        </div>
      </div>
    </section>
  )
}
