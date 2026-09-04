"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { asset } from "@/lib/asset";
import { EASE } from "@/lib/motion";

/**
 * Full-bleed editorial band.
 *
 * One image, one sentence, and a lot of air. It exists to give the homepage a
 * moment of quiet between two dense reading sections, and to put a human face
 * on a page that is otherwise entirely typographic.
 *
 * The picture drifts slowly against the scroll while the words hold still,
 * which reads as depth rather than as an effect. The over-scale on the image
 * covers the travel so no edge is ever exposed.
 *
 * ⚠ PLACEHOLDER photography. See public/photos/CREDITS.json.
 */
export function ImageBand({
  src,
  alt,
  quote,
  attribution,
}: {
  src: string;
  alt: string;
  quote: string;
  attribution?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y = useSpring(raw, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <section ref={ref} data-dark-section className="relative overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y, scale: 1.18 }}>
        <Image
          src={asset(src)}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Weighted toward the left, where the text sits, so the copy keeps its
          contrast without flattening the whole photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40"
      />

      <div className="page relative flex min-h-[26rem] items-center py-24 md:min-h-[32rem] md:py-32">
        <div className="max-w-2xl">
          <motion.p
            className="font-display text-[1.625rem] leading-[1.32] tracking-[-0.02em] text-paper sm:text-[2rem] lg:text-[2.375rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1, ease: EASE.out }}
          >
            {quote}
          </motion.p>

          {attribution ? (
            <motion.p
              className="mt-7 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute-dark"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE.out }}
            >
              {attribution}
            </motion.p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
