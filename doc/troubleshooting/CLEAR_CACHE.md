# 🔧 Fix React Error - Clear Cache

## ❌ Error: "Cannot read properties of null (reading 'useState')"

This error is usually caused by:
1. **Service Worker Cache** - Old cached code
2. **Browser Cache** - Stale React code
3. **Vite Cache** - Build cache issues

## ✅ Solution: Clear All Caches

### Step 1: Stop the Dev Server

Press `Ctrl+C` in your terminal to stop the server.

### Step 2: Clear Vite Cache

```bash
cd shastra-hub
rm -rf node_modules/.vite
```

Or on Windows PowerShell:
```powershell
cd shastra-hub
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
```

### Step 3: Clear Browser Cache

**Chrome/Edge:**
1. Press `F12` to open DevTools
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

**Or:**
1. Press `Ctrl+Shift+Delete`
2. Select "Cached images and files"
3. Click "Clear data"

### Step 4: Unregister Service Workers

**In Browser Console (F12):**
```javascript
navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (const registration of registrations) {
    registration.unregister();
  }
  console.log('Service workers unregistered');
});
```

### Step 5: Restart Dev Server

```bash
cd ..
npm run dev:all
```

## 🔄 Alternative: Full Clean Rebuild

If the above doesn't work:

```bash
# Stop server (Ctrl+C)

# Clear all caches
cd shastra-hub
rm -rf node_modules/.vite
rm -rf dist

# Reinstall dependencies (if needed)
npm install

# Restart
cd ..
npm run dev:all
```

## ✅ What I Fixed

I've updated `main.tsx` to:
- ✅ Explicitly import React
- ✅ Unregister old service workers on load
- ✅ Wrap App in React.StrictMode
- ✅ Delay service worker registration

## 🎯 Quick Fix Commands

```bash
# Stop server (Ctrl+C)

# Clear Vite cache
cd shastra-hub
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue

# Restart
cd ..
npm run dev:all
```

Then in browser:
1. Press `F12` (DevTools)
2. Right-click refresh → "Empty Cache and Hard Reload"
3. Or run in console: `navigator.serviceWorker.getRegistrations().then(r => r.forEach(reg => reg.unregister()))`

---

**After clearing cache, the error should be fixed!** 🚀

