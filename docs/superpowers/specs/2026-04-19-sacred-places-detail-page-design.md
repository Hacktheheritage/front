# Sacred Places Detail Page — Design Spec
**Date:** 2026-04-19  
**Status:** Approved

---

## Overview

Replace the stub `PlacesPage.jsx` with a full data-driven system: a listing page at `/places` and a reusable detail page at `/places/:slug`. Adding a new sacred place requires only a new data file and one registry entry — no other code changes.

---

## Architecture

### Routing (App.jsx)
- `/places` → `PlacesPage.jsx` (listing grid)
- `/places/:slug` → `PlacePage.jsx` (detail page, reads slug via `useParams()`)

### New files
```
src/
  data/
    places/
      index.js          ← registry: { "sulaiman-too": data, "manas-ordo": data }
      sulaiman-too.js   ← place data object
      manas-ordo.js     ← place data object
  pages/
    PlacePage.jsx       ← reusable detail page component
    PlacesPage.jsx      ← refactored listing page
  components/
    Footer.jsx          ← updated to match design
```

---

## Data Schema

Each place file exports a single default object:

```js
{
  slug: String,           // URL segment, e.g. "sulaiman-too"
  name: String,           // Display name in Kyrgyz
  region: String,         // e.g. "Ош облусу"
  badge: String,          // e.g. "ЮНЕСКО мурасы"
  heroImage: String,      // path to image in /public/assets/places/
  heroSubtitle: String,   // small text shown above name in hero
  tagline: String,        // one poetic sentence shown in hero

  glance: [               // "At a Glance" accordion, exactly 3 items
    { title: String, body: String },
  ],

  sections: [             // alternating narrative sections
    {
      heading: String,
      body: String,
      image: String,      // image path
      imageAlt: String,
      imageLeft: Boolean, // optional, default false (image right)
    },
  ],

  gallery: [String],      // Visual Archive image paths (min 3 for layout)

  quiz: [                 // exactly 7 questions
    {
      question: String,
      options: [String, String, String, String], // always 4 options
      answer: Number,     // 0-based index of correct option
    },
  ],
}
```

---

## PlacePage Component Layout

Sections rendered top-to-bottom:

### 1. Hero
- Full-width dark panel (`bg-[#130c24]` or similar)
- Left: `heroSubtitle` (small caps, amber), `name` (large Cormorant Garamond serif, white), `tagline` (small slate text)
- Right: `heroImage` in a contained box with slight drop shadow
- Same font stack as HomePage hero

### 2. At a Glance
- Centered `h2` heading
- 3 accordion items from `glance[]`
- Each item: bordered row, title + chevron, body expands on click
- One item open at a time (controlled state)

### 3. Narrative Sections
- Mapped from `sections[]`
- Alternating layout: `imageLeft: false` → text left, image right; `imageLeft: true` → image left, text right
- Large Cormorant Garamond heading, small body text in slate
- Full-width on mobile (stacked)

### 4. Visual Archive
- `h2` "Visual Archive." left-aligned, subtitle right-aligned
- CSS grid: 1 tall image left, 2 stacked images right (matches screenshot)
- Falls back gracefully if fewer than 3 images

### 5. Quiz — "Test Your Knowledge"
- Centered heading + subtitle ("Seven questions to reflect on the history of [name]")
- Shows all 7 questions sequentially (or all at once with radio inputs — all-at-once is simpler and matches screenshot)
- 4 radio options per question in a 2×2 grid
- "Submit Answers" button at bottom
- On submit: reveals score and per-question correct/incorrect indicators
- State: fully local (`useState` in `PlacePage`)

---

## PlacesPage (Listing)

- Grid of place cards (1 col mobile, 2 col desktop)
- Each card: hero image background, badge, region, name, "Толук маалымат →" CTA
- Links to `/places/:slug`
- Reuses same card style as HomePage places section

---

## Footer Update

Replace current minimal footer with the design from the screenshot:
- Left: site name ("The Living Archive" / "Bilge · 𐰴𐰃𐰺𐰏𐰃𐰕") + copyright
- Center: nav links — Archives (`/places`), Research (`/about`), Legal, Contact
- Right: copyright year + "The Living Archive. All Rights Reserved."
- Dark background variant (`bg-[#f4efe5]` retained, or match existing style)
- Keep existing admin login button

---

## Place Content

### Сулайман-Тоо
- `glance`: Historical Significance, Architectural Details, Sacred Traditions
- `sections`: 2 narrative sections with existing `sulaiman_too.jpg` + placeholder for second image
- `gallery`: 3 images (existing + Unsplash fallbacks for missing assets)
- `quiz`: 7 questions about UNESCO status, location, history, traditions

### Манас Ордо
- `glance`: Epic of Manas, The Memorial Complex, Cultural Significance
- `sections`: 2 narrative sections with existing `manas_ordo.jpg` + placeholder
- `gallery`: 3 images
- `quiz`: 7 questions about Manas epic, Talas, the complex itself

---

## Constraints & Notes

- No new dependencies — pure React + Tailwind
- Fonts: `Cormorant Garamond` (headings) and `Inter` (body) — already loaded in `index.css`
- Images: use `/public/assets/places/` for local images; Unsplash URLs for any missing gallery images
- The `PlacePage` component does NOT fetch data — it reads from the static registry synchronously
- Quiz state resets on page navigation (no persistence needed)
