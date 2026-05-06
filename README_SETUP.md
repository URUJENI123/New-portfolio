# Advanced Portfolio - Setup Guide

This is an advanced, Next.js-powered portfolio with a PostgreSQL backend, admin dashboard, and analytics tracking.

## Features

- **Modern Design**: Clean, responsive UI with dark/light mode support
- **Dynamic Projects**: Manage projects from the admin dashboard
- **Contact Form**: Email notifications with nodemailer
- **Analytics**: Track page views and user interactions
- **Admin Dashboard**: Manage projects and view contact messages
- **Type-Safe**: Built with TypeScript
- **Optimized**: Server-side rendering and static generation

## Prerequisites

Before you start, you need:

1. **PostgreSQL Database** - You can use:
   - Neon (https://neon.tech) - Recommended, serverless PostgreSQL
   - Local PostgreSQL installation
   - Any other PostgreSQL provider

2. **Email Setup** (for contact form notifications):
   - Gmail account with App Password
   - Or any SMTP-compatible email service

## Step 1: Database Setup

### Option A: Using Neon (Recommended)

1. Go to https://neon.tech and create a free account
2. Create a new project
3. Copy your connection string (looks like: `postgresql://user:password@...`)

### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a new database:
   ```bash
   createdb portfolio
   ```
3. Get your connection string:
   ```
   postgresql://postgres:your_password@localhost:5432/portfolio
   ```

### Create Database Tables

Once you have your database URL, run the initialization script:

```bash
# Set your DATABASE_URL in .env.local first
node -e "require('dotenv').config(); require('./lib/init-db').initializeDatabase().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); })"
```

Or manually run these SQL queries in your database:

```sql
-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  technologies VARCHAR(255),
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  page VARCHAR(255),
  event_type VARCHAR(255),
  data JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page);
```

## Step 2: Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables:

   ```env
   # Database Connection (required)
   DATABASE_URL=postgresql://user:password@host:port/portfolio

   # Email Configuration (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=your-email@gmail.com

   # Admin Password (for admin dashboard)
   ADMIN_PASSWORD=your-secure-password-here

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Getting Gmail App Password

1. Enable 2-Factor Authentication on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an app password for "Mail" and "Windows Computer"
4. Copy the 16-character password to `EMAIL_PASS` in `.env.local`

## Step 3: Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

## Step 4: Admin Dashboard

1. Navigate to http://localhost:3000/admin/login
2. Enter your `ADMIN_PASSWORD` from `.env.local`
3. Manage projects and view messages

## Directory Structure

```
app/
├── api/               # API routes
│   ├── projects/      # Project management
│   ├── contact/       # Contact form
│   └── analytics/     # Analytics tracking
├── admin/             # Admin dashboard
│   ├── login/         # Admin login
│   └── dashboard/     # Dashboard pages
├── projects/          # Projects page
├── about/             # About page
├── contact/           # Contact page
└── page.tsx           # Homepage

components/           # Reusable components
lib/                  # Utilities and helpers
  ├── db.ts           # Database connection
  ├── email.ts        # Email utilities
  └── analytics.ts    # Analytics utilities
```

## Key Pages

- **Home**: `/` - Landing page with featured projects
- **Projects**: `/projects` - All projects (dynamic from DB)
- **About**: `/about` - Your background and skills
- **Contact**: `/contact` - Contact form
- **Admin Login**: `/admin/login` - Admin authentication
- **Admin Dashboard**: `/admin/dashboard` - Manage content

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables in project settings
5. Deploy!

### Environment Variables on Vercel

Add these to your Vercel project settings (Settings → Environment Variables):

- `DATABASE_URL` - Your PostgreSQL connection string
- `EMAIL_USER` - Your email
- `EMAIL_PASS` - Your app password
- `EMAIL_TO` - Recipient email
- `ADMIN_PASSWORD` - Your admin password

## Customization

### Update Portfolio Info

Edit these files to personalize:

- `app/page.tsx` - Homepage content
- `app/about/page.tsx` - About section
- `components/footer.tsx` - Footer links and social media
- `app/globals.css` - Colors and design tokens

### Change Colors

Edit design tokens in `app/globals.css`:

```css
:root {
  --color-background: 0 0% 100%;
  --color-foreground: 0 0% 3.6%;
  --color-primary: 220 90% 56%;  /* Main brand color */
  /* ... other colors ... */
}
```

### Add More Projects

Use the Admin Dashboard:

1. Go to `/admin/dashboard`
2. Click "Add Project"
3. Fill in project details
4. Click "Save Project"

Projects will instantly appear on your portfolio!

## Troubleshooting

### Database Connection Error

- Verify `DATABASE_URL` in `.env.local`
- Ensure database is running and accessible
- Check firewall rules if using remote database

### Email Not Sending

- Verify `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO` are correct
- Check Gmail App Password is valid
- Ensure 2FA is enabled on Gmail account

### Admin Login Not Working

- Clear session/cookies and try again
- Verify `ADMIN_PASSWORD` matches in `.env.local`
- Check console for errors

## Support

For issues or questions:

1. Check the error message carefully
2. Review environment variables
3. Check database connectivity
4. Review console logs in terminal and browser

## License

ISC
