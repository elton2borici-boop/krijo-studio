# Code tour

New to this codebase? Read the files in this order. Each step builds on the one before.

## 0. The 30-second picture

This is **one website** (the Krijo Studio homepage plus a privacy page) built with **Next.js**, a React framework. It has two halves:

| Half | What it does | Where it lives |
|---|---|---|
| **The page people see** | Hero, prices, services, FAQ, contact form… | `src/app/page.tsx` → `src/components/` → text in `src/content/` |
| **The small backend** | Saves contact-form messages and shows them to you at `/admin` | `src/app/api/`, `src/lib/db.ts`, `src/app/admin/` |

Three ideas explain almost everything:
1. **Folders under `src/app/` are URLs.** `src/app/page.tsx` is `/`, `src/app/privatesia/page.tsx` is `/privatesia`, and `src/app/admin/page.tsx` is `/admin`.
2. **Components are functions that return HTML-like code (JSX).** `<Hero />` in one file means "put the Hero component here", and it is defined in `Hero.tsx`.
3. **The long `className="..."` strings are styling (Tailwind CSS).** Each word is one style: `mt-8` is margin-top, `text-lg` is a larger font, `bg-accent-fill` is the blue background, and `sm:`/`lg:` mean "only on bigger screens". You don't need to memorise them.

Run it while you read (`npm run dev`, then http://localhost:3000). Change something, save, and the browser updates instantly. That is the fastest way to learn what each file does.

---

## 1. Start here: the homepage, top to bottom
**`src/app/page.tsx`** (about 40 lines). This is the table of contents of the site:

```
<Navbar />
<Hero />          ← big navy top area
<Format />        ← "Cili format i përshtatet…" picker
<Pricing />       ← the 4 packages
<Services />      ← 6 service cards
<Process />       ← 4 steps on the photo
<Faq />
<Contact />       ← headline + form
<Footer />
```

To change the **order** of sections, or remove one, this is the only file you touch.

## 2. The frame around every page
**`src/app/layout.tsx`**: loaded for every page. It holds:
- the two fonts (Sora for headings, DM Sans for text);
- the Google/social-media title and description (`metadata`);
- a tiny script that applies dark mode before the page appears.

## 3. The text lives in `src/content/` (easiest place to make real changes)
You can edit these without understanding React. They are just lists of text:

| File | What's in it |
|---|---|
| `packages.ts` | **The 4 packages and prices.** Change a price here and it updates everywhere: the pricing cards, the hero's "Nga €299", the contact form's options and the Google data. |
| `faqs.ts` | FAQ questions (`q`) and answers (`a`) |
| `services.ts` | The 6 service cards |
| `process.ts` | The 4 process steps |
| `formats.ts` | The 4 site types in the "format" picker |

Also **`src/lib/site.ts`** holds the business details: email, phone, address, social links and the website URL. Anything left as `null` is simply hidden on the site.

## 4. The sections: `src/components/sections/`
There is one file per section from step 1. Read **`Hero.tsx`** first. It is short and shows the pattern every section follows:
- imports at the top (pieces it uses);
- a `function Hero()` that `return`s the JSX for that part of the page;
- text comes either written inline or from `src/content/`.

Then read whichever section you want to change. The bigger ones:
- **`Format.tsx`** and **`Process.tsx`** are interactive: they start with `"use client"` and use `useState` to remember which option or step is selected.
- **`ContactForm.tsx`** is the form. It sends the data to `/api/contact` (step 7).
- **`SiteMocks.tsx`** holds the little fake example websites (restaurant, law office, shop, photographer).

## 5. Reusable building blocks: `src/components/ui/` and `layout/`
These are the small pieces the sections are made of:
- `Button.tsx`: the blue and outline buttons.
- `Section.tsx`: spacing and background for each section.
- `SectionHeading.tsx`: the big heading plus the grey sentence under it.
- `layout/Navbar.tsx` (top menu), `Footer.tsx`, `Logo.tsx`, `ThemeToggle.tsx` (dark-mode button).

If you change something here, it changes in every section that uses it.

## 6. Colours and global styles
**`src/app/globals.css`**, the top part, defines all colours once:
- `:root { --accent: …; --canvas: … }` holds the light-mode colours;
- the `[data-theme="dark"]` block below it holds the dark-mode colours;
- `.tone-ink` is the navy used by the hero, the process band, the footer and the recommended price card.

To change the blue everywhere, change it here.

## 7. The backend: what happens when someone sends the form
Follow one message through the code:
1. **`components/sections/ContactForm.tsx`** sends the form as JSON to `/api/contact`.
2. **`src/app/api/contact/route.ts`** checks the fields (name, a valid email, a long enough message), blocks spam bots and limits how many messages one person can send, then saves the message.
3. **`src/lib/db.ts`** saves it into a small database file, `data/krijo.db` (SQLite).
4. **`src/lib/notify.ts`** can optionally email you or send a Telegram message. It is switched on by the settings in `.env.example`.
5. **`src/app/admin/page.tsx`**: open `/admin` to read all the messages.
6. **`src/proxy.ts`** puts a password on `/admin` on the live site (`ADMIN_USER`/`ADMIN_PASSWORD`). On your computer it's open.

## 8. Small files you can skip for now
- `privatesia/page.tsx`: the privacy policy page.
- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `lib/structured-data.ts`: for Google and for the image shown when the link is shared.
- `MotionLayer.tsx`: the fade-in-on-scroll effect, and pausing the hero wall once it's scrolled out of view.
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`: project settings.
- `README.md` (setup) and `CHANGELOG.md` (history of what changed).

---

## "I want to change X": which file?

| I want to… | Open |
|---|---|
| Change a price or a package | `src/content/packages.ts` |
| Change email, phone, address, socials | `src/lib/site.ts` |
| Edit an FAQ, service or step | the matching file in `src/content/` |
| Change the big headline at the top | `src/components/sections/Hero.tsx` |
| Change the order of sections, or remove one | `src/app/page.tsx` |
| Change colours | top of `src/app/globals.css` |
| Change the Google title/description | `src/app/layout.tsx` (`metadata`) |
| Read contact messages | visit `/admin` |

## A good first exercise (10 minutes)
1. Run `npm run dev` and open http://localhost:3000.
2. In `src/content/packages.ts`, change `price: 299` to `249`, then save.
3. Watch it change in three places: the pricing card, the hero line "Nga €249" and the contact form option ("Vetëm Faqja · €249"). It also changes in the hidden price data Google reads. That shows how one content file feeds many components.
4. Change it back.
