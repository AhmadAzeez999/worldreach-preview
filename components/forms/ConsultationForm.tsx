"use client";

import { useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import {
  TextField,
  TextArea,
  SelectField,
  RadioCards,
  Checkbox,
} from "@/components/ui/Field";
import { submitEnquiry } from "@/lib/submit";
import type { EnquiryPayload, EnquiryState } from "@/lib/enquiry";
import { EASE } from "@/lib/motion";
import { services, org, consultant } from "@/lib/content";

/**
 * Multi-step consultation request.
 *
 * Why steps rather than one long form: this asks for more than a name and a
 * message, because a first conversation is far more useful when the consultant
 * already knows the shape of the situation. A single page of eleven fields
 * would be abandoned; four short screens with visible progress are not.
 *
 * Deliberately NOT an "eligibility assessment". Scoring someone's chances on a
 * web form would imply a professional opinion nobody has given, and edges
 * toward the outcome-promising that CICC s.44(2) prohibits. This collects
 * context for a human conversation. Nothing more, and the copy says so.
 *
 * Validation runs per step and only after a step is attempted, so the form
 * never scolds someone for a field they have not reached yet.
 */

const STEPS = [
  { n: "01", label: "Your goal" },
  { n: "02", label: "Where you are" },
  { n: "03", label: "Your situation" },
  { n: "04", label: "How to reach you" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emptyData: EnquiryPayload = {
  topic: "",
  location: "",
  statusInCanada: "",
  situation: "",
  refused: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "video",
  consent: false,
  company: "",
};

type Errors = Partial<Record<keyof EnquiryPayload, string>>;

export function ConsultationForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [data, setData] = useState<EnquiryPayload>(emptyData);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<EnquiryState>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const headingRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const validateStep = (index: number): Errors => {
    const e: Errors = {};
    if (index === 0 && !data.topic) e.topic = "Please choose one so we can point you the right way.";
    if (index === 1) {
      if (!data.location.trim()) e.location = "Please tell us which country you are in.";
      if (!data.statusInCanada) e.statusInCanada = "Please choose the option that fits best.";
    }
    if (index === 2) {
      if (data.situation.trim().length < 10)
        e.situation = "A sentence or two is enough, just enough for us to prepare properly.";
    }
    if (index === 3) {
      if (!data.firstName.trim()) e.firstName = "Please enter your first name.";
      if (!data.lastName.trim()) e.lastName = "Please enter your last name.";
      if (!EMAIL_RE.test(data.email.trim())) e.email = "Please enter a valid email address.";
      if (!data.consent) e.consent = "We need your agreement before we can contact you.";
    }
    return e;
  };

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    // Move focus to the new step so keyboard and screen reader users are not
    // left at the bottom of the previous one.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const onNext = () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step < STEPS.length - 1) goTo(step + 1);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const e = validateStep(3);
    setErrors(e);
    if (Object.keys(e).length) return;

    startTransition(async () => {
      const res = await submitEnquiry(data);
      setResult(res);
      if (res.status === "sent" || res.status === "fallback") {
        requestAnimationFrame(() => headingRef.current?.focus());
      }
    });
  };

  /* ---------------------------------------------------------------- success */
  if (result.status === "sent") {
    return (
      <Confirmation
        heading="Your request is with us."
        body={`Thank you, ${data.firstName}. ${consultant.name} will reply to ${data.email}, usually within one business day, during ${org.hoursShort}.`}
      />
    );
  }

  if (result.status === "fallback") {
    return (
      <Confirmation
        heading="Nearly there. One more tap."
        body={result.reason}
        tone="warn"
        action={
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={result.mailto} size="lg" variant="primary" withArrow>
              Send it from your email app
            </Button>
            <a
              href={org.phoneHref}
              className="t-numeral text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline"
            >
              or call {org.phoneDisplay}
            </a>
          </div>
        }
      />
    );
  }

  const slide = {
    enter: (d: 1 | -1) => ({ opacity: 0, x: d * 28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: 1 | -1) => ({ opacity: 0, x: d * -28 }),
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* ---------------- Progress ---------------- */}
      <ol className="flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-5">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s.n} className="flex items-center gap-2.5">
              <span
                className={`t-numeral text-[0.625rem] transition-colors duration-500 ${
                  active ? "text-crimson" : done ? "text-slate" : "text-mute"
                }`}
              >
                {s.n}
              </span>
              <button
                type="button"
                // Only completed steps are navigable. Jumping ahead past
                // validation would let someone submit an incomplete enquiry.
                onClick={() => done && goTo(i)}
                disabled={!done}
                className={`-my-2 py-2 text-[0.8125rem] transition-colors duration-500 ${
                  active
                    ? "font-medium text-ink"
                    : done
                      ? "text-slate hover:text-ink"
                      : "cursor-default text-mute"
                }`}
              >
                {s.label}
              </button>
              {active ? (
                <motion.span
                  layoutId="step-underline"
                  className="h-px w-5 bg-crimson"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div
        ref={headingRef}
        tabIndex={-1}
        aria-live="polite"
        className="pt-9 outline-none"
      >
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: EASE.out }}
          >
            {/* ------------------------------ Step 1 */}
            {step === 0 ? (
              <StepShell
                title="What would you like help with?"
                note="If none of these is quite right, choose the last option. That is a perfectly normal place to start."
              >
                <RadioCards
                  legend="Area of help"
                  name="topic"
                  value={data.topic}
                  onChange={(v) => set("topic", v)}
                  error={errors.topic}
                  columns={2}
                  options={[
                    ...services.map((s) => ({
                      value: s.slug,
                      label: s.short,
                      note: s.intent,
                    })),
                    {
                      value: "unsure",
                      label: "I am not sure yet",
                      note: "Working that out is part of the conversation.",
                    },
                  ]}
                />
              </StepShell>
            ) : null}

            {/* ------------------------------ Step 2 */}
            {step === 1 ? (
              <StepShell
                title="Where are you right now?"
                note="This shapes which routes are open to you, so it matters more than it might seem."
              >
                <div className="space-y-7">
                  <TextField
                    label="Country you are currently in"
                    name="location"
                    value={data.location}
                    onChange={(v) => set("location", v)}
                    error={errors.location}
                    autoComplete="country-name"
                    placeholder="e.g. Kenya, Philippines, Canada"
                  />
                  <SelectField
                    label="Your current status in Canada"
                    name="statusInCanada"
                    value={data.statusInCanada}
                    onChange={(v) => set("statusInCanada", v)}
                    error={errors.statusInCanada}
                    options={[
                      { value: "outside", label: "I am outside Canada" },
                      { value: "visitor", label: "Visitor" },
                      { value: "student", label: "Study permit holder" },
                      { value: "worker", label: "Work permit holder" },
                      { value: "pr", label: "Permanent resident" },
                      { value: "citizen", label: "Canadian citizen (sponsoring someone)" },
                      { value: "expired", label: "My status has expired or is about to" },
                      { value: "other", label: "Something else" },
                    ]}
                  />
                </div>
              </StepShell>
            ) : null}

            {/* ------------------------------ Step 3 */}
            {step === 2 ? (
              <StepShell
                title="Tell us about your situation."
                note="Plain language is fine. You do not need to know the terminology, that is our job."
              >
                <div className="space-y-7">
                  <TextArea
                    label="What is happening, and what are you hoping for?"
                    name="situation"
                    value={data.situation}
                    onChange={(v) => set("situation", v)}
                    error={errors.situation}
                    rows={6}
                    maxLength={1200}
                    placeholder="Family, work, study, timelines, anything you are worried about…"
                  />
                  <RadioCards
                    legend="Has any immigration application of yours been refused before?"
                    hint="A previous refusal is common and it is not disqualifying. It does change how the next application should be built, so it is much better to raise it now."
                    name="refused"
                    value={data.refused}
                    onChange={(v) => set("refused", v)}
                    columns={2}
                    options={[
                      { value: "no", label: "No" },
                      { value: "yes", label: "Yes" },
                      { value: "unsure", label: "I am not sure" },
                      { value: "discuss", label: "I would rather discuss it" },
                    ]}
                  />
                </div>
              </StepShell>
            ) : null}

            {/* ------------------------------ Step 4 */}
            {step === 3 ? (
              <StepShell
                title="How should we reach you?"
                note="Used only to arrange and hold your consultation."
              >
                <div className="space-y-7">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      label="First name"
                      name="firstName"
                      value={data.firstName}
                      onChange={(v) => set("firstName", v)}
                      error={errors.firstName}
                      autoComplete="given-name"
                    />
                    <TextField
                      label="Last name"
                      name="lastName"
                      value={data.lastName}
                      onChange={(v) => set("lastName", v)}
                      error={errors.lastName}
                      autoComplete="family-name"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      inputMode="email"
                      value={data.email}
                      onChange={(v) => set("email", v)}
                      error={errors.email}
                      autoComplete="email"
                    />
                    <TextField
                      label="Phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={data.phone}
                      onChange={(v) => set("phone", v)}
                      autoComplete="tel"
                      optional
                      hint="Include your country code."
                    />
                  </div>

                  <RadioCards
                    legend="Preferred way to meet"
                    name="preferredContact"
                    value={data.preferredContact}
                    onChange={(v) => set("preferredContact", v)}
                    columns={2}
                    options={[
                      { value: "video", label: "Video call" },
                      { value: "phone", label: "Phone call" },
                      { value: "email", label: "Email first" },
                      { value: "any", label: "No preference" },
                    ]}
                  />

                  {/* Honeypot. Hidden from people, irresistible to bots. */}
                  <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="company-hp">Company</label>
                    <input
                      id="company-hp"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={data.company}
                      onChange={(e) => set("company", e.target.value)}
                    />
                  </div>

                  <div className="border-t border-line pt-7">
                    <Checkbox
                      name="consent"
                      checked={data.consent}
                      onChange={(v) => set("consent", v)}
                      error={errors.consent}
                      label={
                        <>
                          I agree that {org.registeredName} may contact me about
                          this enquiry. I understand this form does not create a
                          client relationship and that no outcome is being
                          promised.
                        </>
                      }
                    />
                  </div>

                  {result.status === "error" ? (
                    <p role="alert" className="text-[0.875rem] text-danger">
                      {result.message}
                    </p>
                  ) : null}
                </div>
              </StepShell>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------------- Controls ---------------- */}
      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-7">
        <button
          type="button"
          onClick={() => step > 0 && goTo(step - 1)}
          disabled={step === 0}
          className="group/back inline-flex items-center gap-2 rounded-sm py-2 text-[0.875rem] font-medium text-mute transition-colors duration-300 hover:text-ink disabled:pointer-events-none disabled:opacity-0"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
          </svg>
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={onNext} size="lg" variant="primary" withArrow>
            Continue
          </Button>
        ) : (
          <Button type="submit" size="lg" variant="primary" disabled={pending}>
            <span className="relative z-10 inline-flex items-center gap-2.5">
              {pending ? (
                <>
                  <Spinner />
                  Sending…
                </>
              ) : (
                <>
                  Request my free consultation
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                  </svg>
                </>
              )}
            </span>
          </Button>
        )}
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function StepShell({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="t-h3">{title}</h2>
      {note ? <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-mute">{note}</p> : null}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Spinner() {
  return (
    <span
      className="block h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

/**
 * Success / fallback screen.
 *
 * The mark redraws itself here. The same assembly animation as the page load,
 * closing the loop on the interaction. It is the one place on the site where
 * a decorative flourish is unambiguously earned.
 */
function Confirmation({
  heading,
  body,
  action,
  tone = "ok",
}: {
  heading: string;
  body: string;
  action?: React.ReactNode;
  tone?: "ok" | "warn";
}) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE.out }}
      className="py-6"
    >
      <Logo
        className={`h-16 w-auto ${tone === "warn" ? "opacity-45 grayscale" : ""}`}
      />

      <h2 className="t-h2 mt-8">{heading}</h2>
      <p className="measure mt-5 t-lead">{body}</p>

      {action ? <div className="mt-9">{action}</div> : null}

      <p className="measure mt-10 border-t border-line pt-6 text-[0.8125rem] leading-relaxed text-mute">
        {consultant.name}, {consultant.title} {consultant.rcicNumber}. Sending
        this form does not create a client relationship, and no outcome is
        promised. Decisions rest solely with Immigration, Refugees and
        Citizenship Canada.
      </p>
    </motion.div>
  );
}
