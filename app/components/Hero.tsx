import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative grid min-h-[84svh] place-items-center pt-[92px] pb-[clamp(4rem,6vw,6rem)] [scroll-margin-top:82px] max-md:min-h-[100svh] max-md:items-end max-md:pt-[7.6rem] max-md:pb-16 max-[480px]:pt-[7.2rem]"
    >
      <Image
        src="/images/hero.png"
        alt="Hero"
        width={1600}
        height={900}
        priority
        className="fixed inset-0 z-[-5] h-[84svh] w-full object-cover object-center opacity-[0.3] max-md:absolute max-md:h-full max-md:object-[58%_center] max-md:opacity-100 max-[480px]:object-[62%_center]"
      />

      <div className="site-container relative">
        <div className="hero-panel relative mx-auto overflow-hidden p-[clamp(2rem,4vw,3.5rem)] text-center max-md:px-[1.15rem] max-md:py-[1.65rem]">
          <p className="eyebrow mb-4">Homemade Lebanese Restaurant</p>
          <h1 className="m-0 text-[clamp(3rem,7.5vw,6.4rem)] font-normal leading-[0.96] tracking-[0.12em] text-[var(--burgundy)] max-md:text-[clamp(2.75rem,15vw,4.8rem)] max-md:tracking-[0.07em]">
            Laila Cuisine
          </h1>
          <p className="mx-auto mt-[1.6rem] mb-[2.2rem] max-w-[520px] text-[rgba(43,33,24,0.84)] max-md:mt-[1.2rem] max-md:mb-6">
            Authentic Lebanese cuisine inspired by Zahle.
          </p>

          <a href="#menu">Explore Menu</a>
          <a href="#reservation">Reserve a Table</a>
        </div>
      </div>
    </section>
  );
}
