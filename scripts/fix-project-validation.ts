import mongoose from 'mongoose'
import Project from '../models/Project'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return
  }
  
  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables')
    }
    
    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}

async function fixProjectValidation() {
  try {
    console.log('🔧 Fixing project validation issues...')
    
    await connectDB()
    
    // Find all projects with invalid status
    const invalidStatusProjects = await Project.find({
      status: { $nin: ['draft', 'planning', 'in-progress', 'completed', 'on-hold'] }
    })
    
    console.log(`Found ${invalidStatusProjects.length} projects with invalid status`)
    
    // Fix invalid status
    for (const project of invalidStatusProjects) {
      const oldStatus = project.status
      let newStatus = 'completed' // default
      
      if (oldStatus === 'review' || oldStatus === 'testing') {
        newStatus = 'completed'
      } else if (oldStatus === 'published') {
        newStatus = 'completed'
      }
      
      console.log(`Fixing project "${project.title}": ${oldStatus} → ${newStatus}`)
      
      await Project.findByIdAndUpdate(project._id, { status: newStatus })
    }
    
    // Find all projects with invalid category
    const invalidCategoryProjects = await Project.find({
      category: { $nin: ['web-development', 'mobile-development', 'ui-ux-design', 'data-science', 'devops', 'other'] }
    })
    
    console.log(`Found ${invalidCategoryProjects.length} projects with invalid category`)
    
    // Fix invalid category
    for (const project of invalidCategoryProjects) {
      const oldCategory = project.category
      let newCategory = 'other' // default
      
      // Map old categories to new ones
      if (oldCategory === 'web' || oldCategory === 'frontend' || oldCategory === 'backend') {
        newCategory = 'web-development'
      } else if (oldCategory === 'mobile' || oldCategory === 'app') {
        newCategory = 'mobile-development'
      } else if (oldCategory === 'design' || oldCategory === 'ui' || oldCategory === 'ux') {
        newCategory = 'ui-ux-design'
      } else if (oldCategory === 'data' || oldCategory === 'ml' || oldCategory === 'ai') {
        newCategory = 'data-science'
      } else if (oldCategory === 'infra' || oldCategory === 'deployment') {
        newCategory = 'devops'
      }
      
      console.log(`Fixing project "${project.title}": ${oldCategory} → ${newCategory}`)
      
      await Project.findByIdAndUpdate(project._id, { category: newCategory })
    }
    
    // Verify all projects are now valid
    const allProjects = await Project.find({})
    console.log(`\n✅ Verification complete. Total projects: ${allProjects.length}`)
    
    const statusBreakdown = allProjects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const categoryBreakdown = allProjects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    console.log('\n📊 Status breakdown:')
    Object.entries(statusBreakdown).forEach(([status, count]) => {
      console.log(`  - ${status}: ${count}`)
    })
    
    console.log('\n📂 Category breakdown:')
    Object.entries(categoryBreakdown).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count}`)
    })
    
    console.log('\n✅ All projects validation fixed!')
    
  } catch (error) {
    console.error('❌ Error fixing project validation:', error)
  } finally {
    process.exit(0)
  }
}

fixProjectValidation()
