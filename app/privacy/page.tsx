import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { org, consultant } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${org.registeredName} collects, uses and protects the personal information you provide.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * ⚠ REVIEW BEFORE LAUNCH: this is a good-faith baseline reflecting how the
 * site as built actually behaves. It collects only what the forms collect,
 * and there is no analytics or tracking in the codebase. It is not a
 * substitute for the client's own review, and it must be updated if analytics,
 * a CRM, a scheduling tool, or a chat widget are added later.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="What we do with your information."
      lead="Immigration work involves genuinely sensitive information. This page sets out plainly what this website collects and what happens to it."
      updated="2 September 2026"
      sections={[
        {
          heading: "Who is responsible",
          body: [
            <>
              {org.registeredName} is the practice of {consultant.name},{" "}
              {consultant.title} {consultant.rcicNumber}, based in {org.locality}
              . Questions about privacy can be sent to{" "}
              <a
                href={org.emailHref}
                className="text-ink underline decoration-line-2 underline-offset-4 hover:decoration-crimson"
              >
                {org.email}
              </a>
              .
            </>,
          ],
        },
        {
          heading: "What this website collects",
          body: [
            <>
              Only what you type into a form and choose to send. That is your
              name, email address, optional phone number, and whatever you write
              about your situation, including, on the consultation form, the
              country you are in, your current status in Canada, and whether you
              have previously been refused.
            </>,
            <>
              This site sets no advertising cookies and runs no third-party
              analytics or tracking scripts. A single browser storage entry is
              used to remember that you have already seen the opening animation
              so it does not replay; it contains no personal information and
              never leaves your device.
            </>,
          ],
        },
        {
          heading: "Why we collect it",
          body: [
            <>
              To reply to you, to arrange and hold your consultation, and, if
              you go on to instruct us, to carry out the work. We do not sell
              your information, and we do not use it for marketing unrelated to
              your enquiry.
            </>,
          ],
        },
        {
          heading: "Who else sees it",
          body: [
            <>
              Form submissions are delivered by email to the practice. Where an
              application is prepared and filed on your behalf, the relevant
              information is submitted to Immigration, Refugees and Citizenship
              Canada, and where applicable to a province or territory, because
              that is the purpose of the work.
            </>,
            <>
              Beyond that, information is disclosed only where the law requires
              it, or where a regulator such as the {consultant.regulator} is
              exercising its oversight of the profession.
            </>,
          ],
        },
        {
          heading: "Sending documents safely",
          body: [
            <>
              Please do not email passports, identity documents, medical records
              or financial statements before we have spoken. Ordinary email is
              not a secure channel. Once we are working together we will agree a
              secure method for sharing documents.
            </>,
          ],
        },
        {
          heading: "How long it is kept",
          body: [
            <>
              Enquiries that do not lead to work are kept only as long as needed
              to deal with them. Client files are retained for the period the{" "}
              {consultant.regulator} requires of its licensees, and are then
              destroyed.
            </>,
          ],
        },
        {
          heading: "Your rights",
          body: [
            <>
              You may ask what personal information we hold about you, ask for
              it to be corrected, or ask us to delete it where we are not
              required to keep it. Write to{" "}
              <a
                href={org.emailHref}
                className="text-ink underline decoration-line-2 underline-offset-4 hover:decoration-crimson"
              >
                {org.email}
              </a>{" "}
              and we will respond.
            </>,
            <>
              If you are not satisfied with how we have handled your
              information, you may complain to the Office of the Privacy
              Commissioner of Canada.
            </>,
          ],
        },
      ]}
    />
  );
}
