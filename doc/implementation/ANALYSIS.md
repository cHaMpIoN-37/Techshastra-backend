# Shastra Hub - Project Analysis

## Overview
**Shastra Hub** is a comprehensive web application for managing a technical and entrepreneurship club (TechShastra) at Uttarakhand Technical University (UTU). It's a modern, full-stack application built with React, TypeScript, and Supabase.

## Project Type
- **Category**: Club/Community Management Platform
- **Purpose**: Official platform for TechShastra club to showcase projects, manage events, publish blog posts, and engage with members
- **Target Audience**: University students, club members, and administrators

## Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Routing**: React Router DOM 6.30.1
- **UI Library**: shadcn-ui (Radix UI components)
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: TanStack Query (React Query) 5.83.0
- **Form Handling**: React Hook Form 7.61.1 with Zod validation
- **Theme**: next-themes for dark/light mode support
- **Icons**: Lucide React

### Backend & Database
- **Backend**: Supabase (PostgreSQL database with real-time capabilities)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for images/assets)
- **Database Features**: Row Level Security (RLS) policies

### Development Tools
- **Linting**: ESLint 9.32.0
- **TypeScript**: 5.8.3
- **Package Manager**: npm (with bun.lockb present)

## Project Structure

```
shastra-hub/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn-ui components (50+ components)
│   │   ├── Navbar.tsx       # Navigation bar with theme toggle
│   │   ├── Hero.tsx         # Landing page hero section
│   │   ├── About.tsx        # About section
│   │   ├── Domains.tsx      # Club domains/areas
│   │   ├── Team.tsx         # Team members section
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Newsletter.tsx   # Newsletter subscription
│   │   ├── ProtectedRoute.tsx  # Route protection for auth
│   │   └── ThemeProvider.tsx    # Theme context provider
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Home page
│   │   ├── Join.tsx         # Membership join page
│   │   ├── Projects.tsx     # Projects listing
│   │   ├── ProjectDetail.tsx # Individual project view
│   │   ├── Events.tsx       # Events listing
│   │   ├── EventDetail.tsx  # Individual event view
│   │   ├── Blog.tsx         # Blog posts listing
│   │   ├── BlogPost.tsx     # Individual blog post
│   │   ├── Resources.tsx   # Learning resources
│   │   ├── Gallery.tsx      # Image gallery
│   │   ├── FAQ.tsx          # Frequently asked questions
│   │   ├── Achievements.tsx # Club achievements
│   │   ├── Auth.tsx         # Authentication page
│   │   ├── Admin.tsx        # Admin dashboard
│   │   └── NotFound.tsx     # 404 page
│   ├── integrations/
│   │   └── supabase/        # Supabase client & types
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── assets/              # Static assets (images)
├── supabase/
│   ├── migrations/          # Database migrations
│   └── config.toml          # Supabase configuration
└── public/                   # Public assets
```

## Database Schema

### Core Tables

1. **profiles** - User profile information
   - Links to auth.users
   - Stores: full_name, avatar_url, bio, social links

2. **user_roles** - Role-based access control
   - Roles: admin, moderator, member
   - Enables permission management

3. **projects** - Club projects
   - Fields: title, description, tech_stack, status, featured
   - Status: active, completed, archived
   - Links to creators and members

4. **project_members** - Project team members
   - Many-to-many relationship

5. **events** - Club events
   - Fields: title, description, event_date, location, max_attendees
   - Status: upcoming, ongoing, completed, cancelled

6. **event_registrations** - Event sign-ups
   - Tracks user registrations

7. **blog_posts** - Blog content
   - Fields: title, slug, content, published status
   - Supports draft/published workflow

8. **resources** - Learning resources
   - Fields: title, description, url, category, difficulty

9. **gallery_images** - Image gallery
   - Can be linked to events

10. **faqs** - Frequently asked questions
    - Supports categorization and ordering

11. **achievements** - Club achievements/awards

12. **newsletter_subscribers** - Email list

13. **contact_messages** - Contact form submissions

### Security Features
- **Row Level Security (RLS)**: Enabled on all tables
- **Role-based access**: Admin, moderator, member roles
- **Policy-based permissions**: Granular access control
- **Auto-profile creation**: Trigger creates profile on user signup

## Key Features

### Public Features
1. **Homepage** - Hero section, about, domains, team showcase
2. **Projects** - Browse and view club projects
3. **Events** - View and register for events
4. **Blog** - Read published blog posts
5. **Resources** - Access learning resources
6. **Gallery** - View event and club photos
7. **FAQ** - Common questions and answers
8. **Achievements** - Club accomplishments
9. **Contact** - Contact form
10. **Newsletter** - Email subscription

### Member Features
1. **Authentication** - Sign up/login via Supabase Auth
2. **Profile Management** - Update profile information
3. **Event Registration** - Register for events
4. **Project Participation** - Join projects as members

### Admin Features
1. **Admin Dashboard** - Overview of all content
2. **Content Management**:
   - Create/edit/delete projects
   - Manage events
   - Write and publish blog posts
   - Upload gallery images
   - Manage FAQs
   - Add achievements
   - View contact messages
   - Manage newsletter subscribers

## UI/UX Features

1. **Dark/Light Mode** - Full theme support with system preference detection
2. **Responsive Design** - Mobile-first approach
3. **Modern Animations** - Smooth transitions and effects
4. **Accessibility** - Built on Radix UI (accessible by default)
5. **Gradient Effects** - Neon-style gradients for branding
6. **Glassmorphism** - Backdrop blur effects

## Routing Structure

```
/                    → Home page
/join                → Membership join page
/auth                → Authentication (login/signup)
/projects            → Projects listing
/projects/:id        → Project detail
/events              → Events listing
/events/:id          → Event detail
/blog                → Blog listing
/blog/:slug          → Blog post
/resources           → Resources page
/gallery             → Gallery page
/faq                 → FAQ page
/achievements        → Achievements page
/admin               → Admin dashboard (protected)
/*                   → 404 page
```

## Security Implementation

1. **Protected Routes**: Admin routes require authentication and admin role
2. **RLS Policies**: Database-level security
3. **Role Checking**: Server-side role verification
4. **Session Management**: Automatic token refresh

## Development Setup

### Prerequisites
- Node.js & npm
- Supabase account and project

### Environment Variables Required
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-key>
```

### Installation
```bash
npm install
npm run dev      # Development server (port 8080)
npm run build    # Production build
npm run preview  # Preview production build
```

## Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting configured
- **Component-based**: Modular React components
- **Reusable UI**: shadcn-ui component library
- **Type Generation**: Auto-generated Supabase types

## Notable Design Patterns

1. **Component Composition**: shadcn-ui pattern
2. **Protected Routes**: Higher-order component pattern
3. **Theme Context**: React Context for theme management
4. **Query Management**: TanStack Query for server state
5. **Form Validation**: Zod schemas with React Hook Form

## Potential Improvements

1. **Admin Dashboard**: Currently shows placeholder data (stats are hardcoded to 0)
2. **Image Upload**: Needs implementation for gallery/project images
3. **Search Functionality**: No search feature for projects/blog
4. **Pagination**: May need pagination for large lists
5. **Real-time Updates**: Could leverage Supabase real-time features
6. **Email Notifications**: Newsletter/contact form notifications
7. **Analytics**: User engagement tracking
8. **SEO**: Meta tags and Open Graph support

## Project Status

The project appears to be in **active development** with:
- ✅ Complete database schema
- ✅ Full UI component library
- ✅ Routing structure
- ✅ Authentication setup
- ⚠️ Admin dashboard needs implementation
- ⚠️ Some features may need backend integration

## Deployment

- Built with Vite (optimized for production)
- Can be deployed to any static hosting (Vercel, Netlify, etc.)
- Requires Supabase backend connection
- Environment variables needed for production

## License & Credits

- Built with Lovable.dev platform
- Uses open-source libraries (React, Supabase, shadcn-ui)
- Custom branding for TechShastra club

---

**Analysis Date**: Generated automatically
**Repository**: https://github.com/Akhilesh-raje/shastra-hub.git

