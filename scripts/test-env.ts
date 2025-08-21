import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') })

console.log('📋 Environment Variables Test:')
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)
console.log('MONGODB_URI value:', process.env.MONGODB_URI)
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)
console.log('NODE_ENV:', process.env.NODE_ENV)
