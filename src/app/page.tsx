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
