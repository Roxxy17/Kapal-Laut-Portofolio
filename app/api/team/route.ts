import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
  try {
    await connectDB()
    
    // Get all users untuk team section dengan semua field yang dibutuhkan
    const teamMembers = await User.find({}, {
      password: 0, // Exclude password dari response
      createdAt: 0,
      updatedAt: 0,
      __v: 0
    }).lean()

    // Transform data untuk team section format
    const transformedTeamMembers = teamMembers.map(member => ({
      _id: member._id,
      name: member.name,
      email: member.email,
      role: member.jobTitle || (member.role === 'admin' ? 'Project Manager & Full Stack Developer' : 'Team Member'),
      avatar: member.avatar || '/placeholder-user.jpg',
      skills: member.skills || ['JavaScript', 'React', 'Node.js'],
      projects: member.projectsCompleted || 0,
      bio: member.bio || 'Passionate developer creating amazing digital experiences.',
      social: member.social || {
        github: "#",
        linkedin: "#", 
        twitter: "#"
      }
    }))

    return NextResponse.json({
      success: true,
      teamMembers: transformedTeamMembers
    })

  } catch (error) {
    console.error('Team API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch team members' 
      },
      { status: 500 }
    )
  }
}
