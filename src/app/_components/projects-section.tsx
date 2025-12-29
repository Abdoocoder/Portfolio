'use client';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    titleKey: "smartAttendance.title",
    descriptionKey: "smartAttendance.description",
    featuresKeys: [
      "smartAttendance.features.feature1",
      "smartAttendance.features.feature2",
      "smartAttendance.features.feature3",
      "smartAttendance.features.feature4",
      "smartAttendance.features.feature5",
    ],
    techStack: ["React.js", "Firebase", "Vercel"],
    liveDemoUrl: "https://tayid-aldawam.vercel.app/dashboard",
    githubRepoUrl: "https://github.com/Abdoocoder/tayid-aldawam",
    image: placeHolderImages.find(p => p.id === 'project-smart-attendance'),
  }
];

export function ProjectsSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.projects : enTranslations.projects;

  return (
    <section id="projects" className="py-20 sm:py-32 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>
        <div className="mt-12 max-w-4xl mx-auto">
          {projects.map((project) => (
            <Card key={project.titleKey} className={cn(
                "group relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl",
                language === 'ar' ? "text-right" : "text-left"
              )}>
               {project.image && (
                 <Image
                  src={project.image.imageUrl}
                  alt={project.image.description}
                  fill
                  data-ai-hint={project.image.imageHint}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className={cn(
                "relative z-10 flex min-h-[450px] flex-col justify-between bg-gradient-to-t from-background/90 via-background/70 to-transparent p-6",
                 "md:justify-end md:bg-gradient-to-r md:from-background/90 md:via-background/80 md:to-transparent",
                 language === 'ar' && "md:bg-gradient-to-l"
              )}>
                <div className="md:w-1/2">
                    <CardHeader className="p-0">
                        <CardTitle className="font-headline text-2xl text-primary">{translations[project.titleKey as keyof typeof translations]}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4 flex-grow space-y-4">
                        <p className="text-foreground/80">{translations[project.descriptionKey as keyof typeof translations]}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                        {project.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                        </div>
                    </CardContent>
                    <CardFooter className="p-0 mt-6 gap-4">
                        <Button asChild>
                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> {translations.liveDemo}
                        </a>
                        </Button>
                        <Button asChild variant="outline" className="bg-background/50">
                        <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> {translations.github}
                        </a>
                        </Button>
                    </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
