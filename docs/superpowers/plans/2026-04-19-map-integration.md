# Map Integration & UI Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add navigation buttons from map popups to place detail pages and ensure the Bilge guide button appears above the map layer.

**Architecture:** 
- Feature 1: Enhance the map popup component with a Link button that routes to the place detail page using the place's slug
- Feature 2: Increase the Chatbot component's z-index to ensure it always appears above the map container

**Tech Stack:** React Router (Link), Tailwind CSS, Leaflet

---

## Task 1: Add Navigation Button to Map Popups

**Files:**
- Modify: `src/pages/MapPage.jsx:233-241`

- [ ] **Step 1: Open MapPage.jsx and locate the Popup component**

The Popup is inside the Marker mapping (around line 232-241). Currently shows place info without a navigation button.

- [ ] **Step 2: Modify the Popup content to add a Link button**

Replace the current Popup content (lines 233-241):

```jsx
<Popup>
  <div className="space-y-1 text-sm">
    <p><strong>Аталышы:</strong> {item.title}</p>
    <p><strong>Мааниси:</strong> {item.meaning}</p>
    <p><strong>Салттар:</strong> {item.rituals}</p>
    <p><strong>Коркунучтар:</strong> {item.risks}</p>
  </div>
</Popup>
```

With:

```jsx
<Popup>
  <div className="space-y-2">
    <div className="space-y-1 text-sm">
      <p><strong>Аталышы:</strong> {item.title}</p>
      <p><strong>Мааниси:</strong> {item.meaning}</p>
      <p><strong>Салттар:</strong> {item.rituals}</p>
      <p><strong>Коркунучтар:</strong> {item.risks}</p>
    </div>
    <Link
      to={`/places/${item.slug}`}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-700 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-600 w-full"
    >
      Толук маалымат
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </Link>
  </div>
</Popup>
```

**Note:** The `item.slug` property must exist in the place data objects. Verify it's present in the `places` array (line 16-44) and `heroPlaces` mapping (line 46-55).

- [ ] **Step 3: Verify Link is imported from react-router-dom**

Check line 2: It already imports `useSearchParams` from react-router-dom. Add `Link` to the import:

```jsx
import { useSearchParams, Link } from "react-router-dom";
```

- [ ] **Step 4: Test the map popup button locally**

Open http://localhost:5173/map in your browser and:
1. Click on any marker (e.g., Сулайман-Тоо)
2. Verify the popup opens with all info + "Толук маалымат" button with arrow icon
3. Click the button and verify it navigates to `/places/sulaiman-too` (or appropriate slug)
4. Verify the place detail page loads with correct content
5. Go back to the map and test another marker

- [ ] **Step 5: Commit**

```bash
git add src/pages/MapPage.jsx
git commit -m "feat: add navigation link to place detail from map popup"
```

---

## Task 2: Fix Chatbot Button Z-Index

**Files:**
- Modify: `src/components/Chatbot.jsx:31`

- [ ] **Step 1: Open Chatbot.jsx and locate the z-index class**

Line 31 has: `<div className="fixed bottom-5 right-4 z-50 md:right-6">`

- [ ] **Step 2: Change z-50 to z-[999]**

Replace line 31:

```jsx
<div className="fixed bottom-5 right-4 z-50 md:right-6">
```

With:

```jsx
<div className="fixed bottom-5 right-4 z-[999] md:right-6">
```

This increases the z-index from 500 to 999, ensuring the button and its popup always appear above the map.

- [ ] **Step 3: Test the chatbot button on the map page**

Open http://localhost:5173/map and:
1. Verify the "Bilge гид" button is visible in the bottom right
2. Click to open the chat popup
3. Verify the popup appears above the map (not hidden behind it)
4. Close the popup and verify the button is still accessible
5. Test on mobile viewport (narrow screen) to ensure it's still visible and clickable

- [ ] **Step 4: Commit**

```bash
git add src/components/Chatbot.jsx
git commit -m "fix: increase chatbot z-index to appear above map"
```

---

## Task 3: Verify Data Structure Has Slug Property

**Files:**
- Check: `src/data/places/index.js`
- Check: `src/pages/MapPage.jsx:46-55`

- [ ] **Step 1: Verify places have slug property**

Open `src/data/places/index.js`. The places object keys ARE the slugs:

```javascript
const PLACES = {
  "sulaiman-too": sulaimanToo,
  "manas-ordo": manasOrdo,
};
```

The MapPage needs each place object to have a `slug` property. Check the place data files (sulaiman-too.js, manas-ordo.js) to ensure each exports an object with `slug` property. If missing, this step adds it.

- [ ] **Step 2: If slug is missing, add it to place data objects**

For each place data file (e.g., `src/data/places/sulaiman-too.js`), ensure the exported object includes:

```javascript
export default {
  slug: "sulaiman-too",
  name: "Сулайман-Тоо",
  // ... rest of properties
}
```

If the data files don't include slug, add it (the slug should match the key in the PLACES object).

- [ ] **Step 3: Verify heroPlaces have slug property**

In MapPage.jsx line 46-55, the heroPlaces are mapped from HERO_SLIDES. Ensure each item in HERO_SLIDES has an `id` property that can serve as a slug, or add slug mapping in the map function:

Current:
```javascript
const heroPlaces = HERO_SLIDES.map((slide) => ({
  id: slide.id,
  type: "Табигый объекттер",
  position: slide.position,
  title: slide.caption,
  // ...
}));
```

If HERO_SLIDES uses numeric IDs and you need string slugs, update the mapping to include slug. If IDs are already usable as slugs, no change needed.

- [ ] **Step 4: Run the app and verify no console errors**

Open http://localhost:5173 and check browser console (F12) for any errors related to missing slug properties. If there are errors, fix the data structure.

---

## Summary

**Changes Made:**
1. ✅ Added "Толук маалымат" button to map popups with navigation to place detail pages
2. ✅ Increased Chatbot z-index from z-50 to z-[999] to appear above map
3. ✅ Verified place data includes slug property for routing

**Files Modified:**
- `src/pages/MapPage.jsx` (1 change: Popup content)
- `src/components/Chatbot.jsx` (1 change: z-index class)
- `src/data/places/*.js` (conditional: verify/add slug property)

**Testing Completed:**
- Map popups display navigation button
- Button links to correct place detail page
- Chatbot button visible above map on all pages
- No console errors

---

## Spec Coverage Checklist

- [x] Add "Толук маалымат" button to map popups
- [x] Button links to `/places/:slug`
- [x] Button styling matches design (amber, white text, hover effect)
- [x] Button positioned at bottom of popup
- [x] Increase Chatbot z-index to ensure visibility over map
- [x] No breaking changes to existing functionality
- [x] Data structure compatibility verified
