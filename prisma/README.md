# Surfing Digital - Database Setup

## Schema Overview

Simple and clean database structure for Surfing Digital:

### Tables

1. **User** - User accounts
   - id, email, name, timestamps
   
2. **Assessment** - AI project assessments
   - User info, company details
   - Assessment questions & responses
   - AI-generated results (top 3 projects, ROI, action plan)
   - Status tracking
   
3. **Note** - User notes
   - Simple note-taking functionality
   - Linked to users

## Setup Instructions

### 1. Set up PostgreSQL

You need a PostgreSQL database. Options:

**Local PostgreSQL:**
```bash
# macOS with Homebrew
brew install postgresql@14
brew services start postgresql@14
createdb surfing_digital
```

**Or use a cloud provider:**
- [Supabase](https://supabase.com) (Free tier)
- [Neon](https://neon.tech) (Serverless Postgres)
- [Railway](https://railway.app) (Simple deployment)

### 2. Configure Database URL

Create a `.env` file in the root:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` with your actual database credentials:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Example for local:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/surfing_digital?schema=public"
```

### 3. Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view/edit data
npx prisma studio
```

## Useful Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name description_of_changes

# Push schema without creating migration (development)
npx prisma db push

# Open Prisma Studio (GUI for database)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Usage in Your App

```typescript
import { prisma } from '@/lib/prisma'

// Example: Create a user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
})

// Example: Create an assessment
const assessment = await prisma.assessment.create({
  data: {
    userId: user.id,
    companyName: 'Acme Corp',
    industry: 'Technology',
    status: 'in_progress',
  },
})

// Example: Get user with assessments
const userWithAssessments = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
  include: {
    assessments: true,
    notes: true,
  },
})
```

## Schema Design Philosophy

✅ **Simple** - Only essential tables
✅ **Flexible** - JSON fields for complex data (top projects, ROI, action plan)
✅ **Scalable** - Indexed fields for performance
✅ **Clean** - Cascade deletes, proper relations

## Next Steps

1. Set up authentication (NextAuth.js recommended)
2. Create API routes for assessments
3. Build assessment form components
4. Implement AI integration for recommendations

