"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    company: "TechStart Inc",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Working with this team was an absolute game-changer for our startup. They delivered a stunning web application that exceeded all our expectations.",
    rating: 5,
    project: "E-commerce Platform",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "HealthTech Solutions",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The attention to detail and technical expertise shown throughout our project was remarkable. Our healthcare dashboard is now industry-leading.",
    rating: 5,
    project: "Healthcare Dashboard",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Creative Agency",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "They transformed our vision into reality with incredible design skills and seamless functionality. The results speak for themselves.",
    rating: 5,
    project: "Brand Website",
  },
  {
    name: "David Kim",
    role: "Founder",
    company: "FinTech Startup",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Outstanding work on our mobile app. The user experience is flawless and the performance is exceptional. Highly recommended!",
    rating: 5,
    project: "Mobile Banking App",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const totalSlides = Math.ceil(testimonials.length / 2)
        const currentSlide = Math.floor(prev / 2)
        const nextSlide = (currentSlide + 1) % totalSlides
        return nextSlide * 2
      })
    }, 6000) // Slower transition
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-accent/3 to-primary/3 rounded-full animate-sophisticated-float blur-2xl" />
      <div className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-l from-primary/5 to-accent/5 animate-liquid-morph blur-xl" />
      <div className="absolute top-1/2 left-20 w-20 h-20 bg-gradient-to-br from-chart-3/5 to-accent/5 animate-sophisticated-float animation-delay-500 rounded-full blur-xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            <span className="inline-block">What</span>{" "}
            <span className="inline-block">Our</span>{" "}
            <span className="inline-block">
              Clients
            </span>{" "}
            <span className="inline-block">Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Enhanced testimonials carousel - 2 cards per slide */}
        <div className="relative max-w-7xl mx-auto mb-12">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${Math.floor(currentIndex / 2) * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-4 py-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial, cardIndex) => (
                      <div key={slideIndex * 2 + cardIndex} className="group h-full">
                        {/* Clean and compact testimonial card */}
                        <div className="relative h-full min-h-[400px] p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent/40 flex flex-col">
                          
                          {/* Subtle hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.01] to-primary/[0.01] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Content container with proper spacing */}
                          <div className="relative z-10 flex flex-col h-full">
                            
                            {/* Stars and project info at top */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-0.5">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                ))}
                              </div>
                              <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20">
                                {testimonial.project}
                              </div>
                            </div>

                            {/* Quote content - with proper spacing */}
                            <div className="flex-1 flex flex-col justify-center mb-6">
                              <Quote className="w-5 h-5 text-accent/60 mb-3" />
                              <blockquote className="text-foreground/85 text-sm leading-relaxed">
                                {testimonial.content}
                              </blockquote>
                            </div>

                            {/* Client info section - properly positioned at bottom */}
                            <div className="flex items-center gap-3 pt-6 border-t border-border/50 mt-auto">
                              
                              {/* Avatar */}
                              <div className="relative flex-shrink-0">
                                <img
                                  src={testimonial.image || "/placeholder-user.jpg"}
                                  alt={testimonial.name}
                                  className="w-12 h-12 rounded-full object-cover border border-border/50"
                                />
                                <div className="absolute -inset-0.5 rounded-full border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              
                              {/* Client details - with proper spacing */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-foreground text-sm mb-1 truncate">
                                  {testimonial.name}
                                </h4>
                                <p className="text-muted-foreground text-xs mb-0.5 truncate">
                                  {testimonial.role}
                                </p>
                                <p className="text-accent font-medium text-xs truncate">
                                  {testimonial.company}
                                </p>
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

          {/* Clean navigation dots */}
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 2)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 2) === index
                    ? "bg-accent w-6"
                    : "bg-muted-foreground/30 w-2 hover:bg-accent/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Clean call to action */}
        <div className="text-center mt-8 p-6 rounded-xl bg-accent/5 border border-accent/15 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            Join our satisfied clients and let's create something amazing together.
          </p>
          <button className="inline-flex items-center px-6 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors duration-300 text-sm shadow-sm hover:shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </section>
  )
}
