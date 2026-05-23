# STITCH FIT — CLIENT BRIEF (TIER 1)
## Hamza Bajwa — Confirmed Answers
## Source: Google Form Submission · 16 May 2026

> This file is the single source of truth for Claude Code.
> Use it for: product copy, brand voice, page content, contact info, navigation, footer, About page, factory page, size guide, and any text that appears on the storefront.

---

## SECTION A · Pages to Build

**Q1 — Which pages should the store have?**
Hamza selected:
- Inside the Factory ✅
- Craft & Quality (yarn, gauge, fibres explained) ✅
- Contact Us ✅
- Size Guide ✅
- Shipping Info ✅
- Returns & Exchanges ✅
- Lookbook (only if photoshoot will be done) ✅

NOT selected (do not build):
- About / Our Story ❌ (covered by Inside the Factory + homepage story teaser)
- FAQ ❌
- Journal / Blog ❌

**Q2 — Any other page missed?**
No answer given.

---

## SECTION B · Product Catalog

**Q3 — How many products at launch?**
`5–10`

**Q4 — What categories will you sell?**
- Polo shirts ✅
- Sweaters / Pullovers ✅
- Cardigans ✅
- T-shirts / Henleys ✅

**Q5 — Size range?**
`XS, S, M, L, XL, XXL`

**Q6 — Colour variants per style?**
`Mix — depends on the product`

---

## SECTION C · Brand Story

**Q7 — When was the business/factory founded? Who started it?**
> "Started in 2009 with knitting machine in Gujranwala. We still craft knitwear with the same passion."

**Q8 — How did it grow from factory to brand?**
> "For many years, we made knitwear for global brands. Now we're bringing the same quality to Pakistan under our own name."

**Q9 — What makes the quality different?**
> "Quality knitwear made by skilled hands."

**Q10 — Any photo that represents the brand story?**
> "My father's photo" *(asset pending — placeholder `FATHER-PHOTO` until uploaded)*

---

## SECTION D · Factory & Content

**Q11 — Do you want an "Inside the Factory" page?**
`Yes — dedicated "Inside the Factory" page with photos/video`

**Q12 — What factory content do you want?**
- Factory floor photos ✅
- Machine close-ups (knitting, sewing) ✅
- Worker hands at work ✅

**Q13 — Do you have photos/video of the factory?**
> "Photos/videos available — will provide later"
*(All factory slots = labelled placeholders until assets arrive)*

---

## SECTION E · Essentials (Hard-coded into theme)

**Q14 — WhatsApp number**
`+92 321 0900786 01`

Use for: floating WhatsApp button (every page), Contact page, footer

**Q15 — Customer service email**
`info@stitchfit.com.pk`

Use for: Contact page, footer, email signup confirmation text

**Q16 — Domain / website**
`stitchfit.com.pk`

**Q17 — Header / navigation style**
`same as example` *(confirmed: Nimra-style mega dropdown)*

**Q18 — Footer style**
`same as example` *(confirmed: 4-column with logo + links + address)*

**Q19 — Language at launch**
`English only at launch, Urdu added later`

All storefront copy = English only. No Urdu strings in theme. Urdu planned for Phase 2.

**Q20 — Business address (footer + legal pages)**
`Climax Knitting Industry, S.I.E # 1, Plot 94-B, Near Jinnah Road, Gujranwala. 52250`

---

## BRAND IDENTITY (Locked — from earlier brand Q&A sessions)

### Colour Palette (LOCKED)
| Token | Hex | Name | Use |
|---|---|---|---|
| `--sf-primary` | `#2B3A2E` | Deep Forest Green | Header, footer, CTA buttons, quality band |
| `--sf-accent` | `#A8754C` | Cognac | Links, price, hover states, pill CTA |
| `--sf-base` | `#EBE4D6` | Bone Cream | Page background, light text on dark |
| `--sf-text` | `#1A1F1B` | Deep Ink | Primary body text |
| `--sf-card` | `#C4B8A4` | Warm Stone | Card backgrounds, input fields |
| `--sf-badge` | `#D4B891` | Soft Camel | Badges, secondary accents, eyebrow text on dark |
| `--sf-moss` | `#5C6B5A` | Moss | Hover states, tags, muted text |

### Typography (LOCKED)
- **Display / Headings**: Canela (Commercial Type) — weights 300, 400, 500
  - Use for: logo, splash, hero headline, H1, H2, H3, pull-quotes, category names
  - Brand standard: letter-spacing 0.08em on all display copy
- **Body / UI**: Inter
  - Use for: body copy, captions, buttons, form labels, nav items, footer links
  - Brand standard: font-size 16px, line-height 1.55

### Logo (LOCKED)
- Mark: Interlocking SF geometric weave, 2-colour (gold + black/charcoal)
- Wordmark: "STITCH FIT" tracked, letter-spacing 0.4em
- Tagline beneath: "EST. 1928"
- Variants in `assets/`:
  - `stitch-fit-logo.jpeg` — light logo (use on dark backgrounds: splash, footer)
  - `stitch-fit-logo-forest.png` — on forest green background (header)
  - `stitch-fit-logo-dark.png` — dark logo (use on light backgrounds: bone cream pages)
- Oval badge variant: use for product labels, packaging imagery

### Tagline (LOCKED)
`Wear the vibe.`

- Use on: splash screen, hero section, footer brand column, hang tags
- Never modify or translate. English only.

### Brand Voice (LOCKED)
- Personality: Quiet confident gentleman
- Copy style: Short, punchy — never more than 2 sentences per block
- Topics: Lifestyle, values, craftsmanship
- Tone: Authoritative but never showy. Like Drake's London or Brunello Cucinelli — barely advertise, let the product speak
- Avoid: Competitor names, casual slang, emojis, excessive adjectives, "luxury" as a word (show it, don't say it)

### Origin Story (confirmed copy — use verbatim or lightly polish)
- Factory founding: *"Started in 2009 with one knitting machine in Gujranwala."*
- Export era: *"For many years, we made knitwear for global brands."*
- Brand launch: *"Now we're bringing the same quality to Pakistan under our own name."*
- Hamza's origin line: *"We are a factory that finally decided to build a brand."*
- Alternative (Ahsan's): *"Born from a manufacturing floor. Built for the man who knows the difference."*

Use Hamza's line as primary — it's the founder's voice.

### Quality Pillars (for Quality Callout section)
1. **Premium Yarn** — Long-staple fibres selected for softness and durability.
2. **True Gauge** — Knit at the right tension. Holds shape wash after wash.
3. **Hand Finished** — Every piece checked by hand before it ships.

---

## NAVIGATION STRUCTURE (use exactly)

### Header (left → right)
```
[STITCH FIT logo]   Shop ▾   Inside the Factory   Size Guide   Contact   [Contact Us pill]
```

Shop dropdown columns:
- **KNITWEAR**: Polo Shirts, Sweaters & Pullovers, Cardigans, T-Shirts & Henleys, Shop All
- **EXPLORE**: Inside the Factory, Lookbook, Our Story

### Footer (4 columns)
- **Col 1**: Logo + "Wear the vibe." + EST. 1928
- **Col 2 — Shop**: Polo Shirts, Sweaters & Pullovers, Cardigans, T-Shirts & Henleys, Shop All
- **Col 3 — Studio**: Inside the Factory, Lookbook, Craft & Quality
- **Col 4 — Help**: Size Guide, Shipping, Returns & Exchanges, Contact

Footer bottom row: Full address · Email · WhatsApp · © Stitch Fit 2026

---

## CONTACT INFORMATION (for footer, contact page, WhatsApp button)

| Field | Value |
|---|---|
| WhatsApp | +92 321 0900786 01 |
| Email | info@stitchfit.com.pk |
| Website | stitchfit.com.pk |
| Address | Climax Knitting Industry, S.I.E #1, Plot 94-B, Near Jinnah Road, Gujranwala, Punjab 52250 |
| Factory city | Gujranwala, Pakistan |
| Founding year | 2009 |
| Brand launch year | 2026 |
| Est. on branding | 1928 (heritage reference — the founding of craft tradition) |

---

## PRODUCT CATALOG (40 products — 10 per collection)

All prices are placeholders. Merchant will update before launch.
All images are placeholders. Merchant will upload before launch.
All products have sizes: XS, S, M, L, XL, XXL.

### POLO SHIRTS — `/collections/polo-shirts`
1. **Classic Pique Polo** — The foundational piece. Knit-finished placket, structured collar.
2. **Merino Blend Polo** — Lightweight warmth. 70% merino, 30% nylon blend.
3. **Textured Stitch Polo** — Waffle-knit surface. Tactile without noise.
4. **Slim Rib Polo** — Rib-knit construction. Body-following fit.
5. **Open Collar Polo** — Split neck variation. Relaxed modern silhouette.
6. **Fine Gauge Polo** — 18-gauge machine knit. Dresses up or down.
7. **Half-Zip Polo** — Chest zip detail. Between polo and pullover.
8. **Contrast Tip Polo** — Tipped collar and cuffs. Old money reference.
9. **Birdseye Polo** — Classic birdseye knit texture. Perennial staple.
10. **Longline Polo** — Extended hem. Wears over trousers or shorts.

### SWEATERS & PULLOVERS — `/collections/sweaters-pullovers`
1. **Crew Neck Sweater** — The clean reference. Every wardrobe starts here.
2. **V-Neck Merino Pullover** — Layering essential. Fine gauge drape.
3. **Half-Zip Pullover** — Chest zip. Goes over a shirt collar.
4. **Roll Neck Sweater** — Ribbed turtleneck. Cold-weather authority.
5. **Cable Knit Pullover** — Traditional Aran-inspired cable. Hand-finished detail.
6. **Drop Shoulder Knit** — Oversized width, clean finish.
7. **Colour Block Sweater** — Two-tone knit panels. Bold without being loud.
8. **Fisherman Rib Pullover** — Chunky fisherman rib. Tactile and warm.
9. **Saddle Shoulder Sweater** — Heritage shoulder construction detail.
10. **Waffle Knit Pullover** — Grid-textured surface. Lightweight and breathable.

### CARDIGANS — `/collections/cardigans`
1. **Open Front Cardigan** — Unstructured. Relaxed weekend layering.
2. **Button Front Cardigan** — 6-button fastening. Structured and polished.
3. **Shawl Collar Cardigan** — Shawl lapel. The old money cardigan.
4. **Zip-Up Cardigan** — Front zip. Sportier reference.
5. **Longline Cardigan** — Knee-length. Statement layering piece.
6. **Cable Knit Cardigan** — Aran cable panels. Traditional craft.
7. **Fine Merino Cardigan** — Lightweight merino. Under-jacket layering.
8. **Ribbed Cardigan** — Full-rib construction. Close-knit fit.
9. **Patch Pocket Cardigan** — Two lower pockets. Utility meets craft.
10. **Oversized Cardigan** — Dropped shoulder, wide body. Intentionally relaxed.

### T-SHIRTS & HENLEYS — `/collections/t-shirts-henleys`
1. **Classic Crew T-Shirt** — The everyday anchor. Premium 180gsm knit.
2. **Henley Neck T-Shirt** — 3-button placket. Between casual and dressed.
3. **Slim Fit Crew** — Fitted silhouette. Clean single-needle construction.
4. **Pocket T-Shirt** — Chest pocket detail. Effortless.
5. **Longline T-Shirt** — Extended hem. Tucks or hangs clean.
6. **Pique T-Shirt** — Textured pique knit. One step above jersey.
7. **Waffle Henley** — Waffle texture with henley neck. Tactile and warm.
8. **Striped Knit T-Shirt** — Horizontal rib stripe. Classic nautical nod.
9. **Double Layer T-Shirt** — Two-layer construction. Structured drape.
10. **Fine Rib T-Shirt** — 1x1 rib knit. Body-following. Sleek.

---

## SIZE GUIDE (for `/pages/size-guide`)

All measurements in centimetres. Pakistani standard sizing.

| Size | Chest | Waist | Hips | Shoulder | Sleeve |
|---|---|---|---|---|---|
| XS | 86–91 | 71–76 | 86–91 | 42 | 60 |
| S | 91–96 | 76–81 | 91–96 | 44 | 61 |
| M | 96–101 | 81–86 | 96–101 | 46 | 62 |
| L | 101–107 | 86–91 | 101–107 | 48 | 63 |
| XL | 107–112 | 91–96 | 107–112 | 50 | 64 |
| XXL | 112–117 | 96–101 | 112–117 | 52 | 65 |

Size guide copy:
> *"Our knitwear is crafted to a modern slim-to-regular fit. If you are between sizes, size up for layering or size down for a closer fit. Every piece is pre-washed to minimise shrinkage."*

---

## PLACEHOLDER NAMING CONVENTION

Use these exact labels on every `sf-placeholder` render:

| Slot | Label |
|---|---|
| Hero video | `HERO-VIDEO · 1920×1080 · mp4 · autoplay muted loop` |
| Hero poster | `HERO-POSTER · 1920×1080 · jpg` |
| Category: Polo | `CATEGORY-POLO · 4:5 ratio` |
| Category: Sweaters | `CATEGORY-SWEATERS · 4:5 ratio` |
| Category: Cardigans | `CATEGORY-CARDIGANS · 4:5 ratio` |
| Category: T-Shirts | `CATEGORY-TSHIRTS · 4:5 ratio` |
| Story / father photo | `FATHER-PHOTO · 4:5 ratio` |
| Factory hero | `FACTORY-FLOOR-WIDE · 16:9 ratio` |
| Machine detail | `MACHINE-DETAIL-[1/2/3] · 4:5 ratio` |
| Worker hands | `WORKER-HANDS-[1/2] · 4:5 ratio` |
| Lookbook tiles | `LOOKBOOK-[1–6]` |
| Product main | `[PRODUCT-HANDLE]-MAIN · 4:5 ratio` |
| Product alt | `[PRODUCT-HANDLE]-ALT-[1/2] · 4:5 ratio` |

---

## WHAT IS NOT IN SCOPE (do not build)

- FAQ page
- Journal / Blog
- Tier 2 items (pricing, shipping rules, payment gateway, loyalty app) — merchant fills separately
- Urdu language — Phase 2 only
- Real product photos — placeholders used throughout
- Real lifestyle/video content — placeholders used throughout

---

*Document compiled by Drazed.co from Hamza Bajwa's Google Form submission (16 May 2026) and brand identity sessions (May 2026). Last updated: May 2026.*
