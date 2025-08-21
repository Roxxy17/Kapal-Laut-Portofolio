"use client";

import { useState, useEffect } from "react";
import { Calendar, Trophy, Users, Rocket, Star, Target } from "lucide-react";

const timelineData = [
  {
    year: "2019",
    title: "Team Formation",
    description:
      "Three passionate developers came together with a shared vision of creating exceptional digital experiences.",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2020",
    title: "First Major Project",
    description:
      "Launched our first enterprise-level e-commerce platform, serving over 10,000 users within the first month.",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2021",
    title: "Recognition & Growth",
    description:
      'Won "Best Web Development Team" award and expanded our expertise into mobile app development.',
    icon: Trophy,
    color: "from-orange-500 to-red-500",
  },
  {
    year: "2022",
    title: "Innovation Focus",
    description:
      "Pioneered AI-integrated solutions and established partnerships with leading tech companies.",
    icon: Star,
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "2023",
    title: "Market Leadership",
    description:
      "Achieved 75+ successful project deliveries and became a trusted partner for startups and enterprises.",
    icon: Target,
    color: "from-indigo-500 to-purple-500",
  },
];

export default function TimelineSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          if (entry.isIntersecting) {
            // Add to visible items when entering viewport
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          } else {
            // Remove from visible items when leaving viewport
            setVisibleItems((prev) => prev.filter((item) => item !== index));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px", // Add margin to trigger earlier/later
      }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400/10 rounded-full animate-floating" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/10 rounded-lg animate-floating-delayed" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-pink-400/10 rounded-full animate-floating-slow" />
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-cyan-400/10 rounded-lg animate-floating" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow animate-delay-2000" />

        {/* Moving particles */}
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-purple-400/30 rounded-full animate-particle-1" />
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-particle-2" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-particle-3" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Our Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            <span className="inline-block">Timeline</span>{" "}
            <span className="inline-block">of</span>{" "}
            <span className="inline-block">Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From humble beginnings to industry recognition, discover the
            milestones that shaped our journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 rounded-full opacity-30" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleItems.includes(index);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  data-index={index}
                  className={`timeline-item relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ${
                      isLeft ? "md:pr-8" : "md:pl-8"
                    } ${
                      isVisible
                        ? "animate-fade-in-up opacity-100 translate-y-0 scale-100"
                        : "animate-fade-out-down opacity-0 translate-y-8 scale-95"
                    } transition-all duration-700 ease-out`}
                  >
                    <div className="group relative">
                      {/* Card */}
                      <div className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                        {/* Year Badge */}
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-semibold mb-4`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.year}
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>

                      {/* Connector Line */}
                      <div
                        className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r ${
                          item.color
                        } ${
                          isLeft
                            ? "right-0 translate-x-full"
                            : "left-0 -translate-x-full"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Central Icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                        item.color
                      } flex items-center justify-center shadow-lg ${
                        isVisible
                          ? "animate-scale-in opacity-100 scale-100"
                          : "animate-scale-out opacity-0 scale-50"
                      } transition-all duration-500 ease-out`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Pulse Ring */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                        item.color
                      } ${
                        isVisible ? "animate-ping opacity-20" : "opacity-0"
                      } transition-opacity duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer group">
            <span>Continue the Journey</span>
            <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Custom CSS for continuous animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-out-down {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale-out {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.5);
          }
        }

        @keyframes floating {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-3deg);
          }
        }

        @keyframes floating-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }

        @keyframes floating-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(-2deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes particle-1 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes particle-2 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(-30px);
            opacity: 0;
          }
        }

        @keyframes particle-3 {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }

        .animate-fade-out-down {
          animation: fade-out-down 0.7s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        .animate-scale-out {
          animation: scale-out 0.5s ease-out forwards;
        }

        .animate-floating {
          animation: floating 6s ease-in-out infinite;
        }

        .animate-floating-delayed {
          animation: floating-delayed 4s ease-in-out infinite 1s;
        }

        .animate-floating-slow {
          animation: floating-slow 8s ease-in-out infinite 2s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-delay-2000 {
          animation-delay: 2s;
        }

        .animate-particle-1 {
          animation: particle-1 8s linear infinite;
        }

        .animate-particle-2 {
          animation: particle-2 10s linear infinite 3s;
        }

        .animate-particle-3 {
          animation: particle-3 12s linear infinite 6s;
        }
      `}</style>
    </section>
  );
}
