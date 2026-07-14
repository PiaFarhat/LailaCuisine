export default function Footer() {
  return (
    <footer className="relative isolate grid min-h-[320px] place-content-center overflow-hidden py-[4.5rem] text-center text-[var(--ivory)] max-md:min-h-[360px] max-md:py-[4.5rem] max-[480px]:min-h-[340px] max-[480px]:py-16">
      <div className="site-container">
        <div className="footer-brand mx-auto mb-10 max-w-[720px]">
          <p className="mb-[0.8rem] text-[clamp(2rem,4vw,3.4rem)] text-[var(--gold)]">
            Laila Cuisine
          </p>
          <p className="text-[rgba(255,253,248,0.76)] leading-[1.8] max-md:mx-auto max-md:max-w-md">
            A tribute to homemade Lebanese food, Zahle hospitality, and the warmth
            of family gatherings.
          </p>
        </div>

        <div className="footer-grid mx-auto mb-10 grid max-w-[1050px] grid-cols-3 gap-8 text-center max-md:grid-cols-1 max-md:gap-[1.6rem]">
        <div>
          <h3 className="mb-[0.8rem] text-[1.1rem] text-[var(--gold)]">Visit Us</h3>
          <p>Zahle, Lebanon</p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            View Location
          </a>
        </div>

        <div>
          <h3 className="mb-[0.8rem] text-[1.1rem] text-[var(--gold)]">Contact</h3>
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
          <h3 className="mb-[0.8rem] text-[1.1rem] text-[var(--gold)]">Opening Hours</h3>
          <p>Monday - Sunday</p>
          <p>12:00 PM - 12:00 AM</p>
        </div>
        </div>

        <div className="footer-bottom border-t border-[rgba(198,161,91,0.35)] pt-6">
          <p className="text-[0.9rem] text-[rgba(255,253,248,0.6)] max-md:mx-auto max-md:max-w-md">
            Copyright 2026 Laila Cuisine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
