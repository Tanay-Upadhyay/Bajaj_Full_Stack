# Quick Deployment Guide

## Before Deployment

1. **Update your personal details** in `server.js`:
   ```javascript
   const USER_INFO = {
       user_id: "your_name_ddmmyyyy", // e.g., "john_doe_17091999"
       email: "your.email@example.com",
       roll_number: "YOUR123"
   };
   ```

## Deployment Options

### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Project name: bajaj-finserv-api
# - Deploy to production: Yes
```

### 2. Railway

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy automatically

### 3. Render

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`

### 4. Heroku

```bash
# Install Heroku CLI and login
heroku create your-app-name
git push heroku main
```

## After Deployment

Your API will be available at:
- **POST** `https://your-domain.com/bfhl` - Main endpoint
- **GET** `https://your-domain.com/bfhl` - Health check

## Testing Deployed API

```bash
curl -X POST https://your-domain.com/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```

Expected response:
```json
{
  "is_success": true,
  "user_id": "your_name_ddmmyyyy",
  "email": "your.email@example.com",
  "roll_number": "YOUR123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```
