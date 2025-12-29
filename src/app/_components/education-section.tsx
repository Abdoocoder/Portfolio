import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Bachelor’s Degree in Business Administration",
    institution: "University of the People",
    duration: "Ongoing (Distance Learning)",
  },
  {
    degree: "Diploma in Information Technology",
    institution: "Al-Balqa Applied University",
    duration: "Graduated 2013",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">Education</SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {education.map((edu, index) => (
            <Card key={index} className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <GraduationCap className="h-10 w-10 text-accent" />
                <div>
                  <CardTitle className="text-lg font-bold font-headline">{edu.degree}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-primary">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
