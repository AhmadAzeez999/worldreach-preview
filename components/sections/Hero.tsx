"use client";

import { motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE } from "@/lib/motion";
import { org, consultant, primaryCta } from "@/lib/content";

/**
 * Hero.
 *
 * Strategy: World Reach is a single licensed practitioner competing in a
 * market whose defining anxiety is fraud. Unlicensed "ghost consultants" who
 * take a fee and vanish. The larger firms answer that with scale signals
 * (client counts, media logos, team grids). World Reach has none of those and
 * must not manufacture them.
 *
 * So the hero inverts the weakness: it leads with the one claim a stranger can
 * independently check in ten seconds, the licence number, and puts the
 * register link in reach immediately. Verifiability, not volume.
 *
 * No stock photography. There is no authentic imagery available yet, and a
 * generic smiling-family photo would undercut the exact quality the page is
 * trying to establish.
 */

const lines = ["Immigration help", "you can verify."];

export function Hero() {
  // The intro overlay runs first on a cold load; the hero waits for it.
  const base = 0.15;

  const facts = [
    { label: "Consultant", value: consultant.name, mono: false },
    { label: "Licence", value: `${consultant.titleShort} ${consultant.rcicNumber}`, mono: true },
    { label: "Based in", value: org.locality, mono: false },
    { label: "First consultation", value: "Free · video or phone", mono: false },
  ];

  return (
    <section data-dark-section className="relative overflow-hidden bg-ink text-paper">
      {/* Background mark, cropped hard by the right edge so it reads as
          architecture, not a watermark. Draws itself in behind the copy. */}
      <div
        className="pointer-events-none absolute -right-[16%] top-1/2 hidden -translate-y-1/2 sm:block lg:-right-[10%]"
        aria-hidden="true"
      >
        <Logo
          tone="light"
          className="h-[32rem] w-auto opacity-[0.045] lg:h-[40rem] xl:h-[46rem]"
        />
      </div>

      {/* Hairline grid, a quiet structural cue borrowed from editorial and
          technical drawing, at very low contrast. */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        <div className="page-wide relative h-full">
          <div className="absolute inset-y-0 left-[var(--page-pad)] w-px bg-paper/[0.06]" />
          <div className="absolute inset-y-0 right-[var(--page-pad)] w-px bg-paper/[0.06]" />
        </div>
      </div>

      <div className="page relative flex min-h-[46rem] flex-col justify-between pb-10 pt-[calc(var(--header-h)+4rem)] md:min-h-[min(92vh,54rem)] md:pb-12 md:pt-[calc(var(--header-h)+6rem)]">
        <div>
          {/* Eyebrow */}
          <motion.p
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-mute-dark sm:text-[0.6875rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: base + 0.05, ease: EASE.out }}
          >
            {/* Short form on mobile so the line never wraps and strands
                the divider. */}
            <span className="sm:hidden">
              {org.city}, {org.regionCode}
            </span>
            <span className="hidden sm:inline">{org.locality}</span>
            <span className="h-3 w-px bg-paper/20" aria-hidden="true" />
            <span>Clients worldwide</span>
          </motion.p>

          {/* Headline, each line rises from behind its own mask edge. */}
          <h1 className="t-display mt-7 max-w-[18ch] text-paper">
            {lines.map((line, i) => (
              <span key={line} className="mask-line">
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.05,
                    delay: base + 0.12 + i * 0.085,
                    ease: EASE.out,
                  }}
                >
                  {/* "verify" is the whole proposition, so it carries the one
                      accent on the page's most important line. */}
                  {i === 1 ? (
                    <>
                      you can{" "}
                      <em className="not-italic text-crimson-2">verify</em>.
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="measure mt-8 text-[1.0625rem] leading-relaxed text-mute-dark sm:text-[1.1875rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: base + 0.42, ease: EASE.out }}
          >
            {org.registeredName} is the practice of{" "}
            <span className="text-paper">{consultant.name}</span>, a{" "}
            {consultant.title}. One licensed consultant, accountable for your
            file from the first conversation through to the decision.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: base + 0.52, ease: EASE.out }}
          >
            <Magnetic>
              <Button href={primaryCta.href} size="lg" variant="on-ink-solid" withArrow>
                {primaryCta.label}
              </Button>
            </Magnetic>
            <Button href="/services" size="lg" variant="on-ink">
              What we handle
            </Button>
          </motion.div>

          <motion.div
            className="on-ink mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: base + 0.66, ease: EASE.out }}
          >
            <VerifyChip tone="dark" />
            <p className="mt-3 max-w-md text-[0.8125rem] leading-relaxed text-mute-dark">
              Check that number on the College&rsquo;s public register before you
              hire anyone, including us.
            </p>
          </motion.div>
        </div>

        {/* Facts strip, replaces the invented-statistics band that sites in
            this category usually run here. Everything below is verifiable. */}
        <motion.dl
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line-dark pt-8 md:mt-12 lg:grid-cols-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: base + 0.78, ease: EASE.out }}
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mute-dark sm:text-[0.625rem]">
                {f.label}
              </dt>
              <dd
                className={`mt-2.5 text-[0.875rem] leading-snug text-paper sm:text-[0.9375rem] ${
                  f.mono ? "t-numeral" : ""
                }`}
              >
                {f.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

    </section>
  );
}
