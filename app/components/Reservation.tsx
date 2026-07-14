"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

type ReservationField = "name" | "email" | "phone" | "date" | "time" | "guests";
type ReservationErrors = Partial<Record<ReservationField, string>>;

export default function Reservation() {
  const [errors, setErrors] = useState<ReservationErrors>({});

  const getError = (input: HTMLInputElement) => {
    if (input.name === "phone" && input.value.replace(/\D/g, "").length < 7) {
      return "Enter a valid phone number with at least 7 digits.";
    }
    if (input.validity.valid) return "";
    if (input.validity.valueMissing) return `${input.dataset.label} is required.`;
    if (input.validity.typeMismatch) return "Enter a valid email address.";
    if (input.validity.patternMismatch) return "Enter a valid phone number with at least 7 digits.";
    if (input.validity.rangeUnderflow) return "Please enter at least one guest.";
    return "Please check this field.";
  };

  const updateFieldError = (input: HTMLInputElement) => {
    const name = input.name as ReservationField;
    const error = getError(input);

    setErrors((current) => {
      if (!error && !current[name]) return current;
      if (!error) {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      }

      return { ...current, [name]: error };
    });
  };

  const handleFieldChange = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (errors[input.name as ReservationField]) updateFieldError(input);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextErrors: ReservationErrors = {};
    let firstInvalidField: HTMLInputElement | undefined;

    (["name", "email", "phone", "date", "time", "guests"] as ReservationField[]).forEach((name) => {
      const input = event.currentTarget.elements.namedItem(name);
      if (!(input instanceof HTMLInputElement)) return;

      const error = getError(input);
      if (!error) return;

      nextErrors[name] = error;
      firstInvalidField ??= input;
    });

    if (Object.keys(nextErrors).length) {
      event.preventDefault();
      setErrors(nextErrors);
      firstInvalidField?.focus();
      return;
    }

    setErrors({});
  };

  const fieldClass = (hasError: boolean) =>
    `form-field grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]${
      hasError ? " form-field--invalid" : ""
    }`;

  return (
    <section
      id="reservation"
      className="relative isolate grid min-h-screen place-items-center py-[clamp(5.5rem,8vw,8rem)] [scroll-margin-top:82px] max-md:block max-md:min-h-0 max-md:pt-0 max-md:pb-20"
    >
      <Image
        src="/images/table.png"
        alt="Romantic illustrated Lebanese terrace prepared for reservation"
        width={1600}
        height={900}
        className="absolute inset-0 z-[-3] h-full w-full object-cover object-center max-md:relative max-md:z-0 max-md:h-[62vh] max-md:min-h-[420px] max-[480px]:h-[54vh] max-[480px]:min-h-[360px]"
      />

      <div className="site-container relative z-[2] max-md:mt-[-4.5rem]">
        <div className="reservation-panel relative overflow-hidden p-[clamp(1.7rem,4vw,3.3rem)]">
          <p className="eyebrow mb-4">Book Your Table</p>
          <h2 className="mb-6">Reserve Your Evening</h2>

          <form className="relative z-[1] grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={fieldClass(Boolean(errors.name))}>
            Full Name
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              data-label="Full name"
              required
              onBlur={(event) => updateFieldError(event.currentTarget)}
              onInput={handleFieldChange}
            />
            {errors.name && <span id="name-error" className="form-error" role="alert">{errors.name}</span>}
          </label>

          <label className={fieldClass(Boolean(errors.email))}>
            Email Address
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              data-label="Email address"
              required
              onBlur={(event) => updateFieldError(event.currentTarget)}
              onInput={handleFieldChange}
            />
            {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email}</span>}
          </label>

          <label className={fieldClass(Boolean(errors.phone))}>
            Phone Number
            <input
              type="tel"
              name="phone"
              placeholder="+961 XX XXX XXX"
              autoComplete="tel"
              inputMode="tel"
              pattern="[0-9+() -]{7,}"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              data-label="Phone number"
              required
              onBlur={(event) => updateFieldError(event.currentTarget)}
              onInput={handleFieldChange}
            />
            {errors.phone && <span id="phone-error" className="form-error" role="alert">{errors.phone}</span>}
          </label>

          <label className={fieldClass(Boolean(errors.date))}>
            Date
            <input
              type="date"
              name="date"
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "date-error" : undefined}
              data-label="Reservation date"
              required
              onBlur={(event) => updateFieldError(event.currentTarget)}
              onInput={handleFieldChange}
            />
            {errors.date && <span id="date-error" className="form-error" role="alert">{errors.date}</span>}
          </label>

          <label className={fieldClass(Boolean(errors.time))}>
            Time
            <input
              type="time"
              name="time"
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? "time-error" : undefined}
              data-label="Reservation time"
              required
              onBlur={(event) => updateFieldError(event.currentTarget)}
              onInput={handleFieldChange}
            />
            {errors.time && <span id="time-error" className="form-error" role="alert">{errors.time}</span>}
          </label>

          <label className={fieldClass(Boolean(errors.guests))}>
            Number of Guests
            <input
              type="number"
              name="guests"
              min="1"
              placeholder="2"
              inputMode="numeric"
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? "guests-error" : undefined}
              data-label="Number of guests"
              required
              onBlur={(event) => updateFieldError(event.currentTarget)}
              onInput={handleFieldChange}
            />
            {errors.guests && <span id="guests-error" className="form-error" role="alert">{errors.guests}</span>}
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
      </div>
    </section>
  );
}
