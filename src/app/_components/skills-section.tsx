import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { Atom, ClipboardList, CodeXml, DatabaseZap, GitMerge, Github, Rocket, UsersRound } from "lucide-react";

const skills = [
  { name: "HTML, CSS, JS", icon: CodeXml },
  { name: "React.js / Next.js", icon: Atom },
  { name: "Firebase", icon: DatabaseZap },
  { name: "Supabase", icon: DatabaseZap },
  { name: "Git & GitHub", icon: GitMerge },
  { name: "Vercel Deployment", icon: Rocket },
  { name: "System Analysis", icon: ClipboardList },
  { name: "Access Control", icon: UsersRound },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">Technical Skills</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
          {skills.map((skill) => (
            <Card key={skill.name} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                <skill.icon className="h-10 w-10 text-accent" />
                <p className="font-semibold text-sm sm:text-base">{skill.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
