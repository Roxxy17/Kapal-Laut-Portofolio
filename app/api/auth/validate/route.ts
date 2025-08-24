import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request: NextRequest) {
  return validateToken(request)
}

export async function GET(request: NextRequest) {
  return validateToken(request)
}

async function validateToken(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    // Connect to database and verify user still exists
    await connectDB()
    const user = await User.findById(decoded.userId).select('-password')
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    })

  } catch (error: any) {
    console.error('Token validation error:', error)
    
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}
