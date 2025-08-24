import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import Project from '@/models/Project'
import User from '@/models/User'
import { logProjectActivity } from '@/lib/activity-logger'

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

// GET /api/projects - Get all projects (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const status = searchParams.get('status') || 'completed'

    let query: any = {}
    
    // Only add status filter if it's not 'all'
    if (status !== 'all') {
      query.status = status
    }
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (featured === 'true') {
      query.featured = true
    }

    const projects = await Project.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      projects
    })

  } catch (error: any) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project (protected)
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    // Verify authentication
    const decoded = await verifyToken(request)
    
    const {
      title,
      description,
      shortDescription,
      category,
      technologies,
      image,
      gallery,
      liveUrl,
      githubUrl,
      featured,
      status
    } = await request.json()

    // Validation
    if (!title || !description || !shortDescription || !category || !technologies || !image) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      )
    }

    // Create project
    const project = await Project.create({
      title,
      description,
      shortDescription,
      category,
      technologies,
      image,
      gallery: gallery || [],
      liveUrl,
      githubUrl,
      featured: featured || false,
      status: status || 'draft',
      createdBy: decoded.userId
    })

    await project.populate('createdBy', 'name email')

    // Log activity
    await logProjectActivity(decoded.userId, 'project_created', title, project._id.toString())

    return NextResponse.json({
      success: true,
      message: 'Project created successfully',
      project
    }, { status: 201 })

  } catch (error: any) {
    console.error('Create project error:', error)
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
