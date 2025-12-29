import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { Github, Linkedin, Mail } from "lucide-react";

const contactMethods = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:abosghaira.dev@gmail.com",
    text: "abosghaira.dev@gmail.com",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abdullah-abu-sghaira/",
    text: "Abdullah Abu Sghaira",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/Abdoocoder",
    text: "Abdoocoder",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading>Get in Touch</SectionHeading>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
          {contactMethods.map((method) => (
            <Button key={method.name} asChild variant="outline" size="lg" className="bg-background">
              <a href={method.href} target="_blank" rel="noopener noreferrer">
                <method.icon className="mr-2 h-5 w-5" />
                {method.name}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
