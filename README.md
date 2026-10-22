# Wara Fragrance

**Fragrance that speaks before you do.**

Wara Fragrance is a perfume house based in Mombasa, Kenya. Fifteen scents, blended for people who want a signature rather than a shelf - one spray, and the room knows.

## The house

Wara blends and bottles in Mombasa and delivers nationwide across Kenya. The range spans gourmand, fruity floral, aquatic and oriental woody families, plus floral, woody, citrus spicy and musk profiles. Every scent is listed between **$25 and $46**, gift packs included.

Each fragrance ships with a published note pyramid - no hidden pricing, no asterisks.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Opening statement, featured scents, fragrance note ladder, how to wear, gift packs, order & delivery |
| Shop | `shop.html` | The full collection of fifteen scents, with filters and search |
| The house | `about.html` | Story, fragrance families, wearing guidance, contact |
| Legal | `legal.html` | Plain-language Terms of service, Privacy policy, Delivery and returns |

## Features

- **Catalogue** - `js/products.js` holds the full product data: id, name, price, family, blurb and note pyramid, mirrored from the house's own store catalogue. Product grids render into any element with a `data-products` attribute.
- **Filtering & search** - shop filters by *Unisex / For her / For him / Gift packs*, plus free-text search across scent name, family and notes.
- **Deep links** - `shop.html#gift` opens on the gift packs; product anchors like `shop.html#moonbeam-smoky` jump straight to a scent.
- **Bag** - slide-out cart drawer with quantity steppers, remove, and live subtotal. Bag state persists in `localStorage` and is scoped to the current visit only.
- **Ordering** - orders are placed through WhatsApp (`0746 410 595`). The cart's *Send order* action hands off to that conversation; nothing is charged from the site.
- **Accessibility** - skip link, ARIA labels and pressed states, focus-visible rings, `prefers-reduced-motion` support, mobile menu, `aria-live` cart count.

## Tech stack

- Plain **HTML5**, **CSS3** and **vanilla JavaScript (ES modules)** - no framework, no build step.
- Design tokens in `css/tokens.css` (OKLCH colour space, type scale, 8pt spacing scale).
- Styles in `css/site.css`.
- Type: **Bodoni Moda** display + **Work Sans** body, via Google Fonts.
- Imagery: product photography via the Shopify CDN.

## Getting started

No dependencies, no build step.

```bash
# serve the folder locally, e.g.
python -m http.server 8080
# or
npx serve .
```

Then open <http://localhost:8080>.

> **Note:** the JavaScript uses ES modules, which browsers block on `file://` - serve over HTTP.

## Project structure

```
.
+-- index.html        # Home
+-- shop.html         # Shop
+-- about.html        # The house
+-- legal.html        # Terms, privacy, delivery & returns
+-- css/
¦   +-- tokens.css    # Design tokens (colour, type, spacing, motion)
¦   +-- site.css      # Layout, components, responsive rules
+-- js/
¦   +-- products.js   # Catalogue data + helpers (imgUrl, money)
¦   +-- site.js       # Behaviour: cart, grids, filters, menu, year
+-- day 21 challenge.docx
```

## Pricing & ordering

- Prices are listed in **USD**; the house confirms the final price, delivery cost and payment method with you before dispatch.
- Place your order on **WhatsApp** at **0746 410 595**. A person confirms each order before it ships.

## Legal

The legal pages are written in plain language as a summary of the house's practice - not legal advice.
