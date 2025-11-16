# Force API Key to Always Load

## Changes Made

### 1. **next.config.js** - Force load at startup
- Explicitly declares the environment variable
- Verifies API key on server start
- Logs success/failure

### 2. **scripts/check-env.js** - Pre-startup check
- Runs **before** `npm run dev` starts
- Checks if `.env.local` exists
- Verifies API key is set
- Auto-creates `.env.local` if missing
- **Prevents server from starting** if API key is missing

### 3. **package.json** - Auto-run checks
- Added `predev` hook to check env before starting
- Added `prebuild` hook for production builds

### 4. **app/api/chat/route.ts** - Better debugging
- Enhanced logging to show exactly what's loaded
- Checks multiple environment variable sources
- Clear error messages

## How It Works

### Every time you run `npm run dev`:

1. ✅ `scripts/check-env.js` runs automatically
2. ✅ Checks if `.env.local` exists
3. ✅ Verifies `OPENAI_API_KEY` is set
4. ✅ Creates `.env.local` if missing
5. ✅ Stops if API key is invalid
6. ✅ `next.config.js` logs API key status
7. ✅ Server starts with API key loaded

### Console output you'll see:

```
🔍 Checking environment configuration...

📄 .env.local contents:
   OPENAI_API_KEY = ***[SET]

✅ OPENAI_API_KEY is configured
🚀 Starting Next.js...

✅ OPENAI_API_KEY loaded: sk-proj-JzLjKM...
```

## Test It

1. Stop current server (Ctrl+C)
2. Run: `npm run dev`
3. You should see the checks pass
4. Test chat: Ask "do I have anything about test?"

## If API Key Still Not Working

Check server console for:
```
=== API Key Check ===
OPENAI_API_KEY exists: true
API Key prefix: sk-proj-JzLjKM...
===================
```

If you see `false`, the API key isn't loading despite these checks.

