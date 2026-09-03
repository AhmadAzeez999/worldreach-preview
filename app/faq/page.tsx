import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { faqs, faqCategories, org, consultant } from "@/lib/content";

export const metadata: Metadata = {
  title: "Questions & Answers",
  description: `Straight answers about licensed immigration representation in Canada: what an RCIC is, how to verify one, why no outcome can be guaranteed, and what a first consultation with ${org.registeredName} costs.`,
  alternates: { canonical: "/faq" },
};

/**
 * FAQ.
 *
 * Grouped by category with real headings rather than one long undifferentiated
 * accordion, so the page is scannable and each group is independently
 * linkable. FAQPage structured data is emitted from the same source array that
 * renders the page, so the markup cannot drift from the visible answers.
 */
export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <PageHero
        eyebrow="Questions"
        title="Straight answers."
        lead="Including the ones that are awkward to answer. If a consultant will not give you a direct reply to the questions on this page, that is your answer."
        meta={<VerifyChip />}
      />

      <section className="bg-paper pb-24 md:pb-32">
        <div className="page">
          <div className="space-y-16 md:space-y-20">
            {faqCategories.map((category) => {
              const items = faqs.filter((f) => f.category === category);
              if (!items.length) return null;
              const id = category.toLowerCase().replace(/\s+/g, "-");

              return (
                <div key={category} id={id} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-4">
                    <Reveal>
                      <h2 className="t-h3 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                        {category}
                      </h2>
                    </Reveal>
                  </div>
                  <div className="lg:col-span-8">
                    <Reveal>
                      <Accordion items={items} />
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal className="mt-20">
            <div className="border border-line bg-paper-2 p-8 sm:p-10">
              <h2 className="t-h3">Still unsure?</h2>
              <p className="measure mt-4 t-body">
                A question that is specific to your situation is exactly what
                the first consultation is for, and it costs nothing. If you
                would rather ask before booking, write to{" "}
                <a
                  href={org.emailHref}
                  className="text-ink underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-crimson"
                >
                  {org.email}
                </a>
                .
              </p>
              <p className="measure mt-5 text-[0.8125rem] leading-relaxed text-mute">
                Answers here are general information about how Canadian
                immigration processes work. They are not legal advice for your
                circumstances, and they do not create a client relationship
                with {consultant.name}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
