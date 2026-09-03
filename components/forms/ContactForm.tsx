"use client";

import { useState, useTransition } from "react";
import { motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { TextField, TextArea, Checkbox } from "@/components/ui/Field";
import { submitShortMessage } from "@/lib/submit";
import type { EnquiryState } from "@/lib/enquiry";
import { EASE } from "@/lib/motion";
import { org } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Short contact form.
 *
 * The old site's form was Name / Email / Phone / Message, and that is kept
 * almost intact here: someone who just wants to ask a question should not be
 * routed through the four-step consultation flow. Consent is added, because
 * the form collects personal information and saying what will be done with it
 * is both the decent and the lawful thing to do.
 */
export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<EnquiryState>({ status: "idle" });
  const [pending, startTransition] = useTransition();

  const set = (key: keyof typeof values, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) e.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) e.message = "Please add a little more detail.";
    if (!values.consent) e.consent = "We need your agreement before we can reply.";
    setErrors(e);
    if (Object.keys(e).length) return;

    startTransition(async () => {
      setResult(await submitShortMessage(values));
    });
  };

  if (result.status === "sent" || result.status === "fallback") {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE.out }}
      >
        <Logo className="h-14 w-auto" />
        <h2 className="t-h3 mt-7">
          {result.status === "sent" ? "Message received." : "One more tap to send it."}
        </h2>
        <p className="measure mt-4 t-body">
          {result.status === "sent"
            ? `Thank you. We will reply to ${values.email}, usually within one business day.`
            : result.reason}
        </p>
        {result.status === "fallback" ? (
          <div className="mt-7">
            <Button href={result.mailto} variant="primary" size="md" withArrow>
              Send from your email app
            </Button>
          </div>
        ) : null}
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <TextField
        label="Your name"
        name="name"
        value={values.name}
        onChange={(v) => set("name", v)}
        error={errors.name}
        autoComplete="name"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          autoComplete="email"
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(v) => set("phone", v)}
          autoComplete="tel"
          optional
        />
      </div>

      <TextArea
        label="How can we help?"
        name="message"
        value={values.message}
        onChange={(v) => set("message", v)}
        error={errors.message}
        rows={6}
        maxLength={1200}
      />

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <Checkbox
        name="consent"
        checked={values.consent}
        onChange={(v) => set("consent", v)}
        error={errors.consent}
        label={<>I agree that {org.registeredName} may use these details to reply to me.</>}
      />

      {result.status === "error" ? (
        <p role="alert" className="text-[0.875rem] text-danger">
          {result.message}
        </p>
      ) : null}

      <Button type="submit" size="lg" variant="primary" disabled={pending}>
        <span className="relative z-10 inline-flex items-center gap-2.5">
          {pending ? (
            <>
              <span
                className="block h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </span>
      </Button>
    </form>
  );
}
