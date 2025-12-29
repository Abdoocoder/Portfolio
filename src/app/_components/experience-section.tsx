import { SectionHeading } from "./section-heading";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "IT Specialist & Systems Developer",
    company: "Public Sector / Municipal Administration",
    duration: "2014 - Present",
    description: [
      "Led digital transformation initiatives, converting manual paper-based workflows into efficient, automated web systems.",
      "Developed and maintained administrative applications to improve operational efficiency and data management.",
      "Conducted system analysis and documentation to identify bottlenecks and propose technological solutions.",
      "Implemented role-based access control (RBAC) to ensure data security and integrity across all developed systems.",
      "Provided technical support and training to staff, ensuring smooth adoption of new digital tools and processes.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">Professional Experience</SectionHeading>
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative border-l-2 border-primary/20">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-10 ml-8">
                <span className="absolute -left-[11px] flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-secondary">
                  <Briefcase className="h-4 w-4 text-primary-foreground" />
                </span>
                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold font-headline text-primary">{exp.role}</h3>
                  <p className="font-semibold text-accent">{exp.company}</p>
                  <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">{exp.duration}</time>
                  <ul className="mt-4 space-y-2 text-base text-muted-foreground list-disc pl-5">
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
