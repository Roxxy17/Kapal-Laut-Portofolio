// Script untuk membantu setup MongoDB Atlas IP Whitelist
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function setupMongoDBAtlas() {
  console.log('🚀 MongoDB Atlas Setup Helper')
  console.log('============================\n')

  // Get current IP
  try {
    console.log('🌐 Getting your current IP address...')
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    const currentIP = data.ip
    
    console.log(`✅ Your current IP: ${currentIP}\n`)
    
    console.log('📋 Steps to fix MongoDB Atlas connection:')
    console.log('1. Open MongoDB Atlas Dashboard: https://cloud.mongodb.com/')
    console.log('2. Select your cluster')
    console.log('3. Go to "Network Access" in the sidebar')
    console.log('4. Click "Add IP Address"')
    console.log(`5. Add this IP: ${currentIP}`)
    console.log('6. Or for development, use: 0.0.0.0/0 (allows all IPs)\n')
    
    console.log('🔧 Alternative: Use MongoDB Atlas CLI (if installed)')
    console.log(`   atlas accessLists create ${currentIP} --type ipAddress\n`)
    
    console.log('⏳ After adding the IP, wait 2-3 minutes for changes to take effect.')
    console.log('💡 Then run: npm run monitor-mongodb')
    
  } catch (error) {
    console.error('❌ Error getting IP address:', error)
    console.log('\nManual steps:')
    console.log('1. Check your IP at: https://whatismyipaddress.com/')
    console.log('2. Add it to MongoDB Atlas Network Access')
  }

  console.log('\n🎯 Quick Development Setup:')
  console.log('For faster development, you can temporarily allow all IPs:')
  console.log('• In MongoDB Atlas Network Access')
  console.log('• Click "Add IP Address"')
  console.log('• Select "Allow Access from Anywhere"')
  console.log('• This adds 0.0.0.0/0 to the whitelist')
  console.log('⚠️  Remember to restrict this for production!')
}

setupMongoDBAtlas().catch(console.error)
