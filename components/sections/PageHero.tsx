"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

/**
 * Interior page hero.
 *
 * Light rather than dark: reserving the ink treatment for the homepage hero
 * and the closing CTA keeps those two moments distinct, and stops the site
 * turning into an alternating dark/light stripe pattern.
 *
 * Kept short deliberately: an interior page's job is to get the visitor to
 * the substance, not to perform another full-height entrance.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb,
  meta,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumb?: { href: string; label: string };
  meta?: ReactNode;
}) {
  return (
    <section className="bg-paper pb-14 pt-[calc(var(--header-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+5.5rem)]">
      <div className="page">
        {breadcrumb ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE.out }}
          >
            <Link
              href={breadcrumb.href}
              className="group/bc -my-2 inline-flex items-center gap-2 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mute transition-colors hover:text-crimson"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bc:-translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
              </svg>
              {breadcrumb.label}
            </Link>
          </motion.div>
        ) : null}

        {eyebrow ? (
          <motion.p
            className={`font-mono text-[0.625rem] uppercase tracking-[0.18em] text-crimson sm:text-[0.6875rem] ${
              breadcrumb ? "mt-8" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.06, ease: EASE.out }}
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <h1 className={`t-h1 max-w-[16ch] ${eyebrow || breadcrumb ? "mt-6" : ""}`}>
          <span className="mask-line">
            <motion.span
              className="block"
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.1, ease: EASE.out }}
            >
              {title}
            </motion.span>
          </span>
        </h1>

        {lead ? (
          <motion.div
            className="measure mt-7"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.26, ease: EASE.out }}
          >
            <p className="t-lead">{lead}</p>
          </motion.div>
        ) : null}

        {meta ? (
          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.36, ease: EASE.out }}
          >
            {meta}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
