import { siteConfig } from "./site";

export type BuffetCategory = {
  title: string;
  items: string[];
};

export const wineTastingConfig = {
  eventName: "Saturday Wine at Laila's",
  route: "/wine-tasting",
  recurrenceText: "Every Saturday, 6 PM - 12 AM",
  reservationRequirement: "Reservation required",
  seatingNote: "Limited seating",
  maxGuests: 8,
  contactEmail: siteConfig.email,
  contactEmailHref: siteConfig.emailHref,
  details: [
    "Every Saturday, 6 PM - 12 AM",
    "Reservation required",
    "Limited seating",
    "Lebanese wine tasting",
    "Seasonal Lebanese mezze buffet",
  ],
  buffetNote: "The buffet may change seasonally according to availability.",
  buffet: [
    {
      title: "Cold Mezze",
      items: [
        "Labneh balls with olive oil and zaatar",
        "Shanklish with tomatoes, onions, and herbs",
        "Stuffed grape leaves",
        "Muhammara",
        "Hummus",
        "Moutabbal",
      ],
    },
    {
      title: "Cheese and Warm Bites",
      items: [
        "Grilled halloumi",
        "Cheese rakakat",
        "Mini kibbeh",
        "Mini zaatar and cheese manakish",
      ],
    },
    {
      title: "Accompaniments",
      items: [
        "Lebanese olives",
        "Walnuts and almonds",
        "Dried figs and apricots",
        "Fresh grapes",
        "Seasonal fruit",
        "Small Lebanese sweets",
      ],
    },
  ] satisfies BuffetCategory[],
};
