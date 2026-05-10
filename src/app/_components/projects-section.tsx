'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/lib/portfolio-data";

type Translations = typeof arTranslations.projects;

const tilts = [-4, 0, 4] as const;

// ─── Phone mockup ─────────────────────────────────────────────────────────────

function PhoneMockup({
  project, index, isRtl, translations,
}: {
  project: PortfolioProject;
  index: number;
  isRtl: boolean;
  translations: Translations;
}) {
  const tilt  = tilts[index % tilts.length];
  const title = isRtl ? project.nameAr : project.nameEn;
  const url   = project.liveUrl || project.githubUrl || "";

  return (
    <motion.div
      className="flex flex-col items-center gap-5"
      initial={{ opacity: 0, y: 70, rotate: tilt * 2.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
    >
      <motion.a
        href={url || undefined}
        target={url ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={cn(
          "group relative w-[195px] h-[420px] rounded-[42px] overflow-hidden",
          "border-[7px] border-[#0D1534]",
          "shadow-[0_24px_56px_rgba(13,21,52,0.28)]",
          url ? "cursor-pointer" : "cursor-default",
        )}
        whileHover={{ boxShadow: "0 36px 72px rgba(13,21,52,0.42)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[68px] h-[22px] bg-[#0D1534] rounded-b-[18px] z-20" />
        <div className="absolute right-[-11px] top-[90px]  w-[5px] h-[36px] bg-[#0D1534] rounded-l-full z-20" />
        <div className="absolute left-[-11px]  top-[72px]  w-[5px] h-[28px] bg-[#0D1534] rounded-r-full z-20" />
        <div className="absolute left-[-11px]  top-[108px] w-[5px] h-[52px] bg-[#0D1534] rounded-r-full z-20" />
        <div className="absolute left-[-11px]  top-[168px] w-[5px] h-[52px] bg-[#0D1534] rounded-r-full z-20" />

        <div className="absolute inset-0 bg-[#0D1534]">
          {project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#23499A] to-[#37A7B4]">
              <span className="text-white/20 text-7xl font-black select-none">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div
            className="absolute bottom-0 inset-x-0 pt-16 pb-5 px-4"
            style={{ background: "linear-gradient(to top, rgba(13,21,52,0.95) 0%, rgba(13,21,52,0.6) 55%, transparent 100%)" }}
          >
            <p className="text-white font-semibold text-[13px] leading-tight font-headline line-clamp-1">{title}</p>
            <div className={cn("flex flex-wrap gap-1 mt-1.5", isRtl ? "justify-end" : "justify-start")}>
              {project.tech.slice(0, 2).map(t => (
                <span key={t} className="text-[10px] text-white/75 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute inset-0 bg-[#23499A]/10 z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          />
        </div>

        <div className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-[52px] h-[3px] bg-white/20 rounded-full z-20" />
      </motion.a>

      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.14 + 0.5, duration: 0.35 }}
      >
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium
                       bg-[#23499A] text-white hover:bg-[#1a3880] transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
          >
            <ExternalLink className="w-3 h-3" />{translations.liveDemo}
          </motion.a>
        )}
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium
                       border border-[#D8DCE5] text-[#0D1534] hover:border-[#23499A] hover:text-[#23499A]
                       bg-background transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
          >
            <Github className="w-3 h-3" />GitHub
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── More project card ────────────────────────────────────────────────────────

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

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-3 p-5 rounded-xl border border-[#D8DCE5] bg-background",
        "hover:border-[#23499A]/40 hover:shadow-[0_8px_24px_rgba(13,21,52,0.08)]",
        "transition-colors duration-300",
        isRtl ? "text-right" : "text-left",
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="font-headline font-bold text-[15px] text-[#23499A] leading-snug line-clamp-1">{title}</h3>
      {desc && <p className="text-[13px] text-[#717886] leading-relaxed line-clamp-2">{desc}</p>}
      <div className={cn("flex flex-wrap gap-1.5 mt-auto", isRtl ? "justify-end" : "justify-start")}>
        {project.tech.slice(0, 3).map(t => (
          <Badge key={t} variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full">{t}</Badge>
        ))}
      </div>
      <div className={cn("flex gap-2 pt-1", isRtl ? "justify-end" : "justify-start")}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-[#23499A] hover:text-[#37A7B4] transition-colors cursor-pointer">
            <ExternalLink className="w-3 h-3" />{translations.liveDemo}
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-[#717886] hover:text-[#23499A] transition-colors cursor-pointer">
            <Github className="w-3 h-3" />GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function PhoneSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="w-[195px] h-[420px] rounded-[42px] bg-[#D8DCE5] animate-pulse" />
      <div className="h-7 w-32 rounded-full bg-[#D8DCE5] animate-pulse" />
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

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

  // تغيير الـ key عند انتهاء التحميل يجبر framer-motion على إعادة تشغيل الـ whileInView
  const listKey = loading ? 'loading' : 'ready';

  return (
    <section id="projects" className="py-20 sm:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>

        {/* Phone mockups */}
        <div key={listKey} className="mt-16 flex justify-center gap-8 sm:gap-12 flex-wrap">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <PhoneSkeleton key={i} index={i} />)
            : phoneProjects.slice(0, 3).map((p, i) => (
                <PhoneMockup
                  key={p.id} project={p} index={i}
                  isRtl={isRtl} translations={translations}
                />
              ))
          }
        </div>

        {/* More projects */}
        {!loading && moreProjects.length > 0 && (
          <div className="mt-20">
            <motion.p
              className={cn("text-[13px] font-medium tracking-widest uppercase text-[#37A7B4] mb-6", isRtl ? "text-right" : "text-left")}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {isRtl ? "مشاريع أخرى" : "More Projects"}
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {moreProjects.map((p, i) => (
                <MoreProjectCard
                  key={p.id} project={p} index={i}
                  isRtl={isRtl} translations={translations}
                />
              ))}
            </div>
          </div>
        )}

        {/* View all */}
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
