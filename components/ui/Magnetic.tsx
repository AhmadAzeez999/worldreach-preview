"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Magnetic hover.
 *
 * The wrapped element leans a few pixels toward the pointer while the pointer
 * is over it, then springs back. It makes a primary action feel like it is
 * reaching for the cursor, which is the whole trick: the effect is only
 * noticeable as a feeling, not as an animation.
 *
 * Constraints that keep it on the right side of tasteful:
 *   • `strength` caps the travel, defaulting to 6px. Anything more and the
 *     button starts sliding out from under the pointer, which is worse than no
 *     effect at all.
 *   • it is skipped entirely on coarse pointers, where there is no hover and
 *     the listeners would only cost battery.
 *   • the wrapper never changes layout, so nothing around it moves.
 *
 * Reserved for genuinely primary actions. Applied to everything it becomes
 * noise, and the hierarchy it is meant to signal disappears.
 */
export function Magnetic({
  children,
  strength = 6,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 260, damping: 18, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Offset from centre, normalised, then capped by `strength`.
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength * 0.6);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.span>
  );
}
