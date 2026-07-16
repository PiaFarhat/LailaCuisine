"use client";

import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { menuCategories } from "../data/menu";
import Container from "./Container";
import ContentCard from "./ContentCard";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  const menuSectionClass =
    "relative z-[2] mx-auto grid w-full grid-cols-2 gap-[clamp(0.9rem,1.5vw,1.2rem)] overflow-hidden p-[clamp(1.35rem,3vw,2.6rem)] text-left [scroll-margin-top:160px] max-lg:grid-cols-1 max-md:p-5 max-[480px]:p-4";
  const menuHeadingClass =
    "relative z-[1] col-span-full pb-[1.1rem] text-center";
  const menuNoteClass = "relative z-[1] col-span-full text-center";
  const menuLayoutClass =
    "mt-[clamp(2rem,3.6vw,3rem)] grid w-full max-w-full grid-cols-[230px_minmax(0,1fr)] items-stretch gap-[clamp(2rem,3vw,3rem)] max-[1024px]:grid-cols-[180px_minmax(0,1fr)] max-[1024px]:gap-[clamp(1.1rem,2.6vw,2rem)] max-md:block max-md:mt-4";
  const menuSidebarClass =
    "z-[12] min-w-0 self-stretch py-[0.35rem] max-md:z-20 max-md:mb-[clamp(1.1rem,3.5vw,1.55rem)] max-md:block max-md:w-full max-md:max-w-full max-md:p-0";
  const menuCategoriesClass =
    "sticky top-24 flex flex-col items-start gap-[clamp(1rem,1.65vw,1.45rem)] border-l border-[rgba(198,161,91,0.26)] py-[0.2rem] pr-0 pl-[clamp(1rem,1.8vw,1.35rem)] max-[1024px]:top-[98px] max-[1024px]:gap-[0.9rem] max-[1024px]:pl-4 max-md:top-[76px] max-md:w-full max-md:max-w-full max-md:flex-row max-md:items-center max-md:gap-[0.65rem] max-md:overflow-x-auto max-md:overflow-y-hidden max-md:whitespace-nowrap max-md:border max-md:border-[rgba(198,161,91,0.42)] max-md:bg-[linear-gradient(135deg,rgba(255,253,248,0.86),rgba(248,244,236,0.68)),radial-gradient(circle_at_top_left,rgba(198,161,91,0.16),transparent_36%)] max-md:px-[0.8rem] max-md:py-[0.7rem] max-md:shadow-[0_14px_34px_rgba(77,16,39,0.09),inset_0_1px_0_rgba(255,253,248,0.82)] max-md:[scrollbar-width:none] max-md:[scroll-snap-type:x_proximity] max-md:[&::-webkit-scrollbar]:hidden max-md:backdrop-blur-[12px] max-[480px]:gap-3 max-[480px]:px-3";
  const menuContentClass = "w-full max-w-full min-w-0 self-start";
  const getMenuCategoryClass = (isActive: boolean) =>
    [
      "relative inline-flex text-left text-[0.76rem] font-semibold uppercase leading-[1.3] tracking-[0.14em] text-[rgba(43,33,24,0.58)] transition-[color,border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:left-[calc((clamp(1rem,1.8vw,1.35rem)+1px)*-1)] before:top-1/2 before:h-0 before:w-0.5 before:-translate-y-1/2 before:bg-[var(--gold)] before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--gold)] focus-visible:text-[var(--gold)] max-[1024px]:text-[0.68rem] max-[1024px]:tracking-[0.12em] max-md:min-h-10 max-md:flex-none max-md:items-center max-md:justify-center max-md:border max-md:border-[rgba(198,161,91,0.2)] max-md:bg-[linear-gradient(135deg,rgba(255,253,248,0.68),rgba(248,244,236,0.36))] max-md:px-[0.85rem] max-md:pt-[0.1rem] max-md:pb-0 max-md:text-[0.72rem] max-md:tracking-[0.11em] max-md:shadow-[inset_0_1px_0_rgba(255,253,248,0.56),0_8px_18px_rgba(77,16,39,0.035)] max-md:[scroll-snap-align:start] max-md:before:left-1/2 max-md:before:top-auto max-md:before:bottom-[0.3rem] max-md:before:h-0.5 max-md:before:w-0 max-md:before:-translate-x-1/2 max-md:before:translate-y-0 max-md:before:transition-[width] max-md:hover:border-[rgba(198,161,91,0.52)] max-md:hover:text-[var(--burgundy)] max-md:focus-visible:border-[rgba(198,161,91,0.52)] max-md:focus-visible:text-[var(--burgundy)] max-[480px]:min-h-10 max-[480px]:text-[0.68rem]",
      isActive
        ? "text-[var(--burgundy)] before:h-[1.65rem] max-md:border-[rgba(198,161,91,0.78)] max-md:bg-[linear-gradient(135deg,rgba(255,253,248,0.86),rgba(248,244,236,0.58))] max-md:shadow-[inset_0_0_0_1px_rgba(255,253,248,0.45),0_10px_24px_rgba(77,16,39,0.08)] max-md:before:h-0.5 max-md:before:w-[calc(100%-1.1rem)]"
        : "",
    ]
      .filter(Boolean)
      .join(" ");

  useEffect(() => {
    let frameId = 0;

    const getSections = () =>
      menuCategories
        .map((category) => document.getElementById(category.id))
        .filter((section): section is HTMLElement => Boolean(section));

    const updateActiveCategory = () => {
      const marker = window.innerWidth <= 768 ? 170 : 180;
      const sections = getSections();
      const viewportBottom = window.innerHeight;
      const currentSection =
        sections
          .map((section) => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.max(
              0,
              Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, marker),
            );
            const distanceFromMarker = Math.abs(rect.top - marker);

            return {
              section,
              score: visibleHeight * 2 - distanceFromMarker,
            };
          })
          .sort((a, b) => b.score - a.score)[0]?.section ?? sections[0];

      if (currentSection?.id) {
        setActiveCategory(currentSection.id);
      }
    };

    const scheduleActiveUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveCategory);
    };

    const observer = new IntersectionObserver(scheduleActiveUpdate, {
      rootMargin: "-18% 0px -66% 0px",
      threshold: [0, 0.01, 0.2, 0.45, 0.7, 1],
    });

    const sections = getSections();

    sections.forEach((section) => observer.observe(section));
    updateActiveCategory();
    window.addEventListener("scroll", scheduleActiveUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleActiveUpdate);
      window.removeEventListener("resize", scheduleActiveUpdate);
    };
  }, []);

  const handleCategoryClick =
    (categoryId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setActiveCategory(categoryId);
      document.getElementById(categoryId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

  return (
    <section
      id="menu"
      className="relative isolate px-0 pt-[clamp(3rem,5vw,4.5rem)] pb-[clamp(5rem,8vw,8rem)] text-center [scroll-margin-top:82px]"
    >
      <Container className="relative z-[2]">
        <p className="eyebrow mb-4">Generous Lebanese Table</p>
        <h2 className="mb-5">Menu</h2>

        <div className={menuLayoutClass}>
          <aside className={menuSidebarClass} aria-label="Menu categories">
            <nav className={menuCategoriesClass}>
              {menuCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className={getMenuCategoryClass(activeCategory === category.id)}
                  aria-current={activeCategory === category.id ? "true" : undefined}
                  onClick={handleCategoryClick(category.id)}
                >
                  {category.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className={menuContentClass}>
            {menuCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                className={menuSectionClass}
              >
                <h3 className={menuHeadingClass}>{category.heading}</h3>
                {category.note && (
                  <p className={menuNoteClass}>{category.note}</p>
                )}

                {category.items.map((item) => (
                  <ContentCard
                    key={item.name}
                    title={item.name}
                    description={item.description}
                    meta={item.price}
                  />
                ))}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
