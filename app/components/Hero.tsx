import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "../config/site";
import Container from "./Container";

export default function Hero() {
  const menuHref =
    navigationItems.find((item) => item.label === "Menu")?.href ?? "/menu";
  const reservationHref =
    navigationItems.find((item) => item.label === "Reservation")?.href ??
    "/reservation";

  return (
    <section
      id="home"
      className="relative grid min-h-[84svh] place-items-center pt-[92px] pb-[clamp(4rem,6vw,6rem)] [scroll-margin-top:82px] max-md:block max-md:min-h-0 max-md:pt-[66px] max-md:pb-12"
    >
      <Image
        src="/images/hero.png"
        alt="Hero"
        width={1600}
        height={900}
        priority
        className="fixed inset-0 z-[-5] h-[84svh] w-full object-cover object-center opacity-[0.3] max-md:relative max-md:inset-auto max-md:z-0 max-md:h-[min(58vh,430px)] max-md:min-h-[300px] max-md:object-[58%_center] max-md:opacity-100 max-[480px]:h-[360px] max-[480px]:min-h-0 max-[480px]:object-[62%_center]"
      />

      <Container className="relative max-md:z-[2] max-md:mt-[-2rem]">
        <div className="hero-panel relative mx-auto overflow-hidden p-[clamp(2rem,4vw,3.5rem)] text-center max-md:px-[1.15rem] max-md:py-[1.65rem]">
          <p className="eyebrow mb-4">Homemade Lebanese Restaurant</p>
          <h1 className="m-0 text-[clamp(3rem,7.5vw,6.4rem)] font-normal leading-[0.96] tracking-[0.12em] text-[var(--burgundy)] max-md:text-[clamp(2.65rem,12vw,4.15rem)] max-md:tracking-[0.035em]">
            Laila Cuisine
          </h1>
          <p className="mx-auto mt-[1.6rem] mb-[2.2rem] max-w-[520px] text-[rgba(43,33,24,0.84)] max-md:mt-[1.2rem] max-md:mb-6">
            Authentic Lebanese cuisine inspired by Zahle.
          </p>

          <Link href={menuHref}>Explore Menu</Link>
          <Link href={reservationHref}>Reserve a Table</Link>
        </div>
      </Container>
    </section>
  );
}
