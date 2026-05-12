'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { Github, Linkedin, Mail, Facebook, MessageSquare } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import { ContactForm } from "./contact-form";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const contactMethods = [
  { nameKey: "email",    icon: Mail,          href: "mailto:abdoocoder@gmail.com" },
  { nameKey: "linkedin", icon: Linkedin,       href: "https://www.linkedin.com/in/abdullah-abosagherah-64b37357/" },
  { nameKey: "github",   icon: Github,         href: "https://github.com/Abdoocoder" },
  { nameKey: "facebook", icon: Facebook,       href: "https://www.facebook.com/AbdoRaf3" },
  { nameKey: "whatsapp", icon: MessageSquare,  href: "https://wa.me/962780394700" },
];

const methodVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ContactSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.contact : enTranslations.contact;

  return (
    <section id="contact" role="region" aria-label="Contact" className="py-20 sm:py-32 bg-secondary overflow-hidden scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>
        <motion.p
          className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {translations.subtitle}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="bg-background rounded-lg p-8"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-2xl font-bold mb-6">{translations.formTitle}</h3>
            <ContactForm />
          </motion.div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <motion.div
              className="bg-background rounded-lg p-8"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6">{translations.connectTitle}</h3>
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              >
                {contactMethods.map((method) => (
                  <motion.div
                    key={method.nameKey}
                    variants={methodVariants}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button asChild variant="outline" size="lg" className="w-full justify-start cursor-pointer">
                      <a href={method.href} target="_blank" rel="noopener noreferrer">
                        <method.icon className="mr-3 h-5 w-5" />
                        {translations.methods[method.nameKey as keyof typeof translations.methods]}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
