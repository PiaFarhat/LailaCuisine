"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Alert, Button, Textarea } from "@material-tailwind/react";
import Container from "./Container";
import FormField from "./FormField";

type ReservationField = "name" | "email" | "phone" | "date" | "time" | "guests";
type ReservationErrors = Partial<Record<ReservationField, string>>;
type ReservationValues = Record<ReservationField, string>;
type ReservationTouched = Partial<Record<ReservationField, boolean>>;
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
    placeholder: "961XXXXXXXX",
    autoComplete: "tel",
    inputMode: "numeric",
    pattern: "[0-9]{7,15}",
    dataLabel: "Phone number",
  },
  {
    name: "date",
    label: "Reservation Date",
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

const initialValues: ReservationValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
};

const reservationTimeOptions = [
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:00", label: "9:00 PM" },
  { value: "21:30", label: "9:30 PM" },
  { value: "22:00", label: "10:00 PM" },
  { value: "22:30", label: "10:30 PM" },
  { value: "23:00", label: "11:00 PM" },
  { value: "23:30", label: "11:30 PM" },
  { value: "00:00", label: "12:00 AM" },
];

const digitsOnly = (value: string) => value.replace(/\D/g, "");

const formatDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const fieldClass =
  "grid min-w-0 gap-2 text-[0.84rem] font-semibold tracking-[0.055em] text-[var(--wine)]";
const messageSlotClass = "min-h-[1.25rem] text-[0.78rem] leading-[1.35]";
const inputClass =
  "min-h-[52px] rounded-none border border-[rgba(198,161,91,0.42)] bg-[rgba(255,253,248,0.96)] px-4 py-3 text-[1rem] text-[var(--charcoal)] shadow-[inset_0_1px_0_rgba(255,253,248,0.9)] transition-[border-color,box-shadow,background-color] duration-200 ease-out placeholder:text-[rgba(43,33,24,0.44)] hover:border-[rgba(198,161,91,0.64)] focus:border-[var(--gold)] focus:bg-[var(--ivory)] focus:outline-none focus:shadow-[0_0_0_4px_rgba(198,161,91,0.16)] data-[error=true]:border-[var(--burgundy)]";
const fullWidthFieldClass = `${fieldClass} md:col-span-2`;
const selectClass = `${inputClass} appearance-none bg-[linear-gradient(45deg,transparent_50%,var(--wine)_50%),linear-gradient(135deg,var(--wine)_50%,transparent_50%),linear-gradient(to_right,rgba(198,161,91,0.32),rgba(198,161,91,0.32))] bg-[length:7px_7px,7px_7px,1px_1.7rem] bg-[position:calc(100%-1.35rem)_50%,calc(100%-0.95rem)_50%,calc(100%-2.55rem)_50%] bg-no-repeat pr-12`;
const alertClass =
  "mb-4 rounded-none border border-[rgba(106,30,58,0.22)] bg-[rgba(106,30,58,0.08)] px-4 py-3 text-[0.9rem] font-semibold leading-[1.5] text-[var(--burgundy)] shadow-none";
const buttonClass =
  "!m-0 !min-h-[50px] !w-full sm:!w-auto !whitespace-normal !rounded-none !border !border-[var(--burgundy)] !bg-[var(--burgundy)] !px-7 !py-3 !text-center !text-[0.82rem] !font-bold !uppercase !tracking-[0.12em] !text-[var(--ivory)] !shadow-none !transition-[background-color,border-color,box-shadow,color,opacity] !duration-200 !ease-out hover:!border-[var(--wine)] hover:!bg-[var(--wine)] hover:!shadow-[0_14px_30px_rgba(77,16,39,0.2)] motion-safe:hover:!-translate-y-0 disabled:!cursor-not-allowed disabled:!opacity-[0.72]";

export default function Reservation() {
  const [values, setValues] = useState<ReservationValues>(initialValues);
  const [touched, setTouched] = useState<ReservationTouched>({});
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [specialDish, setSpecialDish] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMinDate(formatDateInputValue(getToday()));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const validateField = (name: ReservationField, value: string) => {
    const field = reservationFields.find((item) => item.name === name);
    const label = field?.dataLabel ?? "This field";
    const trimmedValue = value.trim();

    if (!trimmedValue) return `${label} is required.`;
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return "Enter a valid email address.";
    }
    if (name === "phone" && !/^\d{7,15}$/.test(trimmedValue)) {
      return "Enter a valid phone number using 7 to 15 digits.";
    }
    if (name === "date" && minDate && trimmedValue < minDate) {
      return "Choose today or a future reservation date.";
    }
    if (
      name === "time" &&
      !reservationTimeOptions.some((option) => option.value === trimmedValue)
    ) {
      return "Choose a reservation time between 12:00 PM and 12:00 AM.";
    }
    if (name === "guests" && Number(trimmedValue) < 1) {
      return "Please enter at least one guest.";
    }
    return "";
  };

  const validateForm = (nextValues: ReservationValues) =>
    reservationFields.reduce<ReservationErrors>((nextErrors, field) => {
      const error = validateField(field.name, nextValues[field.name]);
      if (error) nextErrors[field.name] = error;
      return nextErrors;
    }, {});

  const updateFieldError = (name: ReservationField, value: string) => {
    const error = validateField(name, value);
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

  const handleFieldChange = (name: ReservationField, value: string) => {
    const nextValue = name === "phone" ? digitsOnly(value) : value;

    setValues((current) => ({ ...current, [name]: nextValue }));
    if (errors[name] && !validateField(name, nextValue)) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleFieldBlur = (name: ReservationField) => {
    setTouched((current) => ({ ...current, [name]: true }));
    updateFieldError(name, values[name]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextErrors = validateForm(values);
    const firstErrorName = Object.keys(nextErrors)[0] as ReservationField | undefined;

    if (Object.keys(nextErrors).length) {
      event.preventDefault();
      setSubmitted(true);
      setErrors(nextErrors);
      setStatusMessage("Please correct the highlighted fields.");
      if (firstErrorName) {
        const field =
          event.currentTarget.querySelector<HTMLElement>(
            `[data-form-field="${firstErrorName}"]`,
          ) ?? event.currentTarget.elements.namedItem(firstErrorName);
        if (field instanceof HTMLElement) field.focus();
      }
      return;
    }

    setSubmitted(true);
    setErrors({});
    setStatusMessage("");
  };

  return (
    <section
      id="reservation"
      className="relative isolate grid place-items-center overflow-hidden bg-[linear-gradient(rgba(247,240,227,0.95),rgba(247,240,227,0.99))] py-12 [scroll-margin-top:82px] sm:py-16 lg:py-[clamp(3.25rem,5.5vw,5.5rem)]"
    >
      <Image
        src="/images/table.png"
        alt="Romantic illustrated Lebanese terrace prepared for reservation"
        width={1600}
        height={900}
        className="pointer-events-none absolute inset-0 z-[-3] h-full w-full object-cover object-center opacity-[0.16] saturate-[0.85] mix-blend-multiply"
        aria-hidden="true"
      />

      <Container className="relative z-[2]">
        <div className="reservation-panel mx-auto w-full max-w-[860px] overflow-hidden border border-[rgba(198,161,91,0.4)] bg-[linear-gradient(135deg,rgba(255,253,248,0.98),rgba(248,244,236,0.93))] p-[clamp(1.25rem,4vw,3rem)] shadow-[0_20px_58px_rgba(43,21,18,0.12),inset_0_1px_0_rgba(255,253,248,0.9)]">
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
            className="relative z-[1] grid grid-cols-1 gap-6 md:grid-cols-2"
            onSubmit={handleSubmit}
            noValidate
          >
            {reservationFields.map((field) => {
              const fieldMin = field.name === "date" ? minDate : field.min;
              const visibleError =
                touched[field.name] || submitted ? errors[field.name] : undefined;

              if (field.name === "time") {
                return (
                  <div key={field.name} className={fieldClass}>
                    <label htmlFor="time-field">{field.label}</label>
                    <select
                      id="time-field"
                      name={field.name}
                      value={values.time}
                      required
                      className={selectClass}
                      aria-invalid={Boolean(visibleError)}
                      aria-describedby={visibleError ? "time-error" : undefined}
                      data-form-field={field.name}
                      data-error={Boolean(visibleError)}
                      onBlur={() => handleFieldBlur(field.name)}
                      onChange={(event) =>
                        handleFieldChange(field.name, event.target.value)
                      }
                    >
                      <option value="">Choose a time</option>
                      {reservationTimeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className={messageSlotClass}>
                      {visibleError ? (
                        <span
                          id="time-error"
                          className="form-error inline-block transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:translate-y-0"
                          role="alert"
                        >
                          {visibleError}
                        </span>
                      ) : (
                        <span aria-hidden="true">&nbsp;</span>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <FormField
                  key={field.name}
                  {...field}
                  min={fieldMin}
                  required
                  value={values[field.name]}
                  error={visibleError}
                  className={fieldClass}
                  inputClassName={inputClass}
                  messageClassName={messageSlotClass}
                  onBlur={() => handleFieldBlur(field.name)}
                  onChange={(event) =>
                    handleFieldChange(field.name, event.target.value)
                  }
                />
              );
            })}

            <div className={fullWidthFieldClass}>
              <label htmlFor="specialDish-field">Special Dish Request</label>
              <select
                id="specialDish-field"
                name="specialDish"
                value={specialDish}
                className={selectClass}
                onChange={(event) => setSpecialDish(event.currentTarget.value)}
              >
                <option value="">No special dish</option>
                <option value="fweregh">Fweregh</option>
                <option value="sayadiyeh">Sayadiyeh</option>
                <option value="stuffed-lamb">Stuffed Lamb</option>
                <option value="makloubeh">Makloubeh</option>
                <option value="moghrabieh">Moghrabieh</option>
                <option value="ouzi">Ouzi</option>
              </select>
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
              <Button className={buttonClass} type="submit" aria-busy="false">
                Submit Reservation
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
