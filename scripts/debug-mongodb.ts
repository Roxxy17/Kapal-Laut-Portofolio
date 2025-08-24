// Script untuk debugging koneksi MongoDB
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

async function debugMongoDB() {
  const MONGODB_URI = process.env.MONGODB_URI

  console.log('🔍 MongoDB Connection Debug Script')
  console.log('================================')

  // Check environment variables
  console.log('\n📋 Environment Variables Check:')
  console.log('MONGODB_URI exists:', !!MONGODB_URI)
  console.log('MONGODB_URI preview:', MONGODB_URI ? `${MONGODB_URI.substring(0, 20)}...` : 'Not found')
  console.log('NODE_ENV:', process.env.NODE_ENV)

  // Check current IP
  console.log('\n🌐 Network Information:')
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    console.log('Your current IP address:', data.ip)
    console.log('Make sure this IP is whitelisted in MongoDB Atlas')
  } catch (error: any) {
    console.log('Could not fetch IP address:', error?.message || 'Unknown error')
  }

  // Test MongoDB connection
  if (MONGODB_URI) {
    console.log('\n🔗 Testing MongoDB Connection:')
    try {
      await mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      })
      console.log('✅ Successfully connected to MongoDB!')
      
      // Test a simple operation
      if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.listCollections().toArray()
        console.log('📊 Available collections:', collections.map(c => c.name))
      }
      
      await mongoose.disconnect()
      console.log('✅ Connection closed successfully')
    } catch (error: any) {
      console.error('❌ MongoDB connection failed:')
      console.error('Error type:', error?.constructor?.name || 'Unknown')
      console.error('Error message:', error?.message || 'Unknown error')
      
      if (error?.message?.includes('IP') || error?.message?.includes('whitelist')) {
        console.log('\n🔧 IP Whitelist Issue Detected!')
        console.log('To fix this:')
        console.log('1. Go to MongoDB Atlas Dashboard')
        console.log('2. Navigate to Network Access')
        console.log('3. Click "Add IP Address"')
        console.log('4. Add your current IP or use 0.0.0.0/0 for development (less secure)')
        console.log('5. Wait for the changes to take effect (can take a few minutes)')
      }
      
      if (error?.message?.includes('authentication')) {
        console.log('\n🔧 Authentication Issue Detected!')
        console.log('Check your MongoDB URI credentials')
      }
    }
  } else {
    console.log('\n❌ MONGODB_URI not found!')
    console.log('Please create a .env.local file with your MongoDB connection string')
  }

  console.log('\n✨ Debug complete!')
}

// Run the debug function
debugMongoDB().catch(console.error)
