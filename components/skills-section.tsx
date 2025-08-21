"use client"

import { useState } from "react"
import { FaReact, FaNodeJs, FaDocker, FaAws, FaGit, FaVuejs } from "react-icons/fa"
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiGraphql, SiPython, SiFigma, SiJest } from "react-icons/si"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95, color: "from-blue-500 to-cyan-500", icon: FaReact },
      { name: "Next.js", level: 90, color: "from-gray-600 to-gray-800", icon: SiNextdotjs },
      { name: "TypeScript", level: 88, color: "from-blue-600 to-blue-800", icon: SiTypescript },
      { name: "Tailwind CSS", level: 92, color: "from-teal-500 to-blue-500", icon: SiTailwindcss },
      { name: "Vue.js", level: 85, color: "from-green-500 to-emerald-500", icon: FaVuejs },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90, color: "from-green-600 to-green-800", icon: FaNodeJs },
      { name: "Python", level: 85, color: "from-yellow-500 to-orange-500", icon: SiPython },
      { name: "MongoDB", level: 88, color: "from-green-500 to-green-700", icon: SiMongodb },
      { name: "PostgreSQL", level: 82, color: "from-blue-600 to-indigo-600", icon: SiPostgresql },
      { name: "GraphQL", level: 80, color: "from-pink-500 to-purple-500", icon: SiGraphql },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Docker", level: 85, color: "from-blue-500 to-blue-700", icon: FaDocker },
      { name: "AWS", level: 80, color: "from-orange-500 to-red-500", icon: FaAws },
      { name: "Git", level: 95, color: "from-red-500 to-red-700", icon: FaGit },
      { name: "Figma", level: 88, color: "from-purple-500 to-pink-500", icon: SiFigma },
      { name: "Jest", level: 82, color: "from-red-600 to-red-800", icon: SiJest },
    ],
  },
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Floating decorative shapes & SVG background */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-gradient" x1="0" y1="0" x2="1440" y2="600" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6b7280" />
            <stop offset="0.5" stopColor="#9333ea" />
            <stop offset="1" stopColor="#6b7280" />
          </linearGradient>
        </defs>
        <ellipse cx="720" cy="300" rx="700" ry="250" fill="url(#bg-gradient)" fillOpacity="0.08" />
        <circle cx="200" cy="100" r="60" fill="#9333ea22" />
        <circle cx="1240" cy="500" r="40" fill="#6b728022" />
        <rect x="600" y="50" width="80" height="80" rx="40" fill="#9333ea33" />
      </svg>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            <span className="inline-block">Our</span>{" "}
            <span className="inline-block">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We master the latest technologies and tools to deliver exceptional results for every project.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === index
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                  : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700/70 border border-gray-200/50 dark:border-gray-700/50"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-gray-200/40 dark:border-gray-700/40 shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories[activeCategory].skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={index}
                  className="group flex flex-col gap-3 items-center justify-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden animate-fadein"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Floating glass effect */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-gray-500/10 rounded-full blur-2xl" />
                  <div className="flex items-center gap-4 w-full">
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gray-600 via-purple-600 to-gray-700 shadow-lg group-hover:scale-110 group-hover:shadow-purple-500/30 transition-all duration-300">
                      <Icon className="text-white text-3xl group-hover:drop-shadow-[0_0_8px_#a855f7] transition-all duration-300" />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                  </div>
                  {/* Modern progress bar with smooth animation */}
                  <div className="w-full mt-4 relative">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-600 via-purple-600 to-gray-700 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ 
                          width: `${skill.level}%`,
                          animation: `skillProgress 1.5s ease-out ${index * 0.1}s both`
                        }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                      </div>
                    </div>
                    {/* Floating percentage indicator */}
                    <div 
                      className="absolute -top-8 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-lg text-xs font-bold text-purple-600 dark:text-purple-400 transition-all duration-1000 ease-out border border-gray-200/50 dark:border-gray-700/50"
                      style={{ 
                        left: `calc(${skill.level}% - 20px)`,
                        animation: `floatIndicator 1.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      {skill.level}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes skillProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes floatIndicator {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          50%, 100% {
            transform: translateX(100%);
          }
        }
        .animate-fadein {
          animation: fadein 0.8s cubic-bezier(.4,2,.6,1) both;
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
