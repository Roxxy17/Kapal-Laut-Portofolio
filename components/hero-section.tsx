"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Palette, Sparkles, Rocket, Heart, Zap, Star, Globe } from "lucide-react"
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiTailwindcss,
  SiPython,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiVuedotjs,
  SiAngular,
  SiExpress
} from "react-icons/si"
import { useEffect, useState } from "react"
import { ScrollAnimation } from "@/components/scroll-animation"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIconIndex, setCurrentIconIndex] = useState(0)
  const [typewriterText, setTypewriterText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [orbitTime, setOrbitTime] = useState(0)

  const floatingIcons = [
    { icon: SiReact, color: "text-blue-400", label: "React" },
    { icon: SiNextdotjs, color: "text-gray-800 dark:text-white", label: "Next.js" },
    { icon: SiTypescript, color: "text-blue-600", label: "TypeScript" },
    { icon: SiJavascript, color: "text-yellow-500", label: "JavaScript" },
    { icon: SiNodedotjs, color: "text-green-600", label: "Node.js" },
    { icon: SiTailwindcss, color: "text-cyan-500", label: "Tailwind CSS" },
    { icon: SiPython, color: "text-blue-500", label: "Python" },
    { icon: SiMongodb, color: "text-green-500", label: "MongoDB" },
    { icon: SiGit, color: "text-orange-600", label: "Git" },
    { icon: SiDocker, color: "text-blue-500", label: "Docker" },
    { icon: SiFigma, color: "text-purple-500", label: "Figma" },
    { icon: SiHtml5, color: "text-orange-500", label: "HTML5" },
    { icon: SiCss3, color: "text-blue-600", label: "CSS3" },
    { icon: SiVuedotjs, color: "text-green-500", label: "Vue.js" },
    { icon: SiAngular, color: "text-red-600", label: "Angular" },
    { icon: SiExpress, color: "text-gray-600", label: "Express" },
  ]

  const typewriterTexts = [
    "Digital Excellence",
    "Amazing Websites",
    "Mobile Apps",
    "Creative Solutions",
    "Modern Designs"
  ]

  useEffect(() => {
    setIsVisible(true)

    const iconTimer = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % floatingIcons.length)
    }, 2000)

    // Timer untuk tracking orbit position dengan rotasi yang lebih smooth dan teratur
    const orbitTimer = setInterval(() => {
      setOrbitTime(prev => (prev + 0.01) % (Math.PI * 2)) // Slower, more controlled rotation
    }, 50)

    return () => {
      clearInterval(iconTimer)
      clearInterval(orbitTimer)
    }
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const typeWriter = () => {
      const currentText = typewriterTexts[currentTextIndex]

      if (!isDeleting) {
        // Typing phase
        if (typewriterText.length < currentText.length) {
          timeoutId = setTimeout(() => {
            setTypewriterText(prev => currentText.slice(0, prev.length + 1))
          }, 100)
        } else {
          // Pause before deleting
          timeoutId = setTimeout(() => {
            setIsDeleting(true)
          }, 2000)
        }
      } else {
        // Deleting phase
        if (typewriterText.length > 0) {
          timeoutId = setTimeout(() => {
            setTypewriterText(prev => prev.slice(0, -1))
          }, 50)
        } else {
          // Move to next text
          timeoutId = setTimeout(() => {
            setIsDeleting(false)
            setCurrentTextIndex(prev => (prev + 1) % typewriterTexts.length)
          }, 500)
        }
      }
    }

    typeWriter()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [typewriterText, isDeleting, currentTextIndex])

  const CurrentIcon = floatingIcons[currentIconIndex].icon

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-background/5 backdrop-blur-[0.5px]" />

      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full animate-sophisticated-float blur-2xl" />
      <div className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-l from-primary/8 to-accent/8 animate-liquid-morph blur-xl" />
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-muted/20 animate-subtle-rotate rounded-lg rotate-45" />
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-chart-3/10 to-accent/10 animate-sophisticated-float animation-delay-500 rounded-full blur-xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Text Content */}
          <div className={`space-y-10 ${isVisible ? "animate-elegant-fade-up" : "opacity-0"}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-accent/10 text-accent rounded-full text-sm font-medium animate-gentle-scale animation-delay-300 hover-magnetic cursor-pointer border border-accent/20">
                <Sparkles className="w-4 h-4 mr-2 animate-subtle-rotate" />
                Premium Digital Solutions
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                <span className="inline-block animate-elegant-fade-up">We</span>{" "}
                <span className="inline-block animate-elegant-fade-up animation-delay-100 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-morphing-gradient">
                  Craft
                </span>
                <span className="text-primary flex min-h-[1.2em] items-center animate-elegant-fade-up animation-delay-200">
                  <span className="text-4xl md:text-6xl font-bold text-foreground">
                    {typewriterText}
                    <span className="animate-pulse text-accent">|</span>
                  </span>
                </span>
                <span className="inline-block animate-elegant-fade-up animation-delay-300">Together</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl animate-text-reveal animation-delay-500">
                An elite team of designers and developers crafting sophisticated digital experiences. Collaborate on
                groundbreaking projects and elevate your creative potential.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 animate-text-reveal animation-delay-700">
              <Button
                size="lg"
                className="group hover-lift hover-magnetic relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4"
              >
                <span className="relative z-10 flex items-center font-medium">
                  Explore Our Work
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="hover-scale hover-glow bg-transparent group border-2 border-accent/20 hover:border-accent/40 px-8 py-4"
              >
                <Heart className="w-5 h-5 mr-2 group-hover:text-accent transition-colors" />
                <span className="font-medium">Join Our Team</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Large Icon Animation */}
          <div
            className={`flex justify-center items-center ${isVisible ? "animate-smooth-slide-in animation-delay-200" : "opacity-0"}`}
          >
            <div className="relative">
              {/* Main central circle with enhanced effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl animate-premium-glow scale-150" />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse scale-125" />
              
              <div className="relative w-80 h-80 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full flex items-center justify-center border-4 border-accent/30 animate-sophisticated-float shadow-2xl backdrop-blur-sm hover:scale-105 transition-all duration-700 group z-20">
                <div className="absolute inset-2 rounded-full border border-primary/20 animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border border-accent/20 animate-reverse-spin-slow" />
                <CurrentIcon
                  className={`w-32 h-32 ${floatingIcons[currentIconIndex].color} animate-gentle-scale transition-all duration-500 drop-shadow-2xl group-hover:scale-110 transform-gpu z-30`}
                />
                
                {/* Orbiting particles around main icon with faster motion */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`orbit-${i}`}
                    className="absolute w-3 h-3 bg-accent/70 rounded-full animate-orbit-around z-25"
                    style={{
                      animationDelay: `${i * 1}s`, // Faster sequence
                      animationDuration: '4s' // Faster orbit
                    }}
                  />
                ))}
              </div>

              {/* Enhanced floating icons with organized orbital system */}
              {floatingIcons.map((item, index) => {
                const Icon = item.icon
                
                // Organized spacing system - equal distribution
                const totalIcons = floatingIcons.length
                const angleStep = (360 / totalIcons) * (Math.PI / 180)
                const baseAngle = index * angleStep
                
                // Faster orbital motion with slight variations per icon
                const baseSpeed = 0.8 // Much faster base speed
                const speedVariation = 1 + (index % 3) * 0.3 // Different speeds: 1x, 1.3x, 1.6x
                const orbitSpeed = baseSpeed * speedVariation
                const currentAngle = baseAngle + (orbitTime * orbitSpeed)
                
                // Dynamic radius with breathing effect
                const baseRadius = 180
                const breathingEffect = 1 + Math.sin(orbitTime * 2 + index) * 0.15 // Radius varies ±15%
                const radius = baseRadius * breathingEffect
                
                // Position calculation
                const x = Math.cos(currentAngle) * radius
                const y = Math.sin(currentAngle) * radius
                
                // Enhanced depth with more dramatic effect
                const depth = Math.cos(currentAngle + index * 0.5)
                const isInFront = depth > 0
                const depthScale = 0.7 + Math.abs(depth) * 0.3 // Scale from 0.7 to 1.0
                
                // Dynamic rotation for each icon
                const iconRotation = (orbitTime * 50 * speedVariation) % 360
                
                return (
                  <div
                    key={`floating-${index}`}
                    className="absolute group cursor-pointer z-20"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) scale(${depthScale})`,
                      zIndex: isInFront ? 30 : 10,
                    }}
                  >
                    {/* Just the icon without background */}
                    <Icon className={`w-12 h-12 ${item.color} transition-all duration-300 transform-gpu hover:scale-125 drop-shadow-lg`} 
                          style={{ 
                            opacity: isInFront ? 1 : 0.7,
                            transform: `rotate(${iconRotation * 0.3}deg)`, // Slower icon rotation
                            filter: `drop-shadow(0 0 8px ${item.color.includes('yellow') ? '#facc15' : item.color.includes('blue') ? '#3b82f6' : item.color.includes('green') ? '#10b981' : item.color.includes('red') ? '#ef4444' : item.color.includes('purple') ? '#8b5cf6' : item.color.includes('orange') ? '#f97316' : 'rgba(255,255,255,0.3)'})`,
                          }} />
                  </div>
                )
              })}

              {/* Faster outer ring particles with multiple layers */}
              {Array.from({ length: 12 }).map((_, i) => {
                const layerIndex = Math.floor(i / 4) // 3 layers of 4 particles each
                const particleIndex = i % 4
                
                const angleStep = (360 / 4) * (Math.PI / 180)
                const baseAngle = particleIndex * angleStep
                const layerSpeed = 1.2 + layerIndex * 0.4 // Different speeds per layer
                const currentAngle = baseAngle + (orbitTime * layerSpeed)
                
                const baseRadius = 280 + layerIndex * 30 // Different radius per layer
                const radius = baseRadius + Math.sin(orbitTime * 3 + i) * 20 // Pulsing effect
                
                const x = Math.cos(currentAngle) * radius
                const y = Math.sin(currentAngle) * radius
                
                return (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-accent/50 rounded-full animate-pulse"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${1.5 + (i % 3) * 0.5}s`,
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-border/50 animate-text-reveal animation-delay-1000">
            <ScrollAnimation className="text-center group hover-magnetic cursor-pointer">
              <div className="text-3xl font-bold text-primary animate-gentle-scale group-hover:animate-premium-glow">
                75+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Projects Delivered</div>
            </ScrollAnimation>
            <ScrollAnimation className="text-center group hover-magnetic cursor-pointer">
              <div className="text-3xl font-bold text-primary animate-gentle-scale animation-delay-200 group-hover:animate-premium-glow">
                15
              </div>
              <div className="text-sm text-muted-foreground font-medium">Team Members</div>
            </ScrollAnimation>
            <ScrollAnimation className="text-center group hover-magnetic cursor-pointer">
              <div className="text-3xl font-bold text-primary animate-gentle-scale animation-delay-400 group-hover:animate-premium-glow">
                5
              </div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
            </ScrollAnimation>
          </div>

          {/* Services Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-morphism rounded-2xl p-8 hover-lift hover-glow transition-all duration-500 animate-sophisticated-float cursor-pointer group border border-border/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center hover-rotate group-hover:bg-primary/20 transition-all duration-300">
                  <Code className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-xl group-hover:text-primary transition-colors">Development</h3>
                  <p className="text-muted-foreground mt-2">Full-stack web applications with modern architecture</p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-primary/20 rounded-full animate-premium-glow"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-8 hover-lift hover-glow transition-all duration-500 animate-sophisticated-float animation-delay-200 cursor-pointer group border border-border/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center hover-rotate group-hover:bg-accent/20 transition-all duration-300">
                  <Palette className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-xl group-hover:text-accent transition-colors">Design</h3>
                  <p className="text-muted-foreground mt-2">Beautiful user experiences with attention to detail</p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-accent/20 rounded-full animate-premium-glow"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-8 hover-lift hover-glow transition-all duration-500 animate-sophisticated-float animation-delay-400 cursor-pointer group border border-border/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-chart-3/10 rounded-2xl flex items-center justify-center hover-rotate group-hover:bg-chart-3/20 transition-all duration-300">
                  <Rocket className="w-8 h-8 text-chart-3 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-xl group-hover:text-chart-3 transition-colors">Innovation</h3>
                  <p className="text-muted-foreground mt-2">Cutting-edge solutions for tomorrow's challenges</p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-chart-3/20 rounded-full animate-premium-glow"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-8 hover-lift hover-glow transition-all duration-500 animate-sophisticated-float animation-delay-600 cursor-pointer group border border-border/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center hover-rotate group-hover:bg-green-500/20 transition-all duration-300">
                  <Globe className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-xl group-hover:text-green-500 transition-colors">Global</h3>
                  <p className="text-muted-foreground mt-2">Worldwide solutions for international markets</p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-green-500/20 rounded-full animate-premium-glow"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-8 hover-lift hover-glow transition-all duration-500 animate-sophisticated-float animation-delay-800 cursor-pointer group border border-border/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center hover-rotate group-hover:bg-yellow-500/20 transition-all duration-300">
                  <Zap className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-xl group-hover:text-yellow-500 transition-colors">Performance</h3>
                  <p className="text-muted-foreground mt-2">Lightning-fast applications with optimal speed</p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-yellow-500/20 rounded-full animate-premium-glow"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-8 hover-lift hover-glow transition-all duration-500 animate-sophisticated-float animation-delay-1000 cursor-pointer group border border-border/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center hover-rotate group-hover:bg-pink-500/20 transition-all duration-300">
                  <Star className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-xl group-hover:text-pink-500 transition-colors">Excellence</h3>
                  <p className="text-muted-foreground mt-2">Premium quality with exceptional standards</p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-pink-500/20 rounded-full animate-premium-glow"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
