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

    // Check users with enhanced details
    const userCount = await User.countDocuments()
    console.log(`\n👥 Users in database: ${userCount}`)
    
    if (userCount > 0) {
      const users = await User.find({}).populate({
        path: 'completedProjectsCount',
        model: 'Project'
      })
      
      console.log('📋 Users with detailed stats:')
      for (const user of users) {
        // Get user's completed projects count
        const completedCount = await Project.countDocuments({ 
          createdBy: user._id, 
          status: 'completed' 
        })
        
        // Get user's total projects
        const totalProjects = await Project.countDocuments({ 
          createdBy: user._id 
        })
        
        console.log(`  - ${user.name} (${user.email})`)
        console.log(`    Role: ${user.role}`)
        console.log(`    Total Projects: ${totalProjects}`)
        console.log(`    Completed Projects: ${completedCount}`)
        console.log(`    Active: ${user.isActive}`)
        if (user.skills && user.skills.length > 0) {
          console.log(`    Skills: ${user.skills.join(', ')}`)
        }
        console.log('')
      }
    }

    // Check projects with enhanced details
    const projectCount = await Project.countDocuments()
    console.log(`📂 Projects in database: ${projectCount}`)
    
    if (projectCount > 0) {
      const projects = await Project.find({})
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
      
      console.log('📋 Projects with detailed info:')
      projects.forEach(project => {
        console.log(`  📝 ${project.title}`)
        console.log(`     Category: ${project.category || 'Not set'}`)
        console.log(`     Status: ${project.status}`)
        console.log(`     Type: ${project.type}`)
        console.log(`     Created by: ${project.createdBy?.name || 'Unknown'}`)
        console.log(`     Featured: ${project.featured ? 'Yes' : 'No'}`)
        if (project.technologies && project.technologies.length > 0) {
          console.log(`     Technologies: ${project.technologies.join(', ')}`)
        }
        if (project.collaborators && project.collaborators.length > 0) {
          console.log(`     Collaborators: ${project.collaborators.join(', ')}`)
        }
        console.log(`     Views: ${project.views || 0}, Likes: ${project.likes || 0}`)
        console.log(`     Created: ${new Date(project.createdAt).toLocaleDateString()}`)
        console.log('')
      })
      
      // Project statistics by status
      console.log('📊 Project Status Breakdown:')
      const statusCounts = await Project.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ])
      
      statusCounts.forEach(stat => {
        console.log(`  - ${stat._id}: ${stat.count}`)
      })
      
      // Project type breakdown using consistent fields
      console.log('\n🔄 Project Type Breakdown:')
      const typeBreakdown = await Project.aggregate([
        {
          $group: {
            _id: '$type',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ])
      
      typeBreakdown.forEach(stat => {
        console.log(`  - ${stat._id}: ${stat.count}`)
      })
      
      // Featured projects
      const featuredCount = await Project.countDocuments({ featured: true })
      console.log(`\n⭐ Featured projects: ${featuredCount}`)
      
      // Projects by user
      console.log('\n👤 Projects by User:')
      const projectsByUser = await Project.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'creator'
          }
        },
        {
          $unwind: '$creator'
        },
        {
          $group: {
            _id: '$creator.name',
            total: { $sum: 1 },
            completed: {
              $sum: {
                $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
              }
            },
            inProgress: {
              $sum: {
                $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0]
              }
            },
            planning: {
              $sum: {
                $cond: [{ $eq: ['$status', 'planning'] }, 1, 0]
              }
            }
          }
        }
      ])
      
      projectsByUser.forEach(userStat => {
        console.log(`  - ${userStat._id}:`)
        console.log(`    Total: ${userStat.total}`)
        console.log(`    Completed: ${userStat.completed}`)
        console.log(`    In Progress: ${userStat.inProgress}`)
        console.log(`    Planning: ${userStat.planning}`)
      })
    }

    // Check database connection details
    const mongoose = require('mongoose')
    console.log(`\n🗄️  Database Details:`)
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName}`)
    console.log(`🌐 Connection state: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`)
    console.log(`🔗 Host: ${mongoose.connection.host}:${mongoose.connection.port}`)
    
    // List all collections with document counts
    const collections = await mongoose.connection.db?.listCollections().toArray()
    console.log(`\n📁 Collections in database:`)
    for (const collection of collections || []) {
      const count = await mongoose.connection.db?.collection(collection.name).countDocuments()
      console.log(`  - ${collection.name}: ${count} documents`)
    }

    // Check for any data inconsistencies
    console.log('\n🔍 Data Consistency Check:')
    
    // Check for projects without creators
    const orphanedProjects = await Project.countDocuments({ createdBy: { $exists: false } })
    console.log(`❓ Projects without creators: ${orphanedProjects}`)
    
    // Check for projects with invalid status
    const validStatuses = ['planning', 'in-progress', 'review', 'testing', 'completed', 'on-hold']
    const invalidStatusProjects = await Project.countDocuments({ 
      status: { $nin: validStatuses } 
    })
    console.log(`❓ Projects with invalid status: ${invalidStatusProjects}`)
    
    // Check for users without required fields
    const usersWithoutName = await User.countDocuments({ name: { $exists: false } })
    const usersWithoutEmail = await User.countDocuments({ email: { $exists: false } })
    console.log(`❓ Users without name: ${usersWithoutName}`)
    console.log(`❓ Users without email: ${usersWithoutEmail}`)

  } catch (error) {
    console.error('❌ Database check failed:', error)
  } finally {
    process.exit()
  }
}

checkDatabase()
