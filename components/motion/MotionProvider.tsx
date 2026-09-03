"use client";

import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * Reduced-motion handling, done in one place.
 *
 * The naive approach, calling useReducedMotion() and rendering a different
 * element tree, breaks hydration because the media query is unreadable on
 * the server and so the server always renders the "animated" branch while a
 * reduced-motion client renders the static one. That produced a hydration
 * error on every page.
 *
 * MotionConfig takes a constant value, so server and client render identically
 * and Motion applies the preference at animation time instead: transform and
 * layout animations are suppressed for users who asked for that, while opacity
 * still resolves, so nothing is ever left invisible.
 *
 * Components must therefore NOT branch on useReducedMotion() during render.
 * Using it inside an effect (as the intro overlay does) is fine, because
 * effects never run on the server.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  /* Confirms to the head script's watchdog that React actually hydrated, and
     re-asserts the flag in case the watchdog cleared it first on a slow load.
     Without this signal the fail-safe CSS in globals.css takes over and forces
     every animated element to its visible resting state. */
  useEffect(() => {
    (window as Window & { __wrHydrated?: boolean }).__wrHydrated = true;
    document.documentElement.setAttribute("data-motion-ready", "");
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
