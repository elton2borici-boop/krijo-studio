# Changelog

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
