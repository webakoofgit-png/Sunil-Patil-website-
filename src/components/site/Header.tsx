import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { btn } from "./ui";

const nav = [
  { to: "/", label: "Home" },
  { to: "/music", label: "Music & Performances" },
  { to: "/about-booking", label: "About" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "glass border-b border-border py-3" : "py-6")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="font-display text-lg font-bold tracking-[0.25em] uppercase">
          Sunil <span className="text-primary">Patil</span>
        </Link>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="text-sm text-foreground/75 transition-colors hover:text-primary data-[status=active]:text-primary">
              {n.label}
            </Link>
          ))}
          <Link to="/about-booking" hash="book" className={cn(btn.gold, "px-5 py-2.5")}>Book Now</Link>
        </nav>
        <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-wine-gradient fixed inset-0 top-0 -z-10 flex flex-col justify-center gap-6 px-8 lg:hidden"
          >
            {nav.map((n, i) => (
              <motion.div key={n.to} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 * i + 0.1 }}>
                <Link to={n.to} onClick={() => setOpen(false)} className="font-display text-4xl font-bold">
                  {n.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/about-booking" hash="book" onClick={() => setOpen(false)} className={cn(btn.gold, "mt-6 self-start")}>Book a Performance</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
