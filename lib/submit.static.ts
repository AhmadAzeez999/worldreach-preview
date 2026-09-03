import { staticFallback, type EnquiryPayload, type EnquiryState } from "@/lib/enquiry";

/**
 * Static preview stand-in for the server action.
 *
 * A static export has no server to post to, so submissions resolve in the
 * browser to the same prefilled mail link the real action falls back to when
 * no mail provider is configured. The visitor still sees a complete,
 * believable flow through to the confirmation screen.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryState> {
  return staticFallback(payload);
}

export async function submitShortMessage(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  company?: string;
}): Promise<EnquiryState> {
  const [firstName, ...rest] = payload.name.trim().split(/\s+/);
  return staticFallback({
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
