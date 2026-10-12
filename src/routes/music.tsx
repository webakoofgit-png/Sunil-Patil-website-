import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import hero from "@/assets/hero.jpg";
import studio from "@/assets/studio.jpg";
import crowd from "@/assets/crowd.jpg";
import { tracks, videos, platforms } from "@/content/site";
import { Placeholder, Reveal, SectionHeading, Waveform } from "@/components/site/ui";
import { BookingCTA } from "@/components/site/BookingCTA";
import { VideoModal } from "@/components/site/VideoModal";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music & Performances — Sunil Patil" },
      { name: "description", content: "Explore the music, live performance videos and photo gallery of singer Sunil Patil." },
      { property: "og:title", content: "Music & Performances — Sunil Patil" },
      { property: "og:description", content: "Feel every note. Music, videos and moments from Sunil Patil." },
    ],
  }),
  component: MusicPage,
});

const gallery = [
  { src: hero, cat: "Live Shows", caption: "Under the spotlight" },
  { src: studio, cat: "Studio Sessions", caption: "Where songs begin" },
  { src: crowd, cat: "Live Shows", caption: "A sea of hands" },
  { src: studio, cat: "Behind the Scenes", caption: "Before the take" },
  { src: hero, cat: "Portraits", caption: "Stage portrait" },
  { src: crowd, cat: "Behind the Scenes", caption: "Soundcheck lights" },
];
const cats = ["All", "Live Shows", "Studio Sessions", "Behind the Scenes", "Portraits"];

function MusicPage() {
  const [filter, setFilter] = useState("All");
  const [cat, setCat] = useState("All");
  const [vid, setVid] = useState<string | null>(null);
  const [lb, setLb] = useState<number | null>(null);
  const trackCats = useMemo(() => ["All", ...new Set(tracks.map((t) => t.category))], []);
  const shownTracks = tracks.filter((t) => filter === "All" || t.category === filter);
  const shownImgs = gallery.filter((g) => cat === "All" || g.cat === cat);

  useEffect(() => {
    if (lb === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb((i) => ((i ?? 0) + 1) % shownImgs.length);
      if (e.key === "ArrowLeft") setLb((i) => ((i ?? 0) - 1 + shownImgs.length) % shownImgs.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lb, shownImgs.length]);

  return (
    <>
      <section className="bg-wine-gradient grain relative flex min-h-[80svh] items-end overflow-hidden pb-20 pt-40">
        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="eyebrow mb-4">Music & Performances</p>
            <h1 className="text-6xl font-bold leading-[0.9] md:text-[9rem]">Feel Every <span className="font-serif font-medium italic text-gold-gradient">Note.</span></h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">Explore the music, moments, and performances of Sunil Patil.</p>
            <Waveform bars={60} className="mt-12 h-16 w-full max-w-3xl" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28 md:px-8">
        <SectionHeading eyebrow="Featured Releases" title="The Catalogue" />
        {tracks.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {trackCats.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`rounded-full border px-5 py-2 text-sm transition ${filter === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{c}</button>
            ))}
          </div>
        )}
        {shownTracks.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shownTracks.map((t) => (
              <div key={t.title} className="rounded-3xl border border-border bg-card/50 p-6">
                <h3 className="text-xl font-bold">{t.title}</h3><p className="text-sm text-muted-foreground">{t.genre}</p>
                <div className="mt-4 flex gap-4 text-sm text-primary">{t.youtube && <a href={t.youtube} target="_blank" rel="noreferrer">YouTube</a>}{t.spotify && <a href={t.spotify} target="_blank" rel="noreferrer">Spotify</a>}</div>
              </div>
            ))}
          </div>
        ) : (
          <Placeholder>Official releases will be listed here once they're shared. Only verified songs will appear.</Placeholder>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <SectionHeading eyebrow="Videos" title={<>Live on <span className="font-serif font-medium italic text-primary">Stage</span></>} />
        {videos.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {videos.map((v, i) => (
              <button key={v.youtubeId} onClick={() => setVid(v.youtubeId)} className={`group relative overflow-hidden rounded-2xl text-left ${i === 0 ? "md:col-span-3" : ""}`}>
                <img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt={v.title} loading="lazy" className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/90 to-transparent p-5">
                  <p className="font-display font-bold">{v.title}</p><Play className="h-8 w-8 text-primary" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl">
            <img src={crowd} alt="Live concert" loading="lazy" className="aspect-[21/9] w-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center text-center"><p className="max-w-sm px-6 font-serif text-2xl italic">Performance videos are on their way.</p></div>
          </div>
        )}
      </section>

      <section id="gallery" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-28 md:px-8">
        <SectionHeading eyebrow="Photo Gallery" title="Moments" />
        <div className="mb-8 flex snap-x gap-2 overflow-x-auto pb-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-5 py-2 text-sm transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{c}</button>
          ))}
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {shownImgs.map((g, i) => (
            <button key={i} onClick={() => setLb(i)} className="group relative mb-4 block w-full overflow-hidden rounded-2xl">
              <img src={g.src} alt={g.caption} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i % 2 ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
              <span className="absolute bottom-4 left-4 text-sm font-semibold opacity-0 transition group-hover:opacity-100">{g.caption}</span>
            </button>
          ))}
        </div>
      </section>

      {lb !== null && shownImgs[lb] && (
        <div role="dialog" aria-modal className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4" onClick={() => setLb(null)}
          onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset["x"] = String(e.touches[0]?.clientX ?? 0); }}
          onTouchEnd={(e) => { const dx = (e.changedTouches[0]?.clientX ?? 0) - Number((e.currentTarget as HTMLElement).dataset["x"]); if (Math.abs(dx) > 50) setLb((lb + (dx < 0 ? 1 : -1) + shownImgs.length) % shownImgs.length); }}>
          <button aria-label="Close" className="absolute right-6 top-6"><X className="h-8 w-8" /></button>
          <button aria-label="Previous" className="absolute left-4 hidden md:block" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + shownImgs.length) % shownImgs.length); }}><ChevronLeft className="h-10 w-10" /></button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl">
            <img src={shownImgs[lb].src} alt={shownImgs[lb].caption} className="max-h-[80vh] rounded-xl object-contain" />
            <figcaption className="mt-4 text-center text-muted-foreground">{shownImgs[lb].caption}</figcaption>
          </figure>
          <button aria-label="Next" className="absolute right-4 hidden md:block" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % shownImgs.length); }}><ChevronRight className="h-10 w-10" /></button>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <SectionHeading eyebrow="Streaming" title="Listen Wherever You Are" />
        {platforms.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {platforms.map((p) => <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-border p-6 font-display font-bold transition hover:border-primary hover:text-primary">{p.name}</a>)}
          </div>
        ) : (
          <Placeholder>Official YouTube, Spotify, Apple Music, JioSaavn and Instagram profiles will be linked here once verified.</Placeholder>
        )}
      </section>

      <BookingCTA title="Want This Voice at Your Event?" button="Book a Live Performance" />
      <VideoModal id={vid} onClose={() => setVid(null)} />
    </>
  );
}
