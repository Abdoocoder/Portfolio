'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { useContext, useRef } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const orbs = [
  { w: 320, h: 320, x: "5%",  y: "15%", delay: 0,   dur: 9,  color: "bg-primary/25" },
  { w: 220, h: 220, x: "75%", y: "55%", delay: 2,   dur: 7,  color: "bg-accent/20"  },
  { w: 180, h: 180, x: "55%", y: "5%",  delay: 1,   dur: 11, color: "bg-primary/15" },
  { w: 260, h: 260, x: "25%", y: "65%", delay: 3.5, dur: 8,  color: "bg-accent/15"  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, y: 45 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};

export function HeroSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-[80dvh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay muted loop playsInline poster="/hero-video-poster.jpg" preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Reboot Hero Section.mp4" type="video/mp4" />
      </video>

      <Image src="/hero-bg-fallback.webp" alt="" fill priority sizes="100vw" className="object-cover -z-10" />

      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl pointer-events-none ${orb.color}`}
          style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y }}
          animate={{ y: [0, -30, 0], x: [0, 12, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="absolute inset-0 bg-black/50 z-0" />

      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={item}
            className="text-5xl font-bold font-headline text-white sm:text-6xl md:text-7xl drop-shadow-md"
            style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            {translations.hero.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-xl sm:text-2xl font-semibold text-accent font-headline drop-shadow-sm"
          >
            {translations.hero.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-200 drop-shadow-sm"
          >
            {translations.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <Button asChild size="lg" className="shadow-lg">
                <Link href="#contact">{translations.hero.contactButton}</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <Button asChild variant="outline" size="lg" className="bg-background/20 text-white border-white/30 hover:bg-background/40 backdrop-blur-sm">
                <a href="/CV.pdf" download="Abdullah_Abu_Sghaira_CV.pdf">
                  <Download className="me-2 h-4 w-4" />
                  {translations.header.downloadCvButton}
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <Button asChild variant="outline" size="lg" className="bg-background/20 text-white border-white/30 hover:bg-background/40 backdrop-blur-sm">
                <Link href="#projects">
                  {translations.hero.workButton}
                  <ArrowDown className="ms-2 h-4 w-4 animate-bounce" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
