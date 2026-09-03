import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { org, consultant } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
  description: `Terms of use and professional disclaimer for the ${org.registeredName} website.`,
  alternates: { canonical: "/terms" },
};

/**
 * ⚠ REVIEW BEFORE LAUNCH: a good-faith baseline for the client's own review.
 *
 * The substantive statements here are the ones an RCIC's site is obliged to be
 * unambiguous about: no guaranteed outcomes, no claimed influence with IRCC,
 * and general information is not advice. See CICC Code s.44(2).
 */
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms and disclaimer."
      lead="What this website is, what it is not, and what you can hold us to."
      updated="2 September 2026"
      sections={[
        {
          heading: "General information, not advice",
          body: [
            <>
              Everything on this website is general information about how
              Canadian immigration processes work. It is not advice for your
              particular circumstances, and it should not be relied on as such.
              Immigration rules change frequently and without notice, and a
              page that was accurate when written may not be accurate when you
              read it.
            </>,
            <>
              Advice for your situation is given in a consultation, once the
              facts of your case are known.
            </>,
          ],
        },
        {
          heading: "No client relationship is created here",
          body: [
            <>
              Browsing this site, sending a message, or submitting the
              consultation form does not make you a client of{" "}
              {org.registeredName}. A professional relationship begins only when
              a retainer agreement has been signed by both you and{" "}
              {consultant.name}.
            </>,
          ],
        },
        {
          heading: "No guarantee of outcome",
          body: [
            <>
              No immigration consultant or lawyer can guarantee that an
              application will be approved, and we make no such promise.
              Decisions on all applications rest solely with Immigration,
              Refugees and Citizenship Canada, and with provincial or
              territorial authorities where they are involved.
            </>,
            <>
              Neither do we claim any special relationship with, or influence
              over, IRCC or any government body. Anyone who tells you otherwise
              is acting in breach of the rules that govern this profession, and
              you should treat that as a warning.
            </>,
          ],
        },
        {
          heading: "Professional regulation",
          body: [
            <>
              {consultant.name} is a {consultant.title}, registration{" "}
              {consultant.rcicNumber}, and is regulated by the{" "}
              {consultant.regulator}. That registration can be confirmed
              independently on the College&rsquo;s public register at{" "}
              <a
                href={consultant.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-line-2 underline-offset-4 hover:decoration-crimson"
              >
                {consultant.registerLabel}
              </a>
              . The practice is bound by the College&rsquo;s Code of
              Professional Conduct, which includes a complaints process
              available to clients.
            </>,
          ],
        },
        {
          heading: "Links to other sites",
          body: [
            <>
              Where we link to external sites, such as the College&rsquo;s
              register or Government of Canada pages, we do so because they are
              and authoritative. We do not control them and are not responsible
              for their content.
            </>,
          ],
        },
        {
          heading: "Contacting us",
          body: [
            <>
              Questions about these terms can be sent to{" "}
              <a
                href={org.emailHref}
                className="text-ink underline decoration-line-2 underline-offset-4 hover:decoration-crimson"
              >
                {org.email}
              </a>{" "}
              or {org.phoneDisplay}.
            </>,
          ],
        },
      ]}
    />
  );
}
