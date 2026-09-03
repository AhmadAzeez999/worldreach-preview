"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { EASE, DUR, VIEWPORT, rise } from "@/lib/motion";

/**
 * Scroll-triggered reveal primitives.
 *
 * These deliberately do NOT branch on useReducedMotion(). That preference is
 * unreadable during server rendering, so branching on it renders one tree on
 * the server and another on the client and breaks hydration. It is handled
 * globally by MotionProvider (MotionConfig reducedMotion="user") instead,
 * which suppresses the transform while still resolving opacity, so a
 * reduced-motion user sees the content without the travel.
 */

type RevealProps = {
  children: ReactNode;
  /** Stagger index. Multiplies the built-in per-item delay. */
  i?: number;
  delay?: number;
  as?: ElementType;
  className?: string;
  /** `rise` (default) nudges up with a fade; `mask` wipes a line up from
   *  behind an edge and needs a single-line child. */
  variant?: "rise" | "mask" | "fade";
  once?: boolean;
};

export function Reveal({
  children,
  i = 0,
  delay = 0,
  as = "div",
  className,
  variant = "rise",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (variant === "mask") {
    return (
      <span className={`mask-line ${className ?? ""}`}>
        <motion.span
          className="block"
          initial="hidden"
          whileInView="show"
          viewport={{ ...VIEWPORT, once }}
          variants={{
            hidden: { y: "110%" },
            show: {
              y: "0%",
              transition: { duration: DUR.reveal, delay: delay + i * 0.075, ease: EASE.out },
            },
          }}
        >
          {children}
        </motion.span>
      </span>
    );
  }

  const variants: Variants =
    variant === "fade"
      ? {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { duration: DUR.slow, delay: delay + i * 0.08, ease: EASE.out },
          },
        }
      : {
          hidden: { opacity: 0, y: 18 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: DUR.slow, delay: delay + i * 0.08, ease: EASE.out },
          },
        };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ ...VIEWPORT, once }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggering parent. Children should use `RevealItem` (or any motion child
 * with `hidden` / `show` variants) rather than their own whileInView, so the
 * sequence is owned in one place.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
  amount = 0.08,
  delayChildren = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  amount?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ ...VIEWPORT, once }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: amount, delayChildren } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  variants,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variants?: Variants;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag className={className} variants={variants ?? rise}>
      {children}
    </MotionTag>
  );
}

/** A hairline that draws itself in. Used instead of a static <hr> at the head
 *  of sections, echoing the mark's converging strokes. */
export function RuleDraw({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.reveal, ease: EASE.out }}
    />
  );
}
