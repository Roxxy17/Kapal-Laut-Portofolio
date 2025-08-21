"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <div className="fixed inset-0 bg-animated-mesh -z-50" />

      <div className="geometric-pattern" />

      <div className="floating-orbs">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="floating-orb"
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * -15}s`,
              animationDuration: `${10 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 bg-background/30 dark:bg-background/20 -z-30" />
    </>
  )
}
