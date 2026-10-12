import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Play, Music2, CalendarDays } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import studio from "@/assets/studio.jpg";
import crowd from "@/assets/crowd.jpg";
import { artist, tracks, videos, shows, testimonials } from "@/content/site";
import { btn, Placeholder, Reveal, SectionHeading, Waveform } from "@/components/site/ui";
import { BookingCTA } from "@/components/site/BookingCTA";
import { VideoModal } from "@/components/site/VideoModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sunil Patil — Official Artist Website | Singer & Live Performer" },
      { name: "description", content: "A voice that connects. A performance that stays. Explore music, live performances and bookings for Sunil Patil." },
      { property: "og:title", content: "Sunil Patil — Official Artist Website" },
      { property: "og:description", content: "Singer and live performer. Explore music and book a performance." },
    ],
  }),
  component: Home,
});

function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 });
  const y = useSpring(useTransform(my, [-1, 1], [-10, 10]), { stiffness: 60, damping: 20 });
  const words = "SUNIL PATIL".split(" ");

  return (
    <section
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      onMouseMove={(e) => { mx.set((e.clientX / window.innerWidth) * 2 - 1); my.set((e.clientY / window.innerHeight) * 2 - 1); }}
    >
      <motion.div className="absolute inset-[-3%]" style={{ x, y }}>
        <img src={hero} alt="Sunil Patil performing on stage" width={1920} height={1088} className="animate-slowzoom h-full w-full object-cover object-[55%_center]" />
      </motion.div>
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="absolute left-1/2 top-1/3 h-[40vw] w-[40vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Official Artist Website</motion.p>
        <h1 className="mt-4 font-display text-[19vw] font-bold leading-[0.82] tracking-[-0.04em] md:text-[13vw]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span className={`block ${i === 1 ? "text-gold-gradient" : ""}`} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="max-w-md font-serif text-2xl italic text-foreground/90 md:text-3xl">{artist.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/music" className={btn.gold}>Explore Music</Link>
              <Link to="/about-booking" hash="book" className={btn.ghost}>Book a Performance</Link>
            </div>
          </div>
          <div className="glass hidden items-center gap-4 rounded-2xl border border-border p-4 md:flex">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Music2 className="h-5 w-5" /></div>
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Now Featuring</p><p className="text-sm font-semibold">New music — coming soon</p></div>
            <Waveform bars={14} className="h-8" />
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block" aria-hidden>
        <div className="flex h-10 w-6 justify-center rounded-full border border-foreground/40 pt-2"><span className="animate-scrolldot h-2 w-1 rounded-full bg-primary" /></div>
      </div>
    </section>
  );
}

function Home() {
  const [vid, setVid] = useState<string | null>(null);
  const featured = videos[0];
  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-28 md:grid-cols-2 md:px-8 md:py-36">
        <Reveal className="relative">
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-3xl border-l border-t border-primary/60" aria-hidden />
          <img src={studio} alt="Studio microphone" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-3xl object-cover" />
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-br-3xl border-b border-r border-primary/60" aria-hidden />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="eyebrow mb-4">The Artist</p>
          <h2 className="text-4xl font-bold leading-[1.02] md:text-6xl">Meet the <span className="font-serif font-medium italic text-primary">Voice</span> Behind the Music</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">{artist.bioShort}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {artist.genres.map((g) => <span key={g} className="rounded-full border border-border px-4 py-1.5 text-xs tracking-wide text-foreground/80">{g}</span>)}
          </div>
          <Link to="/about-booking" className={`${btn.ghost} mt-10`}>Discover My Journey</Link>
        </Reveal>
      </section>

      {/* Featured music */}
      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <SectionHeading eyebrow="Featured Music" title={<>The Sound of <span className="text-primary">Sunil Patil</span></>} />
        {tracks.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {tracks.slice(0, 3).map((t) => (
              <Reveal key={t.title} className="group rounded-3xl border border-border bg-card/50 p-5 transition hover:-translate-y-1 hover:border-primary/40">
                <h3 className="text-xl font-bold">{t.title}</h3><p className="text-sm text-muted-foreground">{t.genre}{t.year && ` · ${t.year}`}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={i * 0.1} className="group relative overflow-hidden rounded-3xl border border-border bg-card/50">
                <div className="bg-wine-gradient flex aspect-square items-center justify-center">
                  <Waveform bars={20} className="opacity-60 transition group-hover:opacity-100" />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Release {i + 1}</p><p className="mt-1 font-display text-lg font-bold">Coming soon</p></div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 text-primary"><Play className="h-4 w-4" /></span>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Live */}
      <section className="relative overflow-hidden">
        <img src={crowd} alt="Concert audience under golden stage lights" loading="lazy" width={1600} height={912} className="h-[80vh] min-h-[520px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <Reveal>
            <p className="eyebrow mb-4">Live Performance</p>
            <h2 className="text-5xl font-bold md:text-7xl">Where Music <span className="font-serif font-medium italic text-primary">Comes Alive</span></h2>
            <button
              onClick={() => featured && setVid(featured.youtubeId)}
              disabled={!featured}
              aria-label="Play performance video"
              className="group relative mx-auto mt-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-gold transition hover:scale-105 disabled:opacity-70"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
              <Play className="relative h-8 w-8 fill-current" />
            </button>
            <p className="mx-auto mt-8 max-w-md text-muted-foreground">{featured ? featured.description : "Performance videos will appear here soon."}</p>
            <Link to="/music" className={`${btn.ghost} mt-8`}>Watch More Performances</Link>
          </Reveal>
        </div>
      </section>

      {/* Shows */}
      <section className="mx-auto max-w-7xl px-5 py-28 md:px-8">
        <SectionHeading eyebrow="Upcoming Shows" title="Catch Me Live" />
        {shows.length ? (
          <div className="divide-y divide-border border-y border-border">
            {shows.map((s) => (
              <div key={s.name + s.date} className="grid items-center gap-4 py-6 md:grid-cols-[140px_1fr_auto]">
                <p className="font-display text-2xl text-primary">{s.date}</p>
                <div><p className="text-xl font-bold">{s.name}</p><p className="text-sm text-muted-foreground">{s.venue}, {s.city} · {s.category}</p></div>
                {s.ticketUrl && <a href={s.ticketUrl} className={btn.ghost}>Tickets</a>}
              </div>
            ))}
          </div>
        ) : (
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card/40 p-8 md:flex-row md:items-center md:p-12">
            <div className="flex items-center gap-5">
              <CalendarDays className="h-10 w-10 text-primary" />
              <div><p className="font-display text-2xl font-bold">New dates are being planned.</p><p className="text-muted-foreground">Want Sunil Patil at your venue or celebration?</p></div>
            </div>
            <Link to="/about-booking" hash="book" className={btn.gold}>Request a Date</Link>
          </Reveal>
        )}
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <SectionHeading eyebrow="Signature Moments" title={<span className="font-serif font-medium italic">Moments in light</span>} />
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { src: hero, t: "On Stage", c: "col-span-2 row-span-2" },
            { src: studio, t: "In the Studio", c: "row-span-2" },
            { src: crowd, t: "The Audience", c: "" },
            { src: crowd, t: "Concert Nights", c: "object-left" },
          ].map((g, i) => (
            <Reveal key={i} delay={i * 0.08} className={`group relative overflow-hidden rounded-2xl ${g.c}`}>
              <img src={g.src} alt={g.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-end bg-ink/0 p-5 transition group-hover:bg-ink/50">
                <p className="translate-y-4 font-display font-bold opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">{g.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Link to="/music" hash="gallery" className={`${btn.ghost} mt-10`}>Explore Gallery</Link>
      </section>

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 pb-28 text-center">
          <SectionHeading center eyebrow="Fan Love" title="Words From the Audience" />
          {testimonials.map((t) => (
            <blockquote key={t.name} className="mb-10"><p className="font-serif text-2xl italic">“{t.quote}”</p><footer className="mt-4 text-sm text-muted-foreground">{t.name} · {t.context}</footer></blockquote>
          ))}
        </section>
      )}

      <BookingCTA />
      <VideoModal id={vid} onClose={() => setVid(null)} />
    </>
  );
}
