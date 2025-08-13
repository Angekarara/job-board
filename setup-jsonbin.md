# Setup JSONBin.io for Full API Support

## Step 1: Get JSONBin.io API Key

1. Go to [JSONBin.io](https://jsonbin.io)
2. Sign up for free account
3. Go to "API Keys" section
4. Copy your "Master Key"

## Step 2: Create Your Database Bin

1. Go to "Create Bin"
2. Copy your `db.json` content
3. Paste it in the bin
4. Save and copy the Bin ID

## Step 3: Update Your Config

Update `src/services/config.js`:

```javascript
// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in development
  if (import.meta.env.DEV) {
    return "http://localhost:8000";
  }

  // Check for custom API URL from environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Production API URL - JSONBin.io
  return "https://api.jsonbin.io/v3/b/YOUR_BIN_ID";
};

export const API_BASE_URL = getApiBaseUrl();
```

## Step 4: Update Your Services

Add API key to requests that need write access:

```javascript
// In applicationsService.js and authServices.js
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": "YOUR_MASTER_KEY", // Add this for write operations
};
```

## Alternative: Supabase Setup

1. Go to [Supabase.com](https://supabase.com)
2. Create new project
3. Create tables for jobs, users, applications
4. Get API URL and key
5. Update config to use Supabase API

## Alternative: Deploy JSON Server to Vercel

1. Create `api/` folder in your project
2. Add `api/db.json` with your data
3. Add `api/index.js`:

```javascript
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = server;
```

4. Deploy to Vercel
5. Update config to use Vercel URL
