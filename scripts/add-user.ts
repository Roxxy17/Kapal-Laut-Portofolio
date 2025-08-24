// Script untuk menambahkan user baru TANPA menghapus data existing
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
      role: userData.role || 'user'
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
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  password: 'johndoe2024',
  role: 'user'
})

// Untuk menambah multiple users sekaligus:
/*
async function addMultipleUsers() {
  const users = [
    {
      name: 'Alice Smith',
      email: 'alice@gmail.com',
      password: 'alice123',
      role: 'user' as const
    },
    {
      name: 'Bob Wilson',
      email: 'bob@gmail.com', 
      password: 'bob123',
      role: 'user' as const
    }
  ]

  for (const user of users) {
    await addNewUser(user)
  }
}

// addMultipleUsers()
*/
