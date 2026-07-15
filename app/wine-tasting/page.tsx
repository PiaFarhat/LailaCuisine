import type { Metadata } from "next";
import Image from "next/image";
import Container from "../components/Container";
import WineTastingForm from "../components/WineTastingForm";
import { wineTastingConfig } from "../config/wineTasting";

export const metadata: Metadata = {
  title: "Saturday Wine Tasting | Laila Cuisine",
  description:
    "Reserve a Saturday Lebanese wine tasting with seasonal mezze at Laila Cuisine.",
};

export default function WineTastingPage() {
  return (
    <>
      <section className="wine-hero section-space-lg relative isolate pt-[130px]">
        <div className="wine-hero__media" aria-hidden="true">
          <Image
            src="/images/wine tasting.png"
            alt=""
            fill
            sizes="(max-width: 768px) 82vw, 42vw"
            className="object-cover"
          />
        </div>
        <Container className="relative z-[2]">
          <div className="wine-hero__content">
            <p className="eyebrow">A Saturday Tradition</p>
            <h1>Wine, Mezze, and Evenings in Zahle</h1>
            <p>
              Join us every Saturday for a guided tasting of Lebanese wines
              accompanied by a seasonal buffet of mezze, cheeses, warm bites, and
              traditional flavors.
            </p>
          </div>
        </Container>
      </section>

      <section className="wine-details section-space relative isolate">
        <Container>
          <div className="wine-details__grid">
            {wineTastingConfig.details.map((detail) => (
              <article key={detail} className="wine-detail">
                <span aria-hidden="true" />
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="wine-buffet section-space relative isolate">
        <Container>
          <div className="wine-section-heading">
            <p className="eyebrow">Seasonal Buffet</p>
            <h2>The Tasting Table</h2>
            <p>
              An elegant tasting selection prepared for Lebanese wine, shared as a
              buffet-style table rather than a fixed menu.
            </p>
          </div>

          <div className="wine-buffet__grid">
            {wineTastingConfig.buffet.map((category) => (
              <article key={category.title} className="wine-buffet-card">
                <h3>{category.title}</h3>
                <ul>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="wine-buffet__note">{wineTastingConfig.buffetNote}</p>
        </Container>
      </section>

      <section className="wine-reserve section-space relative isolate">
        <Container>
          <div className="wine-reserve__layout">
            <div className="wine-reserve__copy">
              <p className="eyebrow">{wineTastingConfig.recurrenceText}</p>
              <h2>Reserve Your Tasting</h2>
              <p>
                Request seats for the Saturday wine tasting. Seating is limited,
                and the team will follow up using the contact details provided.
              </p>
              <ul>
                <li>{wineTastingConfig.reservationRequirement}</li>
                <li>{wineTastingConfig.seatingNote}</li>
                <li>Saturday dates only</li>
              </ul>
            </div>

            <WineTastingForm />
          </div>
        </Container>
      </section>
    </>
  );
}
