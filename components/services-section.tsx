"use client"

import { useState } from "react"
import { Code, Palette, Smartphone, Globe, Database, Zap } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Full-stack web applications with modern frameworks and scalable architecture",
    features: ["React & Next.js", "Node.js & Express", "Database Design", "API Development"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android",
    features: ["React Native", "Flutter", "iOS Development", "Android Development"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces with exceptional user experience",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    description: "Comprehensive digital solutions to grow your business online",
    features: ["SEO Optimization", "Performance", "Analytics", "Consulting"],
  },
  {
    icon: Database,
    title: "Backend Solutions",
    description: "Robust server-side architecture and database management",
    features: ["API Design", "Database Optimization", "Cloud Services", "Security"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast applications with optimal user experience",
    features: ["Speed Optimization", "Code Splitting", "Caching", "Monitoring"],
  },
]

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background elements matching hero section */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full animate-sophisticated-float blur-2xl" />
      <div className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-l from-primary/8 to-accent/8 animate-liquid-morph blur-xl" />
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-chart-3/10 to-accent/10 animate-sophisticated-float animation-delay-500 rounded-full blur-xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            <span className="inline-block">Our</span>{" "}
            <span className="inline-block">
              Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer comprehensive digital solutions to bring your ideas to life with cutting-edge technology and
            creative excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:scale-105 shadow-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
