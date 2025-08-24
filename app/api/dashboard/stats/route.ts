import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import Project from '@/models/Project'
import User from '@/models/User'

// Helper function to verify JWT token
async function verifyToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    throw new Error('No token provided')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// GET /api/dashboard/stats - Get dashboard statistics for logged-in user
export async function GET(request: NextRequest) {
  try {
    // Verify token
    const decoded = await verifyToken(request)
    await connectDB()

    // Get user
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get all projects (all statuses, not just published)
    const allProjects = await Project.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    // Get user's individual projects (created by this user)
    const userIndividualProjects = allProjects.filter(project => 
      project.createdBy._id.toString() === user._id.toString() && 
      (project.type === 'individual' || !project.isTeamProject)
    )
    
    // Get team projects (either created by user or where user is collaborator)
    const teamProjects = allProjects.filter(project => 
      project.type === 'team' || project.isTeamProject ||
      (project.collaborators && project.collaborators.some((collab: any) => 
        collab.toString() === user._id.toString()
      ))
    )
    
    // User projects = individual projects by user + team projects
    const userProjects = [...userIndividualProjects, ...teamProjects]

    // Calculate monthly growth (mock calculation based on project creation dates)
    const currentDate = new Date()
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    
    const lastMonthProjects = userProjects.filter(p => {
      const createdDate = new Date(p.createdAt)
      return createdDate >= lastMonth && createdDate < currentMonth
    }).length
    
    const currentMonthProjects = userProjects.filter(p => {
      const createdDate = new Date(p.createdAt)
      return createdDate >= currentMonth
    }).length
    
    // Calculate growth percentage
    let growthPercentage = 0
    if (lastMonthProjects > 0) {
      growthPercentage = Math.round(((currentMonthProjects - lastMonthProjects) / lastMonthProjects) * 100)
    } else if (currentMonthProjects > 0) {
      growthPercentage = 100 // 100% growth if no projects last month but have projects this month
    }

    // Calculate additional stats
    const featuredProjects = userProjects.filter(p => p.featured).length
    const categoriesCount = [...new Set(userProjects.map(p => p.category))].length
    const technologiesCount = [...new Set(userProjects.flatMap(p => p.technologies))].length
    
    // Calculate projects by status for the user
    const userProjectsByStatus = userProjects.reduce((acc: any, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1
      return acc
    }, {})
    
    // Calculate completed projects for the user
    const userCompletedProjects = userProjects.filter(p => 
      p.status === 'completed' || p.status === 'Completed'
    ).length
    
    // Calculate in progress projects
    const userInProgressProjects = userProjects.filter(p => 
      p.status === 'in progress' || p.status === 'In Progress'
    ).length
    
    // Calculate planning projects
    const userPlanningProjects = userProjects.filter(p => 
      p.status === 'planning' || p.status === 'Planning'
    ).length
    
    // Update user's projectsCompleted field if needed
    if (user.projectsCompleted !== userCompletedProjects) {
      await User.findByIdAndUpdate(user._id, {
        projectsCompleted: userCompletedProjects
      })
    }
    
    // Mock views calculation (in real app, this would come from analytics)
    const totalViews = userProjects.reduce((sum, project) => {
      // Mock view count based on project age and type
      const daysSinceCreated = Math.floor((Date.now() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24))
      const baseViews = project.featured ? 150 : 50
      const ageMultiplier = Math.max(1, Math.floor(daysSinceCreated / 30)) // More views for older projects
      return sum + (baseViews * ageMultiplier)
    }, 0)

    // Calculate statistics
    const stats = {
      totalProjects: allProjects.length,
      userProjects: userProjects.length,
      userIndividualProjects: userIndividualProjects.length,
      teamProjects: teamProjects.length,
      individualProjects: allProjects.filter(p => !p.isTeamProject).length, // All individual projects in system
      recentProjects: userProjects.slice(0, 3), // User's recent projects
      featuredProjects,
      categoriesCount,
      technologiesCount,
      projectsByCategory: userProjects.reduce((acc: any, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1
        return acc
      }, {}),
      projectsByStatus: userProjectsByStatus,
      completedProjects: userCompletedProjects, // Real completed projects count
      inProgressProjects: userInProgressProjects,
      planningProjects: userPlanningProjects,
      growthPercentage,
      totalViews,
      // Additional stats
      completionRate: Math.round((userProjects.filter(p => p.status === 'published').length / Math.max(userProjects.length, 1)) * 100),
      averageProjectAge: userProjects.length > 0 ? Math.round(
        userProjects.reduce((sum, p) => {
          const days = Math.floor((Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24))
          return sum + days
        }, 0) / userProjects.length
      ) : 0
    }

    return NextResponse.json({
      success: true,
      stats,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        projectsCompleted: user.projectsCompleted
      }
    })

  } catch (error: any) {
    console.error('Dashboard stats error:', error)
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
