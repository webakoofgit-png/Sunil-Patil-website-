import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, Mail, MapPin, MessageCircle, Mic2, Phone } from "lucide-react";
import hero from "@/assets/hero.jpg";
import studio from "@/assets/studio.jpg";
import { artist, performanceCategories, platforms } from "@/content/site";
import { Placeholder, Reveal, SectionHeading } from "@/components/site/ui";
import { BookingForm } from "@/components/site/BookingForm";

export const Route = createFileRoute("/about-booking")({
  head: () => ({
    meta: [
      { title: "About & Bookings — Sunil Patil" },
      { name: "description", content: "The story behind the voice, and how to book Sunil Patil for concerts, weddings, corporate and private events." },
      { property: "og:title", content: "About & Bookings — Sunil Patil" },
      { property: "og:description", content: "Book Sunil Patil for your next event." },
    ],
  }),
  component: AboutPage,
});

const journey = [
  { title: "Musical beginnings", text: "Early training, first influences and the foundation of Sunil's musical style." },
  { title: "Early performances", text: "The first live stages where confidence, presence and audience connection developed." },
  { title: "Career milestones", text: "Important performances and recognised moments will be added once confirmed." },
  { title: "Major events", text: "Concerts, private celebrations and festival appearances across varied audiences." },
  { title: "Releases & collaborations", text: "Original work, covers and collaborations will be listed with verified details." },
  { title: "The journey today", text: "A continuing body of live performances shaped by voice, emotion and devotion." },
];

const contactHighlights = [
  { title: "Booking Enquiries", text: "Use the enquiry form above to share your event date, venue and performance requirement.", Icon: CalendarDays },
  { title: "Performance Formats", text: "Live concerts, weddings, sangeet nights, private events, corporate evenings and cultural programmes.", Icon: Mic2 },
  { title: "Preferred Details", text: "Mention event type, city, audience size, timing and any specific song or theme requests.", Icon: MapPin },
  { title: "Response Window", text: "The team will review the enquiry and respond with availability and next steps.", Icon: Clock },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-36 md:grid-cols-2 md:px-8 md:pt-44">
        <Reveal>
          <p className="eyebrow mb-4">About Sunil Patil</p>
          <h1 className="text-5xl font-bold leading-[0.95] md:text-7xl">The Story <span className="block font-serif font-medium italic text-primary">Behind the Voice</span></h1>
          <p className="mt-8 max-w-lg leading-relaxed text-muted-foreground">{artist.bioShort}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <img src={hero} alt="Sunil Patil on stage" width={1920} height={1088} className="h-[360px] w-full rounded-3xl object-cover object-[55%_center] md:h-[500px] lg:h-[540px]" />
        </Reveal>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-border" />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading center eyebrow="Musical Journey" title="A Journey Through Music" />
          <ol className="mx-auto mt-14 max-w-4xl">
            {journey.map(({ title, text }, i) => (
              <Reveal key={title} delay={i * 0.04}>
                <li className="grid gap-5 border-t border-border py-7 sm:grid-cols-[96px_1fr]">
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-3xl leading-none text-primary/80">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-3 h-px flex-1 bg-primary/35" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[0.85fr_1.15fr]">
                    <h3 className="font-display text-xl font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-28 md:grid-cols-[1fr_1.2fr] md:px-8">
        <Reveal><img src={studio} alt="Studio microphone" loading="lazy" className="h-[340px] w-full rounded-3xl object-cover md:h-[460px] lg:h-[500px]" /></Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-4">Beyond the Stage</p>
          <blockquote className="font-serif text-3xl italic leading-snug md:text-4xl">“Music should be felt, not just heard.”</blockquote>
          <p className="mt-2 text-xs text-muted-foreground">Placeholder quote — replace with Sunil's own words.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {["Inspiration", "Artistic identity", "Performance philosophy", "Future aspirations"].map((t) => (
              <div key={t} className="border-t border-border pt-4"><p className="font-display font-bold">{t}</p><p className="mt-1 text-sm text-muted-foreground">To be written with the artist.</p></div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <SectionHeading eyebrow="Recognition" title="Achievements" />
        <Placeholder>Awards, notable performances and media appearances will be shown here once verified.</Placeholder>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <SectionHeading eyebrow="For Organisers & Media" title="Press Kit" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card/40 p-8 md:col-span-2">
            <h3 className="font-display text-xl font-bold">Short Bio</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{artist.bioShort}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card/40 p-8">
            <h3 className="font-display text-xl font-bold">Performs At</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{performanceCategories.map((c) => <li key={c}>— {c}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-24 bg-wine-gradient py-28">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading center eyebrow="Bookings" title={<>Bring Live Music to <span className="font-serif font-medium italic text-primary">Your Next Event</span></>} />
          <BookingForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHeading eyebrow="Contact" title="Get in Touch" />
        <div className="grid gap-4 sm:grid-cols-3">
          {artist.email && <a href={`mailto:${artist.email}`} className="flex items-center gap-3 rounded-2xl border border-border p-6 hover:border-primary"><Mail className="text-primary" />{artist.email}</a>}
          {artist.phone && <a href={`tel:${artist.phone}`} className="flex items-center gap-3 rounded-2xl border border-border p-6 hover:border-primary"><Phone className="text-primary" />{artist.phone}</a>}
          {artist.whatsapp && <a href={`https://wa.me/${artist.whatsapp}`} className="flex items-center gap-3 rounded-2xl border border-border p-6 hover:border-primary"><MessageCircle className="text-primary" />WhatsApp</a>}
          {platforms.map((p) => <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-border p-6 hover:border-primary">{p.name}</a>)}
        </div>
        {!artist.email && !artist.phone && (
          <div className="grid gap-5 md:grid-cols-2">
            {contactHighlights.map(({ title, text, Icon }) => (
              <div key={title} className="rounded-2xl border border-border bg-card/35 p-6 transition duration-300 hover:border-primary/45 hover:bg-card/55">
                <Icon className="mb-5 text-primary" size={26} strokeWidth={1.8} />
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
