# Abdullah Abu Sghaira - Personal Portfolio

A modern, feature-rich personal portfolio website showcasing my skills, projects, and professional experience. Built with cutting-edge web technologies and best practices for optimal performance and user experience.

## ✨ Features

### Core Features

- **Bilingual Support:** Seamless switching between English and Arabic with full RTL support
- **Dark/Light Mode:** System-aware theme with smooth transitions and localStorage persistence
- **Responsive Design:** Optimized for all devices from mobile to desktop
- **SEO Optimized:** Comprehensive metadata, structured data (JSON-LD), sitemap, and robots.txt
- **Performance:** Vercel Analytics, Speed Insights, and optimized loading
- **AI Integration:** Powered by Genkit and Google AI (Gemini) for enhanced capabilities

### Sections

- **Hero:** Eye-catching introduction with call-to-action buttons
- **About:** Professional summary and background
- **Skills:** Categorized technical and soft skills
- **Projects:** Featured work with live demos and GitHub links
- **Experience:** Professional work history
- **Education:** Academic background
- **Testimonials:** Client reviews in an interactive carousel
- **Interests:** Personal interests and hobbies
- **Contact:** Integrated contact form with social media links and Firebase integration
- **Blog:** Dynamic blog system with categories and tags

### Advanced Features

- **AI Capabilities:** Built-in AI features using [Genkit](https://github.com/firebase/genkit)
- **Firebase Integration:** Real-time capabilities and analytics
- **Contact Form:** Validated form with Zod schema, loading states, and API integration
- **Blog System:** Full blog with listing page, individual post pages, and dynamic routing
- **Scroll Progress:** Visual reading progress indicator
- **Error Handling:** Custom error boundaries and 404 page
- **Loading States:** Skeleton screens and loading indicators
- **Smooth Animations:** Custom keyframe animations and transitions using Tailwind CSS Animate

## 🚀 Tech Stack

### Frontend

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router and Turbopack
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)

### Backend & Services

- **AI Framework:** [Genkit](https://firebase.google.com/docs/genkit)
- **AI Models:** Google AI (Gemini 2.5 Flash)
- **Backend:** [Firebase](https://firebase.google.com/) (App, Analytics)
- **Deployment:** [Vercel](https://vercel.com/)
- **Form Validation:** [Zod](https://zod.dev/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)

### Development Tools

- **Build Tool:** Turbopack (Next.js 15)
- **Package Manager:** npm
- **Linting:** ESLint
- **Type Checking:** TypeScript

## 📁 Project Structure

```text
Portfolio/
├── src/
│   ├── ai/               # Genkit & AI configurations
│   ├── app/
│   │   ├── _components/      # Reusable components
│   │   ├── api/              # API routes
│   │   ├── blog/             # Blog pages
│   │   ├── context/          # React contexts
│   │   ├── error.tsx         # Error boundary
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/ui/        # ShadCN UI components
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities, Firebase config, and data
│   ├── translations/         # i18n files
│   └── types/                # TypeScript types
├── public/                   # Static assets
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or your preferred package manager
- Firebase project (optional for local dev)
- Google AI API Key (for Genkit features)

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Abdoocoder/Portfolio.git
    ```

2. Navigate to the project directory

    ```bash
    cd Portfolio
    ```

3. Install dependencies

    ```bash
    npm install
    ```

4. Set up environment variables
   Create a `.env.local` file with:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_id
    GOOGLE_GENAI_API_KEY=your_google_ai_key
    ```

5. Run the development server

    ```bash
    npm run dev
    ```

6. Open [http://localhost:9002](http://localhost:9002) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack (Port 9002)
- `npm run genkit:dev` - Start Genkit developer UI
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## 🎨 Customization

### Update Personal Information

1. **Translations:** Edit `src/translations/en.json` and `src/translations/ar.json`
2. **Projects:** Update `src/lib/projects-data.ts`
3. **Skills:** Modify `src/lib/skills-data.ts`
4. **Blog Posts:** Add posts in `src/lib/blog-data.ts`
5. **Metadata:** Update SEO info in `src/lib/metadata.ts`

### Theme Customization

Edit `src/app/globals.css` and `tailwind.config.ts` to customize colors, fonts, and design tokens.

## 🔧 Configuration

### Firebase Integration

Configure your Firebase project in `src/lib/firebase.ts`. Ensure environment variables are set in your deployment platform (Vercel/Firebase).

### AI (Genkit) Integration

The project uses Genkit for AI features. Configuration can be found in `src/ai/genkit.ts`. You need a `GOOGLE_GENAI_API_KEY` to use Gemini models.

## 📊 Performance

- **Lighthouse Score:** 95+ across all metrics
- **Core Web Vitals:** Optimized for LCP, FID, and CLS
- **SEO:** Comprehensive metadata and structured data
- **Accessibility:** WCAG 2.1 compliant

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy with one click

### Firebase Hosting

1. Build the project: `npm run build`
2. Deploy to Firebase: `firebase deploy`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Abdullah Abu Sghaira

- Email: [abdoocoder@gmail.com](mailto:abdoocoder@gmail.com)
- GitHub: [@Abdoocoder](https://github.com/Abdoocoder)
- LinkedIn: [Abdullah Abu Sghaira](https://linkedin.com/in/abdullah-abu-sghaira)

---

Made with ❤️ by Abdullah Abu Sghaira
