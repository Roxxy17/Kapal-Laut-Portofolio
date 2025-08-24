// Load environment variables FIRST
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import User from '../models/User'
import Project from '../models/Project'
import bcrypt from 'bcryptjs'

async function seedData() {
  try {
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    const deletedUsers = await User.deleteMany({})
    const deletedProjects = await Project.deleteMany({})
    console.log(`Deleted ${deletedUsers.deletedCount} users and ${deletedProjects.deletedCount} projects`)

    // Create passwords
    const kalilaathaPassword = await bcrypt.hash('kalilaatha2024', 12)
    const rifqiPassword = await bcrypt.hash('rifqi@2024', 12)
    const nadaPassword = await bcrypt.hash('nada#designer', 12)
    const teamPassword = await bcrypt.hash('kapallaut2024', 12)
    
    const mainUsers = await User.insertMany([
      {
        name: 'Kalila Atha Achmad',
        email: 'kalilaatha8@gmail.com',
        password: kalilaathaPassword,
        role: 'admin',
        jobTitle: 'Full Stack & Mobile Developer',
        avatar: '/placeholder-user.jpg',
        skills: ['React Native', 'Node.js', 'MongoDB', 'TypeScript', 'Flutter'],
        projectsCompleted: 3,
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
        projectsCompleted: 3,
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
        projectsCompleted: 3,
        bio: 'Creative designer focused on user-centered design and beautiful interfaces.',
        social: {
          github: 'https://github.com/nadacina',
          linkedin: 'https://linkedin.com/in/nadacina',
          twitter: '#'
        }
      },
      {
        name: 'Kapal Laut Team',
        email: 'team@kapallaut.dev',
        password: teamPassword,
        role: 'admin',
        jobTitle: 'Collaborative Development Team',
        avatar: '/placeholder-logo.png',
        skills: ['Full Stack Development', 'Mobile Development', 'UI/UX Design', 'DevOps', 'Project Management'],
        projectsCompleted: 2,
        bio: 'Professional development team specializing in web and mobile applications, UI/UX design, and comprehensive digital solutions.',
        social: {
          github: 'https://github.com/kapal-laut-team',
          linkedin: 'https://linkedin.com/company/kapal-laut',
          twitter: 'https://twitter.com/kapallautteam'
        }
      }
    ])
    
    console.log(`✅ Created ${mainUsers.length} users`)
    console.log('📋 Users created:')
    mainUsers.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`)
    })
    
    // Get users for project assignment
    const kalilaatha = mainUsers[0]
    const rifqi = mainUsers[1]
    const nada = mainUsers[2]
    const kapallautTeam = mainUsers[3]
    
    const sampleProjects = [
      // Kalilaatha's Individual Projects (3)
      {
        title: 'E-Learning Mobile App',
        description: 'A comprehensive mobile learning platform built with React Native and Firebase.',
        shortDescription: 'Mobile learning platform with offline capabilities',
        category: 'mobile',
        technologies: ['React Native', 'Firebase', 'Video.js', 'Stripe', 'Redux', 'TypeScript'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://elearning-app.vercel.app',
        githubUrl: 'https://github.com/kalilaatha/elearning-mobile',
        featured: true,
        status: 'published',
        isTeamProject: false,
        createdBy: kalilaatha._id
      },
      {
        title: 'Smart Home IoT Dashboard',
        description: 'IoT dashboard for smart home automation using Node.js backend and React frontend.',
        shortDescription: 'IoT dashboard for smart home automation',
        category: 'web',
        technologies: ['React', 'Node.js', 'WebSocket', 'Chart.js', 'MongoDB', 'Arduino'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://smarthome-dashboard.vercel.app',
        githubUrl: 'https://github.com/kalilaatha/smart-home-dashboard',
        featured: true,
        status: 'published',
        isTeamProject: false,
        createdBy: kalilaatha._id
      },
      {
        title: 'Cryptocurrency Portfolio Tracker',
        description: 'Full-stack crypto portfolio tracking application with real-time price updates.',
        shortDescription: 'Real-time crypto portfolio tracker',
        category: 'web',
        technologies: ['Next.js', 'PostgreSQL', 'CoinGecko API', 'Chart.js', 'Tailwind CSS'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://crypto-tracker-kali.vercel.app',
        githubUrl: 'https://github.com/kalilaatha/crypto-portfolio',
        featured: false,
        status: 'published',
        isTeamProject: false,
        createdBy: kalilaatha._id
      },

      // Rifqi's Individual Projects (3)
      {
        title: 'Food Delivery Flutter App',
        description: 'Complete food delivery application built with Flutter and Firebase.',
        shortDescription: 'Multi-platform food delivery application',
        category: 'mobile',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Stripe', 'Provider'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://play.google.com/store/apps/fooddelivery',
        githubUrl: 'https://github.com/rifqidani/food-delivery-flutter',
        featured: true,
        status: 'published',
        isTeamProject: false,
        createdBy: rifqi._id
      },
      {
        title: 'Personal Finance Manager API',
        description: 'RESTful API for personal finance management with Python Flask and PostgreSQL.',
        shortDescription: 'RESTful API for personal finance management',
        category: 'other',
        technologies: ['Python', 'Flask', 'PostgreSQL', 'JWT', 'Swagger', 'Docker'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        githubUrl: 'https://github.com/rifqidani/finance-api',
        featured: false,
        status: 'published',
        isTeamProject: false,
        createdBy: rifqi._id
      },
      {
        title: 'Real Estate Management System',
        description: 'Comprehensive real estate management platform with property listings.',
        shortDescription: 'Complete real estate management platform',
        category: 'web',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'Socket.io'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://realestate-rifqi.vercel.app',
        githubUrl: 'https://github.com/rifqidani/realestate-management',
        featured: true,
        status: 'published',
        isTeamProject: false,
        createdBy: rifqi._id
      },

      // Nada's Individual Projects (3)
      {
        title: 'Design System Component Library',
        description: 'Comprehensive design system and React component library with Storybook documentation.',
        shortDescription: 'Comprehensive React component library',
        category: 'design',
        technologies: ['React', 'Storybook', 'Figma', 'CSS-in-JS', 'TypeScript', 'NPM'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://nada-design-system.netlify.app',
        githubUrl: 'https://github.com/nadacina/design-system',
        featured: true,
        status: 'published',
        isTeamProject: false,
        createdBy: nada._id
      },
      {
        title: 'UX Research Portfolio Website',
        description: 'Interactive portfolio website showcasing UX research methodologies.',
        shortDescription: 'Interactive UX research portfolio',
        category: 'design',
        technologies: ['Figma', 'Framer', 'Adobe XD', 'Principle', 'HTML/CSS', 'JavaScript'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://nada-ux-portfolio.vercel.app',
        githubUrl: 'https://github.com/nadacina/ux-portfolio',
        featured: true,
        status: 'published',
        isTeamProject: false,
        createdBy: nada._id
      },
      {
        title: 'E-commerce UI/UX Redesign',
        description: 'Complete UI/UX redesign of e-commerce platform.',
        shortDescription: 'E-commerce platform UI/UX redesign',
        category: 'design',
        technologies: ['Figma', 'Adobe Illustrator', 'Maze', 'Hotjar', 'User Testing', 'Principle'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://ecommerce-redesign-case-study.vercel.app',
        githubUrl: 'https://github.com/nadacina/ecommerce-redesign',
        featured: false,
        status: 'published',
        isTeamProject: false,
        createdBy: nada._id
      },

      // Team Projects (2) - Created by Kapal Laut Team
      {
        title: 'Kapal Laut Team Portfolio',
        description: 'Our comprehensive team portfolio website showcasing our collective skills, projects, and services.',
        shortDescription: 'Professional team portfolio website',
        category: 'web',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Vercel', 'Framer Motion'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://kapal-laut-portfolio.vercel.app',
        githubUrl: 'https://github.com/kapal-laut-team/portfolio',
        featured: true,
        status: 'published',
        isTeamProject: true,
        createdBy: kapallautTeam._id
      },
      {
        title: 'HealthCare Management System',
        description: 'Comprehensive healthcare management system for clinics and hospitals.',
        shortDescription: 'Complete healthcare management solution',
        category: 'web',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'JWT', 'Material-UI', 'Docker'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://healthcare-system-demo.vercel.app',
        githubUrl: 'https://github.com/kapal-laut-team/healthcare-system',
        featured: true,
        status: 'published',
        isTeamProject: true,
        createdBy: kapallautTeam._id
      }
    ]

    const projects = await Project.insertMany(sampleProjects)
    console.log(`✅ Created ${projects.length} projects`)
    
    console.log('\n📊 Project summary:')
    console.log(`   - Kalilaatha's projects: 3`)
    console.log(`   - Rifqi's projects: 3`)
    console.log(`   - Nada's projects: 3`)
    console.log(`   - Kapal Laut Team projects: 2`)

    console.log('\n🎉 Seed data completed successfully!')
    console.log('\n📋 Login Credentials:')
    console.log('  Individual Members:')
    console.log('    Admin: kalilaatha8@gmail.com | Password: kalilaatha2024')
    console.log('    User: rifqidani23@gmail.com | Password: rifqi@2024')
    console.log('    User: nadacina@gmail.com | Password: nada#designer')
    console.log('  Team Account:')
    console.log('    Team: team@kapallaut.dev | Password: kapallaut2024')
    
  } catch (error) {
    console.error('❌ Seed data failed:', error)
  } finally {
    process.exit()
  }
}

seedData()
