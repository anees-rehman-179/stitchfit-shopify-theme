# Stitch Fit — Admin Setup Reference

This theme leans on Shopify admin for navigation, transparent-header config,
and footer block composition. Configure these once per store; the theme code
takes care of the rest.

---

## 1. Navigation menus

Create the following menus in **Shopify admin → Online Store → Navigation**.

### Main menu — handle `main-menu`

- **Shop** (dropdown)
  - Polo Shirts → `/collections/polo-shirts`
  - Sweaters & Pullovers → `/collections/sweaters-pullovers`
  - Cardigans → `/collections/cardigans`
  - T-Shirts & Henleys → `/collections/t-shirts-henleys`
  - Shop All → `/collections/all`
- **Inside the Factory** → `/pages/inside-the-factory`
- **Lookbook** → `/pages/lookbook`
- **Size Guide** → `/pages/size-guide`
- **Contact** → `/pages/contact`

### Footer menus

- **Footer — Shop** (handle `footer-shop`)
  - Polo Shirts, Sweaters & Pullovers, Cardigans, T-Shirts & Henleys, Shop All
- **Footer — Studio** (handle `footer-studio`)
  - Inside the Factory, Lookbook, Our Story
- **Footer — Help** (handle `footer-help`)
  - Size Guide, Shipping, Returns & Exchanges, Contact

---

## 2. Header — transparent over hero

In **Online Store → Customize → Theme settings → Header**, enable:

- **Transparent header on homepage**: ON
- **Transparent header colour scheme**: choose the scheme whose
  `foreground` is bone (`#EBE4D6`) — when the header sits over the hero video,
  text needs to be light. Use scheme-6 (transparent + light text).
- **Sticky header**: ON (scroll-up reveal works best)
- **Logo image**: upload `stitch-fit-logo-dark.png` (use the dark-bg variant
  for the transparent state where it overlays the hero)
- **Logo width**: 120–140 px

---

## 3. Footer composition

In the theme editor on any page, open the footer section. Add these blocks
in order, left-to-right:

1. **Logo block** + **Text block** with the tagline _"Wear the vibe. EST. 1928"_
2. **Menu block** linked to `footer-shop`, heading "Shop"
3. **Menu block** linked to `footer-studio`, heading "Studio"
4. **Menu block** linked to `footer-help`, heading "Help"
5. **Email-signup block** (keeps Horizon's existing newsletter form)
6. Optional **Text block** at the bottom with the store address:
   _Climax Knitting Industry, S.I.E #1, Plot 94-B, Near Jinnah Road, Gujranwala 52250_

Set the footer section **colour scheme** to scheme-5 (forest green background,
bone text).

---

## 4. Product page accordions

To reproduce the spec's three accordions (Fabric & Care / Sizing /
Shipping & Returns) on every PDP, open any product in the theme editor and
add three **Accordion blocks** under the product info column. Configure their
content in each accordion's settings. No code change required.

---

## 5. Pages to create in admin

- `/pages/size-guide`
- `/pages/shipping`
- `/pages/returns-exchanges`
- `/pages/contact` — set template to `page.contact` once a page-contact JSON
  template exists, or drop the `sf-contact-block` section into the page
- `/pages/inside-the-factory` — set template to `page.factory`
- `/pages/lookbook`
- `/pages/our-story`

---

## 6. Heading font (Canela)

Canela `.woff2` files ship in `assets/` and activate via `assets/stitch-fit-fonts.css`.
The Shopify font picker for headings stays on Inter as a fallback — `stitch-fit.css`
overrides headings to use the Canela stack directly. No action needed.
