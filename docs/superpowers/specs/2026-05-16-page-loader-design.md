# PageLoader — Design Spec
Date: 2026-05-16

## Overview

An animated full-screen page loader that plays once on every visit to the portfolio home page. Bold gradient name reveal with a cinematic scale-out exit. Built with Framer Motion (already installed).

## Decisions

| Decision | Choice |
|---|---|
| Style | Bold gradient name + role tagline + accent line |
| Text | Fixed English: "Abdullah Abu Sghaira" / "Full-Stack Developer" |
| Exit animation | Scale out — group scales to 1.2, blurs to 14px, fades to 0 |
| Background | Theme-aware: dark `#0D1629`, light `#F6F8FA` |
| Frequency | Every page load (no sessionStorage gate) |
| Library | Framer Motion (`AnimatePresence` + `motion.div`) |
| Language | Fixed English regardless of site language setting |

## Files

| File | Change |
|---|---|
| `src/components/page-loader.tsx` | New — the loader component |
| `src/app/page.tsx` | Edit — mount `<PageLoader>` above the layout, add `loaderDone` state |

## Component: PageLoader

```tsx
// src/components/page-loader.tsx
'use client';

interface PageLoaderProps {
  onComplete: () => void;
}
```

- Accepts `onComplete` callback; parent calls it to unmount via `AnimatePresence`
- Reads `resolvedTheme` from `useTheme()` (existing `ThemeProvider`) — resolves `'system'` to `'light' | 'dark'` automatically
- `useEffect` fires after **2.2s** to trigger exit state (`exiting: true`)
- When Framer Motion finishes the exit animation, calls `onComplete`

## Animation Sequence

All elements are children of a single `motion.div` container.

### Enter (plays immediately on mount)

| Element | From | To | Duration | Delay | Ease |
|---|---|---|---|---|---|
| Name | `opacity:0, y:16, filter:blur(8px)` | `opacity:1, y:0, filter:blur(0)` | 0.8s | 0s | easeOut |
| Role tagline | `opacity:0, letterSpacing:0.2em` | `opacity:0.6, letterSpacing:0.35em` | 0.6s | 0.3s | easeOut |
| Accent line | `width:0` | `width:40px` | 0.5s | 0.5s | easeOut |

### Hold

1.4s pause at full visibility (timer set in `useEffect` on mount: `2400ms = 1000ms enter + 1400ms hold`).
The enter sequence fully completes at ~1000ms: name (0–800ms), role (300–900ms), accent line (500–1000ms).

### Exit (triggered after hold)

The entire group animates as one unit:

| Property | To | Duration | Ease |
|---|---|---|---|
| `scale` | `1.2` | 0.55s | easeIn |
| `filter` | `blur(14px)` | 0.55s | easeIn |
| `opacity` | `0` | 0.55s | easeIn |

On `onAnimationComplete` of the exit motion → call `onComplete()` → `AnimatePresence` unmounts.

## Visual Design

### Name
- Font: Space Grotesk, 700 weight, `clamp(1.75rem, 4vw, 2.75rem)`
- Color: CSS gradient text `linear-gradient(135deg, #23499A 30%, #37A7B4 100%)`
- Letter spacing: `-0.02em`

### Role tagline
- Font: Geist, 400 weight, `0.6875rem` (11px)
- Color: dark mode `rgba(55,167,180,0.55)` / light mode `rgba(35,73,154,0.4)`
- Letter spacing: `0.35em` (final state)
- Text transform: uppercase

### Accent line
- Height: `1.5px`
- Final width: `40px`
- Background: `linear-gradient(90deg, #23499A, #37A7B4)`
- Border radius: `2px`

### Background
- Dark mode: `#0D1629`
- Light mode: `#F6F8FA`
- No blur or radial overlays — clean flat background

## Integration in page.tsx

```tsx
const [loaderDone, setLoaderDone] = useState(false);

return (
  <>
    <AnimatePresence>
      {!loaderDone && <PageLoader onComplete={() => setLoaderDone(true)} />}
    </AnimatePresence>
    {/* existing layout */}
  </>
);
```

## Constraints

- No GSAP — Framer Motion only
- No sessionStorage — loader plays on every visit
- No Arabic text in the loader — always English
- Must not break existing scroll-progress, header, or back-to-top components (they render beneath the overlay and become interactive once loader unmounts)
- `z-index: 50` — sits above all page content but below any future modals
