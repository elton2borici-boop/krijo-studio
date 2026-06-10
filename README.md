# Krijo Studio

Albanian-first marketing site for a web development, hosting, and maintenance studio — a single-page Next.js application with a SQLite-backed contact pipeline.

## Overview

Krijo Studio is the public site of a small digital studio in Tirana. It presents the studio's services, pricing packages, selected work, and process in Albanian, and collects project inquiries through a contact form. Submissions are validated, rate-limited, and stored in a local SQLite database, then reviewed through a Basic-Auth-protected admin dashboard.

The site is intentionally lightweight: no CMS, no animation frameworks, no external services. Everything runs from a single Node.js process and a single database file, which makes it cheap to host and trivial to back up.

## Features

- Single-page editorial layout: Hero, Pricing, Portfolio, Services, Format picker, Philosophy, Process timeline, Testimonials, FAQ, Contact
- Contact form with Zod validation, spam honeypot, and per-IP rate limiting (5 submissions / 10 minutes)
- Submissions persisted to SQLite via `better-sqlite3` (synchronous, zero-config)
- Admin dashboard at `/admin` and JSON listing at `/api/contacts`, both behind Basic Auth in production
- Warm-paper editorial design system: serif display type, mono labels, grain texture, scroll-reveal motion
- Accessibility: skip link, visible focus states, reduced-motion support, semantic landmarks, native `<details>` FAQ
- Albanian (`sq`) locale throughout, including metadata and Open Graph tags

## Tech stack

| Layer      | Technology                                              |
| ---------- | ------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)                      |
| UI         | React 19, TypeScript 5                                  |
| Styling    | Tailwind CSS v4, design tokens in `src/app/globals.css` |
| Fonts      | DM Sans, Source Serif 4, IBM Plex Mono (`next/font`)    |
| Validation | Zod 4                                                   |
| Storage    | SQLite via `better-sqlite3`                             |
| Feedback   | react-hot-toast                                         |

## Architecture

```
Browser
  │
  ├─ GET /              → Server-rendered single page (mostly Server Components;
  │                       Navbar, Format, Process, Contact are Client Components)
  │
  ├─ POST /api/contact  → Route handler: Zod validation → honeypot check
  │                       → per-IP rate limit → INSERT into SQLite
  │
  ├─ GET /admin         ┐ Basic Auth gate (src/proxy.ts, production only)
  └─ GET /api/contacts  ┘ → read from SQLite
                              │
                              ▼
                        data/krijo.db (WAL mode, auto-created)
```

The database layer (`src/lib/db.ts`) opens a single shared connection, creates the schema on first use, and exposes three typed functions: `insertContact`, `listContacts`, and `countContactsSince` (used by the rate limiter). There is no ORM and no migration tooling — the schema is one table.

`src/proxy.ts` is the Next.js 16 proxy file (the renamed `middleware` convention). It enforces Basic Auth for `/admin` and `/api/contacts` in production and is a no-op in development.

## Project structure

```
src/
├─ app/
│  ├─ api/
│  │  ├─ contact/route.ts     # POST — validate and store a submission
│  │  └─ contacts/route.ts    # GET  — list submissions (Basic Auth in prod)
│  ├─ admin/page.tsx          # Server-rendered submissions dashboard
│  ├─ layout.tsx              # Fonts, metadata, toaster, skip link
│  ├─ page.tsx                # Homepage section composition
│  └─ globals.css             # Tailwind v4 theme tokens + custom CSS
├─ components/
│  ├─ Hero / Pricing / Portfolio / Services / Format / WhyUs /
│  │  Process / Testimonials / Faq / Contact / Footer / Navbar
│  ├─ MotionLayer.tsx         # IntersectionObserver scroll-reveal (progressive)
│  ├─ icons/Social.tsx        # Inline SVG social icons
│  ├─ process/                # Step navigation + scroll-spy hook
│  └─ ui/                     # Container, SectionHeading, Eyebrow
├─ lib/
│  ├─ db.ts                   # SQLite connection, schema, typed queries
│  └─ utils.ts                # cn() class-merge helper
└─ proxy.ts                   # Basic Auth gate for the admin area
data/                          # SQLite files (gitignored, auto-created)
public/images/                 # Local photography assets
```

## Getting started

Prerequisites: Node.js 20+ and npm.

```bash
git clone <repository-url>
cd krijo-studio
npm install
cp .env.example .env.local   # optional in development
npm run dev
```

The site is available at `http://localhost:3000`. The database file is created automatically on the first contact submission. After the initial `npm install` (and the first build, which caches Google Fonts), the project runs fully offline.

Production:

```bash
npm run build
npm start
```

## Environment variables

| Variable         | Required               | Default  | Description                                                                                       |
| ---------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `ADMIN_USER`     | Production only        | —        | Basic Auth username for `/admin` and `/api/contacts`. If unset in production, the admin area returns `503`. |
| `ADMIN_PASSWORD` | Production only        | —        | Basic Auth password. Same fail-closed behavior as `ADMIN_USER`.                                    |
| `DATA_DIR`       | No                     | `./data` | Directory for the SQLite database file. Point at a persistent volume in production.               |

See [.env.example](.env.example) for a ready-to-copy template. In development the admin area is open on localhost and the auth variables are ignored.

## API reference

### `POST /api/contact`

Stores a contact submission.

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arben Hoxha",
    "email": "arben@biznesi.al",
    "phone": "+355 69 000 0000",
    "business": "Aroma Café",
    "package": "faqja-plus-domain",
    "message": "Dua të ndërtoj një faqe për kafenenë time."
  }'
```

| Field      | Type   | Rules                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------ |
| `name`     | string | Required, 2–120 characters                                                     |
| `email`    | string | Required, valid email (normalized to lowercase)                                |
| `phone`    | string | Optional, ≤ 40 characters                                                      |
| `business` | string | Optional, ≤ 120 characters                                                     |
| `package`  | enum   | Optional: `vetem-faqja` · `faqja-plus-domain` · `mirembajtje` · `premium` · `tjeter` |
| `message`  | string | Required, 10–4000 characters                                                   |
| `website`  | string | Honeypot — must be left empty by real clients                                  |

Responses: `201` created (`{ "ok": true, "id": n }`), `400` malformed JSON, `422` validation error (Albanian message in `error`), `429` rate-limited, `500` storage failure (generic message, no internals leaked).

### `GET /api/contacts`

Lists submissions, newest first. Basic Auth in production.

```bash
curl -u "$ADMIN_USER:$ADMIN_PASSWORD" "https://example.com/api/contacts?limit=50"
```

| Parameter | Type | Default | Notes        |
| --------- | ---- | ------- | ------------ |
| `limit`   | int  | 200     | Clamped 1–500; invalid values fall back to the default |

Responses: `200` (`{ "ok": true, "count": n, "contacts": [...] }`), `401` missing/wrong credentials, `503` credentials not configured on the server.

## Admin access

There is a single auth mechanism: **HTTP Basic Auth, enforced by [src/proxy.ts](src/proxy.ts) in production** for both the `/admin` dashboard and `GET /api/contacts`.

- Set `ADMIN_USER` and `ADMIN_PASSWORD` in the production environment.
- Visit `/admin` and enter the credentials at the browser prompt, or pass them with `curl -u` for the API.
- If either variable is missing in production, the admin area responds with `503` — it never falls back to default credentials.
- In development (`npm run dev`), the gate is bypassed so the dashboard is directly accessible on localhost.

## Deployment notes

- **SQLite persistence** — the database lives on the filesystem (`DATA_DIR`, default `./data`). Deploy to a host with a persistent disk (VPS, Fly.io volume, Railway volume). Serverless platforms without persistent storage will silently lose submissions between invocations.
- **Native module** — `better-sqlite3` compiles a native binding; run `npm install` on the same OS/architecture as production, and note it is declared in `serverExternalPackages` in [next.config.ts](next.config.ts).
- **Fonts** — Google Fonts are downloaded at build time and cached by `next/font`. Build once with network access; subsequent offline builds reuse the cache.
- **Remote images** — Hero/Portfolio/Process use Unsplash placeholders allowed via `images.remotePatterns`. Replace with client photography in `public/images/` before a real launch and remove the Unsplash pattern.
- **Reverse proxies** — the rate limiter reads `x-forwarded-for`; make sure your proxy sets it accurately, otherwise all traffic appears to share one IP.

## Development

- `npm run dev` — dev server with HMR (Turbopack)
- `npm run lint` — ESLint (`eslint-config-next` core-web-vitals + TypeScript)
- `npm run build` / `npm start` — production build and serve

Where to edit common things:

- **Copy** (all Albanian): section components in `src/components/` — each holds its own content arrays at the top of the file
- **Pricing**: the `plans` array in [Pricing.tsx](src/components/Pricing.tsx); keep the package `id`s in sync with the Zod enum in [route.ts](src/app/api/contact/route.ts) and the radio options in [Contact.tsx](src/components/Contact.tsx)
- **Design tokens** (colors, fonts): the `@theme` block in [globals.css](src/app/globals.css)
- **Contact details / socials**: [Contact.tsx](src/components/Contact.tsx) and [Footer.tsx](src/components/Footer.tsx)

Conventions: Server Components by default — `"use client"` only where state or browser APIs are needed (Navbar, Format, Process, Contact, MotionLayer). Shared UI primitives live in `src/components/ui/`. Class names are merged with the `cn()` helper.

## Security

Implemented:

- Zod validation on all contact input; field sizes capped; unknown packages rejected
- Honeypot field that silently swallows bot submissions (indistinguishable response)
- Per-IP rate limiting: max 5 submissions per 10 minutes, derived from stored rows
- Basic Auth (constant-time credential comparison) for the admin area in production, failing closed when unconfigured
- Generic error responses — no stack traces or internal paths leak to clients
- Database files and env files are gitignored

Known limitations, acceptable at this scale:

- Rate limiting trusts `x-forwarded-for` and resets if the database is emptied
- Basic Auth has no lockout or audit trail; use long random credentials and HTTPS
- Submissions store IP and user-agent for spam triage — disclose this in the privacy policy
- The admin area is intentionally open in local development

## License

MIT — see [LICENSE](LICENSE). Use it freely as a starting point for your own studio site.
