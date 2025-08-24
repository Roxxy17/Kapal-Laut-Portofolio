// Script untuk update field isTeamProject
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import Project from '../models/Project'

async function updateTeamProjects() {
  try {
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Update projects yang seharusnya team projects
    const teamProjectTitles = [
      'Kapal Laut Team Portfolio',
      'HealthCare Management System'
    ]

    for (const title of teamProjectTitles) {
      const result = await Project.updateOne(
        { title: title },
        { $set: { isTeamProject: true } }
      )
      console.log(`Updated "${title}": ${result.modifiedCount} documents modified`)
    }

    // Set semua project lain sebagai individual
    const result = await Project.updateMany(
      { title: { $nin: teamProjectTitles } },
      { $set: { isTeamProject: false } }
    )
    console.log(`Updated individual projects: ${result.modifiedCount} documents modified`)

    // Verify results
    const teamCount = await Project.countDocuments({ isTeamProject: true })
    const individualCount = await Project.countDocuments({ isTeamProject: false })
    
    console.log('\n📊 Final counts:')
    console.log(`Team projects: ${teamCount}`)
    console.log(`Individual projects: ${individualCount}`)

    // Show team projects
    const teamProjects = await Project.find({ isTeamProject: true }, 'title')
    console.log('\n🏆 Team projects:')
    teamProjects.forEach(p => console.log(`  - ${p.title}`))

  } catch (error) {
    console.error('❌ Update failed:', error)
  } finally {
    process.exit()
  }
}

updateTeamProjects()
