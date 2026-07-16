import { specialOrderItems } from "../data/menu";
import Container from "./Container";
import ContentCard from "./ContentCard";

export default function SpecialOrders() {
  const articleClass =
    "relative z-[1] mx-auto my-4 min-h-0 max-w-[900px] overflow-hidden p-[1.35rem_1.4rem_1.22rem] text-left transition-[transform,border-color,box-shadow] duration-[260ms] ease-out max-md:p-[1.15rem_1.1rem] max-md:text-center";
  const titleClass =
    "mb-2 text-[clamp(1.75rem,3vw,2.8rem)] font-normal text-[var(--gold)]";
  const textClass = "m-0 text-[rgba(255,253,248,0.9)]";
  const priceClass =
    "mt-[0.95rem] inline-block border border-[rgba(198,161,91,0.34)] bg-[rgba(198,161,91,0.18)] px-[0.65rem] py-[0.34rem] text-[0.83rem] font-bold leading-[1.25] tracking-[0.045em] text-[var(--ivory)]";

  return (
    <section
      id="special-orders"
      className="relative min-h-screen py-[clamp(5rem,8vw,8rem)] text-center text-[var(--ivory)] [scroll-margin-top:82px]"
    >
      <Container className="relative z-[2]">
        <p className="eyebrow mb-4">By Reservation Only</p>
        <h2 className="mb-6 text-[var(--ivory)]">
          Pre-Requested Traditional Dishes
        </h2>

        <p className="mx-auto mb-12 max-w-[760px] text-[rgba(255,253,248,0.9)]">
          These dishes require longer preparation and are made only by reservation.
          They are ideal for family gatherings and generous Lebanese tables.
        </p>

        {specialOrderItems.map((item) => (
          <ContentCard
            key={item.title}
            title={item.title}
            description={item.description}
            meta={item.price}
            className={articleClass}
            titleClassName={titleClass}
            textClassName={textClass}
            metaClassName={priceClass}
            headingLevel="h3"
          />
        ))}
      </Container>
    </section>
  );
}
