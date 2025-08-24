import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import Project from '../models/Project'
import User from '../models/User'

const projectsData = [
  {
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features include dark/light mode, smooth animations, and contact form integration.",
    shortDescription: "Modern portfolio website with Next.js",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/placeholder.jpg",
    status: "completed",
    type: "individual",
    isTeamProject: false,
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/portfolio"
  },
  {
    title: "E-commerce Dashboard",
    description: "Comprehensive admin dashboard for managing online store operations with real-time analytics, inventory management, and order processing.",
    shortDescription: "Admin dashboard for e-commerce management",
    category: "web",
    technologies: ["React", "TypeScript", "Chart.js", "Material-UI"],
    image: "/placeholder.jpg",
    status: "completed",
    type: "individual", 
    isTeamProject: false,
    featured: false,
    githubUrl: "https://github.com/user/dashboard"
  },
  {
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication, real-time transaction notifications, and budget tracking features.",
    shortDescription: "Secure mobile banking application",
    category: "mobile",
    technologies: ["React Native", "Redux", "Firebase", "Expo"],
    image: "/placeholder.jpg",
    status: "in progress",
    type: "individual",
    isTeamProject: false,
    featured: true
  },
  {
    title: "Healthcare Management System",
    description: "Collaborative healthcare platform for managing patient records, appointments, and medical history with team members.",
    shortDescription: "Healthcare management platform",
    category: "web",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    image: "/placeholder.jpg",
    status: "in progress",
    type: "team",
    isTeamProject: true,
    featured: false
  },
  {
    title: "AI Chatbot Integration",
    description: "Intelligent chatbot system for customer support with natural language processing and machine learning capabilities.",
    shortDescription: "AI-powered customer support chatbot",
    category: "other",
    technologies: ["Python", "TensorFlow", "FastAPI", "Redis"],
    image: "/placeholder.jpg",
    status: "planning",
    type: "individual",
    isTeamProject: false,
    featured: false
  },
  {
    title: "Social Media Analytics Tool",
    description: "Team project for building comprehensive social media analytics dashboard with real-time data visualization.",
    shortDescription: "Social media analytics dashboard",
    category: "web",
    technologies: ["Angular", "Node.js", "MongoDB", "D3.js"],
    image: "/placeholder.jpg",
    status: "planning",
    type: "team",
    isTeamProject: true,
    featured: true
  },
  {
    title: "Inventory Management System",
    description: "Enterprise-level inventory management system with barcode scanning, automated reordering, and multi-location support.",
    shortDescription: "Enterprise inventory management",
    category: "web",
    technologies: ["Laravel", "MySQL", "Vue.js", "Redis"],
    image: "/placeholder.jpg",
    status: "on hold",
    type: "individual",
    isTeamProject: false,
    featured: false
  },
  {
    title: "Learning Management Platform",
    description: "Collaborative educational platform with video streaming, interactive quizzes, and progress tracking for team-based learning.",
    shortDescription: "Educational learning platform",
    category: "web",
    technologies: ["Django", "PostgreSQL", "React", "AWS"],
    image: "/placeholder.jpg",
    status: "draft",
    type: "team",
    isTeamProject: true,
    featured: false
  }
]

async function seedProjects() {
  try {
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Get all users
    const users = await User.find()
    if (users.length === 0) {
      console.log('❌ No users found. Please seed users first.')
      return
    }

    console.log(`👥 Found ${users.length} users`)

    // Clear existing projects
    await Project.deleteMany({})
    console.log('🗑️ Cleared existing projects')

    // Create projects for each user
    const createdProjects = []

    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      // Each user gets 2-3 projects with different statuses
      const userProjects = projectsData.slice(i * 2, (i * 2) + 2)
      
      for (const projectData of userProjects) {
        const project = await Project.create({
          ...projectData,
          createdBy: user._id
        })
        createdProjects.push(project)
        console.log(`✅ Created "${project.title}" (${project.status}) for ${user.name}`)
      }
    }

    console.log(`🎉 Successfully created ${createdProjects.length} projects`)

    // Show status distribution
    const statusDistribution = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ])
    
    console.log('\n📊 Project Status Distribution:')
    statusDistribution.forEach(item => {
      console.log(`${item._id}: ${item.count} projects`)
    })

    // Show type distribution
    const typeDistribution = await Project.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ])
    
    console.log('\n🔧 Project Type Distribution:')
    typeDistribution.forEach(item => {
      console.log(`${item._id}: ${item.count} projects`)
    })

  } catch (error) {
    console.error('❌ Seed failed:', error)
  } finally {
    process.exit()
  }
}

seedProjects()
