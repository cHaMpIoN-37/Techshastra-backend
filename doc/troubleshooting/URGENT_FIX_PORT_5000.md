# 🚨 URGENT: Fix Port 5000 Error

## The Problem

Your browser is using **cached JavaScript** that has port 5000 hardcoded. Even though your `.env` file is correct, the browser is using old cached code.

## ✅ Complete Fix (Do All Steps!)

### Step 1: Stop Server

Press `Ctrl+C` in your terminal.

### Step 2: Clear Vite Cache

```powershell
cd shastra-hub
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
cd ..
```

Or use the script:
```powershell
.\scripts\clear-all-cache.ps1
```

### Step 3: Restart Server

```bash
npm run dev:all
```

### Step 4: Clear Browser Cache COMPLETELY

**Method 1: DevTools (Best)**
1. Press `F12` (DevTools)
2. Go to **Application** tab
3. Click **Clear storage** (left sidebar)
4. Check **ALL** boxes
5. Click **Clear site data**
6. Close DevTools
7. Press `Ctrl+Shift+R` (hard reload)

**Method 2: Incognito Window (Easiest)**
1. Open **Incognito/Private** window (`Ctrl+Shift+N`)
2. Navigate to `http://localhost:5173` (or your port)
3. This bypasses all cache!

### Step 5: Verify It's Fixed

After reloading, open **Console** (F12) and you should see:
```
🔍 API URL: http://localhost:3000/api
🔍 VITE_API_URL from env: http://localhost:3000/api
```

If you still see port 5000, the cache isn't cleared.

## 🎯 Quick Test: Use Incognito

The **fastest way** to test if it's fixed:

1. Open **Incognito/Private** window
2. Go to `http://localhost:5173`
3. Open Console (F12)
4. Check if it shows port 3000

If it works in Incognito but not in normal window = **browser cache issue**

## ✅ What I Added

- ✅ Debug logging in `api-client.ts` to show what API URL is being used
- ✅ Cache clearing script: `scripts/clear-all-cache.ps1`

## 📝 Expected Console Output

After clearing cache, you should see:
```
🔍 API URL: http://localhost:3000/api
🔍 VITE_API_URL from env: http://localhost:3000/api
```

**NOT:**
```
🔍 API URL: http://localhost:5000/api  ❌
```

---

**The issue is 100% browser cache. Use Incognito window to test immediately!** 🚀

