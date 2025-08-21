import mongoose, { Document, Schema } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  shortDescription: string
  category: 'web' | 'mobile' | 'design' | 'other'
  technologies: string[]
  image: string
  gallery: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  status: 'draft' | 'published'
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    trim: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description'],
    trim: true,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['web', 'mobile', 'design', 'other']
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  image: {
    type: String,
    required: [true, 'Please provide a project image']
  },
  gallery: [{
    type: String
  }],
  liveUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// Prevent recompilation during development
export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
