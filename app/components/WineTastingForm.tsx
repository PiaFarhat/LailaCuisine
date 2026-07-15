"use client";

import { useEffect, useState, type FormEvent } from "react";
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

  return (
    <form className="wine-form" onSubmit={handleSubmit} noValidate>
      <div className="wine-form__grid">
        <label className="wine-form__field">
          Full Name
          <input
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "wine-fullName-error" : undefined}
            onChange={(event) => updateForm("fullName", event.target.value)}
          />
          {errors.fullName && (
            <span id="wine-fullName-error" className="form-error" role="alert">
              {errors.fullName}
            </span>
          )}
        </label>

        <label className="wine-form__field">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "wine-email-error" : undefined}
            onChange={(event) => updateForm("email", event.target.value)}
          />
          {errors.email && (
            <span id="wine-email-error" className="form-error" role="alert">
              {errors.email}
            </span>
          )}
        </label>

        <label className="wine-form__field">
          Phone Number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "wine-phone-error" : undefined}
            onChange={(event) => updateForm("phone", event.target.value)}
          />
          {errors.phone && (
            <span id="wine-phone-error" className="form-error" role="alert">
              {errors.phone}
            </span>
          )}
        </label>

        <label className="wine-form__field">
          Preferred Saturday
          <input
            name="preferredSaturday"
            type="date"
            min={minDate}
            value={form.preferredSaturday}
            aria-invalid={Boolean(errors.preferredSaturday)}
            aria-describedby={
              errors.preferredSaturday ? "wine-preferredSaturday-error" : undefined
            }
            onChange={(event) => updatePreferredSaturday(event.target.value)}
          />
          {errors.preferredSaturday && (
            <span id="wine-preferredSaturday-error" className="form-error" role="alert">
              {errors.preferredSaturday}
            </span>
          )}
        </label>

        <label className="wine-form__field">
          Number of Guests
          <input
            name="guests"
            type="number"
            min="1"
            max={wineTastingConfig.maxGuests}
            inputMode="numeric"
            value={form.guests}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? "wine-guests-error" : undefined}
            onChange={(event) => updateForm("guests", event.target.value)}
          />
          {errors.guests && (
            <span id="wine-guests-error" className="form-error" role="alert">
              {errors.guests}
            </span>
          )}
        </label>

        <label className="wine-form__field">
          Dietary Restrictions
          <input
            name="dietaryRestrictions"
            type="text"
            value={form.dietaryRestrictions}
            onChange={(event) => updateForm("dietaryRestrictions", event.target.value)}
          />
        </label>
      </div>

      <label className="wine-form__checkbox">
        <input
          name="nonAlcoholicOption"
          type="checkbox"
          checked={form.nonAlcoholicOption}
          onChange={(event) => updateForm("nonAlcoholicOption", event.target.checked)}
        />
        Include a non-alcoholic tasting option.
      </label>

      <label className="wine-form__field">
        Additional Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={(event) => updateForm("notes", event.target.value)}
        />
      </label>

      <label className="wine-form__checkbox wine-form__checkbox--required">
        <input
          name="legalAgeConfirmed"
          type="checkbox"
          checked={form.legalAgeConfirmed}
          aria-invalid={Boolean(errors.legalAgeConfirmed)}
          aria-describedby={
            errors.legalAgeConfirmed ? "wine-legalAgeConfirmed-error" : undefined
          }
          onChange={(event) => updateForm("legalAgeConfirmed", event.target.checked)}
        />
        I confirm that all wine-tasting participants meet the applicable legal
        drinking-age requirement.
      </label>
      {errors.legalAgeConfirmed && (
        <span id="wine-legalAgeConfirmed-error" className="form-error" role="alert">
          {errors.legalAgeConfirmed}
        </span>
      )}

      <p className="wine-form__note">
        {wineTastingConfig.seatingNote}. Wine tasting is available on Saturdays only.
      </p>

      <button className="route-cta wine-form__submit" type="submit" disabled={submitState === "loading"}>
        {submitState === "loading" ? "Sending Request" : "Reserve Your Tasting"}
      </button>

      <p
        className={`wine-form__status wine-form__status--${submitState}`}
        role="status"
        aria-live="polite"
      >
        {statusMessage}
      </p>
    </form>
  );
}
