import { StaticImageData } from "next/image";

export type EventType =
  | "book-signing"
  | "book-launch"
  | "virtual-event"
  | "reading"
  | "interview"
  | "workshop"
  | "other";

export type EventStatus =
  | "upcoming"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  status: EventStatus;

  // Date and time
  startDate: Date;
  endDate?: Date; // Optional for single-time events
  timezone: string;

  // Location details
  location: {
    type: "in-person" | "virtual" | "hybrid";
    venue?: string; // Physical venue name
    address?: string; // Full address for in-person events
    city?: string;
    state?: string;
    country?: string;
    virtualUrl?: string; // Zoom, Teams, etc. link for virtual events
    virtualPlatform?: string; // 'Zoom', 'YouTube Live', 'Facebook Live', etc.
  };

  // Event details
  targetAudience?: string; // "Ages 8-13", "Parents and kids", "Educators", etc.
  maxAttendees?: number;
  currentAttendees?: number;
  ticketPrice?: number; // 0 for free events
  ticketUrl?: string; // Eventbrite, BookEvent, etc.

  // Content and media
  featuredImage?: StaticImageData;
  relatedBooks?: string[]; // Array of book slugs
  tags?: string[]; // ["horror", "middle-grade", "interactive", etc.]

  // Registration and contact
  requiresRegistration: boolean;
  registrationUrl?: string;
  contactEmail?: string;

  // Additional metadata
  createdAt: Date;
  updatedAt: Date;
  featured?: boolean; // Highlight important events
  notes?: string; // Admin notes, special instructions
}

// Helper function to create events with consistent structure
export const createEvent = (
  eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
): Event => {
  const now = new Date();
  return {
    ...eventData,
    id: `event-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };
};

// Sample events data for testing and initial content
const SAMPLE_EVENTS: Event[] = [
  createEvent({
    title: "The Haunted Locker Book Launch",
    description:
      "Join T.L. Griffith for the official launch of 'The Haunted Locker', the first book in the spine-tingling Scaremoor series. Meet the author, get your book signed, and enjoy spooky snacks!",
    eventType: "book-launch",
    status: "upcoming",
    startDate: new Date("2025-12-15T14:00:00"),
    endDate: new Date("2025-12-15T16:00:00"),
    timezone: "EST",
    location: {
      type: "in-person",
      venue: "Barnes & Noble Bookstore",
      address: "123 Main Street",
      city: "Salem",
      state: "MA",
      country: "USA",
    },
    targetAudience: "Ages 8-13 and their families",
    maxAttendees: 50,
    currentAttendees: 23,
    ticketPrice: 0,
    requiresRegistration: true,
    registrationUrl: "https://example.com/register-book-launch",
    relatedBooks: ["the-haunted-locker"],
    tags: ["book-launch", "signing", "family-friendly"],
    featured: true,
    contactEmail: "events@scaremoor.com",
  }),

  createEvent({
    title: "Virtual Reading: The Night of the Living Vines",
    description:
      "Experience the chills of Scaremoor from home! Join us for a virtual reading session where T.L. Griffith will read excerpts and answer questions about the latest book.",
    eventType: "reading",
    status: "upcoming",
    startDate: new Date("2025-12-08T19:00:00"),
    endDate: new Date("2025-12-08T20:00:00"),
    timezone: "EST",
    location: {
      type: "virtual",
      virtualUrl: "https://zoom.us/meeting/example",
      virtualPlatform: "Zoom",
    },
    targetAudience: "All ages welcome",
    maxAttendees: 100,
    currentAttendees: 67,
    ticketPrice: 0,
    requiresRegistration: true,
    registrationUrl: "https://example.com/register-virtual-reading",
    relatedBooks: ["the-night-of-the-living-vines"],
    tags: ["virtual", "reading", "interactive"],
    featured: false,
    contactEmail: "events@scaremoor.com",
  }),

  createEvent({
    title: "Horror Writing Workshop for Kids",
    description:
      "Learn how to write your own spooky stories! This interactive workshop will teach young writers the basics of crafting kid-friendly horror tales that thrill without nightmares.",
    eventType: "workshop",
    status: "upcoming",
    startDate: new Date("2025-12-22T10:00:00"),
    endDate: new Date("2025-12-22T12:00:00"),
    timezone: "EST",
    location: {
      type: "hybrid",
      venue: "Creekside Community Center",
      address: "456 Oak Avenue",
      city: "Willowbrook",
      state: "CT",
      country: "USA",
      virtualUrl: "https://zoom.us/meeting/workshop",
      virtualPlatform: "Zoom",
    },
    targetAudience: "Ages 10-16",
    maxAttendees: 20,
    currentAttendees: 8,
    ticketPrice: 25,
    ticketUrl: "https://eventbrite.com/horror-writing-workshop",
    requiresRegistration: true,
    registrationUrl: "https://eventbrite.com/horror-writing-workshop",
    tags: ["workshop", "writing", "educational", "creative"],
    featured: true,
    contactEmail: "workshops@scaremoor.com",
    notes:
      "Materials list will be sent to registered attendees 1 week before event",
  }),

  createEvent({
    title: "Midnight Book Signing at Spooky Stories Festival",
    description:
      "A special midnight book signing event at the annual Spooky Stories Festival. Perfect atmosphere for signing Scaremoor books under the moonlight!",
    eventType: "book-signing",
    status: "upcoming",
    startDate: new Date("2025-10-31T23:30:00"),
    endDate: new Date("2025-11-01T01:00:00"),
    timezone: "EST",
    location: {
      type: "in-person",
      venue: "Haunted Hills Festival Grounds",
      address: "789 Cemetery Road",
      city: "Sleepy Hollow",
      state: "NY",
      country: "USA",
    },
    targetAudience: "All ages (with parent supervision for late hour)",
    maxAttendees: 75,
    currentAttendees: 42,
    ticketPrice: 0,
    requiresRegistration: false,
    tags: ["book-signing", "festival", "halloween", "special-event"],
    featured: true,
    contactEmail: "events@scaremoor.com",
    notes:
      "Part of larger festival - attendees should purchase festival tickets separately",
  }),

  createEvent({
    title: "Podcast Interview: Behind the Scares",
    description:
      "T.L. Griffith will be interviewed on the popular 'Behind the Scares' podcast, discussing the inspiration behind Scaremoor and the art of writing horror for young readers.",
    eventType: "interview",
    status: "in-progress",
    startDate: new Date("2025-09-10T15:00:00"),
    endDate: new Date("2025-09-15T16:00:00"),
    timezone: "EST",
    location: {
      type: "virtual",
      virtualUrl: "https://example-podcast.com/listen-live",
      virtualPlatform: "Podcast Platform",
    },
    targetAudience: "General audience",
    requiresRegistration: false,
    tags: ["interview", "podcast", "media"],
    featured: false,
    contactEmail: "media@scaremoor.com",
  }),

  createEvent({
    title: "Interactive Scaremoor Trivia Night",
    description:
      "Test your knowledge of the Scaremoor universe! Join us for a fun-filled virtual trivia night featuring questions about characters, plot twists, and behind-the-scenes secrets. Prizes for winners!",
    eventType: "virtual-event",
    status: "upcoming",
    startDate: new Date("2025-12-20T20:00:00"),
    endDate: new Date("2025-12-20T21:30:00"),
    timezone: "EST",
    location: {
      type: "virtual",
      virtualUrl: "https://zoom.us/meeting/trivia",
      virtualPlatform: "Zoom",
    },
    targetAudience: "Scaremoor fans of all ages",
    maxAttendees: 200,
    currentAttendees: 89,
    ticketPrice: 0,
    requiresRegistration: true,
    registrationUrl: "https://example.com/register-trivia-night",
    relatedBooks: [
      "the-haunted-locker",
      "the-night-of-the-living-vines",
      "the-phantom-playground",
    ],
    tags: ["virtual-event", "trivia", "interactive", "fan-event"],
    featured: false,
    contactEmail: "events@scaremoor.com",
    notes: "Trivia questions will cover all published Scaremoor books",
  }),

  createEvent({
    title: "Scaremoor Fan Art Gallery Opening",
    description:
      "Celebrate the creativity of our amazing fan community! Join us for the opening of an art gallery showcasing fan artwork inspired by the Scaremoor series. Light refreshments and a special surprise from T.L. Griffith!",
    eventType: "other",
    status: "upcoming",
    startDate: new Date("2025-12-28T15:00:00"),
    endDate: new Date("2025-12-28T18:00:00"),
    timezone: "EST",
    location: {
      type: "in-person",
      venue: "Riverside Arts Center",
      address: "321 River Street",
      city: "Millfield",
      state: "MA",
      country: "USA",
    },
    targetAudience: "Fans, artists, families",
    maxAttendees: 150,
    currentAttendees: 72,
    ticketPrice: 0,
    requiresRegistration: true,
    registrationUrl: "https://example.com/register-fan-art-gallery",
    tags: ["fan-event", "art", "community", "gallery"],
    featured: true,
    contactEmail: "community@scaremoor.com",
    notes:
      "Featured artists will receive special recognition and Scaremoor merchandise",
  }),
];

export default SAMPLE_EVENTS;

// Utility functions for event management
export const getUpcomingEvents = (events: Event[] = SAMPLE_EVENTS): Event[] => {
  const now = new Date();
  return events
    .filter((event) => 
      (event.status === "upcoming" && event.startDate > now) ||
      (event.status === "in-progress")
    )
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export const getFeaturedEvents = (events: Event[] = SAMPLE_EVENTS): Event[] => {
  return events.filter(
    (event) => event.featured && (event.status === "upcoming" || event.status === "in-progress")
  );
};

export const getEventsByType = (
  eventType: EventType,
  events: Event[] = SAMPLE_EVENTS
): Event[] => {
  return events.filter((event) => event.eventType === eventType);
};

export const getVirtualEvents = (events: Event[] = SAMPLE_EVENTS): Event[] => {
  return events.filter(
    (event) =>
      event.location.type === "virtual" || event.location.type === "hybrid"
  );
};

export const getInPersonEvents = (events: Event[] = SAMPLE_EVENTS): Event[] => {
  return events.filter(
    (event) =>
      event.location.type === "in-person" || event.location.type === "hybrid"
  );
};

// Format event date for display
export const formatEventDate = (event: Event): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  };

  if (event.endDate) {
    const startTime = event.startDate.toLocaleString("en-US", options);
    const endTime = event.endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
    return `${startTime} - ${endTime}`;
  }

  return event.startDate.toLocaleString("en-US", options);
};

// Get location string for display
export const formatEventLocation = (event: Event): string => {
  const { location } = event;

  switch (location.type) {
    case "virtual":
      return `Virtual Event${location.virtualPlatform ? ` (${location.virtualPlatform})` : ""}`;

    case "hybrid":
      const venueInfo =
        location.venue && location.city
          ? `${location.venue}, ${location.city}${location.state ? `, ${location.state}` : ""}`
          : "Hybrid Event";
      return `${venueInfo} + Virtual${location.virtualPlatform ? ` (${location.virtualPlatform})` : ""}`;

    case "in-person":
    default:
      if (location.venue && location.city) {
        return `${location.venue}, ${location.city}${location.state ? `, ${location.state}` : ""}`;
      }
      if (location.city) {
        return `${location.city}${location.state ? `, ${location.state}` : ""}`;
      }
      return "In-Person Event";
  }
};
