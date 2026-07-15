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
      className="section-space-lg relative isolate px-0 text-center [scroll-margin-top:82px]"
    >
      <Container className="relative z-[2]">
        <p className="eyebrow mb-4">Generous Lebanese Table</p>
        <h2 className="mb-5">Menu</h2>

        <div className="menu-layout">
          <aside className="menu-sidebar" aria-label="Menu categories">
            <nav className="menu-categories">
              {menuCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className={activeCategory === category.id ? "is-active" : undefined}
                  aria-current={activeCategory === category.id ? "true" : undefined}
                  onClick={handleCategoryClick(category.id)}
                >
                  {category.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="menu-content">
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
