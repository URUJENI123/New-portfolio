# Deployment Checklist

Follow this checklist before deploying your portfolio to production.

## Pre-Deployment

### Content & Customization
- [ ] Homepage hero text updated with your name/title
- [ ] About page content is personalized
- [ ] Contact page email and links updated
- [ ] Footer social media links configured
- [ ] At least one project added to the portfolio
- [ ] Profile picture uploaded (if using image upload feature)
- [ ] All typos and grammar checked

### Design
- [ ] Color scheme matches your brand (check `app/globals.css`)
- [ ] Font choices are appropriate
- [ ] Navigation looks good on mobile
- [ ] Dark mode is working correctly
- [ ] All images load properly

### Security
- [ ] Strong admin password set (min 12 characters, mix of uppercase/lowercase/numbers/symbols)
- [ ] Environment variables are not committed to git
- [ ] `.env.local` is in `.gitignore`
- [ ] Database password is strong
- [ ] Email password is app-specific (not main account password)

### Functionality Testing
- [ ] Homepage loads and displays correctly
- [ ] Projects page shows projects from database
- [ ] Contact form submits successfully
- [ ] Admin login works with correct password
- [ ] Admin can add/edit/delete projects
- [ ] Contact messages appear in admin dashboard
- [ ] Email notifications are received (if configured)
- [ ] Dark/light mode toggle works
- [ ] Navigation links work on all pages

### Database
- [ ] PostgreSQL database created and tables initialized
- [ ] Database connection string is correct
- [ ] Test INSERT/SELECT queries work
- [ ] Backups are configured (if important data)
- [ ] Connection pool settings are appropriate

### Email (if using)
- [ ] Gmail App Password is generated and working
- [ ] Sender email address is correct
- [ ] Recipient email address is correct
- [ ] Email templates look good
- [ ] Spam filters are configured if needed

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Portfolio ready for production"
   git push
   ```

2. **Create Vercel Project**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select Next.js as framework
   - Click "Deploy"

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`:
     - `DATABASE_URL`
     - `ADMIN_PASSWORD`
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `EMAIL_TO`
     - `NEXT_PUBLIC_APP_URL` (set to your domain)

4. **Configure Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

5. **Test Production Build**
   ```bash
   npm run build
   npm run start
   ```

### Option 2: Deploy to Other Platforms

#### Railway
1. Connect GitHub repository at railway.app
2. Create PostgreSQL database plugin
3. Set environment variables
4. Deploy

#### Render
1. Go to render.com/new
2. Select "Web Service"
3. Connect GitHub
4. Add build command: `npm run build`
5. Add start command: `npm run start`
6. Set environment variables
7. Deploy

#### Fly.io
1. Install flyctl CLI
2. Run `flyctl launch`
3. Configure `fly.toml`
4. Set secrets: `flyctl secrets set KEY=value`
5. Run `flyctl deploy`

## Post-Deployment

### Verification
- [ ] Website loads at production URL
- [ ] All pages are accessible
- [ ] Contact form works
- [ ] Emails are sent successfully
- [ ] Admin dashboard is accessible
- [ ] Projects display correctly
- [ ] Dark mode works in production
- [ ] Mobile responsiveness is correct

### Monitoring
- [ ] Set up analytics dashboard view
- [ ] Check database performance
- [ ] Monitor error logs
- [ ] Set up uptime monitoring (optional)

### Maintenance
- [ ] Backup database regularly
- [ ] Check spam folder for emails
- [ ] Review contact form submissions
- [ ] Update projects as needed
- [ ] Monitor for security updates

## Production URLs

- **Main Site**: https://your-domain.com
- **Admin Login**: https://your-domain.com/admin/login
- **Contact Page**: https://your-domain.com/contact
- **Projects Page**: https://your-domain.com/projects

## Database Backups

### For Neon
1. Go to Neon dashboard
2. Select your database
3. Use Neon's built-in backup features
4. Download SQL dumps periodically

### For Other Providers
- Set up automated backups in your provider's dashboard
- Test restoring from backups monthly

## Troubleshooting Production Issues

### Blank Pages
- Check error logs in platform console
- Verify all environment variables are set
- Check database connectivity from production

### Email Not Working
- Verify email credentials are correct
- Check spam filters
- Review application logs for errors
- Test with admin email first

### Database Connection Error
- Verify DATABASE_URL is set
- Check database is accessible from production IP
- Ensure firewall allows connection
- Test connection string locally first

### Admin Login Not Working
- Verify ADMIN_PASSWORD is set
- Clear browser cookies/session storage
- Check for typos in password

## Performance Tips

1. **Images**
   - Optimize project images before uploading
   - Use WebP format where possible
   - Add images < 2MB each

2. **Database**
   - Keep analytics table pruned (delete old entries)
   - Use indexes on frequently queried columns
   - Monitor query performance

3. **Caching**
   - Vercel caches static content
   - Use browser caching headers
   - Revalidate ISR paths as needed

## Security Best Practices

1. **Keep Dependencies Updated**
   ```bash
   npm update
   npm audit fix
   ```

2. **Monitor Logs**
   - Check logs daily for errors
   - Watch for suspicious activity
   - Review contact form submissions

3. **Database Security**
   - Use strong credentials
   - Don't expose connection strings
   - Use VPN/firewall for database access
   - Keep PostgreSQL updated

4. **Admin Access**
   - Change admin password regularly
   - Use a password manager
   - Log out when finished
   - Monitor admin activity

## Next Steps

- [ ] Set up custom domain
- [ ] Configure SSL/TLS (usually automatic on Vercel)
- [ ] Set up email forwarding
- [ ] Create social media links
- [ ] Submit sitemap to search engines
- [ ] Add Google Analytics (optional)
- [ ] Configure email notifications for contact form

## Support

If you encounter issues:

1. Check the error message carefully
2. Review logs in your deployment platform
3. Verify environment variables
4. Test locally with `npm run dev`
5. Check database connectivity
6. Review README_SETUP.md for troubleshooting

---

Good luck with your deployment! Your portfolio is now ready to showcase your work to the world.
