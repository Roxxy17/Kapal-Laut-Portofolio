import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import Project from '../models/Project'

async function updatePublishedToCompleted() {
  try {
    console.log('🔄 Connecting to database...')
    await connectDB()
    
    console.log('🔍 Finding projects with "published" status...')
    const publishedProjects = await Project.find({ status: 'published' })
    
    console.log(`📝 Found ${publishedProjects.length} projects with "published" status`)
    
    if (publishedProjects.length > 0) {
      const result = await Project.updateMany(
        { status: 'published' },
        { status: 'completed' }
      )
      
      console.log(`✅ Updated ${result.modifiedCount} projects from "published" to "completed"`)
    } else {
      console.log('ℹ️ No projects with "published" status found')
    }
    
    console.log('🔍 Final status check...')
    const projects = await Project.find({})
    const statusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    console.log('📊 Status breakdown:')
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  - ${status}: ${count}`)
    })
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating status:', error)
    process.exit(1)
  }
}

updatePublishedToCompleted()
