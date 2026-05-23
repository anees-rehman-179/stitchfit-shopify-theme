# STITCH FIT — FRONTEND BLUEPRINT & HANDOFF PROMPT FOR CLAUDE

You are picking up a Shopify theme project mid-build. Read this entire document before touching code. It is the single source of truth for **where the frontend stands today**, **what is done**, **what remains**, and **what must be changed**. Cross-reference `CLIENT_BRIEF.md`, `IMAGE_AUDIT.md`, `PAGES_SETUP.md`, and `PRODUCT_SETUP.md` in repo root — they are companion docs, not replacements for this one.

---

## 0 · PROJECT IDENTITY

- **Client:** Hamza Bajwa — Stitch Fit (Pakistani knitwear brand, Gujranwala factory since 2009, brand launching 2026, heritage marker "EST. 1928")
- **Theme base:** Shopify "Horizon" (Online Store 2.0, JSON templates, section groups, block-based blocks/)
- **Working directory:** `/home/Anees/Documents/Brand Stitch Fit /shopify theme`
- **Active branch:** `copilot/vscode-mp9rzwgz-gs95` (off `main`)
- **Tagline (locked, never translate):** *Wear the vibe.*
- **Language:** English only at launch. Urdu = Phase 2, do not add now.
- **Brand voice:** Quiet, confident, ≤2 sentences per copy block. No emojis, no "luxury" word, no competitor names.

### Brand tokens (locked — already wired in `assets/stitch-fit.css`)
| Token | Hex | Role |
|---|---|---|
| `--sf-primary` | `#2B3A2E` | Deep Forest Green — header, footer, CTA |
| `--sf-accent` | `#A8754C` | Cognac — links, price, hover |
| `--sf-base` | `#EBE4D6` | Bone Cream — page bg |
| `--sf-text` | `#1A1F1B` | Deep Ink — body text |
| `--sf-card` | `#C4B8A4` | Warm Stone — cards/inputs |
| `--sf-badge` | `#D4B891` | Soft Camel — eyebrow text on dark |
| `--sf-moss` | `#5C6B5A` | Moss — muted/hover |

### Type (locked)
- **Display / Headings:** Canela (300/400/500), letter-spacing 0.08em. Files live at `assets/Canela-Light.woff2`, `Canela-Regular.woff2`, `Canela-Medium.woff2`, wired via `assets/stitch-fit-fonts.css`.
- **Body / UI:** Inter, 16px / 1.55.

### Logo assets (in `assets/`)
- `stitch-fit-logo.jpeg` — light mark, use on dark BG (splash, footer)
- `stitch-fit-logo-forest.png` — for forest header
- `stitch-fit-logo-dark.png` — dark mark, use on bone/light BG

---

## 1 · REPO STRUCTURE (custom Stitch Fit work lives under `sf-` prefix)

```
sections/   ← custom: sf-hero-video, sf-brand-strip, sf-shop-by-category,
               sf-story-teaser, sf-quality-callout, sf-lookbook,
               sf-cta-band, sf-factory-editorial, sf-our-story,
               sf-craft-quality, sf-lookbook-page, sf-size-guide,
               sf-shipping, sf-returns, sf-contact-block,
               sf-catalog-header, sf-collection-banner, sf-full-footer,
               sf-nav-related, sf-quality-callout
            ← Horizon core sections (header, footer, main-product,
               main-collection, main-cart, etc.) left intact.

snippets/   ← custom: sf-nav.liquid, sf-splash.liquid, sf-placeholder.liquid
               (placeholder labels match CLIENT_BRIEF naming convention)

templates/  ← index.json, product.json, collection.json, collection.all.json,
               page.factory.json, page.craft-quality.json, page.our-story.json,
               page.lookbook.json, page.size-guide.json, page.shipping.json,
               page.returns-exchanges.json, page.contact.json

assets/     ← stitch-fit.css (all custom CSS additions, ~493 lines diff),
               stitch-fit.js (custom JS — Contact pill injection, splash,
               nav behaviour, ~309 lines diff),
               stitch-fit-fonts.css, Canela woff2 files, logo files,
               home-page-hero.mp4, quality-hero.jpg
```

> ⚠️ All Stitch-Fit-specific styles are scoped inside `assets/stitch-fit.css`. **Do not write custom rules in `base.css`.** Horizon owns that.

---

## 2 · PAGE-BY-PAGE STATUS

For each page: **what's built, what's placeholder, what's missing, what must change.**

### 2.1 HOME — `templates/index.json` ✅ structurally complete

Order of sections (locked):
1. `sf-hero-video` — full-bleed hero. Has video `assets/home-page-hero.mp4` wired + poster fallback. Headline "Wear the vibe.", subhead present, CTA → `/collections/all`. ✅ Working.
2. `sf-brand-strip` — single-line quote band. ✅ Text-only, done.
3. `sf-shop-by-category` — marquee of 4 category tiles (Polo, Sweaters & Pullovers, Cardigans, T-Shirts & Henleys), duplicated for infinite scroll. ⚠️ Tiles render but **category images are placeholders** — merchant must upload `CATEGORY-POLO`, `CATEGORY-SWEATERS`, `CATEGORY-CARDIGANS`, `CATEGORY-TSHIRTS` at 4:5.
4. `sf-story-teaser` — left image + right copy. ⚠️ **`FATHER-PHOTO` placeholder** still — awaiting Hamza's father photo upload.
5. `sf-quality-callout` — 3 pillars (Premium Yarn / True Gauge / Hand Finished), icon-based. ✅ No images needed.
6. `sf-lookbook` — 6-tile bento grid. ⚠️ All 6 are `LOOKBOOK-1`…`LOOKBOOK-6` placeholders — pending photoshoot.
7. `sf-cta-band` — final CTA "Shop the full range". ✅ Done.

**What must change on Home:**
- Replace category tile images once merchant uploads (no code change — just settings).
- Replace `FATHER-PHOTO` once delivered.
- Replace 6 lookbook bento tiles once photoshoot lands.
- Hero `.mp4` is currently a temporary clip; confirm with Hamza whether `assets/home-page-hero.mp4` is the final asset or a stand-in.

### 2.2 PRODUCT — `templates/product.json` ⚠️ functional but unverified

- Uses Horizon's `main-product` + `product-recommendations` setup, with custom blocks for media gallery (2-col grid, right thumbnails, zoom enabled) and product details (variant picker, price, ATC).
- Product data: see `products.csv` in repo root — 40 products defined (10 per category) with placeholder pricing.
- **What's missing:**
  - Real product photos. Every product currently relies on placeholders (`[handle]-MAIN`, `[handle]-ALT-1/2`).
  - Accordion blocks for Fabric & Care / Sizing / Shipping & Returns are **not yet added per-product** — `PAGES_SETUP.md §6` says to add them via theme editor on each product. This is a **merchant-side action**, not a code task.
  - Sticky add-to-cart (`assets/sticky-add-to-cart.js`) exists in Horizon — verify it's enabled and not breaking on the bone-cream scheme.
- **What must change:** confirm price display uses `--sf-accent` cognac (per brand spec) — check `snippets/price.liquid` and `snippets/product-card.liquid` (modified in current diff).

### 2.3 COLLECTION — `templates/collection.json` + `collection.all.json` ⚠️

- Collection.json was heavily edited in current diff (-144/+much smaller). Now uses `sf-collection-banner` + `sf-catalog-header` + `main-collection` grid. ✅ Structure OK.
- `collection.all.json` is a new file (untracked) — needs verification that it renders the "Shop All" view per spec.
- **What must change / verify:**
  - 2/3/4-column responsive grid behaves on mobile.
  - Filter sidebar (Horizon facets) styles match Stitch Fit palette — likely needs CSS tweaks in `stitch-fit.css`.
  - Empty-collection state shows brand-appropriate copy (not Horizon defaults).

### 2.4 INSIDE THE FACTORY — `templates/page.factory.json` ⚠️ placeholders heavy

- Section `sf-factory-editorial.liquid` exists, renders 8 image slots (1 hero 16:9, 3 machine 4:5, 1 full-bleed 16:9, 3 hands 3:4).
- All 8 images are `sf-placeholder` renders today (`FACTORY-FLOOR-WIDE`, `MACHINE-DETAIL-1/2/3`, `WORKER-HANDS-1/2/3`).
- Copy is in section settings — pulled from CLIENT_BRIEF Q11–13. ✅
- **What must change:** merchant delivers factory photos/video. Until then, leave placeholders — DO NOT delete the slots.

### 2.5 CRAFT & QUALITY — `templates/page.craft-quality.json` ✅ mostly done

- `sf-craft-quality.liquid` — 1 optional hero image + 4 SVG-icon pillars (Yarn / Gauge / Hand / Fibre) + numbered standards.
- `assets/quality-hero.jpg` is wired as the hero.
- ✅ Self-contained. No outstanding blockers.

### 2.6 OUR STORY — `templates/page.our-story.json` ⚠️ status conflict

- Section `sf-our-story.liquid` was built (hero + founder portrait + closing image).
- **BUT** `CLIENT_BRIEF.md §A` explicitly says: *"About / Our Story ❌ (covered by Inside the Factory + homepage story teaser)"* — Hamza did **not** select this page.
- **Decision required:** either (a) delete the Our Story template + section to honour the brief, or (b) confirm with Hamza that he wants it kept as a soft companion to the factory page. **Ask before deleting.**

### 2.7 LOOKBOOK — `templates/page.lookbook.json` ⚠️ conditional

- `sf-lookbook-page.liquid` built — hero + 6-tile bento + up to 3 outfit cards.
- CLIENT_BRIEF: *"Lookbook (only if photoshoot will be done) ✅"* — page exists but **all 6–9 image slots are placeholders**. Do not delete; wait for photoshoot.

### 2.8 SIZE GUIDE — `templates/page.size-guide.json` ✅ ready

- `sf-size-guide.liquid` includes the full size table (XS–XXL, cm, chest/waist/hips/shoulder/sleeve) per CLIENT_BRIEF §SIZE GUIDE.
- Optional "how to measure" diagram + up to 3 fit visual cards — all optional placeholders.
- Fit philosophy copy is in section settings, taken verbatim from brief.
- ✅ Page is launch-ready as text-only; visuals are nice-to-have.

### 2.9 SHIPPING — `templates/page.shipping.json` ⚠️ text needs merchant fill

- `sf-shipping.liquid` renders the shell (icons + tables for domestic/international).
- Actual shipping zones, rates, and ETAs are **merchant data, not yet filled**. Either hardcode placeholder rows or expose schema fields so Hamza can edit in theme editor.

### 2.10 RETURNS & EXCHANGES — `templates/page.returns-exchanges.json` ⚠️ text needs merchant fill

- `sf-returns.liquid` — text-only, structured policy blocks. Awaiting Hamza's policy text.

### 2.11 CONTACT — `templates/page.contact.json` + `sections/sf-contact-block.liquid` ⚠️

- WhatsApp `+92 321 0900786 01`, Email `info@stitchfit.com.pk`, full Gujranwala address all hardcoded in section settings — pulled from CLIENT_BRIEF §E.
- Form fields present (name / email / message) using Shopify's native `{% form 'contact' %}`.
- **What must change:** confirm form submits to `info@stitchfit.com.pk` (set in Shopify admin → General → Sender email, not in theme).
- Floating WhatsApp button — `stitch-fit.js` injects a "Contact Us" pill in the header. **Verify a separate global floating WhatsApp FAB exists per CLIENT_BRIEF Q14** ("every page"). If not, add one.

### 2.12 CART — `templates/cart.json` (Horizon default) ✅

- Using Horizon's stock cart drawer + cart page. No customisation done; OK to leave unless Hamza requests brand styling.

### 2.13 404 / SEARCH / PASSWORD ⚠️ unverified

- Horizon defaults. Verify the 404 page reads in brand voice (currently generic). Search page (`templates/search.json`) is generic Horizon — no Stitch Fit copy applied yet.

---

## 3 · HEADER & FOOTER

### Header — `sections/header.liquid` + `sections/header-group.json` ⚠️ recently patched

- Last commit `8748a5c` fixed: navbar duplicate logo, scrolling whiteout, footer white circle.
- Structure: `[Logo] Shop ▾ | Inside the Factory | Size Guide | Contact | [Contact Us pill]`
- Shop mega dropdown: KNITWEAR column (4 categories + Shop All) + EXPLORE column (Inside the Factory, Lookbook, Our Story). ⚠️ Our Story link present — revisit per §2.6 decision.
- Transparent on home (scheme-6), forest green elsewhere (scheme-5). Sticky-on-scroll-up enabled.
- Contact-Us pill is **injected by `stitch-fit.js`** — do not duplicate it in liquid.
- **Verify:** cart icon counter, mobile drawer behaviour, search modal — all Horizon stock.

### Footer — `sections/footer.liquid` + `sections/footer-group.json` + `sections/sf-full-footer.liquid`

- 4-column layout: Logo+tagline / Shop / Studio / Help — matches CLIENT_BRIEF §Footer.
- Bottom row: full address + email + WhatsApp + © Stitch Fit 2026.
- Forest green (scheme-5) + bone text. ✅
- Note: There are **two footer implementations** — Horizon's `footer.liquid` (heavily edited) and a custom `sf-full-footer.liquid`. **Confirm only one is active** to avoid double-rendering.

---

## 4 · NAVIGATION MENUS (Shopify admin — NOT code)

These must exist in **Online Store → Navigation** before launch, handles must match exactly:
- `main-menu` (header)
- `footer-shop`, `footer-studio`, `footer-help`
See `PAGES_SETUP.md §3` for exact link structure.

---

## 5 · ASSETS STATUS

| Category | State |
|---|---|
| Fonts (Canela woff2) | ✅ all 3 weights in `assets/` |
| Brand logos (3 variants) | ✅ in `assets/` |
| Hero video `home-page-hero.mp4` | ⚠️ stand-in, confirm with Hamza |
| `quality-hero.jpg` | ✅ wired to craft-quality page |
| Category tile images (4× 4:5) | ❌ placeholders |
| Father photo (story teaser) | ❌ pending Hamza upload |
| Factory page imagery (8) | ❌ all placeholders, pending shoot |
| Lookbook (home 6 + page 6–9) | ❌ all placeholders, pending shoot |
| Product photography (40 SKUs × 2–3 each) | ❌ all placeholders |

**Placeholder system:** `snippets/sf-placeholder.liquid` accepts a label (e.g. `LOOKBOOK-3 · 3:4 ratio`) and renders a labelled, ratio-correct grey card. **Do not remove placeholders before assets land** — they keep layout intact and signal to merchant which slot they're filling.

---

## 6 · KNOWN ISSUES / OPEN BUGS

1. **Our Story page conflict** (see §2.6) — built but not in brief. Needs Hamza yes/no.
2. **Double footer risk** (see §3) — `footer.liquid` vs `sf-full-footer.liquid`. Audit and remove one.
3. **Global WhatsApp FAB** — required by brief but unconfirmed whether actually rendered on every page (Contact pill in header ≠ floating WhatsApp button).
4. **Sticky ATC + bone scheme** — needs cross-browser check on product page.
5. **Collection facets styling** — Horizon defaults likely don't match palette.
6. **Search + 404 copy** — still Horizon stock voice.
7. **Mobile mega-menu** — drawer behaviour on `Shop ▾` not confirmed for touch.
8. **Accordion blocks on product pages** — must be added in theme editor per product (merchant task, not code).

---

## 7 · WHAT YOU MUST DO NEXT (priority order)

1. **Resolve the Our Story decision** with the user before any cleanup.
2. **De-duplicate the footer.** Pick one implementation, delete the other, update `footer-group.json`.
3. **Add a global WhatsApp FAB** if missing — bottom-right, `+92 321 0900786 01`, opens `https://wa.me/923210900786` (verify number format — brief shows `+92 321 0900786 01` which has 11 digits after country code, likely a typo; confirm the real number is `+92 321 0900786` = `923210900786`).
4. **Style collection filters** to brand palette in `stitch-fit.css`.
5. **Brand-voice the 404 and search pages.**
6. **Verify product card price uses `--sf-accent`** (cognac) per brand rule.
7. **Cross-check mobile** for: header drawer, mega-menu, hero video performance, lookbook bento collapse, sticky ATC.
8. **Run the theme** via Shopify CLI (`shopify theme dev`) and visually confirm every page before declaring anything done. Do not claim a UI change works without seeing it in a browser.

---

## 8 · WHAT YOU MUST NOT DO

- **Do not** build FAQ, Journal/Blog, or About — explicitly cut from scope.
- **Do not** add Urdu strings — Phase 2.
- **Do not** invent product imagery or commission AI photos — placeholders only until merchant uploads.
- **Do not** modify `base.css` or Horizon core files unless absolutely necessary; put custom CSS in `stitch-fit.css`.
- **Do not** push, force-push, or amend commits without explicit user approval.
- **Do not** remove placeholder slots — they are intentional.
- **Do not** translate or rewrite the tagline "Wear the vibe."
- **Do not** use the word "luxury" anywhere in copy.
- **Do not** add emojis to UI strings.

---

## 9 · OPERATING RULES

- Keep copy to ≤2 sentences per block. Quiet, confident.
- All prices, product names, and category names: source of truth is `CLIENT_BRIEF.md §PRODUCT CATALOG` and `products.csv`.
- All addresses, emails, phone: source of truth is `CLIENT_BRIEF.md §E` and §CONTACT.
- Placeholder labels: source of truth is `CLIENT_BRIEF.md §PLACEHOLDER NAMING CONVENTION`.
- Before recommending a section/file name to the user, **verify it exists** with `ls` or `grep` — this repo has been edited heavily and some names in older docs may be stale.
- When in doubt, ask. Hamza is the client; Anees is the operator.

---

## 10 · FIRST RESPONSE EXPECTATION

When you receive this brief, respond with:
1. A 5-bullet read-back of what you understand the current state to be.
2. The **single most important open question** (probably the Our Story decision or the WhatsApp FAB).
3. A proposed next action — *do not start coding until the user confirms.*

End of brief.
