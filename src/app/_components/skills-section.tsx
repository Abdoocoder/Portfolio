import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { 
  Laptop, 
  Layers, 
  Database, 
  GitBranch, 
  Cloud, 
  Search, 
  Lock,
  Code
} from "lucide-react";

const skills = [
  { name: "HTML, CSS, JS", icon: Code },
  { name: "React.js / Next.js", icon: Laptop },
  { name: "Firebase", icon: Database },
  { name: "Supabase", icon: Database },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "Vercel Deployment", icon: Cloud },
  { name: "System Analysis", icon: Search },
  { name: "Access Control", icon: Lock },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">Technical Skills</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4">
          {skills.map((skill) => (
            <Card key={skill.name} className="group text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:bg-card/90">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                <skill.icon className="h-12 w-12 text-accent transition-colors duration-300 group-hover:text-primary" />
                <p className="font-semibold text-base sm:text-lg">{skill.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
