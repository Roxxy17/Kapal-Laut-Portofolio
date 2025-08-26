import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST() {
  try {
    await connectDB()
    
    console.log('🔄 Starting migration: Twitter → Instagram...')
    
    // Find all users
    const users = await User.find({})
    console.log(`📋 Found ${users.length} users to check`)
    
    let migratedCount = 0
    
    for (const user of users) {
      let needsUpdate = false
      const updateData: any = {}
      
      // Check if user has old twitter field
      if (user.social && user.social.twitter !== undefined) {
        console.log(`🔄 Migrating user: ${user.name}`)
        
        updateData.social = {
          github: user.social.github || '',
          linkedin: user.social.linkedin || '',
          instagram: user.social.twitter || '' // Migrate twitter to instagram
        }
        
        // Remove the twitter field
        await User.findByIdAndUpdate(user._id, {
          $set: updateData,
          $unset: { 'social.twitter': 1 }
        })
        
        needsUpdate = true
        migratedCount++
        
        console.log(`✅ Migrated ${user.name}: ${user.social.twitter} → instagram`)
      }
    }
    
    console.log(`✅ Migration completed! ${migratedCount} users migrated`)
    
    // Verify the migration
    const updatedUsers = await User.find({}, 'name social')
    console.log('\n📋 Current user social data:')
    updatedUsers.forEach(user => {
      console.log(`   ${user.name}: ${JSON.stringify(user.social)}`)
    })
    
    return NextResponse.json({
      success: true,
      message: `Migration completed successfully! ${migratedCount} users migrated`,
      migratedCount,
      totalUsers: users.length
    })
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    return NextResponse.json(
      { error: 'Migration failed', details: error.message },
      { status: 500 }
    )
  }
}
