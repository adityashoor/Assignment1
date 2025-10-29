# Aditya Shoor — React Portfolio

This repository contains a personal portfolio site implemented with React (Create React App) and a Node.js/Express backend for Assignment 2 requirements.

Frontend: `src/` — React app (Assignment 1 content)
Backend: `server/` — Express + Mongoose REST APIs (Assignment 2)

## Run locally

1) Start MongoDB locally (e.g. `mongod`).
2) Install frontend dependencies (if not already):

```powershell
cd "C:\Users\adity\Desktop\React-Portfolio\react-portfolio"
npm install
```

3) Install server dependencies and start server:

```powershell
cd "C:\Users\adity\Desktop\React-Portfolio\react-portfolio\server"
npm install
set "MONGO_URI=mongodb://localhost:27017/Portfolio"
node index.js
```

4) Start React dev server (in separate terminal):

```powershell
cd "C:\Users\adity\Desktop\React-Portfolio\react-portfolio"
npm start
```

The React app proxies API requests to `http://localhost:5000` (see `package.json` proxy setting).

## Backend

- Connection string default: `mongodb://localhost:27017/Portfolio` (you asked to use `mongodb://localhost:27017/` — append `Portfolio`).
- The server exposes REST endpoints under `/api` for `contacts`, `projects`, `qualifications`, and `users`.
- Example: POST `/api/contacts` accepts `{ firstname, lastname, email, phone, message }` and stores it in the `contacts` collection.

## Deployment

I added Netlify config and a GitHub Actions workflow to deploy the frontend build and call Netlify CLI to publish. To enable automated deployments using the workflow, add the following repository secrets:

- `NETLIFY_AUTH_TOKEN` — Netlify personal access token
- `NETLIFY_SITE_ID` — Netlify Site ID (API ID)

Alternatively, you can link the repo to Netlify or Vercel via their UI for automatic builds and deploys.

## Notes

If you'd like, I can:
- Add JWT authentication and protected routes for `users`.
- Add sample Postman/Thunder client requests and screenshots to satisfy assignment screenshot requirements.
- Seed the database with sample data or implement a simple admin UI.

