import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  // Team section fields
  jobTitle?: string
  avatar?: string
  skills?: string[]
  projectsCompleted?: number
  bio?: string
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  // Team section fields
  jobTitle: {
    type: String,
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters']
  },
  avatar: {
    type: String,
    default: '/placeholder-user.jpg'
    // No maxlength for base64 images - can be quite large
  },
  skills: [{
    type: String,
    trim: true
  }],
  projectsCompleted: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  social: {
    github: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual untuk menghitung jumlah projects completed
UserSchema.virtual('completedProjectsCount', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'createdBy',
  count: true,
  match: { status: 'completed' }
})

// Method untuk update projectsCompleted field
UserSchema.methods.updateProjectsCompleted = async function() {
  const Project = mongoose.model('Project')
  const completedCount = await Project.countDocuments({
    createdBy: this._id,
    status: 'completed'
  })
  
  this.projectsCompleted = completedCount
  await this.save()
  return completedCount
}

// Static method untuk update semua user
UserSchema.statics.updateAllProjectsCompleted = async function() {
  const Project = mongoose.model('Project')
  const users = await this.find()
  
  for (const user of users) {
    const completedCount = await Project.countDocuments({
      createdBy: user._id,
      status: 'completed'
    })
    
    await this.findByIdAndUpdate(user._id, {
      projectsCompleted: completedCount
    })
  }
}

// Prevent recompilation during development
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
