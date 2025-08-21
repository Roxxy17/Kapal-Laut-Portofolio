"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-iridescent"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center space-y-8">
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-xl border border-white/30"></div>
            <div className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-white/40 to-white/20 animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-white font-serif">Team Portfolio</h1>
          <p className="text-white/80 text-lg">Creative Digital Solutions</p>
        </motion.div>

        <motion.div
          className="w-64 mx-auto"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-white/60 to-white/40 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-white/60 text-sm mt-2">{progress}%</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
