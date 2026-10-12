import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { artist } from "@/content/site";
import { btn, Reveal, Waveform } from "./ui";

export function BookingCTA({ title = "Let's Create an Unforgettable Musical Experience", button = "Book Sunil Patil" }: { title?: string; button?: string }) {
  const wa = `https://wa.me/${artist.whatsapp}?text=${encodeURIComponent("Hello! I'd like to book Sunil Patil for an event.")}`;
  return (
    <section className="bg-wine-gradient grain relative overflow-hidden py-28 md:py-36">
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <Waveform className="mx-auto mb-8 justify-center" />
          <h2 className="font-serif text-4xl font-medium italic leading-tight md:text-6xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">Bring the energy, emotion, and magic of live music to your next event.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/about-booking" hash="book" className={btn.gold}>{button}</Link>
            {artist.whatsapp && <a href={wa} target="_blank" rel="noreferrer" className={btn.ghost}><MessageCircle className="h-4 w-4" /> Connect on WhatsApp</a>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
