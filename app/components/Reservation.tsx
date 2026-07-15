"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Container from "./Container";
import FormField from "./FormField";

type ReservationField = "name" | "email" | "phone" | "date" | "time" | "guests";
type ReservationErrors = Partial<Record<ReservationField, string>>;
type ReservationInput = {
  name: ReservationField;
  label: string;
  type: "text" | "email" | "tel" | "date" | "time" | "number";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "tel" | "numeric";
  pattern?: string;
  min?: string;
  dataLabel: string;
};

const reservationFields: ReservationInput[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Your full name",
    autoComplete: "name",
    dataLabel: "Full name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    dataLabel: "Email address",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+961 XX XXX XXX",
    autoComplete: "tel",
    inputMode: "tel",
    pattern: "[0-9+() -]{7,}",
    dataLabel: "Phone number",
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    dataLabel: "Reservation date",
  },
  {
    name: "time",
    label: "Time",
    type: "time",
    dataLabel: "Reservation time",
  },
  {
    name: "guests",
    label: "Number of Guests",
    type: "number",
    placeholder: "2",
    inputMode: "numeric",
    min: "1",
    dataLabel: "Number of guests",
  },
];

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

    reservationFields.forEach(({ name }) => {
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

  return (
    <section
      id="reservation"
      className="section-space-reservation relative isolate grid min-h-screen place-items-center [scroll-margin-top:82px] max-md:block max-md:min-h-0"
    >
      <Image
        src="/images/table.png"
        alt="Romantic illustrated Lebanese terrace prepared for reservation"
        width={1600}
        height={900}
        className="absolute inset-0 z-[-3] h-full w-full object-cover object-center max-md:relative max-md:z-0 max-md:h-[62vh] max-md:min-h-[420px] max-[480px]:h-[54vh] max-[480px]:min-h-[360px]"
      />

      <Container className="relative z-[2] max-md:mt-[-4.5rem]">
        <div className="reservation-panel relative overflow-hidden p-[clamp(1.7rem,4vw,3.3rem)]">
          <p className="eyebrow mb-4">Book Your Table</p>
          <h2 className="mb-6">Reserve Your Evening</h2>

          <form
            className="relative z-[1] grid gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            {reservationFields.map((field) => (
              <FormField
                key={field.name}
                {...field}
                required
                error={errors[field.name]}
                onBlur={(event) => updateFieldError(event.currentTarget)}
                onInput={handleFieldChange}
              />
            ))}

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
      </Container>
    </section>
  );
}
