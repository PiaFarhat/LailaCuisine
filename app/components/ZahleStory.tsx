      import Image from "next/image";
      export default function ZahleStory() {
        return(
      <section id="map">
        <div>
          <p>The Journey</p>
          <h2>From the vineyards of Zahle to Laila&apos;s table</h2>

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
        />
      </section>
      );
      }