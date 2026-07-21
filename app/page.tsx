import type { Metadata } from "next";
import GatheringBanner from "./components/GatheringBanner";
import Hero from "./components/Hero";
import MenuPreview from "./components/MenuPreview";
import ReservationPreview from "./components/ReservationPreview";
import StoryPreview from "./components/StoryPreview";

export const metadata: Metadata = {
  title: "Laila Cuisine",
  description: "Authentic Lebanese cuisine inspired by Zahle.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <StoryPreview />
      <MenuPreview />
      <GatheringBanner />
      <ReservationPreview />
    </>
  );
}
