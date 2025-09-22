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
    ? "border-[#F43F5E] focus:ring-[#F43F5E]"
    : valid
    ? "border-[#10B981] focus:ring-[#10B981]"
    : "border-gray-300 focus:ring-indigo-500";

  // id accesible (derivado del label)
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label} {required && <span className="text-rose-600">*</span>}
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
        <p id={`${id}-error`} className="text-xs text-[#F43F5E]">
          {error}
        </p>
      ) : help ? (
        <p className="text-xs text-gray-500">{help}</p>
      ) : null}
    </div>
  );
}
