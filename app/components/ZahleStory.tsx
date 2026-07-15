import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "../config/site";
import Container from "./Container";

export default function ZahleStory() {
  const reservationHref =
    navigationItems.find((item) => item.label === "Reservation")?.href ??
    "/reservation";

  return (
    <section
      id="zahle"
      className="story-section section-space relative [scroll-margin-top:82px]"
    >
      <Container className="story-grid relative z-[2]">
        <div className="story-panel relative overflow-hidden">
          <p className="eyebrow mb-4">The Journey</p>
          <h2 className="mb-6">From the vineyards of Zahle to Laila&apos;s table</h2>

          <p>
            Long before the first dish is served, the story begins in Zahle.
            Overlooking the city, Our Lady of Zahle stands as a quiet guardian while
            the Berdawni River winds through streets filled with laughter, family
            gatherings, and riverside tables. Inspired by these moments, Laila
            Cuisine was created to celebrate the generosity, traditions, and
            unforgettable flavors that have made Zahle the heart of Lebanese
            hospitality.
          </p>

          <Link href={reservationHref}>Plan Your Visit</Link>
        </div>

        <Image
          src="/images/ladyofzahle.png"
          alt="lady of zahle"
          width={1200}
          height={800}
          className="story-image story-image--zahle relative w-full"
        />
      </Container>
    </section>
  );
}
