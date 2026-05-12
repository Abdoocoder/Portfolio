'use client';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionHeading({ children, className }: SectionHeadingProps) {
  const centered = className?.includes("text-center");
  return (
    <div className={cn("relative", centered && "text-center")}>
      <motion.h2
        className={cn("text-3xl font-bold font-headline text-primary sm:text-4xl", className)}
        style={{ letterSpacing: '-0.01em', lineHeight: 1.15 }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.h2>
      <motion.div
        className={cn(
          "h-1 w-16 mt-3 rounded-full bg-gradient-to-r from-primary to-accent",
          centered && "mx-auto"
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: centered ? "center" : "left" }}
      />
    </div>
  );
}
