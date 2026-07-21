"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Alert, Button, Input, Textarea } from "@material-tailwind/react";
import SaturdayDatePicker from "./SaturdayDatePicker";
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
type WineTastingTouched = Partial<Record<WineTastingField, boolean>>;

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

const isSaturday = (value: string) => {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  return date.getDay() === 6;
};

const isTodayOrFutureDate = (value: string) => {
  if (!value) return false;
  const selected = new Date(`${value}T00:00:00`);
  return selected >= getToday();
};

const getPreferredSaturdayError = (value: string) => {
  if (!value) return "Choose a preferred Saturday.";
  if (!isTodayOrFutureDate(value)) return "Choose today or a future wine-tasting date.";
  if (!isSaturday(value)) {
    return "Wine tasting reservations are available on Saturdays only.";
  }
  return "";
};

export default function WineTastingForm() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState<WineTastingTouched>({});
  const [errors, setErrors] = useState<WineTastingErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMinDate(formatDateInputValue(getToday()));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const clearFieldErrorWhenValid = (
    field: keyof WineTastingReservationPayload,
    value: WineTastingReservationPayload[keyof WineTastingReservationPayload],
  ) => {
    const error = validateField(field, value);
    if (error) return;
    setErrors((current) => {
      if (!current[field as WineTastingField]) return current;
      const nextErrors = { ...current };
      delete nextErrors[field as WineTastingField];
      return nextErrors;
    });
  };

  const updateForm = <Field extends keyof WineTastingReservationPayload>(
    field: Field,
    value: WineTastingReservationPayload[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitState("idle");
    setStatusMessage("");
    if (errors[field as WineTastingField]) clearFieldErrorWhenValid(field, value);
  };

  const updatePreferredSaturday = (value: string) => {
    setForm((current) => ({ ...current, preferredSaturday: value }));
    setSubmitState("idle");
    setStatusMessage("");

    if (errors.preferredSaturday && !getPreferredSaturdayError(value)) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors.preferredSaturday;
        return nextErrors;
      });
    }
  };

  const validateField = (
    field: keyof WineTastingReservationPayload,
    value: WineTastingReservationPayload[keyof WineTastingReservationPayload],
  ) => {
    if (field === "fullName" && !String(value).trim()) return "Full name is required.";
    if (field === "email") {
      const email = String(value).trim();
      if (!email) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Enter a valid email address.";
      }
    }
    if (field === "phone") {
      const phone = String(value).trim();
      if (!/^\d{7,15}$/.test(phone)) {
        return "Enter a valid phone number using 7 to 15 digits.";
      }
    }
    if (field === "preferredSaturday") return getPreferredSaturdayError(String(value));
    if (field === "guests") {
      const guestCount = Number(value);
      if (!Number.isInteger(guestCount) || guestCount < 1) {
        return "Please enter at least one guest.";
      }
      if (guestCount > wineTastingConfig.maxGuests) {
        return `For now, please request no more than ${wineTastingConfig.maxGuests} guests.`;
      }
    }
    if (field === "legalAgeConfirmed" && !value) {
      return "Confirm that all participants meet the applicable legal drinking-age requirement.";
    }
    return "";
  };

  const validate = () => {
    const nextErrors: WineTastingErrors = {};

    ([
      "fullName",
      "email",
      "phone",
      "preferredSaturday",
      "guests",
      "legalAgeConfirmed",
    ] as const).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) nextErrors[field] = error;
    });
    return nextErrors;
  };

  const handleBlur = (field: WineTastingField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const error = validateField(field, form[field]);
    setErrors((current) => {
      const nextErrors = { ...current };
      if (error) nextErrors[field] = error;
      else delete nextErrors[field];
      return nextErrors;
    });
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
      setSubmitted(true);
      setErrors(nextErrors);
      setSubmitState("idle");
      setStatusMessage("Please correct the highlighted fields.");
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
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
  const alignedMessageClass = "min-h-[2.5rem] text-[0.78rem] leading-[1.35]";
  const inputClass =
    "min-h-[52px] rounded-none border border-[rgba(198,161,91,0.42)] bg-[rgba(255,253,248,0.96)] px-4 py-3 text-[1rem] text-[var(--charcoal)] shadow-[inset_0_1px_0_rgba(255,253,248,0.9)] transition-[border-color,box-shadow,background-color] duration-200 ease-out placeholder:text-[rgba(43,33,24,0.44)] hover:border-[rgba(198,161,91,0.64)] focus:border-[var(--gold)] focus:bg-[var(--ivory)] focus:outline-none focus:shadow-[0_0_0_4px_rgba(198,161,91,0.16)] data-[error=true]:border-[var(--burgundy)]";
  const checkboxClass =
    "wine-checkbox grid max-w-[42rem] grid-cols-[1rem_minmax(0,1fr)] items-start gap-3 text-[0.86rem] leading-[1.6] tracking-[0.04em] text-[rgba(43,21,18,0.76)] max-[480px]:text-[0.82rem] max-[480px]:tracking-[0.02em]";
  const requiredCheckboxClass = `${checkboxClass} font-bold text-[var(--wine)]`;
  const checkboxBoxClass =
    "!mt-1 !h-4 !min-h-4 !w-4 !min-w-4 !shrink-0 !appearance-auto !p-0 !shadow-none accent-[var(--burgundy)]";
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

  const getVisibleError = (field: WineTastingField) =>
    touched[field] || submitted ? errors[field] : undefined;

  const updateLegalAgeConfirmed = (checked: boolean) => {
    updateForm("legalAgeConfirmed", checked);
    setTouched((current) => ({ ...current, legalAgeConfirmed: true }));
    setErrors((current) => {
      const nextErrors = { ...current };
      const error = validateField("legalAgeConfirmed", checked);
      if (error) nextErrors.legalAgeConfirmed = error;
      else delete nextErrors.legalAgeConfirmed;
      return nextErrors;
    });
  };

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
            isError={Boolean(getVisibleError("fullName"))}
            aria-invalid={Boolean(getVisibleError("fullName"))}
            aria-describedby={getVisibleError("fullName") ? "wine-fullName-error" : undefined}
            onChange={(event) => updateForm("fullName", event.target.value)}
            onBlur={() => handleBlur("fullName")}
          />
          <ErrorSlot id="wine-fullName-error" error={getVisibleError("fullName")} />
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
            isError={Boolean(getVisibleError("email"))}
            aria-invalid={Boolean(getVisibleError("email"))}
            aria-describedby={getVisibleError("email") ? "wine-email-error" : undefined}
            onChange={(event) => updateForm("email", event.target.value)}
            onBlur={() => handleBlur("email")}
          />
          <ErrorSlot id="wine-email-error" error={getVisibleError("email")} />
        </div>

        <div className={fieldClass}>
          <label htmlFor="wine-phone">Phone Number</label>
          <Input
            id="wine-phone"
            className={inputClass}
            name="phone"
            type="tel"
            placeholder="+961 XX XXX XXX"
            autoComplete="tel"
            inputMode="numeric"
            pattern="[0-9]{7,15}"
            value={form.phone}
            isError={Boolean(getVisibleError("phone"))}
            aria-invalid={Boolean(getVisibleError("phone"))}
            aria-describedby={getVisibleError("phone") ? "wine-phone-error" : undefined}
            onChange={(event) => updateForm("phone", digitsOnly(event.target.value))}
            onBlur={() => handleBlur("phone")}
          />
          <ErrorSlot id="wine-phone-error" error={getVisibleError("phone")} tall />
        </div>

        <SaturdayDatePicker
          label="Preferred Saturday"
          name="preferredSaturday"
          min={minDate}
          value={form.preferredSaturday}
          error={getVisibleError("preferredSaturday")}
          className={fieldClass}
          triggerClassName={inputClass}
          messageClassName={alignedMessageClass}
          onChange={updatePreferredSaturday}
          onTouched={() => handleBlur("preferredSaturday")}
        />

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
            isError={Boolean(getVisibleError("guests"))}
            aria-invalid={Boolean(getVisibleError("guests"))}
            aria-describedby={getVisibleError("guests") ? "wine-guests-error" : undefined}
            onChange={(event) => updateForm("guests", event.target.value)}
            onBlur={() => handleBlur("guests")}
          />
          <ErrorSlot id="wine-guests-error" error={getVisibleError("guests")} />
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
        <label className={checkboxClass} htmlFor="wine-nonAlcoholicOption">
          <input
            id="wine-nonAlcoholicOption"
            className={checkboxBoxClass}
            type="checkbox"
            name="nonAlcoholicOption"
            checked={form.nonAlcoholicOption}
            onChange={(event) => updateForm("nonAlcoholicOption", event.target.checked)}
          />
          <span>
            Include a non-alcoholic tasting option.
          </span>
        </label>
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
        <label className={requiredCheckboxClass} htmlFor="wine-legalAgeConfirmed">
          <input
            id="wine-legalAgeConfirmed"
            className={checkboxBoxClass}
            type="checkbox"
            name="legalAgeConfirmed"
            checked={form.legalAgeConfirmed}
            required
            aria-invalid={Boolean(getVisibleError("legalAgeConfirmed"))}
            aria-describedby={
              getVisibleError("legalAgeConfirmed")
                ? "wine-legalAgeConfirmed-error"
                : undefined
            }
            onChange={(event) => updateLegalAgeConfirmed(event.target.checked)}
            onBlur={() => handleBlur("legalAgeConfirmed")}
          />
          <span>
            I confirm that all wine-tasting participants meet the applicable legal
            drinking-age requirement.
          </span>
        </label>
        <ErrorSlot
          id="wine-legalAgeConfirmed-error"
          error={getVisibleError("legalAgeConfirmed")}
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
