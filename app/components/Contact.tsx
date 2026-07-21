import { siteConfig } from "../config/site";
import Container from "./Container";

export default function Contact() {
  const cardClass =
    "contact-card min-w-0 border border-[rgba(198,161,91,0.36)] bg-[linear-gradient(135deg,rgba(255,253,248,0.9),rgba(248,244,236,0.72))] p-[clamp(1.25rem,2.4vw,1.8rem)] text-left shadow-[0_18px_52px_rgba(77,16,39,0.08)] transition-[border-color,box-shadow,transform] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:border-[rgba(106,30,58,0.58)] focus-within:shadow-[0_24px_60px_rgba(77,16,39,0.13)] motion-safe:hover:-translate-y-1 hover:border-[rgba(198,161,91,0.72)] hover:shadow-[0_24px_60px_rgba(77,16,39,0.13)]";
  const linkClass =
    "break-words font-bold text-[var(--burgundy)] underline decoration-[rgba(198,161,91,0.58)] underline-offset-4 transition-colors hover:text-[var(--wine)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]";

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-[clamp(4.5rem,7vw,7rem)] [scroll-margin-top:82px]"
    >
      <Container className="relative z-[2]">
        <div className="mx-auto mb-[clamp(2rem,4vw,3rem)] max-w-[760px] text-center">
          <p className="eyebrow mb-4">Visit Us</p>
          <h2 className="mb-5">Contact</h2>
          <p className="mx-auto mt-0 mb-0 max-w-[42rem] text-[rgba(43,33,24,0.72)] max-[480px]:max-w-[18rem] max-[480px]:text-[0.94rem]">
            Find us in Zahle, call ahead for reservations, or send a note for
            private gatherings and special dishes.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)] gap-[clamp(1rem,2vw,1.5rem)] max-md:grid-cols-1">
          <address className={`${cardClass} not-italic`}>
            <h3 className="mb-4 text-[clamp(1.55rem,2.4vw,2.2rem)]">
              Laila Cuisine
            </h3>
            <div className="grid gap-4">
              <p className="m-0 break-words">
                <span className="block text-[0.76rem] font-bold uppercase tracking-[0.16em] text-[var(--olive)]">
                  Address
                </span>
                {siteConfig.address}
              </p>
              <p className="m-0">
                <span className="block text-[0.76rem] font-bold uppercase tracking-[0.16em] text-[var(--olive)]">
                  Phone
                </span>
                <a className={linkClass} href={siteConfig.phoneHref}>
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p className="m-0">
                <span className="block text-[0.76rem] font-bold uppercase tracking-[0.16em] text-[var(--olive)]">
                  Email
                </span>
                <a className={linkClass} href={siteConfig.emailHref}>
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </address>

          <div className={cardClass}>
            <h3 className="mb-4 text-[clamp(1.55rem,2.4vw,2.2rem)]">
              Opening Hours
            </h3>
            <div className="grid gap-3">
              {siteConfig.openingHours.map((hours) => (
                <div key={hours.label}>
                  <p className="m-0 font-bold text-[var(--wine)]">{hours.label}</p>
                  <p className="m-0 text-[rgba(43,33,24,0.74)]">{hours.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[clamp(1rem,2vw,1.5rem)] grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[clamp(1rem,2vw,1.5rem)] max-md:grid-cols-1">
          <div className={`${cardClass} min-h-[220px]`}>
            <p className="eyebrow mb-3">Location</p>
            <h3 className="mb-3 text-[clamp(1.55rem,2.4vw,2.2rem)]">
              Zahle Hospitality, Easy to Find
            </h3>
            <p className="m-0 max-w-[44rem] text-[rgba(43,33,24,0.72)]">
              Use the location link for directions, or call us before visiting for
              large tables and pre-requested traditional dishes.
            </p>
          </div>

          <div className="contact-actions flex flex-wrap justify-center gap-3 max-md:grid max-md:grid-cols-1">
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
              View Location
            </a>
            <a href={siteConfig.phoneHref}>Call Us</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
