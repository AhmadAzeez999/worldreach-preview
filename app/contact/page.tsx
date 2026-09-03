import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { AscentRule } from "@/components/brand/AscentRule";
import { ArrowLink } from "@/components/ui/Button";
import { org, consultant } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${org.registeredName} in ${org.locality}. Phone ${org.phoneDisplay}, email ${org.email}. ${org.hours}. Consultations by video or phone.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    {
      k: "Phone",
      v: org.phoneDisplay,
      href: org.phoneHref,
      mono: true,
      note: org.hoursShort,
    },
    { k: "Email", v: org.email, href: org.emailHref, mono: false, note: "Replies within one business day" },
    { k: "Office", v: org.locality, href: null, mono: false, note: "Consultations by video or phone" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We are here to help."
        lead="Whether you have one question or a whole situation to untangle, start wherever is easiest for you."
        meta={<VerifyChip />}
      />

      <section className="bg-paper pb-24 md:pb-32">
        <div className="page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---------------- Channels ---------------- */}
            <div className="lg:col-span-5">
              <Reveal>
                <AscentRule className="h-5 w-full text-line-2" />
              </Reveal>

              <Reveal i={1}>
                <dl className="mt-9 space-y-9">
                  {channels.map((c) => (
                    <div key={c.k}>
                      <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mute">
                        {c.k}
                      </dt>
                      <dd className="mt-2.5">
                        {c.href ? (
                          <a
                            href={c.href}
                            className={`inline-block py-1 text-[1.125rem] text-ink underline-offset-4 transition-colors hover:text-crimson hover:underline ${
                              c.mono ? "t-numeral font-medium" : ""
                            }`}
                          >
                            {c.v}
                          </a>
                        ) : (
                          <span className="text-[1.125rem] text-ink">{c.v}</span>
                        )}
                        <p className="mt-1.5 text-[0.8125rem] text-mute">{c.note}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal i={2} className="mt-12">
                <div className="border border-line bg-paper-2 p-7">
                  <h2 className="t-h4">Ready to book?</h2>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-slate">
                    The consultation request takes about two minutes and gives
                    us what we need to make the first conversation useful.
                  </p>
                  <div className="mt-5">
                    <ArrowLink href="/consultation">Book a free consultation</ArrowLink>
                  </div>
                </div>
              </Reveal>

              <Reveal i={3} className="mt-10">
                <p className="text-[0.8125rem] leading-relaxed text-mute">
                  Messages are read by {consultant.name}, {consultant.title}{" "}
                  {consultant.rcicNumber}. Please do not send sensitive
                  documents such as passports or medical records by email until
                  we have spoken and agreed a secure way to share them.
                </p>
              </Reveal>
            </div>

            {/* ---------------- Form ---------------- */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="border border-line bg-paper-2 p-7 sm:p-10">
                  <h2 className="t-h3">Send a message</h2>
                  <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-slate">
                    For a general question. If you already know you want a
                    consultation, the{" "}
                    <a
                      href="/consultation"
                      className="text-ink underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-crimson"
                    >
                      booking form
                    </a>{" "}
                    is a better place to start.
                  </p>
                  <div className="mt-9">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
