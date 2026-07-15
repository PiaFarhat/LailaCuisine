import Image from "next/image";
import Link from "next/link";
import { wineTastingConfig } from "../config/wineTasting";
import Container from "./Container";

export default function GatheringBanner() {
  return (
    <section className="gathering-banner" aria-labelledby="gathering-banner-title">
      <div className="gathering-banner__image" aria-hidden="true">
        <Image
          src="/images/wine table.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="gathering-banner__media" aria-hidden="true" />

      <Container className="relative z-[3]">
        <div className="gathering-banner__content">
          <p className="gathering-banner__eyebrow">Every Saturday in Zahle</p>
          <h2 id="gathering-banner-title" className="gathering-banner__title">
            Saturday Wine at Laila&apos;s
          </h2>
          <p className="gathering-banner__text">
            A guided evening of Lebanese wine, seasonal mezze, and warm hospitality
            inspired by Zahle&apos;s vineyards.
          </p>
          <p className="gathering-banner__meta">
            Every Saturday · Limited seating · Reservation required
          </p>
          <Link className="route-cta gathering-banner__cta" href={wineTastingConfig.route}>
            Reserve Your Tasting
          </Link>
        </div>
      </Container>
    </section>
  );
}
