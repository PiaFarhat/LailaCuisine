import type { Metadata } from "next";
import About from "../components/About";
import Container from "../components/Container";
import ZahleStory from "../components/ZahleStory";

export const metadata: Metadata = {
  title: "Our Story | Laila Cuisine",
  description: "The family story and Zahle inspiration behind Laila Cuisine.",
};

export default function StoryPage() {
  return (
    <>
      <section className="page-intro section-space relative pt-[120px] text-center">
        <Container className="relative z-[2]">
          <p className="eyebrow mb-4">Our Story</p>
          <h1>Our Story</h1>
        </Container>
      </section>
      <About />
      <ZahleStory />
    </>
  );
}
