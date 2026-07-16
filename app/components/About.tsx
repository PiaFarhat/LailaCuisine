import Image from "next/image";
import Container from "./Container";

export default function About() {
  return (
    <section
      id="story"
      className="story-section relative py-[clamp(4rem,7vw,7rem)] [scroll-margin-top:82px]"
    >
      <Container className="story-grid relative z-[2]">
        <div className="story-panel relative overflow-hidden">
          <p className="eyebrow mb-4">Our Story</p>

          <h2 className="mb-6">
            A tribute to my grandmother, Laila, and the timeless hospitality of Zahle.
          </h2>

          <p>
            Laila Cuisine is named after my grandmother, whose table was always filled with
            family, friends, and homemade Lebanese dishes. Inspired by her warmth and the
            traditions of Zahle, we continue her legacy by serving food that brings people
            together.
          </p>
        </div>

        <Image
          src="/images/about.png"
          alt="Illustration inspired by Zahle wine and poetry statue"
          width={900}
          height={700}
          className="story-image story-image--about relative w-full"
        />
      </Container>
    </section>
  );
}
