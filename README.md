# Articara

Mobile-first PWA companion for **psoriatic arthritis** — symptoms, flares, medications, lifestyle, and doctor-ready PDFs.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL (usually `http://localhost:5173`). On a phone browser, use “Add to Home Screen” for an app-like install.

```bash
npm run build
npm run preview
```

## Product decisions

See [PRODUCT.md](./PRODUCT.md) for brand, domains, pricing, and audience.

## Stack

React + TypeScript + Vite PWA · Zustand · Recharts · jsPDF

Designed for later Firebase Auth/Firestore/Notifications and Capacitor store builds.

## Deploy to VM (IIS)

Workflow name: **Deploy to VM**  
Target path: `C:\sites\othersites\articara` (folder is created automatically on first deploy)

1. Copy these **repository secrets** from UmrahSystem onto this repo (`Settings → Secrets and variables → Actions`):
   - `VM_HOST`
   - `VM_USERNAME`
   - `VM_PASSWORD`
   - `VM_PORT` (optional; defaults to 22)
2. Run **Actions → Deploy to VM → Run workflow**, or push to `master` (auto-deploys).

Point an IIS site / application physical path at that folder. URL Rewrite must be installed for SPA routes (`public/web.config`).
