"use client";

import type {
  FocusEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ChangeEventHandler,
  KeyboardEventHandler,
  ChangeEvent,
} from "react";
import { useMemo, useState } from "react";
import { Input } from "@material-tailwind/react";
import CalendarIcon from "./CalendarIcon";

type FormFieldProps = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  min?: string;
  max?: string;
  value?: string;
  dataLabel: string;
  required?: boolean;
  error?: string;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLButtonElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  inputClassName?: string;
  messageClassName?: string;
};

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});
const dayFormatter = new Intl.DateTimeFormat("en", { weekday: "short" });
const dateLabelFormatter = new Intl.DateTimeFormat("en", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const formatDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseDateInputValue = (value?: string) => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getCalendarDays = (monthDate: Date) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
};

export default function FormField({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  inputMode,
  pattern,
  min,
  max,
  value,
  dataLabel,
  required = false,
  error,
  onBlur,
  onChange,
  className,
  inputClassName,
  messageClassName = "min-h-[1.25rem] text-[0.78rem] leading-[1.35]",
}: FormFieldProps) {
  const errorId = `${name}-error`;
  const fieldId = `${name}-field`;
  const dialogId = `${name}-calendar-dialog`;
  const calendarTitleId = `${name}-calendar-title`;
  const fieldClass = `${className ?? "grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]"}${
    error ? " form-field--invalid" : ""
  }`;
  const isDateField = type === "date";
  const selectedDate = parseDateInputValue(value);
  const minDate = parseDateInputValue(min);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const baseDate = selectedDate ?? minDate ?? new Date();
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  });
  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);

  const openCalendar = () => {
    const baseDate = selectedDate ?? minDate ?? new Date();
    setVisibleMonth(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
    setCalendarOpen(true);
  };

  const closeCalendar = () => setCalendarOpen(false);

  const selectDate = (nextDate: Date) => {
    const nextValue = formatDateInputValue(nextDate);
    onChange?.({
      target: { name, value: nextValue },
      currentTarget: { name, value: nextValue },
    } as ChangeEvent<HTMLInputElement>);
    setCalendarOpen(false);
  };

  const handleDateKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (event.key === "Escape" && calendarOpen) {
      event.preventDefault();
      closeCalendar();
    }
  };

  return (
    <div className={fieldClass}>
      <label htmlFor={fieldId}>{label}</label>
      <div className={isDateField ? "relative" : undefined}>
        {isDateField ? (
          <>
            <input
              type="hidden"
              name={name}
              value={value}
              data-label={dataLabel}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              required={required}
              min={min}
              max={max}
            />
          <button
            id={fieldId}
            type="button"
            className={["date-picker-trigger", inputClassName]
              .filter(Boolean)
              .join(" ")}
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
            aria-controls={dialogId}
            aria-describedby={error ? errorId : undefined}
            data-form-field={name}
            data-error={Boolean(error)}
            onBlur={onBlur}
            onClick={() => (calendarOpen ? closeCalendar() : openCalendar())}
            onKeyDown={handleDateKeyDown}
          >
            <span
              className={[
                "date-picker-trigger__text",
                selectedDate ? "" : "date-picker-trigger__placeholder",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {selectedDate ? dateLabelFormatter.format(selectedDate) : placeholder ?? "Choose a date"}
            </span>
            <CalendarIcon className="date-picker-trigger__icon h-5 w-5 shrink-0" />
          </button>
          </>
        ) : (
          <Input
            id={fieldId}
            className={inputClassName}
            type={type}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={inputMode}
            pattern={pattern}
            min={min}
            max={max}
            value={value}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            data-label={dataLabel}
            data-form-field={name}
            required={required}
            onBlur={onBlur}
            onChange={onChange}
            isError={Boolean(error)}
          />
        )}
        {isDateField && calendarOpen && (
          <div
            id={dialogId}
            className="date-picker-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby={calendarTitleId}
          >
            <div className="date-picker-panel__header">
              <button
                type="button"
                className="date-picker-panel__nav"
                aria-label="Previous month"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1),
                  )
                }
              >
                <span aria-hidden="true">&lt;</span>
              </button>
              <p id={calendarTitleId} className="date-picker-panel__title">
                {monthFormatter.format(visibleMonth)}
              </p>
              <button
                type="button"
                className="date-picker-panel__nav"
                aria-label="Next month"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1),
                  )
                }
              >
                <span aria-hidden="true">&gt;</span>
              </button>
            </div>

            <div className="date-picker-panel__weekdays" aria-hidden="true">
              {calendarDays.slice(0, 7).map((date) => (
                <span key={dayFormatter.format(date)}>
                  {dayFormatter.format(date).slice(0, 2)}
                </span>
              ))}
            </div>

            <div className="date-picker-panel__grid">
              {calendarDays.map((date) => {
                const dateValue = formatDateInputValue(date);
                const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
                const isSelected = value === dateValue;
                const isDisabled = Boolean(minDate && date < minDate);

                return (
                  <button
                    key={dateValue}
                    type="button"
                    className={[
                      "date-picker-panel__day",
                      isCurrentMonth ? "" : "is-muted",
                      isSelected ? "is-selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    disabled={isDisabled}
                    aria-label={dateLabelFormatter.format(date)}
                    aria-pressed={isSelected}
                    onClick={() => selectDate(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="date-picker-panel__actions">
              <button type="button" onClick={closeCalendar}>
                Cancel
              </button>
              <button type="button" onClick={closeCalendar}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={messageClassName}>
        {error ? (
          <span
            id={errorId}
            className="form-error inline-block transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:translate-y-0"
            role="alert"
          >
            {error}
          </span>
        ) : (
          <span aria-hidden="true">&nbsp;</span>
        )}
      </div>
    </div>
  );
}
