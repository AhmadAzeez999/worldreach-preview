import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/Button";
import { faqs } from "@/lib/content";

/**
 * The questions people are actually asking before they make contact.
 *
 * The four surfaced here are chosen for conversion, not for comfort: what a
 * licence is, what a ghost consultant is, whether outcomes can be guaranteed
 * (no), and what the first conversation costs (nothing). Answering the
 * uncomfortable ones openly is the trust argument. A firm that volunteers
 * "no, we cannot guarantee that" is more credible than one that stays quiet.
 */
export function FaqPreview() {
  const featured = faqs.filter((f) =>
    [
      "What is an RCIC, and how do I check that one is real?",
      "What is a “ghost consultant”, and why does it matter?",
      "Can you guarantee my application will be approved?",
      "What does the first consultation cost?",
    ].includes(f.q),
  );

  return (
    <section className="bg-paper-2 py-24 md:py-32">
      <div className="page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHead
              eyebrow="Straight answers"
              title="The questions worth asking."
              lead="Ask these of any consultant you are considering, not just of us."
            />
            <Reveal i={3} className="mt-8">
              <ArrowLink href="/faq">All questions</ArrowLink>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <Accordion items={featured} defaultOpen={0} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
