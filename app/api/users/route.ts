import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

// GET /api/users - Get all team members
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get all team members
    const users = await User.find(
      {}, 
      'name email role'
    ).sort({ name: 1 })

    return NextResponse.json({
      success: true,
      users
    })

  } catch (error: any) {
    console.error('Get team members error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}
