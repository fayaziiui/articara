# Articara

Mobile companion for **psoriatic arthritis** — symptoms, flares, medications, lifestyle, and doctor-ready PDFs.

The same React app ships as:

- a **web PWA** (install from the browser)
- a **native Android app** (Capacitor + Android Studio / Play Console)
- a **native iOS app** (Capacitor + Xcode / TestFlight)

App ID: `app.articara.companion`

## Quick start (web)

```bash
npm install
npm run dev
```

Open the local URL (usually `http://localhost:5173`). On a phone browser, use “Add to Home Screen” for an app-like install.

```bash
npm run build
npm run preview
```

## Native iOS and Android

Capacitor wraps the Vite build in native shells under `ios/` and `android/`.

```bash
npm install
npm run mobile:sync
```

That builds the web app and copies it into both native projects.

### Android

Needs [Android Studio](https://developer.android.com/studio) (JDK 21 is fine).

```bash
npm run mobile:android
```

Then pick an emulator or device and press Run. Package name is `app.articara.companion`.

To produce a debug APK from Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.

### iOS (macOS + Xcode)

iOS compilation requires a Mac with Xcode and CocoaPods.

```bash
npm run mobile:ios
```

Then select a simulator or a signed device and press Run. Bundle ID is `app.articara.companion`.

First-time Xcode setup:

1. Open **Signing & Capabilities** for the App target
2. Choose your Apple Development team
3. Run on a simulator or a device, then archive for TestFlight

If you cloned this repo on a Mac and `ios/App/Pods` is missing:

```bash
cd ios/App && pod install && cd ../..
npm run mobile:sync
npx cap open ios
```

### After changing web code

```bash
npm run mobile:sync
```

Then rebuild in Xcode or Android Studio. `npx cap sync` also updates native plugin files when you add Capacitor plugins.

### Live reload on a device

Point Capacitor at the Vite dev server (your computer and phone must share a network). In `capacitor.config.ts`:

```ts
server: {
  url: 'http://YOUR_LAN_IP:5173',
  cleartext: true,
}
```

Remove that `server` block before store builds.

## Product decisions

See [PRODUCT.md](./PRODUCT.md) for brand, domains, pricing, and audience.

## Stack

React + TypeScript + Vite PWA · Capacitor 8 (iOS & Android) · Zustand · Recharts · jsPDF

Designed for later Firebase Auth/Firestore/Notifications.

## Deploy to VM (IIS)

Workflow name: **Deploy to VM**  
Target path: `C:\sites\othersites\articara` (folder is created automatically on first deploy)

1. Copy these **repository secrets** from UmrahSystem onto this repo (`Settings → Secrets and variables → Actions`):
   - `VM_HOST`
   - `VM_USERNAME`
   - `VM_PASSWORD`
   - `VM_PORT` (optional; defaults to 22)
2. Run **Actions → Deploy to VM → Run workflow**, or push to `master` (auto-deploys).

Point an IIS site / application physical path at that folder.
