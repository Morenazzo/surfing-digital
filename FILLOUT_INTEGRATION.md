# 📋 Fillout Integration - Surfing Digital

## Overview

Fillout.com is integrated to handle the 5-minute AI assessment form. When users complete the form, Fillout sends the data to our webhook endpoint.

## 🔗 Webhook Endpoint

```
POST /api/fillout
```

**Local:** `http://localhost:3000/api/fillout`  
**Production:** `https://www.surfing.digital/api/fillout`

## 🚀 Setup Instructions

### 1. Create Your Fillout Form

1. Go to [Fillout.com](https://fillout.com)
2. Create a new form
3. Add questions for your assessment:
   - Email (required)
   - Name
   - Company Name
   - Industry
   - Company Size
   - Current Challenges
   - Business Goals
   - (Add more as needed)

### 2. Configure Webhook in Fillout

1. In your Fillout form settings
2. Go to **Integrations** → **Webhooks**
3. Add webhook URL:
   - Development: Use [ngrok](https://ngrok.com) or [localtunnel](https://localtunnel.github.io/www/)
   - Production: `https://www.surfing.digital/api/fillout`

### 3. Test the Webhook

**Local Testing with ngrok:**

```bash
# Terminal 1: Start your dev server
npm run dev

# Terminal 2: Start ngrok
ngrok http 3000

# Use the ngrok URL in Fillout:
# https://abc123.ngrok.io/api/fillout
```

**Test the endpoint:**

```bash
# Health check
curl http://localhost:3000/api/fillout

# Test webhook (example payload)
curl -X POST http://localhost:3000/api/fillout \
  -H "Content-Type: application/json" \
  -d '{
    "submissionId": "test123",
    "formId": "your-form-id",
    "questions": [
      {
        "id": "email",
        "name": "email",
        "value": "test@example.com"
      },
      {
        "id": "companyName",
        "name": "companyName",
        "value": "Acme Corp"
      }
    ]
  }'
```

## 📊 What Happens When Form is Submitted

1. **User completes form** on Fillout
2. **Fillout sends webhook** to `/api/fillout`
3. **Our API processes** the data:
   - Finds or creates user in database
   - Creates assessment record
   - Saves form data
4. **Ready for AI processing** (next step in your flow)

## 🗄️ Database Schema

The webhook saves data to these tables:

```typescript
// User table
{
  id: string
  email: string
  name: string?
  createdAt: DateTime
}

// Assessment table
{
  id: string
  userId: string
  companyName: string?
  industry: string?
  companySize: string?
  currentChallenges: string?
  goals: string?
  status: 'in_progress' | 'completed'
  topProjects: Json  // Stores raw form data
  createdAt: DateTime
}
```

## 🔧 Customizing the Webhook

Edit `src/app/api/fillout/route.ts` to:

1. **Map your form fields:**
```typescript
const {
  email,
  companyName,
  // Add your custom fields here
  customField1,
  customField2,
} = formData
```

2. **Add validation:**
```typescript
if (!email || !companyName) {
  return NextResponse.json(
    { error: 'Missing required fields' },
    { status: 400 }
  )
}
```

3. **Trigger AI processing:**
```typescript
// After creating assessment
await processWithAI(assessment.id)
```

## 🔐 Security (Optional)

Add webhook signature verification:

```typescript
// In your route.ts
const signature = req.headers.get('x-fillout-signature')
const secret = process.env.FILLOUT_WEBHOOK_SECRET

if (signature !== expectedSignature) {
  return NextResponse.json(
    { error: 'Invalid signature' },
    { status: 401 }
  )
}
```

Add to `.env`:
```env
FILLOUT_WEBHOOK_SECRET=your_webhook_secret
```

## 📝 Example Fillout Payload

```json
{
  "submissionId": "sub_123abc",
  "formId": "form_456def",
  "submittedAt": "2024-01-15T10:30:00Z",
  "questions": [
    {
      "id": "q1",
      "name": "email",
      "type": "email",
      "value": "user@example.com"
    },
    {
      "id": "q2",
      "name": "companyName",
      "type": "text",
      "value": "Acme Corporation"
    },
    {
      "id": "q3",
      "name": "industry",
      "type": "dropdown",
      "value": "Technology"
    }
  ]
}
```

## 🎯 Next Steps After Webhook

After receiving the form submission:

1. **Send confirmation email** to user
2. **Process with AI** (OpenAI, Anthropic, etc.)
3. **Generate recommendations** (top 3 AI projects)
4. **Calculate ROI** estimates
5. **Create 30-60-90 day plan**
6. **Update assessment** status to 'completed'
7. **Notify user** results are ready

## 🧪 Testing Checklist

- [ ] Webhook endpoint responds to GET (health check)
- [ ] Webhook accepts POST with form data
- [ ] User is created/found in database
- [ ] Assessment is saved with correct data
- [ ] Error handling works (missing fields, etc.)
- [ ] Logs show submission details
- [ ] (Optional) Signature verification works

## 🔍 Debugging

Check logs:
```bash
# Development
npm run dev
# Watch console for: "📝 Fillout webhook received:"

# Production (Vercel)
vercel logs
```

View database:
```bash
npx prisma studio
```

## 📚 Resources

- [Fillout Documentation](https://www.fillout.com/help)
- [Fillout Webhooks Guide](https://www.fillout.com/help/webhooks)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

Ready to collect assessments! 📋✨

