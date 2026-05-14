# Highways '26 — Theme & UI Guidelines

This project uses a **shrine / festival** inspired visual style with a strong global gradient background and a small Tailwind-based design system.

## Visual System

### Background
- **Global page background:** a vertical gradient applied on `body` in `src/global.css` (pink → white → deep red → near-black).
- Because the background varies across the page, interactive UI (especially filters) uses a **glass** treatment to remain readable everywhere.

### Core Colors
- **Primary (brand / active):** `#8b0000` (deep red).
- **Text on dark/gradient:** `white` (often using Tailwind opacity utilities like `text-white/70`).
- **Card surfaces (events):** solid **pastel** backgrounds with **black** text (no gradients).

### Glass UI (for buttons/filters)
Used for filter buttons so they work over any part of the gradient:
- `bg-white/10`
- `backdrop-blur-md`
- `border border-white/20`
- `text-white`
- Hover: `hover:bg-white/20 hover:border-white/30`
- Active: `bg-[#8b0000] text-white border-[#8b0000]`

## Typography & Design System Utilities

The base “design system” classes live in `src/global.css` under `@layer components`:
- `ds-title`: large section titles
- `ds-subtitle`: supporting subtitle text (white with opacity)
- `ds-body`: body copy
- `ds-card`: default card wrapper
- `ds-btn-pill`: default pill button

These classes are built into `src/styles/index.css` via the Tailwind CLI.

## Spacing & Layout

### Section Padding
Most sections follow:
- `px-6 md:px-12 lg:px-20`

### Container Width
Most content uses:
- `max-w-7xl mx-auto`

### Responsive Breakpoints
Tailwind breakpoints are used consistently:
- `sm` (small tablets)
- `md` (tablets)
- `lg` (laptops)
- `xl` (large desktop)

## Events Page UI

### Filters
Two stacked filter groups above the grid:
- **Day filter:** All Days, Day 1, Day 2, Day 3 (`data-day`)
- **Category filter:** All, Dance, Music, Gaming, Drama, Technical (`data-category`)

Layout rules:
- Centered and mobile-friendly wrapping via `flex flex-wrap justify-center gap-3`.
Accessibility:
- Buttons use `aria-pressed="true|false"` to communicate state.

### Events Grid
Mobile-first grid scaling:
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
Spacing:
- `gap-6 md:gap-10`

### Event Cards
Card rules:
- Solid pastel background (no gradients)
- Black text
- Rounded corners + padding
- Subtle shadow

Responsive card sizing:
- Mobile: `p-4` and `text-base`
- Tablet+: `md:p-6` and `md:text-lg`
- Desktop: `lg:text-xl`

Card content order:
1. Title
2. Category
3. Date
4. Time
5. Location
6. “View Details” button

## Build / Dev Notes

### Tailwind output
Tailwind is compiled from `src/global.css` into `src/styles/index.css`.

- Dev (watch): `npm run dev`
- Build (minify): `npm run build`

### Local static server (recommended for fetch)
The events page loads JSON via `fetch()`, which requires serving over HTTP (not `file://`).

- Run: `npm run serve`
- Open: `http://localhost:5500/src/pages/events.html`

