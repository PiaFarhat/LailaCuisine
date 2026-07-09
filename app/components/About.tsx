import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative grid min-h-screen grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-center gap-[clamp(2rem,5vw,5rem)] px-[clamp(1.25rem,7vw,6rem)] py-[clamp(5rem,8vw,8rem)] [scroll-margin-top:82px] max-lg:grid-cols-1 max-lg:py-[5.5rem] max-md:gap-0 max-md:px-0 max-[480px]:py-[4.5rem]"
    >
      <div className="relative z-[2] max-w-[650px] overflow-hidden p-[clamp(1.6rem,3vw,2.8rem)] max-md:mx-auto max-md:mt-[-3.5rem] max-md:w-[min(92%,40rem)] max-md:p-[1.45rem]">
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
        className="relative z-[2] h-[min(76vh,760px)] w-full rounded-[28px] border border-[rgba(198,161,91,0.52)] object-cover object-center shadow-[0_38px_95px_rgba(77,16,39,0.18)] max-lg:order-[-1] max-lg:h-[62vh] max-md:h-[64vh] max-md:min-h-[400px] max-md:rounded-none max-md:border-x-0 max-md:object-[35%_center] max-[480px]:h-[56vh] max-[480px]:min-h-[360px]"
      />
    </section>
  );
}
