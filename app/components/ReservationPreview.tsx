import Link from "next/link";
import Container from "./Container";

export default function ReservationPreview() {
  return (
    <section
      id="reservation-preview"
      className="reservation-banner"
      aria-labelledby="reservation-banner-title"
    >
      <div className="reservation-banner__media" aria-hidden="true" />

      <Container className="relative z-[2]">
        <div className="reservation-banner__content">
          <p className="reservation-banner__eyebrow">Book Your Table</p>
          <h2 id="reservation-banner-title" className="reservation-banner__title">
            Reserve Your Evening
          </h2>
          <p className="reservation-banner__text">
            Plan a Lebanese table for family, friends, and pre-requested dishes.
          </p>
          <Link className="route-cta reservation-banner__cta" href="/reservation">
            Reserve a Table
          </Link>
        </div>
      </Container>
    </section>
  );
}
