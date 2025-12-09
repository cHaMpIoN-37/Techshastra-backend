# 🔧 Fixing "Cannot read properties of null (reading 'useState')" Error

## What This Error Means

This error occurs when React hooks (like `useState`) are being called but React itself is `null` or not properly loaded. This usually happens due to:

1. **React not properly imported**
2. **Module resolution issues**
3. **Build cache problems**
4. **Service worker interfering**

## ✅ Fixes Applied

I've made the following fixes:

1. ✅ Added explicit React import to `App.tsx`
2. ✅ Improved root element check in `main.tsx`
3. ✅ Moved PWA registration after app render
4. ✅ Added React import to `ProtectedRoute.tsx`

## 🚀 Quick Fix Steps

### Step 1: Clear Cache and Reinstall

**For Git Bash / WSL:**
```bash
cd shastra-hub
rm -rf node_modules .vite package-lock.json
npm install
```

**For PowerShell:**
```powershell
cd shastra-hub
Remove-Item -Recurse -Force node_modules, .vite -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

**For Command Prompt:**
```cmd
cd shastra-hub
rmdir /s /q node_modules
rmdir /s /q .vite
del package-lock.json
npm install
```

### Step 2: Clear Browser Cache

1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

Or:
- Chrome: `Ctrl + Shift + Delete` → Clear cache
- Firefox: `Ctrl + Shift + Delete` → Clear cache

### Step 3: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

Or from root:
```bash
npm run dev:all
```

## 🔍 If Still Not Working

### Check React Installation

```bash
cd shastra-hub
npm list react react-dom
```

Should show:
```
react@18.3.1
react-dom@18.3.1
```

### Verify Imports

Make sure all files importing React have:
```typescript
import React from "react";
// or
import { useState, useEffect } from "react";
```

### Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for any import/module errors
4. Check Network tab for failed module loads

### Try Production Build

```bash
cd shastra-hub
npm run build
npm run preview
```

If production build works, it's a dev server cache issue.

## 🐛 Common Causes

### 1. Stale Cache
**Solution:** Clear `.vite` folder and restart

### 2. Multiple React Instances
**Solution:** Check `package-lock.json` for duplicate React versions

### 3. Service Worker Issues
**Solution:** Unregister service worker:
```javascript
// In browser console:
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister());
});
```

### 4. Module Resolution
**Solution:** Check `vite.config.ts` and `tsconfig.json` paths

## ✅ Verification

After fixes, the app should:
- ✅ Load without errors
- ✅ Show the homepage
- ✅ Allow navigation
- ✅ No console errors

## 📝 Files Changed

- `shastra-hub/src/main.tsx` - Improved root check, moved PWA init
- `shastra-hub/src/App.tsx` - Added React import
- `shastra-hub/src/components/ProtectedRoute.tsx` - Added React import

## 🆘 Still Having Issues?

1. Check browser console for specific errors
2. Verify backend is running (http://localhost:3000)
3. Check network tab for failed requests
4. Try incognito/private browsing mode
5. Restart your computer (sometimes helps with module cache)

---

**The fixes have been applied. Try clearing cache and restarting the dev server!**

