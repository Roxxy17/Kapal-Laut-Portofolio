// Script untuk test auth flow
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

async function testAuthFlow() {
  console.log('🔐 Testing Auth Flow')
  console.log('===================\n')

  const baseUrl = 'http://localhost:3000'
  
  try {
    // Test login
    console.log('1. Testing login...')
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'kalilaatha8@gmail.com', // Use actual email from database
        password: 'password123' // Default password from seed
      }),
    })

    if (!loginResponse.ok) {
      console.log('❌ Login failed:', loginResponse.status)
      return
    }

    const loginData = await loginResponse.json()
    console.log('✅ Login successful')
    console.log('   User:', loginData.user.name)
    console.log('   Role:', loginData.user.role)
    console.log('   Token preview:', `${loginData.token.substring(0, 20)}...`)

    const token = loginData.token

    // Test token validation
    console.log('\n2. Testing token validation...')
    const validateResponse = await fetch(`${baseUrl}/api/auth/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!validateResponse.ok) {
      console.log('❌ Token validation failed:', validateResponse.status)
      return
    }

    const validateData = await validateResponse.json()
    console.log('✅ Token validation successful')
    console.log('   User:', validateData.user.name)

    // Test dashboard stats
    console.log('\n3. Testing dashboard stats...')
    const statsResponse = await fetch(`${baseUrl}/api/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!statsResponse.ok) {
      console.log('❌ Dashboard stats failed:', statsResponse.status)
      const errorData = await statsResponse.text()
      console.log('   Error:', errorData)
      return
    }

    const statsData = await statsResponse.json()
    console.log('✅ Dashboard stats successful')
    console.log('   Total projects:', statsData.stats.totalProjects)
    console.log('   Team projects:', statsData.stats.teamProjects)

  } catch (error: any) {
    console.error('❌ Test failed:', error.message)
  }

  console.log('\n🎯 Test complete!')
}

testAuthFlow().catch(console.error)
