"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Reading progress.
 *
 * A two-pixel rule across the very top of the window. On pages that run long,
 * it answers "how much of this is there?" without a word, and it gives the
 * brand red one more quiet, functional job.
 *
 * Driven by a spring so it glides rather than jitters with the wheel, and it
 * is a pure scaleX on a fixed element, so it never triggers layout.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-crimson"
    />
  );
}
