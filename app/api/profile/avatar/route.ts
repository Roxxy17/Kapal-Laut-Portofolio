import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    // Get request body
    const body = await request.json()
    const { avatar, filename, fileType } = body

    if (!avatar) {
      return NextResponse.json({ error: 'No avatar data provided' }, { status: 400 })
    }

    // Validate file type
    if (!fileType || !fileType.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 })
    }

    // Validate base64 string
    if (!avatar.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid image data format' }, { status: 400 })
    }

    // Check file size (base64 is roughly 1.37x larger than original)
    const base64Data = avatar.split(',')[1]
    const fileSizeInBytes = (base64Data.length * 3) / 4
    const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
    
    if (fileSizeInBytes > maxSizeInBytes) {
      return NextResponse.json({ error: 'File size too large. Maximum 5MB allowed.' }, { status: 400 })
    }

    // Update user avatar in database
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { 
        avatar: avatar,
        updatedAt: new Date()
      },
      { new: true, select: '-password' }
    )

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log(`✅ Avatar updated for user: ${updatedUser.email}`)

    return NextResponse.json({
      success: true,
      message: 'Avatar updated successfully',
      avatar: updatedUser.avatar,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar
      }
    })

  } catch (error: any) {
    console.error('Avatar update error:', error)
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 })
    }

    return NextResponse.json({ 
      error: 'Failed to update avatar',
      details: error.message 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    // Get user avatar
    const user = await User.findById(decoded.userId).select('avatar name email')
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      avatar: user.avatar || '/placeholder-user.jpg',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    })

  } catch (error: any) {
    console.error('Get avatar error:', error)
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 })
    }

    return NextResponse.json({ 
      error: 'Failed to get avatar',
      details: error.message 
    }, { status: 500 })
  }
}
