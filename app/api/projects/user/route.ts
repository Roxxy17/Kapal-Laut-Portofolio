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

// GET /api/projects/user - Get projects for logged-in user only
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Verify authentication
    const decoded = await verifyToken(request)
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'individual', 'team', or 'all'
    const status = searchParams.get('status') // filter by status
    
    // Build query for user's projects
    let query: any = {
      $or: [
        { createdBy: decoded.userId }, // Projects created by user
        { collaborators: decoded.userId } // Projects where user is collaborator
      ]
    }
    
    // Filter by type
    if (type && type !== 'all') {
      if (type === 'individual') {
        query.type = 'individual'
        query.$or = [{ createdBy: decoded.userId }] // Only projects created by user for individual
      } else if (type === 'team') {
        query.type = 'team'
      }
    }
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status
    }

    const projects = await Project.find(query)
      .populate('createdBy', 'name email avatar')
      .populate('collaborators', 'name email avatar')
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      projects
    })

  } catch (error: any) {
    console.error('Get user projects error:', error)
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
