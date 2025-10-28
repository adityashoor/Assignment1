# Aditya Shoor — React Portfolio

This repository contains a personal portfolio site implemented with React (Create React App). It was prepared to satisfy the COMP229 Assignment 1 requirements (Home, About, Projects, Education, Services, Contact pages, navigation, custom logo, resume PDF, project images, and an interactive contact form that captures input and redirects to Home).

Summary of changes made to complete Assignment 1:

- Added a custom SVG logo (`src/assets/logo.svg`) and updated the navigation.
- Updated pages to include content expected by the assignment: `Home`, `About` (with legal name and resume link), `Projects` (3 projects with descriptions), `Education`, `Services`, and `Contact` (form captures data and redirects back to Home).
- Improved accessibility and semantics (aria labels, header/main/section tags).
- Added internal comments to key files.
- Added a simple smoke test (`src/__tests__/App.test.js`) to verify the app renders.

How to run locally

In the project directory (PowerShell on Windows):

```powershell
npm install
npm start
```

Open http://localhost:3000 in your browser.

Run tests once (non-interactive):

```powershell
set "CI=true"; npm test -- --watchAll=false
```

Build for production:

```powershell
npm run build
```

Deployment

 Automatic deployment (Netlify)

 I added a Netlify configuration (`netlify.toml`) and a GitHub Actions workflow (`.github/workflows/deploy-netlify.yml`) that will build and deploy the site on pushes to the `main` branch. To enable automatic deploys:

 1. Create a site on Netlify (manual or by linking the GitHub repository).
 2. Add two repository secrets in GitHub (Settings → Secrets & variables → Actions):
	 - `NETLIFY_AUTH_TOKEN` — a Netlify personal access token (create in Netlify user settings).
	 - `NETLIFY_SITE_ID` — the site ID from Netlify for the site you created.
 3. Push changes to `main`. The GitHub Action will run, build the project and deploy the `build/` folder to the specified Netlify site.

 I also added `public/_redirects` and `netlify.toml` to ensure single-page-app routing works correctly on Netlify.

 If you prefer Vercel instead, tell me and I’ll add a Vercel deployment configuration or guide you through linking the repo to Vercel (Vercel typically auto-detects Create React App and requires no extra files).
 If you want me to replace the placeholder education/school/project text with your exact details, or to add more project images/descriptions, upload them or paste the content and I’ll update the pages.
 The contact form currently logs captured data to the browser console and redirects to Home; if you want server-side email delivery I can wire a free service (Formspree, EmailJS) or set up a simple server endpoint.

