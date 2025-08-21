// Load environment variables FIRST
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') })

// Debug: Print environment
console.log('🔍 Environment Check:')
console.log('MONGODB_URI loaded:', !!process.env.MONGODB_URI)
console.log('MONGODB_URI starts with:', process.env.MONGODB_URI?.substring(0, 30) + '...')

import connectDB from '../lib/mongodb'
import User from '../models/User'
import Project from '../models/Project'

async function checkDatabase() {
  try {
    console.log('\n📡 Connecting to MongoDB...')
    await connectDB()
    console.log('✅ Connected to MongoDB successfully')

    // Check users
    const userCount = await User.countDocuments()
    console.log(`👥 Users in database: ${userCount}`)
    
    if (userCount > 0) {
      const users = await User.find({}, 'name email role createdAt')
      console.log('📋 Users:')
      users.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`)
      })
    }

    // Check projects
    const projectCount = await Project.countDocuments()
    console.log(`\n📂 Projects in database: ${projectCount}`)
    
    if (projectCount > 0) {
      const projects = await Project.find({}, 'title category status createdAt')
      console.log('📋 Projects:')
      projects.forEach(project => {
        console.log(`  - ${project.title} (${project.category}) - Status: ${project.status}`)
      })
    }

    // Check database connection details
    const mongoose = require('mongoose')
    console.log(`\n🗄️  Connected to database: ${mongoose.connection.db?.databaseName}`)
    console.log(`🌐 Connection state: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`)
    
    // List all collections
    const collections = await mongoose.connection.db?.listCollections().toArray()
    console.log(`📁 Collections in database:`, collections?.map(c => c.name))

  } catch (error) {
    console.error('❌ Database check failed:', error)
  } finally {
    process.exit()
  }
}

checkDatabase()
