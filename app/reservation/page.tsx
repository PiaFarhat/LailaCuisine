import type { Metadata } from "next";
import Reservation from "../components/Reservation";

export const metadata: Metadata = {
  title: "Reservation | Laila Cuisine",
  description: "Reserve a table at Laila Cuisine.",
};

export default function ReservationPage() {
  return <Reservation />;
}
