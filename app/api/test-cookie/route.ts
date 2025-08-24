import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookies = request.cookies
  const authToken = cookies.get('auth-token')
  
  const cookiesList: any = {}
  cookies.getAll().forEach(cookie => {
    cookiesList[cookie.name] = cookie.value
  })
  
  return NextResponse.json({
    cookies: cookiesList,
    authToken: authToken?.value || null,
    cookieHeader: request.headers.get('cookie') || null
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    const response = NextResponse.json({
      message: 'Cookie set successfully',
      token
    })

    // Set cookie with explicit settings
    response.cookies.set('auth-token', token, {
      httpOnly: false,
      secure: false, // for localhost
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set cookie' }, { status: 500 })
  }
}
