import type {
  FocusEventHandler,
  FormEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import { Input } from "@material-tailwind/react";

type FormFieldProps = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  min?: string;
  dataLabel: string;
  required?: boolean;
  error?: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onInput: FormEventHandler<HTMLInputElement>;
  className?: string;
  inputClassName?: string;
  messageClassName?: string;
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
  dataLabel,
  required = false,
  error,
  onBlur,
  onInput,
  className,
  inputClassName,
  messageClassName = "min-h-[1.25rem] text-[0.78rem] leading-[1.35]",
}: FormFieldProps) {
  const errorId = `${name}-error`;
  const fieldId = `${name}-field`;
  const fieldClass = `${className ?? "grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]"}${
    error ? " form-field--invalid" : ""
  }`;

  return (
    <div className={fieldClass}>
      <label htmlFor={fieldId}>{label}</label>
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
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        data-label={dataLabel}
        required={required}
        onBlur={onBlur}
        onInput={onInput}
      />
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
