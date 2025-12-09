# 🔧 Final Fix: Port 5000 Still Showing

## ❌ Still Seeing Port 5000?

The browser is using **cached JavaScript code**. Here's the complete fix:

## ✅ Complete Solution

### Step 1: Stop Server

Press `Ctrl+C` to stop the server.

### Step 2: Clear ALL Caches

```powershell
cd shastra-hub

# Clear Vite cache
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue

# Clear dist folder if it exists
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

cd ..
```

### Step 3: Verify .env File

Check `shastra-hub/.env` has:
```env
VITE_API_URL="http://localhost:3000/api"
```

If it's different, fix it:
```powershell
cd shastra-hub
Set-Content -Path .env -Value 'VITE_API_URL="http://localhost:3000/api"'
cd ..
```

### Step 4: Restart Server

```bash
npm run dev:all
```

### Step 5: Clear Browser Completely

**Option A: DevTools (Recommended)**
1. Press `F12` (DevTools)
2. Go to **Application** tab
3. Click **Clear storage** (left sidebar)
4. Check all boxes
5. Click **Clear site data**
6. Close DevTools
7. Press `Ctrl+Shift+R` (hard reload)

**Option B: Browser Settings**
1. Press `Ctrl+Shift+Delete`
2. Select **All time**
3. Check:
   - ✅ Cached images and files
   - ✅ Cookies and other site data
   - ✅ Hosted app data
4. Click **Clear data**

**Option C: Incognito/Private Window**
- Open a new **Incognito/Private** window
- Navigate to `http://localhost:5173` (or your port)

### Step 6: Check Browser Console

After reloading, open **Console** (F12) and look for:
```
🔍 API URL: http://localhost:3000/api
```

If it still shows port 5000, the cache isn't cleared.

## 🐛 If Still Not Working

### Nuclear Option: Full Clean

```powershell
# Stop server (Ctrl+C)

# Delete all caches
cd shastra-hub
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue

# Reinstall (optional, but ensures clean state)
npm install

cd ..
npm run dev:all
```

### Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Look for API requests
5. Check the **Request URL** - should be `http://localhost:3000/api/...`

## ✅ Expected Result

After these steps:
- ✅ Console shows: `🔍 API URL: http://localhost:3000/api`
- ✅ Network requests go to port 3000
- ✅ No more port 5000 errors

## 📝 About Warnings

- **React Router warnings**: Safe to ignore (future compatibility)
- **Manifest icon warning**: Safe to ignore (missing PWA icon)

---

**The issue is browser cache - clear it completely!** 🚀

