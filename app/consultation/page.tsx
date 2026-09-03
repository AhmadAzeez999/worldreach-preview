import type { Metadata } from "next";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { Reveal } from "@/components/motion/Reveal";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { org, consultant, process } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description: `Request a free consultation with ${consultant.name}, ${consultant.titleShort} ${consultant.rcicNumber}. By video or phone, wherever you are. No obligation, and nothing is charged before you agree to it.`,
  alternates: { canonical: "/consultation" },
};

/**
 * The conversion page.
 *
 * Layout puts the form first on mobile and left on desktop, with reassurance
 * beside it rather than above it, the visitor arriving here has already
 * decided to act, and should not have to scroll past more persuasion to do it.
 *
 * The sidebar answers the three objections that stop people submitting:
 * what it costs, what happens next, and who is receiving this.
 */
export default function ConsultationPage() {
  return (
    <>
      <section className="bg-paper pb-24 pt-[calc(var(--header-h)+3.5rem)] md:pb-32 md:pt-[calc(var(--header-h)+5rem)]">
        <div className="page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---------------- Form ---------------- */}
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-crimson sm:text-[0.6875rem]">
                Free consultation
              </p>
              <h1 className="t-h1 mt-6 max-w-[15ch]">Let&rsquo;s start with a conversation.</h1>
              <p className="measure mt-7 t-lead">
                Four short questions so the first conversation begins somewhere
                useful, rather than with twenty minutes of background.
              </p>

              <div className="mt-12 md:mt-14">
                <ConsultationForm />
              </div>
            </div>

            {/* ---------------- Reassurance ---------------- */}
            <aside className="lg:col-span-5">
              <Reveal>
                <div className="border border-line bg-paper-2 p-7 sm:p-9 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                  <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-crimson">
                    What happens next
                  </h2>

                  <ol className="mt-7 space-y-5">
                    {process.slice(0, 3).map((s) => (
                      <li key={s.n} className="flex gap-4">
                        <span className="t-numeral shrink-0 pt-0.5 text-[0.625rem] text-mute">
                          {s.n}
                        </span>
                        <div>
                          <p className="text-[0.9375rem] font-medium leading-snug text-ink">
                            {s.title}
                          </p>
                          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-slate">
                            {s.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <dl className="mt-8 space-y-4 border-t border-line-2 pt-7">
                    {[
                      { k: "Cost", v: "Free. Nothing is charged before you agree to it" },
                      { k: "Format", v: "Video or phone, wherever you are" },
                      { k: "Reply", v: `Usually within one business day (${org.hoursShort})` },
                    ].map((row) => (
                      <div key={row.k} className="flex gap-4">
                        <dt className="w-16 shrink-0 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-mute">
                          {row.k}
                        </dt>
                        <dd className="text-[0.875rem] leading-relaxed text-ink">{row.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8 border-t border-line-2 pt-7">
                    <p className="text-[0.8125rem] leading-relaxed text-slate">
                      Your enquiry goes directly to{" "}
                      <span className="text-ink">{consultant.name}</span>, the{" "}
                      {consultant.title} who will handle your file.
                    </p>
                    <div className="mt-5">
                      <VerifyChip />
                    </div>
                  </div>

                  <div className="mt-8 border-t border-line-2 pt-7">
                    <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-mute">
                      Prefer to talk now
                    </p>
                    <a
                      href={org.phoneHref}
                      className="t-numeral mt-1.5 inline-block py-1.5 text-[1.0625rem] font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {org.phoneDisplay}
                    </a>
                    <a
                      href={org.emailHref}
                      className="inline-block break-words py-1.5 text-[0.875rem] text-slate underline-offset-4 hover:text-ink hover:underline"
                    >
                      {org.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
