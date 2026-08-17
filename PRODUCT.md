# Articara — Product decisions

## Brand
- **Name:** Articara (articulate + care)
- **Tagline:** PsA companion
- **Positioning:** Calm, practical daily companion for people with psoriatic arthritis — tracking first, education second, never a doctor replacement.

## Domains (RDAP: available as of Aug 10, 2026)
**Buy first (recommended):**
1. **articara.app** — primary product URL / PWA
2. **getarticara.com** — marketing redirect / App Store landing later

**Strong backups (also available):**
- psoriapath.com / psoriapath.app
- easepsa.com / easepsa.app
- psoriamate.com / psoriamate.app
- rheumaday.com / rheumaday.app
- psacompanion.com
- jointease.app

**Taken / avoid:** articara.com, flarewise.com, flarewise.app, flarefree.com, jointease.com, psacare.com, jointura.com

Verify once more at your registrar before purchase (Namecheap, Google Domains/Squarespace, Porkbun, Cloudflare).

## Target audience
- **Primary:** Adults 25–65 living with psoriatic arthritis (especially newly diagnosed and people preparing for rheumatology visits)
- **Secondary:** Caregivers helping with logging/reminders
- **Geo focus for MVP:** US, UK, Canada, Australia + South Asian diaspora (Pakistani/Indian meal plans)
- **Jobs to be done:** “Help me notice patterns,” “Help me remember meds,” “Help me explain my month to my doctor”

## Pricing (launch recommendation)
| Plan | Price | Includes |
|------|-------|----------|
| **Free** | $0 | Daily symptoms + body map, flare log, med list, 7-day charts, checklist, core education |
| **Plus** | **$4.99/mo** or **$39.99/yr** (7-day trial) | AI insights, full history/charts, PDF doctor reports, full meals/exercises, roadmap extras |

Competitive set sits ~$3.99–$5/mo. Lifetime later optional ($79–$99) after retention data.

Payments not wired yet — Settings uses a demo plan toggle.

## MVP scope (built)
Mobile-first **PWA** plus **Capacitor native shells** for iOS and Android (same React UI). Flutter was specified originally; Capacitor ships from this codebase without a rewrite.

- Onboarding + meal preference
- Daily symptom tracker + joint body map
- Flare tracker with trigger context
- Medication list/reminders (local)
- Progress charts (Recharts)
- Doctor PDF export (jsPDF) with native share sheet on iOS/Android
- Meal plans (5 styles including Desi)
- Exercise library with YouTube links
- Wellness checklist
- Rule-based “AI” daily insights (OpenAI-ready hook later)
- Education + medical disclaimer
- Local persistence (Zustand + localStorage); Firebase-ready next
- Native status bar, splash, safe areas, Android back button, haptics

## Website
Deferred per brief. Use getarticara.com later for waitlist / App Store links.

## Next technical steps
1. Purchase **articara.app** + **getarticara.com**
2. Create Firebase project (Auth, Firestore, FCM reminders)
3. Optional OpenAI key for richer personalized copy
4. Open `ios/` in Xcode and `android/` in Android Studio → TestFlight / Play internal testing
5. Privacy policy + HIPAA-aware posture (health data; start with strong privacy + encryption at rest)
6. Generate store icons/screenshots (`npm run assets:generate` then Capacitor assets)
