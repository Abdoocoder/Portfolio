'use client';
import Image from "next/image";
import { motion } from "framer-motion";
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
    <section id="projects" className="py-20 sm:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-1">
          {projects.map((project, index) => {
            const fromLeft = index % 2 === 0;
            return (
              <motion.div
                key={project.titleKey}
                initial={{ opacity: 0, x: fromLeft ? -70 : 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(0,0,0,0.12)" }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                >
                  <Card className="overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
                    <div className={cn("p-6 flex flex-col", language === 'ar' ? "md:order-1 text-right" : "")}>
                      <header>
                        <h3 className="font-headline text-2xl font-bold text-primary">
                          {translations[project.titleKey as keyof typeof translations]}
                        </h3>
                      </header>
                      <div className="mt-4 flex-grow space-y-4">
                        <p className="text-muted-foreground">
                          {translations[project.descriptionKey as keyof typeof translations]}
                        </p>
                        <motion.div
                          className={cn("flex flex-wrap gap-2 pt-2", language === 'ar' ? "justify-end" : "")}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
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
                      </div>
                      <footer className="mt-6 flex items-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400 }}>
                          <Button asChild>
                            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" /> {translations.liveDemo}
                            </a>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400 }}>
                          <Button asChild variant="outline">
                            <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" /> {translations.github}
                            </a>
                          </Button>
                        </motion.div>
                      </footer>
                    </div>

                    <div className={cn("relative min-h-[250px] md:min-h-full overflow-hidden", language === 'ar' ? "md:order-2" : "")}>
                      {project.image && (
                        <motion.div
                          className="absolute inset-0"
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <Image
                            src={project.image.imageUrl}
                            alt={project.image.description}
                            fill
                            priority
                            placeholder="blur"
                            blurDataURL={project.image.blurDataURL}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            data-ai-hint={project.image.imageHint}
                            className="object-contain"
                          />
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
