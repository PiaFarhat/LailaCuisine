import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="story-section relative py-[clamp(4.25rem,6.5vw,6.75rem)] [scroll-margin-top:82px] max-lg:py-[4.75rem] max-[480px]:py-[3.75rem]"
    >
      <div className="story-grid site-container relative z-[2]">
        <div className="story-panel relative overflow-hidden">
          <p className="eyebrow mb-4">Our Story</p>

          <h2 className="mb-6">
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
          className="story-image story-image--about relative w-full"
        />
      </div>
    </section>
  );
}
