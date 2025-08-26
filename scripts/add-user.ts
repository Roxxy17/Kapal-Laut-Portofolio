// Script untuk menambahkan user baru TANPA menghapus data existing
// Cara menjalankan: npx ts-node scripts/add-user.ts
// Atau: npm run ts-node scripts/add-user.ts
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

import connectDB from '../lib/mongodb'
import User from '../models/User'
import bcrypt from 'bcryptjs'

interface NewUser {
  name: string
  email: string
  password: string
  role?: 'admin' | 'user'
  // Team profile fields (optional)
  jobTitle?: string
  avatar?: string
  skills?: string[]
  bio?: string
  social?: {
    github?: string
    linkedin?: string
    instagram?: string
  }
}

async function addNewUser(userData: NewUser) {
  try {
    await connectDB()
    console.log('✅ Connected to MongoDB')

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      console.log(`❌ User with email ${userData.email} already exists`)
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Create user
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'user',
      jobTitle: userData.jobTitle,
      bio: userData.bio,
      skills: userData.skills,
      social: userData.social,
      avatar: userData.avatar || '/placeholder-user.jpg',
      projectsCompleted: 0
    })

    console.log('✅ User created successfully:')
    console.log(`   Name: ${newUser.name}`)
    console.log(`   Email: ${newUser.email}`)
    console.log(`   Role: ${newUser.role}`)
    console.log(`   ID: ${newUser._id}`)

  } catch (error) {
    console.error('❌ Failed to create user:', error)
  } finally {
    process.exit()
  }
}

// ====== TAMBAHKAN USER BARU DI SINI ======

// Contoh penggunaan - uncomment dan edit sesuai kebutuhan:

addNewUser({
  name: 'Ariefhan Maulana',
  email: 'ariefhanmaulana@gmail.com',
  password: 'ariefgantengbingit',
  role: 'user',
  jobTitle: 'Project Manager',
  bio: 'Passionate frontend developer with expertise in React and Vue.js',
  skills: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'CSS'],
  social: {
    github: 'https://github.com/ariefhanmaulana',
    linkedin: 'https://linkedin.com/in/ariefhanmaulana',
    instagram: 'https://instagram.com/ariefhanmaulana'
  }
})

// Untuk menambah multiple users sekaligus:
/*
async function addMultipleUsers() {
  const users = [
    {
      name: 'Alice Smith',
      email: 'alice@gmail.com',
      password: 'alice123',
      role: 'user' as const,
      jobTitle: 'UI/UX Designer',
      bio: 'Creative designer with passion for user experience',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
      social: {
        github: 'https://github.com/alicesmith',
        linkedin: 'https://linkedin.com/in/alicesmith',
        instagram: 'https://instagram.com/alicedesign'
      }
    },
    {
      name: 'Bob Wilson',
      email: 'bob@gmail.com', 
      password: 'bob123',
      role: 'user' as const,
      jobTitle: 'Backend Developer',
      bio: 'Backend specialist with expertise in Node.js and databases',
      skills: ['Node.js', 'MongoDB', 'Express', 'PostgreSQL'],
      social: {
        github: 'https://github.com/bobwilson',
        linkedin: 'https://linkedin.com/in/bobwilson',
        instagram: '#'
      }
    }
  ]

  for (const user of users) {
    await addNewUser(user)
  }
}

// addMultipleUsers()
*/
