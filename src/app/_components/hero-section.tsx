import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative h-[80dvh] min-h-[500px] flex items-center justify-center text-center bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl md:text-6xl">
            Abdullah Abu Sghaira
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-accent font-headline">
            IT Specialist & Web Systems Developer
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            From Jordan, specializing in digital transformation and workflow automation. I build modern, efficient web systems for public-sector administration.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-background">
              <Link href="#projects">
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
