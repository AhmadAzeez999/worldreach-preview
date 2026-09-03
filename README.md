# World Reach Immigration Consulting, website

A rebuild of [worldreachimmigration.ca](https://worldreachimmigration.ca), replacing a
three-page WordPress site (Stygian theme) with a purpose-built one.

```bash
npm install
npm run dev     # http://localhost:3000 (LAN addresses work too, see allowedDevOrigins)
npm run build   # static prerender of all 21 routes
npm start
npm run lint
```

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion 13 · Lenis.
Every route prerenders to static HTML.

---

## The strategy, in one paragraph

World Reach is a single licensed consultant competing in a market whose defining
anxiety is fraud: unlicensed "ghost consultants" who take a fee and disappear.
Larger firms answer that anxiety with scale signals: client counts, media logos,
team grids. World Reach has none of those, and inventing them is both dishonest
and against the rules it practises under. So the site inverts the weakness and
leads with the one claim a stranger can independently check in ten seconds: the
licence number, wired straight to the College's public register. **Verifiability,
not volume.** That idea drives the hero, the `VerifyChip` component, the FAQ, and
the decision to answer the uncomfortable questions ("Can you guarantee approval?"
 no) in public.

---

## Things you must not break

### 1. `lib/content.ts` is the single source of truth

Every business fact the site asserts lives there, and nothing enters it that
cannot be verified from the client's own material or a public register. No
invented statistics, success rates, years in business, awards, client counts or
testimonials. Page copy, metadata, JSON-LD, the OG image and the sitemap all read
from it, so they cannot drift apart.

### 2. CICC advertising rules are load-bearing

The practice is regulated by the College of Immigration and Citizenship
Consultants. Its Code of Professional Conduct constrains the marketing:

| Section | Requirement | Where it is satisfied |
| --- | --- | --- |
| s.44(1)(a) | Registered name prominent at/near the beginning | `Wordmark` renders "World Reach **Immigration Consulting**" as real text in header and footer, never crop the descriptor |
| s.44(1)(b) | Public register address in written advertising | `VerifyChip` + footer regulatory strip |
| s.44(2) | No guaranteed outcomes, no claimed IRCC influence | FAQ, `/terms`, footer disclaimer, service-page asides |
| s.45 | Testimonials real, accurate, approved in writing | **None on the site.** Do not add any without written client approval |
| s.46 | Only the RCIC Licensee Insignia, never the CICC corporate logo | No CICC logo is used anywhere |

### 3. Content must never depend on JavaScript to be visible

Motion serialises its `initial` values into the server HTML as inline
`opacity:0` / `transform:translateY(...)`. If the client bundle does not
execute, those styles are permanent and the site renders as a header above a
blank void: which is exactly what happened when the dev server was opened from
a LAN address and Next's cross-origin guard blocked `/_next/*`.

The defence has two parts and both must stay:

* a blocking script in the document head sets `data-motion-ready` before first
  paint, and a watchdog clears it if React has not signalled hydration within
  2.5s (`MotionProvider` sets `window.__wrHydrated`)
* the **Fail-safe reveal states** block at the end of `app/globals.css` forces
  every animated element to its visible resting state while that flag is absent

Normal loads set the flag before paint, so the rules never apply and nothing
flashes. Verified against three cases: normal, JavaScript disabled, and the
bundle blocked with CSS intact, all three render the full page.

If you add a new animated element, it needs no special handling; the CSS keys
off the inline styles Motion emits. But do not "tidy up" that CSS block.

### 4. Never branch on `useReducedMotion()` during render

The preference is unreadable on the server, so branching on it renders one tree
on the server and another on a reduced-motion client. Which produced a
hydration error on every page during the build. It is handled globally by
`MotionProvider` (`MotionConfig reducedMotion="user"`), which suppresses
transforms while still resolving opacity, so nothing is ever left invisible.
Reading it inside an *effect* is fine; effects never run on the server.

---

## Where to change things

| I want to… | Go to |
| --- | --- |
| Change a phone number, address, hours, name, licence | `lib/content.ts` |
| Add or edit a service | `services` array in `lib/content.ts`, routes, nav, footer, sitemap, JSON-LD and the consultation form all follow automatically |
| Change the logo | the PNGs in `/public`, every appearance (masthead, intro, hero, footer, favicon, OG card, form confirmations) reads from `components/brand/Logo.tsx` |
| Change colour, type or spacing | the `@theme` block in `app/globals.css` |
| Change animation feel | `EASE` / `DUR` in `lib/motion.ts` |
| Add a photo of the consultant | pass `src` to `<Portrait>` (see below) |

### The logo

The client's supplied JPEG had a white background, so it is processed once into
transparent, trimmed PNGs and used directly. Everything reads from
`components/brand/Logo.tsx`.

| File | What it is |
| --- | --- |
| `public/logo.png` | Navy + red as supplied, for the paper ground |
| `public/logo-light.png` | Navy remapped to paper, red lightened, for the ink ground, where the original navy would vanish into the background |
| `app/icon.png` | 512px favicon: the light mark on a navy plate, so it stays legible against both light and dark browser chrome |
| `public/logo-og.png` | Downscaled mark embedded in the social card |

Background removal derives per-pixel alpha from each pixel's distance from
white, then **un-premultiplies the colour against white**, without that step,
anti-aliased edges keep a pale halo that shows up the moment the logo is placed
on the dark ground.

**To replace the artwork:** regenerate all four files from the new source. The
one-off scripts that produced them are throwaway (they drive headless Chromium's
canvas rather than adding an image dependency to the project), so the practical
route is to export the four variants from a design tool and drop them in.

Because the artwork is raster, the intro cannot draw itself stroke by stroke.
Instead the logo is uncovered by a wipe rising from the bottom edge with a slight
settle on the scale. The same upward gesture the mark's own trajectory makes.
`components/brand/AscentRule.tsx` carries that gesture into the page as a section
rule that rises from left to right.

Note the logo is a detailed illustration rather than a line mark: it needs more
height than a simple glyph to stay legible (hence `h-11`/`h-12` in the masthead),
and as a faded background element it must be large and bled off the edge, or it
reads as a smudge rather than as architecture.

---

## Placeholder photography

⚠ Everything in `public/photos` is **free stock imagery, used so the client can
see a complete-looking site.** None of it shows World Reach, its consultant, or
its clients. `public/photos/CREDITS.json` lists every file with its source and
licence. Replace these before launch.

One deliberate choice worth keeping: the consultant portrait is **faceless** on
purpose. Putting a stranger's face under "Reuben Onyango, RCIC R707677" would
fabricate an identity for a named, licensed individual, on a page whose whole
argument is that you can verify who we are. If you drop the `src`, `<Portrait>`
falls back to a designed typographic panel carrying the licence record.

Images are placed through two components:

* `components/ui/Figure.tsx` for framed images, with a clip-wipe reveal and a
  small scroll parallax
* `components/sections/ImageBand.tsx` for the full-bleed homepage moment

## Interaction design

The site's motion is deliberately quiet, with a few moments that reward
attention rather than demanding it:

| Where | What happens |
| --- | --- |
| Service index rows | Hovering summons that service's photograph, which trails the cursor on a spring and swaps as you move down the list. Mouse only, `pointer-events-none`, and only the hovered image is ever requested. |
| Primary CTAs | `Magnetic` leans the button a few pixels toward the pointer and springs back. Capped at 6px, mouse only, and reserved for genuinely primary actions. |
| All solid buttons | A narrow specular band sweeps across the face once on hover, plus a fill that wipes up from the bottom edge and a 1.5% press. |
| Navigation | One indicator shared across the nav via `layoutId`, so it travels between items instead of fading out and in. |
| Top of window | A two-pixel scroll-progress rule, spring-smoothed. |
| Process rail | Fills with scroll position. The only scroll-linked effect on the site, because it communicates something real. |

The rule applied throughout: every effect is a transform or an opacity change,
so it composites on the GPU, and anything that responds to hover is skipped
entirely on coarse pointers.

## House style: no em dashes

The copy deliberately contains **no em dashes**, in prose or in code comments.
Where one would naturally appear, the sentence is restructured instead: split in
two, joined with a comma or conjunction, or turned into a colon for a
label/description pair. Please keep it that way when editing.

## Outstanding content slots

Marked with `⚠ CONTENT SLOT` in the source. None of these are faked; each is
designed to look deliberate while empty and to improve sharply once filled.

1. **A photograph of Reuben Onyango**, the highest-value missing asset. For a
   single-practitioner firm, a real face is the strongest trust signal there is.
   Drop the file in `/public` and pass `src` to `<Portrait>` in
   `components/sections/Consultant.tsx` and `app/about/page.tsx`. Until then it
   renders a designed typographic panel carrying the licence record, rather than
   stock imagery of a stranger. Which on a page arguing "you can verify who we
   are" would be actively self-defeating.
2. **A biography**, career history, education, languages, the year the practice
   opened. `app/about/page.tsx` has a column waiting for it.
3. **Testimonials**, only with written client approval (s.45).
4. **`/privacy` and `/terms`** are good-faith baselines reflecting how the site
   actually behaves. They need the client's own review before launch, and must be
   revised if analytics, a CRM, a scheduling tool or a chat widget are added.

---

## Form delivery

Both forms post to a server action in `app/actions/consultation.ts`. Delivery is
provider-agnostic and configured by environment, no SDK in the bundle, no
credential on the client. Copy `.env.example` to `.env.local`:

```
RESEND_API_KEY=...        # if absent, forms fall back (see below)
ENQUIRY_TO=info@worldreachimmigration.ca
ENQUIRY_FROM=website@worldreachimmigration.ca   # must be a verified sender
```

**If no provider is configured the action does not pretend to have delivered
the enquiry.** It returns `status: "fallback"` and the UI offers a prefilled
`mailto:` link so the message still reaches the business. Silently swallowing a
lead is the worst possible failure mode for this site, so it is impossible by
construction. Swapping Resend for another provider means editing one `fetch`.

Both forms carry a honeypot field and require explicit consent.

---

## SEO and the migration

The old WordPress URLs are already indexed, so `next.config.ts` issues permanent
redirects rather than throwing that equity away:

- `/workshop` → `/services` (the old services page, an artefact of the theme,
  and a genuinely harmful URL for a page about immigration services)
- `/contact-us` → `/contact`
- `/coming-soon`, `/elementor-landing-page-407`, `/elementor-landing-page-454` → `/`

Also in place: per-page titles and descriptions, canonicals, `sitemap.ts`,
`robots.ts`, Open Graph, a build-time OG image, and JSON-LD for
`ProfessionalService`, `Person` (with `hasCredential`), `Service`,
`BreadcrumbList` and `FAQPage`. There is deliberately **no** `aggregateRating` or
`review` markup. There are no verified reviews, and inventing them would breach
both s.45 and Google's guidelines.

---

## Accessibility

Verified in a headless browser rather than asserted:

- **752 rendered text nodes across 9 pages pass WCAG AA contrast.** Measured on
  composited colours: Tailwind emits `oklab()` for opacity modifiers, so naive
  parsing reports nonsense.
- Every interactive target meets WCAG 2.5.8 (24px), excepting the documented
  inline-text and visually-hidden exceptions.
- Semantic landmarks, one `<h1>` per page, skip link as the first tab stop,
  visible focus rings, `aria-expanded`/`aria-controls` on disclosures, real
  `<label for>` (never placeholder-as-label), errors wired via
  `aria-describedby` + `role="alert"`, and `aria-invalid` driving the error
  styling so visual and assistive states cannot disagree.
- Reduced motion is honoured: no intro, no smooth scroll, no transforms.
- A `<noscript>` rule forces scroll-reveal elements visible, so copy is never
  lost if JavaScript fails.

## Performance

All routes are static. Smooth scrolling is deliberately disabled on touch
devices and for reduced-motion users. Mobile browsers already do it well, and
overriding it costs frames. Animation is limited to transform and opacity. Only
one scroll-linked effect exists on the whole site (the process rail), because it
communicates something real: progress through a sequence.
