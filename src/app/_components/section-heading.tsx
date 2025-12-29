import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 className={cn("text-3xl font-bold font-headline tracking-tight text-primary sm:text-4xl", className)}>
      {children}
    </h2>
  );
}
