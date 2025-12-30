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
