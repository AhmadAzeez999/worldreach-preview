"use server";

import { org, consultant } from "@/lib/content";
import {
  asPlainText,
  buildMailto,
  topicLabel,
  validateEnquiry,
  type EnquiryPayload,
  type EnquiryState,
} from "@/lib/enquiry";

/**
 * Consultation enquiry handler.
 *
 * Delivery is intentionally provider-agnostic and configured by environment,
 * so no third-party SDK is added to the bundle and no credential ever reaches
 * the client:
 *
 *   RESEND_API_KEY:   if set, the enquiry is emailed via Resend's REST API
 *   ENQUIRY_TO:       recipient, defaulting to the practice's public address
 *   ENQUIRY_FROM:     verified sender domain, required by Resend
 *
 * If no provider is configured, the action does NOT pretend to have delivered
 * the enquiry. It returns `status: "fallback"` and the UI surfaces a prefilled
 * mail link so the message still reaches the business. Silently swallowing a
 * lead would be the worst possible failure mode for this site.
 *
 * The shaping functions live in lib/enquiry.ts rather than here, so the static
 * demo build (which has no server to call) can compose exactly the same
 * message in the browser.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryState> {
  const invalid = validateEnquiry(payload);
  if (invalid) return { status: "error", message: invalid };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO || org.email;
  const from = process.env.ENQUIRY_FROM;

  if (!apiKey || !from) {
    return {
      status: "fallback",
      mailto: buildMailto(payload),
      reason:
        "Email delivery is not configured on this deployment yet, so your enquiry has not been sent automatically.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `Consultation enquiry | ${payload.firstName} ${payload.lastName} (${topicLabel(payload.topic)})`,
        text: `${asPlainText(payload)}\n\nSubmitted ${new Date().toISOString()}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[consultation] provider rejected the enquiry:", res.status, detail);
      return {
        status: "fallback",
        mailto: buildMailto(payload),
        reason: "We could not send your enquiry automatically just now.",
      };
    }

    return { status: "sent" };
  } catch (err) {
    console.error("[consultation] delivery failed:", err);
    return {
      status: "fallback",
      mailto: buildMailto(payload),
      reason: "We could not reach our mail service just now.",
    };
  }
}

/** Exposed for the contact page's shorter form. */
export async function submitShortMessage(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  company?: string;
}): Promise<EnquiryState> {
  const [firstName, ...rest] = payload.name.trim().split(/\s+/);

  return submitEnquiry({
    topic: "unsure",
    location: "Not stated",
    statusInCanada: "Not stated",
    situation: payload.message,
    refused: "",
    firstName: firstName ?? "",
    lastName: rest.join(" ") || "(not given)",
    email: payload.email,
    phone: payload.phone,
    preferredContact: "",
    consent: payload.consent,
    company: payload.company,
  });
}

export async function practiceSignature() {
  return `${consultant.name}, ${consultant.title} ${consultant.rcicNumber}`;
}
