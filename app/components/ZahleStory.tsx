import Image from "next/image";

export default function ZahleStory() {
  return (
    <section
      id="map"
      className="story-section relative py-[clamp(4.25rem,6.5vw,6.75rem)] [scroll-margin-top:82px] max-lg:py-[4.75rem] max-[480px]:py-[3.75rem]"
    >
      <div className="story-grid site-container relative z-[2]">
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

          <a href="#reservation">Plan Your Visit</a>
        </div>

        <Image
          src="/images/ladyofzahle.png"
          alt="lady of zahle"
          width={1200}
          height={800}
          className="story-image story-image--zahle relative w-full"
        />
      </div>
    </section>
  );
}
