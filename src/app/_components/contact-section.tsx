'use client';
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { Github, Linkedin, Mail, Facebook, MessageSquare } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import { ContactForm } from "./contact-form";
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-center">
          {translations.subtitle}
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-background rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
            <ContactForm />
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-background rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Connect with me</h3>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <Button
                    key={method.nameKey}
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full justify-start"
                  >
                    <a href={method.href} target="_blank" rel="noopener noreferrer">
                      <method.icon className="mr-3 h-5 w-5" />
                      {translations.methods[method.nameKey as keyof typeof translations.methods]}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
