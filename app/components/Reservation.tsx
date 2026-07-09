import Image from "next/image";

export default function Reservation() {
  return (
    <section
      id="reservation"
      className="relative isolate grid min-h-screen place-items-center px-[clamp(1.25rem,7vw,6rem)] py-[clamp(5.5rem,8vw,8rem)] [scroll-margin-top:82px] max-md:block max-md:min-h-0 max-md:px-0 max-md:pt-0 max-md:pb-20"
    >
      <Image
        src="/images/table.png"
        alt="Romantic illustrated Lebanese terrace prepared for reservation"
        width={1600}
        height={900}
        className="absolute inset-0 z-[-3] h-full w-full object-cover object-center max-md:relative max-md:z-0 max-md:h-[62vh] max-md:min-h-[420px] max-[480px]:h-[54vh] max-[480px]:min-h-[360px]"
      />

      <div className="relative w-[min(740px,92vw)] overflow-hidden p-[clamp(1.7rem,4vw,3.3rem)] max-md:z-[2] max-md:mx-auto max-md:mt-[-4.5rem] max-md:w-[min(92%,40rem)]">
        <p className="eyebrow mb-4">Book Your Table</p>
        <h2 className="mb-6">Reserve Your Evening</h2>

        <form className="relative z-[1] grid gap-4">
          <label className="grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]">
            Full Name
            <input type="text" name="name" placeholder="Your full name" />
          </label>

          <label className="grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]">
            Phone Number
            <input type="tel" name="phone" placeholder="+961 XX XXX XXX" />
          </label>

          <label className="grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]">
            Date
            <input type="date" name="date" />
          </label>

          <label className="grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]">
            Time
            <input type="time" name="time" />
          </label>

          <label className="grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]">
            Number of Guests
            <input type="number" name="guests" min="1" placeholder="2" />
          </label>

          <label className="grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]">
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

          <label className="grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]">
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
  );
}
