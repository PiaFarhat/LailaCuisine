import type { Metadata } from "next";
import PageBanner from "../components/PageBanner";
import Reservation from "../components/Reservation";

export const metadata: Metadata = {
  title: "Reservation | Laila Cuisine",
  description: "Reserve a table at Laila Cuisine.",
};

export default function ReservationPage() {
  return (
    <>
      <PageBanner
        eyebrow="Book Your Table"
        title="Reserve Your Evening"
        description="Plan a Lebanese table for family, friends, and pre-requested dishes."
        backgroundImage="/images/table.png"
        bottomFade="none"
        variant="reservation"
      />
      <Reservation />
    </>
  );
}
