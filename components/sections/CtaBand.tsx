import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "@/components/brand/Logo";
import { org, primaryCta } from "@/lib/content";

/**
 * Closing call to action.
 *
 * One primary action on the entire site, book the free consultation. The
 * phone number sits beside it as an alternative channel rather than a
 * competing button, because a visitor who is ready to speak now should not
 * have to hunt, but neither should the page present two equal choices.
 */
export function CtaBand({
  title = "Start with a conversation.",
  lead = "The first consultation is free, it runs by video or phone, and nothing is charged before you have agreed to it. Bring your situation as it actually is.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section data-dark-section className="relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute -left-[14%] top-1/2 hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <Logo tone="light" className="h-[34rem] w-auto opacity-[0.05]" />
      </div>

      <div className="page relative py-24 md:py-32">
        <div className="lg:ml-auto lg:max-w-2xl">
          <Reveal as="p" variant="fade">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-crimson-2 sm:text-[0.6875rem]">
              Next step
            </span>
          </Reveal>

          <Reveal i={1} className="mt-6">
            <h2 className="t-h2 text-paper">{title}</h2>
          </Reveal>

          <Reveal i={2} className="mt-6">
            <p className="measure text-[1.0625rem] leading-relaxed text-mute-dark sm:text-[1.125rem]">
              {lead}
            </p>
          </Reveal>

          <Reveal i={3} className="mt-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <Magnetic strength={7}>
                <Button href={primaryCta.href} size="lg" variant="on-ink-solid" withArrow>
                  {primaryCta.label}
                </Button>
              </Magnetic>

              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mute-dark">
                  Or call directly
                </span>
                <a
                  href={org.phoneHref}
                  className="t-numeral text-[1.0625rem] font-medium text-paper underline-offset-4 hover:underline"
                >
                  {org.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal i={4} className="mt-10">
            <p className="t-small border-t border-line-dark pt-6 text-mute-dark">
              {org.hours}. Replies usually come within one business day.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
