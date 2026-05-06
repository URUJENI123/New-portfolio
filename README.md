# Advanced Next.js Portfolio

A modern, full-stack portfolio application built with Next.js 16, PostgreSQL, and TypeScript. Features a public portfolio site, admin dashboard for content management, and built-in analytics.

## 🚀 Quick Start

1. **Read QUICKSTART.md** - Get running in 5 minutes
2. **Set up PostgreSQL** - Create database and tables
3. **Configure .env.local** - Add your environment variables
4. **Run the dev server** - `npm run dev`
5. **Visit http://localhost:3000** - Your portfolio is live!

## ✨ Features

- 🎨 **Modern Design** - Responsive UI with Tailwind CSS
- 🌓 **Dark/Light Mode** - Built-in theme toggle
- 📱 **Mobile First** - Fully responsive on all devices
- 🗄️ **Database-Driven** - PostgreSQL backend with dynamic content
- 👨‍💼 **Admin Dashboard** - Manage projects and view contact messages
- 📧 **Email Notifications** - Contact form with email alerts
- 📊 **Analytics** - Track page views and user interactions
- 🔐 **Secure** - Password-protected admin area
- ⚡ **Fast** - Server-side rendering and optimized performance
- 🚀 **Production-Ready** - Deploy to Vercel or any platform

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Fast setup (5 minutes)
- **[README_SETUP.md](./README_SETUP.md)** - Detailed setup guide
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Production checklist
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Documentation index

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **next-themes** - Dark mode

### Backend
- **Next.js API Routes** - Serverless functions
- **PostgreSQL** - Database
- **Node.js pg** - Database client
- **Nodemailer** - Email service

## 📂 Project Structure

```
app/
  ├── page.tsx              # Homepage
  ├── about/page.tsx        # About page
  ├── projects/page.tsx     # Projects page
  ├── contact/page.tsx      # Contact page
  ├── api/                  # Backend API routes
  ├── admin/                # Admin dashboard
  └── globals.css           # Global styles

components/               # Reusable components
  ├── navbar.tsx
  ├── footer.tsx
  ├── theme-toggle.tsx
  └── analytics.tsx

lib/                     # Utilities
  ├── db.ts             # Database connection
  ├── email.ts          # Email utilities
  └── analytics.ts      # Analytics tracking
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- (Optional) Gmail account for emails

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (copy from .env.example)
cp .env.example .env.local

# 3. Add your database connection string to .env.local
# DATABASE_URL=postgresql://...

# 4. Create database tables (see README_SETUP.md)

# 5. Run development server
npm run dev
```

Visit http://localhost:3000

## 📖 Common Tasks

### Add a Project
1. Go to http://localhost:3000/admin/login
2. Enter your admin password
3. Click "Add Project"
4. Fill in details and save

### Customize Design
1. Edit `app/globals.css` - Change colors
2. Edit `components/navbar.tsx` - Modify navigation
3. Edit `app/page.tsx` - Update homepage content

### Enable Email Notifications
1. Set up Gmail App Password
2. Add to `.env.local`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=recipient@example.com
   ```

### Deploy to Production
1. Read DEPLOYMENT_CHECKLIST.md
2. Push to GitHub
3. Deploy to Vercel (or another platform)
4. Add environment variables
5. Done!

## 🔐 Admin Access

- **URL**: http://localhost:3000/admin/login
- **Password**: Set via `ADMIN_PASSWORD` in `.env.local`
- **Manage**: Projects, contact messages, analytics

## 📊 Analytics

Automatically tracks:
- Page views
- User interactions
- IP addresses
- User agents

Access in admin dashboard at `/admin/dashboard`

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push

# Go to vercel.com/new and import repo
# Add environment variables and deploy!
```

### Other Platforms
- Railway, Render, Fly.io, AWS, etc.
- See DEPLOYMENT_CHECKLIST.md for detailed steps

## 🔑 Environment Variables

```env
# Required
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=your-secure-password

# Optional (email notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@example.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in values.

## 📝 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## 🐛 Troubleshooting

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Ensure database is running
- Check firewall/network access

### Email Not Working
- Verify email credentials
- Check spam folder
- Review `lib/email.ts` configuration

### Admin Login Not Working
- Verify `ADMIN_PASSWORD` in `.env.local`
- Clear browser cookies
- Check console for errors

See README_SETUP.md for more troubleshooting.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Neon Database](https://neon.tech/docs)

## 🤝 Support

For help:
1. Check relevant documentation file
2. Review troubleshooting sections
3. Check error messages in browser console
4. Verify environment variables

## 📄 License

ISC

---

## Next Steps

1. ✅ Read QUICKSTART.md
2. ✅ Set up PostgreSQL database
3. ✅ Configure `.env.local`
4. ✅ Run `npm run dev`
5. ✅ Visit http://localhost:3000
6. ✅ Go to `/admin/login` with your password
7. ✅ Add your first project
8. ✅ Customize your portfolio
9. ✅ Deploy to production!

**Ready?** Start with [QUICKSTART.md](./QUICKSTART.md)
