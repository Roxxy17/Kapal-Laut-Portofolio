import dotenv from 'dotenv'
import path from 'path'
import connectDB from '../lib/mongodb'
import Project from '../models/Project'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function cleanupProjectDatabase() {
  console.log('🧹 Starting database cleanup...')
  
  try {
    // Connect to database
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Get all projects
    const projects = await Project.find({})
    console.log(`📂 Found ${projects.length} projects to process`)

    let updatedCount = 0
    
    for (const project of projects) {
      let needsUpdate = false
      const updates: any = {}

      // Ensure type and isTeamProject are consistent
      if (project.type === 'team' && !project.isTeamProject) {
        updates.isTeamProject = true
        needsUpdate = true
        console.log(`🔄 Fixing ${project.title}: Setting isTeamProject to true (type is team)`)
      } else if (project.type === 'individual' && project.isTeamProject) {
        updates.isTeamProject = false
        needsUpdate = true
        console.log(`🔄 Fixing ${project.title}: Setting isTeamProject to false (type is individual)`)
      } else if (!project.type && project.isTeamProject) {
        updates.type = 'team'
        needsUpdate = true
        console.log(`🔄 Fixing ${project.title}: Setting type to team (isTeamProject is true)`)
      } else if (!project.type && !project.isTeamProject) {
        updates.type = 'individual'
        needsUpdate = true
        console.log(`🔄 Fixing ${project.title}: Setting type to individual (isTeamProject is false)`)
      }

      // Fix category field if it's using the old values
      if (project.category === 'team' || project.category === 'individual') {
        // Map team/individual category to appropriate technical category
        if (project.category === 'team') {
          updates.category = 'web' // Default for team projects
          updates.type = 'team'
          updates.isTeamProject = true
        } else {
          updates.category = 'web' // Default for individual projects  
          updates.type = 'individual'
          updates.isTeamProject = false
        }
        needsUpdate = true
        console.log(`🔄 Fixing ${project.title}: Moving category from ${project.category} to ${updates.category}`)
      }

      // Apply updates if needed
      if (needsUpdate) {
        await Project.findByIdAndUpdate(project._id, updates)
        updatedCount++
      }
    }

    console.log(`\n✅ Database cleanup completed!`)
    console.log(`📊 Updated ${updatedCount} projects`)

    // Verify the results
    console.log('\n🔍 Verification:')
    const teamProjects = await Project.countDocuments({ type: 'team', isTeamProject: true })
    const individualProjects = await Project.countDocuments({ type: 'individual', isTeamProject: false })
    const inconsistentProjects = await Project.countDocuments({
      $or: [
        { type: 'team', isTeamProject: false },
        { type: 'individual', isTeamProject: true }
      ]
    })

    console.log(`👥 Team projects: ${teamProjects}`)
    console.log(`👤 Individual projects: ${individualProjects}`)
    console.log(`❌ Inconsistent projects: ${inconsistentProjects}`)

    if (inconsistentProjects === 0) {
      console.log('🎉 All projects are now consistent!')
    } else {
      console.log('⚠️  Some projects still have inconsistencies.')
    }

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }

  process.exit(0)
}

cleanupProjectDatabase()
