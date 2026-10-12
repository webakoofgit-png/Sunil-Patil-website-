import { z } from "zod";
import { eventTypes } from "@/content/site";

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  mobile: z.string().trim().regex(/^[+\d][\d\s-]{7,16}$/, "Enter a valid mobile number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  eventType: z.enum(eventTypes, { errorMap: () => ({ message: "Choose an event type" }) }),
  eventDate: z.string().min(1, "Choose a date"),
  eventLocation: z.string().trim().min(2, "Enter the location").max(200),
  audienceSize: z.string().max(20).optional(),
  requirements: z.string().max(1000).optional(),
  message: z.string().max(2000).optional(),
  website: z.string().max(200).optional(),
});
export type BookingInput = z.infer<typeof bookingSchema>;
