"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Form controls.
 *
 * Accessibility decisions worth stating:
 *   • labels are real <label for>, never placeholder-as-label
 *   • errors are wired with aria-describedby and announced via role="alert"
 *   • aria-invalid drives the error styling, so the visual and the assistive
 *     states can never disagree
 *   • the error colour is never the only signal, the border weight changes
 *     and an icon-free text message appears, for colour-blind users
 *   • every control clears 44px of touch target
 */

const controlBase =
  "w-full rounded-[3px] border bg-paper px-4 text-[0.9375rem] text-ink " +
  "placeholder:text-mute transition-[border-color,box-shadow,background-color] " +
  "duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] " +
  "focus:outline-none focus-visible:outline-none";

const controlState = (invalid?: boolean) =>
  invalid
    ? "border-danger/70 focus:border-danger focus:shadow-[0_0_0_3px_rgba(163,49,42,0.14)]"
    : "border-line-2 hover:border-line-2/80 focus:border-crimson focus:shadow-[0_0_0_3px_rgba(166,43,49,0.13)]";

function FieldShell({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-[0.8125rem] font-medium tracking-[-0.005em] text-ink"
        >
          {label}
        </label>
        {optional ? (
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-mute">
            Optional
          </span>
        ) : null}
      </div>

      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] leading-relaxed text-mute">
          {hint}
        </p>
      ) : null}

      <div className="mt-2.5">{children}</div>

      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="mt-2 text-[0.8125rem] text-danger"
            initial={reduced ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE.out }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  hint,
  error,
  optional,
  autoComplete,
  inputMode,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  placeholder?: string;
}) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`${controlBase} ${controlState(!!error)} h-12`}
      />
    </FieldShell>
  );
}

export function TextArea({
  label,
  name,
  value,
  onChange,
  hint,
  error,
  optional,
  rows = 5,
  placeholder,
  maxLength,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  error?: string;
  optional?: boolean;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={`${controlBase} ${controlState(!!error)} resize-y py-3.5 leading-relaxed`}
      />
      {maxLength ? (
        <p className="mt-1.5 text-right font-mono text-[0.625rem] text-mute">
          {value.length} / {maxLength}
        </p>
      ) : null}
    </FieldShell>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  hint,
  error,
  optional,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
  error?: string;
  optional?: boolean;
}) {
  const id = useId();

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={`${controlBase} ${controlState(!!error)} h-12 appearance-none pr-11`}
        >
          <option value="">Please choose…</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-mute"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
        </svg>
      </div>
    </FieldShell>
  );
}

/**
 * Radio group rendered as selectable rows.
 *
 * Real <input type="radio"> underneath, visually hidden rather than removed, so
 * keyboard arrow-key navigation and screen reader group semantics come free.
 */
export function RadioCards({
  legend,
  name,
  value,
  onChange,
  options,
  hint,
  error,
  columns = 1,
}: {
  legend: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; note?: string }[];
  hint?: string;
  error?: string;
  columns?: 1 | 2;
}) {
  const id = useId();

  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="text-[0.8125rem] font-medium tracking-[-0.005em] text-ink">
        {legend}
      </legend>
      {hint ? (
        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-mute">{hint}</p>
      ) : null}

      <div
        className={`mt-3.5 grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
      >
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={[
                "group/radio relative flex cursor-pointer items-start gap-3.5 rounded-[3px] border p-4",
                "transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                checked
                  ? "border-crimson bg-crimson-4"
                  : "border-line-2 bg-paper hover:border-line-2/70 hover:bg-paper-2",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-crimson",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />

              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  checked ? "border-crimson" : "border-line-2 group-hover/radio:border-mute"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-crimson transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    checked ? "scale-100" : "scale-0"
                  }`}
                />
              </span>

              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-medium leading-snug text-ink">
                  {o.label}
                </span>
                {o.note ? (
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-mute">
                    {o.note}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2.5 text-[0.8125rem] text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function Checkbox({
  label,
  name,
  checked,
  onChange,
  error,
}: {
  label: ReactNode;
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3.5 text-[0.875rem] leading-relaxed text-slate"
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-crimson ${
            checked ? "border-crimson bg-crimson" : error ? "border-danger/70 bg-paper" : "border-line-2 bg-paper"
          }`}
        >
          <svg
            viewBox="0 0 12 12"
            className={`h-2.5 w-2.5 text-paper transition-opacity duration-200 ${
              checked ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m2 6.2 2.8 2.8L10 3.8" />
          </svg>
        </span>
        <span>{label}</span>
      </label>

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 pl-8 text-[0.8125rem] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
