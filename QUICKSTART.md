# Quick Start Guide

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Supabase account (free) or PostgreSQL

---

## Option 1: Use Supabase (Recommended - No Installation)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to **Settings → Database**
4. Copy the **Connection string** (URI format)

### 2. Configure Environment

```bash
cd apps/web
```

Edit `.env.local` with your Supabase credentials:

```env
# Database (from Supabase Settings → Database)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="promptpal-dev-secret-key"
```

### 3. Continue with Step 3 Below

---

## Option 2: Use Docker PostgreSQL

### 1. Start PostgreSQL Container

```bash
docker run -d --name promptpal-postgres \
  -e POSTGRES_USER=promptpal \
  -e POSTGRES_PASSWORD=promptpal123 \
  -e POSTGRES_DB=promptpal \
  -p 5432:5432 \
  postgres:15-alpine
```

### 2. Configure Environment

```env
DATABASE_URL="postgresql://promptpal:promptpal123@localhost:5432/promptpal"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="promptpal-dev-secret-key"
```

---

## Installation Steps

### 3. Install Dependencies

```bash
cd promptpal
npm install
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

### 5. Start Development

```bash
npm run dev
```

Visit http://localhost:3000

---

## Chrome Extension Setup

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select `extensions/chrome` folder
5. Extension icon appears in toolbar

---

## Project Structure

```
promptpal/
├── apps/
│   └── web/                    # Next.js 14 App
│       ├── app/
│       │   ├── page.tsx       # Landing page
│       │   ├── (auth)/        # Login/Register
│       │   ├── (main)/        # Dashboard
│       │   └── api/           # API routes
│       └── components/
│
├── packages/
│   ├── db/                    # Prisma schema
│   └── config/               # Models & prompts
│
└── extensions/
    └── chrome/                # Browser extension
```

---

## Configuration

### AI APIs (Optional)

```env
# Add to .env.local
OPENAI_API_KEY="sk-..."
```

### Enable OAuth (Optional)

```env
GOOGLE_CLIENT_ID="your-id"
GOOGLE_CLIENT_SECRET="your-secret"

WECHAT_APP_ID="your-appid"
WECHAT_APP_SECRET="your-secret"
```

---

## Deployment

### Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

---

## Support

Open an issue on [GitHub](https://github.com/lxztry/promptpal)
