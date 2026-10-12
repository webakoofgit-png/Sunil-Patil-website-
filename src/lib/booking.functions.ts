import { createServerFn } from "@tanstack/react-start";
import { bookingSchema } from "./booking-schema";

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingSchema.parse(d))
  .handler(async ({ data }) => {
    // Honeypot spam protection: bots fill the hidden field.
    if (data.website) return { ok: true };
    // Storage / email notification are not yet connected.
    console.log("[booking-enquiry]", { name: data.fullName, type: data.eventType, date: data.eventDate });
    return { ok: true };
  });
