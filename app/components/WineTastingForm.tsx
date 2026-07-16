"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Alert, Button, Checkbox, Input, Textarea } from "@material-tailwind/react";
import { wineTastingConfig } from "../config/wineTasting";
import {
  submitWineTastingReservation,
  type WineTastingReservationPayload,
} from "../services/wineTastingReservations";

type WineTastingField =
  | "fullName"
  | "email"
  | "phone"
  | "preferredSaturday"
  | "guests"
  | "legalAgeConfirmed";

type WineTastingErrors = Partial<Record<WineTastingField, string>>;
type SubmitState = "idle" | "loading" | "success" | "error";

type ErrorSlotProps = {
  id: string;
  error?: string;
  tall?: boolean;
};

function ErrorSlot({ id, error, tall = false }: ErrorSlotProps) {
  return (
    <div
      className={[
        tall ? "min-h-[2.5rem]" : "min-h-[1.25rem]",
        "text-[0.78rem] leading-[1.35]",
      ].join(" ")}
    >
      {error ? (
        <span
          id={id}
          className="form-error inline-block transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:translate-y-0"
          role="alert"
        >
          {error}
        </span>
      ) : (
        <span aria-hidden="true">&nbsp;</span>
      )}
    </div>
  );
}

const initialForm: WineTastingReservationPayload = {
  fullName: "",
  email: "",
  phone: "",
  preferredSaturday: "",
  guests: "2",
  dietaryRestrictions: "",
  nonAlcoholicOption: false,
  notes: "",
  legalAgeConfirmed: false,
};

const formatDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

const isSaturday = (value: string) => {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  return date.getDay() === 6;
};

const isFutureDate = (value: string) => {
  if (!value) return false;
  const selected = new Date(`${value}T00:00:00`);
  return selected >= getTomorrow();
};

const getPreferredSaturdayError = (value: string) => {
  if (!value) return "Choose a preferred Saturday.";
  if (!isFutureDate(value)) return "Choose a future Saturday.";
  if (!isSaturday(value)) return "Wine tasting is available on Saturdays only.";
  return "";
};

export default function WineTastingForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<WineTastingErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMinDate(formatDateInputValue(getTomorrow()));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const updateForm = <Field extends keyof WineTastingReservationPayload>(
    field: Field,
    value: WineTastingReservationPayload[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitState("idle");
    setStatusMessage("");
    if (errors[field as WineTastingField]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[field as WineTastingField];
        return nextErrors;
      });
    }
  };

  const updatePreferredSaturday = (value: string) => {
    setForm((current) => ({ ...current, preferredSaturday: value }));
    setSubmitState("idle");
    setStatusMessage("");

    const error = getPreferredSaturdayError(value);
    setErrors((current) => {
      const nextErrors = { ...current };
      if (error) {
        nextErrors.preferredSaturday = error;
      } else {
        delete nextErrors.preferredSaturday;
      }
      return nextErrors;
    });
  };

  const validate = () => {
    const nextErrors: WineTastingErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Enter a valid phone number with at least 7 digits.";
    }

    const preferredSaturdayError = getPreferredSaturdayError(form.preferredSaturday);
    if (preferredSaturdayError) nextErrors.preferredSaturday = preferredSaturdayError;

    const guestCount = Number(form.guests);
    if (!Number.isInteger(guestCount) || guestCount < 1) {
      nextErrors.guests = "Please enter at least one guest.";
    } else if (guestCount > wineTastingConfig.maxGuests) {
      nextErrors.guests = `For now, please request no more than ${wineTastingConfig.maxGuests} guests.`;
    }

    if (!form.legalAgeConfirmed) {
      nextErrors.legalAgeConfirmed =
        "Confirm that all participants meet the applicable legal drinking-age requirement.";
    }

    return nextErrors;
  };

  const focusFirstError = (nextErrors: WineTastingErrors) => {
    const firstErrorName = Object.keys(nextErrors)[0];
    if (!firstErrorName) return;
    const field = document.querySelector<HTMLElement>(`[name="${firstErrorName}"]`);
    field?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "loading") return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSubmitState("idle");
      setStatusMessage("Please correct the highlighted fields.");
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});
    setSubmitState("loading");
    setStatusMessage("Sending your wine-tasting request...");

    try {
      const result = await submitWineTastingReservation(form);
      setSubmitState(result.ok ? "success" : "error");
      setStatusMessage(result.message);
    } catch {
      setSubmitState("error");
      setStatusMessage(
        "We could not send your request right now. Please contact Laila Cuisine directly.",
      );
    }
  };

  const fieldClass =
    "grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]";
  const inputClass =
    "min-h-[52px] rounded-none border border-[rgba(198,161,91,0.42)] bg-[rgba(255,253,248,0.96)] px-4 py-3 text-[1rem] text-[var(--charcoal)] shadow-[inset_0_1px_0_rgba(255,253,248,0.9)] transition-[border-color,box-shadow,background-color] duration-200 ease-out placeholder:text-[rgba(43,33,24,0.44)] hover:border-[rgba(198,161,91,0.64)] focus:border-[var(--gold)] focus:bg-[var(--ivory)] focus:outline-none focus:shadow-[0_0_0_4px_rgba(198,161,91,0.16)] data-[error=true]:border-[var(--burgundy)]";
  const checkboxClass =
    "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-[0.55rem] text-[0.86rem] leading-[1.6] tracking-[0.06em] text-[rgba(43,21,18,0.76)] max-[480px]:text-[0.82rem] max-[480px]:tracking-[0.03em]";
  const requiredCheckboxClass = `${checkboxClass} font-bold text-[var(--wine)]`;
  const checkboxBoxClass =
    "mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-none border border-[rgba(198,161,91,0.72)] bg-[rgba(255,253,248,0.92)] text-[var(--ivory)] transition-[background-color,border-color,box-shadow] duration-200 ease-out data-[checked=true]:border-[var(--burgundy)] data-[checked=true]:bg-[var(--burgundy)]";
  const alertClass = [
    "rounded-none border px-4 py-3 text-[0.9rem] font-bold leading-[1.5] shadow-none transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:translate-y-0",
    submitState === "success"
      ? "border-[rgba(85,107,47,0.28)] bg-[rgba(85,107,47,0.1)] text-[var(--olive)]"
      : submitState === "error"
        ? "border-[rgba(106,30,58,0.24)] bg-[rgba(106,30,58,0.08)] text-[var(--burgundy)]"
        : "border-[rgba(198,161,91,0.32)] bg-[rgba(198,161,91,0.12)] text-[rgba(43,21,18,0.72)]",
  ].join(" ");
  const buttonClass =
    "route-cta mx-0 min-h-[50px] justify-self-start rounded-none border border-[var(--burgundy)] bg-[var(--burgundy)] px-7 py-3 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-[var(--ivory)] shadow-none transition-[background-color,border-color,box-shadow,color,opacity] duration-200 ease-out hover:border-[var(--wine)] hover:bg-[var(--wine)] hover:shadow-[0_14px_30px_rgba(77,16,39,0.2)] motion-safe:hover:-translate-y-0 disabled:cursor-wait disabled:opacity-[0.72] max-md:justify-self-stretch";

  return (
    <form
      className="relative grid gap-4 border border-[rgba(198,161,91,0.48)] bg-[linear-gradient(135deg,rgba(255,253,248,0.92),rgba(248,244,236,0.76))] p-[clamp(1.35rem,3vw,2.2rem)] shadow-[0_30px_80px_rgba(20,9,7,0.14),inset_0_1px_0_rgba(255,253,248,0.82)] max-[480px]:p-[1.15rem]"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className={fieldClass}>
          <label htmlFor="wine-fullName">Full Name</label>
          <Input
            id="wine-fullName"
            className={inputClass}
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            isError={Boolean(errors.fullName)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "wine-fullName-error" : undefined}
            onChange={(event) => updateForm("fullName", event.target.value)}
          />
          <ErrorSlot id="wine-fullName-error" error={errors.fullName} />
        </div>

        <div className={fieldClass}>
          <label htmlFor="wine-email">Email</label>
          <Input
            id="wine-email"
            className={inputClass}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            isError={Boolean(errors.email)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "wine-email-error" : undefined}
            onChange={(event) => updateForm("email", event.target.value)}
          />
          <ErrorSlot id="wine-email-error" error={errors.email} />
        </div>

        <div className={fieldClass}>
          <label htmlFor="wine-phone">Phone Number</label>
          <Input
            id="wine-phone"
            className={inputClass}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            isError={Boolean(errors.phone)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "wine-phone-error" : undefined}
            onChange={(event) => updateForm("phone", event.target.value)}
          />
          <ErrorSlot id="wine-phone-error" error={errors.phone} />
        </div>

        <div className={fieldClass}>
          <label htmlFor="wine-preferredSaturday">Preferred Saturday</label>
          <Input
            id="wine-preferredSaturday"
            className={inputClass}
            name="preferredSaturday"
            type="date"
            min={minDate}
            value={form.preferredSaturday}
            isError={Boolean(errors.preferredSaturday)}
            aria-invalid={Boolean(errors.preferredSaturday)}
            aria-describedby={
              errors.preferredSaturday ? "wine-preferredSaturday-error" : undefined
            }
            onChange={(event) => updatePreferredSaturday(event.target.value)}
          />
          <ErrorSlot
            id="wine-preferredSaturday-error"
            error={errors.preferredSaturday}
            tall
          />
        </div>

        <div className={fieldClass}>
          <label htmlFor="wine-guests">Number of Guests</label>
          <Input
            id="wine-guests"
            className={inputClass}
            name="guests"
            type="number"
            min="1"
            max={wineTastingConfig.maxGuests}
            inputMode="numeric"
            value={form.guests}
            isError={Boolean(errors.guests)}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? "wine-guests-error" : undefined}
            onChange={(event) => updateForm("guests", event.target.value)}
          />
          <ErrorSlot id="wine-guests-error" error={errors.guests} />
        </div>

        <div className={fieldClass}>
          <label htmlFor="wine-dietaryRestrictions">Dietary Restrictions</label>
          <Input
            id="wine-dietaryRestrictions"
            className={inputClass}
            name="dietaryRestrictions"
            type="text"
            value={form.dietaryRestrictions}
            onChange={(event) => updateForm("dietaryRestrictions", event.target.value)}
          />
          <ErrorSlot id="wine-dietaryRestrictions-error" />
        </div>
      </div>

      <div>
        <Checkbox
          className={checkboxClass}
          name="nonAlcoholicOption"
          checked={form.nonAlcoholicOption}
          onChange={(event) => updateForm("nonAlcoholicOption", event.target.checked)}
        >
          <Checkbox.Indicator className={checkboxBoxClass} />
          <span>
            Include a non-alcoholic tasting option.
          </span>
        </Checkbox>
        <ErrorSlot id="wine-nonAlcoholicOption-error" />
      </div>

      <div className={fieldClass}>
        <label htmlFor="wine-notes">Additional Notes</label>
        <Textarea
          id="wine-notes"
          className={`${inputClass} min-h-[128px] resize-y`}
          name="notes"
          value={form.notes}
          onChange={(event) => updateForm("notes", event.target.value)}
        />
        <ErrorSlot id="wine-notes-error" />
      </div>

      <div>
        <Checkbox
          className={requiredCheckboxClass}
          name="legalAgeConfirmed"
          checked={form.legalAgeConfirmed}
          aria-invalid={Boolean(errors.legalAgeConfirmed)}
          aria-describedby={
            errors.legalAgeConfirmed ? "wine-legalAgeConfirmed-error" : undefined
          }
          onChange={(event) => updateForm("legalAgeConfirmed", event.target.checked)}
        >
          <Checkbox.Indicator className={checkboxBoxClass} />
          <span>
            I confirm that all wine-tasting participants meet the applicable legal
            drinking-age requirement.
          </span>
        </Checkbox>
        <ErrorSlot
          id="wine-legalAgeConfirmed-error"
          error={errors.legalAgeConfirmed}
          tall
        />
      </div>

      <p className="m-0 text-[0.88rem] leading-[1.6] text-[rgba(43,21,18,0.66)]">
        {wineTastingConfig.seatingNote}. Wine tasting is available on Saturdays only.
      </p>

      <Button
        className={buttonClass}
        type="submit"
        disabled={submitState === "loading"}
        aria-busy={submitState === "loading"}
      >
        <span className="inline-flex min-w-[10.5rem] items-center justify-center gap-2">
          {submitState === "loading" ? (
            <>
              <span
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[rgba(255,253,248,0.42)] border-t-[var(--ivory)]"
                aria-hidden="true"
              />
              Sending Request
            </>
          ) : (
            "Reserve Your Tasting"
          )}
        </span>
      </Button>

      <div className="min-h-[4.75rem]" role="status" aria-live="polite">
        <Alert open={Boolean(statusMessage)} className={alertClass}>
          {statusMessage}
        </Alert>
      </div>
    </form>
  );
}
