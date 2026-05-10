'use client';
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Laptop, Database, GitBranch, Cloud, Search, Lock, Code } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const skills = [
  { nameKey: "htmlCssJs",       icon: Code      },
  { nameKey: "reactNext",       icon: Laptop    },
  { nameKey: "firebase",        icon: Database  },
  { nameKey: "supabase",        icon: Database  },
  { nameKey: "gitGithub",       icon: GitBranch },
  { nameKey: "vercel",          icon: Cloud     },
  { nameKey: "systemAnalysis",  icon: Search    },
  { nameKey: "accessControl",   icon: Lock      },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const pill = {
  hidden: { opacity: 0, scale: 0.88, y: 14 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

export function SkillsSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <section id="skills" className="py-20 sm:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.skills.title}</SectionHeading>

        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.nameKey}
              variants={pill}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-background border border-border
                         text-foreground cursor-default select-none
                         hover:bg-primary hover:border-primary hover:text-primary-foreground"
            >
              <skill.icon
                className="h-5 w-5 flex-shrink-0 text-accent group-hover:text-primary-foreground"
                aria-hidden="true"
              />
              <span className="font-medium text-sm sm:text-base whitespace-nowrap">
                {translations.skills.items[skill.nameKey as keyof typeof translations.skills.items]}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
