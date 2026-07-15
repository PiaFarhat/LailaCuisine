import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function StoryPreview() {
  return (
    <section id="story-preview" className="story-section section-space relative">
      <Container className="story-grid relative z-[2]">
        <div className="story-panel relative overflow-hidden">
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="mb-6">
            A tribute to my grandmother, Laila, and the timeless hospitality of Zahle.
          </h2>
          <p>
            Laila Cuisine is named after my grandmother, whose table was always filled with
            family, friends, and homemade Lebanese dishes.
          </p>
          <Link className="route-cta" href="/story">
            Discover Our Story
          </Link>
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
