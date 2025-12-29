'use client';
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';
import { cn } from "@/lib/utils";

const projects = [
  {
    titleKey: "madabaWomenMarket.title",
    descriptionKey: "madabaWomenMarket.description",
    techStack: ["Next.js", "Firebase", "Tailwind CSS"],
    liveDemoUrl: "https://madaba-women-market.vercel.app/",
    githubRepoUrl: "https://github.com/Abdoocoder/madaba-women-market",
    image: placeHolderImages.find(p => p.id === 'project-madaba-women-market'),
  },
  {
    titleKey: "smartAttendance.title",
    descriptionKey: "smartAttendance.description",
    techStack: ["React.js", "Firebase", "Vercel"],
    liveDemoUrl: "https://tayid-aldawam.vercel.app/dashboard",
    githubRepoUrl: "https://github.com/Abdoocoder/tayid-aldawam",
    image: placeHolderImages.find(p => p.id === 'project-smart-attendance'),
  },
  {
    titleKey: "colorsOfMadaba.title",
    descriptionKey: "colorsOfMadaba.description",
    techStack: ["Next.js", "Tailwind CSS", "ShadCN UI", "TypeScript"],
    liveDemoUrl: "https://colorsofmadaba.vercel.app/",
    githubRepoUrl: "https://github.com/Abdoocoder/colors-of-madaba",
    image: placeHolderImages.find(p => p.id === 'project-colors-of-madaba'),
  }
];

export function ProjectsSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.projects : enTranslations.projects;

  return (
    <section id="projects" className="py-20 sm:py-32 bg-secondary animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-1">
          {projects.map((project, index) => (
            <Card key={project.titleKey} className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl grid grid-cols-1 md:grid-cols-2">
              <div className={cn("p-6 flex flex-col", language === 'ar' ? "md:order-1 text-right" : "")}>
                <header>
                  <h3 className="font-headline text-2xl font-bold text-primary">{translations[project.titleKey as keyof typeof translations]}</h3>
                </header>
                <div className="mt-4 flex-grow space-y-4">
                  <p className="text-muted-foreground">{translations[project.descriptionKey as keyof typeof translations]}</p>
                  <div className={cn("flex flex-wrap gap-2 pt-2", language === 'ar' ? "justify-end" : "")}>
                    {project.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                  </div>
                </div>
                <footer className="mt-6 flex items-center gap-4">
                  <Button asChild>
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> {translations.liveDemo}
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> {translations.github}
                    </a>
                  </Button>
                </footer>
              </div>
              <div className={cn("relative min-h-[250px] md:min-h-full", language === 'ar' ? "md:order-2" : "")}>
                {project.image && (
                  <Image
                    src={project.image.imageUrl}
                    alt={project.image.description}
                    fill
                    data-ai-hint={project.image.imageHint}
                    className="object-contain transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
