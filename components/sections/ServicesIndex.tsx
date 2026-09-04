"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EASE } from "@/lib/motion";
import { services } from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * The service index.
 *
 * Presented as an editorial index, numbered rows separated by hairlines,
 * rather than the three-column icon-card grid this category defaults to. Cards
 * force every service to the same visual weight and the same truncated length;
 * a numbered index reads as a table of contents, which is the "here is the
 * whole of it, nothing hidden" tone the page wants.
 *
 * Titles are verb-led ("Work in Canada", not "Work Permits") because visitors
 * arrive with an intention rather than a programme name. The programme names
 * sit underneath, where they still do their SEO work.
 *
 * PREVIEW PANEL. An earlier version floated the photograph under the cursor.
 * It demoed well and was bad UX: the panel sat on top of the copy the visitor
 * was reading, and it made the text impossible to select. The image now lives
 * in its own sticky column, which is strictly better on every count:
 *
 *   • it never covers text, and never interferes with selection or clicking
 *   • it is driven by focus as well as hover, so keyboard users get it too
 *   • it is visible by default rather than being a hidden hover easter egg
 *   • it holds a fixed position, so the eye is not chasing it around
 *
 * The panel is decorative and marked aria-hidden. Everything it conveys is
 * already in the list beside it. Below `lg` there is no room for a second
 * column, so it is not rendered at all and the rows simply run full width.
 */
export function ServicesIndex({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
      {/* ---------------- The index ---------------- */}
      <RevealGroup
        as="ul"
        className="border-t border-line lg:col-span-7"
        amount={0.055}
      >
        {services.map((service, idx) => (
          <RevealItem as="li" key={service.slug} className="border-b border-line">
            <Link
              href={`/services/${service.slug}`}
              onPointerEnter={() => setActive(idx)}
              onFocus={() => setActive(idx)}
              className="group/row relative flex items-start gap-5 py-7 transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] sm:gap-7 sm:py-8"
            >
              {/* Hover wash bleeding past the container edges, so the row reads
                  as a full-width band rather than an inset card. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-[var(--page-pad)] right-0 -z-10 origin-left scale-x-0 bg-paper-2 opacity-0 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:scale-x-100 group-hover/row:opacity-100 lg:-left-6"
              />

              <span className="t-numeral mt-1.5 w-7 shrink-0 text-[0.6875rem] text-mute transition-colors duration-500 group-hover/row:text-crimson sm:mt-2">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="t-h3 block text-ink transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-1.5">
                  {service.title}
                </span>

                <span className="mt-1.5 block text-[0.875rem] italic leading-snug text-mute">
                  {service.intent}
                </span>

                {!compact ? (
                  <span className="measure mt-3 block text-[0.9375rem] leading-relaxed text-slate">
                    {service.summary}
                  </span>
                ) : null}

                <span className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  {service.programs.map((p, i) => (
                    <span key={p.name} className="flex items-center gap-2">
                      {i > 0 ? (
                        <span className="h-2.5 w-px bg-line-2" aria-hidden="true" />
                      ) : null}
                      <span className="text-[0.75rem] text-mute">{p.name}</span>
                    </span>
                  ))}
                </span>
              </span>

              <span className="mt-2 shrink-0 self-center pl-2">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 text-mute transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-1 group-hover/row:text-crimson"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ---------------- Sticky preview ---------------- */}
      <aside aria-hidden="true" className="hidden lg:col-span-5 lg:block">
        {/* `sticky` has to sit OUTSIDE the Reveal wrapper. Reveal renders a
            motion element sized to its content, and a sticky child can only
            travel within its parent's box, so nesting it inside meant the
            panel scrolled away instead of holding position. */}
        <div className="sticky top-[calc(var(--header-h)+2.5rem)]">
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-paper-3">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.55, ease: EASE.out },
                    scale: { duration: 1.1, ease: EASE.out },
                  }}
                >
                  <Image
                    src={asset(current.image)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 0px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Grounds the caption without flattening the photograph. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink/95 via-ink/60 to-transparent" />

              {/* `data-over-image` marks text whose real backdrop is a
                  photograph plus a gradient, which DOM-based contrast tooling
                  cannot see. Measured from rendered pixels instead: 8.2:1. */}
              <div data-over-image className="absolute inset-x-0 bottom-0 p-6">
                <div className="mask-line">
                  <motion.p
                    key={`${current.slug}-label`}
                    className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-crimson-2"
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, ease: EASE.out }}
                  >
                    {current.short}
                  </motion.p>
                </div>
                <div className="mask-line mt-2">
                  <motion.p
                    key={`${current.slug}-title`}
                    className="font-display text-[1.375rem] leading-tight tracking-[-0.02em] text-paper"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, delay: 0.05, ease: EASE.out }}
                  >
                    {current.title}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Position within the list, so the panel reads as tied to the row
                under the cursor rather than floating free. */}
            <div className="mt-5 flex items-center gap-3">
              <span className="t-numeral text-[0.625rem] text-mute">
                {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
              <span className="relative h-px flex-1 bg-line">
                <motion.span
                  className="absolute inset-y-0 left-0 block bg-crimson"
                  animate={{ width: `${((active + 1) / services.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: EASE.out }}
                />
              </span>
            </div>
          </Reveal>
        </div>
      </aside>
    </div>
  );
}

/** Compact variant for the foot of service detail pages. */
export function ServicesQuickList({ excludeSlug }: { excludeSlug?: string }) {
  const list = services.filter((s) => s.slug !== excludeSlug);

  return (
    <Reveal>
      <ul className="grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group/q flex h-full flex-col justify-between gap-4 bg-paper p-6 transition-colors duration-400 hover:bg-paper-2"
            >
              <span>
                <span className="t-h4 block transition-colors duration-300 group-hover/q:text-crimson">
                  {s.short}
                </span>
                <span className="mt-2 block text-[0.875rem] leading-relaxed text-mute">
                  {s.intent}
                </span>
              </span>
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 text-mute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/q:translate-x-1 group-hover/q:text-crimson"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
