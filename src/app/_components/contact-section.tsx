'use client';
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { Github, Linkedin, Mail, Facebook, MessageSquare } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const contactMethods = [
  {
    nameKey: "email",
    icon: Mail,
    href: "mailto:abdoocoder@gmail.com",
  },
  {
    nameKey: "linkedin",
    icon: Linkedin,
    href: "https://www.linkedin.com/me?trk=p_mwlite_profile_self-secondary_nav",
  },
  {
    nameKey: "github",
    icon: Github,
    href: "https://github.com/Abdoocoder",
  },
  {
    nameKey: "facebook",
    icon: Facebook,
    href: "https://www.facebook.com/AbdoRaf3",
  },
  {
    nameKey: "whatsapp",
    icon: MessageSquare,
    href: "https://wa.me/962780394700",
  }
];

export function ContactSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.contact : enTranslations.contact;

  return (
    <section id="contact" className="py-20 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading>{translations.title}</SectionHeading>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {translations.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap justify-center items-center gap-6">
          {contactMethods.map((method) => (
            <Button key={method.nameKey} asChild variant="outline" size="lg" className="bg-background">
              <a href={method.href} target="_blank" rel="noopener noreferrer">
                <method.icon className="mr-2 h-5 w-5" />
                {translations.methods[method.nameKey as keyof typeof translations.methods]}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
