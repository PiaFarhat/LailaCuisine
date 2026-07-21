import Link from "next/link";
import { navigationItems, siteConfig } from "../config/site";
import Container from "./Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate grid min-h-[320px] place-content-center overflow-hidden py-[4.5rem] text-center text-[var(--ivory)] max-md:min-h-[360px] max-md:py-[4.5rem] max-[480px]:min-h-[340px] max-[480px]:py-16">
      <Container>
        <div className="footer-brand mx-auto mb-10 max-w-[720px] min-w-0">
          <p className="mb-[0.8rem] text-[clamp(2rem,4vw,3.4rem)] text-[var(--gold)]">
            {siteConfig.name}
          </p>
          <p className="break-words text-[rgba(255,253,248,0.76)] leading-[1.8] max-md:mx-auto max-md:max-w-md">
            A tribute to homemade Lebanese food, Zahle hospitality, and the warmth
            of family gatherings.
          </p>
        </div>

        <div className="footer-grid mx-auto mb-10 grid max-w-[1050px] grid-cols-1 gap-[1.6rem] text-center md:grid-cols-3 md:gap-8">
          <div className="min-w-0">
            <h3 className="mb-[0.8rem] text-[1.1rem] text-[var(--gold)]">
              Visit Us
            </h3>
            <p className="break-words">{siteConfig.address}</p>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Location
            </a>
          </div>

          <div className="min-w-0">
            <h3 className="mb-[0.8rem] text-[1.1rem] text-[var(--gold)]">
              Contact
            </h3>
            <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            <a className="break-words" href={siteConfig.emailHref}>{siteConfig.email}</a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>

          <div className="min-w-0">
            <h3 className="mb-[0.8rem] text-[1.1rem] text-[var(--gold)]">
              Opening Hours
            </h3>
            {siteConfig.openingHours.map((hours) => (
              <div key={hours.label}>
                <p>{hours.label}</p>
                <p>{hours.value}</p>
              </div>
            ))}
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="footer-nav mx-auto mb-8 flex max-w-[920px] flex-wrap justify-center gap-x-5 gap-y-2 px-1"
        >
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer-bottom border-t border-[rgba(198,161,91,0.35)] pt-6">
          <p className="break-words text-[0.9rem] text-[rgba(255,253,248,0.6)] max-md:mx-auto max-md:max-w-md">
            Copyright {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
