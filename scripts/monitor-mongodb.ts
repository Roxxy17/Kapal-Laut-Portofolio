// Script untuk memantau koneksi MongoDB secara berkala
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const MONGODB_URI = process.env.MONGODB_URI!

async function monitorConnection() {
  console.log('🔄 MongoDB Connection Monitor Started')
  console.log('Press Ctrl+C to stop monitoring\n')

  let attemptCount = 0
  const maxAttempts = 10
  const retryDelay = 5000 // 5 seconds

  while (attemptCount < maxAttempts) {
    attemptCount++
    console.log(`\n🔍 Attempt ${attemptCount}/${maxAttempts} - ${new Date().toLocaleTimeString()}`)
    
    try {
      await mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000, // 5 second timeout
      })
      
      console.log('✅ Successfully connected to MongoDB!')
      console.log('🎉 Problem resolved! Your application should work now.')
      
      await mongoose.disconnect()
      break
      
    } catch (error: any) {
      console.log('❌ Connection failed:', error?.message?.split('.')[0] || 'Unknown error')
      
      if (attemptCount < maxAttempts) {
        console.log(`⏳ Waiting ${retryDelay/1000} seconds before next attempt...`)
        await new Promise(resolve => setTimeout(resolve, retryDelay))
      }
    }
  }

  if (attemptCount >= maxAttempts) {
    console.log('\n❌ Max attempts reached. Please check your MongoDB Atlas configuration.')
  }

  console.log('\n✨ Monitoring complete!')
}

monitorConnection().catch(console.error)
