"use client"

import { useState, useEffect, type ReactNode } from "react"
import { SplashScreen } from "./splash-screen"

interface SplashScreenProviderProps {
  children: ReactNode
}

export function SplashScreenProvider({ children }: SplashScreenProviderProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // This ensures splash screen runs every time the page is refreshed
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (!isClient) {
    return null
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && children}
    </>
  )
}
