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

// GET /api/projects/[id] - Get specific project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await params
    const project = await Project.findById(id)
      .populate('createdBy', 'name email avatar')
      .populate('collaborators', 'name email avatar')

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      project
    })

  } catch (error: any) {
    console.error('Get project error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id] - Update project (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    // Verify authentication
    const decoded = await verifyToken(request)
    
    const { id } = await params
    const project = await Project.findById(id)
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Check if user owns the project or is admin
    const user = await User.findById(decoded.userId)
    const isOwner = project.createdBy.toString() === decoded.userId
    const isAdmin = user?.role === 'admin'
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to edit this project' },
        { status: 403 }
      )
    }

    const updateData = await request.json()
    
    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        ...updateData,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email avatar')

    // Log activity
    await logProjectActivity(decoded.userId, 'project_updated', updatedProject.title, id)

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      project: updatedProject
    })

  } catch (error: any) {
    console.error('Update project error:', error)
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - Delete project (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    // Verify authentication
    const decoded = await verifyToken(request)
    
    const { id } = await params
    const project = await Project.findById(id)
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Check if user owns the project or is admin
    const user = await User.findById(decoded.userId)
    const isOwner = project.createdBy.toString() === decoded.userId
    const isAdmin = user?.role === 'admin'
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this project' },
        { status: 403 }
      )
    }

    // Store title before deletion for logging
    const projectTitle = project.title

    // Delete project
    await Project.findByIdAndDelete(id)

    // Log activity
    await logProjectActivity(decoded.userId, 'project_deleted', projectTitle, id)

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })

  } catch (error: any) {
    console.error('Delete project error:', error)
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
