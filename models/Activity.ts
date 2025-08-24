import mongoose, { Document, Schema } from 'mongoose'

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId
  type: 'project_created' | 'project_updated' | 'project_deleted' | 'profile_updated' | 'team_joined' | 'profile_viewed'
  title: string
  description: string
  metadata?: {
    projectId?: mongoose.Types.ObjectId
    projectTitle?: string
    teamName?: string
    viewCount?: number
    [key: string]: any
  }
  createdAt: Date
}

const ActivitySchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['project_created', 'project_updated', 'project_deleted', 'profile_updated', 'team_joined', 'profile_viewed']
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
})

// Index for efficient queries
ActivitySchema.index({ userId: 1, createdAt: -1 })
ActivitySchema.index({ type: 1 })
ActivitySchema.index({ createdAt: -1 })

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema)
