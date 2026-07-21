"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import CalendarIcon from "./CalendarIcon";

type SaturdayDatePickerProps = {
  label: string;
  name: string;
  value: string;
  min: string;
  error?: string;
  onChange: (value: string) => void;
  onTouched: () => void;
  className?: string;
  triggerClassName?: string;
  messageClassName?: string;
};

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});
const displayFormatter = new Intl.DateTimeFormat("en", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const formatDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseDateInputValue = (value: string) => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getCalendarDays = (monthDate: Date) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
};

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export default function SaturdayDatePicker({
  label,
  name,
  value,
  min,
  error,
  onChange,
  onTouched,
  className,
  triggerClassName,
  messageClassName = "min-h-[2.5rem] text-[0.78rem] leading-[1.35]",
}: SaturdayDatePickerProps) {
  const reactId = useId();
  const fieldId = `${name}-${reactId}`;
  const triggerId = `${fieldId}-trigger`;
  const errorId = `${fieldId}-error`;
  const popoverId = `${fieldId}-calendar`;
  const titleId = `${fieldId}-title`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedDate = parseDateInputValue(value);
  const minDate = parseDateInputValue(min) ?? getToday();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const baseDate = selectedDate ?? minDate;
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  });
  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);

  const closeCalendar = useCallback((returnFocus = false) => {
    setIsOpen(false);
    onTouched();
    if (returnFocus) triggerRef.current?.focus();
  }, [onTouched]);

  const openCalendar = () => {
    const baseDate = selectedDate ?? minDate;
    setVisibleMonth(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        closeCalendar();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeCalendar(true);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCalendar, isOpen]);

  const selectDate = (date: Date) => {
    onChange(formatDateInputValue(date));
    setIsOpen(false);
    onTouched();
    triggerRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className={className}>
      <label htmlFor={triggerId}>{label}</label>
      <div className="saturday-picker">
        <input id={fieldId} type="hidden" name={name} value={value} />
        <button
          id={triggerId}
          ref={triggerRef}
          type="button"
          className={["saturday-picker__trigger", triggerClassName]
            .filter(Boolean)
            .join(" ")}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={popoverId}
          aria-describedby={error ? errorId : undefined}
          data-invalid={Boolean(error)}
          onClick={() => (isOpen ? closeCalendar() : openCalendar())}
          onBlur={(event) => {
            if (!wrapperRef.current?.contains(event.relatedTarget as Node | null)) {
              onTouched();
            }
          }}
        >
          <span
            className={[
              "saturday-picker__text",
              value ? "" : "saturday-picker__placeholder",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {selectedDate ? displayFormatter.format(selectedDate) : "Choose a Saturday"}
          </span>
          <CalendarIcon className="saturday-picker__icon" />
        </button>

        {isOpen && (
          <div
            id={popoverId}
            className="saturday-picker__popover"
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
          >
            <div className="saturday-picker__header">
              <button
                type="button"
                className="saturday-picker__nav"
                aria-label="Previous month"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1),
                  )
                }
              >
                <span aria-hidden="true">&lt;</span>
              </button>
              <p id={titleId} className="saturday-picker__title">
                {monthFormatter.format(visibleMonth)}
              </p>
              <button
                type="button"
                className="saturday-picker__nav"
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

            <div className="saturday-picker__weekdays" aria-hidden="true">
              {weekdayLabels.map((weekday) => (
                <span key={weekday}>{weekday}</span>
              ))}
            </div>

            <div className="saturday-picker__grid">
              {calendarDays.map((date) => {
                const dateValue = formatDateInputValue(date);
                const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
                const isSelected = value === dateValue;
                const isToday = dateValue === formatDateInputValue(getToday());
                const isSaturday = date.getDay() === 6;
                const isPast = date < minDate;
                const isDisabled = isPast || !isSaturday;

                return (
                  <button
                    key={dateValue}
                    type="button"
                    className={[
                      "saturday-picker__day",
                      isCurrentMonth ? "" : "is-muted",
                      isToday ? "is-today" : "",
                      isSelected ? "is-selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    disabled={isDisabled}
                    aria-label={displayFormatter.format(date)}
                    aria-pressed={isSelected}
                    onClick={() => selectDate(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={messageClassName}>
        {error ? (
          <p id={errorId} className="form-error m-0" role="alert">
            {error}
          </p>
        ) : (
          <span aria-hidden="true">&nbsp;</span>
        )}
      </div>
    </div>
  );
}
