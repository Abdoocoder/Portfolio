import { Project } from '@/types';
import { placeHolderImages } from './placeholder-images';

export const projects: Project[] = [
    {
        id: 'madaba-women-market',
        titleKey: 'madabaWomenMarket.title',
        descriptionKey: 'madabaWomenMarket.description',
        techStack: ['Next.js', 'Firebase', 'Tailwind CSS', 'TypeScript'],
        liveDemoUrl: 'https://madaba-women-market.vercel.app/',
        githubRepoUrl: 'https://github.com/Abdoocoder/madaba-women-market',
        image: placeHolderImages.find(p => p.id === 'project-madaba-women-market'),
        category: 'fullstack',
        tags: ['E-commerce', 'Web App', 'Firebase', 'Next.js'],
        featured: true,
        startDate: '2024-01',
        endDate: '2024-03',
    },
    {
        id: 'smart-attendance',
        titleKey: 'smartAttendance.title',
        descriptionKey: 'smartAttendance.description',
        techStack: ['React.js', 'Firebase', 'Vercel', 'TypeScript'],
        liveDemoUrl: 'https://tayid-aldawam.vercel.app/dashboard',
        githubRepoUrl: 'https://github.com/Abdoocoder/tayid-aldawam',
        image: placeHolderImages.find(p => p.id === 'project-smart-attendance'),
        category: 'web',
        tags: ['Dashboard', 'Management System', 'Firebase'],
        featured: true,
        startDate: '2024-06',
        endDate: '2024-12',
    },
    {
        id: 'colors-of-madaba',
        titleKey: 'colorsOfMadaba.title',
        descriptionKey: 'colorsOfMadaba.description',
        techStack: ['Next.js', 'Tailwind CSS', 'ShadCN UI', 'TypeScript'],
        liveDemoUrl: 'https://colorsofmadaba.vercel.app/',
        githubRepoUrl: 'https://github.com/Abdoocoder/colors-of-madaba',
        image: placeHolderImages.find(p => p.id === 'project-colors-of-madaba'),
        category: 'web',
        tags: ['Landing Page', 'Tourism', 'UI/UX'],
        featured: false,
        startDate: '2024-04',
        endDate: '2024-05',
    },
    {
        id: 'sheikh-youssef',
        titleKey: 'sheikhYoussef.title',
        descriptionKey: 'sheikhYoussef.description',
        techStack: ['Next.js', 'Supabase', 'Clerk', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: 'https://sheikh-youssef.vercel.app',
        githubRepoUrl: 'https://github.com/Abdoocoder/sheikh-youssef',
        image: placeHolderImages.find(p => p.id === 'project-sheikh-youssef'),
        category: 'fullstack',
        tags: ['Islamic', 'Web App', 'CMS', 'Next.js'],
        featured: true,
        startDate: '2025-01',
        endDate: '2025-02',
    },
    {
        id: 'fajrak',
        titleKey: 'fajrak.title',
        descriptionKey: 'fajrak.description',
        techStack: ['Next.js', 'Flutter', 'Supabase', 'Firebase', 'Tailwind CSS'],
        liveDemoUrl: '',
        githubRepoUrl: 'https://github.com/Abdoocoder/financetracker',
        image: placeHolderImages.find(p => p.id === 'project-fajrak'),
        category: 'mobile',
        tags: ['Finance', 'Mobile App', 'Flutter', 'SaaS', 'Islamic'],
        featured: true,
        startDate: '2025-03',
        endDate: undefined,
    },
    {
        id: 'nizam-nazafati',
        titleKey: 'nizamNazafati.title',
        descriptionKey: 'nizamNazafati.description',
        techStack: ['Next.js', 'Firebase', 'Google Maps API', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: '',
        githubRepoUrl: '',
        image: placeHolderImages.find(p => p.id === 'project-nizam-nazafati'),
        category: 'fullstack',
        tags: ['Dashboard', 'Municipality', 'Management System'],
        featured: false,
        startDate: '2025-10',
        endDate: undefined,
    },
    {
        id: 'madaba-halls',
        titleKey: 'madabaHalls.title',
        descriptionKey: 'madabaHalls.description',
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: 'https://madabahalls.vercel.app/dashboard',
        githubRepoUrl: 'https://github.com/Abdoocoder/AhmedHall',
        image: placeHolderImages.find(p => p.id === 'project-madaba-halls'),
        category: 'fullstack',
        tags: ['Booking', 'Web App', 'Dashboard', 'Next.js'],
        featured: true,
        startDate: '2026-04',
        endDate: '2026-04',
    },
    {
        id: 'enlyten2',
        titleKey: 'enlyten2.title',
        descriptionKey: 'enlyten2.description',
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: 'https://enlyten2.vercel.app/',
        githubRepoUrl: '',
        image: placeHolderImages.find(p => p.id === 'project-enlyten2'),
        category: 'web',
        tags: ['Landing Page', 'Medical', 'Beauty', 'Next.js'],
        featured: false,
        startDate: '2026-04',
        endDate: '2026-04',
    },
    {
        id: 'flexjob',
        titleKey: 'flexjob.title',
        descriptionKey: 'flexjob.description',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: 'https://flexjob-w3.vercel.app/',
        githubRepoUrl: '',
        image: placeHolderImages.find(p => p.id === 'project-flexjob'),
        category: 'web',
        tags: ['Freelance', 'Jobs', 'Platform', 'Next.js'],
        featured: false,
        startDate: '2026-02',
        endDate: '2026-02',
    },
    {
        id: 'fajrak',
        titleKey: 'fajrak.title',
        descriptionKey: 'fajrak.description',
        techStack: ['Next.js', 'Flutter', 'Supabase', 'Firebase', 'Tailwind CSS'],
        liveDemoUrl: '',
        githubRepoUrl: 'https://github.com/Abdoocoder/financetracker',
        image: undefined,
        category: 'mobile',
        tags: ['Finance', 'Mobile App', 'Flutter', 'SaaS', 'Islamic'],
        featured: true,
        startDate: '2025-03',
        endDate: undefined,
    },
    {
        id: 'nizam-nazafati',
        titleKey: 'nizamNazafati.title',
        descriptionKey: 'nizamNazafati.description',
        techStack: ['Next.js', 'Firebase', 'Google Maps API', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: '',
        githubRepoUrl: '',
        image: undefined,
        category: 'fullstack',
        tags: ['Dashboard', 'Municipality', 'Management System'],
        featured: false,
        startDate: '2025-10',
        endDate: undefined,
    },
    {
        id: 'madaba-halls',
        titleKey: 'madabaHalls.title',
        descriptionKey: 'madabaHalls.description',
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: 'https://madabahalls.vercel.app/dashboard',
        githubRepoUrl: 'https://github.com/Abdoocoder/AhmedHall',
        image: undefined,
        category: 'fullstack',
        tags: ['Booking', 'Web App', 'Dashboard', 'Next.js'],
        featured: true,
        startDate: '2026-04',
        endDate: '2026-04',
    },
    {
        id: 'enlyten2',
        titleKey: 'enlyten2.title',
        descriptionKey: 'enlyten2.description',
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: 'https://enlyten2.vercel.app/',
        githubRepoUrl: '',
        image: undefined,
        category: 'web',
        tags: ['Landing Page', 'Medical', 'Beauty', 'Next.js'],
        featured: false,
        startDate: '2026-04',
        endDate: '2026-04',
    },
    {
        id: 'flexjob',
        titleKey: 'flexJob.title',
        descriptionKey: 'flexJob.description',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        liveDemoUrl: 'https://flexjob-w3.vercel.app/',
        githubRepoUrl: '',
        image: undefined,
        category: 'web',
        tags: ['Freelance', 'Jobs', 'Platform', 'Next.js'],
        featured: false,
        startDate: '2026-02',
        endDate: '2026-02',
    },
];

export function getProjects() {
    return projects;
}

export function getFeaturedProjects() {
    return projects.filter(p => p.featured);
}

export function getProjectsByCategory(category: string) {
    return projects.filter(p => p.category === category);
}

export function getProjectsByTag(tag: string) {
    return projects.filter(p => p.tags.includes(tag));
}

export function getAllProjectTags() {
    const tags = new Set<string>();
    projects.forEach(project => {
        project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
}

export function getAllProjectCategories() {
    const categories = new Set(projects.map(p => p.category));
    return Array.from(categories);
}
