import type {
  FocusEventHandler,
  FormEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

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
}: FormFieldProps) {
  const errorId = `${name}-error`;
  const fieldClass = `form-field grid gap-[0.45rem] text-[0.86rem] tracking-[0.06em] text-[var(--wine)]${
    error ? " form-field--invalid" : ""
  }`;

  return (
    <label className={fieldClass}>
      {label}
      <input
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
      {error && (
        <span id={errorId} className="form-error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
