'use client';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { GraduationCap } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const education = [
  { degreeKey: "bba.degree", institutionKey: "bba.institution", durationKey: "bba.duration" },
  { degreeKey: "itDiploma.degree", institutionKey: "itDiploma.institution", durationKey: "itDiploma.duration" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const card = {
  hidden: { opacity: 0, y: 50, rotateX: 15 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export function EducationSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.education : enTranslations.education;

  return (
    <section id="education" role="region" aria-label="Education" className="py-20 sm:py-32 overflow-hidden" style={{ perspective: 1000 }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 1.5 }}
                  >
                    <GraduationCap className="h-10 w-10 text-accent" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-lg font-bold font-headline">
                      {translations[edu.degreeKey as keyof typeof translations]}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary">
                    {translations[edu.institutionKey as keyof typeof translations]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {translations[edu.durationKey as keyof typeof translations]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
