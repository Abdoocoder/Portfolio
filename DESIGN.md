---
name: Abdullah Abu Sghaira — Portfolio
description: Full-stack developer portfolio. Energetic, vibrant, expressive craft.
colors:
  primary: "#23499A"
  accent: "#37A7B4"
  background: "#F6F8FA"
  foreground: "#0D1534"
  surface: "#ECEFF4"
  muted: "#717886"
  border: "#D8DCE5"
  dark-bg: "#0D1629"
  dark-primary: "#7DA3D8"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
  section: "128px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "#1a3880"
    textColor: "{colors.background}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "11px 27px"
  button-outline-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  skill-card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Abdullah Abu Sghaira — Portfolio

## 1. Overview

**Creative North Star: "The Purposeful Signal"**

This is a portfolio built by someone who cares about craft. Not a template, not a theme — a signal of capability delivered through every spacing decision, every type choice, every animation. The design earns attention through clarity and confidence, not decoration.

Energy comes from contrast and intentional color, not from noise. The primary blue anchors trust and technical authority. The teal accent fires where it matters most — CTAs, active states, the accent underline under section headings. Together they produce a palette that reads as modern and credible without being generic blue-SaaS.

Motion exists to serve the content. Scroll-driven entrances, spring-physics hover, a parallax hero. Nothing loops for the sake of looping. Nothing bounces where it shouldn't. The site feels alive because the interactions are considered, not because effects are stacked.

**Key Characteristics:**
- High type contrast: Space Grotesk at display weight vs. Geist body creates decisive hierarchy
- Accent used sparingly — teal appears on underlines, icons, and CTAs only
- Cards lift on hover; they don't spin, flip, or glow
- Generous section whitespace creates breathing room between ideas
- Bilingual-first: RTL Arabic and LTR English share identical visual weight

## 2. Colors: The Coastal Authority Palette

A high-contrast two-accent system built on a restrained neutral base. Neither color is decorative; both earn their place.

### Primary
- **Anchor Blue** (`#23499A`): The structural backbone. Used for all section headings, primary buttons, the scroll-progress bar, timeline dots, and active nav states. It signals technical credibility without the corporate cliché of mid-tone navy.

### Secondary
- **Live Teal** (`#37A7B4`): The accent that breathes energy into the system. Used exclusively on icons in rest state, section heading underlines, the accent progress bar gradient endpoint, and hover states on icon elements. Never used as a background color outside the hero. Its rarity is the point.

### Neutral
- **Ink Navy** (`#0D1534`): Primary foreground text. Tinted toward the primary hue for coherence, never flat black.
- **Arctic White** (`#F6F8FA`): Page background. Cool-tinted, not pure white — prevents eye strain and reads distinctly from card surfaces.
- **Cloud Surface** (`#ECEFF4`): Section alternates, card surfaces, secondary backgrounds.
- **Slate Mist** (`#717886`): Muted text — dates, secondary labels, supporting copy.
- **Frost Border** (`#D8DCE5`): Card edges and dividers. Subtle structure, not visual noise.

### Named Rules
**The Accent Economy Rule.** Teal (`#37A7B4`) touches at most 10% of any given screen. Used on icons, underlines, and the gradient progress bar. Never a background, never filled cards, never text. If it appears everywhere, it appears nowhere.

**The No-Pure-White Rule.** `#fff` and `#000` are prohibited. Every surface and foreground is tinted toward the primary hue (chroma ≥ 0.004).

## 3. Typography

**Display Font:** Space Grotesk (variable, Google Fonts)
**Body Font:** Geist (via Vercel's `geist` package, variable)
**RTL Font:** Tajawal (Arabic only, applied via `[lang="ar"]`)

**Character:** Space Grotesk's geometric structure with ink traps creates authority at large sizes. Geist's humanist spacing reads comfortably at length. The pairing is technical-editorial — not banking, not startup-casual.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 6vw, 4.5rem)`, lh 1.05, ls -0.02em): Hero name only. One per page.
- **Headline** (700, `clamp(1.75rem, 3vw, 2.5rem)`, lh 1.15, ls -0.01em): Section titles via `<SectionHeading>`. Left-anchored or centered based on section layout.
- **Title** (600, 1.25rem, lh 1.3): Project names, job titles, card headings.
- **Body** (400, 1rem, lh 1.65): All paragraph text. Max width 65–75ch enforced on text columns.
- **Label** (500, 0.875rem, ls 0.01em): Badges, tech stack chips, timestamps, nav items.

### Named Rules
**The Weight Jump Rule.** Section headings must be ≥700 weight. Any heading at 600 or below loses structural authority at a glance — reject it.

**The Scale Gap Rule.** Adjacent hierarchy levels must differ by ≥1.25× in font size. A flat scale reads as noise, not hierarchy.

## 4. Elevation

Flat by default. Elevation is a state, not a surface property. Cards are borderless at rest; their presence is defined by the background tint difference between `--surface` and `--background`.

### Shadow Vocabulary
- **Hover lift** (`0 8px 24px rgba(13,21,52,0.10)`): Applied on `whileHover` via framer-motion `boxShadow`. Cards, buttons-as-links, interest items.
- **Modal/floating** (`0 20px 48px rgba(13,21,52,0.16)`): Dialogs, dropdowns, sheets.
- **Section card** (`shadow-lg` → `0 10px 15px -3px rgba(0,0,0,0.1)`): Project cards and contact panels at rest.

### Named Rules
**The Flat-at-Rest Rule.** No shadow at default state unless the element floats above the page by function (sticky nav, dropdowns). Shadows respond to interaction; they don't decorate.

## 5. Components

### Buttons
Confident and tactile. Not pill-shaped (too casual), not sharp (too cold). Gently rounded at 8px.

- **Shape:** Gently curved (8px radius)
- **Primary:** Anchor Blue background (`#23499A`), Arctic White text, 12px/28px padding. `whileHover={{ scale: 1.07 }}` spring physics.
- **Hover/Focus:** Darkens to `#1a3880`. Focus ring: `ring-2 ring-primary ring-offset-2`.
- **Outline:** Transparent background, 1px Anchor Blue border, Anchor Blue text. Hover fills to Cloud Surface.
- **Ghost (hero overlay):** `bg-white/20 backdrop-blur-sm border border-white/30 text-white`. Hover: `bg-white/40`.

### Cards
Cards are the lazy answer — used only where they are truly the best affordance. Resolved: skills section now uses a typographic list, not a card grid.

- **Corner Style:** Gently curved (12px radius)
- **Background:** Arctic White (`#F6F8FA`) or Cloud Surface (`#ECEFF4`) depending on section background
- **Shadow Strategy:** Flat at rest → Hover lift on interaction
- **Border:** `1px solid #D8DCE5` (Frost Border)
- **Internal Padding:** 24px

### Skills List
Replaced the identical-card-grid anti-pattern with a typographic list. Each skill is a single row: accent icon + skill name, separated by `divide-y` borders. Rows reveal with staggered spring entrance. Hover toggles text color from Ink Navy to Anchor Blue.

### Badges / Chips
- **Style:** `bg-surface text-foreground border border-border` — neutral, not colored
- **Size:** `px-2.5 py-0.5 text-xs font-medium rounded-full`
- **Selected (active tech):** Background shifts to `bg-primary/10 text-primary`

### Inputs / Form Fields
- **Style:** `bg-background border border-border rounded-md`
- **Focus:** `ring-2 ring-primary/40` — soft glow, not a hard border jump
- **Error:** `border-destructive text-destructive` with inline error below

### Navigation
- Fixed top, `backdrop-blur-md bg-background/80` — readable but not fully opaque
- Nav links: label weight (500, 0.875rem). Default: Slate Mist. Hover: Ink Navy. Active: Anchor Blue.
- Mobile: Sheet drawer, full height, same type treatment

### Section Headings
The SectionHeading component includes an animated gradient underline (16px wide, `from-primary to-accent`). This is the signature design element — the one place teal appears in every section without breaking the Accent Economy Rule, because it's sub-1% of the surface area.

## 6. Do's and Don'ts

### Do:
- **Do** use Space Grotesk at 700 weight and `letter-spacing: -0.01em` for all section headings. The negative tracking is what gives it authority.
- **Do** let the animated teal underline on `<SectionHeading>` do the accent work. One mark of color per heading is enough.
- **Do** alternate section backgrounds between `#F6F8FA` and `#ECEFF4` for rhythm without resorting to gratuitous borders.
- **Do** use `whileInView` with `viewport={{ once: true }}` so scroll animations fire once and don't re-trigger. Already implemented.
- **Do** make contact and CTA buttons visually distinct from every other button on the page — size `lg`, full `bg-primary`.
- **Do** respect RTL fully: icon margins, text alignment, slide animation direction, and button icon placement must all flip for Arabic.

### Don't:
- **Don't** return to a card-grid layout for skills. The typographic list is deliberate — cards for lists create visual noise. If the list grows, extend it vertically, never box it.
- **Don't** use generic Bootstrap/template-style layouts — formulaic hero with centered text + two buttons below is already borderline. Push the name larger, push the subtitle smaller.
- **Don't** use corporate SaaS blue (`#2563EB`, `#3B82F6`, or any mid-weight Tailwind blue) — the Anchor Blue is specifically calibrated to read differently.
- **Don't** add more animations on top of existing ones. The current motion layer is at the right density. More effects = more distraction = anti-reference failure.
- **Don't** use `border-left` as a colored stripe accent on cards or list items. Use background tints, full borders, or nothing.
- **Don't** use gradient text (`background-clip: text`). Headlines are Anchor Blue, solid. No rainbow headings.
- **Don't** nest cards inside cards. Project cards have an image zone and a text zone — not a card inside a card.
- **Don't** use pure `#000` or `#fff` anywhere. Every value is tinted toward the brand hue.
