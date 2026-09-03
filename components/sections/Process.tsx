"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Figure } from "@/components/ui/Figure";
import { process } from "@/lib/content";

/**
 * What actually happens when you get in touch.
 *
 * The biggest source of friction in this market is not price. It is not
 * knowing what you are agreeing to when you make contact. Setting the whole
 * engagement out as five named steps removes that, and it is the single
 * highest-leverage conversion change on the site.
 *
 * The rail beside the steps fills with scroll position. It is the one piece of
 * scroll-linked motion on the site, and it earns its place by communicating
 * something real, progress through a sequence, rather than decorating.
 */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 55%"],
  });

  // Spring keeps the rail from twitching with wheel jitter.
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section className="bg-paper py-24 md:py-32" id="how-it-works">
      <div className="page">
        <SectionHead
          eyebrow="What to expect"
          title="From first message to decision."
          lead="No obligation attaches to getting in touch, and nothing is charged before you have agreed to it. Here is the whole sequence."
          aside={
            <Figure
              src="/photos/consultation.jpg"
              alt="A video consultation open on a laptop at a desk"
              className="aspect-[4/3] w-full md:w-[22rem]"
              sizes="(min-width: 768px) 22rem, 100vw"
            />
          }
        />

        <div className="relative mt-14 md:mt-20">
          {/* The rail. Track and fill are separate so the unfilled portion
              still reads as a structural line rather than empty space. */}
          <div
            className="pointer-events-none absolute bottom-6 left-[0.9375rem] top-3 w-px bg-line md:left-[4.75rem]"
            aria-hidden="true"
          >
            <motion.div className="h-full w-full origin-top bg-crimson" style={{ scaleY }} />
          </div>

          <ol ref={ref} className="relative space-y-11 md:space-y-14">
              {process.map((step, idx) => (
                <Reveal as="li" i={idx} key={step.n} className="relative pl-11 md:pl-28">
                  {/* Node */}
                  <span
                    className="absolute left-[0.5rem] top-2 flex h-4 w-4 items-center justify-center rounded-full border border-line bg-paper md:left-[4.25rem]"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                  </span>

                  <span className="t-numeral absolute left-0 top-1.5 hidden text-[0.6875rem] text-mute md:block">
                    {step.n}
                  </span>

                  <div className="md:flex md:items-baseline md:justify-between md:gap-10">
                    <h3 className="t-h3 text-ink">{step.title}</h3>
                    <p className="mt-2 shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mute md:mt-0 md:text-right">
                      {step.aside}
                    </p>
                  </div>

                  <p className="measure mt-4 text-[1rem] leading-relaxed text-slate">
                    {step.body}
                  </p>
                </Reveal>
              ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
