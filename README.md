# 🌊 Surfing Digital - AI Business Assessment Platform

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.17.0-2D3748?logo=prisma)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai)

Discover your top 3 AI projects with measurable ROI in just 5 minutes. Through our smart business assessment, we identify high-impact use cases, estimate financial returns, and generate a 30-60-90 day action plan to turn AI insights into real profit.

## 🚀 Features

- **Smart Business Assessment**: AI-powered form that analyzes business operations
- **Top 3 AI Project Recommendations**: Prioritized by ROI and implementation feasibility
- **ROI Estimates**: Specific financial projections for each recommended project
- **30-60-90 Day Action Plans**: Detailed implementation roadmap with clear milestones
- **Real-time Processing**: Assessment results generated in seconds using OpenAI GPT-4o-mini
- **Beautiful Results Page**: Professional, print-friendly reports for client presentations
- **Webhook Integration**: Seamless integration with Fillout.com for form submissions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **AI**: [OpenAI API](https://openai.com/) (GPT-4o-mini)
- **Forms**: [Fillout.com](https://fillout.com/)
- **Authentication**: [Clerk](https://clerk.com/) (optional)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (we recommend [Neon](https://neon.tech/) for serverless PostgreSQL)
- OpenAI API key
- Fillout.com account (paid plan for webhooks)
- ngrok or similar for webhook testing (optional for local development)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/surfing-digital.git
   cd surfing-digital
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your credentials:
   ```env
   DATABASE_URL="postgresql://..."
   DATABASE_URL_UNPOOLED="postgresql://..."
   OPENAI_API_KEY="sk-proj-..."
   FILLOUT_WEBHOOK_SECRET="your_secret"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

```prisma
model User {
  id          String       @id @default(cuid())
  email       String       @unique
  name        String?
  assessments Assessment[]
  notes       Note[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Assessment {
  id                String   @id @default(cuid())
  userId            String
  companyName       String?
  industry          String?
  companySize       String?
  currentChallenges String?
  goals             String?
  topProjects       Json     @default("[]")
  roiEstimates      Json     @default("{}")
  actionPlan        Json     @default("{}")
  status            String   @default("in_progress")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  user              User     @relation(fields: [userId], references: [id])
}
```

## 🔗 Fillout Integration

1. Create a form on [Fillout.com](https://fillout.com/) with these fields:
   - Company Name (Short Answer)
   - Industry (Dropdown)
   - Number of employees (Number Input)
   - What are your current business challenges? (Long Answer)
   - What goals do you want to achieve with AI? (Long Answer)
   - Email (Email Input)

2. Set up webhook in Fillout:
   - Go to Settings → Webhooks
   - Add webhook URL: `https://your-domain.com/api/fillout?secret=your_secret`
   - Enable for form submissions

3. For local testing, use ngrok:
   ```bash
   ngrok http 3000
   # Use the ngrok URL in Fillout webhook settings
   ```

## 🤖 AI Prompt Customization

The AI assessment generation is handled in `src/lib/openai.ts`. You can customize:

- **Model**: Change from `gpt-4o-mini` to `gpt-4` for better quality (higher cost)
- **Temperature**: Adjust creativity (0.0 = deterministic, 1.0 = creative)
- **Prompt**: Modify the system and user prompts to change AI behavior
- **Max Tokens**: Increase for longer responses

Example:
```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini', // or 'gpt-4'
  temperature: 0.7,
  max_tokens: 2000,
  // ...
});
```

## 📊 Prisma Studio

View and manage your database data:

```bash
npx prisma studio
```

Visit [http://localhost:5555](http://localhost:5555) to access Prisma Studio.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/)
3. Add environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel project:
- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`
- `OPENAI_API_KEY`
- `FILLOUT_WEBHOOK_SECRET`
- `NEXT_PUBLIC_BASE_URL` (your production URL)

## 📝 API Endpoints

- `GET /` - Landing page
- `POST /api/fillout?secret=xxx` - Webhook endpoint for Fillout submissions
- `GET /results/[assessmentId]` - Assessment results page

## 🎨 Customization

### Colors

The primary color is defined in `tailwind.config.js` and CSS:
- Primary: `#0BB7B7` (turquoise)

To change, update:
1. CSS variables in `src/app/globals.css`
2. Hardcoded colors in components (search for `#0BB7B7`)

### Branding

- Logo/Name: Update in `src/app/layout.tsx` and `src/app/page.tsx`
- Favicon: Replace files in `/public/` directory
- SEO: Update metadata in `src/app/layout.tsx`

## 🧪 Testing

Test the webhook locally:

```bash
curl -X POST "http://localhost:3000/api/fillout?secret=super_secret_123" \
  -H "Content-Type: application/json" \
  -d @test-fillout-webhook.json
```

## 📄 License

MIT License - feel free to use this project for your business!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, contact:
- Email: hello@surfing.digital
- Website: [surfing.digital](https://surfing.digital)

---

Built with ❤️ by Surfing Digital · Ride the AI Wave — from Idea to ROI
