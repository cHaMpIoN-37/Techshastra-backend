# Shastra Hub - Backend Analysis

## Overview
The backend is built entirely on **Supabase**, a PostgreSQL-based Backend-as-a-Service (BaaS) platform. This provides a serverless architecture with built-in authentication, real-time capabilities, and automatic API generation.

## Backend Architecture

### Technology Stack
- **Database**: PostgreSQL (via Supabase)
- **Backend Service**: Supabase (REST API + Realtime)
- **Authentication**: Supabase Auth (JWT-based)
- **Storage**: Supabase Storage (for file uploads)
- **API**: Auto-generated REST API from database schema
- **Real-time**: Supabase Realtime subscriptions

### Project Configuration
- **Supabase Project ID**: `ctbiyqgooscoyxwaygun`
- **Client Configuration**: Environment-based (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)
- **Session Management**: localStorage with auto-refresh tokens

## Database Schema

### Core Tables (13 Total)

#### 1. **profiles** - User Profile Information
```sql
- id (UUID, PK, FK → auth.users)
- full_name (TEXT)
- avatar_url (TEXT)
- bio (TEXT)
- github_url (TEXT)
- linkedin_url (TEXT)
- twitter_url (TEXT)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```
**Purpose**: Extended user information beyond auth.users
**Relationships**: One-to-one with auth.users

#### 2. **user_roles** - Role-Based Access Control
```sql
- id (UUID, PK)
- user_id (UUID, FK → auth.users)
- role (app_role ENUM: 'admin', 'moderator', 'member')
- UNIQUE(user_id, role)
```
**Purpose**: Multi-role system for permissions
**Default Role**: 'member' (assigned on signup)

#### 3. **projects** - Club Projects
```sql
- id (UUID, PK)
- title (TEXT, NOT NULL)
- description (TEXT, NOT NULL)
- long_description (TEXT)
- image_url (TEXT)
- github_url (TEXT)
- demo_url (TEXT)
- tech_stack (TEXT[])
- status (project_status ENUM: 'active', 'completed', 'archived')
- featured (BOOLEAN, DEFAULT false)
- created_by (UUID, FK → auth.users)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```
**Purpose**: Store club project information
**Features**: Array field for tech stack, status tracking

#### 4. **project_members** - Project Team Members
```sql
- id (UUID, PK)
- project_id (UUID, FK → projects)
- user_id (UUID, FK → auth.users)
- role (TEXT) - e.g., "Lead", "Developer", "Designer"
- created_at (TIMESTAMPTZ)
- UNIQUE(project_id, user_id)
```
**Purpose**: Many-to-many relationship between users and projects

#### 5. **events** - Club Events
```sql
- id (UUID, PK)
- title (TEXT, NOT NULL)
- description (TEXT, NOT NULL)
- long_description (TEXT)
- image_url (TEXT)
- event_date (TIMESTAMPTZ, NOT NULL)
- location (TEXT)
- max_attendees (INTEGER)
- status (event_status ENUM: 'upcoming', 'ongoing', 'completed', 'cancelled')
- featured (BOOLEAN, DEFAULT false)
- created_by (UUID, FK → auth.users)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```
**Purpose**: Event management with capacity tracking

#### 6. **event_registrations** - Event Sign-ups
```sql
- id (UUID, PK)
- event_id (UUID, FK → events)
- user_id (UUID, FK → auth.users)
- registered_at (TIMESTAMPTZ)
- UNIQUE(event_id, user_id)
```
**Purpose**: Track event registrations (prevents duplicate registrations)

#### 7. **blog_posts** - Blog Content
```sql
- id (UUID, PK)
- title (TEXT, NOT NULL)
- slug (TEXT, NOT NULL, UNIQUE)
- excerpt (TEXT, NOT NULL)
- content (TEXT, NOT NULL)
- image_url (TEXT)
- author_id (UUID, FK → auth.users, NOT NULL)
- published (BOOLEAN, DEFAULT false)
- published_at (TIMESTAMPTZ)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```
**Purpose**: Blog system with draft/publish workflow
**Features**: SEO-friendly slugs, publish timestamps

#### 8. **resources** - Learning Resources
```sql
- id (UUID, PK)
- title (TEXT, NOT NULL)
- description (TEXT, NOT NULL)
- url (TEXT, NOT NULL)
- category (TEXT, NOT NULL)
- difficulty (TEXT) - e.g., 'beginner', 'intermediate', 'advanced'
- created_by (UUID, FK → auth.users)
- created_at (TIMESTAMPTZ)
```
**Purpose**: Curated learning materials

#### 9. **gallery_images** - Image Gallery
```sql
- id (UUID, PK)
- title (TEXT, NOT NULL)
- description (TEXT)
- image_url (TEXT, NOT NULL)
- event_id (UUID, FK → events, ON DELETE SET NULL)
- uploaded_by (UUID, FK → auth.users)
- created_at (TIMESTAMPTZ)
```
**Purpose**: Photo gallery with optional event linking

#### 10. **faqs** - Frequently Asked Questions
```sql
- id (UUID, PK)
- question (TEXT, NOT NULL)
- answer (TEXT, NOT NULL)
- category (TEXT)
- order_index (INTEGER, DEFAULT 0)
- created_at (TIMESTAMPTZ)
```
**Purpose**: FAQ management with ordering

#### 11. **achievements** - Club Achievements
```sql
- id (UUID, PK)
- title (TEXT, NOT NULL)
- description (TEXT, NOT NULL)
- image_url (TEXT)
- date (TIMESTAMPTZ, NOT NULL)
- created_at (TIMESTAMPTZ)
```
**Purpose**: Showcase club accomplishments

#### 12. **newsletter_subscribers** - Email List
```sql
- id (UUID, PK)
- email (TEXT, NOT NULL, UNIQUE)
- subscribed_at (TIMESTAMPTZ)
```
**Purpose**: Newsletter subscription management

#### 13. **contact_messages** - Contact Form Submissions
```sql
- id (UUID, PK)
- name (TEXT, NOT NULL)
- email (TEXT, NOT NULL)
- subject (TEXT, NOT NULL)
- message (TEXT, NOT NULL)
- read (BOOLEAN, DEFAULT false)
- created_at (TIMESTAMPTZ)
```
**Purpose**: Contact form message storage

### Enums

#### **app_role**
- `admin` - Full system access
- `moderator` - Content moderation (defined but not fully utilized)
- `member` - Default user role

#### **project_status**
- `active` - Project in progress
- `completed` - Project finished
- `archived` - Project archived

#### **event_status**
- `upcoming` - Scheduled future event
- `ongoing` - Currently happening
- `completed` - Past event
- `cancelled` - Cancelled event

## Database Functions

### 1. **has_role(_user_id UUID, _role app_role) → BOOLEAN**
```sql
Purpose: Check if a user has a specific role
Type: STABLE, SECURITY DEFINER
Returns: true if user has the role, false otherwise
```
**Usage**: Used in RLS policies for role-based access

### 2. **is_admin(_user_id UUID) → BOOLEAN**
```sql
Purpose: Check if a user is an admin
Type: STABLE, SECURITY DEFINER
Returns: true if user has admin role
```
**Usage**: Primary function for admin checks in RLS policies

### 3. **handle_new_user() → TRIGGER**
```sql
Purpose: Auto-create profile and assign member role on user signup
Type: TRIGGER FUNCTION
Actions:
  - Creates profile record with full_name from metadata
  - Assigns 'member' role to new user
```
**Trigger**: Fires AFTER INSERT on auth.users

### 4. **update_updated_at() → TRIGGER**
```sql
Purpose: Automatically update updated_at timestamp
Type: TRIGGER FUNCTION
Applied to: profiles, projects, events, blog_posts
```
**Trigger**: Fires BEFORE UPDATE on respective tables

## Row Level Security (RLS) Policies

### Security Model
All tables have RLS enabled. Policies are defined per operation (SELECT, INSERT, UPDATE, DELETE).

### Policy Categories

#### **Public Read Policies**
- **profiles**: Everyone can view
- **user_roles**: Everyone can view (for UI role display)
- **projects**: Public read access
- **events**: Public read access
- **event_registrations**: Public read (for registration counts)
- **blog_posts**: Only published posts are public (authors/admins see drafts)
- **resources**: Public read
- **gallery_images**: Public read
- **faqs**: Public read
- **achievements**: Public read

#### **Authenticated User Policies**
- **projects**: Authenticated users can create
- **events**: Authenticated users can create
- **blog_posts**: Authenticated users can create
- **resources**: Authenticated users can create
- **gallery_images**: Authenticated users can upload
- **event_registrations**: Users can register (with user_id check)

#### **Owner-Based Policies**
- **profiles**: Users can update their own profile
- **projects**: Creators can update/delete their projects
- **events**: Creators can update/delete their events
- **blog_posts**: Authors can update/delete their posts
- **resources**: Creators can update/delete their resources
- **gallery_images**: Uploaders can delete their images
- **event_registrations**: Users can unregister from events

#### **Admin-Only Policies**
- **user_roles**: Admins can manage all roles
- **faqs**: Admins can manage all FAQs
- **achievements**: Admins can manage all achievements
- **newsletter_subscribers**: Admins can view subscribers
- **contact_messages**: Admins can view and update messages
- **All tables**: Admins can update/delete any record (via creator/admin checks)

#### **Special Policies**
- **newsletter_subscribers**: Anyone can subscribe (INSERT), only admins can read
- **contact_messages**: Anyone can send messages (INSERT), only admins can read

## API Usage Patterns

### Authentication Flow

#### Sign Up
```typescript
await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/`,
    data: { full_name: fullName }
  }
});
```
**Result**: 
- User created in auth.users
- Profile auto-created via trigger
- Member role assigned via trigger

#### Sign In
```typescript
await supabase.auth.signInWithPassword({
  email,
  password
});
```

#### Session Management
```typescript
// Get current session
const { data: { session } } = await supabase.auth.getSession();

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  // Handle auth state changes
});
```

### Data Query Patterns

#### Simple Select
```typescript
// Blog posts with author info
const { data, error } = await supabase
  .from("blog_posts")
  .select(`
    *,
    profiles:author_id (full_name)
  `)
  .eq("published", true)
  .order("published_at", { ascending: false });
```

#### Nested Relations
```typescript
// Events with registrations
const { data, error } = await supabase
  .from("events")
  .select(`
    *,
    event_registrations (id, user_id)
  `)
  .eq("id", eventId)
  .single();
```

#### Filtering and Ordering
```typescript
// Resources by category
const { data, error } = await supabase
  .from("resources")
  .select("*")
  .order("created_at", { ascending: false });
```

### Data Mutation Patterns

#### Insert
```typescript
// Newsletter subscription
await supabase
  .from("newsletter_subscribers")
  .insert([{ email }]);

// Event registration
await supabase
  .from("event_registrations")
  .insert([{ event_id: id, user_id: user.id }]);
```

#### Update
```typescript
// Profile update (RLS ensures user can only update own)
await supabase
  .from("profiles")
  .update({ full_name, bio })
  .eq("id", userId);
```

#### Delete
```typescript
// Unregister from event
await supabase
  .from("event_registrations")
  .delete()
  .eq("event_id", eventId)
  .eq("user_id", userId);
```

### Role Checking Pattern
```typescript
// Check admin status
const { data } = await supabase
  .from("user_roles")
  .select("role")
  .eq("user_id", userId)
  .eq("role", "admin")
  .maybeSingle();

const isAdmin = !!data;
```

## Backend Features

### ✅ Implemented Features

1. **User Management**
   - Email/password authentication
   - Auto-profile creation
   - Role assignment
   - Session persistence

2. **Content Management**
   - Projects CRUD
   - Events CRUD
   - Blog posts with publish workflow
   - Resources management
   - Gallery images

3. **Event System**
   - Event creation and management
   - User registration tracking
   - Capacity management (max_attendees field)

4. **Blog System**
   - Draft/publish workflow
   - SEO-friendly slugs
   - Author attribution

5. **Newsletter**
   - Email subscription
   - Duplicate prevention (UNIQUE constraint)

6. **Contact System**
   - Message storage
   - Read/unread tracking

### ⚠️ Partially Implemented

1. **Projects Page**
   - Currently uses hardcoded data
   - Database schema ready but not connected

2. **Events Page**
   - Currently uses hardcoded data
   - EventDetail page has database integration
   - Database schema ready

3. **Admin Dashboard**
   - UI exists but shows placeholder data
   - No CRUD operations implemented
   - Database queries not connected

### ❌ Not Implemented

1. **Image Upload**
   - Supabase Storage not configured
   - image_url fields exist but no upload functionality

2. **Real-time Features**
   - Supabase Realtime not utilized
   - Could add live updates for events, projects

3. **Search Functionality**
   - No full-text search
   - No filtering beyond basic category

4. **Email Notifications**
   - No email service integration
   - Newsletter subscription doesn't send emails

5. **File Storage**
   - No Supabase Storage bucket configuration
   - Images must be hosted externally

6. **Moderator Role**
   - Defined in enum but no policies use it
   - No moderator-specific features

## Security Analysis

### ✅ Strengths

1. **Comprehensive RLS**
   - All tables protected
   - Granular permissions
   - Role-based access control

2. **Secure Functions**
   - SECURITY DEFINER functions properly scoped
   - search_path set to prevent injection

3. **Authentication**
   - JWT-based sessions
   - Auto token refresh
   - Secure session storage

4. **Data Validation**
   - NOT NULL constraints
   - UNIQUE constraints
   - Foreign key relationships
   - Enum types for status fields

5. **Owner Verification**
   - Policies check created_by/auth.uid()
   - Prevents unauthorized modifications

### ⚠️ Considerations

1. **Email Verification**
   - Signup doesn't require email confirmation (may be configured in Supabase dashboard)

2. **Rate Limiting**
   - No application-level rate limiting
   - Relies on Supabase defaults

3. **Input Sanitization**
   - Client-side only
   - Should add server-side validation via database functions

4. **File Upload Security**
   - No file type/size validation (when implemented)
   - No virus scanning

## Database Migrations

### Migration Files

1. **20251118164213_ff5e8128-e608-461e-b439-d331ceabc6c7.sql**
   - Initial schema creation
   - All tables, enums, functions, triggers, policies

2. **20251118164225_a0308dea-7cb0-4792-a06c-a196f40638b6.sql**
   - Fix for update_updated_at function
   - Adds SECURITY DEFINER and search_path

### Migration Strategy
- Versioned migrations
- UUID-based migration names
- Can be applied via Supabase CLI or dashboard

## Performance Considerations

### Indexes
- Primary keys (automatic indexes)
- Foreign keys (automatic indexes)
- UNIQUE constraints (automatic indexes)
- **Missing**: No custom indexes on frequently queried fields
  - Consider indexes on: published_at, event_date, status fields

### Query Optimization
- Use `.select()` to limit returned columns
- Use `.single()` for single row queries
- Use `.maybeSingle()` for optional queries
- Consider pagination for large datasets

### Potential Optimizations
1. Add indexes on:
   - `blog_posts.published_at` (for ordering)
   - `events.event_date` (for filtering)
   - `projects.status` (for filtering)
   - `resources.category` (for filtering)

2. Consider materialized views for:
   - Dashboard statistics
   - Popular projects/events

3. Implement pagination:
   - Blog posts listing
   - Projects listing
   - Events listing

## Backend Integration Status

### Fully Integrated Pages
- ✅ **Blog.tsx** - Fetches published posts from database
- ✅ **BlogPost.tsx** - Fetches individual post by slug
- ✅ **EventDetail.tsx** - Fetches event with registrations, handles registration
- ✅ **Resources.tsx** - Fetches resources from database
- ✅ **Newsletter.tsx** - Subscribes emails to database
- ✅ **Auth.tsx** - Full authentication flow
- ✅ **ProtectedRoute.tsx** - Role checking from database

### Partially Integrated
- ⚠️ **Projects.tsx** - Uses hardcoded data (database ready)
- ⚠️ **Events.tsx** - Uses hardcoded data (EventDetail integrated)
- ⚠️ **Admin.tsx** - UI exists, no database queries

### Not Integrated
- ❌ **Gallery.tsx** - No database queries
- ❌ **FAQ.tsx** - No database queries
- ❌ **Achievements.tsx** - No database queries
- ❌ **Contact.tsx** - No form submission to database

## Recommendations

### Immediate Improvements
1. **Connect Projects Page** - Replace hardcoded data with database queries
2. **Connect Events Page** - Replace hardcoded data with database queries
3. **Implement Admin CRUD** - Connect admin dashboard to database
4. **Add Contact Form Submission** - Store messages in database
5. **Connect FAQ Page** - Fetch FAQs from database
6. **Connect Achievements Page** - Fetch achievements from database
7. **Connect Gallery Page** - Fetch images from database

### Medium-term Enhancements
1. **Image Upload** - Configure Supabase Storage
2. **Search Functionality** - Add full-text search
3. **Pagination** - Implement for large lists
4. **Email Service** - Integrate for notifications
5. **Real-time Updates** - Use Supabase Realtime
6. **Analytics** - Track user engagement

### Long-term Optimizations
1. **Database Indexes** - Add performance indexes
2. **Caching Strategy** - Implement query caching
3. **Background Jobs** - For email sending, cleanup
4. **API Rate Limiting** - Custom rate limiting
5. **Audit Logging** - Track admin actions

## Environment Variables Required

```env
VITE_SUPABASE_URL=https://ctbiyqgooscoyxwaygun.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
```

## Database Connection

The backend uses Supabase's auto-generated REST API. No custom backend server needed. All operations go through:
- REST API: `https://<project-ref>.supabase.co/rest/v1/`
- Realtime: `wss://<project-ref>.supabase.co/realtime/v1/`
- Storage: `https://<project-ref>.supabase.co/storage/v1/`

---

**Analysis Date**: Generated automatically  
**Database Version**: PostgreSQL (via Supabase)  
**PostgREST Version**: 13.0.5

