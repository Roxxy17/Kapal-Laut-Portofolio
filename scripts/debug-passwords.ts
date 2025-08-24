import connectDB from '../lib/mongodb'
import User from '../models/User'
import bcrypt from 'bcryptjs'

async function debugPasswords() {
  try {
    await connectDB()
    console.log('🔍 Password Debug Check')
    console.log('======================\n')

    // Get all users
    const users = await User.find({}, 'name email password')
    
    // Test passwords for each user
    const testPasswords: { [key: string]: string } = {
      'kalilaatha8@gmail.com': 'kalilaatha2024',
      'rifqidani23@gmail.com': 'rifqi@2024',
      'nadacina@gmail.com': 'nada#designer',
      'team@kapallaut.dev': 'kapallaut2024'
    }

    for (const user of users) {
      const testPassword = testPasswords[user.email]
      if (testPassword) {
        console.log(`🔑 Testing ${user.name} (${user.email})`)
        console.log(`   Password hash: ${user.password.substring(0, 30)}...`)
        
        const isValid = await bcrypt.compare(testPassword, user.password)
        console.log(`   Test password "${testPassword}": ${isValid ? '✅ VALID' : '❌ INVALID'}`)
        
        if (!isValid) {
          console.log(`   🔧 Generating new hash for "${testPassword}"`)
          const newHash = await bcrypt.hash(testPassword, 12)
          console.log(`   New hash: ${newHash.substring(0, 30)}...`)
          
          // Update the password
          await User.findByIdAndUpdate(user._id, { password: newHash })
          console.log(`   ✅ Password updated for ${user.email}`)
        }
        console.log('')
      }
    }

    console.log('🎉 Password debug complete!')
    
  } catch (error) {
    console.error('❌ Password debug failed:', error)
  } finally {
    process.exit()
  }
}

debugPasswords()
