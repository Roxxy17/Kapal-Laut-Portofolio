# 🚀 Vercel Redeploy Instructions

## The Problem:
Your Vercel deployment still has the old code that uses `/api/upload/avatar` endpoint, but your local code has been updated to use `/api/profile/avatar`.

## The Solution:

### Option 1: Force Redeploy from Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find your project "kapal-laut-portofolio"
3. Go to "Deployments" tab
4. Click "Redeploy" on the latest deployment
5. Check "Use existing Build Cache" to UNCHECKED
6. Click "Redeploy"

### Option 2: Push New Commit to Trigger Redeploy
```bash
git add .
git commit -m "fix: remove old upload endpoint, use profile/avatar endpoint"
git push origin main
```

### Option 3: Manual Deploy from CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to production
vercel --prod
```

## Environment Variables Check:
Make sure these are set in Vercel Dashboard:
- `MONGODB_URI` (your production MongoDB connection string)
- `JWT_SECRET` (strong secret key)
- `NEXTAUTH_URL` (https://kapal-laut-portofolio.vercel.app)
- `NODE_ENV=production`

## After Redeploy:
1. Test avatar upload at: https://kapal-laut-portofolio.vercel.app/dashboard/settings
2. Should see "Avatar uploaded successfully" message
3. Avatar should appear immediately in the UI

## ✅ Verification:
Your local development is working perfectly:
- `/api/profile/avatar` endpoint: ✅ Working
- Avatar upload: ✅ Working
- Base64 storage to MongoDB: ✅ Working

The issue is just that Vercel needs to be redeployed with the latest code.
