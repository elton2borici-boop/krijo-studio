# Changelog

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
