'use client';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { useContext, useRef, useCallback, useEffect } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const orbConfigs = [
  { w: 420, h: 420, x: "55%",  y: "10%", delay: 0,   dur: 12,  color: "bg-primary/20" },
  { w: 280, h: 280, x: "70%",  y: "60%", delay: 3,   dur: 9,   color: "bg-accent/15" },
  { w: 200, h: 200, x: "40%",  y: "72%", delay: 2,   dur: 14,  color: "bg-primary/10" },
  { w: 340, h: 340, x: "82%",  y: "25%", delay: 5,   dur: 11,  color: "bg-accent/10" },
];

const itemAnim = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] as const } },
};

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 15 });
  const springY = useSpring(y, { stiffness: 300, damping: 15 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 180;
    if (dist > maxDist) return;
    const strength = (1 - dist / maxDist);
    x.set(dx * 0.12 * strength);
    y.set(dy * 0.12 * strength);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

function InteractiveOrb({ config, mouseX, mouseY }: { config: typeof orbConfigs[0]; mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const springX = useSpring(offsetX, { stiffness: 40, damping: 12 });
  const springY = useSpring(offsetY, { stiffness: 40, damping: 12 });

  useEffect(() => {
    const unsubX = mouseX.on('change', (mx) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = mx - (rect.left + rect.width / 2);
      offsetX.set(Math.max(-80, Math.min(80, dx * 0.06)));
    });
    const unsubY = mouseY.on('change', (my) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dy = my - (rect.top + rect.height / 2);
      offsetY.set(Math.max(-80, Math.min(80, dy * 0.06)));
    });
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, offsetX, offsetY]);

  return (
    <motion.div
      ref={ref}
      className={`absolute rounded-full blur-3xl pointer-events-none ${config.color}`}
      style={{ width: config.w, height: config.h, left: config.x, top: config.y, x: springX, y: springY }}
      animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1] }}
      transition={{ duration: config.dur, delay: config.delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function HeroSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      id="hero"
      role="region"
      aria-label="Hero"
      className="relative min-h-[max(80dvh,500px)] overflow-hidden scroll-mt-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          autoPlay muted loop playsInline poster="/hero-video-poster.jpg" preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Animated background video showcasing Abdullah's work"
        >
          <source src="/Reboot Hero Section.mp4" type="video/mp4" />
        </video>
        <Image src="/hero-bg-fallback.webp" alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/50 to-transparent z-[1]" />

      {orbConfigs.map((config, i) => (
        <InteractiveOrb key={i} config={config} mouseX={mouseX} mouseY={mouseY} />
      ))}

      <motion.div
        className="relative z-10 flex items-center min-h-[max(80dvh,500px)]"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="w-full container mx-auto px-4 sm:px-6 lg:pl-[10vw] lg:pr-8">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            }}
          >
            <motion.h1 variants={itemAnim} className="text-5xl font-bold font-headline text-gray-50 sm:text-6xl md:text-7xl drop-shadow-md" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              {translations.hero.name}
            </motion.h1>
            <motion.p variants={itemAnim} className="mt-4 text-xl sm:text-2xl font-semibold text-accent font-headline drop-shadow-sm">
              {translations.hero.title}
            </motion.p>
            <motion.p variants={itemAnim} className="mt-6 max-w-xl text-lg text-gray-100 drop-shadow-sm">
              {translations.hero.subtitle}
            </motion.p>
            <motion.div variants={itemAnim} className="mt-10 flex flex-wrap gap-4">
              <MagneticButton>
                <Button asChild size="lg" className="shadow-lg">
                  <Link href="#contact">{translations.hero.contactButton}</Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="bg-background/20 text-gray-100 border-gray-100/30 hover:bg-background/40 backdrop-blur-sm">
                  <a href="/CV.pdf" download="Abdullah_Abu_Sghaira_CV.pdf">
                    <Download className="me-2 h-4 w-4" />
                    {translations.header.downloadCvButton}
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="bg-background/20 text-gray-100 border-gray-100/30 hover:bg-background/40 backdrop-blur-sm">
                  <Link href="#projects">
                    {translations.hero.workButton}
                    <ArrowDown className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 120, damping: 14 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-100/50 rounded-full flex justify-center pt-2"
          animate={prefersReducedMotion ? { opacity: 0.5 } : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-gray-100 rounded-full"
            animate={prefersReducedMotion ? { y: 7 } : { y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
