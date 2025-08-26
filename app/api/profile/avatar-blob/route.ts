// Alternative: Vercel Blob Storage Implementation
// app/api/profile/avatar-blob/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

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
    
    const formData = await request.formData()
    const file = formData.get('avatar') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    try {
      // Get current user to delete old avatar if exists
      const currentUser = await User.findById(decoded.userId)
      
      // Delete old avatar from Vercel Blob if exists
      if (currentUser?.avatar && currentUser.avatar.includes('vercel-storage.com')) {
        try {
          await del(currentUser.avatar)
        } catch (delError) {
          console.log('Failed to delete old avatar:', delError)
        }
      }

      // Upload to Vercel Blob
      const filename = `avatar-${decoded.userId}-${Date.now()}.${file.name.split('.').pop()}`
      const blob = await put(filename, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      })

      // Update user with Blob URL
      const updatedUser = await User.findByIdAndUpdate(
        decoded.userId,
        { 
          avatar: blob.url,
          updatedAt: new Date()
        },
        { new: true, select: '-password' }
      )

      return NextResponse.json({
        success: true,
        message: 'Avatar updated successfully',
        avatar: updatedUser.avatar,
        blob_url: blob.url
      })

    } catch (blobError: any) {
      console.error('Vercel Blob upload error:', blobError)
      return NextResponse.json({ 
        error: 'Failed to upload to blob storage',
        details: blobError.message 
      }, { status: 500 })
    }

  } catch (error: any) {
    console.error('Avatar blob update error:', error)
    return NextResponse.json({ 
      error: 'Failed to update avatar',
      details: error.message 
    }, { status: 500 })
  }
}

// To install: npm install @vercel/blob
// Environment variables: BLOB_READ_WRITE_TOKEN (auto-configured in Vercel)
