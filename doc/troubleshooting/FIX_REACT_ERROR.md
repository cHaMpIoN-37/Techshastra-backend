# 🔧 Fix: "Cannot read properties of null (reading 'useState')"

## ✅ What I Fixed

I've updated `main.tsx` to:
- ✅ Explicitly import React
- ✅ Unregister old service workers on load
- ✅ Wrap App in React.StrictMode
- ✅ Delay service worker registration

## 🚀 Quick Fix Steps

### Step 1: Stop the Server

Press `Ctrl+C` in your terminal.

### Step 2: Clear Vite Cache

**Option A: Use the script (Easiest)**
```powershell
.\scripts\clear-cache.ps1
```

**Option B: Manual**
```powershell
cd shastra-hub
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
cd ..
```

### Step 3: Clear Browser Cache

**In your browser (Chrome/Edge):**

1. Press `F12` to open DevTools
2. **Right-click** the refresh button (not left-click!)
3. Select **"Empty Cache and Hard Reload"**

**Or use keyboard:**
- Press `Ctrl+Shift+Delete`
- Select "Cached images and files"
- Click "Clear data"

### Step 4: Unregister Service Workers

**In Browser Console (F12 → Console tab):**
```javascript
navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (const registration of registrations) {
    registration.unregister();
  }
  console.log('✅ Service workers unregistered');
});
```

### Step 5: Restart Server

```bash
npm run dev:all
```

### Step 6: Reload Browser

Press `F5` or `Ctrl+R` to reload the page.

## 🎯 One-Liner Fix

```powershell
# Stop server (Ctrl+C), then:
.\scripts\clear-cache.ps1
npm run dev:all
```

Then in browser:
- `F12` → Right-click refresh → "Empty Cache and Hard Reload"
- Or run in console: `navigator.serviceWorker.getRegistrations().then(r => r.forEach(reg => reg.unregister()))`

## ✅ Expected Result

After these steps, the error should be gone and your app should load normally!

## 🐛 If Still Not Working

Try a full clean rebuild:

```bash
# Stop server (Ctrl+C)

# Clear everything
cd shastra-hub
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# Reinstall (if needed)
npm install

# Restart
cd ..
npm run dev:all
```

---

**The fix is in the code - just clear your cache and restart!** 🚀

