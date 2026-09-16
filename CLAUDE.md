# Sigma Lambda Chapter Website — Project Brief

## Client
Alpha Phi Alpha Fraternity, Inc. — Sigma Lambda Chapter (New Orleans, LA)
Contact: Bro. Brian Turner
Current site: https://www.sigmalambda.org/

## Goal
Redesign and rebuild the chapter site as a modern, one-stop shop: public info + a members-only portal, all in one place.

## Brand
- Colors: Black `#0A0908` + Old Gold `#C9A227`, Ivory `#F6F2E7` for light sections
- Fonts: Fraunces (serif, headlines) + Public Sans (body/UI) — both on Google Fonts
- Reference design: `sigma-lambda-design-sample.html` (in this repo — pitch mockup, front-end only, use it for visual direction)
- Tone: modern, polished, dynamic. One bold 3D/motion moment (hero), restrained everywhere else — not flashy for its own sake

## Build order

### Phase 1 — Public site
- Homepage, About/History, Leadership, Programs, Events/Calendar, News
- SEO basics: meta tags, sitemap.xml, alt text, semantic HTML
- Accessibility: keyboard nav, visible focus states, color contrast
- Fully responsive down to mobile

### Phase 2 — Member access
- Individual member login
- Online dues payment
- Event RSVP / registration
- Chapter merchandise store

### Phase 3 — Advanced features
- QR code event check-in
- Attendance tracking + participation reporting
- Expanded member directory
- Admin workflow automation
- Evaluate PWA / mobile-friendly portal before considering a native app

### Phase 4 — Care plan (post-launch, ongoing)
- Tech support, content/image updates, daily backups, plugin + security monitoring, uptime reporting

## Stack
- **Next.js + Tailwind** — front end. Static pages now, grows into the portal later without a rewrite.
- **Supabase** — auth (member login), Postgres (members, dues, attendance, events), file storage
- **Stripe** — dues and merch payments
- **Vercel** — hosting, auto-deploys on push to `main`

## Non-goals for now
- No native mobile app until the web portal is live and used
- No admin dashboard complexity before Phase 2 ships
