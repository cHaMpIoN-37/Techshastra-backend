# 🔧 Fix: Backend Connection Error (Port 5000)

## ❌ Error

```
Failed to load resource: net::ERR_CONNECTION_REFUSED
:5000/api/resources?page=1&limit=12
```

## 🔍 Problem

Your frontend is trying to connect to port **5000**, but your backend is running on port **3000**.

**Your `.env` file is correct** - the issue is **browser cache**!

## ✅ Quick Fix (3 Steps)

### Step 1: Clear Browser Cache

**In your browser:**

1. Press `F12` to open DevTools
2. **Right-click** the refresh button (not left-click!)
3. Select **"Empty Cache and Hard Reload"**

**Or:**
- Press `Ctrl+Shift+Delete`
- Select "Cached images and files"
- Click "Clear data"

### Step 2: Unregister Service Workers

**In Browser Console (F12 → Console tab):**
```javascript
navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (const registration of registrations) {
    registration.unregister();
  }
  console.log('✅ Service workers unregistered');
  location.reload();
});
```

### Step 3: Restart Frontend

**Stop the server** (Ctrl+C), then:

```bash
npm run dev:all
```

Then **hard reload** the page (`Ctrl+Shift+R`).

## ✅ What I Fixed

1. ✅ Updated service worker to **not cache API requests**
2. ✅ Changed cache version to force refresh
3. ✅ API requests now always go to network (no cache)

## 🎯 Verify It's Working

After clearing cache and restarting:

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Reload the page
4. Check API requests - they should go to `http://localhost:3000/api`

## 📝 About the Warnings

- **React Router warnings**: Not errors, just future compatibility notices (safe to ignore)
- **Manifest icon warning**: Not critical, just a missing PWA icon (safe to ignore)

## 🚀 Expected Result

After these steps:
- ✅ API requests go to `http://localhost:3000/api`
- ✅ No more port 5000 errors
- ✅ Backend connection works

---

**The fix is in the code - just clear your browser cache!** 🚀

