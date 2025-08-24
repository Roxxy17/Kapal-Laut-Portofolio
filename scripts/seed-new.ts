// Load environment variables FIRST
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') })

// Debug: Print loaded environment
console.log('🔍 Starting seed script...')
console.log('MONGODB_URI loaded:', !!process.env.MONGODB_URI)
console.log('MONGODB_URI:', process.env.MONGODB_URI?.substring(0, 50) + '...')

import connectDB from '../lib/mongodb'
import User from '../models/User'
import Project from '../models/Project'
import bcrypt from 'bcryptjs'

async function seedData() {
  try {
    console.log('🚀 Starting seed data process...')
    console.log('📡 Attempting to connect to MongoDB...')
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Clear existing data (optional)
    console.log('🗑️  Clearing existing data...')
    const deletedUsers = await User.deleteMany({})
    const deletedProjects = await Project.deleteMany({})
    console.log(`✅ Deleted ${deletedUsers.deletedCount} users and ${deletedProjects.deletedCount} projects`)

    // Create main team members (Production Users)
    console.log('👥 Creating main team members...')
    console.log('🔐 Hashing passwords...')
    const kalilaathaPassword = await bcrypt.hash('kalilaatha2024', 12)
    const rifqiPassword = await bcrypt.hash('rifqi@2024', 12)
    const nadaPassword = await bcrypt.hash('nada#designer', 12)
    console.log('✅ Passwords hashed')
    
    console.log('👤 Creating users in database...')
    const mainUsers = await User.insertMany([
      {
        name: 'Kalila Atha Achmad',
        email: 'kalilaatha8@gmail.com',
        password: kalilaathaPassword,
        role: 'admin', // Kalilaatha sebagai admin utama
        jobTitle: 'Full Stack & Mobile Developer',
        avatar: '/placeholder-user.jpg',
        skills: ['React Native', 'Node.js', 'MongoDB', 'TypeScript', 'Flutter'],
        projectsCompleted: 15,
        bio: 'Passionate full-stack developer with expertise in mobile and web development.',
        social: {
          github: 'https://github.com/kalilaatha',
          linkedin: 'https://linkedin.com/in/kalilaatha',
          twitter: '#'
        }
      },
      {
        name: 'Rifqi Dani Putranto',
        email: 'rifqidani23@gmail.com',
        password: rifqiPassword,
        role: 'user',
        jobTitle: 'Full Stack & Mobile Developer',
        avatar: '/placeholder-user.jpg',
        skills: ['Flutter', 'React', 'Firebase', 'Python', 'Dart'],
        projectsCompleted: 12,
        bio: 'Mobile-first developer with a passion for creating seamless user experiences.',
        social: {
          github: 'https://github.com/rifqidani',
          linkedin: 'https://linkedin.com/in/rifqidani',
          twitter: '#'
        }
      },
      {
        name: 'Nada Satya Maharani',
        email: 'nadacina@gmail.com',
        password: nadaPassword,
        role: 'user',
        jobTitle: 'Frontend & UI/UX Designer',
        avatar: '/placeholder-user.jpg',
        skills: ['Figma', 'React', 'Design Systems', 'User Research', 'Prototyping'],
        projectsCompleted: 18,
        bio: 'Creative designer focused on user-centered design and beautiful interfaces.',
        social: {
          github: 'https://github.com/nadacina',
          linkedin: 'https://linkedin.com/in/nadacina',
          twitter: '#'
        }
      }
    ])
    console.log(`✅ Created ${mainUsers.length} main team members`)
    console.log(`👑 Main admin: ${mainUsers[0].name}`)

    // Get all users for project assignment
    const kalilaatha = mainUsers[0] // Admin
    const rifqi = mainUsers[1]
    const nada = mainUsers[2]
    
    // Create sample projects
    console.log('📋 Creating sample projects...')
    
    const sampleProjects = [
      // Kalilaatha's Individual Projects (3)
      {
        title: 'E-Learning Mobile App',
        description: 'A comprehensive mobile learning platform built with React Native and Firebase. Features include video streaming, offline content download, progress tracking, quizzes, and real-time chat with instructors. Integrated with payment gateway for course purchases.',
        shortDescription: 'Mobile learning platform with offline capabilities',
        category: 'mobile',
        technologies: ['React Native', 'Firebase', 'Video.js', 'Stripe', 'Redux', 'TypeScript'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://elearning-app.vercel.app',
        githubUrl: 'https://github.com/kalilaatha/elearning-mobile',
        featured: true,
        status: 'published',
        createdBy: kalilaatha._id
      },
      {
        title: 'Smart Home IoT Dashboard',
        description: 'IoT dashboard for smart home automation using Node.js backend and React frontend. Controls lighting, temperature, security cameras, and energy consumption. Real-time data visualization with WebSocket integration.',
        shortDescription: 'IoT dashboard for smart home automation',
        category: 'web',
        technologies: ['React', 'Node.js', 'WebSocket', 'Chart.js', 'MongoDB', 'Arduino'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://smarthome-dashboard.vercel.app',
        githubUrl: 'https://github.com/kalilaatha/smart-home-dashboard',
        featured: true,
        status: 'published',
        createdBy: kalilaatha._id
      },
      {
        title: 'Cryptocurrency Portfolio Tracker',
        description: 'Full-stack crypto portfolio tracking application with real-time price updates, profit/loss calculations, and market analysis. Integrated with multiple exchange APIs for accurate portfolio valuation.',
        shortDescription: 'Real-time crypto portfolio tracker',
        category: 'web',
        technologies: ['Next.js', 'PostgreSQL', 'CoinGecko API', 'Chart.js', 'Tailwind CSS'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://crypto-tracker-kali.vercel.app',
        githubUrl: 'https://github.com/kalilaatha/crypto-portfolio',
        featured: false,
        status: 'published',
        createdBy: kalilaatha._id
      },

      // Rifqi's Individual Projects (3)
      {
        title: 'Food Delivery Flutter App',
        description: 'Complete food delivery application built with Flutter and Firebase. Features restaurant browsing, real-time order tracking, payment integration, rating system, and delivery driver app. Multi-platform support for iOS and Android.',
        shortDescription: 'Multi-platform food delivery application',
        category: 'mobile',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Stripe', 'Provider'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://play.google.com/store/apps/fooddelivery',
        githubUrl: 'https://github.com/rifqidani/food-delivery-flutter',
        featured: true,
        status: 'published',
        createdBy: rifqi._id
      },
      {
        title: 'Personal Finance Manager API',
        description: 'RESTful API for personal finance management with Python Flask and PostgreSQL. Features expense tracking, budget planning, financial goal setting, and detailed analytics. Comprehensive API documentation with Swagger.',
        shortDescription: 'RESTful API for personal finance management',
        category: 'other',
        technologies: ['Python', 'Flask', 'PostgreSQL', 'JWT', 'Swagger', 'Docker'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        githubUrl: 'https://github.com/rifqidani/finance-api',
        featured: false,
        status: 'published',
        createdBy: rifqi._id
      },
      {
        title: 'Real Estate Management System',
        description: 'Comprehensive real estate management platform with property listings, virtual tours, appointment scheduling, and CRM features. Built with React and Node.js with image optimization and SEO.',
        shortDescription: 'Complete real estate management platform',
        category: 'web',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'Socket.io'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://realestate-rifqi.vercel.app',
        githubUrl: 'https://github.com/rifqidani/realestate-management',
        featured: true,
        status: 'published',
        createdBy: rifqi._id
      },

      // Nada's Individual Projects (3)
      {
        title: 'Design System Component Library',
        description: 'Comprehensive design system and React component library with Storybook documentation. Includes 50+ reusable components, design tokens, accessibility features, and theme customization. Published as NPM package.',
        shortDescription: 'Comprehensive React component library',
        category: 'design',
        technologies: ['React', 'Storybook', 'Figma', 'CSS-in-JS', 'TypeScript', 'NPM'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://nada-design-system.netlify.app',
        githubUrl: 'https://github.com/nadacina/design-system',
        featured: true,
        status: 'published',
        createdBy: nada._id
      },
      {
        title: 'UX Research Portfolio Website',
        description: 'Interactive portfolio website showcasing UX research methodologies, case studies, and design thinking process. Features interactive prototypes, user journey visualizations, and responsive design.',
        shortDescription: 'Interactive UX research portfolio',
        category: 'design',
        technologies: ['Figma', 'Framer', 'Adobe XD', 'Principle', 'HTML/CSS', 'JavaScript'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://nada-ux-portfolio.vercel.app',
        githubUrl: 'https://github.com/nadacina/ux-portfolio',
        featured: true,
        status: 'published',
        createdBy: nada._id
      },
      {
        title: 'E-commerce UI/UX Redesign',
        description: 'Complete UI/UX redesign of e-commerce platform focusing on conversion optimization and user experience. Includes user research, wireframing, prototyping, and usability testing results.',
        shortDescription: 'E-commerce platform UI/UX redesign',
        category: 'design',
        technologies: ['Figma', 'Adobe Illustrator', 'Maze', 'Hotjar', 'User Testing', 'Principle'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://ecommerce-redesign-case-study.vercel.app',
        githubUrl: 'https://github.com/nadacina/ecommerce-redesign',
        featured: false,
        status: 'published',
        createdBy: nada._id
      },

      // Team Projects (2)
      {
        title: 'Kapal Laut Team Portfolio',
        description: 'Our comprehensive team portfolio website showcasing our collective skills, projects, and services. Built with Next.js, featuring dark/light theme, responsive design, project filtering, team member profiles, and contact integration.',
        shortDescription: 'Professional team portfolio website',
        category: 'web',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Vercel', 'Framer Motion'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://kapal-laut-portfolio.vercel.app',
        githubUrl: 'https://github.com/kapal-laut-team/portfolio',
        featured: true,
        status: 'published',
        createdBy: kalilaatha._id
      },
      {
        title: 'HealthCare Management System',
        description: 'Comprehensive healthcare management system for clinics and hospitals. Features patient management, appointment scheduling, medical records, billing, and telemedicine integration. Collaborative team effort combining backend, frontend, and UX design.',
        shortDescription: 'Complete healthcare management solution',
        category: 'web',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'JWT', 'Material-UI', 'Docker'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://healthcare-system-demo.vercel.app',
        githubUrl: 'https://github.com/kapal-laut-team/healthcare-system',
        featured: true,
        status: 'published',
        createdBy: kalilaatha._id
      }
    ]

    console.log(`📊 Total projects to create: ${sampleProjects.length}`)
    console.log('📝 Project list:')
    sampleProjects.forEach((project, index) => {
      const author = project.createdBy === kalilaatha._id ? 'Kalilaatha' 
                   : project.createdBy === rifqi._id ? 'Rifqi' 
                   : 'Nada'
      console.log(`   ${index + 1}. ${project.title} (${author}) - ${project.category}`)
    })
    
    try {
      const projects = await Project.insertMany(sampleProjects)
      console.log(`✅ Created ${projects.length} sample projects`)
      console.log(`   - Kalilaatha's projects: 3`)
      console.log(`   - Rifqi's projects: 3`)
      console.log(`   - Nada's projects: 3`)
      console.log(`   - Team projects: 2`)
    } catch (error: any) {
      console.error('❌ Error creating projects:', error.message)
      if (error.writeErrors) {
        console.log('📝 Individual write errors:')
        error.writeErrors.forEach((err: any, index: number) => {
          console.log(`   Project ${index + 1}: ${err.errmsg}`)
        })
      }
      
      // Try to create projects one by one to identify which ones fail
      console.log('🔍 Trying to create projects one by one...')
      const successfulProjects = []
      for (let i = 0; i < sampleProjects.length; i++) {
        try {
          const project = await Project.create(sampleProjects[i])
          successfulProjects.push(project)
          console.log(`✅ Created project ${i + 1}: ${sampleProjects[i].title}`)
        } catch (err: any) {
          console.log(`❌ Failed project ${i + 1}: ${sampleProjects[i].title} - ${err.message}`)
        }
      }
      console.log(`📊 Successfully created ${successfulProjects.length} out of ${sampleProjects.length} projects`)
    }

    console.log('\n🎉 Seed data completed successfully!')
    console.log('\n📋 Login Credentials:')
    console.log('Main Team Members (Production Users):')
    console.log('  Admin: kalilaatha8@gmail.com | Password: kalilaatha2024')
    console.log('  User: rifqidani23@gmail.com | Password: rifqi@2024')
    console.log('  User: nadacina@gmail.com | Password: nada#designer')
    console.log('🔚 Exiting process...')
    
  } catch (error) {
    console.error('❌ Seed data failed:', error)
  } finally {
    process.exit()
  }
}

seedData()
