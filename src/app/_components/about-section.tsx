'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';
import { placeHolderImages } from "@/lib/placeholder-images";

export function AboutSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const aboutImage = placeHolderImages.find(p => p.id === 'about-portrait');

  return (
    <section id="about" className="py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading>{translations.about.title}</SectionHeading>
            <div className="space-y-4 text-muted-foreground max-w-[65ch]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                {translations.about.paragraph1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {translations.about.paragraph2}
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {aboutImage && (
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                >
                  <Image
                    src={aboutImage.imageUrl}
                    alt={translations.about.imageAlt}
                    width={400}
                    height={500}
                    priority
                    placeholder="blur"
                    blurDataURL={aboutImage.blurDataURL}
                    data-ai-hint={aboutImage.imageHint}
                    style={{ height: 'auto', width: 'auto' }}
                    className="rounded-lg object-cover shadow-lg"
                  />
                </motion.div>
                {/* Decorative offset border */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent/40 rounded-lg -z-10"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
                {/* Top-left accent dot */}
                <motion.div
                  className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-primary/60"
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
