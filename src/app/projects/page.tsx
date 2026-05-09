'use client';
import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { getProjects } from '@/lib/projects-data';
import { LanguageContext } from '@/app/context/language-context';
import arTranslations from '@/translations/ar.json';
import enTranslations from '@/translations/en.json';
import { SectionHeading } from '@/app/_components/section-heading';
import { Header } from '@/app/_components/header';
import { Footer } from '@/app/_components/footer';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';

const allProjects = getProjects();

type FilterKey = 'all' | ProjectCategory;

const categories: Array<{ key: FilterKey; labelEn: string; labelAr: string }> = [
  { key: 'all', labelEn: 'All', labelAr: 'الكل' },
  { key: 'fullstack', labelEn: 'Full Stack', labelAr: 'فول ستاك' },
  { key: 'web', labelEn: 'Web', labelAr: 'ويب' },
  { key: 'mobile', labelEn: 'Mobile', labelAr: 'موبايل' },
];

export default function ProjectsPage() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.projects : enTranslations.projects;
  const allProjectsT = language === 'ar' ? arTranslations.allProjects : enTranslations.allProjects;
  const [activeCategory, setActiveCategory] = useState<FilterKey>('all');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const filtered = activeCategory === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading className="text-center">{allProjectsT.title}</SectionHeading>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.key)}
              >
                {language === 'ar' ? cat.labelAr : cat.labelEn}
              </Button>
            ))}
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                  className="h-full"
                >
                  <Card className={cn('h-full flex flex-col p-6', language === 'ar' ? 'text-right' : '')}>
                    <h3 className="font-headline text-xl font-bold text-primary">
                      {translations[project.titleKey as keyof typeof translations]}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground flex-grow">
                      {translations[project.descriptionKey as keyof typeof translations]}
                    </p>
                    <motion.div
                      className={cn('mt-4 flex flex-wrap gap-2', language === 'ar' ? 'justify-end' : '')}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                    >
                      {project.techStack.map(tech => (
                        <motion.div
                          key={tech}
                          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                        >
                          <Badge variant="secondary">{tech}</Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                    <div className={cn('mt-5 flex items-center gap-3', language === 'ar' ? 'justify-end' : '')}>
                      {project.liveDemoUrl && (
                        <Button asChild size="sm">
                          <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> {translations.liveDemo}
                          </a>
                        </Button>
                      )}
                      {project.githubRepoUrl && (
                        <Button asChild size="sm" variant="outline">
                          <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1.5 h-3.5 w-3.5" /> {translations.github}
                          </a>
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
