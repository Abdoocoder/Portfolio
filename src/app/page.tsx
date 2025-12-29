import { Header } from './_components/header';
import { HeroSection } from './_components/hero-section';
import { AboutSection } from './_components/about-section';
import { SkillsSection } from './_components/skills-section';
import { ProjectsSection } from './_components/projects-section';
import { ExperienceSection } from './_components/experience-section';
import { EducationSection } from './_components/education-section';
import { InterestsSection } from './_components/interests-section';
import { ContactSection } from './_components/contact-section';
import { Footer } from './_components/footer';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <InterestsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
