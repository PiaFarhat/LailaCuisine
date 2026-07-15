import type { Metadata } from "next";
import Menu from "../components/Menu";
import SpecialOrders from "../components/SpecialOrders";

export const metadata: Metadata = {
  title: "Menu | Laila Cuisine",
  description: "Lebanese mezze, grills, seafood, desserts, drinks, and special orders.",
};

export default function MenuPage() {
  return (
    <>
      <Menu />
      <SpecialOrders />
    </>
  );
}
