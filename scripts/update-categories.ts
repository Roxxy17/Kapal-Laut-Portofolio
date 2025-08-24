import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import Project from '../models/Project'

const categoryMapping = {
  'web': 'web-development',
  'mobile': 'mobile-development', 
  'productivity': 'other',
  'portfolio': 'web-development',
  'finance': 'other',
  'communication': 'other',
  'utility': 'other',
  'individual': 'other',
  'team': 'other'
}

async function updateCategories() {
  try {
    console.log('🔄 Connecting to database...')
    await connectDB()
    
    console.log('🔍 Finding projects with old categories...')
    const projects = await Project.find({})
    
    let updatedCount = 0
    
    for (const project of projects) {
      const oldCategory = project.category
      const newCategory = categoryMapping[oldCategory as keyof typeof categoryMapping] || oldCategory
      
      if (oldCategory !== newCategory) {
        console.log(`📝 Updating project "${project.title}": ${oldCategory} → ${newCategory}`)
        await Project.findByIdAndUpdate(project._id, { 
          category: newCategory 
        })
        updatedCount++
      }
    }
    
    console.log(`✅ Updated ${updatedCount} projects`)
    console.log('🔍 Final category check...')
    
    const finalProjects = await Project.find({})
    const categoryCounts = finalProjects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    console.log('📊 Category breakdown:')
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count}`)
    })
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating categories:', error)
    process.exit(1)
  }
}

updateCategories()
