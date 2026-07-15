export type NavigationItem = {
  label: string;
  href: string;
  sectionId?: string;
};

export type OpeningHour = {
  label: string;
  value: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Menu", href: "/menu" },
  { label: "Reservation", href: "/reservation" },
  { label: "Wine Tasting", href: "/wine-tasting" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export const siteConfig = {
  name: "Laila Cuisine",
  phoneDisplay: "+961 XX XXX XXX",
  phoneHref: "tel:+961XXXXXXXX",
  email: "hello@lailacuisine.com",
  emailHref: "mailto:hello@lailacuisine.com",
  instagramUrl: "https://instagram.com",
  mapsUrl: "https://maps.google.com",
  address: "Zahle, Lebanon",
  openingHours: [
    { label: "Monday - Sunday", value: "12:00 PM - 12:00 AM" },
  ] satisfies OpeningHour[],
};
