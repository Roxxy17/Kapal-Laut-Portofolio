# 🚀 Team Portfolio - Premium Digital Solutions

A modern, full-stack portfolio website showcasing our elite team's innovative projects and capabilities. Built with cutting-edge technologies and featuring sophisticated animations, glass morphism design, and comprehensive project management.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Frontend Excellence**
- **Modern Design System** - Glass morphism, gradient effects, and sophisticated animations
- **3D Orbital Animations** - Floating programming language icons with complex orbital mathematics
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark/Light Theme** - Seamless theme switching with system preference support
- **Advanced Animations** - Smooth page transitions, hover effects, and loading states

### 🔧 **Backend Power**
- **RESTful API** - Complete authentication and project management endpoints
- **MongoDB Integration** - Full database with user management and project storage
- **JWT Authentication** - Secure token-based authentication system
- **User Roles** - Admin and user role management
- **Data Validation** - Comprehensive input validation and error handling

### 📱 **User Experience**
- **Interactive Sections** - Hero, Services, Team, Projects, Testimonials, Contact
- **Project Management** - Admin dashboard for project CRUD operations
- **Authentication Flow** - Secure login with demo accounts
- **Contact Forms** - Functional contact form with modern styling
- **Loading States** - Elegant loading animations and skeleton screens

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 15.2.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with shadcn/ui base
- **Icons:** Lucide React, Simple Icons (for tech logos)
- **Animations:** CSS custom animations, Framer Motion-inspired effects

### **Backend**
- **Runtime:** Node.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** JWT + bcryptjs
- **Environment:** dotenv for configuration

### **Development Tools**
- **Package Manager:** pnpm
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Development:** Hot reload with Next.js dev server

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- MongoDB Atlas account
- Git installed

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Roxxy17/Kapal-Laut-Portofolio.git
cd Kapal-Laut-Portofolio
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Setup environment variables**
Create `.env.local` file in the root directory:
```env
# MongoDB Atlas Connection
MONGODB_URI=your_mongodb_atlas_connection_string

# Authentication Secrets
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_32_chars
JWT_SECRET=your_jwt_secret_32_chars

# Environment
NODE_ENV=development
```

4. **Seed the database**
```bash
pnpm seed
```

5. **Start development server**
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## 🔐 Login Credentials

### **Admin Account**
- **Email:** `admin@teamportfolio.com`
- **Password:** `admin123`

### **Demo Team Members**
- **Email:** `alex@teamportfolio.com` | **Password:** `password`
- **Email:** `sarah@teamportfolio.com` | **Password:** `password`
- **Email:** `mike@teamportfolio.com` | **Password:** `password`

## 📊 Database Schema

### **Users Collection**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "user",
  createdAt: Date,
  updatedAt: Date
}
```

### **Projects Collection**
```javascript
{
  title: String,
  description: String,
  shortDescription: String,
  category: "web" | "mobile" | "design" | "other",
  technologies: [String],
  image: String,
  gallery: [String],
  liveUrl: String (optional),
  githubUrl: String (optional),
  featured: Boolean,
  status: "draft" | "published",
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ API Endpoints

### **Authentication**
- `GET /api/auth/login` - API information
- `POST /api/auth/login` - User login

### **Projects**
- `GET /api/projects` - Get all published projects
- `POST /api/projects` - Create new project (requires auth)

### **Request Examples**

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@teamportfolio.com","password":"admin123"}'
```

**Get Projects:**
```bash
curl http://localhost:3000/api/projects
```

## 🎨 Design Features

### **Glass Morphism Cards**
- Backdrop blur effects
- Subtle transparency
- Border gradients
- Hover animations

### **3D Orbital Animations**
- Complex mathematical calculations
- Multiple orbital rings
- Variable speeds
- Programming language icons

### **Color System**
- CSS custom properties
- Dark/light theme support
- Accent and primary colors
- Gradient animations

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database
pnpm seed         # Seed database with sample data
pnpm check-db     # Check database connection and data
pnpm test-env     # Test environment variables

# Testing
pnpm test-env     # Test environment configuration
```

## 🌟 Key Components

### **Frontend Components**
- `hero-section.tsx` - Landing section with 3D animations
- `services-section.tsx` - Service offerings with glass morphism
- `team-section.tsx` - Team member cards with orbital effects
- `projects-section.tsx` - Project showcase with filtering
- `testimonials-section.tsx` - Client testimonials carousel
- `contact-section.tsx` - Contact form with modern styling

### **Backend Models**
- `User.ts` - User authentication and management
- `Project.ts` - Project data structure and validation

### **API Routes**
- `auth/login/route.ts` - Authentication endpoint
- `projects/route.ts` - Project CRUD operations

## 🔄 Development Workflow

1. **Feature Development**
   - Create feature branch
   - Implement changes
   - Test locally
   - Submit pull request

2. **Database Changes**
   - Update models
   - Run migrations
   - Update seed data
   - Test endpoints

3. **Frontend Updates**
   - Component development
   - Style implementation
   - Animation integration
   - Responsive testing

## 🚀 Deployment

### **Vercel Deployment**
1. Connect repository to Vercel
2. Add environment variables
3. Deploy automatically on push

### **Environment Variables for Production**
```env
MONGODB_URI=your_production_mongodb_uri
NEXTAUTH_SECRET=your_production_secret
JWT_SECRET=your_production_jwt_secret
NEXTAUTH_URL=https://your-domain.vercel.app
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer** - Full-stack development and architecture
- **UI/UX Designer** - Design system and user experience
- **Backend Developer** - API development and database design

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the robust database solution
- Vercel for seamless deployment platform

---

<p align="center">
  <strong>Built with ❤️ by Team Portfolio</strong>
</p>

<p align="center">
  <a href="https://your-portfolio.vercel.app">🌐 Live Demo</a> •
  <a href="#quick-start">📖 Documentation</a> •
  <a href="#api-endpoints">🛡️ API Reference</a>
</p>
