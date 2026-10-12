import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Waveform({ bars = 28, className }: { bars?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-10 items-center gap-[3px]", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="animate-wave block h-full w-[2px] rounded-full bg-primary/70"
          style={{ animationDelay: `${(i * 97) % 1200}ms`, animationDuration: `${900 + ((i * 53) % 700)}ms` }}
        />
      ))}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, serif, className, center }: { eyebrow?: string; title: ReactNode; serif?: boolean; className?: string; center?: boolean }) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl", center && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className={cn("text-4xl leading-[1.02] md:text-6xl", serif ? "font-serif font-medium italic" : "font-bold")}>{title}</h2>
    </Reveal>
  );
}

const btnBase = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60";
export const btn = {
  gold: cn(btnBase, "bg-primary text-primary-foreground hover:shadow-gold hover:-translate-y-0.5"),
  ghost: cn(btnBase, "border border-foreground/25 text-foreground hover:border-primary hover:text-primary"),
};

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-primary/30 bg-card/40 p-8 text-center text-sm text-muted-foreground">{children}</div>
  );
}
