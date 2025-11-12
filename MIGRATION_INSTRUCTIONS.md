# Database Migration Instructions for Vercel

## Problem
If you're seeing "table does not exist" errors in production, it means the database tables haven't been created yet.

## Solution Options

### Option 1: Run Migrations During Build (Recommended)
The build script is now configured to automatically run migrations. However, you need to ensure:

1. **Set DATABASE_URL in Vercel:**
   - Go to your Vercel project → Settings → Environment Variables
   - Add `DATABASE_URL` with your production database connection string
   - Make sure it's set for "Production" environment

2. **Deploy again:**
   - The build will automatically run `prisma migrate deploy`
   - This will create all necessary tables

### Option 2: Run Migrations Manually (If Option 1 Fails)

If migrations fail during build, you can run them manually:

**Using Vercel CLI:**
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Run migrations with production DATABASE_URL
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

**Or using a local terminal with DATABASE_URL:**
```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy
```

### Option 3: Use Prisma DB Push (Quick Fix - Not Recommended for Production)

If you need a quick fix and don't mind losing migration history:

```bash
DATABASE_URL="your-production-database-url" npx prisma db push
```

⚠️ **Warning:** `db push` doesn't use migrations and can cause issues if you need to track schema changes.

## Verify Tables Are Created

After running migrations, verify your tables exist by checking:
- User table
- Category table  
- MenuItem table

You can use Prisma Studio to verify:
```bash
DATABASE_URL="your-production-database-url" npx prisma studio
```

## Troubleshooting

### Error: "Can't reach database server"
- Check your DATABASE_URL is correct
- Ensure your database allows connections from Vercel's IP addresses
- Check firewall/security settings

### Error: "Migration failed"
- Check Vercel build logs for detailed error messages
- Ensure DATABASE_URL is set correctly in Vercel environment variables
- Try running migrations manually (Option 2)

### Tables still don't exist after migration
- Check if migrations ran successfully in Vercel build logs
- Verify DATABASE_URL points to the correct database
- Try Option 3 (db push) as a last resort

