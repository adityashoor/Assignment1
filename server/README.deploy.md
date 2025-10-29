# Deploying the backend (Express + MongoDB)

This file explains how to deploy the backend to Render or Heroku and how to configure MongoDB (Atlas) and environment variables.

Required environment variables
- `MONGO_URI` — MongoDB connection string (e.g. from Atlas).
- `JWT_SECRET` — a long random secret for signing JWTs.
- `PORT` — (optional) port the app should listen on. Render/Heroku set this automatically.

Quick local check
1. Create a `.env` file in `server/` (copy `.env.example`) and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies and run:

```powershell
cd server
npm install
npm run dev
```

Seed sample data (optional):

```powershell
cd server
npm run seed
```

Deploy to Render (recommended quick option)
1. Create a Render account and connect your GitHub repo.
2. Create a new Web Service and select this repository and branch `main`.
3. Use the following settings (or similar):
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
4. In Render dashboard -> Environment -> Add the `MONGO_URI` and `JWT_SECRET` variables.
5. Auto-deploy will build and start the service.

Deploy to Heroku
1. Create a Heroku app.
2. Add config vars `MONGO_URI` and `JWT_SECRET` in the Heroku dashboard.
3. Push the repo or connect GitHub and enable automatic deploys.
4. Heroku will respect the `Procfile` (`web: node index.js`).

Notes
- For production, use MongoDB Atlas (create free cluster, add IP whitelist `0.0.0.0/0` or your IP, create a database user, and copy the connection string).
- Keep `JWT_SECRET` private. Do not commit `.env` to the repo.
- After deployment, you can run the seed script once by connecting to the instance or running it locally against the Atlas URI.
