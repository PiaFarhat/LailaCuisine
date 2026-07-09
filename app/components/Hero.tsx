import Image from "next/image";

export default function Hero() {
  return (
    <section id="home">
      <Image
        src="/images/hero.png"
        alt="Hero"
        width={1600}
        height={900}
        priority
      />

      <div>
        <p>Homemade Lebanese Restaurant</p>
        <h1>Laila Cuisine</h1>
        <p>Authentic Lebanese cuisine inspired by Zahle.</p>

        <a href="#menu">Explore Menu</a>
        <a href="#reservation">Reserve a Table</a>
      </div>
    </section>
  );
}