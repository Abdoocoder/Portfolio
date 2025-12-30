import { Skill } from '@/types';

export const skills: Skill[] = [
    // Frontend
    {
        id: 'react',
        name: 'React',
        category: 'frontend',
        proficiency: 95,
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        category: 'frontend',
        proficiency: 90,
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        category: 'frontend',
        proficiency: 85,
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'frontend',
        proficiency: 90,
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        category: 'frontend',
        proficiency: 95,
    },
    {
        id: 'html-css',
        name: 'HTML/CSS',
        category: 'frontend',
        proficiency: 95,
    },

    // Backend
    {
        id: 'nodejs',
        name: 'Node.js',
        category: 'backend',
        proficiency: 80,
    },
    {
        id: 'firebase',
        name: 'Firebase',
        category: 'backend',
        proficiency: 85,
    },
    {
        id: 'api-design',
        name: 'REST API',
        category: 'backend',
        proficiency: 85,
    },

    // Tools
    {
        id: 'git',
        name: 'Git',
        category: 'tools',
        proficiency: 90,
    },
    {
        id: 'vercel',
        name: 'Vercel',
        category: 'tools',
        proficiency: 85,
    },
    {
        id: 'vscode',
        name: 'VS Code',
        category: 'tools',
        proficiency: 95,
    },
    {
        id: 'figma',
        name: 'Figma',
        category: 'tools',
        proficiency: 75,
    },

    // Soft Skills
    {
        id: 'problem-solving',
        name: 'Problem Solving',
        category: 'soft-skills',
        proficiency: 90,
    },
    {
        id: 'communication',
        name: 'Communication',
        category: 'soft-skills',
        proficiency: 85,
    },
    {
        id: 'teamwork',
        name: 'Teamwork',
        category: 'soft-skills',
        proficiency: 90,
    },
];

export function getSkills() {
    return skills;
}

export function getSkillsByCategory(category: string) {
    return skills.filter(s => s.category === category);
}

export function getFrontendSkills() {
    return getSkillsByCategory('frontend');
}

export function getBackendSkills() {
    return getSkillsByCategory('backend');
}

export function getToolsSkills() {
    return getSkillsByCategory('tools');
}

export function getSoftSkills() {
    return getSkillsByCategory('soft-skills');
}
