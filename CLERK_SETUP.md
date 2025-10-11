# 🔐 Clerk Authentication Setup - Surfing Digital

## ✅ What's Been Installed

Clerk authentication is now integrated into your Surfing Digital app using the **Next.js App Router** approach.

### Files Created/Updated:

1. ✅ **`src/middleware.ts`** - Clerk middleware for protecting routes
2. ✅ **`src/app/layout.tsx`** - Wrapped with `<ClerkProvider>`
3. ✅ **`src/components/landing/Navbar.tsx`** - Added Sign In/Sign Up buttons and User profile

## 🚀 Next Steps: Get Your Clerk Keys

### 1. Create a Clerk Account

Go to [Clerk Dashboard](https://dashboard.clerk.com/sign-up) and create a free account.

### 2. Create a New Application

- Click "Add application"
- Name it "Surfing Digital"
- Choose your authentication methods (Email, Google, etc.)

### 3. Get Your API Keys

From your Clerk Dashboard, go to **API Keys** section and copy:
- **Publishable Key** (starts with `pk_test_...`)
- **Secret Key** (starts with `sk_test_...`)

### 4. Add Keys to Your .env File

Add these lines to your `.env` file (NOT `.env.example`):

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
```

⚠️ **Important**: Never commit your `.env` file! It should already be in `.gitignore`.

## 🎨 What's Included

### Navbar Features:

**When User is Signed Out:**
- "Sign In" button (ghost style)
- "Get Started" button (primary turquoise style)
- Both open modal dialogs

**When User is Signed In:**
- User profile button (shows avatar/initials)
- Dropdown menu with:
  - Profile management
  - Settings
  - Sign out

**Mobile Responsive:**
- Hamburger menu with auth buttons
- Same functionality on mobile

## 🧪 Test Your Setup

1. **Start your dev server:**
```bash
npm run dev
```

2. **Visit:** http://localhost:3000

3. **Test authentication:**
   - Click "Get Started" to sign up
   - Create an account
   - See your profile in the navbar
   - Sign out and sign back in

## 🔒 Protecting Routes

To protect routes (e.g., dashboard, assessment pages), update your `middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/assessment(.*)',
  '/api/assessment(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

## 🔗 Sync Users with Your Database

To save Clerk users to your Prisma database, create a webhook handler:

```typescript
// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env')
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error: Verification failed', { status: 400 })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data
    
    await prisma.user.create({
      data: {
        id, // Use Clerk's user ID
        email: email_addresses[0].email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim() || null,
      },
    })
  }

  return new Response('Webhook received', { status: 200 })
}
```

## 📚 Resources

- [Clerk Docs](https://clerk.com/docs)
- [Clerk + Next.js](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks/overview)

## 🎯 Your Setup Checklist

- [x] Install `@clerk/nextjs`
- [x] Create `middleware.ts` with `clerkMiddleware()`
- [x] Wrap app with `<ClerkProvider>`
- [x] Add auth components to Navbar
- [ ] Get Clerk API keys from dashboard
- [ ] Add keys to `.env` file
- [ ] Test sign up/sign in
- [ ] (Optional) Set up webhooks for user sync
- [ ] (Optional) Protect routes in middleware

---

Ready to authenticate! 🌊🔐✨

