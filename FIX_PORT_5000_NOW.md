# 🚨 URGENT: Fix Port 5000 Connection Error

## The Problem

Your browser console shows:
```
🔍 API URL: http://localhost:5000/api
🔍 VITE_API_URL from env: http://localhost:5000/api
Failed to load resource: net::ERR_CONNECTION_REFUSED :5000/api/projects
```

**But your `.env` file is correct** (`VITE_API_URL="http://localhost:3000/api"`).

This means your **browser has cached old JavaScript** that had port 5000 hardcoded.

## ✅ IMMEDIATE FIX (Do This Now!)

### Step 1: Stop Your Dev Server
Press `Ctrl+C` in your terminal to stop the server.

### Step 2: Clear Vite Cache
```powershell
cd shastra-hub
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
cd ..
```

### Step 3: Restart Server
```bash
npm run dev:all
```

### Step 4: Clear Browser Cache (CRITICAL!)

**Option A: DevTools (Best Method)**
1. Open your browser
2. Press `F12` to open DevTools
3. Go to **Application** tab (Chrome/Edge) or **Storage** tab (Firefox)
4. Click **Clear storage** (left sidebar)
5. Check **ALL** boxes:
   - ✅ Local storage
   - ✅ Session storage
   - ✅ IndexedDB
   - ✅ Cache storage
   - ✅ Service workers
6. Click **Clear site data**
7. Close DevTools
8. Press `Ctrl+Shift+R` (hard reload)

**Option B: Incognito Window (Fastest Test)**
1. Open **Incognito/Private** window (`Ctrl+Shift+N`)
2. Navigate to `http://localhost:5173`
3. Open Console (F12)
4. You should see: `🔍 API URL: http://localhost:3000/api` ✅

**Option C: Browser Settings**
1. Press `Ctrl+Shift+Delete`
2. Select **All time**
3. Check:
   - ✅ Cached images and files
   - ✅ Cookies and other site data
   - ✅ Hosted app data
4. Click **Clear data**

### Step 5: Verify It's Fixed

After clearing cache and reloading, open **Console** (F12) and you should see:
```
🔍 API URL: http://localhost:3000/api
🔍 VITE_API_URL from env: http://localhost:3000/api
```

**NOT:**
```
🔍 API URL: http://localhost:5000/api  ❌
```

## 🎯 Why This Happens

Vite bundles your JavaScript code. When you change `.env` variables, Vite needs to rebuild. But browsers cache JavaScript files aggressively. Even though the new code has the correct port, your browser is still using the old cached version.

## ✅ Quick Test

**Test in Incognito first** - if it works there but not in normal window, it's 100% a cache issue.

## 📝 About the Bun Error

The `bun` error is **not critical** - it's just trying to update browser compatibility data. You can ignore it. If you want to fix it:

```powershell
cd shastra-hub
npm update caniuse-lite browserslist
```

But this won't fix the port 5000 issue - that's purely browser cache.

---

**The fix is simple: Clear your browser cache!** 🚀

