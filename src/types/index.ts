// Core type definitions for the portfolio

export interface Project {
    id: string;
    titleKey: string;
    descriptionKey: string;
    techStack: string[];
    liveDemoUrl?: string;
    githubRepoUrl?: string;
    image?: PlaceholderImage;
    category: ProjectCategory;
    tags: string[];
    featured?: boolean;
    startDate?: string;
    endDate?: string;
}

export interface PlaceholderImage {
    id: string;
    imageUrl: string;
    description: string;
    imageHint: string;
}

export type ProjectCategory = 'web' | 'mobile' | 'fullstack' | 'other';

export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    proficiency: number; // 0-100
    icon?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'soft-skills';

export interface Experience {
    id: string;
    titleKey: string;
    companyKey: string;
    descriptionKey: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    location?: string;
}

export interface Education {
    id: string;
    degreeKey: string;
    institutionKey: string;
    descriptionKey?: string;
    startDate: string;
    endDate: string;
    gpa?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    titleKey: string;
    descriptionKey: string;
    contentKey: string;
    author: string;
    publishDate: string;
    updatedDate?: string;
    category: BlogCategory;
    tags: string[];
    coverImage?: string;
    readingTime?: number;
    featured?: boolean;
}

export type BlogCategory = 'tutorial' | 'article' | 'news' | 'case-study';

export interface Testimonial {
    id: string;
    nameKey: string;
    roleKey: string;
    companyKey: string;
    testimonialKey: string;
    avatar?: string;
    rating: number; // 1-5
    date: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

export type Language = 'en' | 'ar';

export interface TranslationKeys {
    [key: string]: string | TranslationKeys;
}
