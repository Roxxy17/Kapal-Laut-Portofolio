// Load environment variables FIRST
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') })

// Debug: Print loaded environment
console.log('MONGODB_URI loaded:', !!process.env.MONGODB_URI)
console.log('MONGODB_URI:', process.env.MONGODB_URI?.substring(0, 50) + '...')

import connectDB from '../lib/mongodb'
import User from '../models/User'
import Project from '../models/Project'
import bcrypt from 'bcryptjs'

async function seedData() {
  try {
    await connectDB()
    console.log('Connected to MongoDB')

    // Clear existing data (optional)
    console.log('🗑️  Clearing existing data...')
    const deletedUsers = await User.deleteMany({})
    const deletedProjects = await Project.deleteMany({})
    console.log(`Deleted ${deletedUsers.deletedCount} users and ${deletedProjects.deletedCount} projects`)

    // Create admin user with detailed logging
    console.log('👤 Creating admin user...')
    const hashedPassword = await bcrypt.hash('admin123', 12)
    console.log('🔐 Password hashed successfully')
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@teamportfolio.com',
      password: hashedPassword,
      role: 'admin'
    })
    console.log('✅ Created admin user:', {
      id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role
    })

    // Create demo team members with password 'password'
    console.log('👥 Creating demo team members...')
    const demoPassword = await bcrypt.hash('password', 12)
    
    const demoUsers = await User.insertMany([
      {
        name: 'Alex Rodriguez',
        email: 'alex@teamportfolio.com',
        password: demoPassword,
        role: 'user'
      },
      {
        name: 'Sarah Chen',
        email: 'sarah@teamportfolio.com',
        password: demoPassword,
        role: 'user'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@teamportfolio.com',
        password: demoPassword,
        role: 'user'
      }
    ])
    console.log(`✅ Created ${demoUsers.length} demo users`)

    // Create sample projects
    const sampleProjects = [
      {
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform built with Next.js, MongoDB, and Stripe integration. Features include user authentication, product catalog, shopping cart, order management, and payment processing.',
        shortDescription: 'Modern e-commerce platform with secure payments',
        category: 'web',
        technologies: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS', 'TypeScript'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        liveUrl: 'https://example-ecommerce.vercel.app',
        githubUrl: 'https://github.com/example/ecommerce',
        featured: true,
        status: 'published',
        createdBy: adminUser._id
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
        shortDescription: 'Collaborative task management with real-time updates',
        category: 'web',
        technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Material-UI'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg'],
        liveUrl: 'https://example-tasks.vercel.app',
        githubUrl: 'https://github.com/example/tasks',
        featured: true,
        status: 'published',
        createdBy: adminUser._id
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication, transaction history, bill payments, and account management features.',
        shortDescription: 'Secure mobile banking with biometric authentication',
        category: 'mobile',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT', 'Biometric Auth'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        githubUrl: 'https://github.com/example/banking-app',
        featured: false,
        status: 'published',
        createdBy: adminUser._id
      },
      {
        title: 'Brand Identity Design',
        description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines for a modern tech startup.',
        shortDescription: 'Complete brand identity for tech startup',
        category: 'design',
        technologies: ['Adobe Illustrator', 'Figma', 'Photoshop', 'Brand Strategy'],
        image: '/placeholder.jpg',
        gallery: ['/placeholder.jpg', '/placeholder.svg'],
        featured: false,
        status: 'published',
        createdBy: adminUser._id
      }
    ]

    const projects = await Project.insertMany(sampleProjects)
    console.log(`Created ${projects.length} sample projects`)

    console.log('✅ Seed data completed successfully!')
    console.log('\n📋 Login Credentials:')
    console.log('Admin Account:')
    console.log('  Email: admin@teamportfolio.com')
    console.log('  Password: admin123')
    console.log('\nDemo Team Members:')
    console.log('  Email: alex@teamportfolio.com | Password: password')
    console.log('  Email: sarah@teamportfolio.com | Password: password')
    console.log('  Email: mike@teamportfolio.com | Password: password')
    
  } catch (error) {
    console.error('❌ Seed data failed:', error)
  } finally {
    process.exit()
  }
}

seedData()
