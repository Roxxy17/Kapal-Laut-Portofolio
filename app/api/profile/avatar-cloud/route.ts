// Alternative: Cloud Storage Implementation
// app/api/profile/avatar-cloud/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

// Configure Cloudinary (free tier: 25GB storage, 25GB bandwidth)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    // Verify token
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    const body = await request.json()
    const { avatar } = body // base64 string

    if (!avatar || !avatar.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid image data' }, { status: 400 })
    }

    try {
      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(avatar, {
        folder: 'avatars',
        public_id: `user_${decoded.userId}`,
        overwrite: true,
        transformation: [
          { width: 200, height: 200, crop: 'fill' },
          { quality: 'auto:good' },
          { format: 'webp' }
        ]
      })

      // Update user with Cloudinary URL
      const updatedUser = await User.findByIdAndUpdate(
        decoded.userId,
        { 
          avatar: uploadResult.secure_url,
          updatedAt: new Date()
        },
        { new: true, select: '-password' }
      )

      return NextResponse.json({
        success: true,
        message: 'Avatar updated successfully',
        avatar: updatedUser.avatar,
        cloudinary_url: uploadResult.secure_url
      })

    } catch (cloudinaryError: any) {
      console.error('Cloudinary upload error:', cloudinaryError)
      return NextResponse.json({ 
        error: 'Failed to upload to cloud storage',
        details: cloudinaryError.message 
      }, { status: 500 })
    }

  } catch (error: any) {
    console.error('Avatar cloud update error:', error)
    return NextResponse.json({ 
      error: 'Failed to update avatar',
      details: error.message 
    }, { status: 500 })
  }
}

// Environment variables needed in .env.local:
// CLOUDINARY_CLOUD_NAME=your_cloud_name
// CLOUDINARY_API_KEY=your_api_key  
// CLOUDINARY_API_SECRET=your_api_secret
