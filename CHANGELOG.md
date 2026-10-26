# Changelog

## 2026-10-26 — Hero wall back, reviews out

- **Hero**: the slowly drifting wall of page wireframes is back, now behind the navy hero. The headline, buttons and example site sit on top, unchanged. It still pauses while the hero is off-screen and slows to a third of its speed (instead of stopping) under `prefers-reduced-motion`.
- **Reviews removed**: the "Zëra klientësh" section is gone (`Testimonials.tsx`, `content/testimonials.ts`). The quotes weren't from real clients. Put a section back once there are real ones.

## 2026-10-18 — Plainer, less template-like

Removed the effects that made the page read as a generated template. Content, layout and behaviour are unchanged.

- **Labels**: the "Studio krijuese · Tiranë" pill in the hero and the small pill labels above every section heading are gone (`Eyebrow` deleted). "Zëra klientësh" is now a normal section heading.
- **Headings**: one colour. The blue second half in every section heading is gone; the hero's "punojnë." is the page's only accent-coloured headline word, without the squiggle underline.
- **Hero**: solid navy (no glow or grid), the example site in a flat window (no tilt, no floating chips, no pulsing dot), and the three-box stat card replaced by one line of text.
- **Buttons**: flat fill, no gradient, glow or hover lift.
- **Services**: plain line icons; no gradient tiles, giant numbers or hover glow.
- **Pricing, testimonials, footer**: navy panels without glow or grid; the featured quote sits at the top of its card.
- **Format and Contact**: no dot textures or radial washes.
- Still zero axe-core violations on `/` and `/privatesia`, both themes, desktop and mobile.

## 2026-10-18 — Bold redesign

A darker, higher-contrast look with the same content, structure and behaviour.

- **Hero**: a navy band with a blue glow and a fine grid. The headline sits on the left; on the right is an example site (the law-office mock from the format picker) in a browser window, tilted slightly toward the text on desktop, with three floating chips taken from the base package's features. The faded wireframe wall is gone, along with its CSS and the code that paused it.
- **Navbar**: light text on the navy hero (`.ink-tokens`, the navy palette without its background), turning into the frosted light bar once scrolled.
- **Type and controls**: bigger, heavier section headings; section labels are pills with a dot; primary buttons have a subtle gradient, inner highlight and blue glow, and both button styles lift on hover.
- **Format**: the example preview is drawn at 1.4× (`.work-thumb-lg`), and the picker, not the preview, is now the sticky column.
- **Pricing**: the recommended plan is lit with the hero's glow.
- **Services**: gradient icon tiles; the large faint numbers no longer get cut off at the top of each card; a soft accent light on hover.
- **Testimonials**: the featured quote is a navy panel with a large quote mark, which fixes the empty gap it had before.
- **Footer**: navy with glow and grid, so the page opens and closes on the same note.
- Glows are radial gradients, never `filter: blur()`, so they cost nothing to repaint (blur filters made View Transition snapshots of the page noticeably slower).
- Still zero axe-core violations (WCAG 2.1 AA) on `/` and `/privatesia`, in both themes, on desktop and mobile.

## 2026-10-18 — Optimisation pass

No visual or content changes: screenshots of the hero and Process section in both themes, on desktop and mobile, match the previous build to within 4/255 per pixel, apart from photo compression.

### Fixes

- **Fresh builds failed**: on a checkout with no `data/` directory, `next build`'s parallel workers each opened the new database and raced to add the `client_token` column ("duplicate column name"). The database is now opened on the first query instead of at import, so building never touches it, and the schema setup runs in an `IMMEDIATE` transaction in case two processes ever start at once.
- **`/privatesia` claimed to be the homepage**: it inherited the root layout's `canonical: "/"` and Open Graph card. It now has its own canonical URL and card.

### Speed

- Fonts: `latin` subset only (Albanian's ç and ë are in it), so 2 font preloads instead of 4.
- Hero: the two frosted chips over the drifting wall are now near-opaque, not `backdrop-blur` — a blur over a moving layer was re-rendered every frame.
- Hero wall: dropped the fifth column, which was always `display: none` but still rendered 10 tiles (~200 DOM nodes; 1,729 → 1,529 on the homepage). The drift now pauses while the hero is scrolled out of view.
- Images: AVIF with WebP fallback (13–25% smaller photos), and the Process background, which sits under a heavy scrim, at quality 50 (31 KB → 9 KB at 1920px). Next 16's deprecated `priority` prop removed from `Photo`.
- `X-Powered-By` header off.

### SEO

- Open Graph `url` and `siteName`, and a large Twitter card.
- JSON-LD now includes an `image` (the generated Open Graph card).
- Sitemap `lastmod` is a fixed date per page instead of the build time, which crawlers learn to ignore.

### Backend

- Lead notifications (email/Telegram) are sent with `after()`, once the response is out — the visitor no longer waits up to 5s on them.
- SQL statements are prepared once and reused instead of on every call.
- Rate-limit queries use composite `(ip, created_at)` and `(client_token, created_at)` indexes (the per-IP check previously scanned the table); existing databases pick them up on start. `countContactsSince` is now `countContactsSinceByIp`.

## 2026-10-06 — Visual depth pass

The first redesign was clean but every section shared one template (eyebrow, heading, grid of identical white cards) on near-identical backgrounds. This pass gives the page rhythm and focal points without new dependencies, extra fonts or a second accent colour.

- **Navy "ink" band** (`.tone-ink`, `<Section tone="ink">`): re-themes everything inside it via the colour tokens. Used for the Process section and the recommended pricing card.
- **Hero**: shorter, static dot texture and accent wash, hand-drawn underline, and a proof strip (starting price from `packages.ts`, 5–7 day delivery, 24h reply — all already stated on the page).
- **Format**: the example sits on a tinted, textured stage; the active option gets an accent bar.
- **Pricing**: the recommended plan is a taller navy card; larger prices; hover lift.
- **Services**: bento layout with custom line icons (`ui/ServiceIcons.tsx`).
- **Testimonials**: featured large quote, initials avatars.
- **FAQ**: one divided list; the open item is highlighted. **Contact**: raised form with an accent cap.
- Staggered reveals and a shared hover lift; both are off under `prefers-reduced-motion`.
- Still zero axe-core violations in both themes.

## 2026-10-06 — Simplification and design-system pass

No content or behaviour was removed; every page, API route and form flow works as before (verified after each step with lint, typecheck, build, an HTTP smoke test of every route and API case, and a Playwright run of the format picker, lightbox, process tabs, FAQ, mobile menu and contact form).

### Code

- **Single source for packages**: `src/content/packages.ts` now feeds the pricing cards, contact-form options, the API's Zod enum, lead-notification labels and the JSON-LD catalog (previously five separate copies).
- **Content split from layout**: all section copy lives in `src/content/`.
- **Structure**: components grouped into `layout/`, `sections/` and `ui/`; new shared `Button`, `Section` and `CheckIcon` primitives; `SectionHeading` used everywhere.
- **Less client JS**: Hero, Pricing and the Contact section are Server Components; only `ContactForm` hydrates.
- **Removed**: `react-hot-toast` (form feedback is now inline and announced to screen readers), IBM Plex Mono, `CountUp`, dead CSS (`dot-grid`, `section-glow`, `tilt`, …), the unused Unsplash image allowance.
- **Build**: the Turbopack "whole project traced" warning from `db.ts` is fixed.

### Design

- Token-based design system in `globals.css`: semantic colours, one blue accent, two fonts, Tailwind's type scale, radius and shadow tokens.
- **Dark mode**: follows the OS, manual toggle in the header (remembered per browser), no flash on load.
- Removed the cursor spotlight, gradient blobs, pricing glow/count-up/scale. The hero wall stays, drifting more slowly.

### Fixes

- Hidden horizontal overflow on phones (12-column grid gaps made the page 464px wide on a 390px screen).
- Footer links were dead on `/privatesia` (bare `#anchors`).
- Accessibility: zero axe-core violations (WCAG 2.1 AA) in both themes. Also fixed the Process tab roles, a missing Testimonials heading, labels whose names didn't match their visible text, contact-field autocomplete, Escape to close the mobile menu, and keyboard focus inside not-yet-revealed sections.
- Privacy policy now discloses the `krijo_ct` rate-limit cookie, the stored browser identifier, the theme preference in localStorage, and Resend/Telegram lead notifications.
- `/admin` is marked `noindex`.

## 2026-06-10 — Page compaction and visual redesign

Buyer-lens redesign pass: the page was 16.4 viewports tall on desktop and 22.3 on mobile, repeated its core claims up to five times, and undermined trust with placeholder-looking visuals. Now **8.6k px desktop (−35%) and 11.8k px mobile (−37%)**.

### Structure

- **Reordered sections**: Portfolio now precedes Pricing — the hero's closing line ("më poshtë gjen disa punë…") promised work next, but pricing came first. New flow: Hero → Punët → Çmimet → Shërbimet → Formati → Procesi → Si punojmë → Zëra → FAQ → Kontakt. Navbar and footer links follow the same order.
- **Portfolio rebuilt** (2,032px → ~810px): three alternating photo-plus-skeleton blocks replaced by a compact 3-up grid of styled mini-sites with real Albanian micro-copy (restaurant menu with prices, law-office services, artisan shop) in small browser frames; horizontal snap-scroll on mobile. Removed the lede that announced the images were Unsplash placeholders.
- **Process rebuilt** (1,565px → ~500px): photo zigzag with scroll-spy rail replaced by a compact 4-step strip on a dark ink band — the page's mid-point contrast moment. `components/process/` (StepNav, useActiveStep) deleted; Process is now a Server Component.
- **WhyUs/Filozofia rebuilt** (1,090px → ~575px): six principles cut to four (the pricing-transparency and post-launch principles were already owned by Pricing and Services); sticky two-column ledger replaced by a 2×2 card grid.
- **Testimonials tightened** (1,252px → ~470px): removed the 700px English-language "CRAFTED" showcase figure; the three client quotes remain.
- **Services**: removed the blurred background image — a screenshot of a third-party fragrance site whose URL was legible through the blur; bullets hidden on phones (row text carries the message); rows compressed.
- **Pricing**: fixed the doubled "Më e zgjedhura" label (tagline now "Gati për nisje"); on mobile the four stacked cards became a swipeable snap row (2,463px → ~1,020px).
- **Format**: removed the duplicated number/title block from the preview pane (the picker already shows them).
- **Hero**: added a secondary "Shiko çmimet" link next to the main CTA; tightened padding and lede.

### Styling system

- Standardized section padding to `py-14 sm:py-20` (was a mix up to `py-32`).
- `SectionHeading` gained a `size` prop; secondary sections use a smaller headline scale so the page no longer shouts six times at 3.6rem.
- Page rhythm now alternates deliberately: paper → dark Process band → sage principles → paper → dark Contact.
- Removed images that no longer earn their bytes: `luxury-atmosphere.png`, `services-crafted.png`, `process-meeting.png`, `process-developer.png`. Only the Hero still loads a remote (Unsplash) image.

### Security

- Re-verified the hardening from the audit below after the redesign: Basic Auth via `src/proxy.ts` (fail-closed in production), two API routes only (`POST /api/contact`, `GET /api/contacts`), no `NEXT_PUBLIC_*` variables, database and env files gitignored, generic client error messages. No changes required.

## 2026-06-10 — Repository audit and cleanup

### Security

- **Unified admin auth on a single mechanism.** Removed the redundant Bearer-token endpoint `GET /api/contact/list` (and the `ADMIN_TOKEN` variable). The admin area — `/admin` and `GET /api/contacts` — is now protected exclusively by Basic Auth in `src/proxy.ts`.
- **Removed hardcoded fallback credentials.** `proxy.ts` previously defaulted to `admin` / `krijo-dev` when env vars were missing — including in production. It now fails closed: production without `ADMIN_USER`/`ADMIN_PASSWORD` returns `503`. Credential comparison is constant-time (`crypto.timingSafeEqual`).
- **Hardened `GET /api/contacts`.** A non-numeric `limit` parameter previously reached SQLite as `NaN` and produced a 500; it now falls back to the default. Max limit lowered from 1000 to 500.
- **Honeypot made indistinguishable.** Bot submissions now receive the same `201 { ok, id }` shape as real ones instead of a detectable `200`.
- Removed the informational `GET /api/contact` handler (now a proper `405`).

### Configuration

- Added a committed [.env.example](.env.example) documenting all variables. The previous `.env.local.example` was matched by the `.env*` gitignore rule and therefore invisible to anyone cloning the repo.
- New optional `DATA_DIR` variable to relocate the SQLite database (e.g. onto a persistent volume).

### Code quality

- Removed dead code: unused `lucide-react` dependency, unused `ui/Button.tsx`, unused `WhatsAppIcon`, and five leftover create-next-app SVGs in `public/`.
- Extracted the repeated section-eyebrow markup into `ui/Eyebrow.tsx`, now used by `SectionHeading`, Hero, WhyUs, Faq, Testimonials, and Contact.
- Fixed React lint errors: `Frame` component created during render in `Format.tsx` (hoisted to module level), unused map indices in `Footer.tsx`.
- Replaced deprecated Zod `z.string().email()` with the Zod 4 `z.email()` (piped after trim/lowercase normalization). Empty optional fields (`phone`, `business`) are now stored as `NULL` instead of `""`.
- Removed a dead `form.reset()` call in `Contact.tsx` (the form unmounts on success).

### Accessibility & UX

- Added a skip link ("Kalo te përmbajtja") and a global `:focus-visible` outline.
- Associated contact-form labels with inputs (`htmlFor`/`id`) and gave the fields a visible keyboard-focus style on the dark section.
- Fixed footer link hover that faded text to near-invisible (`paper-soft` on `paper-deep`); now uses the accent color.
- Replaced an incomplete ARIA tab pattern in the Format picker with toggle buttons (`aria-pressed`).
- Mobile menu button `aria-label` now reflects open/closed state; nav landmarks renamed ("Navigimi kryesor").
- Admin dashboard timestamps now carry a machine-readable `dateTime` attribute and a UTC marker.

### Albanian copy

- Fixed grammatical errors: "Cili format i përshtatet — marka jote?" → "…markës sate?" (dative), "sesi" → "se si".
- Fixed mistranslations in image alt text: "hapësirë pakicash" (read as "minorities' space"), "gjatë qiellit" ("during the sky"), "me takime" ("with meetings" instead of tables).
- Replaced anglicisms with the terms already used elsewhere on the site: "Backup ditor" → "Kopje rezervë ditore", "Korrigjim bug-esh" → "Rregullim defektesh", "cash" → "para në dorë", "Sajt me disa faqe" → "Uebsajt me nënfaqe", "do të kthehemi te ti" → "do të të përgjigjemi".
- Smoothed awkward phrasing: "të përfaqëson denjësisht", "fotografi e kujdesshme", "sipas strukturës", "për ne" → "rreth nesh".

### Documentation

- Rewrote `README.md` as a standard project document (overview, architecture, API reference, env vars, deployment notes, security) replacing the personal tutorial with machine-specific paths.
- Added an MIT [LICENSE](LICENSE) and this changelog.
