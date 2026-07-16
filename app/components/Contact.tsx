import { siteConfig } from "../config/site";
import Container from "./Container";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-[clamp(5rem,8vw,8rem)] text-center [scroll-margin-top:82px]"
    >
      <Container className="relative z-[2]">
        <p className="eyebrow mb-4">Visit Us</p>
        <h2 className="mb-6">Contact</h2>

        <address className="relative z-[2] mx-auto my-8 w-[min(680px,100%)] p-[1.35rem] not-italic max-[480px]:p-4">
          <p>{siteConfig.address}</p>
          <p>
            Phone:{" "}
            <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          </p>
          <p>
            Email: <a href={siteConfig.emailHref}>{siteConfig.email}</a>
          </p>
        </address>

        <div className="contact-actions relative z-[2] mb-12 flex flex-wrap justify-center gap-[0.8rem] max-md:flex-col">
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Location
          </a>

          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <a href={siteConfig.phoneHref}>Call Us</a>
        </div>

        <div className="relative z-[2]">
          <h3>Opening Hours</h3>
          {siteConfig.openingHours.map((hours) => (
            <div key={hours.label}>
              <p>{hours.label}</p>
              <p>{hours.value}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
