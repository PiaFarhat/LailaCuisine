 import Image from "next/image";

export default function Reservation() {
    return(
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
    );
}