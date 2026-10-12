import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { platforms } from "@/content/site";
import { btn } from "./ui";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl font-bold tracking-[0.2em] uppercase">Sunil <span className="text-primary">Patil</span></p>
          <p className="mt-4 max-w-xs font-serif text-lg italic text-muted-foreground">A voice that connects. A performance that stays.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/music" className="hover:text-primary">Music & Performances</Link>
          <Link to="/about-booking" className="hover:text-primary">About & Bookings</Link>
          {platforms.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="hover:text-primary">{p.name}</a>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <Link to="/about-booking" hash="book" className={btn.gold}>Book Sunil Patil</Link>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary" aria-label="Back to top">
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Sunil Patil. All rights reserved.</div>
    </footer>
  );
}
