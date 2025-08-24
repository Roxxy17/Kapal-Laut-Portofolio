import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import Project from '../models/Project'

async function updateSomeProjectsToCompleted() {
  try {
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Get all projects
    const projects = await Project.find({})
    console.log(`📋 Found ${projects.length} projects`)

    // Update first 2 projects to completed status
    if (projects.length >= 2) {
      await Project.findByIdAndUpdate(projects[0]._id, { status: 'completed' })
      await Project.findByIdAndUpdate(projects[1]._id, { status: 'completed' })
      
      console.log(`✅ Updated "${projects[0].title}" to completed`)
      console.log(`✅ Updated "${projects[1].title}" to completed`)
    }

    // Update 1 more project to in progress
    if (projects.length >= 3) {
      await Project.findByIdAndUpdate(projects[2]._id, { status: 'in progress' })
      console.log(`🔄 Updated "${projects[2].title}" to in progress`)
    }

    console.log('🎉 Project statuses updated!')

    // Show current status distribution
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

  } catch (error) {
    console.error('❌ Update failed:', error)
  } finally {
    process.exit()
  }
}

updateSomeProjectsToCompleted()
