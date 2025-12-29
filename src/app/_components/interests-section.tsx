import { SectionHeading } from "./section-heading";
import { Target, Briefcase, Lightbulb } from "lucide-react";

const interests = [
  {
    icon: Target,
    title: "System Development Roles",
    description: "Seeking opportunities to design, develop, and deploy full-stack web applications that solve real-world administrative challenges.",
  },
  {
    icon: Briefcase,
    title: "Digital Transformation Projects",
    description: "Interested in positions focused on modernizing organizational processes, improving efficiency, and driving technological adoption.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Environments",
    description: "Eager to join a forward-thinking team where I can contribute to innovative solutions and continuously grow my technical skills.",
  },
];

export function InterestsSection() {
  return (
    <section id="interests" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">Career Interests</SectionHeading>
        <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
          I am actively looking for roles where I can apply my skills in system development and process automation to make a tangible impact.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {interests.map((interest) => (
            <div key={interest.title} className="text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="flex justify-center items-center mb-4">
                <interest.icon className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-lg font-bold font-headline text-primary">{interest.title}</h3>
              <p className="mt-2 text-muted-foreground">{interest.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
