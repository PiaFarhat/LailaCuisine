import Link from "next/link";
import { menuCategories, specialOrderItems } from "../data/menu";
import Container from "./Container";
import ContentCard from "./ContentCard";

const featuredMenuItems = menuCategories
  .flatMap((category) => category.items)
  .slice(0, 4);
const featuredSpecialOrders = specialOrderItems.slice(0, 2);

export default function MenuPreview() {
  return (
    <>
      <section
        id="menu-preview"
        className="section-space-lg relative isolate px-0 text-center"
      >
        <Container className="relative z-[2]">
          <p className="eyebrow mb-4">Generous Lebanese Table</p>
          <h2 className="mb-5">Menu</h2>

          <div className="mx-auto grid max-w-[980px] grid-cols-2 gap-[clamp(0.9rem,1.5vw,1.2rem)] text-left max-md:grid-cols-1">
            {featuredMenuItems.map((item) => (
              <ContentCard
                key={item.name}
                title={item.name}
                description={item.description}
                meta={item.price}
              />
            ))}
          </div>

          <Link className="route-cta mt-8" href="/menu">
            View Full Menu
          </Link>
        </Container>
      </section>

      <section
        id="special-orders-preview"
        className="section-space-lg relative text-center text-[var(--ivory)]"
      >
        <Container className="relative z-[2]">
          <p className="eyebrow mb-4">By Reservation Only</p>
          <h2 className="mb-6 text-[var(--ivory)]">
            Pre-Requested Traditional Dishes
          </h2>

          <div className="mx-auto grid max-w-[980px] grid-cols-2 gap-[clamp(0.9rem,1.5vw,1.2rem)] max-md:grid-cols-1">
            {featuredSpecialOrders.map((item) => (
              <ContentCard
                key={item.title}
                title={item.title}
                description={item.description}
                meta={item.price}
                className="relative z-[1] mx-auto min-h-0 w-full overflow-hidden p-[1.35rem_1.4rem_1.22rem] text-left transition-[transform,border-color,box-shadow] duration-[260ms] ease-out max-md:p-[1.15rem_1.1rem] max-md:text-center"
                titleClassName="mb-2 text-[clamp(1.75rem,3vw,2.8rem)] font-normal text-[var(--gold)]"
                textClassName="m-0 text-[rgba(255,253,248,0.9)]"
                metaClassName="mt-[0.95rem] inline-block border border-[rgba(198,161,91,0.34)] bg-[rgba(198,161,91,0.18)] px-[0.65rem] py-[0.34rem] text-[0.83rem] font-bold leading-[1.25] tracking-[0.045em] text-[var(--ivory)]"
                headingLevel="h3"
              />
            ))}
          </div>

          <Link className="route-cta mt-8" href="/menu#special-orders">
            View Special Orders
          </Link>
        </Container>
      </section>
    </>
  );
}
