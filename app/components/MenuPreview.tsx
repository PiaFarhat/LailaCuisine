import Link from "next/link";
import { getFeaturedMenuItems, specialOrderItems } from "../data/menu";
import Container from "./Container";
import ContentCard from "./ContentCard";
import FeaturedDishesSwiper from "./FeaturedDishesSwiper";

const featuredMenuItems = getFeaturedMenuItems();
const featuredSpecialOrders = specialOrderItems.slice(0, 2);
const specialOrderCardClass =
  "relative z-[1] mx-auto min-h-0 w-full overflow-hidden p-[1.35rem_1.4rem_1.22rem] text-left transition-[transform,border-color,box-shadow] duration-[260ms] ease-out max-md:p-[1.15rem_1.1rem] max-md:text-center";
const specialOrderTitleClass =
  "mb-2 text-[clamp(1.75rem,3vw,2.8rem)] font-normal text-[var(--gold)]";
const specialOrderTextClass = "m-0 text-[rgba(255,253,248,0.9)]";
const specialOrderMetaClass =
  "mt-[0.95rem] inline-block border border-[rgba(198,161,91,0.34)] bg-[rgba(198,161,91,0.18)] px-[0.65rem] py-[0.34rem] text-[0.83rem] font-bold leading-[1.25] tracking-[0.045em] text-[var(--ivory)]";

export default function MenuPreview() {
  return (
    <>
      <section
        id="menu-preview"
        className="relative isolate px-0 py-[clamp(4rem,8vw,8rem)] text-center max-[480px]:py-[3.4rem]"
      >
        <Container className="relative z-[2]">
          <p className="eyebrow mb-4">Generous Lebanese Table</p>
          <h2 className="mb-5">Menu</h2>
          <p className="mx-auto mt-0 mb-[clamp(1.8rem,3vw,2.6rem)] max-w-[42rem] text-[0.98rem] leading-[1.75] text-[rgba(43,33,24,0.72)] max-[480px]:mb-6 max-[480px]:text-[0.94rem]">
            Explore a small selection from Laila&apos;s Lebanese table, then open
            the full menu for every mezze, grill, seafood plate, and dessert.
          </p>

          <FeaturedDishesSwiper items={featuredMenuItems} />

          <Link className="route-cta mt-8" href="/menu">
            View Full Menu
          </Link>
        </Container>
      </section>

      <section
        id="special-orders-preview"
        className="relative py-[clamp(5rem,8vw,8rem)] text-center text-[var(--ivory)]"
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
                className={specialOrderCardClass}
                titleClassName={specialOrderTitleClass}
                textClassName={specialOrderTextClass}
                metaClassName={specialOrderMetaClass}
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
