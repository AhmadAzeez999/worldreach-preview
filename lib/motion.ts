import type { Variants, Transition } from "motion/react";

/**
 * One motion vocabulary for the whole site.
 *
 * The easing curves mirror the custom properties in globals.css so CSS
 * transitions and JS-driven animation feel like the same hand.
 *
 * Principle: entrances commit quickly then settle slowly (expo-out). Nothing
 * on this site should make a user wait for it, so reveal distances stay small
 *, motion directs attention, it does not perform.
 *
 * Reduced motion is NOT handled here. It is applied globally by
 * MotionProvider (MotionConfig reducedMotion="user"), because branching on the
 * preference during render breaks hydration, the media query is unreadable on
 * the server.
 */

export const EASE = {
  /** Entrances. Fast commit, long settle. */
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Smaller UI moves, hovers, toggles. */
  quart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  /** Symmetric moves: overlays opening and closing, page transitions. */
  inOut: [0.83, 0, 0.17, 1] as [number, number, number, number],
} as const;

export const DUR = {
  fast: 0.28,
  base: 0.55,
  slow: 0.8,
  reveal: 0.9,
} as const;

/** Viewport config for scroll reveals. Fires once, slightly early, so the
 *  animation is already resolving by the time the element is comfortably in
 *  view rather than starting under the reader's nose. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export const transition = (
  duration = DUR.base,
  delay = 0,
  ease = EASE.out,
): Transition => ({ duration, delay, ease });

/** The default reveal: a short rise with a fade. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, delay: i * 0.08, ease: EASE.out },
  }),
};
