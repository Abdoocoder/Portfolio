'use client';
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Target, Briefcase, Lightbulb } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const interests = [
  { icon: Target,    titleKey: "systemDev.title",              descriptionKey: "systemDev.description" },
  { icon: Briefcase, titleKey: "digitalTransformation.title",  descriptionKey: "digitalTransformation.description" },
  { icon: Lightbulb, titleKey: "innovativeEnvironments.title", descriptionKey: "innovativeEnvironments.description" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 180, damping: 14 },
  },
};

export function InterestsSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.interests : enTranslations.interests;

  return (
    <section id="interests" className="py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>
        <motion.p
          className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {translations.subtitle}
        </motion.p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {interests.map((interest, index) => (
            <motion.div
              key={interest.titleKey}
              variants={card}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="text-center p-6 bg-card rounded-lg shadow-sm cursor-pointer"
            >
              <motion.div
                className="flex justify-center items-center mb-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <interest.icon className="h-10 w-10 text-accent" />
                </motion.div>
              </motion.div>
              <h3 className="text-lg font-bold font-headline text-primary">
                {translations[interest.titleKey as keyof typeof translations]}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {translations[interest.descriptionKey as keyof typeof translations]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
