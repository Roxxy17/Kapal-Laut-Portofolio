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
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Slower transition
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background elements matching other sections */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full animate-sophisticated-float blur-2xl" />
      <div className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-l from-primary/8 to-accent/8 animate-liquid-morph blur-xl" />
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-gradient-to-br from-chart-3/10 to-accent/10 animate-sophisticated-float animation-delay-500 rounded-full blur-xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            <span className="inline-block">What</span>{" "}
            <span className="inline-block">Our</span>{" "}
            <span className="inline-block">
              Clients
            </span>{" "}
            <span className="inline-block">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients have to say about working with us and the exceptional results we've delivered together.
          </p>
        </div>

        {/* Enhanced testimonials carousel */}
        <div className="relative max-w-5xl mx-auto mb-8">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-6 mb-8">
                  {/* Clean modern testimonial card */}
                  <div className="relative group max-w-4xl mx-auto">
                    {/* Main card with subtle glass effect */}
                    <div className="relative p-10 md:p-16 rounded-2xl bg-background/80 backdrop-blur-md border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-accent/30">
                      
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-primary/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Content container */}
                      <div className="relative z-10 text-center">
                        
                        {/* Stars at top */}
                        <div className="flex items-center justify-center mb-10 gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                          ))}
                        </div>

                        {/* Main quote */}
                        <blockquote className="text-lg md:text-xl lg:text-2xl text-foreground/90 text-center mb-12 leading-relaxed font-normal max-w-3xl mx-auto">
                          <span className="text-accent/70 text-4xl mr-2">"</span>
                          {testimonial.content}
                          <span className="text-accent/70 text-4xl ml-2">"</span>
                        </blockquote>

                        {/* Project info */}
                        <div className="inline-flex items-center px-5 py-2 bg-accent/8 text-accent rounded-xl text-sm font-medium mb-10 border border-accent/15">
                          Project: {testimonial.project}
                        </div>

                        {/* Client info section */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-border/30">
                          
                          {/* Simple clean avatar */}
                          <div className="relative">
                            <img
                              src={testimonial.image || "/placeholder-user.jpg"}
                              alt={testimonial.name}
                              className="w-16 h-16 rounded-full object-cover border-3 border-background shadow-md"
                            />
                            {/* Subtle ring */}
                            <div className="absolute -inset-1 rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          
                          {/* Client details */}
                          <div className="text-center sm:text-left">
                            <h4 className="font-semibold text-foreground text-lg mb-1">
                              {testimonial.name}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-1">
                              {testimonial.role}
                            </p>
                            <p className="text-accent font-medium text-sm">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple elegant navigation dots */}
          <div className="flex justify-center mt-16 mb-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-accent w-8"
                    : "bg-muted-foreground/40 hover:bg-accent/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Simple call to action */}
        <div className="text-center mt-12 p-8 rounded-xl bg-accent/5 border border-accent/10 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-3">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Join our satisfied clients and let's create something amazing together.
          </p>
          <button className="inline-flex items-center px-6 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </section>
  )
}
