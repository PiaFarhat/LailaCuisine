"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { MenuItem } from "../data/menu";

type FeaturedDishesSwiperProps = {
  items: MenuItem[];
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

const subscribeToReducedMotion = (callback: () => void) => {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia(reducedMotionQuery).matches;

const getServerReducedMotionSnapshot = () => false;

export default function FeaturedDishesSwiper({ items }: FeaturedDishesSwiperProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );

  return (
    <div className="featured-dishes-swiper relative mx-auto max-w-[1040px] text-left">
      <Swiper
        modules={[A11y, Keyboard, Navigation, Pagination]}
        slidesPerView={1.12}
        spaceBetween={16}
        speed={prefersReducedMotion ? 180 : 560}
        grabCursor
        watchOverflow
        keyboard={{ enabled: true }}
        navigation
        pagination={{ clickable: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: "Previous featured dish",
          nextSlideMessage: "Next featured dish",
          paginationBulletMessage: "Go to featured dish {{index}}",
        }}
        breakpoints={{
          480: {
            slidesPerView: 1.55,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 2.25,
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
        }}
        className="!overflow-visible pb-12"
      >
        {items.map((item) => (
          <SwiperSlide key={item.name} className="h-auto">
            <article className="flex h-full min-h-[225px] flex-col overflow-hidden border border-[rgba(198,161,91,0.46)] bg-[linear-gradient(135deg,rgba(255,253,248,0.92),rgba(248,244,236,0.72)),radial-gradient(circle_at_top_left,rgba(198,161,91,0.16),transparent_34%)] p-[1.35rem_1.4rem_1.25rem] shadow-[0_18px_44px_rgba(77,16,39,0.09)] transition-[border-color,box-shadow,transform] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(198,161,91,0.68)] hover:shadow-[0_22px_52px_rgba(77,16,39,0.12)] motion-safe:hover:-translate-y-px">
              <span
                className="mb-5 block h-[0.7rem] w-[0.7rem] rotate-45 border border-[rgba(198,161,91,0.64)] bg-[rgba(198,161,91,0.16)]"
                aria-hidden="true"
              />
              <h3 className="mb-2 text-[1.24rem] font-medium leading-[1.25] text-[var(--burgundy)]">
                {item.name}
              </h3>
              <p className="m-0 flex-1 text-[0.96rem] leading-[1.65] text-[rgba(43,33,24,0.76)]">
                {item.description}
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="inline-block border border-[rgba(198,161,91,0.34)] bg-[rgba(198,161,91,0.16)] px-[0.65rem] py-[0.34rem] text-[0.83rem] font-bold leading-[1.25] tracking-[0.045em] text-[var(--wine)]">
                  {item.price}
                </span>
                <Link
                  className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[var(--burgundy)] underline decoration-[rgba(198,161,91,0.52)] underline-offset-4 transition-[color,decoration-color] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--gold)] hover:decoration-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                  href="/menu"
                >
                  View Menu
                </Link>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
