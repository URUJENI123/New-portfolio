# Quick Start Guide

Get your portfolio running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A PostgreSQL database (free options: Neon, Railway, AWS RDS)
- (Optional) Gmail account for email notifications

## 1. Clone & Install

```bash
# Install dependencies
npm install
```

## 2. Setup Database

Copy your PostgreSQL connection string and save it.

**Create tables** by running this SQL in your database client:

```sql
CREATE TABLE projects (
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

CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  page VARCHAR(255),
  event_type VARCHAR(255),
  data JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Environment Setup

Create `.env.local` file:

```env
DATABASE_URL=postgresql://user:password@host:port/portfolio
ADMIN_PASSWORD=your-super-secret-password
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Email notifications
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-email@gmail.com
```

## 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 5. Access Admin Dashboard

1. Go to http://localhost:3000/admin/login
2. Enter your `ADMIN_PASSWORD`
3. Add your first project!

## Pages

- **Home**: http://localhost:3000/
- **Projects**: http://localhost:3000/projects
- **About**: http://localhost:3000/about
- **Contact**: http://localhost:3000/contact
- **Admin**: http://localhost:3000/admin/login

## Customize Your Portfolio

Edit these files:

- `app/page.tsx` - Homepage content
- `app/about/page.tsx` - About section
- `components/footer.tsx` - Footer & social links
- `app/globals.css` - Colors and theme

## Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial portfolio setup"
git push

# Go to vercel.com/new and import your repo
# Add environment variables and deploy!
```

## Next Steps

- Add your profile picture
- Customize colors in `app/globals.css`
- Add your first projects via admin dashboard
- Configure email (Gmail guide in README_SETUP.md)
- Deploy to production

## Need Help?

See `README_SETUP.md` for detailed setup instructions and troubleshooting.
