# Quick Start Guide

## Project Setup

### 1. Install Dependencies

```bash
cd promptpal
npm install
```

### 2. Configure Environment

```bash
cd apps/web
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Database (required)
DATABASE_URL="postgresql://user:password@localhost:5432/promptpal"

# NextAuth (required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# WeChat Login (optional)
WECHAT_APP_ID="your-wechat-appid"
WECHAT_APP_SECRET="your-wechat-secret"

# AI APIs (optional)
OPENAI_API_KEY="sk-..."
```

### 3. Initialize Database

```bash
npm run db:push
npm run db:generate
```

### 4. Start Development

```bash
npm run dev
```

Visit http://localhost:3000

## Chrome Extension Setup

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `extensions/chrome` folder
5. The extension icon will appear in your toolbar

## Project Structure

```
promptpal/
├── apps/
│   └── web/                    # Next.js web application
│       ├── app/
│       │   ├── api/           # API routes
│       │   ├── (auth)/        # Auth pages
│       │   ├── (main)/        # Main app pages
│       │   └── page.tsx       # Landing page
│       └── components/         # React components
│
├── packages/
│   ├── db/                    # Prisma database schema
│   └── config/               # Shared configuration
│
└── extensions/
    └── chrome/                # Browser extension
        ├── popup/            # Extension popup UI
        ├── content/         # Content scripts
        └── background/      # Background service worker
```

## Key Features

### Web Application
- Landing page with feature showcase
- User authentication (Email, Google, WeChat)
- Prompt generation from text or image
- Style selection (Photo, Anime, 3D, etc.)
- Image/Video generation with multiple AI models
- Generation history

### Browser Extension
- Right-click menu on selected text
- Right-click menu on images
- Quick prompt generation
- Copy prompt to clipboard
- Open in web app for full features

## Configuration

### Enable/Disable OAuth Providers

In `.env.local`:

```env
# To enable Google login:
GOOGLE_CLIENT_ID="your-id"
GOOGLE_CLIENT_SECRET="your-secret"

# To enable WeChat login:
WECHAT_APP_ID="your-appid"
WECHAT_APP_SECRET="your-secret"

# To disable, simply leave these empty
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Railway

1. Create Railway project
2. Add PostgreSQL database
3. Deploy from GitHub
4. Set environment variables

## Support

For issues and questions, please open an issue on GitHub.
