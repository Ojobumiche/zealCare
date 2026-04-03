# Sanity CMS Setup Instructions

## Step 1: Create a Sanity Project

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Click **"Create project"**
3. Choose a project name (e.g., "ZealCare NGO")
4. Select a dataset name (use **"production"** for live data)
5. Choose your preferred region (closer to your users = faster)
6. Click **"Create project"**

## Step 2: Get Your Project Credentials

After creating the project:

1. **Copy your Project ID**
   - Found on the project dashboard
   - Example: `abc123xyz`

2. **Create an API Token** (for write access)
   - Go to **API** tab in your project
   - Click **"Add API token"**
   - Name it: "Admin Dashboard Token"
   - Permissions: **Editor** or **Contributor**
   - Copy the token (you can only see it once!)

## Step 3: Update Environment Variables

Open `.env.local` in your project root and fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_actual_write_token
```

**Important**: Never commit `.env.local` to git! It's already in `.gitignore`.

## Step 4: Install Sanity CLI (Optional but Recommended)

```bash
npm install -g @sanity/cli
```

Then login:
```bash
sanity login
```

## Step 5: Deploy Sanity Studio

The Sanity Studio is your content editing interface. Deploy the schemas:

```bash
npm run dev
```

Then visit: **http://localhost:3000/studio**

You should see the Sanity Studio login screen. Sign in with your Sanity account.

## Step 6: Add Sample Content

Once logged into Studio:

1. Navigate to **"Blog & News Posts"**
2. Click **"Create new"**
3. Fill in a sample blog post
4. Click **"Publish"**

Repeat for Impact Stories and Media Library to test the setup.

## Step 7: Deploy Studio to Production (When Ready)

When deploying to Vercel/Netlify:

1. Add the environment variables in your hosting platform:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`

2. The Studio will be accessible at `https://yoursite.com/studio`

## Troubleshooting

### "Missing project ID" error
- Make sure `.env.local` exists and has correct values
- Restart your dev server after changing `.env.local`

### Can't login to Studio
- Ensure you're using the same email you signed up with on sanity.io
- Try clearing browser cache

### API token not working
- Verify the token has **Editor** or **Contributor** permissions
- Generate a new token if needed

## Next Steps

Now that Sanity is configured:

1. Update your admin dashboard to fetch from Sanity (see next implementation)
2. Create API routes that use `sanityWriteClient` for mutations
3. Add authentication middleware to protect `/studio` and `/admin` routes
4. Configure CORS if needed (in Sanity project settings)

## Useful Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Sanity + Next.js Guide](https://www.sanity.io/guides/nextjs-app-router)
