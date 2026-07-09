 import Image from "next/image";
 export default function About() {
    return(
 <section id="about">
        <div>
  <p>Our Story</p>

  <h2>
    A tribute to my grandmother, Laila, and the timeless hospitality of Zahle.
  </h2>

  <p>
    Laila Cuisine is named after my grandmother, whose table was always filled with
    family, friends, and homemade Lebanese dishes. Inspired by her warmth and the
    traditions of Zahle, we continue her legacy by serving food that brings people
    together.
  </p>
</div>
        <Image
          src="/images/about.png"
          alt="Illustration inspired by Zahle wine and poetry statue"
          width={900}
          height={700}
        />
      </section>
    );
      }