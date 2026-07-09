"use client";

import { useState } from "react";

export default function Navbar() {
   
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => setNavOpen(false);

  return (
    <nav aria-label="Main navigation">
      <a href="#home" className="brand-logo" onClick={closeNav}>
        Laila Cuisine
      </a>

      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle"
        checked={navOpen}
        onChange={(e) => setNavOpen(e.target.checked)}
      />

      <label
        htmlFor="nav-toggle"
        className="burger"
        aria-label={navOpen ? "Close menu" : "Open menu"}
      >
        <span></span>
        <span></span>
        <span></span>
      </label>

      <ul id="primary-navigation" className="nav-links">
        <li><a href="#about" onClick={closeNav}>Story</a></li>
        <li><a href="#map" onClick={closeNav}>Zahle</a></li>
        <li><a href="#menu" onClick={closeNav}>Menu</a></li>
        <li><a href="#special-orders" onClick={closeNav}>Special Orders</a></li>
        <li><a href="#reservation" onClick={closeNav}>Reservation</a></li>
        <li><a href="#contact" onClick={closeNav}>Contact</a></li>
      </ul>
    </nav>
  );
}