import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative grid min-h-[100svh] place-items-center px-[clamp(1.25rem,7vw,6rem)] pt-[104px] pb-[clamp(5rem,8vw,8rem)] [scroll-margin-top:82px] max-md:min-h-[100svh] max-md:items-end max-md:px-[1.15rem] max-md:pt-[7.6rem] max-md:pb-16 max-[480px]:pt-[7.2rem]"
    >
      <Image
        src="/images/hero.png"
        alt="Hero"
        width={1600}
        height={900}
        priority
        className="fixed inset-0 z-[-5] h-[100svh] w-full object-cover object-center opacity-[0.34] max-md:absolute max-md:h-full max-md:object-[58%_center] max-md:opacity-100 max-[480px]:object-[62%_center]"
      />

      <div className="relative w-[min(760px,92vw)] overflow-hidden p-[clamp(2rem,5vw,4rem)] text-center max-md:w-[min(100%,34rem)] max-md:px-[1.15rem] max-md:py-[1.65rem] max-[480px]:w-full">
        <p className="eyebrow mb-4">Homemade Lebanese Restaurant</p>
        <h1 className="m-0 text-[clamp(3.4rem,10vw,8.5rem)] font-normal leading-[0.92] tracking-[0.14em] text-[var(--burgundy)] max-md:text-[clamp(2.75rem,15vw,4.8rem)] max-md:tracking-[0.07em]">
          Laila Cuisine
        </h1>
        <p className="mx-auto mt-[1.6rem] mb-[2.2rem] max-w-[520px] text-[rgba(43,33,24,0.84)] max-md:mt-[1.2rem] max-md:mb-6">
          Authentic Lebanese cuisine inspired by Zahle.
        </p>

        <a href="#menu">Explore Menu</a>
        <a href="#reservation">Reserve a Table</a>
      </div>
    </section>
  );
}
