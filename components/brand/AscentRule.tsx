"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * A hairline that rises from left to right, echoing the logo's trajectory.
 *
 * Used as a section rule instead of a flat <hr>, so the page keeps rhyming
 * with the mark's central gesture without ever repeating the mark itself.
 */
export function AscentRule({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const common = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  const d = "M 0 23 C 90 23, 140 14, 200 9 C 250 5, 290 2, 320 1";

  return (
    <svg
      viewBox="0 0 320 24"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {animate ? (
        <motion.path
          d={d}
          {...common}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.2, ease: EASE.out }}
        />
      ) : (
        <path d={d} {...common} />
      )}
    </svg>
  );
}
