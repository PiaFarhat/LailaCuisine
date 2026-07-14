export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-[clamp(5rem,8vw,8rem)] text-center [scroll-margin-top:82px] max-lg:py-[5.5rem] max-[480px]:py-[4.5rem]"
    >
      <div className="site-container relative z-[2]">
        <p className="eyebrow mb-4">Visit Us</p>
        <h2 className="mb-6">Contact</h2>

      <address className="relative z-[2] mx-auto my-8 w-[min(680px,100%)] p-[1.35rem] not-italic max-[480px]:p-4">
        <p>Zahle, Lebanon</p>
        <p>Phone: +961 XX XXX XXX</p>
        <p>Email: hello@lailacuisine.com</p>
      </address>

      <div className="relative z-[2] mb-12 flex flex-wrap justify-center gap-[0.8rem] max-md:flex-col">
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

        <div className="relative z-[2]">
          <h3>Opening Hours</h3>
          <p>Monday - Sunday</p>
          <p>12:00 PM - 12:00 AM</p>
        </div>
      </div>
    </section>
  );
}
