// Script untuk debug user dan reset password jika diperlukan
import bcrypt from 'bcryptjs'
import connectDB from '../lib/mongodb.js'
import User from '../models/User.js'

async function debugUser() {
  try {
    await connectDB()
    
    console.log('🔍 Debugging User Authentication')
    console.log('================================\n')
    
    // Get user
    const user = await User.findOne({ email: 'kalilaatha8@gmail.com' })
    
    if (!user) {
      console.log('❌ User not found')
      return
    }
    
    console.log('✅ User found:')
    console.log('   Name:', user.name)
    console.log('   Email:', user.email)
    console.log('   Role:', user.role)
    console.log('   Password hash:', user.password.substring(0, 20) + '...')
    
    // Test password
    const testPassword = 'password123'
    console.log(`\n🔐 Testing password: "${testPassword}"`)
    
    const isValid = await bcrypt.compare(testPassword, user.password)
    console.log('   Password valid:', isValid)
    
    if (!isValid) {
      console.log('\n🔧 Resetting password to "password123"...')
      const hashedPassword = await bcrypt.hash('password123', 10)
      
      await User.findByIdAndUpdate(user._id, {
        password: hashedPassword
      })
      
      console.log('✅ Password reset successful!')
      
      // Test again
      const updatedUser = await User.findById(user._id)
      const newValid = await bcrypt.compare('password123', updatedUser.password)
      console.log('   New password valid:', newValid)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

debugUser().catch(console.error)
