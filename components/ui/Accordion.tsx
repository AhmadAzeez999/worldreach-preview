"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

export type AccordionItem = {
  q: string;
  a: string;
  category?: string;
};

/**
 * Accessible disclosure list.
 *
 * Built on real <button> elements with aria-expanded / aria-controls rather
 * than <details>, so the open/close can be animated in height without the
 * browser's instant toggle fighting the transition. Content is unmounted when
 * closed, which keeps collapsed answers out of the tab order.
 */
export function Accordion({
  items,
  tone = "light",
  defaultOpen = null,
}: {
  items: readonly AccordionItem[];
  tone?: "light" | "dark";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();
  const baseId = useId();
  const dark = tone === "dark";

  return (
    <ul className={`border-t ${dark ? "border-line-dark" : "border-line"}`}>
      {items.map((item, idx) => {
        const isOpen = open === idx;
        const panelId = `${baseId}-panel-${idx}`;
        const buttonId = `${baseId}-button-${idx}`;

        return (
          <li key={item.q} className={`border-b ${dark ? "border-line-dark" : "border-line"}`}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : idx)}
                className={`group/acc flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 ${
                  dark ? "hover:text-paper" : "hover:text-crimson"
                }`}
              >
                <span
                  className={`t-h4 pr-2 text-[1.0625rem] leading-snug transition-colors duration-300 sm:text-[1.125rem] ${
                    dark ? "text-paper" : isOpen ? "text-crimson" : "text-ink group-hover/acc:text-crimson"
                  }`}
                >
                  {item.q}
                </span>

                {/* Plus that becomes a minus: the vertical bar rotates out.
                    Cheaper and calmer than a flipping chevron. */}
                <span
                  className="relative mt-1.5 block h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <span
                    className={`absolute left-0 top-1/2 h-px w-3.5 -translate-y-1/2 transition-colors duration-300 ${
                      dark ? "bg-mute-dark" : isOpen ? "bg-crimson" : "bg-mute"
                    }`}
                  />
                  <span
                    className={`absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 transition-all duration-[450ms] ease-[cubic-bezier(0.83,0,0.17,1)] ${
                      dark ? "bg-mute-dark" : isOpen ? "bg-crimson" : "bg-mute"
                    } ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: reduced ? 0 : 0.42, ease: EASE.inOut },
                    opacity: { duration: reduced ? 0 : 0.28, ease: EASE.out },
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className={`measure pb-7 pr-8 text-[0.9375rem] leading-relaxed sm:text-[1rem] ${
                      dark ? "text-mute-dark" : "text-slate"
                    }`}
                  >
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
