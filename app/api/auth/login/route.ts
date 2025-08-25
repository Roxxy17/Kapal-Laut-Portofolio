import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

// GET handler for API information
export async function GET() {
  return NextResponse.json({
    message: 'Login API Endpoint',
    method: 'POST',
    description: 'Use POST method to login with email and password',
    body: {
      email: 'string',
      password: 'string'
    },
    example: {
      email: 'admin@teamportfolio.com',
      password: 'admin123'
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    // Parse JSON with error handling
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON format. Please provide valid JSON with email and password.' },
        { status: 400 }
      )
    }

    const { email, password } = body
    console.log('[LOGIN] Attempt for email:', email)

    // Validation
    if (!email || !password) {
      console.log('[LOGIN] Missing email or password')
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      )
    }

    // Find user
    const user = await User.findOne({ email })
    console.log('[LOGIN] User found:', !!user)
    
    if (!user) {
      console.log('[LOGIN] User not found for email:', email)
      return NextResponse.json(
        { error: 'Invalid email or password. Try with the updated credentials from seed output' },
        { status: 401 }
      )
    }

    // Check password
    console.log('[LOGIN] Checking password...')
    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('[LOGIN] Password valid:', isPasswordValid)
    
    if (!isPasswordValid) {
      console.log('[LOGIN] Invalid password for user:', email)
      return NextResponse.json(
        { error: 'Invalid email or password. Try with the updated credentials from seed output' },
        { status: 401 }
      )
    }
    if (!isPasswordValid) {
      console.log('[LOGIN] Invalid password for user:', email)
      return NextResponse.json(
        { error: 'Invalid email or password. Try with the updated credentials from seed output' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }

    console.log('[LOGIN] Login successful, returning user data')
    
    // Create response with cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: userResponse,
      token
    }, { status: 200 })

    // Set auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: false, // Allow client-side access
      secure: false, // Use false for localhost development
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    })

    return response

  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
