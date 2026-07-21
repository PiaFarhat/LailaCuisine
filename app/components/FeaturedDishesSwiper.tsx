"use client";

import Link from "next/link";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { MenuItem } from "../data/menu";

type FeaturedDishesSwiperProps = {
  items: MenuItem[];
  showMenuAction?: boolean;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const normalMotionSpeed = 560;
const reducedMotionSpeed = 180;

const swiperModules = [A11y, Keyboard, Navigation, Pagination];
const swiperA11y = {
  enabled: true,
  prevSlideMessage: "Previous featured dish",
  nextSlideMessage: "Next featured dish",
  paginationBulletMessage: "Go to featured dish {{index}}",
};
const swiperBreakpoints = {
  480: {
    slidesPerView: 1.5,
    spaceBetween: 18,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 22,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 26,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

const cardClass =
  "flex h-full min-h-[360px] flex-col overflow-hidden border border-[rgba(198,161,91,0.46)] bg-[linear-gradient(135deg,rgba(255,253,248,0.94),rgba(248,244,236,0.78)),radial-gradient(circle_at_top_left,rgba(198,161,91,0.16),transparent_34%)] p-[1.05rem] shadow-[0_18px_44px_rgba(77,16,39,0.09)] transition-[border-color,box-shadow,transform] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(198,161,91,0.68)] hover:shadow-[0_22px_52px_rgba(77,16,39,0.12)] motion-safe:hover:-translate-y-px max-[480px]:min-h-[338px] max-[480px]:p-3";
const mediaClass =
  "relative mb-5 grid aspect-[16/9] place-items-center overflow-hidden border border-[rgba(198,161,91,0.32)] bg-[linear-gradient(135deg,rgba(106,30,58,0.92),rgba(77,16,39,0.82)),radial-gradient(circle_at_26%_18%,rgba(198,161,91,0.32),transparent_34%),radial-gradient(circle_at_76%_72%,rgba(85,107,47,0.2),transparent_30%)] max-[480px]:mb-4";
const imageClass =
  "h-full w-full object-cover transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01]";
const markerClass =
  "block h-[0.7rem] w-[0.7rem] rotate-45 border border-[rgba(255,253,248,0.58)] bg-[rgba(198,161,91,0.22)]";
const contentClass = "flex flex-1 flex-col px-1 pb-1";
const titleClass =
  "mb-2 min-h-[3.1rem] text-[1.24rem] font-medium leading-[1.25] text-[var(--burgundy)] max-[480px]:min-h-0 max-[480px]:text-[1.14rem]";
const descriptionClass =
  "m-0 flex-1 text-[0.95rem] leading-[1.62] text-[rgba(43,33,24,0.76)] max-[480px]:text-[0.9rem] max-[480px]:leading-[1.55]";
const priceClass =
  "inline-block shrink-0 border border-[rgba(198,161,91,0.34)] bg-[rgba(198,161,91,0.16)] px-[0.65rem] py-[0.34rem] text-[0.83rem] font-bold leading-[1.25] tracking-[0.045em] text-[var(--wine)] max-[480px]:text-[0.78rem]";
const linkClass =
  "shrink-0 text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[var(--burgundy)] underline decoration-[rgba(198,161,91,0.52)] underline-offset-4 transition-[color,decoration-color] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--gold)] hover:decoration-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] max-[480px]:text-[0.68rem] max-[480px]:tracking-[0.1em]";

const subscribeToReducedMotion = (callback: () => void) => {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia(reducedMotionQuery).matches;

const getServerReducedMotionSnapshot = () => false;

function FeaturedDishCard({ item }: { item: MenuItem }) {
  return (
    <article className={`${cardClass} group`}>
      <div className={mediaClass}>
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={720}
            height={405}
            sizes="(max-width: 479px) 84vw, (max-width: 767px) 58vw, (max-width: 1023px) 44vw, 320px"
            className={imageClass}
            style={{
              objectPosition: item.image.objectPosition ?? "center",
            }}
          />
        ) : (
          <span className={markerClass} aria-hidden="true" />
        )}
      </div>
      <div className={contentClass}>
        <h3 className={titleClass}>{item.name}</h3>
        <p className={descriptionClass}>{item.description}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <span className={priceClass}>{item.price}</span>
          <Link className={linkClass} href="/menu">
            View Menu
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedDishesSwiper({
  items,
  showMenuAction = false,
}: FeaturedDishesSwiperProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );

  return (
    <div className="featured-dishes-swiper relative mx-auto max-w-[1040px] text-left">
      <Swiper
        modules={swiperModules}
        slidesPerView={1.1}
        spaceBetween={16}
        speed={prefersReducedMotion ? reducedMotionSpeed : normalMotionSpeed}
        grabCursor
        watchOverflow
        resistanceRatio={0.72}
        threshold={5}
        touchRatio={1.05}
        keyboard={{ enabled: true }}
        navigation
        pagination={{ clickable: true, el: ".featured-dishes-pagination" }}
        a11y={swiperA11y}
        breakpoints={swiperBreakpoints}
        className="max-md:!overflow-hidden md:!overflow-visible"
      >
        {items.map((item) => (
          <SwiperSlide key={item.name} className="!h-auto">
            <FeaturedDishCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="featured-dishes-pagination mt-7 flex min-h-6 items-center justify-center"
        aria-label="Featured dishes pagination"
      />
      {showMenuAction && (
        <div className="mt-6 flex justify-center pb-4 max-[480px]:px-3">
          <Link className="route-cta max-[480px]:w-full" href="/menu">
            View Full Menu
          </Link>
        </div>
      )}
    </div>
  );
}
