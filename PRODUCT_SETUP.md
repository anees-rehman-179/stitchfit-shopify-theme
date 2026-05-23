# Stitch Fit — Product Setup

40 products at launch. 10 per category. All carry the same size axis
(XS, S, M, L, XL, XXL). Placeholder price: **PKR 3,500** — merchant updates
before launch. All images are placeholders; merchant uploads real photos
when ready.

---

## Fastest path: bulk import

Run a single CSV import in **Shopify admin → Products → Import**.
The repo ships `products.csv` at the theme root — drop it in.

Each row in the CSV creates the product, its 6 size variants, assigns the
product type (which feeds Smart Collections), and sets price. The CSV uses
Shopify's standard product import schema.

After import:
1. Confirm 40 products show up under **Products**.
2. Open each one and verify the variants list shows XS → XXL.
3. Set up Smart Collections per `PAGES_SETUP.md` § 2 — using "Product type
   equals Polo Shirts / Sweaters & Pullovers / Cardigans / T-Shirts & Henleys".

---

## Manual path

If you prefer to create products by hand, here are the 40 products with copy.

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

## Variant structure (every product)

| Option | Values |
|---|---|
| Size | XS, S, M, L, XL, XXL |

Variants: 6 per product. Total: 240 across the catalog.

Price: PKR 3,500 across all variants at launch (placeholder).
Stock: untracked initially — merchant enables tracking once inventory is real.

---

## Images

All product images are placeholders. The theme renders a labelled
`sf-placeholder` when a product has no featured image. When merchant uploads
real photos, those replace the placeholders automatically.

Recommended specs:
- Aspect ratio: 4:5 (portrait)
- Resolution: 2000 × 2500 px minimum
- Format: jpg or webp
- Per product: 1 main + 2–3 alternates
