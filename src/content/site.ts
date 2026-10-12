/**
 * SAMPLE / PLACEHOLDER CONTENT
 * Nothing in this file is confirmed artist information. Replace each value
 * with verified details from Sunil Patil before publishing.
 * Empty arrays intentionally hide sections (no fake songs, events, reviews).
 */
export const artist = {
  name: "Sunil Patil",
  tagline: "A Voice That Connects. A Performance That Stays.",
  bioShort:
    "Sunil Patil is a singer and live performer whose voice carries warmth, devotion and a quiet intensity. From intimate gatherings to festival stages, every performance is built around one idea — that music should be felt, not just heard. (Placeholder biography — to be replaced with verified details.)",
  genres: ["Bollywood", "Marathi", "Ghazal", "Sufi", "Unplugged", "Live Concerts"],
  // Fill in verified contact details; empty strings hide the related buttons.
  email: "",
  phone: "",
  whatsapp: "", // digits only with country code, e.g. 919800000000
};

export type Track = { title: string; genre: string; category: "Original Songs" | "Covers" | "Live Performances"; year?: string; youtube?: string; spotify?: string; cover?: string };
export const tracks: Track[] = []; // add verified releases only

export type Video = { title: string; youtubeId: string; description?: string };
export const videos: Video[] = []; // add official YouTube video IDs

export type Show = { date: string; name: string; city: string; venue: string; category: string; ticketUrl?: string };
export const shows: Show[] = []; // confirmed events only

export type Testimonial = { quote: string; name: string; context: string };
export const testimonials: Testimonial[] = []; // genuine reviews only

export type Platform = { name: string; url: string };
export const platforms: Platform[] = []; // verified official profiles only

export const eventTypes = ["Live Concert", "Wedding / Sangeet", "Corporate Event", "Private Event", "Cultural Event", "Festival", "Other"] as const;

export const performanceCategories = ["Live Concerts", "Weddings & Sangeet", "Corporate Evenings", "Cultural Festivals", "Private Celebrations", "Unplugged Sets"];
