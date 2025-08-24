// Script untuk membersihkan auth state dan debug
console.log('🧹 Cleaning Auth State')
console.log('=====================\n')

if (typeof window !== 'undefined') {
  // Check current auth state
  const currentUser = localStorage.getItem('user')
  const currentToken = localStorage.getItem('token')
  const currentCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth-token='))
    ?.split('=')[1]

  console.log('Current auth state:')
  console.log('- LocalStorage user:', currentUser ? 'EXISTS' : 'NONE')
  console.log('- LocalStorage token:', currentToken ? 'EXISTS' : 'NONE')
  console.log('- Cookie token:', currentCookie ? 'EXISTS' : 'NONE')

  if (currentUser) {
    console.log('- User details:', JSON.parse(currentUser))
  }
  if (currentToken) {
    console.log('- Token preview:', currentToken.substring(0, 30) + '...')
  }

  // Clear all auth data
  console.log('\n🗑️ Clearing all auth data...')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  
  // Clear all auth-related cookies
  const cookiesToClear = ['auth-token', 'token', 'session']
  cookiesToClear.forEach(cookieName => {
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${window.location.hostname}`
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  })

  console.log('✅ Auth state cleared!')
  console.log('🔄 Please refresh the page to see changes.')
} else {
  console.log('❌ This script must be run in the browser console')
}
