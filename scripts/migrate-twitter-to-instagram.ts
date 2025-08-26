import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import User from '../models/User'

async function migrateTwitterToInstagram() {
  try {
    console.log('🔄 Connecting to database...')
    await connectDB()
    
    console.log('🔄 Starting migration: Twitter → Instagram...')
    
    // Find all users with Twitter social links
    const users = await User.find({
      'social.twitter': { $exists: true }
    })
    
    console.log(`📋 Found ${users.length} users with Twitter links`)
    
    for (const user of users) {
      const twitterUrl = user.social?.twitter
      let instagramUrl = '#'
      
      // Convert Twitter URL to Instagram if it's not just a placeholder
      if (twitterUrl && twitterUrl !== '#' && twitterUrl.includes('twitter.com')) {
        // Extract username from Twitter URL and convert to Instagram
        const username = twitterUrl.split('/').pop()
        instagramUrl = `https://instagram.com/${username}`
      }
      
      // Update user with Instagram instead of Twitter
      await User.findByIdAndUpdate(user._id, {
        $set: {
          'social.instagram': instagramUrl
        },
        $unset: {
          'social.twitter': 1
        }
      })
      
      console.log(`✅ Updated ${user.name}: ${twitterUrl} → ${instagramUrl}`)
    }
    
    console.log('✅ Migration completed successfully!')
    
    // Verify the migration
    const updatedUsers = await User.find({}, 'name social')
    console.log('\n📋 Updated users:')
    updatedUsers.forEach(user => {
      console.log(`   ${user.name}: ${JSON.stringify(user.social)}`)
    })
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    await mongoose.connection.close()
    console.log('📤 Database connection closed')
  }
}

// Run the migration
migrateTwitterToInstagram()
