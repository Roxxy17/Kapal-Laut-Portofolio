import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-context"
import { SplashScreenProvider } from "@/components/splash-screen-provider"
import { PageTransition } from "@/components/page-transition"
import { AnimatedBackground } from "@/components/animated-background"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Team Portfolio - Premium Digital Solutions",
  description: "Showcase of our elite team's innovative projects and sophisticated portfolios",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-animated-mesh">
        <div className="floating-orbs">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="floating-orb"
              style={{
                width: `${30 + Math.random() * 50}px`,
                height: `${30 + Math.random() * 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
        <div className="geometric-pattern" />
        <AnimatedBackground />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            <SplashScreenProvider>
              <PageTransition>
                <div className="min-h-screen">{children}</div>
              </PageTransition>
            </SplashScreenProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
