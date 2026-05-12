# Abdullah Abu Sghaira — Personal Portfolio

A modern, bilingual (English/Arabic) portfolio website showcasing projects, skills, and professional experience. Built with Next.js 15, React 19, Framer Motion, Tailwind CSS, and Clerk authentication.

## Features

- **Bilingual + RTL** — Full English/Arabic support with seamless switching and right-to-left layout
- **Dark/Light Mode** — System-aware theme with local storage persistence
- **Admin Dashboard** — Clerk-protected dashboard with Project Vault (CRUD, GitHub Gist-backed) and Portfolio Manager
- **Smooth Animations** — Framer Motion spring physics, magnetic buttons, tilt cards, scroll-triggered reveals, floating testimonials
- **Contact Form** — Zod-validated form with Resend email integration
- **Blog** — 3 posts with full HTML content, tags, and category filtering
- **CV Page** — Printable resume at `/cv` with print/save-as-PDF support
- **OG Images** — Dark Tech themed social preview images
- **SEO** — Comprehensive metadata, JSON-LD structured data, sitemap, robots.txt
- **Performance** — Static export ready, optimised Core Web Vitals

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.5 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 + ShadCN UI |
| Animation | Framer Motion 12.38 |
| Auth | Clerk (admin dashboard protection) |
| Email | Resend |
| Backend | Firebase 11.10, Supabase, GitHub Gist |
| Fonts | Geist, Space Grotesk, Tajawal |
| Deployment | Vercel / Firebase App Hosting / GitHub Pages |

## Project Structure

```
src/
├── app/
│   ├── _components/       # Section components (Hero, About, Skills, Projects, etc.)
│   ├── api/               # API routes (contact, portfolio, vault)
│   ├── blog/              # Blog list + post pages
│   ├── cv/                # Printable resume page
│   ├── dashboard/         # Admin dashboard (vault, portfolio manager)
│   ├── projects/          # Projects listing with category filter
│   ├── context/           # React contexts (language, theme)
│   ├── layout.tsx         # Root layout with ClerkProvider, fonts, providers
│   └── page.tsx           # Home page (10 sections)
├── components/ui/         # ShadCN UI components
├── hooks/                 # Custom React hooks (useScrollSpy, etc.)
├── lib/                   # Data files, utilities, schemas, Firebase config
├── translations/          # en.json + ar.json
└── types/                 # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+
- Clerk account (for admin dashboard)
- Resend account (for contact form)
- Firebase project (optional, for analytics)

### Environment Variables

Copy `.env.local` template:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Resend
RESEND_API_KEY=

# GitHub Gist (Project Vault persistence)
NEXT_PUBLIC_GIST_ID=
GIST_TOKEN=
```

### Run Locally

```bash
npm install
npm run dev
# → http://localhost:9002
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack, port 9002) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type check |

## Deployment

### Vercel / Firebase App Hosting

Full Next.js server — Clerk, API routes, and dynamic pages work natively.

### GitHub Pages (Static Export)

The GitHub Actions workflow automatically:
1. Strips Clerk middleware, API routes, and dashboard pages
2. Builds with `output: export`
3. Deploys to `gh-pages` branch

Set `NEXT_PUBLIC_GITHUB_ACTIONS=true` in your repo secrets.

## Admin Dashboard

Protected by Clerk authentication. Accessible at `/dashboard` for users with `publicMetadata.isAdmin` set to `true` in the Clerk Dashboard.

- **Project Vault** — Full CRUD with GitHub Gist persistence, status tracking, progress bars, search & filter
- **Portfolio Manager** — Manage visible portfolio projects, seed from vault, featured toggles

## Customization

- **Content** — Edit `src/translations/{en,ar}.json` for all text
- **Projects** — Add to `src/lib/projects-data.ts` (static) or use the Portfolio Manager dashboard
- **Skills** — Modify `src/lib/skills-data.ts`
- **Blog** — Add posts in `src/lib/blog-data.ts`
- **Metadata** — Update `src/lib/metadata.ts`
- **Theme** — Edit `src/app/globals.css` and `tailwind.config.ts`

## License

MIT

## Contact

Abdullah Abu Sghaira

- GitHub: [@Abdoocoder](https://github.com/Abdoocoder)
- LinkedIn: [Abdullah Abu Sghaira](https://linkedin.com/in/abdullah-abosagherah-64b37357)
- Site: [abdoocoder.dev](https://abdoocoder.dev)
