import Container from "./Container";

type PageBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  alignment?: "left" | "center" | "right";
  overlayStrength?: "soft" | "medium" | "strong";
  bottomFade?: "cream" | "softCream" | "dark" | "none";
  variant?: "default" | "reservation" | "wine";
};

export default function PageBanner({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  backgroundImage,
  backgroundPosition = "center",
  alignment = "left",
  overlayStrength = "medium",
  bottomFade = "cream",
  variant = "default",
}: PageBannerProps) {
  const isReservation = variant === "reservation";
  const isWine = variant === "wine";
  const bannerImage = image ?? backgroundImage;
  const contentAlignment =
    alignment === "center"
      ? "mx-auto text-center border-l-0 border-t"
      : alignment === "right"
        ? "ml-auto border-l-0 border-r text-right"
        : "border-l";
  const overlayClass =
    overlayStrength === "strong"
      ? "bg-[linear-gradient(90deg,rgba(58,11,29,0.86),rgba(77,16,39,0.68)_50%,rgba(58,11,29,0.78))]"
      : overlayStrength === "soft"
        ? "bg-[linear-gradient(90deg,rgba(58,11,29,0.66),rgba(77,16,39,0.42)_52%,rgba(58,11,29,0.58))]"
        : "bg-[linear-gradient(90deg,rgba(58,11,29,0.78),rgba(77,16,39,0.56)_48%,rgba(58,11,29,0.72))]";
  const sectionClass = [
    "relative isolate overflow-hidden text-[var(--ivory)]",
    isReservation
      ? "min-h-[clamp(500px,66vh,600px)] pt-[clamp(108px,14vh,132px)] pb-[clamp(2.25rem,4vw,3.25rem)] shadow-[0_12px_35px_rgba(45,15,20,0.16)] max-md:min-h-[clamp(440px,62vh,540px)] max-md:pt-[106px]"
      : "pt-[150px] pb-[clamp(3.4rem,5vw,5.25rem)] max-md:pt-[124px]",
    bottomFade === "cream" && !isReservation
      ? "bg-[linear-gradient(to_bottom,rgba(65,10,29,0.98)_0%,rgba(78,18,38,0.94)_45%,rgba(118,72,78,0.55)_72%,rgba(248,244,236,0.2)_88%,var(--cream)_100%)]"
      : "bg-[linear-gradient(135deg,#3a0b1d,var(--wine)_48%,#611934)]",
  ].join(" ");

  return (
    <section className={sectionClass}>
      {bannerImage && (
        <div
          className={[
            "pointer-events-none absolute inset-0 z-[-4] bg-cover bg-center saturate-[0.92]",
            isReservation
              ? "opacity-[0.48]"
              : isWine
                ? "opacity-[0.38] saturate-[0.98]"
                : "opacity-[0.34]",
          ].join(" ")}
          style={{
            backgroundImage: `url("${bannerImage}")`,
            backgroundPosition,
          }}
          role={imageAlt ? "img" : undefined}
          aria-label={imageAlt}
          aria-hidden={imageAlt ? undefined : "true"}
        />
      )}
      {bannerImage && (
        <div
          className={[
            "pointer-events-none absolute inset-0 z-[-3]",
            isReservation
              ? "bg-[linear-gradient(90deg,rgba(55,10,25,0.9)_0%,rgba(70,16,34,0.78)_42%,rgba(75,22,38,0.62)_72%,rgba(52,20,27,0.52)_100%)]"
              : isWine
              ? "bg-[linear-gradient(to_bottom,rgba(55,10,25,0.78)_0%,rgba(70,16,34,0.68)_52%,rgba(107,62,66,0.38)_82%,rgba(248,244,236,0.12)_94%,var(--cream)_100%),linear-gradient(90deg,rgba(58,11,29,0.72),rgba(77,16,39,0.42)_52%,rgba(58,11,29,0.5))]"
                : overlayClass,
          ].join(" ")}
          aria-hidden="true"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_18%_28%,rgba(198,161,91,0.2),transparent_26%),radial-gradient(circle_at_86%_64%,rgba(85,107,47,0.18),transparent_28%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[-2] opacity-[0.14] [background-image:radial-gradient(rgba(255,253,248,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,91,0.08),transparent_24%,transparent_76%,rgba(85,107,47,0.1))] [background-size:20px_20px,100%_100%]"
        aria-hidden="true"
      />
      {bottomFade === "cream" && !isReservation && (
        <div
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 z-[-1] bg-[linear-gradient(to_bottom,transparent_0%,var(--cream)_100%)]",
            isWine ? "h-[clamp(3rem,5vw,4.5rem)]" : "h-[clamp(1.5rem,2.8vw,2.5rem)]",
          ].join(" ")}
          aria-hidden="true"
        />
      )}
      {bottomFade === "dark" && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-[clamp(2.25rem,4vw,3.5rem)] bg-[linear-gradient(to_bottom,transparent_0%,rgba(43,21,18,0.18)_58%,rgba(43,21,18,0.42)_100%)]"
          aria-hidden="true"
        />
      )}
      {bottomFade === "softCream" && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-[clamp(2rem,3.5vw,3rem)] bg-[linear-gradient(to_bottom,transparent_0%,rgba(248,244,236,0.08)_52%,rgba(248,244,236,0.28)_100%)]"
          aria-hidden="true"
        />
      )}
      <div
        className="pointer-events-none absolute inset-4 z-[-1] border border-[rgba(190,153,91,0.24)] border-b-transparent max-md:inset-2.5"
        aria-hidden="true"
      />

      <Container className="relative z-[2] h-full">
        <div
          className={[
            "relative border-l p-[clamp(1.75rem,3.5vw,3rem)] max-md:py-[1.45rem] max-md:pr-0 max-md:pl-[1.15rem] max-[480px]:pl-4",
            isReservation
              ? "max-w-[760px] border-[rgba(198,161,91,0.28)] py-[clamp(1.25rem,2.6vw,2rem)] pl-[clamp(48px,10vw,180px)]"
              : `max-w-[840px] border-[rgba(198,161,91,0.32)] max-md:pr-4 ${contentAlignment}`,
          ].join(" ")}
        >
          {eyebrow && (
            <p
              className={[
                "eyebrow mb-3",
                isReservation
                  ? "text-[0.82rem] font-semibold tracking-[0.22em] text-[#b4a15f]"
                  : "",
              ].join(" ")}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={[
              "m-0 font-normal text-[var(--ivory)]",
                isReservation
                ? "max-w-[760px] text-[clamp(4rem,6.4vw,6.9rem)] leading-[0.92] tracking-[-0.025em] max-md:text-[clamp(2.9rem,12vw,4.35rem)]"
                : "max-w-[10em] text-[clamp(2.65rem,7vw,6.2rem)] leading-[0.96] max-md:max-w-[8.6em] max-md:text-[clamp(2rem,8vw,2.3rem)]",
            ].join(" ")}
          >
            {title}
          </h1>
          {description && (
            <p
              className={[
                "mt-5 font-normal",
                isReservation
                  ? "max-w-[650px] text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-[rgba(255,247,232,0.86)]"
                  : "max-w-[42rem] text-[clamp(0.98rem,1.55vw,1.18rem)] leading-[1.85] text-[var(--ivory)] max-md:max-w-[18rem] max-md:text-[0.94rem]",
              ].join(" ")}
            >
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
