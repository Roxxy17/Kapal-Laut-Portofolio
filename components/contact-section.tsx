"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background elements matching other sections */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full animate-sophisticated-float blur-2xl" />
      <div className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-l from-primary/8 to-accent/8 animate-liquid-morph blur-xl" />
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-gradient-to-br from-chart-3/10 to-accent/10 animate-sophisticated-float animation-delay-500 rounded-full blur-xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            <span className="inline-block">Get</span>{" "}
            <span className="inline-block">In</span>{" "}
            <span className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-morphing-gradient">
              Touch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Contact Kapal Laut Team and let's collaborate to create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info with modern design */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-background/80 backdrop-blur-md border border-border/40 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Let's Start Something Great</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We're passionate about bringing your vision to life. Whether you're a startup looking to make your mark 
                or an established business ready to innovate, we're here to help you succeed.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground">hello@teamportfolio.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Call Us</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-chart-3/10 rounded-xl flex items-center justify-center group-hover:bg-chart-3/20 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-chart-3" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Visit Us</h4>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional info card */}
            <div className="p-6 rounded-xl bg-accent/5 border border-accent/10">
              <h4 className="font-semibold text-foreground mb-3">Quick Response</h4>
              <p className="text-sm text-muted-foreground">
                We typically respond to all inquiries within 24 hours. For urgent matters, feel free to call us directly.
              </p>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="p-8 rounded-2xl bg-background/80 backdrop-blur-md border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">Send us a message</h3>
              <p className="text-muted-foreground">Fill out the form below and we'll get back to you soon.</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First Name *
                  </label>
                  <Input id="firstName" placeholder="John" className="bg-background/50 border-border/50 focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last Name *
                  </label>
                  <Input id="lastName" placeholder="Doe" className="bg-background/50 border-border/50 focus:border-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address *
                </label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50 border-border/50 focus:border-accent" />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject *
                </label>
                <Input id="subject" placeholder="Project Collaboration" className="bg-background/50 border-border/50 focus:border-accent" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message *
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your project, goals, and how we can help you achieve them..." 
                  className="min-h-[140px] bg-background/50 border-border/50 focus:border-accent resize-none" 
                />
              </div>

              <Button className="w-full group bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
