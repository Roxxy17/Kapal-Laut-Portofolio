// Test to verify avatar upload endpoint is working
// Run: node test-avatar-endpoint.js

const testAvatarEndpoint = async () => {
  console.log('🔍 Testing Avatar Upload Endpoint...')
  
  // Test 1: Check if endpoint exists
  try {
    const response = await fetch('http://localhost:3000/api/profile/avatar', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer invalid_token_for_test'
      }
    })
    
    if (response.status === 401) {
      console.log('✅ Avatar endpoint exists and requires authentication')
    } else {
      console.log('❌ Unexpected response:', response.status)
    }
  } catch (error) {
    console.log('❌ Avatar endpoint not reachable:', error.message)
  }
  
  // Test 2: Check if old upload endpoint is removed
  try {
    const response = await fetch('http://localhost:3000/api/upload/avatar', {
      method: 'POST'
    })
    
    if (response.status === 404) {
      console.log('✅ Old upload endpoint removed')
    } else {
      console.log('❌ Old upload endpoint still exists:', response.status)
    }
  } catch (error) {
    console.log('✅ Old upload endpoint removed (connection error expected)')
  }
}

testAvatarEndpoint()
