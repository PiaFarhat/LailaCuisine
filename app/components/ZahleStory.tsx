import Image from "next/image";

export default function ZahleStory() {
  return (
    <section
      id="map"
      className="relative grid min-h-screen grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-center gap-[clamp(2rem,5vw,5rem)] px-[clamp(1.25rem,7vw,6rem)] py-[clamp(5rem,8vw,8rem)] [scroll-margin-top:82px] max-lg:grid-cols-1 max-lg:py-[5.5rem] max-md:gap-0 max-md:px-0 max-[480px]:py-[4.5rem]"
    >
      <div className="relative z-[2] max-w-[650px] overflow-hidden p-[clamp(1.6rem,3vw,2.8rem)] max-md:mx-auto max-md:mt-[-3.5rem] max-md:w-[min(92%,40rem)] max-md:p-[1.45rem]">
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

        <a href="#reservation">Plan Your Visit</a>
      </div>

      <Image
        src="/images/ladyofzahle.png"
        alt="lady of zahle"
        width={1200}
        height={800}
        className="relative z-[2] h-[min(76vh,760px)] w-full rounded-[28px] border border-[rgba(198,161,91,0.52)] object-cover object-[center_top] shadow-[0_38px_95px_rgba(77,16,39,0.18)] max-lg:order-[-1] max-lg:h-[62vh] max-md:h-[64vh] max-md:min-h-[400px] max-md:rounded-none max-md:border-x-0 max-md:object-[50%_top] max-[480px]:h-[56vh] max-[480px]:min-h-[360px]"
      />
    </section>
  );
}
