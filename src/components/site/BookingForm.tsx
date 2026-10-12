import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { artist, eventTypes } from "@/content/site";
import { bookingSchema, type BookingInput } from "@/lib/booking-schema";
import { submitBooking } from "@/lib/booking.functions";
import { btn } from "./ui";

const field = "w-full rounded-xl border border-input bg-ink/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const label = "mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<BookingInput>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (data: BookingInput) => {
    try {
      await submitBooking({ data });
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const v = watch();
  const waText = encodeURIComponent(
    `Hello Sunil Patil team, I'd like to enquire about a performance.\nName: ${v.fullName || ""}\nEvent: ${v.eventType || ""}\nDate: ${v.eventDate || ""}\nLocation: ${v.eventLocation || ""}`,
  );
  const waHref = artist.whatsapp ? `https://wa.me/${artist.whatsapp}?text=${waText}` : `https://wa.me/?text=${waText}`;

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-primary/30 bg-card/60 p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-2xl font-bold">Thank you — enquiry received.</h3>
        <p className="mt-2 text-muted-foreground">The team will get back to you shortly.</p>
        <button className={`${btn.ghost} mt-6`} onClick={() => setStatus("idle")}>Send another enquiry</button>
      </div>
    );
  }

  const Err = ({ k }: { k: keyof BookingInput }) => (errors[k] ? <p className="mt-1.5 text-xs text-destructive">{errors[k]?.message as string}</p> : null);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 rounded-3xl border border-border bg-card/50 p-6 md:grid-cols-2 md:p-10">
      <div><label className={label} htmlFor="fullName">Full Name</label><input id="fullName" className={field} {...register("fullName")} /><Err k="fullName" /></div>
      <div><label className={label} htmlFor="mobile">Mobile Number</label><input id="mobile" type="tel" className={field} {...register("mobile")} /><Err k="mobile" /></div>
      <div><label className={label} htmlFor="email">Email Address</label><input id="email" type="email" className={field} {...register("email")} /><Err k="email" /></div>
      <div>
        <label className={label} htmlFor="eventType">Event Type</label>
        <select id="eventType" className={field} defaultValue="" {...register("eventType")}>
          <option value="" disabled>Select…</option>
          {eventTypes.map((t) => <option key={t}>{t}</option>)}
        </select><Err k="eventType" />
      </div>
      <div><label className={label} htmlFor="eventDate">Event Date</label><input id="eventDate" type="date" className={field} {...register("eventDate")} /><Err k="eventDate" /></div>
      <div><label className={label} htmlFor="eventLocation">Event Location</label><input id="eventLocation" className={field} {...register("eventLocation")} /><Err k="eventLocation" /></div>
      <div className="md:col-span-2"><label className={label} htmlFor="audienceSize">Expected Audience Size (optional)</label><input id="audienceSize" className={field} {...register("audienceSize")} /></div>
      <div className="md:col-span-2"><label className={label} htmlFor="requirements">Performance Requirements</label><textarea id="requirements" rows={3} className={field} {...register("requirements")} /></div>
      <div className="md:col-span-2"><label className={label} htmlFor="message">Additional Message</label><textarea id="message" rows={3} className={field} {...register("message")} /></div>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />
      {status === "error" && <p className="text-sm text-destructive md:col-span-2">Something went wrong. Please try again or reach out on WhatsApp.</p>}
      <div className="flex flex-wrap gap-3 md:col-span-2">
        <button type="submit" disabled={isSubmitting} className={btn.gold}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} Send Enquiry
        </button>
        <a href={waHref} target="_blank" rel="noreferrer" className={btn.ghost}><MessageCircle className="h-4 w-4" /> Enquire on WhatsApp</a>
      </div>
    </form>
  );
}
