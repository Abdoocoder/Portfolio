# Abdullah Abu Sghaira - Personal Portfolio

A modern, feature-rich personal portfolio website showcasing my skills, projects, and professional experience. Built with cutting-edge web technologies and best practices for optimal performance and user experience.

## ✨ Features

### Core Features

- **Bilingual Support:** Seamless switching between English and Arabic with full RTL support
- **Dark/Light Mode:** System-aware theme with smooth transitions and localStorage persistence
- **Responsive Design:** Optimized for all devices from mobile to desktop
- **SEO Optimized:** Comprehensive metadata, structured data (JSON-LD), sitemap, and robots.txt
- **Performance:** Vercel Analytics, Speed Insights, and optimized loading

### Sections

- **Hero:** Eye-catching introduction with call-to-action buttons
- **About:** Professional summary and background
- **Skills:** Categorized technical and soft skills
- **Projects:** Featured work with live demos and GitHub links
- **Experience:** Professional work history
- **Education:** Academic background
- **Testimonials:** Client reviews in an interactive carousel
- **Interests:** Personal interests and hobbies
- **Contact:** Integrated contact form with social media links
- **Blog:** Dynamic blog system with categories and tags

### Advanced Features

- **Contact Form:** Validated form with Zod schema, loading states, and API integration
- **Blog System:** Full blog with listing page, individual post pages, and dynamic routing
- **Scroll Progress:** Visual reading progress indicator
- **Error Handling:** Custom error boundaries and 404 page
- **Loading States:** Skeleton screens and loading indicators
- **Smooth Animations:** Custom keyframe animations and transitions

## 🚀 Tech Stack

### Frontend

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Services

- **Deployment:** [Vercel](https://vercel.com/)
- **Analytics:** Vercel Analytics & Speed Insights
- **Form Validation:** [Zod](https://zod.dev/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)

### Development Tools

- **Package Manager:** npm
- **Linting:** ESLint
- **Type Checking:** TypeScript

## 📁 Project Structure

```text
Portfolio/
├── src/
│   ├── app/
│   │   ├── _components/      # Reusable components
│   │   ├── api/              # API routes
│   │   ├── blog/             # Blog pages
│   │   ├── context/          # React contexts
│   │   ├── error.tsx         # Error boundary
│   │   ├── loading.tsx       # Loading state
│   │   ├── not-found.tsx     # 404 page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/ui/        # UI components
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities and data
│   ├── translations/         # i18n files
│   └── types/                # TypeScript types
├── public/                   # Static assets
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or your preferred package manager

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

4. Run the development server

    ```bash
    npm run dev
    ```

5. Open [http://localhost:9002](http://localhost:9002) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
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

### Email Integration

To enable contact form email sending, update `src/app/api/contact/route.ts` with your preferred email service:

- [Resend](https://resend.com)
- [SendGrid](https://sendgrid.com)
- [Nodemailer](https://nodemailer.com)

### Analytics

Vercel Analytics is pre-configured. For other analytics:

1. Add your tracking code to `src/app/layout.tsx`
2. Update verification codes in `src/lib/metadata.ts`

## 📊 Performance

- **Lighthouse Score:** 95+ across all metrics
- **Core Web Vitals:** Optimized for LCP, FID, and CLS
- **SEO:** Comprehensive metadata and structured data
- **Accessibility:** WCAG 2.1 compliant

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The project can be deployed to any platform supporting Next.js:

- Netlify
- AWS Amplify
- Google Cloud
- Self-hosted

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
