# 🔧 Fix: Port 5000 Connection Error

## ❌ Error

```
Failed to load resource: net::ERR_CONNECTION_REFUSED
:5000/api/resources?page=1&limit=12
```

## 🔍 Problem

The frontend is trying to connect to port **5000**, but your backend is running on port **3000**.

## ✅ Solution

### Step 1: Clear Browser Cache

**In your browser (Chrome/Edge):**

1. Press `F12` to open DevTools
2. **Right-click** the refresh button (not left-click!)
3. Select **"Empty Cache and Hard Reload"**

**Or use keyboard:**
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
});
```

### Step 3: Restart Frontend

**Stop the server** (Ctrl+C), then:

```bash
npm run dev:all
```

### Step 4: Hard Reload

After restarting:
- Press `Ctrl+Shift+R` (hard reload)
- Or `F12` → Right-click refresh → "Empty Cache and Hard Reload"

## ✅ Verify Configuration

Your `.env` file should have:
```env
VITE_API_URL="http://localhost:3000/api"
```

**It's already correct!** The issue is browser cache.

## 🎯 Quick Fix (One Command)

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
- `F12` → Right-click refresh → "Empty Cache and Hard Reload"
- Or run: `navigator.serviceWorker.getRegistrations().then(r => r.forEach(reg => reg.unregister()))`

## 📝 About the Warnings

The React Router warnings are **not errors** - they're just future compatibility notices. You can ignore them.

The manifest icon warning is also **not critical** - it's just a missing PWA icon.

---

**The main issue is browser cache - clear it and restart!** 🚀

