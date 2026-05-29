# Krijo Studio — Studio Dixhitale Shqiptare

A calm, editorial-style one-page site for an Albanian web-development /
hosting / maintenance studio, built with **Next.js 16, React 19, Tailwind v4**
(no heavy animation libraries — native `<details>` for FAQ only) plus a tiny
**SQLite** backend for contact submissions.

> Albanian-first copy. Pricing in EUR. Warm paper tones, serif headlines, readable on phones.

---

## ✨ Features

- **Hero** with newspaper-style index + slow desktop-only marquee / static chips on phones
- **Services** grid (Krijim Faqesh · Domain · Hosting · Mirëmbajtje · UI/UX · SEO)
- **4 Pricing Packages**
  - **Vetëm Faqja** — €299 one-time (website only)
  - **Faqja + Domain** — €399 one-time (website + domain + email) — _highlighted_
  - **Mirëmbajtje** — €29/month (maintenance only)
  - **Premium · Gjithçka** — €799 + €39/month (everything)
- **Why Us · Process · Portfolio · Testimonials · FAQ**
- **Contact form** wired to a Next.js API route → **SQLite** database
- Honeypot + per-IP rate-limit + Zod validation
- Sticky minimalist nav + mobile sheet menu + toast notifications

## 🧰 Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS v4 — **DM Sans · Source Serif 4 · IBM Plex Mono**
- Native `<details>/<summary>` for FAQ (no animation framework)
- [react-hot-toast](https://react-hot-toast.com/)
- [Zod](https://zod.dev/) for input validation
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) for storage

## 🚀 How to run this on your own laptop

You only ever need **3 commands**. Open the Terminal app and type:

### Step 1 — Go to the project folder

```bash
cd /Users/bruna/Projects/krijo-studio
```

### Step 2 — First time only (needs internet, ~1 min)

```bash
npm install
```

This downloads all the code libraries into a `node_modules/` folder.
**After this, you can run the site fully offline forever.**

### Step 3 — Every time you want to work on it

```bash
npm run dev
```

You'll see something like:

```
▲ Next.js 16.2.6 (Turbopack)
- Local:    http://localhost:3000
✓ Ready in 242ms
```

Now open <http://localhost:3000> in your browser. That's your website.

### To stop the server

Click on the terminal window and press **`Ctrl + C`** (the letter C, not Cmd).

### To edit the site

Open any file in `src/components/` in your editor (e.g. `Pricing.tsx`), save
it, and the browser refreshes automatically. No need to restart `npm run dev`.

### Common issues

| Problem | Fix |
|---|---|
| `npm: command not found` | Install Node.js from [nodejs.org](https://nodejs.org) (LTS) |
| Port 3000 already in use | `pkill -f "next dev"` then try again, or just let it pick 3001 |
| Accidentally deleted `node_modules/` | Run `npm install` again (needs internet) |
| Want a production build | `npm run build` then `npm start` instead of `npm run dev` |
| Cursor asks permission / “prediction” keeps blocking `npm install` | See **Running inside Cursor vs macOS Terminal** below |

### Running inside Cursor vs macOS Terminal

If the site **always works** when Cursor runs commands but feels “blocked” when *you*
run them, it is usually **not** Next.js asking for predictions — it is one of:

1. **Sandbox / restricted terminal** inside the editor (installing packages or spawning the dev server may need network access). Easiest workaround: open **Terminal.app** (outside Cursor),
   `cd` into this folder and run `npm install` / `npm run dev` there.

2. **Cursor “AI” confirmations** sometimes appear when autocomplete or agent tooling wants network.
   Plain `npm` does **not** need AI — ignoring those prompts or running commands in Terminal.app avoids the confusion entirely.

Next.js telemetry (anonymous usage stats) can print once on first dev start —
it is unrelated to “prediction”; you can opt out with `NEXT_TELEMETRY_DISABLED=1`:
`NEXT_TELEMETRY_DISABLED=1 npm run dev`.

### Files & folders explained

| Folder | What's in it |
|---|---|
| `src/app/` | The pages and API routes (the `page.tsx` is your homepage) |
| `src/components/` | Each section of the page (Hero, Pricing, etc.) |
| `src/lib/` | The database setup |
| `data/` | Where the SQLite database file lives (auto-created on first contact form submit). Local file. No internet. |
| `node_modules/` | All the downloaded code libraries. Safe to delete + reinstall. |
| `.next/` | The build cache. Safe to delete. |

> **Offline note:** Everything works offline after the first `npm install`.
> The database is a local file. Google Fonts are downloaded once during the
> first build and cached — if you ever rebuild offline and fonts fail, just
> Comment out `DM_Sans`, `Source_Serif_4`, `IBM_Plex_Mono` in
> `src/app/layout.tsx` temporarily.

## 🔐 Admin (list submissions)

Set an `ADMIN_TOKEN` in `.env.local`:

```env
ADMIN_TOKEN=your-very-long-secret
```

Then:

```bash
curl http://localhost:3000/api/contact/list \
  -H "Authorization: Bearer your-very-long-secret"
```

## 📤 Contact API

`POST /api/contact`

```jsonc
{
  "name": "Arben Hoxha",
  "email": "arben@biznesi.al",
  "phone": "+355 69 ...",        // optional
  "business": "Aroma Café",        // optional
  "package": "faqja-plus-domain",  // one of: vetem-faqja | faqja-plus-domain | mirembajtje | premium | tjeter
  "message": "Dua të ndërtoj ..."  // min 10 chars
}
```

Returns `201` on success, `422` on validation errors, `429` if rate-limited.

## 🏗 Project structure

```
src/
├─ app/
│  ├─ api/contact/route.ts          # POST endpoint → SQLite
│  ├─ api/contact/list/route.ts     # GET admin endpoint
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/                       # All section components
│  ├─ Navbar.tsx / Hero.tsx / Services.tsx ...
│  └─ ui/                            # Button, Container, SectionHeading
└─ lib/
   ├─ db.ts                          # SQLite setup (better-sqlite3)
   └─ utils.ts                       # cn() helper
```

## 📝 Customise

- Brand & copy: edit components in `src/components/*` (all text is in Albanian).
- Colors / fonts / shadows: `src/app/globals.css` (CSS variables under `@theme`).
- Pricing plans: `src/components/Pricing.tsx`.
- Contact info / socials: `src/components/Contact.tsx` and `Footer.tsx`.

## 📜 License

Built for Bruna · 2026. Use freely for your own studio.
