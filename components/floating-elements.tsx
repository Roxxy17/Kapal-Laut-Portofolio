"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full animate-float-up-down" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-accent/15 rotate-45 animate-particle-float" />
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-chart-3/10 animate-morph-blob" />
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary/20 rounded-full animate-wave-motion" />
      <div className="absolute bottom-20 right-10 w-14 h-14 bg-accent/10 rounded-lg animate-float-up-down animation-delay-300" />

      {/* Morphing Blobs */}
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-primary/5 to-accent/5 animate-morph-blob animation-delay-200" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-l from-chart-3/5 to-primary/5 animate-morph-blob animation-delay-500" />

      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-particle-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
