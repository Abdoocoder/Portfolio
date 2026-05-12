'use client';
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Briefcase } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const experiences = [
  {
    roleKey: "itSpecialist.role",
    companyKey: "itSpecialist.company",
    durationKey: "itSpecialist.duration",
    descriptionKeys: [
      "itSpecialist.description.item1",
      "itSpecialist.description.item2",
      "itSpecialist.description.item3",
      "itSpecialist.description.item4",
      "itSpecialist.description.item5",
    ],
  },
];

const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function ExperienceSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.experience : enTranslations.experience;

  return (
    <section id="experience" role="region" aria-label="Experience" className="py-20 sm:py-32 bg-secondary overflow-hidden scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/30"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              style={{ transformOrigin: "top", left: "-1px" }}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="mb-10 ml-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
              >
                {/* Timeline dot */}
                <motion.span
                  className="absolute -left-[11px] flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-secondary"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 + index * 0.15 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Briefcase className="h-4 w-4 text-primary-foreground" />
                  </motion.div>
                </motion.span>

                <motion.div
                  className="p-4 bg-background rounded-lg shadow-sm"
                  whileHover={{ x: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3 className="text-xl font-bold font-headline text-primary">
                    {translations[exp.roleKey as keyof typeof translations]}
                  </h3>
                  <p className="font-semibold text-accent">
                    {translations[exp.companyKey as keyof typeof translations]}
                  </p>
                  <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                    {translations[exp.durationKey as keyof typeof translations]}
                  </time>
                  <motion.ul
                    className="mt-4 space-y-2 text-base text-muted-foreground list-disc pl-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                  >
                    {exp.descriptionKeys.map((pointKey, i) => (
                      <motion.li key={i} variants={listItem}>
                        {translations[pointKey as keyof typeof translations]}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
