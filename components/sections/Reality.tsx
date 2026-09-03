import { Reveal, RuleDraw } from "@/components/motion/Reveal";

/**
 * The problem statement.
 *
 * The client's existing site opens with "Do you feel overwhelmed by the
 * immigration process?" That is a genuinely good instinct, wasted as a headline over
 * a stock banner. Kept, but moved to where it belongs: after the visitor knows
 * who is talking, as the pivot into how the practice actually helps.
 *
 * Set as an oversized editorial paragraph rather than a heading, so it reads
 * as someone speaking rather than as marketing copy shouting.
 */
export function Reality() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <RuleDraw />
            <Reveal as="p" variant="fade" className="pt-6">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-crimson sm:text-[0.6875rem]">
                Why this is hard
              </span>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <Reveal>
              <p className="font-display text-[1.75rem] leading-[1.28] tracking-[-0.022em] text-ink sm:text-[2.125rem] lg:text-[2.5rem] lg:leading-[1.24]">
                Immigration is one of the largest decisions a person makes, and
                it is handled through a system that was never designed to be
                understood from the outside.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:mt-12">
              <Reveal i={1}>
                <p className="t-body">
                  The rules change without notice. Programmes that look
                  identical produce completely different outcomes for the same
                  person. A form filled in honestly but incorrectly can cost a
                  year, and a refusal follows you into every application that
                  comes after it.
                </p>
              </Reveal>
              <Reveal i={2}>
                <p className="t-body">
                  Around all of that sits an industry with very little quality
                  control, where anyone can call themselves a consultant. The
                  first real decision you make is not which programme to
                  apply under. It is who you let near your file.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
