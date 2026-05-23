# Complete Image & Media Audit - Stitch Fit Theme

**Last Updated:** May 21, 2026  
**Purpose:** Exact location, count, and description of every image/video area across the entire theme

---

## TABLE OF CONTENTS
1. [Home Page](#home-page-indexjson)
2. [Product Page](#product-page-productjson)
3. [Collection Page](#collection-page-collectionjson)
4. [Dedicated Pages](#dedicated-pages)
5. [Section-by-Section Breakdown](#section-by-section-breakdown)
6. [Summary Statistics](#summary-statistics)

---

## HOME PAGE (`templates/index.json`)

**Total Images: 13 image areas (dynamic/configured per section)**

The home page is built from 7 sections stacked vertically:

### 1. **Hero Section** – `sf-hero-video`
- **Location:** Home Page, Top (Section 1)
- **Images/Media:** 1–2 media areas
  - **Video URL (.mp4)** – Primary background video (autoloop, muted)
  - **Poster Image** – Fallback image shown before/if video doesn't load
- **Purpose:** Hero banner with high-impact video background
- **Config File:** [sections/sf-hero-video.liquid](sections/sf-hero-video.liquid#L1-L15)
- **Responsive:** Full-width 16:9 ratio

### 2. **Brand Strip Section** – `sf-brand-strip`
- **Location:** Home Page, Below Hero (Section 2)
- **Images/Media:** 0 images
- **Purpose:** Quote/text band, no media
- **Note:** This is text-only

### 3. **Shop by Category Section** – `sf-shop-by-category`
- **Location:** Home Page, Middle (Section 3)
- **Images/Media:** **Up to 8 category images** (repeats seamlessly twice for infinite scroll)
  - Each category card shows **1 image**: Category thumbnail
  - **Total rendered:** ~16 image tags (8 × 2 for marquee loop)
- **Purpose:** Product category tiles (Polo, Sweaters, Cardigans, T-Shirts/Henleys)
- **Size:** 600px width, 4:5 aspect ratio per image
- **Config File:** [sections/sf-shop-by-category.liquid](sections/sf-shop-by-category.liquid#L19-L56)
- **Location per image:** 
  - Line 22–24: First set of category images
  - Line 54–56: Duplicate set for marquee loop

### 4. **Story Teaser Section** – `sf-story-teaser`
- **Location:** Home Page, Lower-Middle (Section 4)
- **Images/Media:** **1 image**
  - Left side: "Our Story" founder/factory image
- **Purpose:** Brand heritage/founder story visual
- **Size:** 1200px width, 4:5 aspect ratio
- **Config File:** [sections/sf-story-teaser.liquid](sections/sf-story-teaser.liquid#L1-L15)

### 5. **Quality Callout Section** – `sf-quality-callout`
- **Location:** Home Page, Lower-Middle (Section 5)
- **Images/Media:** 0 images (icon-based)
- **Purpose:** 3 quality pillars with SVG icons (yarn, gauge, hand)
- **Note:** Icons system, no photos

### 6. **Lookbook Section** – `sf-lookbook`
- **Location:** Home Page, Lower (Section 6)
- **Images/Media:** **6 images** in bento grid layout
  - Tile 1: Large top-left
  - Tile 2: Top-right (small)
  - Tile 3: Tall right side
  - Tile 4: Bottom-left
  - Tile 5: Wide bottom
  - Tile 6: Center bottom
- **Purpose:** Product lookbook / lifestyle imagery
- **Aspect Ratios:** Mixed (3:4, 1:1, 4:5)
- **Config File:** [sections/sf-lookbook.liquid](sections/sf-lookbook.liquid#L1-L30)

### 7. **CTA Band Section** – `sf-cta-band`
- **Location:** Home Page, Bottom (Section 7)
- **Images/Media:** 0 images
- **Purpose:** Call-to-action text only
- **Note:** Text-only section

### **HOME PAGE TOTAL: 1–2 (hero video) + 8/16 (categories) + 1 (story) + 6 (lookbook) = ~15–16 media items**

---

## PRODUCT PAGE (`templates/product.json`)

**Total Image Areas: Dynamic (depends on product media)**

### 1. **Product Media Gallery** – `_product-media-gallery` block
- **Location:** Product Page, Left side (desktop) / Top (mobile)
- **Images/Media:** **All product images/videos**
  - Rendered from product's media library (add.json schema)
  - Supports: Images, Videos, 3D files (if available)
- **Purpose:** Main product showcase
- **Config:** 
  - Media presentation: Grid or carousel
  - Columns: 2 (configurable)
  - Thumbnail position: Right side
  - Zoom enabled
- **Config File:** [sections/product-information.json](templates/product.json#L1-L65)
- **Typical Product:** 4–12 images per variant (varies by product)

### 2. **Product Details Section** – `_product-details` block
- **Location:** Product Page, Right side (desktop) / Below media (mobile)
- **Images/Media:** 0–1 optional background image/video
  - Can have background image OR background video (selectable)
- **Purpose:** Product info, title, price, variant picker, add-to-cart
- **Size:** 800–1200px images
- **Config File:** [blocks/_product-details.liquid](blocks/_product-details.liquid#L277-L339)

### 3. **Product Recommendations Section** – `product-recommendations`
- **Location:** Product Page, Bottom
- **Images/Media:** **Product card images** (up to 4 recommended products)
  - Each card shows: 1 product image
  - **Total:** 4 images typical
- **Purpose:** "You may also like" section
- **Config File:** [templates/product.json](templates/product.json#L290-L350)

### **PRODUCT PAGE TOTAL: ~8–17 images (4–12 main product + 1 optional background + 4 recommendations)**

---

## COLLECTION PAGE (`templates/collection.json`)

**Total Image Areas: Dynamic**

### 1. **Collection Header Section** – Generic `section` block
- **Location:** Collection Page, Top
- **Images/Media:** 0 images
- **Purpose:** Collection title & description (text only)

### 2. **Main Collection Grid** – `main-collection` section
- **Location:** Collection Page, Main area
- **Images/Media:** **1 image per product card** × number of products
  - Each product: 1 image (featured media)
  - Grid layout: 2–4 columns (responsive)
  - Typical collection: 12–20 products shown on page 1
- **Purpose:** Product grid/list display
- **Card elements:**
  - Product image (featured media)
  - Product title
  - Product price
- **Size:** Adaptive ratio (600–800px)
- **Config File:** [templates/collection.json](templates/collection.json#L60-L110)

### **COLLECTION PAGE TOTAL: ~12–20 product images per page (depends on products listed)**

---

## DEDICATED PAGES

### SHIPPING PAGE (`templates/page.shipping.json`)

**Total Image Areas: 0 images**

- **Section:** `sf-shipping` (custom)
- **Location:** `/pages/shipping`
- **Content:** Shipping tables, icons (SVG), text only
- **No Images:** Text-based info (domestic/international tables)
- **Config File:** [templates/page.shipping.json](templates/page.shipping.json#L1-L30)

### FACTORY PAGE (`templates/page.factory.json`)

**Total Image Areas: 7 images**

Uses: `sf-factory-editorial` section

| # | Image Area | Location | Purpose | Size | Ratio |
|---|---|---|---|---|---|
| 1 | Hero image | Top | Factory building/workspace hero | 2000px | 16:9 |
| 2 | Gallery 1 Tile 1 | Below intro | Machine detail #1 | 1000px | 4:5 |
| 3 | Gallery 1 Tile 2 | Below intro | Machine detail #2 | 1000px | 4:5 |
| 4 | Gallery 1 Tile 3 | Below intro | Machine detail #3 | 1000px | 4:5 |
| 5 | Full-bleed image | Middle | Factory floor wide shot | 2400px | 16:9 |
| 6 | Gallery 2 Tile 1 | Lower section | Worker hands detail #1 | 1400px | 3:4 |
| 7 | Gallery 2 Tile 2 | Lower section | Worker hands detail #2 | 1400px | 3:4 |
| 8 | Gallery 2 Tile 3 | Lower section | Worker hands detail #3 | 1400px | 3:4 |

- **Config File:** [sections/sf-factory-editorial.liquid](sections/sf-factory-editorial.liquid#L1-L80)
- **Total: 8 images**

### SIZE GUIDE PAGE (`templates/page.size-guide.json`)

**Total Image Areas: 1–4 images**

Uses: `sf-size-guide` section + fit guide blocks

| # | Image Area | Location | Purpose | Size |
|---|---|---|---|---|
| 1 | Measure image (optional) | "How to measure" section, left | How to measure diagram (4:5) | 1200px |
| 2–4 | Fit guide images (optional) | "Three fits" section, bottom | Fit visual #1, #2, #3 | 800px |

- **Config File:** [sections/sf-size-guide.liquid](sections/sf-size-guide.liquid#L10-L20; L145-L152)
- **Note:** All images optional (placeholders show if missing)
- **Total: 1–4 images (depending on which fit cards are configured)**

### OUR STORY PAGE (`templates/page.our-story.json`)

**Total Image Areas: 4 images**

Uses: `sf-our-story` section

| # | Image Area | Location | Purpose | Size | Ratio |
|---|---|---|---|---|---|
| 1 | Hero image | Top | Full-width story header | 2000px | 16:9 |
| 2 | Founder image | Founder section, left | Founder/founder story portrait | 1200px | 4:5 |
| 3–5 | (Optional) Timeline images | Timeline section | Could be media blocks (not in current config) | — | — |
| 6 | Closing image | Bottom | Factory team / closing full-bleed | 2400px | 16:9 |

- **Config File:** [sections/sf-our-story.liquid](sections/sf-our-story.liquid#L1-L50)
- **Total: 3–4 images (hero, founder, closing)**

### CRAFT QUALITY PAGE (`templates/page.craft-quality.json`)

**Total Image Areas: 1 image**

Uses: `sf-craft-quality` section

| # | Image Area | Location | Purpose | Size | Ratio |
|---|---|---|---|---|---|
| 1 | Hero image (optional) | Top | Craft page hero background | 2400px | 16:9 |

- **Config File:** [sections/sf-craft-quality.liquid](sections/sf-craft-quality.liquid#L1-L20)
- **Content:** SVG icons for pillars (Yarn, Gauge, Hand, Fibre), numbered standards
- **Total: 1 optional image**

### LOOKBOOK PAGE (`templates/page.lookbook.json`)

**Total Image Areas: 6–9 images**

Uses: `sf-lookbook-page` section

| # | Image Area | Location | Purpose | Size | Ratio |
|---|---|---|---|---|---|
| 1 | Hero image | Top | Lookbook page hero | 2400px | 16:9 |
| 2–7 | Bento grid (6 tiles) | Main section | Lookbook imagery #1–6 | 1200px | Mixed (3:4, 1:1) |
| 8–10 | Outfit images (optional) | "The Outfits" section | Outfit styling #1–3 | 900px | 4:5 |

- **Config File:** [sections/sf-lookbook-page.liquid](sections/sf-lookbook-page.liquid#L1-L50)
- **Total: 6–9 images (6 bento + 0–3 outfit cards)**

### RETURNS PAGE (`templates/page.returns-exchanges.json`)

**Total Image Areas: 0 images**

- **Uses:** `sf-returns` section (text-only)
- **Content:** Returns/exchange policy information
- **No Images**

### CONTACT PAGE (`templates/page.contact.json`)

**Total Image Areas: 0 images**

- **Uses:** Custom form section
- **Content:** Contact form fields
- **No Images**

### GENERIC PAGE (`templates/page.json`)

**Total Image Areas: Variable (user-configurable)**

- **Uses:** `main-page` + generic blocks
- **Content:** Editable via Shopify admin
- **Can include:** Text, images, video blocks

---

## SECTION-BY-SECTION BREAKDOWN

All sections in the theme with image capability:

| Section | File | Image Count | Purpose | Aspect Ratios |
|---|---|---|---|---|
| **sf-hero-video** | sections/sf-hero-video.liquid | 1–2 (video + poster) | Homepage hero with video | 16:9 |
| **sf-shop-by-category** | sections/sf-shop-by-category.liquid | 8 (×2 for loop) | Category marquee carousel | 4:5 |
| **sf-story-teaser** | sections/sf-story-teaser.liquid | 1 | Brand story teaser | 4:5 |
| **sf-lookbook** | sections/sf-lookbook.liquid | 6 | Bento grid lookbook | Mixed |
| **sf-factory-editorial** | sections/sf-factory-editorial.liquid | 8 | Factory tour editorial | 16:9, 4:5, 3:4 |
| **sf-size-guide** | sections/sf-size-guide.liquid | 1–4 | Size guide + fit cards | 4:5 |
| **sf-our-story** | sections/sf-our-story.liquid | 3–4 | Brand story page | 16:9, 4:5 |
| **sf-craft-quality** | sections/sf-craft-quality.liquid | 1 | Craft page hero | 16:9 |
| **sf-lookbook-page** | sections/sf-lookbook-page.liquid | 6–9 | Full lookbook page | Mixed |
| **sf-returns** | sections/sf-returns.liquid | 0 | Returns info (text only) | — |
| **product-information** | sections/product-information.liquid | 4–12+ | Product media gallery | Adaptive |
| **featured-product** | sections/featured-product.liquid | 4–12+ | Featured product block | Adaptive |
| **main-collection** | sections/main-collection.liquid | 12–20+ | Product grid | Adaptive |
| **footer** | sections/footer.liquid | 0–1 (optional logo) | Footer (minimal image) | — |
| **header** | sections/header.liquid | 0–1 (logo) | Header logo | Adaptive |

---

## SUMMARY STATISTICS

### **By Page Type**

| Page Type | Typical Image Count | Notes |
|---|---|---|
| **Home Page** | ~15–17 | Hero (video + poster) + 8 categories + 1 story + 6 lookbook |
| **Product Page** | ~8–17 | 4–12 main images + 1 optional bg + 4 recommendations |
| **Collection Page** | ~12–20+ | 1 image per product × products on page |
| **Factory Page** | 8 | Hero + 3 machine details + full-bleed + 3 hands |
| **Size Guide Page** | 1–4 | Measure image + 0–3 fit cards |
| **Lookbook Page** | 6–9 | Hero + 6 bento tiles + 0–3 outfit cards |
| **Our Story Page** | 3–4 | Hero + founder + closing |
| **Craft Quality Page** | 1 | Hero image (optional) |
| **Shipping Page** | 0 | Text-only |
| **Cart Page** | ~2–6 | Product thumbnails in cart (dynamic) |
| **Blog Page** | ~1–12+ | Blog post featured images |

### **By Asset Size**

| Width | Primary Use | Sections |
|---|---|---|
| **800px** | Card images, small thumbnails | Size guide fit cards |
| **900px** | Outfit lookbook cards | Lookbook page outfits |
| **1000px** | Gallery tiles | Factory machine details |
| **1200px** | Medium editorial | Story teaser, measure image, lookbook |
| **1400px** | Gallery tiles (mixed) | Factory hands gallery |
| **1920px** | Hero video fallback | Hero video poster |
| **2000px** | Wide hero | Factory hero, story page hero, craft hero |
| **2400px** | Full-bleed large | Factory full-bleed, lookbook hero, our story hero |

### **By Purpose / Use Case**

| Purpose | # Sections | Image Areas | Examples |
|---|---|---|---|
| **Hero/Hero Video** | 5 | 1–2 each | sf-hero-video, factory, story, craft, lookbook home |
| **Product Showcase** | 3 | 4–12+ each | Product page, featured product, collection |
| **Editorial/Brand** | 4 | 1–8 each | Story teaser, factory, our story, craft |
| **Lifestyle/Lookbook** | 2 | 6–9 each | Lookbook home, lookbook page |
| **Category/Navigation** | 1 | 8 | Shop by category |
| **Guide/Reference** | 1 | 1–4 | Size guide |
| **Text/Utility** | 3 | 0 each | Shipping, returns, contact |

### **Total Images Across Entire Theme**

**Static Sections:** ~45–80 images (defined in section files)  
**Dynamic Content:** ~50–200+ images (product photos, collection items, user uploads)  
**Grand Total Per Store:** **100–280+ unique images** (varies by content)

---

## TECHNICAL NOTES

### Video Support
- **sf-hero-video:** MP4 video URL (autoloop, muted, fallback poster image)
- **Product pages:** Can support video variants if products have video media attached

### Lazy Loading
- All images use `loading="lazy"` except hero images (`loading="eager"`)
- Hero images use `fetchpriority="high"` for LCP optimization

### Image Optimization
- All images use Shopify's `image_url` filter for automatic resizing
- Responsive image widths: 600px, 800px, 900px, 1000px, 1200px, 1400px, 1920px, 2000px, 2400px

### Placeholders
- Missing images render placeholder SVGs (labeled: HERO-VIDEO, FACTORY-HERO, etc.)
- Ratio preserved even when no image configured

### Live Wallpaper / Video
- **Only in:** `sf-hero-video` section (home page hero)
- **Format:** MP4 autoplay, muted, loop
- **Fallback:** Poster image if video fails

---

## FILE REFERENCES

**Core Template Files:**
- [templates/index.json](templates/index.json) – Home page
- [templates/product.json](templates/product.json) – Product page
- [templates/collection.json](templates/collection.json) – Collection page
- [templates/page.shipping.json](templates/page.shipping.json) – Shipping info
- [templates/page.factory.json](templates/page.factory.json) – Factory page
- [templates/page.size-guide.json](templates/page.size-guide.json) – Size guide
- [templates/page.our-story.json](templates/page.our-story.json) – Our story
- [templates/page.craft-quality.json](templates/page.craft-quality.json) – Craft quality

**Key Section Files:**
- [sections/sf-hero-video.liquid](sections/sf-hero-video.liquid)
- [sections/sf-lookbook.liquid](sections/sf-lookbook.liquid)
- [sections/sf-shop-by-category.liquid](sections/sf-shop-by-category.liquid)
- [sections/sf-factory-editorial.liquid](sections/sf-factory-editorial.liquid)
- [sections/sf-size-guide.liquid](sections/sf-size-guide.liquid)
- [sections/sf-our-story.liquid](sections/sf-our-story.liquid)
- [sections/featured-product.liquid](sections/featured-product.liquid)

---

**End of Audit**
