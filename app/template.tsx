"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Page transition.
 *
 * `template.tsx` remounts on every navigation, which gives a clean enter
 * animation without the fragility of orchestrating exits through
 * AnimatePresence in the App Router.
 *
 * The move is deliberately small, 10px and a short opacity ramp. A heavier
 * transition would sit between the visitor and the information they came for,
 * and on a site whose job is to feel trustworthy, responsiveness reads as
 * competence.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}
