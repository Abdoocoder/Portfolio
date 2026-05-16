# PageLoader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an animated full-screen page loader to the portfolio home page that plays on every visit, reveals the developer's name with a blur-in animation, then exits with a scale-out effect.

**Architecture:** A new `PageLoader` client component renders as a `fixed inset-0` overlay. It owns its own 2400ms timer; when the timer fires it calls `onComplete`, which causes the parent (`page.tsx`) to remove it from the tree. `AnimatePresence` in the parent intercepts the removal and plays the exit animation before fully unmounting.

**Tech Stack:** Framer Motion (`motion`, `AnimatePresence`), React `useEffect`/`useState`, existing `useTheme()` hook from `ThemeProvider`.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/page-loader.tsx` | Create | The loader: animations, timer, theme-aware background |
| `src/app/page.tsx` | Modify | Mount loader with `AnimatePresence`, hold `loaderDone` state |

---

## Task 1: Create `src/components/page-loader.tsx`

**Files:**
- Create: `src/components/page-loader.tsx`

- [ ] **Step 1: Create the file with this exact content**

```tsx
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/theme-context';

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';
  const bg = isDark ? '#0D1629' : '#F6F8FA';
  const roleColor = isDark ? 'rgba(55,167,180,0.55)' : 'rgba(35,73,154,0.4)';

  useEffect(() => {
    const timer = setTimeout(onComplete, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: bg }}
      exit={{
        scale: 1.2,
        filter: 'blur(14px)',
        opacity: 0,
        transition: { duration: 0.55, ease: 'easeIn' },
      }}
    >
      {/* Name */}
      <motion.h1
        className="font-headline font-bold"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #23499A 30%, #37A7B4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Abdullah Abu Sghaira
      </motion.h1>

      {/* Role tagline */}
      <motion.p
        style={{
          fontSize: '0.6875rem',
          color: roleColor,
          textTransform: 'uppercase',
          marginTop: '8px',
        }}
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 0.6, letterSpacing: '0.35em' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      >
        Full-Stack Developer
      </motion.p>

      {/* Accent line */}
      <motion.div
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, #23499A, #37A7B4)',
          borderRadius: '2px',
          marginTop: '12px',
        }}
        initial={{ width: 0 }}
        animate={{ width: 40 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      />
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/abdullah/Projects/Portfolio && npx tsc --noEmit
```

Expected: no errors related to `page-loader.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/page-loader.tsx
git commit -m "feat: add PageLoader component with Framer Motion animations"
```

---

## Task 2: Wire `PageLoader` into `src/app/page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the contents of `src/app/page.tsx` with this**

```tsx
'use client';
import { useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './_components/header';
import { HeroSection } from './_components/hero-section';
import { AboutSection } from './_components/about-section';
import { SkillsSection } from './_components/skills-section';
import { ProjectsSection } from './_components/projects-section';
import { ExperienceSection } from './_components/experience-section';
import { EducationSection } from './_components/education-section';
import { TestimonialsSection } from './_components/testimonials-section';
import { InterestsSection } from './_components/interests-section';
import { ContactSection } from './_components/contact-section';
import { Footer } from './_components/footer';
import { ScrollProgress } from './_components/scroll-progress';
import { BackToTop } from './_components/back-to-top';
import { LanguageContext } from './context/language-context';
import { PageLoader } from '@/components/page-loader';

export default function Home() {
  const { language } = useContext(LanguageContext);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <>
      <AnimatePresence>
        {!loaderDone && (
          <PageLoader key="loader" onComplete={() => setLoaderDone(true)} />
        )}
      </AnimatePresence>
      <div className="flex min-h-dvh flex-col bg-background text-foreground">
        <ScrollProgress />
        <Header />
        <main id="main-content" className="flex-1">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <TestimonialsSection />
          <InterestsSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/abdullah/Projects/Portfolio && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: mount PageLoader on home page with AnimatePresence"
```

---

## Task 3: Visual verification

- [ ] **Step 1: Start the dev server**

```bash
cd /home/abdullah/Projects/Portfolio && npm run dev
```

- [ ] **Step 2: Open http://localhost:3000 and verify the following checklist**

| Check | Expected |
|---|---|
| Loader appears on load | Full-screen overlay covers everything |
| Name animates in | Blurs from `blur(8px)` → clear, rises from y+16 → 0, 0.8s |
| Role animates in | Fades in after ~0.3s, letter-spacing expands |
| Accent line grows | Appears at 0.5s delay, grows to 40px width |
| After ~2.4s, exit plays | Whole overlay scales up + blurs + fades to 0 |
| Site reveals | Portfolio page is interactive after exit |
| Dark mode | Background is `#0D1629` |
| Light mode (toggle theme) | Background is `#F6F8FA` |
| Reload | Loader plays again every time |
| Existing features | Scroll progress, header, back-to-top all work normally after loader exits |

- [ ] **Step 3: Commit if everything looks correct**

```bash
git add -p  # nothing to add — just confirming visual pass
git commit --allow-empty -m "chore: verify PageLoader visual QA pass"
```
