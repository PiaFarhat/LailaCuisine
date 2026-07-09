"use client";

import { useState } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => setNavOpen(false);
  const navLinkClass =
    "relative inline-flex min-h-10 items-center whitespace-nowrap px-[0.08rem] py-1 text-[clamp(0.69rem,0.74vw,0.78rem)] uppercase leading-none tracking-[0.11em] text-[rgba(43,33,24,0.9)] transition-colors duration-[250ms] ease-out max-[1366px]:text-[0.69rem] max-[1366px]:tracking-[0.095em] max-[1120px]:text-[0.64rem] max-[1120px]:tracking-[0.075em] max-md:min-h-11 max-md:text-[0.96rem] max-md:tracking-[0.15em] max-md:text-[var(--burgundy)] max-md:active:text-[var(--gold)]";

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-[100] flex min-h-[70px] items-center justify-between gap-[clamp(1.4rem,3.2vw,4rem)] px-[clamp(1.35rem,4.5vw,5rem)] max-[1366px]:gap-[clamp(1rem,2vw,2rem)] max-[1366px]:px-[clamp(1.25rem,3.4vw,3.25rem)] max-[1120px]:min-h-[66px] max-md:min-h-[66px] max-md:px-[1.15rem]"
    >
      <a
        href="#home"
        className="brand-logo relative z-[103] shrink-0 whitespace-nowrap text-[clamp(1.32rem,1.9vw,1.85rem)] leading-none tracking-[0.035em] text-[var(--burgundy)] max-[1120px]:text-[1.28rem] max-md:text-[1.35rem]"
        onClick={closeNav}
      >
        Laila Cuisine
      </a>

      <button
        type="button"
        id="nav-toggle"
        className="burger max-md:relative max-md:z-[103] max-md:grid max-md:cursor-pointer max-md:gap-[5px] max-md:p-[0.55rem]"
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-controls="primary-navigation"
        aria-expanded={navOpen}
        onClick={() => setNavOpen((open) => !open)}
      >
        <span
          className={`max-md:h-0.5 max-md:w-[30px] max-md:bg-[var(--burgundy)] max-md:transition-[transform,opacity] max-md:duration-[250ms] max-md:ease-out ${
            navOpen ? "max-md:[transform:rotate(45deg)_translate(5px,5px)]" : ""
          }`}
        ></span>
        <span
          className={`max-md:h-0.5 max-md:w-[30px] max-md:bg-[var(--burgundy)] max-md:transition-[transform,opacity] max-md:duration-[250ms] max-md:ease-out ${
            navOpen ? "max-md:opacity-0" : ""
          }`}
        ></span>
        <span
          className={`max-md:h-0.5 max-md:w-[30px] max-md:bg-[var(--burgundy)] max-md:transition-[transform,opacity] max-md:duration-[250ms] max-md:ease-out ${
            navOpen ? "max-md:[transform:rotate(-45deg)_translate(5px,-5px)]" : ""
          }`}
        ></span>
      </button>

      <ul
        id="primary-navigation"
        className={`nav-links m-0 flex min-w-0 flex-1 list-none items-center justify-end gap-[clamp(0.72rem,1.35vw,1.35rem)] p-0 max-[1366px]:gap-[clamp(0.58rem,0.95vw,1rem)] max-[1120px]:gap-[0.62rem] max-md:fixed max-md:inset-0 max-md:z-[101] max-md:min-h-[100svh] max-md:w-full max-md:flex-col max-md:justify-center max-md:gap-[1.15rem] max-md:px-[1.25rem] max-md:pt-[6.25rem] max-md:pb-[2.25rem] max-md:transition-transform max-md:duration-[350ms] max-md:ease-out ${
          navOpen ? "max-md:translate-y-0" : "max-md:translate-y-[-100%]"
        }`}
      >
        <li><a className={navLinkClass} href="#about" onClick={closeNav}>Story</a></li>
        <li><a className={navLinkClass} href="#map" onClick={closeNav}>Zahle</a></li>
        <li><a className={navLinkClass} href="#menu" onClick={closeNav}>Menu</a></li>
        <li><a className={navLinkClass} href="#special-orders" onClick={closeNav}>Special Orders</a></li>
        <li><a className={navLinkClass} href="#reservation" onClick={closeNav}>Reservation</a></li>
        <li><a className={navLinkClass} href="#contact" onClick={closeNav}>Contact</a></li>
      </ul>
    </nav>
  );
}
