import type { Metadata } from "next";
import Container from "../components/Container";
import PageBanner from "../components/PageBanner";
import WineTastingForm from "../components/WineTastingForm";
import { wineTastingConfig } from "../config/wineTasting";

export const metadata: Metadata = {
  title: "Saturday Wine Tasting | Laila Cuisine",
  description:
    "Reserve a Saturday Lebanese wine tasting with seasonal mezze at Laila Cuisine.",
};

export default function WineTastingPage() {
  const wineBulletClass =
    "relative pl-4 leading-[1.65] text-[rgba(43,21,18,0.74)] before:absolute before:left-0 before:top-[0.65em] before:h-[0.38rem] before:w-[0.38rem] before:rotate-45 before:bg-[var(--gold)]";

  return (
    <>
      <PageBanner
        eyebrow="A Saturday Tradition"
        title="Wine, Mezze, and Evenings in Zahle"
        description="Join us every Saturday for a guided tasting of Lebanese wines accompanied by seasonal mezze and traditional flavors."
        backgroundImage="/images/wine tasting.png"
        variant="wine"
      />

      <section className="wine-details relative isolate py-[clamp(4rem,7vw,7rem)]">
        <Container>
          <div className="flex gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-3 pr-[var(--content-gutter)] [scroll-padding-inline:var(--content-gutter)] [scroll-snap-type:x_proximity] md:grid md:grid-cols-2 md:gap-[clamp(0.8rem,1.6vw,1.2rem)] md:overflow-visible md:pb-0 md:pr-0 md:[scroll-snap-type:none] lg:grid-cols-3 xl:grid-cols-5">
            {wineTastingConfig.details.map((detail) => (
              <article
                key={detail}
                className="min-h-[132px] w-[82%] shrink-0 snap-start border border-[rgba(198,161,91,0.5)] bg-[linear-gradient(135deg,rgba(255,253,248,0.9),rgba(248,244,236,0.72)),radial-gradient(circle_at_top_left,rgba(198,161,91,0.16),transparent_34%)] p-[1.35rem] shadow-[0_18px_40px_rgba(77,16,39,0.08)] transition-[border-color,box-shadow,transform] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(198,161,91,0.7)] hover:shadow-[0_20px_44px_rgba(77,16,39,0.1)] motion-safe:hover:-translate-y-px sm:w-[46%] md:min-h-[150px] md:w-auto md:shrink"
              >
                <span
                  className="mb-4 block h-[0.64rem] w-[0.64rem] rotate-45 border border-[rgba(198,161,91,0.64)] bg-[rgba(198,161,91,0.16)]"
                  aria-hidden="true"
                />
                <p className="m-0 text-[0.82rem] font-bold uppercase leading-[1.6] tracking-[0.12em] text-[var(--burgundy)]">
                  {detail}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="wine-buffet relative isolate py-[clamp(4rem,7vw,7rem)]">
        <Container>
          <div className="mx-auto mb-[clamp(2rem,4vw,3.25rem)] max-w-[780px] text-center max-[480px]:text-left">
            <p className="eyebrow">Seasonal Buffet</p>
            <h2 className="m-0 mb-4 text-[clamp(2.45rem,5vw,4.8rem)] font-normal leading-none text-[var(--burgundy)]">
              The Tasting Table
            </h2>
            <p className="mx-auto mt-0 mb-0 max-w-[42rem] leading-[1.8] text-[rgba(43,21,18,0.72)]">
              An elegant tasting selection prepared for Lebanese wine, shared as a
              buffet-style table rather than a fixed menu.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[clamp(1rem,2vw,1.4rem)] max-md:grid-cols-1">
            {wineTastingConfig.buffet.map((category) => (
              <article
                key={category.title}
                className="border border-[rgba(198,161,91,0.54)] bg-[linear-gradient(135deg,rgba(255,253,248,0.94),rgba(248,244,236,0.78)),radial-gradient(circle_at_top_right,rgba(198,161,91,0.18),transparent_34%)] p-[clamp(1.25rem,2vw,1.8rem)] shadow-[0_22px_52px_rgba(77,16,39,0.1)]"
              >
                <h3 className="m-0 mb-4 text-[clamp(1.3rem,2vw,1.7rem)] font-normal text-[var(--burgundy)]">
                  {category.title}
                </h3>
                <ul className="m-0 grid list-none gap-[0.7rem] p-0">
                  {category.items.map((item) => (
                    <li key={item} className={wineBulletClass}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-[clamp(1.7rem,3vw,2.5rem)] max-w-[760px] text-center text-[0.95rem] leading-[1.7] text-[rgba(43,21,18,0.68)] max-[480px]:text-left">
            {wineTastingConfig.buffetNote}
          </p>
        </Container>
      </section>

      <section className="wine-reserve relative isolate py-[clamp(4rem,7vw,7rem)]">
        <Container>
          <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-[clamp(1.5rem,4vw,4rem)] max-md:grid-cols-1">
            <div className="sticky top-[104px] border-l border-[rgba(198,161,91,0.58)] p-[clamp(1.4rem,2.6vw,2rem)] max-md:relative max-md:top-auto">
              <p className="eyebrow">{wineTastingConfig.recurrenceText}</p>
              <h2 className="m-0 mb-[1.2rem] text-[clamp(2.3rem,4.5vw,4.4rem)] font-normal leading-none text-[var(--burgundy)]">
                Reserve Your Tasting
              </h2>
              <p className="m-0 mb-[1.3rem] leading-[1.8] text-[rgba(43,21,18,0.72)]">
                Request seats for the Saturday wine tasting. Seating is limited,
                and the team will follow up using the contact details provided.
              </p>
              <ul className="m-0 grid list-none gap-[0.7rem] p-0">
                <li className={wineBulletClass}>
                  {wineTastingConfig.reservationRequirement}
                </li>
                <li className={wineBulletClass}>{wineTastingConfig.seatingNote}</li>
                <li className={wineBulletClass}>Saturday dates only</li>
              </ul>
            </div>

            <WineTastingForm />
          </div>
        </Container>
      </section>
    </>
  );
}
