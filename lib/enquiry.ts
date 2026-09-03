import { org, services } from "@/lib/content";

/**
 * Enquiry shaping, kept free of "use server" so it can run on either side.
 *
 * The server action uses these to compose the email it sends. The static demo
 * build has no server to call, so the forms import the same functions and
 * build the mail link in the browser. One definition, so the message a client
 * receives is identical either way.
 */

export type EnquiryState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "fallback"; mailto: string; reason: string }
  | { status: "error"; message: string };

export type EnquiryPayload = {
  topic: string;
  location: string;
  statusInCanada: string;
  situation: string;
  refused: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  consent: boolean;
  /** Honeypot, must stay empty. */
  company?: string;
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** True when the build has no server to post to (the static client demo). */
export const IS_STATIC_DEMO = process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

export function validateEnquiry(p: EnquiryPayload): string | null {
  if (p.company) return "Submission rejected.";
  if (!p.topic) return "Please choose what you would like help with.";
  if (!p.location.trim()) return "Please tell us which country you are in.";
  if (!p.statusInCanada) return "Please choose your current status.";
  if (!p.situation.trim() || p.situation.trim().length < 10)
    return "Please tell us a little about your situation.";
  if (!p.firstName.trim()) return "Please enter your first name.";
  if (!p.lastName.trim()) return "Please enter your last name.";
  if (!EMAIL_RE.test(p.email.trim())) return "Please enter a valid email address.";
  if (!p.consent) return "Please confirm you agree to be contacted.";
  return null;
}

export function topicLabel(value: string) {
  if (value === "unsure") return "Not sure yet";
  return services.find((s) => s.slug === value)?.short ?? value;
}

export function asPlainText(p: EnquiryPayload) {
  return [
    `New consultation enquiry | ${org.registeredName}`,
    "",
    `Name:              ${p.firstName} ${p.lastName}`,
    `Email:             ${p.email}`,
    `Phone:             ${p.phone || "not given"}`,
    `Preferred contact: ${p.preferredContact || "no preference"}`,
    "",
    `Help needed with:  ${topicLabel(p.topic)}`,
    `Currently in:      ${p.location}`,
    `Status in Canada:  ${p.statusInCanada}`,
    `Previous refusal:  ${p.refused || "not answered"}`,
    "",
    "Situation",
    "--------",
    p.situation,
  ].join("\n");
}

export function buildMailto(p: EnquiryPayload) {
  const subject = `Consultation enquiry | ${p.firstName} ${p.lastName} (${topicLabel(p.topic)})`;
  return `${org.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    asPlainText(p),
  )}`;
}

/** The demo path: no server, so hand the visitor a prefilled mail link. */
export function staticFallback(p: EnquiryPayload): EnquiryState {
  const invalid = validateEnquiry(p);
  if (invalid) return { status: "error", message: invalid };
  return {
    status: "fallback",
    mailto: buildMailto(p),
    reason:
      "This preview has no mail server attached, so your enquiry has not been sent automatically.",
  };
}
