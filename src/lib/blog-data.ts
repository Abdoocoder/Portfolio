import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'building-modern-portfolio-nextjs',
        titleKey: 'Building a Modern Portfolio with Next.js 15',
        descriptionKey: 'A comprehensive guide to building a performant, bilingual portfolio website using Next.js 15, React 19, Framer Motion, and Tailwind CSS.',
        contentKey: 'blog.post1.content',
        content: `<p>Your portfolio is often the first impression potential clients or employers have of your work. In this guide, I'll walk through how I built my own portfolio using the latest web technologies, and share the architectural decisions that made it fast, accessible, and visually striking.</p>

<h2>Why Next.js 15?</h2>
<p>Next.js 15 brings significant improvements to the App Router, including enhanced streaming, improved server components, and better static export support. For a portfolio site, these features are particularly valuable:</p>
<ul>
<li><strong>Static export</strong> — Deploy to any CDN (GitHub Pages, Vercel, Firebase) without a Node server</li>
<li><strong>Server Components by default</strong> — Less client-side JavaScript means faster page loads</li>
<li><strong>Improved image optimization</strong> — Automatic WebP conversion and lazy loading</li>
<li><strong>Streaming and Suspense</strong> — Progressive rendering for complex pages</li>
</ul>

<h2>Architecture Overview</h2>
<p>The portfolio is structured around a few key principles:</p>

<h3>Component Architecture</h3>
<p>Each section of the homepage (Hero, About, Skills, Projects, Testimonials, Contact) is an independent component. This keeps the codebase maintainable and allows each section to manage its own animations and data fetching independently.</p>

<h3>Performance First</h3>
<p>With Framer Motion 12 and its optimised animation engine, we can add smooth animations without sacrificing performance. Key techniques include:</p>
<ul>
<li>Using <code>will-change</code> and hardware-accelerated CSS properties for animations</li>
<li>Spring physics instead of duration-based animations for natural-feeling motion</li>
<li><code>useReducedMotion</code> checks for accessibility</li>
<li>Lazy loading below-the-fold content with Intersection Observer</li>
</ul>

<h2>Internationalisation (i18n)</h2>
<p>Supporting both Arabic and English was a core requirement. The approach uses React Context for language state with JSON translation files. Key considerations for RTL support:</p>
<ul>
<li>Tailwind's RTL modifiers (<code>rtl:</code>, <code>ltr:</code>) handle directional styling</li>
<li>Framer Motion animations reverse direction in RTL mode</li>
<li>Font swapping between Geist (Latin) and Tajawal (Arabic)</li>
<li>All user-facing text goes through a translation function</li>
</ul>

<h2>Animations That Matter</h2>
<p>Rather than animating everything, I focused animation effort on moments that enhance the user experience:</p>
<ul>
<li><strong>Hero entrance</strong> — Staggered fade-in with spring physics</li>
<li><strong>Scroll-triggered reveals</strong> — Sections animate in as they enter the viewport</li>
<li><strong>Interactive micro-interactions</strong> — Magnetic buttons, tilt cards, floating testimonials</li>
<li><strong>Back-to-top</strong> — Spring animation with asymmetric timing for visual interest</li>
</ul>

<h2>Results</h2>
<p>The final site achieves excellent Lighthouse scores across all metrics, supports both Arabic and English, and provides a smooth, engaging experience on both desktop and mobile. The static export deploys seamlessly to any hosting provider.</p>

<p>The complete source code is available on GitHub. Feel free to use it as inspiration for your own portfolio.</p>`,
        author: 'Abdullah Abu Sghaira',
        publishDate: '2024-12-15T10:00:00Z',
        category: 'tutorial',
        tags: ['Next.js', 'React', 'Portfolio', 'Web Development'],
        featured: true,
        readingTime: 8,
    },
    {
        id: '2',
        slug: 'firebase-authentication-guide',
        titleKey: 'Firebase Authentication: Complete Implementation Guide',
        descriptionKey: 'Learn how to implement secure authentication in your web applications using Firebase Authentication with email/password, Google, and custom claims.',
        contentKey: 'blog.post2.content',
        content: `<p>Firebase Authentication provides a complete backend service for managing user authentication. In this guide, I'll cover everything from basic setup to advanced patterns like admin claims and role-based access control.</p>

<h2>Getting Started</h2>
<p>First, create a Firebase project and enable the authentication methods you need. For most applications, email/password and Google sign-in cover the majority of use cases.</p>

<pre><code>// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
</code></pre>

<h2>Email/Password Authentication</h2>
<p>The most common authentication method. Firebase handles password hashing, token generation, and session management automatically.</p>

<pre><code>import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Sign up
await createUserWithEmailAndPassword(auth, email, password);

// Sign in
await signInWithEmailAndPassword(auth, email, password);
</code></pre>

<h2>Google Sign-In</h2>
<p>OAuth providers simplify the user experience. Firebase handles the entire OAuth flow:</p>

<pre><code>import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();
await signInWithPopup(auth, provider);
</code></pre>

<h2>Custom Claims for Role-Based Access</h2>
<p>For admin dashboards and premium features, Firebase supports custom claims on user tokens. Set them using the Firebase Admin SDK:</p>

<pre><code>// Server-side only
import { getAuth } from 'firebase-admin/auth';

await getAuth().setCustomUserClaims(uid, { isAdmin: true });
</code></pre>

<p>Then verify claims on the client:</p>

<pre><code>const user = auth.currentUser;
const tokenResult = await user.getIdTokenResult();
const isAdmin = tokenResult.claims.isAdmin;
</code></pre>

<h2>Security Best Practices</h2>
<ul>
<li><strong>Firestore Security Rules</strong> — Always validate authentication state server-side</li>
<li><strong>Environment Variables</strong> — Never expose service account keys on the client</li>
<li><strong>Token Refresh</strong> — Firebase handles token refresh automatically, but be aware of the 1-hour expiry</li>
<li><strong>Rate Limiting</strong> — Use Firebase Extensions or Cloud Functions to prevent brute force attacks</li>
</ul>

<h2>Real-World Implementation</h2>
<p>In my attendance management system (Tayid Al-Dawam), Firebase Authentication handles:</p>
<ul>
<li>Role-based dashboards (admin, teacher, student)</li>
<li>Secure API access via ID tokens</li>
<li>Multi-tenancy for multiple educational institutions</li>
<li>Session persistence across devices</li>
</ul>

<p>Firebase Authentication scales from small projects to enterprise applications without requiring backend infrastructure management.</p>`,
        author: 'Abdullah Abu Sghaira',
        publishDate: '2024-12-10T14:30:00Z',
        category: 'tutorial',
        tags: ['Firebase', 'Authentication', 'Security'],
        featured: false,
        readingTime: 12,
    },
    {
        id: '3',
        slug: 'tailwind-css-best-practices',
        titleKey: 'Tailwind CSS Best Practices for Production Projects',
        descriptionKey: 'Practical tips and patterns for writing maintainable, scalable Tailwind CSS in real-world projects.',
        contentKey: 'blog.post3.content',
        content: `<p>Tailwind CSS has transformed how developers write styles for the web. After using it extensively across multiple production projects, here are the practices that have made the biggest difference in code quality and maintainability.</p>

<h2>1. Use a Consistent Design System</h2>
<p>Tailwind's utility-first approach works best when paired with a well-defined design system. Configure your theme tokens in <code>tailwind.config.ts</code> rather than using arbitrary values:</p>

<pre><code>// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        display: ['var(--font-space-grotesk)'],
      },
    },
  },
};
</code></pre>

<h2>2. Extract Components, Not Classes</h2>
<p>Resist the urge to use <code>@apply</code> to extract repeated utility patterns. Instead, create React components. This gives you better composability, TypeScript support, and tree-shaking:</p>

<pre><code>// Good — component abstraction
function Badge({ children, variant = 'default' }) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variant === 'default' && 'bg-gray-100 text-gray-700',
      variant === 'success' && 'bg-green-100 text-green-700',
    )}>
      {children}
    </span>
  );
}
</code></pre>

<h2>3. Responsive Design with Mobile First</h2>
<p>Tailwind's breakpoint system is mobile-first by default. Write the mobile layout first, then add larger breakpoints:</p>

<pre><code>// Mobile first — single column
&lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
</code></pre>

<h2>4. Dark Mode Strategy</h2>
<p>Use Tailwind's <code>dark:</code> variant with a class-based strategy for the best developer experience:</p>

<pre><code>// tailwind.config.ts
export default {
  darkMode: 'class',
};

// Component usage
&lt;div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"&gt;
</code></pre>

<h2>5. Performance Optimisation</h2>
<ul>
<li>Enable JIT mode (default in Tailwind v3+) for minimal production CSS</li>
<li>Purge unused styles — configure content paths correctly</li>
<li>Use <code>cn()</code> utility (clsx + tailwind-merge) to handle conflicting classes</li>
</ul>

<h2>6. Accessibility Considerations</h2>
<p>Tailwind's low-level primitives make it easy to build accessible interfaces when you follow these patterns:</p>
<ul>
<li>Always pair <code>sr-only</code> with visible labels for screen readers</li>
<li>Use <code>focus-visible:</code> instead of <code>focus:</code> for keyboard-only focus indicators</li>
<li>Maintain sufficient color contrast with Tailwind's built-in color palette</li>
</ul>

<h2>7. RTL Support</h2>
<p>For bilingual sites, Tailwind's RTL modifiers are essential. Use <code>rtl:</code> and <code>ltr:</code> prefixes for directional styles:</p>

<pre><code>&lt;div className="flex rtl:space-x-reverse space-x-4"&gt;
  &lt;span&gt;Content&lt;/span&gt;
&lt;/div&gt;
</code></pre>

<p>Following these practices has kept my CSS maintainable across projects ranging from landing pages to complex dashboard applications with thousands of lines of templates.</p>`,
        author: 'Abdullah Abu Sghaira',
        publishDate: '2024-12-05T09:15:00Z',
        category: 'article',
        tags: ['Tailwind CSS', 'CSS', 'Design'],
        featured: true,
        readingTime: 6,
    },
];

export function getBlogPosts() {
    return blogPosts.sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
}

export function getFeaturedPosts() {
    return blogPosts.filter(post => post.featured);
}

export function getBlogPostBySlug(slug: string) {
    return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string) {
    return blogPosts.filter(post => post.category === category);
}

export function getBlogPostsByTag(tag: string) {
    return blogPosts.filter(post => post.tags.includes(tag));
}

export function getAllTags() {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}
