import type { Metadata } from "next";
import Contact from "../components/Contact";
import PageBanner from "../components/PageBanner";

export const metadata: Metadata = {
  title: "Contact | Laila Cuisine",
  description: "Find Laila Cuisine in Zahle and get in touch for visits or reservations.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Visit Us"
        title="Find Laila Cuisine"
        description="Plan your visit, call our table, or reach out for Lebanese gatherings inspired by Zahle hospitality."
        image="/images/table.png"
        imageAlt="A prepared Lebanese restaurant table"
        backgroundPosition="center 58%"
      />
      <Contact />
    </>
  );
}
