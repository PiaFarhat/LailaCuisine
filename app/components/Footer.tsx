export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <p>Laila Cuisine</p>
        <p>
          A tribute to homemade Lebanese food, Zahle hospitality, and the warmth
          of family gatherings.
        </p>
      </div>

      <div className="footer-grid">
        <div>
          <h3>Visit Us</h3>
          <p>Zahle, Lebanon</p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            View Location
          </a>
        </div>

        <div>
          <h3>Contact</h3>
          <a href="tel:+961XXXXXXXX">+961 XX XXX XXX</a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>

        <div>
          <h3>Opening Hours</h3>
          <p>Monday - Sunday</p>
          <p>12:00 PM - 12:00 AM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2026 Laila Cuisine. All rights reserved.</p>
      </div>
    </footer>
  );
}