"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Alert, Button, Select, Textarea } from "@material-tailwind/react";
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

const fieldClass =
  "grid gap-2 text-[0.84rem] font-semibold tracking-[0.055em] text-[var(--wine)]";
const messageSlotClass = "min-h-[1.25rem] text-[0.78rem] leading-[1.35]";
const inputClass =
  "min-h-[52px] rounded-none border border-[rgba(198,161,91,0.42)] bg-[rgba(255,253,248,0.96)] px-4 py-3 text-[1rem] text-[var(--charcoal)] shadow-[inset_0_1px_0_rgba(255,253,248,0.9)] transition-[border-color,box-shadow,background-color] duration-200 ease-out placeholder:text-[rgba(43,33,24,0.44)] hover:border-[rgba(198,161,91,0.64)] focus:border-[var(--gold)] focus:bg-[var(--ivory)] focus:outline-none focus:shadow-[0_0_0_4px_rgba(198,161,91,0.16)] data-[error=true]:border-[var(--burgundy)]";
const fullWidthFieldClass = `${fieldClass} md:col-span-2`;
const selectTriggerClass = `${inputClass} flex items-center justify-between text-left`;
const selectListClass =
  "z-[120] max-h-[min(18rem,70vh)] overflow-y-auto rounded-none border border-[rgba(198,161,91,0.42)] bg-[var(--ivory)] p-1 text-[var(--charcoal)] shadow-[0_18px_45px_rgba(43,21,18,0.16)]";
const selectOptionClass =
  "rounded-none px-3 py-2 text-left text-[0.95rem] text-[var(--charcoal)] transition-[background-color,color] duration-200 ease-out hover:bg-[rgba(198,161,91,0.16)] focus:bg-[rgba(198,161,91,0.16)] data-[selected=true]:bg-[rgba(106,30,58,0.1)] data-[selected=true]:text-[var(--burgundy)]";
const alertClass =
  "mb-4 rounded-none border border-[rgba(106,30,58,0.22)] bg-[rgba(106,30,58,0.08)] px-4 py-3 text-[0.9rem] font-semibold leading-[1.5] text-[var(--burgundy)] shadow-none";
const buttonClass =
  "!m-0 !min-h-[50px] !rounded-none !border !border-[var(--burgundy)] !bg-[var(--burgundy)] !px-7 !py-3 !text-[0.82rem] !font-bold !uppercase !tracking-[0.12em] !text-[var(--ivory)] !shadow-none !transition-[background-color,border-color,box-shadow,color,opacity] !duration-200 !ease-out hover:!border-[var(--wine)] hover:!bg-[var(--wine)] hover:!shadow-[0_14px_30px_rgba(77,16,39,0.2)] motion-safe:hover:!-translate-y-0 disabled:!cursor-not-allowed disabled:!opacity-[0.72]";

export default function Reservation() {
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [specialDish, setSpecialDish] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

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
      setStatusMessage("Please correct the highlighted fields.");
      firstInvalidField?.focus();
      return;
    }

    setErrors({});
    setStatusMessage("");
  };

  return (
    <section
      id="reservation"
      className="relative isolate grid place-items-center overflow-hidden bg-[linear-gradient(rgba(247,240,227,0.95),rgba(247,240,227,0.99))] px-[clamp(1.25rem,7vw,6rem)] py-[clamp(3.25rem,5.5vw,5.5rem)] [scroll-margin-top:82px] max-md:block max-md:px-0 max-md:py-14"
    >
      <Image
        src="/images/table.png"
        alt="Romantic illustrated Lebanese terrace prepared for reservation"
        width={1600}
        height={900}
        className="absolute inset-0 z-[-3] h-full w-full object-cover object-center opacity-[0.16] saturate-[0.85] mix-blend-multiply"
      />

      <div className="relative w-[min(860px,92vw)] overflow-hidden border border-[rgba(198,161,91,0.4)] bg-[linear-gradient(135deg,rgba(255,253,248,0.98),rgba(248,244,236,0.93))] p-[clamp(1.6rem,3.4vw,3rem)] shadow-[0_20px_58px_rgba(43,21,18,0.12),inset_0_1px_0_rgba(255,253,248,0.9)] max-md:z-[2] max-md:mx-auto max-md:w-[min(92%,42rem)]">
        <p className="eyebrow mb-3">Book Your Table</p>
        <h2 className="mb-6">Reserve Your Evening</h2>

        <div className="min-h-[3.75rem]" role="status" aria-live="polite">
          <Alert
            open={Boolean(statusMessage)}
            className={alertClass}
            role="alert"
          >
            {statusMessage}
          </Alert>
        </div>

        <form
          className="relative z-[1] grid grid-cols-2 gap-x-4 gap-y-2 max-md:grid-cols-1"
          onSubmit={handleSubmit}
          noValidate
        >
          {reservationFields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              required
              error={errors[field.name]}
              className={fieldClass}
              inputClassName={inputClass}
              messageClassName={messageSlotClass}
              onBlur={(event) => updateFieldError(event.currentTarget)}
              onInput={handleFieldChange}
            />
          ))}

          <div className={fieldClass}>
            <label id="specialDish-label">Special Dish Request</label>
            <Select
              name="specialDish"
              value={specialDish}
              onValueChange={setSpecialDish}
              placement="bottom-start"
              aria-labelledby="specialDish-label"
            >
              <Select.Trigger
                className={selectTriggerClass}
                placeholder="No special dish"
              />
              <Select.List className={selectListClass}>
                <Select.Option className={selectOptionClass} value="">
                  No special dish
                </Select.Option>
                <Select.Option className={selectOptionClass} value="fweregh">
                  Fweregh
                </Select.Option>
                <Select.Option className={selectOptionClass} value="sayadiyeh">
                  Sayadiyeh
                </Select.Option>
                <Select.Option className={selectOptionClass} value="stuffed-lamb">
                  Stuffed Lamb
                </Select.Option>
                <Select.Option className={selectOptionClass} value="makloubeh">
                  Makloubeh
                </Select.Option>
                <Select.Option className={selectOptionClass} value="moghrabieh">
                  Moghrabieh
                </Select.Option>
                <Select.Option className={selectOptionClass} value="ouzi">
                  Ouzi
                </Select.Option>
              </Select.List>
            </Select>
            <span className={messageSlotClass} aria-hidden="true">
              &nbsp;
            </span>
          </div>

          <div className={fullWidthFieldClass}>
            <label htmlFor="reservation-notes">Notes</label>
            <Textarea
              id="reservation-notes"
              className={`${inputClass} min-h-[128px] resize-y`}
              name="notes"
              placeholder="Tell us about allergies, preferred seating, or special requests"
            />
            <span className={messageSlotClass} aria-hidden="true">
              &nbsp;
            </span>
          </div>

          <div className="md:col-span-2">
            <div className="min-h-[1.4rem]" aria-live="polite" role="status" />
            <Button
              className={buttonClass}
              type="submit"
              aria-busy="false"
            >
              Submit Reservation
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
