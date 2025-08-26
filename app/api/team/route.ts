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
    const transformedTeamMembers = teamMembers.map(member => {
      // Handle migration from twitter to instagram
      const social = member.social || {}
      const finalSocial = {
        github: social.github || "#",
        linkedin: social.linkedin || "#", 
        instagram: social.instagram || social.twitter || "#" // Fallback to twitter if instagram not set
      }
      
      console.log(`Team member ${member.name} social:`, finalSocial) // Debug log
      
      return {
        _id: member._id,
        name: member.name,
        email: member.email,
        role: member.jobTitle || (member.role === 'admin' ? 'Project Manager & Full Stack Developer' : 'Team Member'),
        avatar: member.avatar || '/placeholder-user.jpg',
        skills: member.skills || ['JavaScript', 'React', 'Node.js'],
        projects: member.projectsCompleted || 0,
        bio: member.bio || 'Passionate developer creating amazing digital experiences.',
        social: finalSocial
      }
    })

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
