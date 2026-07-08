"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  return (
    <main>
      {/* Navbar */}
      <nav aria-label="Main navigation">
        <a href="#home" className="brand-logo" onClick={closeNav}>
          Laila Cuisine
        </a>

        <input
          type="checkbox"
          id="nav-toggle"
          className="nav-toggle"
          checked={navOpen}
          onChange={(event) => setNavOpen(event.target.checked)}
          aria-controls="primary-navigation"
          aria-expanded={navOpen}
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

      {/* Hero */}
      <section id="home">
        <Image
          src="/images/hero.png"
          alt="Illustrated Zahle terrace with arches, grapevines, and mountains"
          width={1600}
          height={900}
          priority
        />

        <div>
          <p>Homemade Lebanese Restaurant</p>
          <h1>Laila Cuisine</h1>
          <p>Authentic Lebanese cuisine inspired by Zahle.</p>

          <a href="#menu">Explore Menu</a>
          <a href="#reservation">Reserve a Table</a>
        </div>
      </section>

      {/* About / Story */}
      <section id="about">
        <div>
  <p>Our Story</p>

  <h2>
    A tribute to my grandmother, Laila, and the timeless hospitality of Zahle.
  </h2>

  <p>
    Laila Cuisine is named after my grandmother, whose table was always filled with
    family, friends, and homemade Lebanese dishes. Inspired by her warmth and the
    traditions of Zahle, we continue her legacy by serving food that brings people
    together.
  </p>
</div>
        <Image
          src="/images/about.png"
          alt="Illustration inspired by Zahle wine and poetry statue"
          width={900}
          height={700}
        />
      </section>

      {/* Zahle Map Story */}
      <section id="map">
        <div>
          <p>The Journey</p>
          <h2>From the vineyards of Zahle to Laila&apos;s table</h2>

          <p>
            Long before the first dish is served, the story begins in Zahle.
            Overlooking the city, Our Lady of Zahle stands as a quiet guardian while
            the Berdawni River winds through streets filled with laughter, family
            gatherings, and riverside tables. Inspired by these moments, Laila
            Cuisine was created to celebrate the generosity, traditions, and
            unforgettable flavors that have made Zahle the heart of Lebanese
            hospitality.
          </p>

          <a href="#reservation">Plan Your Visit</a>
        </div>

        <Image
          src="/images/ladyofzahle.png"
          alt="lady of zahle"
          width={1200}
          height={800}
        />
      </section>

      {/* Menu Intro */}
      <section id="menu">
        <p>Generous Lebanese Table</p>
        <h2>Menu</h2>

        <nav className="menu-categories" aria-label="Menu categories">
          <a href="#cold-mezze">Cold Mezze</a>
          <a href="#hot-mezze">Hot Mezze</a>
          <a href="#mashawi">Mashawi</a>
          <a href="#seafood">Seafood</a>
          <a href="#lebanese-dishes">Lebanese Dishes</a>
          <a href="#desserts">Desserts</a>
          <a href="#drinks">Drinks</a>
        </nav>

        <Image
          src="/images/menu.png"
          alt=""
          width={1200}
          height={250}
        />

        {/* Cold Mezze */}
        <section id="cold-mezze">
          <h3>Cold Mezze</h3>

          <article><h4>Hummus</h4><p>Chickpea dip with tahini, lemon, and olive oil.</p><span>$4</span></article>
          <article><h4>Baba Ghanouj</h4><p>Smoky eggplant with tahini, garlic, lemon, and olive oil.</p><span>$4</span></article>
          <article><h4>Labneh</h4><p>Fresh strained yogurt with olive oil and dried mint.</p><span>$3</span></article>
          <article><h4>Tabbouleh</h4><p>Parsley, tomato, bulgur, lemon, and olive oil.</p><span>$5</span></article>
          <article><h4>Fattoush</h4><p>Fresh vegetables, toasted bread, sumac, and pomegranate dressing.</p><span>$5</span></article>
          <article><h4>Wara2 Aarish B Zeit</h4><p>Vegetarian grape leaves with rice, herbs, and olive oil.</p><span>$7</span></article>
          <article><h4>Kebbeh Nayyeh</h4><p>Fresh raw kebbeh served with mint, onions, and olive oil.</p><span>$12</span></article>
        </section>

        <Image src="/images/menu.png" alt="" width={1200} height={250} />

        {/* Hot Mezze */}
        <section id="hot-mezze">
          <h3>Hot Mezze</h3>

          <article><h4>Ra2a2at Jebneh</h4><p>Crispy cheese rolls served hot.</p><span>6 pcs - $7</span></article>
          <article><h4>Sambousik Lahme</h4><p>Fried pastries filled with seasoned minced meat.</p><span>6 pcs - $7</span></article>
          <article><h4>Sambousik Jebneh</h4><p>Fried pastries filled with melted cheese.</p><span>6 pcs - $7</span></article>
          <article><h4>Kebbeh Krass</h4><p>Fried bulgur shells stuffed with spiced meat and onions.</p><span>6 pcs - $8</span></article>
          <article><h4>Batata Harra</h4><p>Spicy potatoes with garlic, coriander, and chili.</p><span>$5</span></article>
          <article><h4>Jawaneh</h4><p>Chicken wings with garlic, lemon, and coriander.</p><span>$8</span></article>
        </section>

        <Image src="/images/menu.png" alt="" width={1200} height={250} />

        {/* Mashawi */}
        <section id="mashawi">
          <h3>Mashawi by Kilo</h3>
          <p>Available starting from 1/2 kg.</p>

          <article><h4>Chicken Tawook</h4><p>Marinated grilled chicken skewers with garlic sauce.</p><span>1/2 kg $12 - 1 kg $22</span></article>
          <article><h4>Kafta</h4><p>Grilled minced meat with parsley, onions, and Lebanese spices.</p><span>1/2 kg $13 - 1 kg $24</span></article>
          <article><h4>Lahme Meshwiye</h4><p>Grilled meat skewers served with grilled vegetables.</p><span>1/2 kg $18 - 1 kg $34</span></article>
          <article><h4>Mixed Grill</h4><p>A generous mix of tawook, kafta, and grilled meat.</p><span>1/2 kg $17 - 1 kg $32</span></article>
        </section>

        <Image src="/images/menu.png" alt="" width={1200} height={250} />

        {/* Seafood */}
        <section id="seafood">
          <h3>Seafood</h3>

          <article><h4>Grilled Fish</h4><p>Fresh fish grilled with lemon, olive oil, and herbs.</p><span>Market price</span></article>
          <article><h4>Fried Fish</h4><p>Crispy fried fish served with tarator and salad.</p><span>Market price</span></article>
          <article><h4>Grilled Shrimps</h4><p>Shrimps grilled with garlic, lemon, and Lebanese spices.</p><span>$22</span></article>
          <article><h4>Fried Calamari</h4><p>Golden calamari rings served with lemon and sauce.</p><span>$18</span></article>
        </section>

        <Image src="/images/menu.png" alt="" width={1200} height={250} />

        {/* Lebanese Main Dishes */}
        <section id="lebanese-dishes">
          <h3>Lebanese Main Dishes</h3>

          <article><h4>Djej aa Riz</h4><p>Chicken and rice served with nuts and warm spices.</p><span>$18</span></article>
          <article><h4>Wara2 Aarish bi Lahme</h4><p>Grape leaves stuffed with rice and meat, cooked slowly.</p><span>$14</span></article>
          <article><h4>Kousa Mehshi</h4><p>Zucchini stuffed with rice and meat in tomato sauce.</p><span>$15</span></article>
          <article><h4>Mloukhieh</h4><p>Lebanese stew served with rice and chicken.</p><span>$16</span></article>
        </section>

        <Image src="/images/menu.png" alt="" width={1200} height={250} />

        {/* Desserts */}
        <section id="desserts">
          <h3>Desserts & Fruits</h3>

          <article><h4>Meghle</h4><p>Rice pudding with cinnamon, coconut, and nuts.</p><span>$5</span></article>
          <article><h4>Atayef</h4><p>Stuffed pancakes with cream or walnuts.</p><span>$6</span></article>
          <article><h4>Baklava</h4><p>Layered pastry with nuts and syrup.</p><span>$6</span></article>
          <article><h4>Seasonal Fruits</h4><p>Fresh fruit plate served Lebanese-style after the meal.</p><span>$8</span></article>
        </section>

        <Image src="/images/menu.png" alt="" width={1200} height={250} />

        {/* Drinks */}
        <section id="drinks">
          <h3>Drinks</h3>

          <article><h4>Water</h4><p>Served on the house.</p><span>Free</span></article>
          <article><h4>Soft Drinks</h4><p>Cola, 7UP, Pepsi, Mirinda, and classic soft drinks.</p><span>$2</span></article>
          <article><h4>Jallab</h4><p>Traditional Lebanese drink served with pine nuts.</p><span>$4</span></article>
          <article><h4>Ayran</h4><p>Cold yogurt drink served fresh.</p><span>$3</span></article>
          <article><h4>Fresh Lemonade</h4><p>Fresh lemon juice with mint.</p><span>$4</span></article>
          <article><h4>Ahwe</h4><p>Traditional Lebanese coffee served after food.</p><span>$2</span></article>
          <article><h4>Arak</h4><p>Traditional Lebanese anise drink served with mezze.</p><span>Glass $4 - Bottle $18</span></article>
          <article><h4>Beer</h4><p>Served chilled with grills and seafood.</p><span>$4</span></article>
          <article><h4>Whiskey</h4><p>Classic spirit available for guests.</p><span>Glass $6 - Bottle $45</span></article>
        </section>
      </section>

      {/* Special Orders */}
      <section id="special-orders">
        <p>By Reservation Only</p>
        <h2>Pre-Requested Traditional Dishes</h2>

        <p>
          These dishes require longer preparation and are made only by reservation.
          They are ideal for family gatherings and generous Lebanese tables.
        </p>

        <article><h3>Fweregh</h3><p>Traditional stuffed intestines, cleaned and prepared carefully.</p><span>Starting from $25</span></article>
        <article><h3>Sayadiyeh</h3><p>Fish and rice cooked with caramelized onions and warm spices.</p><span>Starting from $30</span></article>
        <article><h3>Stuffed Lamb</h3><p>Whole lamb stuffed with rice, meat, nuts, and spices.</p><span>Starting from $120</span></article>
        <article><h3>Makloubeh</h3><p>Layered rice dish with meat, vegetables, and spices.</p><span>Starting from $35</span></article>
        <article><h3>Moghrabieh</h3><p>Lebanese pearl couscous with chicken, chickpeas, onions, and spices.</p><span>Starting from $28</span></article>
        <article><h3>Ouzi</h3><p>Rice, meat, peas, and nuts served as pastry portions or family trays.</p><span>Starting from $40</span></article>
      </section>

      {/* Reservation */}
      <section id="reservation">
        <Image
          src="/images/table.png"
          alt="Romantic illustrated Lebanese terrace prepared for reservation"
          width={1600}
          height={900}
        />

        <div>
          <p>Book Your Table</p>
          <h2>Reserve Your Evening</h2>

          <form>
            <label>
              Full Name
              <input type="text" name="name" placeholder="Your full name" />
            </label>

            <label>
              Phone Number
              <input type="tel" name="phone" placeholder="+961 XX XXX XXX" />
            </label>

            <label>
              Date
              <input type="date" name="date" />
            </label>

            <label>
              Time
              <input type="time" name="time" />
            </label>

            <label>
              Number of Guests
              <input type="number" name="guests" min="1" placeholder="2" />
            </label>

            <label>
              Special Dish Request
              <select name="specialDish">
                <option value="">No special dish</option>
                <option value="fweregh">Fweregh</option>
                <option value="sayadiyeh">Sayadiyeh</option>
                <option value="stuffed-lamb">Stuffed Lamb</option>
                <option value="makloubeh">Makloubeh</option>
                <option value="moghrabieh">Moghrabieh</option>
                <option value="ouzi">Ouzi</option>
              </select>
            </label>

            <label>
              Notes
              <textarea
                name="notes"
                placeholder="Tell us about allergies, preferred seating, or special requests"
              ></textarea>
            </label>

            <button type="submit">Submit Reservation</button>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <p>Visit Us</p>
        <h2>Contact</h2>

        <address>
          <p>Zahle, Lebanon</p>
          <p>Phone: +961 XX XXX XXX</p>
          <p>Email: hello@lailacuisine.com</p>
        </address>

        <div>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            View Location
          </a>

          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>

          <a href="tel:+961XXXXXXXX">
            Call Us
          </a>
        </div>

        <div>
          <h3>Opening Hours</h3>
          <p>Monday - Sunday</p>
          <p>12:00 PM - 12:00 AM</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>Laila Cuisine</p>
        <p>Authentic Lebanese food from Zahle.</p>
        <p>Copyright 2026 Laila Cuisine. All rights reserved.</p>
      </footer>
    </main>
  );
}