'use client';
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type PanInfo } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/lib/portfolio-data";

type Translations = typeof arTranslations.projects;

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rectRef = useRef<DOMRect | null>(null);
  const canHover = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover.current) return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover.current) return;
    const rect = rectRef.current;
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    if (!canHover.current) return;
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PhoneFrame({ project, isRtl }: { project: PortfolioProject; isRtl: boolean }) {
  const title = isRtl ? project.nameAr : project.nameEn;
  const url   = project.liveUrl || project.githubUrl || "";

  return (
    <div className="relative group/phone">
      <motion.a
        href={url || undefined}
        target={url ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={cn(
          "group relative w-[140px] h-[302px] sm:w-[175px] sm:h-[378px] md:w-[195px] md:h-[420px]",
          "rounded-[28px] sm:rounded-[35px] md:rounded-[42px] overflow-hidden",
          "border-[5px] sm:border-[6px] md:border-[7px] border-gray-900",
          "shadow-xl block",
          url ? "cursor-pointer" : "cursor-default",
        )}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[48px] sm:w-[58px] md:w-[68px] h-[16px] sm:h-[19px] md:h-[22px] bg-gray-900 rounded-b-[12px] sm:rounded-b-[15px] md:rounded-b-[18px] z-20" />
        <div className="absolute right-[-8px] sm:right-[-10px] md:right-[-11px] top-[64px] sm:top-[78px] md:top-[90px] w-[4px] sm:w-[4px] md:w-[5px] h-[26px] sm:h-[31px] md:h-[36px] bg-gray-900 rounded-l-full z-20" />
        <div className="absolute left-[-8px] sm:left-[-10px] md:left-[-11px] top-[52px] sm:top-[63px] md:top-[72px] w-[4px] sm:w-[4px] md:w-[5px] h-[20px] sm:h-[24px] md:h-[28px] bg-gray-900 rounded-r-full z-20" />
        <div className="absolute left-[-8px] sm:left-[-10px] md:left-[-11px] top-[78px] sm:top-[94px] md:top-[108px] w-[4px] sm:w-[4px] md:w-[5px] h-[38px] sm:h-[46px] md:h-[52px] bg-gray-900 rounded-r-full z-20" />
        <div className="absolute left-[-8px] sm:left-[-10px] md:left-[-11px] top-[122px] sm:top-[146px] md:top-[168px] w-[4px] sm:w-[4px] md:w-[5px] h-[38px] sm:h-[46px] md:h-[52px] bg-gray-900 rounded-r-full z-20" />

        <div className="absolute inset-0 bg-gray-900">
          {project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
              <span className="text-foreground/20 text-7xl font-black select-none">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div
            className="absolute bottom-0 inset-x-0 pt-16 pb-5 px-4"
            style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.6) 55%, transparent 100%)" }}
          >
            <p className="text-foreground font-semibold text-xs sm:text-[13px] leading-tight font-headline line-clamp-1" title={title}>{title}</p>
            <div className={cn("flex flex-wrap gap-1 mt-1.5", isRtl ? "justify-end" : "justify-start")}>
              {project.tech.slice(0, 2).map(t => (
                <span key={t} className="text-[10px] text-foreground/75 bg-foreground/10 backdrop-blur-sm px-2 py-1 rounded-full border border-foreground/10">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute inset-0 bg-primary/10 z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          />
        </div>

        <div className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-[52px] h-[3px] bg-foreground/20 rounded-full z-20" />
      </motion.a>

      {/* GPU-composited depth shadow — opacity only, no box-shadow animation */}
      <div className="absolute inset-0 -z-10 rounded-[28px] sm:rounded-[35px] md:rounded-[42px] blur-2xl bg-black/25 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

function CoverflowCarousel({ projects, isRtl, translations }: {
  projects: PortfolioProject[];
  isRtl: boolean;
  translations: Translations;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  const goNext = useCallback(() => setActiveIndex(i => (i + 1) % total), [total]);
  const goPrev = useCallback(() => setActiveIndex(i => (i - 1 + total) % total), [total]);

  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -300) goNext();
    if (info.offset.x > 50 || info.velocity.x > 300) goPrev();
  }, [goNext, goPrev]);

  const active = projects[activeIndex];
  const title = isRtl ? active.nameAr : active.nameEn;
  const desc  = isRtl ? active.descriptionAr : active.descriptionEn;

  return (
    <div
      className="w-full outline-none"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
      }}
    >
      <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
        <button
          onClick={goPrev}
          className="absolute left-0 z-30 p-2 rounded-full bg-background/10 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-background/30 transition-colors cursor-pointer"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => {
            const offset = i - activeIndex;
            const isVisible = Math.abs(offset) <= 2;

            const xOffset = offset * (offset > 0 ? 110 : -110);
            const rotateY = offset * -25;
            const scaleVal = 1 - Math.abs(offset) * 0.18;
            const opacityVal = isVisible ? 1 - Math.abs(offset) * 0.35 : 0;
            const zIndex = 50 - Math.abs(offset) * 10;

            return (
              <motion.div
                key={project.id}
                className="absolute"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  x: xOffset,
                  rotateY: rotateY,
                  scale: Math.max(scaleVal, 0.3),
                  opacity: Math.max(opacityVal, 0),
                  zIndex: zIndex,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: Math.max(scaleVal, 0.3) * 1.03 }}
              >
                <TiltCard>
                  <PhoneFrame project={project} isRtl={isRtl} />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={goNext}
          className="absolute right-0 z-30 p-2 rounded-full bg-background/10 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-background/30 transition-colors cursor-pointer"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 text-center"
        >
          <h3 className="text-xl font-bold font-headline text-primary">{title}</h3>
          {desc && <p className="mt-1 text-sm text-muted-foreground max-w-lg mx-auto line-clamp-2">{desc}</p>}
          <div className={cn("flex justify-center gap-3 mt-3", isRtl && "flex-row-reverse")}>
            {active.liveUrl && (
              <Button asChild variant="default" size="sm">
                <a href={active.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 me-1.5" />
                  {translations.liveDemo}
                </a>
              </Button>
            )}
            {active.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={active.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3.5 h-3.5 me-1.5" />
                  GitHub
                </a>
              </Button>
            )}
          </div>

          <div className={cn("flex justify-center gap-1.5 mt-3", isRtl && "flex-row-reverse")}>
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? "bg-primary w-5" : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MoreProjectCard({
  project, index, isRtl, translations,
}: {
  project: PortfolioProject;
  index: number;
  isRtl: boolean;
  translations: Translations;
}) {
  const title = isRtl ? project.nameAr : project.nameEn;
  const desc  = isRtl ? project.descriptionAr : project.descriptionEn;
  const canHover = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-3 p-5 rounded-xl border border-border bg-background",
        "hover:border-primary/40 hover:shadow-md",
        "transition-colors duration-300",
        isRtl ? "text-right" : "text-left",
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={canHover.current ? { y: -6, scale: 1.01, transition: { type: "spring", stiffness: 300, damping: 18 } } : {}}
    >
      <h3 className="font-headline font-bold text-sm sm:text-[15px] text-primary leading-snug line-clamp-1" title={title}>{title}</h3>
      {desc && <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-2" title={desc}>{desc}</p>}
      <div className={cn("flex flex-wrap gap-1.5 mt-auto", isRtl ? "justify-end" : "justify-start")}>
        {project.tech.slice(0, 3).map(t => (
          <Badge key={t} variant="secondary" className="text-[10px] px-3 py-1 rounded-full">{t}</Badge>
        ))}
      </div>
      <div className={cn("flex gap-2 pt-1", isRtl ? "justify-end" : "justify-start")}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:text-accent transition-colors cursor-pointer">
            <ExternalLink className="w-3 h-3" />{translations.liveDemo}
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <Github className="w-3 h-3" />GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}

function PhoneSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="w-[140px] h-[302px] sm:w-[175px] sm:h-[378px] md:w-[195px] md:h-[420px] rounded-[28px] sm:rounded-[35px] md:rounded-[42px] bg-muted animate-pulse" />
      <div className="h-7 w-32 rounded-full bg-muted animate-pulse" />
    </motion.div>
  );
}

export function ProjectsSection() {
  const { language }  = useContext(LanguageContext);
  const translations  = language === 'ar' ? arTranslations.projects  : enTranslations.projects;
  const allProjectsT  = language === 'ar' ? arTranslations.allProjects : enTranslations.allProjects;
  const isRtl = language === 'ar';

  const [all, setAll]         = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: PortfolioProject[]) => setAll(data))
      .catch(() => setAll([]))
      .finally(() => setLoading(false));
  }, []);

  const phoneProjects = all.filter(p => p.imageUrl);
  const moreProjects  = all.filter(p => !p.imageUrl);

  const listKey = loading ? 'loading' : 'ready';

  return (
    <section id="projects" role="region" aria-label="Projects" className="py-20 sm:py-32 bg-secondary overflow-hidden scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>

        <div key={listKey} className="mt-16">
          {loading ? (
            <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 flex-wrap">
              {Array.from({ length: 3 }).map((_, i) => <PhoneSkeleton key={i} index={i} />)}
            </div>
          ) : phoneProjects.length > 0 ? (
            <CoverflowCarousel projects={phoneProjects} isRtl={isRtl} translations={translations} />
          ) : null}
        </div>

        {!loading && moreProjects.length > 0 && (
          <div className="mt-20">
            <motion.p
              className={cn("text-xs sm:text-[13px] font-medium tracking-widest uppercase text-accent mb-6", isRtl ? "text-right" : "text-left")}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {translations.moreProjects}
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {moreProjects.map((p, i) => (
                <MoreProjectCard
                  key={p.id} project={p} index={i}
                  isRtl={isRtl} translations={translations}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                {allProjectsT.viewAll}
                <ArrowRight className={cn("h-4 w-4", isRtl ? "mr-2 rotate-180" : "ml-2")} />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
