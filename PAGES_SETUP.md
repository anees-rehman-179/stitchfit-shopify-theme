# Stitch Fit — Pages & Collections Setup

This file lists every CMS page and collection that must be created in
**Shopify admin** for the theme to render correctly. The theme ships the
templates and sections; pages/collections are merchant data and live in admin.

---

## 1. Pages

Create each page in **Shopify admin → Online Store → Pages → Add page**.
For each, set the **Theme template** picker on the right side of the editor.

| Title | URL Handle | Theme template | Initial content |
|---|---|---|---|
| Inside the Factory | `inside-the-factory` | `page.factory` | (leave body blank — section provides content) |
| Craft & Quality | `craft-quality` | `page.craft-quality` | (leave body blank — section provides content) |
| Our Story | `our-story` | `page.our-story` | (leave body blank — section provides content) |
| Contact | `contact` | `page` | Paste `{% section 'sf-contact-block' %}` in body, or drag-add via theme editor |
| Lookbook | `lookbook` | `page` | Leave blank — merchant fills with images later |
| Size Guide | `size-guide` | `page` | Paste the size table HTML from CLIENT_BRIEF.md |
| Shipping | `shipping` | `page` | Merchant fills with policy text |
| Returns & Exchanges | `returns-exchanges` | `page` | Merchant fills with policy text |

---

## 2. Collections

Create each in **Shopify admin → Products → Collections → Create collection**.
Use type **Manual** (products assigned by hand) or **Smart** (auto-assigned by tag).

| Title | Handle | Type | Products |
|---|---|---|---|
| Polo Shirts | `polo-shirts` | Manual | 10 polo products (see `PRODUCT_SETUP.md`) |
| Sweaters & Pullovers | `sweaters-pullovers` | Manual | 10 sweater/pullover products |
| Cardigans | `cardigans` | Manual | 10 cardigan products |
| T-Shirts & Henleys | `t-shirts-henleys` | Manual | 10 t-shirt/henley products |
| All | `all` | Auto-created by Shopify | All products |

Tip: if importing products via the `products.csv` file, each product row
already has a `Type` column set to the correct category. Use Smart collections
with rule "Product type EQUALS Polo Shirts" (etc.) and Shopify auto-populates.

---

## 3. Navigation menus

Create each in **Shopify admin → Online Store → Navigation**.

### Main menu — handle `main-menu`

- **Shop** (no link, or `/collections/all`)
  - Polo Shirts → `/collections/polo-shirts`
  - Sweaters & Pullovers → `/collections/sweaters-pullovers`
  - Cardigans → `/collections/cardigans`
  - T-Shirts & Henleys → `/collections/t-shirts-henleys`
  - Shop All → `/collections/all`
- Inside the Factory → `/pages/inside-the-factory`
- Size Guide → `/pages/size-guide`
- Contact → `/pages/contact`

### Footer menus

- **Footer — Shop** (`footer-shop`): Polo Shirts, Sweaters & Pullovers, Cardigans, T-Shirts & Henleys, Shop All
- **Footer — Studio** (`footer-studio`): Inside the Factory, Lookbook, Our Story
- **Footer — Help** (`footer-help`): Size Guide, Shipping, Returns & Exchanges, Contact

---

## 4. Header configuration

In **Customize → Header**:

- Logo image: upload `stitch-fit-logo-dark.png` (theme assets folder)
- Logo width: 120–140 px
- Menu: `main-menu`
- **Transparent header on homepage**: ON
- **Sticky header**: ON (scroll-up)
- **Transparent colour scheme**: scheme-6 (transparent + light text)
- Default header colour scheme: scheme-5 (forest green + bone)

The `Contact Us` pill CTA in the header is injected by `assets/stitch-fit.js`
into the header's actions area automatically — no manual block needed.

---

## 5. Footer configuration

In **Customize → Footer**:

- Colour scheme: scheme-5 (forest green + bone)
- Add 4 blocks in order:
  1. **Logo** block + **Text** block: _"Wear the vibe. EST. 1928"_
  2. **Menu** block → linked menu `footer-shop`, heading "Shop"
  3. **Menu** block → linked menu `footer-studio`, heading "Studio"
  4. **Menu** block → linked menu `footer-help`, heading "Help"
- Optional: **Email-signup** block at the bottom
- Optional: **Text** block with the address
  _Climax Knitting Industry, S.I.E #1, Plot 94-B, Near Jinnah Road, Gujranwala 52250_

---

## 6. Product page accordions

To reproduce the three accordions (Fabric & Care / Sizing / Shipping &
Returns), open any product in the theme editor, then under the product info
column add three **Accordion blocks**. Fill the heading and content per
accordion. The block exists in Horizon's `blocks/accordion.liquid` — no
code change required.
