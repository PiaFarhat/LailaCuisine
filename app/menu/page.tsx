import type { Metadata } from "next";
import Menu from "../components/Menu";
import PageBanner from "../components/PageBanner";
import SpecialOrders from "../components/SpecialOrders";

export const metadata: Metadata = {
  title: "Menu | Laila Cuisine",
  description: "Lebanese mezze, grills, seafood, desserts, drinks, and special orders.",
};

export default function MenuPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Kitchen"
        title="A Menu Made for Sharing"
        description="Explore Lebanese mezze, warm dishes, family recipes, and flavors prepared for the whole table."
        backgroundImage="/images/food.png"
      />
      <Menu />
      <SpecialOrders />
    </>
  );
}
