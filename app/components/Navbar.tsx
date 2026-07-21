"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { navigationItems, siteConfig } from "../config/site";
import Container from "./Container";

export default function Navbar() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeNav = () => setNavOpen(false);
  const navLinkClass =
    "relative inline-flex min-h-10 items-center whitespace-nowrap px-[0.08rem] py-1 text-[clamp(0.68rem,0.72vw,0.78rem)] uppercase leading-none tracking-[0.08em] text-[rgba(43,33,24,0.9)] transition-colors duration-[250ms] ease-out max-[1366px]:text-[0.68rem] max-[1366px]:tracking-[0.08em] max-lg:min-h-11 max-lg:text-[0.96rem] max-lg:tracking-[0.15em] max-lg:text-[var(--burgundy)] max-lg:active:text-[var(--gold)]";

  useEffect(() => {
    if (!navOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        closeNav();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeNav();
      menuButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navOpen]);

  const handleMenuPanelClick = (event: MouseEvent<HTMLUListElement>) => {
    if (event.target === event.currentTarget) {
      closeNav();
    }
  };

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  const handleBrandClick = () => {
    closeNav();
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="site-nav fixed inset-x-0 top-0 z-[100]"
    >
      <Container
        className="flex min-h-[82px] items-center justify-between gap-[clamp(1.6rem,3.4vw,4.4rem)] max-[1366px]:gap-[clamp(1.1rem,2.2vw,2.2rem)] max-lg:min-h-[66px]"
      >
        <Link
          href="/"
          className="brand-logo relative z-[103] shrink-0 whitespace-nowrap text-[clamp(1.32rem,1.9vw,1.85rem)] leading-none tracking-[0.035em] text-[var(--burgundy)] max-lg:text-[1.35rem]"
          onClick={handleBrandClick}
        >
          {siteConfig.name}
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          id="nav-toggle"
          className="burger max-lg:relative max-lg:z-[103] max-lg:grid max-lg:min-h-11 max-lg:min-w-11 max-lg:cursor-pointer max-lg:place-content-center max-lg:gap-[5px] max-lg:p-[0.55rem]"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-controls="primary-navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span
            className={`max-lg:h-0.5 max-lg:w-[30px] max-lg:bg-[var(--burgundy)] max-lg:transition-[transform,opacity] max-lg:duration-[250ms] max-lg:ease-out ${
              navOpen ? "max-lg:[transform:rotate(45deg)_translate(5px,5px)]" : ""
            }`}
          ></span>
          <span
            className={`max-lg:h-0.5 max-lg:w-[30px] max-lg:bg-[var(--burgundy)] max-lg:transition-[transform,opacity] max-lg:duration-[250ms] max-lg:ease-out ${
              navOpen ? "max-lg:opacity-0" : ""
            }`}
          ></span>
          <span
            className={`max-lg:h-0.5 max-lg:w-[30px] max-lg:bg-[var(--burgundy)] max-lg:transition-[transform,opacity] max-lg:duration-[250ms] max-lg:ease-out ${
              navOpen ? "max-lg:[transform:rotate(-45deg)_translate(5px,-5px)]" : ""
            }`}
          ></span>
        </button>

        <ul
          id="primary-navigation"
          className={`nav-links m-0 flex min-w-0 flex-1 list-none items-center justify-end gap-[clamp(0.72rem,1.35vw,1.35rem)] p-0 max-[1366px]:gap-[clamp(0.58rem,0.95vw,1rem)] max-lg:fixed max-lg:inset-0 max-lg:z-[101] max-lg:min-h-[100svh] max-lg:w-full max-lg:flex-col max-lg:justify-center max-lg:gap-[1.15rem] max-lg:px-[1.25rem] max-lg:pt-[6.25rem] max-lg:pb-[2.25rem] max-lg:transition-transform max-lg:duration-[350ms] max-lg:ease-out ${
            navOpen ? "max-lg:translate-y-0" : "max-lg:translate-y-[-100%]"
          }`}
          onClick={handleMenuPanelClick}
        >
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <li key={item.href}>
                <Link
                  className={`${navLinkClass}${isActive ? " is-active" : ""}`}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeNav}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
