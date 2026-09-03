"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { asset } from "@/lib/asset";
import { EASE } from "@/lib/motion";

/**
 * Editorial image frame.
 *
 * Two things happen, and both are restrained on purpose. The frame uncovers
 * itself with a clip wipe while the picture inside settles back from a slight
 * over-scale, so the image arrives rather than fading in. Then, optionally,
 * the picture drifts a few percent against the scroll.
 *
 * The parallax range is deliberately small. Large parallax on a professional
 * services site reads as a template effect, and it costs a repaint on every
 * frame for the privilege. Here the picture is over-scaled just enough to
 * cover the travel, so no edge is ever exposed.
 */
export function Figure({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  parallax = true,
  /** Percentage of the frame height the picture travels across the viewport. */
  range = 6,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-paper-3 ${className}`}
      initial={{ clipPath: "inset(14% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE.out }}
    >
      <motion.div
        className="absolute inset-0"
        style={parallax ? { y, scale: 1 + range / 50 } : undefined}
      >
        <Image
          src={asset(src)}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      </motion.div>
    </motion.div>
  );
}
