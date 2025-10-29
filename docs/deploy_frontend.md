# Frontend deployment (Netlify / Vercel)

This explains two quick options to deploy the frontend static build.

Netlify (recommended)
1. Create a Netlify site and connect your GitHub repo.
2. Build settings: `npm run build` in root (CRA), publish directory `build`.
3. If you prefer to use GitHub Actions with Netlify CLI, add repository secrets:
   - `NETLIFY_AUTH_TOKEN` — your Netlify personal access token.
   - `NETLIFY_SITE_ID` — the site id shown in Netlify site settings.
4. Push to `main` and the action will publish the `build` folder to Netlify.

Vercel
1. Create a Vercel account and import the GitHub repo.
2. Vercel auto-detects Create React App. Set the build command to `npm run build` and the output directory to `build`.
3. Add any environment variables in Vercel if the frontend needs them.

Local test
```powershell
npm run build
npx serve -s build
# Open http://localhost:5000 (or the port serve uses)
```
