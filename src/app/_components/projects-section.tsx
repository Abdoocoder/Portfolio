import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Smart Attendance Approval System",
    description: "A web-based system that digitizes the daily employee attendance approval process, replacing inefficient paper-based workflows. It provides a centralized, secure, and auditable platform for attendance management.",
    features: [
      "Secure authentication for all user levels.",
      "Role-based access control (Employee, Supervisor, Admin).",
      "Intuitive workflow for attendance submission and approval.",
      "Administrative dashboard for oversight and management.",
      "Centralized database with a complete audit trail.",
    ],
    techStack: ["React.js", "Firebase", "Vercel"],
    liveDemoUrl: "https://tayid-aldawam.vercel.app/dashboard",
    githubRepoUrl: "https://github.com/Abdoocoder/tayid-aldawam",
    image: placeHolderImages.find(p => p.id === 'project-smart-attendance'),
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-32 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">Featured Project</SectionHeading>
        <div className="mt-12 max-w-4xl mx-auto">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 flex flex-col">
                  <CardHeader className="p-0">
                    <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4 flex-grow space-y-4">
                    <p className="text-muted-foreground">{project.description}</p>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                        {project.features.slice(0,3).map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 mt-6 gap-4">
                    <Button asChild>
                      <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                  </CardFooter>
                </div>
                <div className="relative min-h-[250px] md:min-h-full">
                  {project.image && (
                     <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      fill
                      data-ai-hint={project.image.imageHint}
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
