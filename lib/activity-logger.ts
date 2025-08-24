import Activity from '@/models/Activity'
import connectDB from '@/lib/mongodb'

interface ActivityData {
  userId: string
  type: 'project_created' | 'project_updated' | 'project_deleted' | 'profile_updated' | 'team_joined' | 'profile_viewed'
  title: string
  description: string
  metadata?: {
    projectId?: string
    projectTitle?: string
    teamName?: string
    viewCount?: number
    [key: string]: any
  }
}

export async function logActivity(data: ActivityData) {
  try {
    await connectDB()
    
    const activity = new Activity({
      userId: data.userId,
      type: data.type,
      title: data.title,
      description: data.description,
      metadata: data.metadata || {}
    })

    await activity.save()
    return activity
  } catch (error) {
    console.error('Error logging activity:', error)
    // Don't throw error to avoid breaking main functionality
    return null
  }
}

export async function logProjectActivity(
  userId: string, 
  type: 'project_created' | 'project_updated' | 'project_deleted',
  projectTitle: string,
  projectId?: string
) {
  const titles = {
    project_created: `Created "${projectTitle}"`,
    project_updated: `Updated "${projectTitle}"`,
    project_deleted: `Deleted "${projectTitle}"`
  }

  const descriptions = {
    project_created: `New project "${projectTitle}" has been created`,
    project_updated: `Project "${projectTitle}" has been updated`,
    project_deleted: `Project "${projectTitle}" has been deleted`
  }

  return logActivity({
    userId,
    type,
    title: titles[type],
    description: descriptions[type],
    metadata: {
      projectId,
      projectTitle
    }
  })
}

export async function logProfileActivity(userId: string, type: 'profile_updated' | 'profile_viewed', metadata?: any) {
  const titles = {
    profile_updated: 'Profile updated',
    profile_viewed: `Profile viewed ${metadata?.viewCount || 0} times this week`
  }

  const descriptions = {
    profile_updated: 'Your profile information has been updated',
    profile_viewed: `Your profile has been viewed ${metadata?.viewCount || 0} times this week`
  }

  return logActivity({
    userId,
    type,
    title: titles[type],
    description: descriptions[type],
    metadata
  })
}

export async function logTeamActivity(userId: string, teamName: string) {
  return logActivity({
    userId,
    type: 'team_joined',
    title: `Joined team project "${teamName}"`,
    description: `You have joined the team project "${teamName}"`,
    metadata: {
      teamName
    }
  })
}
