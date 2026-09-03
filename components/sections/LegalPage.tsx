import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export type LegalSection = { heading: string; body: ReactNode[] };

/**
 * Shared shell for the privacy and terms pages.
 *
 * These pages matter more here than on most sites: an immigration practice
 * asks visitors to hand over genuinely sensitive personal information, and
 * being visibly clear about what happens to it is part of the trust argument
 * rather than a footnote to it. Set at a comfortable reading measure with
 * real hierarchy, not shrunk into fine print.
 */
export function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      <section className="bg-paper pb-24 md:pb-32">
        <div className="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Contents rail */}
            <nav aria-label="On this page" className="lg:col-span-4">
              <Reveal>
                <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mute">
                    Last updated
                  </p>
                  <p className="mt-2 text-[0.875rem] text-ink">{updated}</p>

                  <ol className="mt-8 space-y-3 border-t border-line pt-7">
                    {sections.map((s, i) => (
                      <li key={s.heading} className="flex gap-3.5">
                        <span className="t-numeral shrink-0 pt-[0.2rem] text-[0.625rem] text-mute">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={`#${slug(s.heading)}`}
                          className="-my-1 inline-block py-1 text-[0.875rem] leading-snug text-slate underline-offset-4 transition-colors hover:text-ink hover:underline"
                        >
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </nav>

            <div className="lg:col-span-8">
              <div className="space-y-12">
                {sections.map((s, i) => (
                  <Reveal key={s.heading} i={Math.min(i, 3)}>
                    <section id={slug(s.heading)}>
                      <div className="flex items-baseline gap-4">
                        <span className="t-numeral text-[0.625rem] text-crimson">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="t-h3">{s.heading}</h2>
                      </div>
                      <div className="mt-5 space-y-4 border-t border-line pt-5">
                        {s.body.map((para, j) => (
                          <div key={j} className="measure t-body">
                            {para}
                          </div>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
