---
name: Map Integration & UI Enhancements
description: Add navigation links from map popups to place detail pages and ensure Bilge guide button appears over map
type: Design Specification
date: 2026-04-19
---

# Map Integration & UI Enhancements

## Overview

Two related UI improvements:
1. Add navigation buttons to map popups so users can access full place details from the map
2. Ensure the Bilge guide chatbot button is always visible above the map layer

## Feature 1: Map Popup with Detail Navigation

### Current State
- MapPage displays a map with markers for all places
- Clicking a marker opens a popup showing:
  - Place title (Аталышы)
  - Meaning (Мааниси)
  - Rituals (Салттар)
  - Risks (Коркунучтар)
- No way to navigate from map to the detailed place page

### Desired State
- Popup retains all existing information
- Add a "Толук маалымат" (Full Details) button at the bottom of the popup
- Button links to `/places/:slug` (e.g., `/places/sulaiman-too`)
- Button styling uses amber background with white text, matching PlacesPage design

### Implementation Details

**File:** `src/pages/MapPage.jsx`

**Changes:**
- Import Link from react-router-dom (already imported)
- Modify the `<Popup>` component (lines 233-241) to add a button component
- Button should:
  - Use Link component to navigate to `/places/${item.slug}`
  - Have className matching PlacesPage style: `rounded-xl bg-amber-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-600`
  - Include arrow icon for consistency
  - Be placed after the info items in the popup

**Data Requirements:**
- Each place object must have a `slug` property
- Current places data structure already includes slug (e.g., "sulaiman-too", "manas-ordo")

### UI/UX Considerations
- Popup remains compact and readable
- Button is clearly visible as a call-to-action
- Consistent styling across the application
- Hover state provides visual feedback

---

## Feature 2: Chatbot Button Z-Index Fix

### Current State
- Chatbot component has `z-50` class (line 31)
- On MapPage, the map container may visually overlap the button
- Button should always be accessible

### Desired State
- Chatbot button and popup appear above all page content, including the map
- No visual overlap or obstruction

### Implementation Details

**File:** `src/components/Chatbot.jsx`

**Changes:**
- Line 31: Change `z-50` to `z-[999]`
- This ensures the button and its popup always render above other content
- Applies to both the open/closed states

### Rationale
- `z-50` (Tailwind default) = 500 in z-index
- `z-[999]` = 999 in z-index
- Map and most page content use default z-indexes (<50), so this ensures visibility
- No other elements on the page need higher z-indexes

---

## Data Structure Compatibility

**Place objects must include:**
```javascript
{
  slug: "sulaiman-too",        // Used for navigation
  title: "Сулайман-Тоо",       // Popup display
  meaning: "...",              // Popup display
  rituals: "...",              // Popup display
  risks: "...",                // Popup display
  position: [lat, lng],        // Map marker positioning
}
```

Current data in MapPage (lines 16-44) already has this structure. Hero places (from HERO_SLIDES) need slug property if not already present.

---

## Testing Checklist

- [ ] Map displays all markers correctly
- [ ] Clicking a marker opens popup with all info + button
- [ ] Button text reads "Толук маалымат" with arrow icon
- [ ] Clicking button navigates to `/places/:slug`
- [ ] Place detail page loads with correct content
- [ ] Chatbot button visible on all pages
- [ ] Chatbot button appears above map on MapPage
- [ ] Chatbot popup (when open) appears above map
- [ ] Mobile responsive (button and popup still accessible)

---

## Files to Modify

1. `src/pages/MapPage.jsx` — Add Link button to popup
2. `src/components/Chatbot.jsx` — Increase z-index

## Dependencies

- React Router (Link component) — already imported in MapPage
- Tailwind CSS — for styling
- Existing place data structure with slugs

## Scope & Constraints

- **Scope:** Limited to these two features only
- **No breaking changes:** Existing popup info and functionality preserved
- **Backward compatible:** No changes to data schema or API
- **Mobile friendly:** Both features work on all screen sizes
