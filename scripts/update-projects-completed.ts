// Script untuk update projectsCompleted berdasarkan jumlah project yang dibuat
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import User from '../models/User'
import Project from '../models/Project'

async function updateProjectsCompleted() {
  try {
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Get all users
    const users = await User.find({})
    console.log(`👥 Found ${users.length} users`)

    for (const user of users) {
      // Count only completed projects created by this user
      const completedProjectCount = await Project.countDocuments({ 
        createdBy: user._id,
        status: { $in: ['completed', 'Completed'] }
      })
      
      // Count total projects for reference
      const totalProjectCount = await Project.countDocuments({ createdBy: user._id })
      
      // Update user's projectsCompleted
      await User.updateOne(
        { _id: user._id },
        { $set: { projectsCompleted: completedProjectCount } }
      )
      
      console.log(`📊 ${user.name}: ${completedProjectCount}/${totalProjectCount} projects completed`)
    }

    console.log('\n✅ All users updated successfully!')

    // Verify results
    console.log('\n📋 Final results:')
    const updatedUsers = await User.find({}, 'name projectsCompleted')
    updatedUsers.forEach(user => {
      console.log(`  - ${user.name}: ${user.projectsCompleted} projects`)
    })

  } catch (error) {
    console.error('❌ Update failed:', error)
  } finally {
    process.exit()
  }
}

updateProjectsCompleted()
