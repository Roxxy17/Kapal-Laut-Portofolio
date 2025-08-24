// Script untuk menambahkan projects TANPA menghapus data existing
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import Project from '../models/Project'
import User from '../models/User'

interface NewProject {
  title: string
  description: string
  shortDescription: string
  category: string
  technologies: string[]
  image: string
  gallery?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  status?: 'draft' | 'published'
  createdByEmail?: string // Email of the user who created it
}

async function addNewProject(projectData: NewProject) {
  try {
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Find user by email if provided
    let createdBy = null
    if (projectData.createdByEmail) {
      const user = await User.findOne({ email: projectData.createdByEmail })
      if (user) {
        createdBy = user._id
      } else {
        console.log(`⚠️  User with email ${projectData.createdByEmail} not found, using admin`)
        const adminUser = await User.findOne({ role: 'admin' })
        createdBy = adminUser?._id
      }
    } else {
      // Default to admin user
      const adminUser = await User.findOne({ role: 'admin' })
      createdBy = adminUser?._id
    }

    if (!createdBy) {
      console.log('❌ No valid user found to assign as creator')
      return
    }

    // Check if project already exists
    const existingProject = await Project.findOne({ title: projectData.title })
    if (existingProject) {
      console.log(`❌ Project with title "${projectData.title}" already exists`)
      return
    }

    // Create project
    const newProject = await Project.create({
      title: projectData.title,
      description: projectData.description,
      shortDescription: projectData.shortDescription,
      category: projectData.category,
      technologies: projectData.technologies,
      image: projectData.image,
      gallery: projectData.gallery || [],
      liveUrl: projectData.liveUrl,
      githubUrl: projectData.githubUrl,
      featured: projectData.featured || false,
      status: projectData.status || 'published',
      createdBy
    })

    console.log('✅ Project created successfully:')
    console.log(`   Title: ${newProject.title}`)
    console.log(`   Category: ${newProject.category}`)
    console.log(`   Technologies: ${newProject.technologies.join(', ')}`)
    console.log(`   Featured: ${newProject.featured}`)
    console.log(`   ID: ${newProject._id}`)

  } catch (error) {
    console.error('❌ Failed to create project:', error)
  }
}

async function addMultipleProjects() {
  const projects = [
    {
      title: 'AI Chat Assistant',
      description: 'Advanced AI-powered chat assistant with natural language processing, context awareness, and multi-language support.',
      shortDescription: 'AI-powered chat assistant with NLP capabilities',
      category: 'web',
      technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'Prisma', 'PostgreSQL'],
      image: '/placeholder.jpg',
      githubUrl: 'https://github.com/example/ai-chat',
      liveUrl: 'https://ai-chat-demo.vercel.app',
      featured: true,
      createdByEmail: 'kalilaatha8@gmail.com'
    },
    {
      title: 'Fitness Tracker Mobile App',
      description: 'Cross-platform mobile application for fitness tracking with workout plans, nutrition logging, and progress analytics.',
      shortDescription: 'Comprehensive fitness tracking mobile app',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
      image: '/placeholder.jpg',
      githubUrl: 'https://github.com/example/fitness-tracker',
      featured: false,
      createdByEmail: 'rifqidani23@gmail.com'
    },
    {
      title: 'Brand Identity Package',
      description: 'Complete brand identity design package including logo variations, color schemes, typography guidelines, and brand application examples.',
      shortDescription: 'Professional brand identity design package',
      category: 'design',
      technologies: ['Adobe Illustrator', 'Figma', 'Adobe InDesign', 'Brand Strategy'],
      image: '/placeholder.jpg',
      featured: true,
      createdByEmail: 'nadacina@gmail.com'
    }
  ]

  console.log(`🚀 Adding ${projects.length} new projects...`)
  
  for (const project of projects) {
    await addNewProject(project)
  }
  
  console.log('✅ All projects processed!')
  process.exit()
}

// ====== TAMBAHKAN PROJECTS BARU DI SINI ======

// Single project
// addNewProject({
//   title: 'New Amazing Project',
//   description: 'Detailed description...',
//   shortDescription: 'Short desc...',
//   category: 'web',
//   technologies: ['React', 'Node.js'],
//   image: '/placeholder.jpg',
//   createdByEmail: 'kalilaatha8@gmail.com'
// })

// Multiple projects
addMultipleProjects()
