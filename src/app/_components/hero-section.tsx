'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

export function HeroSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    // Hero section with video background
    <section id="hero" className="relative h-[80dvh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-video-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Reboot Hero Section.mp4" type="video/mp4" />
      </video>

      {/* Fallback background image */}
      <Image
        src="/hero-bg-fallback.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold font-headline tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-md">
            {translations.hero.name}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-accent font-headline drop-shadow-sm">
            {translations.hero.title}
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200 drop-shadow-sm">
            {translations.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="shadow-lg">
              <Link href="#contact">{translations.hero.contactButton}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-background/20 text-white border-white/30 hover:bg-background/40 backdrop-blur-sm">
              <a href="/CV.pdf" download="Abdullah_Abu_Sghaira_CV.pdf">
                <Download className="me-2 h-4 w-4" />
                {translations.header.downloadCvButton}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-background/20 text-white border-white/30 hover:bg-background/40 backdrop-blur-sm">
              <Link href="#projects">
                {translations.hero.workButton}
                <ArrowDown className="ms-2 h-4 w-4 animate-bounce" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
