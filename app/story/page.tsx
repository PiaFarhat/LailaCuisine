import type { Metadata } from "next";
import About from "../components/About";
import PageBanner from "../components/PageBanner";
import ZahleStory from "../components/ZahleStory";

export const metadata: Metadata = {
  title: "Our Story | Laila Cuisine",
  description: "The family story and Zahle inspiration behind Laila Cuisine.",
};

export default function StoryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Story"
        title="From Zahle, With Love"
        description="A story shaped by family tables, Lebanese traditions, and the warm spirit of Zahle."
        backgroundImage="/images/ladyofzahle.png"
        backgroundPosition="left 62%"
      />
      <About />
      <ZahleStory />
    </>
  );
}
