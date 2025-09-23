import type { ReactNode, FocusEvent } from "react";

type Props = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  help?: ReactNode;
  error?: string;
  valid?: boolean;
};

export default function Input({
  label, required, value, onChange, onBlur, type = "text", placeholder,
  help, error, valid
}: Props) {
  const base =
    "w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2";
  const variant = error
    ? "border-libelle-error focus:ring-libelle-error"
    : valid
    ? "border-libelle-trust focus:ring-libelle-trust"
    : "border-libelle-gray focus:ring-libelle-accent";

  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-libelle-text">
        {label} {required && <span className="text-libelle-error">*</span>}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${base} ${variant}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error ? (
        <p id={`${id}-error`} className="text-xs text-libelle-error">
          {error}
        </p>
      ) : help ? (
        <p className="text-xs text-libelle-gray">{help}</p>
      ) : null}
    </div>
  );
}
