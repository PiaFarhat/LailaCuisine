"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { navigationItems, siteConfig } from "../config/site";
import Container from "./Container";

const CONTACT_HREF = "/#contact";
const CONTACT_HASH = "#contact";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeNav = () => setNavOpen(false);
  const navLinkClass =
    "relative inline-flex min-h-10 items-center whitespace-nowrap px-[0.08rem] py-1 text-[clamp(0.67rem,0.72vw,0.78rem)] uppercase leading-none tracking-[0.08em] text-[rgba(43,33,24,0.9)] transition-colors duration-[250ms] ease-out max-[1366px]:text-[0.68rem] max-[1366px]:tracking-[0.08em] max-[1120px]:text-[0.63rem] max-[1120px]:tracking-[0.07em] max-[900px]:min-h-11 max-[900px]:text-[0.96rem] max-[900px]:tracking-[0.15em] max-[900px]:text-[var(--burgundy)] max-[900px]:active:text-[var(--gold)]";

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

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, [pathname]);

  const handleMenuPanelClick = (event: MouseEvent<HTMLUListElement>) => {
    if (event.target === event.currentTarget) {
      closeNav();
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/" && activeHash !== CONTACT_HASH;
    if (href === CONTACT_HREF) return pathname === "/" && activeHash === CONTACT_HASH;
    return pathname === href;
  };

  const handleNavLinkClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (href === CONTACT_HREF) {
        event.preventDefault();
        setActiveHash(CONTACT_HASH);
        closeNav();
        router.push(CONTACT_HREF);
        return;
      }

      setActiveHash("");
      closeNav();
    };

  const handleBrandClick = () => {
    setActiveHash("");
    closeNav();
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="site-nav fixed inset-x-0 top-0 z-[100]"
    >
      <Container
        className="flex min-h-[82px] items-center justify-between gap-[clamp(1.6rem,3.4vw,4.4rem)] max-[1366px]:gap-[clamp(1.1rem,2.2vw,2.2rem)] max-[1120px]:min-h-[76px] max-[900px]:min-h-[66px]"
      >
        <Link
          href="/"
          className="brand-logo relative z-[103] shrink-0 whitespace-nowrap text-[clamp(1.32rem,1.9vw,1.85rem)] leading-none tracking-[0.035em] text-[var(--burgundy)] max-[1120px]:text-[1.28rem] max-[900px]:text-[1.35rem]"
          onClick={handleBrandClick}
        >
          {siteConfig.name}
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          id="nav-toggle"
          className="burger max-[900px]:relative max-[900px]:z-[103] max-[900px]:grid max-[900px]:min-h-11 max-[900px]:min-w-11 max-[900px]:cursor-pointer max-[900px]:place-content-center max-[900px]:gap-[5px] max-[900px]:p-[0.55rem]"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-controls="primary-navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span
            className={`max-[900px]:h-0.5 max-[900px]:w-[30px] max-[900px]:bg-[var(--burgundy)] max-[900px]:transition-[transform,opacity] max-[900px]:duration-[250ms] max-[900px]:ease-out ${
              navOpen ? "max-[900px]:[transform:rotate(45deg)_translate(5px,5px)]" : ""
            }`}
          ></span>
          <span
            className={`max-[900px]:h-0.5 max-[900px]:w-[30px] max-[900px]:bg-[var(--burgundy)] max-[900px]:transition-[transform,opacity] max-[900px]:duration-[250ms] max-[900px]:ease-out ${
              navOpen ? "max-[900px]:opacity-0" : ""
            }`}
          ></span>
          <span
            className={`max-[900px]:h-0.5 max-[900px]:w-[30px] max-[900px]:bg-[var(--burgundy)] max-[900px]:transition-[transform,opacity] max-[900px]:duration-[250ms] max-[900px]:ease-out ${
              navOpen ? "max-[900px]:[transform:rotate(-45deg)_translate(5px,-5px)]" : ""
            }`}
          ></span>
        </button>

        <ul
          id="primary-navigation"
          className={`nav-links m-0 flex min-w-0 flex-1 list-none items-center justify-end gap-[clamp(0.72rem,1.35vw,1.35rem)] p-0 max-[1366px]:gap-[clamp(0.58rem,0.95vw,1rem)] max-[1120px]:gap-[0.62rem] max-[900px]:fixed max-[900px]:inset-0 max-[900px]:z-[101] max-[900px]:min-h-[100svh] max-[900px]:w-full max-[900px]:flex-col max-[900px]:justify-center max-[900px]:gap-[1.15rem] max-[900px]:px-[1.25rem] max-[900px]:pt-[6.25rem] max-[900px]:pb-[2.25rem] max-[900px]:transition-transform max-[900px]:duration-[350ms] max-[900px]:ease-out ${
            navOpen ? "max-[900px]:translate-y-0" : "max-[900px]:translate-y-[-100%]"
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
                  onClick={handleNavLinkClick(item.href)}
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
