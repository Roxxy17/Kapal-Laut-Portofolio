const { config } = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env.local
config({ path: '.env.local' });

// Define Project schema inline
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: String,
  category: String,
  technologies: [String],
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'review', 'testing', 'completed', 'on-hold'],
    default: 'planning'
  },
  type: {
    type: String,
    enum: ['individual', 'team'],
    default: 'individual'
  },
  featured: { type: Boolean, default: false },
  liveUrl: String,
  githubUrl: String,
  image: String,
  collaborators: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

// Define User schema inline
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  avatar: String,
  bio: String,
  skills: [String],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

userSchema.virtual('completedProjectsCount', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'createdBy',
  count: true,
  match: { status: 'completed' }
});

const User = mongoose.model('User', userSchema);

const projectsData = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB",
    shortDescription: "Modern e-commerce platform",
    category: "web-development",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    status: "completed",
    type: "individual",
    featured: true,
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/user/ecommerce",
    image: "/placeholder.jpg"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    shortDescription: "Team collaboration tool",
    category: "productivity",
    technologies: ["Vue.js", "Firebase", "Vuetify"],
    status: "in-progress",
    type: "team",
    featured: false,
    collaborators: ["John Doe", "Jane Smith"],
    githubUrl: "https://github.com/team/taskapp",
    image: "/placeholder.jpg"
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with forecasts and analytics",
    shortDescription: "Weather tracking dashboard",
    category: "utility",
    technologies: ["React", "Chart.js", "Weather API"],
    status: "planning",
    type: "individual",
    featured: false,
    liveUrl: "https://weather-dash.com",
    image: "/placeholder.jpg"
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects and skills",
    shortDescription: "Developer portfolio",
    category: "portfolio",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    status: "completed",
    type: "individual",
    featured: true,
    liveUrl: "https://myportfolio.com",
    githubUrl: "https://github.com/user/portfolio",
    image: "/placeholder.jpg"
  },
  {
    title: "Chat Application",
    description: "Real-time chat application with rooms and direct messaging",
    shortDescription: "Real-time messaging app",
    category: "communication",
    technologies: ["Socket.io", "Node.js", "React", "PostgreSQL"],
    status: "review",
    type: "team",
    featured: false,
    collaborators: ["Alice Johnson", "Bob Wilson"],
    githubUrl: "https://github.com/team/chatapp",
    image: "/placeholder.jpg"
  },
  {
    title: "Learning Management System",
    description: "Comprehensive LMS for online education with video streaming",
    shortDescription: "Educational platform",
    category: "education",
    technologies: ["Laravel", "Vue.js", "MySQL", "AWS"],
    status: "testing",
    type: "team",
    featured: true,
    collaborators: ["Sarah Davis", "Mike Chen", "Emma Brown"],
    liveUrl: "https://learning-platform.com",
    image: "/placeholder.jpg"
  },
  {
    title: "Expense Tracker",
    description: "Personal finance management app with budgeting features",
    shortDescription: "Finance tracking app",
    category: "finance",
    technologies: ["React Native", "Firebase", "Chart.js"],
    status: "on-hold",
    type: "individual",
    featured: false,
    githubUrl: "https://github.com/user/expense-tracker",
    image: "/placeholder.jpg"
  },
  {
    title: "Food Delivery App",
    description: "Mobile app for food ordering and delivery tracking",
    shortDescription: "Food delivery platform",
    category: "mobile",
    technologies: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    status: "in-progress",
    type: "team",
    featured: true,
    collaborators: ["Tom Anderson", "Lisa Garcia"],
    image: "/placeholder.jpg"
  }
];

async function seedProjectsWithStatus() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find first user to assign projects to
    const user = await User.findOne({});
    if (!user) {
      console.log('❌ No users found. Please create a user first.');
      return;
    }

    console.log(`👤 Found user: ${user.name} (${user.email})`);

    // Clear existing projects (optional)
    console.log('🧹 Clearing existing projects...');
    await Project.deleteMany({});

    // Insert new projects
    console.log('📦 Seeding projects with different statuses...');
    const createdProjects = [];

    for (const projectData of projectsData) {
      const project = new Project({
        ...projectData,
        createdBy: user._id,
        views: Math.floor(Math.random() * 100) + 10,
        likes: Math.floor(Math.random() * 50) + 5,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
      });

      await project.save();
      createdProjects.push(project);
      console.log(`  ✅ Created: ${project.title} (${project.status})`);
    }

    // Update user stats - simplified since we can't use the instance method
    const completedProjectsCount = await Project.countDocuments({ 
      createdBy: user._id, 
      status: 'completed' 
    });
    
    console.log('\n📊 Project Summary:');
    console.log(`Total projects created: ${createdProjects.length}`);
    console.log(`User completed projects: ${completedProjectsCount}`);
    
    // Status breakdown
    const statusCounts = createdProjects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📈 Status Breakdown:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });

    console.log('\n✅ Seed completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedProjectsWithStatus();
