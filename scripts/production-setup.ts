// Production setup script untuk populate data di production
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import User from '../models/User'
import Project from '../models/Project'
import Category from '../models/Category'
import bcrypt from 'bcryptjs'

async function setupProduction() {
  try {
    await connectDB()
    console.log('✅ Connected to MongoDB Atlas in production')

    // Check if main admin user already exists (Kalilaatha)
    const existingAdmin = await User.findOne({ email: 'kalilaatha8@gmail.com' })
    
    if (!existingAdmin) {
      console.log('👤 Creating main admin user for production...')
      const hashedPassword = await bcrypt.hash('kalilaatha2024', 12)
      
      const adminUser = await User.create({
        name: 'Kalila Atha Achmad',
        email: 'kalilaatha8@gmail.com',
        password: hashedPassword,
        role: 'admin'
      })
      console.log('✅ Main admin user created for production')
    } else {
      console.log('ℹ️  Main admin user already exists')
    }

    // Check if other team members exist
    const rifqiExists = await User.findOne({ email: 'rifqidani23@gmail.com' })
    const nadaExists = await User.findOne({ email: 'nadacina@gmail.com' })

    if (!rifqiExists) {
      const rifqiPassword = await bcrypt.hash('rifqi@2024', 12)
      await User.create({
        name: 'Rifqi Dani Putranto',
        email: 'rifqidani23@gmail.com',
        password: rifqiPassword,
        role: 'user'
      })
      console.log('✅ Rifqi Dani user created')
    }

    if (!nadaExists) {
      const nadaPassword = await bcrypt.hash('nada#designer', 12)
      await User.create({
        name: 'Nada Satya Maharani',
        email: 'nadacina@gmail.com',
        password: nadaPassword,
        role: 'user'
      })
      console.log('✅ Nada Satya Maharani user created')
    }

    // Check if categories exist
    const categoryCount = await Category.countDocuments()
    if (categoryCount === 0) {
      console.log('📂 Creating categories for production...')
      const categories = await Category.insertMany([
        {
          name: 'Web Development',
          slug: 'web-development',
          description: 'Full-stack web applications and websites',
          color: '#3b82f6',
          icon: 'Globe'
        },
        {
          name: 'Mobile Development',
          slug: 'mobile-development',
          description: 'Native and cross-platform mobile applications',
          color: '#10b981',
          icon: 'Smartphone'
        },
        {
          name: 'Design',
          slug: 'design',
          description: 'UI/UX design, branding, and visual identity',
          color: '#f59e0b',
          icon: 'Palette'
        },
        {
          name: 'API Development',
          slug: 'api-development',
          description: 'Backend services and API integrations',
          color: '#8b5cf6',
          icon: 'Server'
        }
      ])
      console.log(`✅ Created ${categories.length} categories for production`)
    } else {
      console.log(`ℹ️  ${categoryCount} categories already exist`)
    }

    // Get user count and project count for summary
    const userCount = await User.countDocuments()
    const projectCount = await Project.countDocuments()
    
    console.log('\n📊 Production Database Status:')
    console.log(`👥 Users: ${userCount}`)
    console.log(`📂 Categories: ${await Category.countDocuments()}`)
    console.log(`📋 Projects: ${projectCount}`)
    console.log('\n✅ Production setup completed successfully!')
    
  } catch (error) {
    console.error('❌ Production setup failed:', error)
  } finally {
    process.exit()
  }
}

setupProduction()
