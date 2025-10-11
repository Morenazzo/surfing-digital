# 🚀 Neon Database Setup - Surfing Digital

## ✅ Schema Updated for Neon

Your Prisma schema is now configured to work with Neon's connection pooling.

## 📝 Update Your .env File

**IMPORTANT:** You need to update your `.env` file with both connection URLs.

Open your `.env` file and make sure it has **BOTH** lines:

```env
# Pooled connection (for application queries)
DATABASE_URL="postgresql://neondb_owner:npg_SopvfH3w9bLy@ep-soft-truth-ad5dmvnn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Direct connection (for migrations) - UNCOMMENT THIS LINE!
DATABASE_URL_UNPOOLED="postgresql://neondb_owner:npg_SopvfH3w9bLy@ep-soft-truth-ad5dmvnn.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### Why Two URLs?

- **DATABASE_URL** (pooled): Used by your app for fast queries
- **DATABASE_URL_UNPOOLED** (direct): Used for migrations and schema changes

## 🔧 Run Migrations

After updating your `.env` file, run:

```bash
# Create the database tables
npx prisma migrate dev --name init

# Open Prisma Studio to view your database
npx prisma studio
```

## ✨ What You'll Get

Your Neon database will have these tables:

### User
- id, email (unique), name
- timestamps

### Assessment  
- User's 5-minute AI assessment
- Company details (name, industry, size, challenges, goals)
- AI Results as JSON:
  - topProjects (Top 3 AI recommendations)
  - roiEstimates (ROI calculations)
  - actionPlan (30-60-90 day plan)
- Status tracking

### Note
- Simple notes linked to users
- title, content

## 🎯 Quick Start

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
    topProjects: [
      {
        id: 1,
        title: 'AI Customer Service Bot',
        description: 'Automate 60% of support tickets',
        estimatedROI: 150000,
        implementation: '30-60 days'
      },
      // ... top 3 projects
    ]
  },
})
```

## 🔐 Security Note

Remember to add `.env` to your `.gitignore` to keep your database credentials secure!

---

Need help? Check the [Neon Docs](https://neon.tech/docs/introduction) or [Prisma + Neon Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-neon)

