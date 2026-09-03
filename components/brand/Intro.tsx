"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./Logo";
import { EASE } from "@/lib/motion";
import { org } from "@/lib/content";

const SESSION_KEY = "wr:intro-seen";

/**
 * First-load reveal.
 *
 * The brief asked for a sophisticated entrance. The risk with one is that it
 * becomes a tax the visitor pays on every navigation, so it is constrained:
 *
 *   • once per session only, never on repeat navigations
 *   • never for prefers-reduced-motion
 *   • about two seconds, and any key press, click or scroll ends it early
 *   • the real page is already rendered and indexable underneath, so this
 *     delays paint and nothing else
 *
 * Centring note: the wordmark is set in tracked uppercase, and letter-spacing
 * adds a trailing space after the final character that sits inside the text
 * box. Centring the box therefore leaves the glyphs looking a hair left of
 * centre. `textIndent` puts the same amount back on the left to compensate,
 * which is why this is not simply `text-center` and done.
 */
export function Intro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return; // private browsing with storage disabled: skip the intro
    }
    // Whether to play the intro depends on sessionStorage and the OS motion
    // preference, neither of which is readable during server render. Deciding
    // on mount is the point, it is what keeps the server and first client
    // render identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, [reduced]);

  useEffect(() => {
    if (!show) return;

    const dismiss = () => setShow(false);
    const timer = window.setTimeout(dismiss, 2150);

    window.addEventListener("keydown", dismiss, { once: true });
    window.addEventListener("pointerdown", dismiss, { once: true });
    window.addEventListener("wheel", dismiss, { once: true, passive: true });

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-ink"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: EASE.inOut }}
        >
          <div className="flex flex-col items-center">
            {/* The artwork is raster, so it cannot draw itself stroke by
                stroke. It is uncovered instead by a wipe rising from the
                bottom edge, the same upward gesture the logo's own trajectory
                makes, with a slight settle on the scale. */}
            <motion.div
              className="overflow-hidden"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE.out }}
            >
              <motion.div
                initial={{ scale: 1.1, y: "14%" }}
                animate={{ scale: 1, y: "0%" }}
                transition={{ duration: 1.1, delay: 0.1, ease: EASE.out }}
              >
                <Logo tone="light" priority className="h-28 w-auto sm:h-36" />
              </motion.div>
            </motion.div>

            <div className="mask-line mt-7">
              <motion.p
                className="text-center font-mono text-[0.5625rem] uppercase leading-none text-mute-dark sm:text-[0.625rem]"
                style={{ letterSpacing: "0.3em", textIndent: "0.3em" }}
                initial={{ y: "130%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85, delay: 0.62, ease: EASE.out }}
              >
                {org.registeredName}
              </motion.p>
            </div>

            {/* A hairline drawing outward from the centre, echoing the rules
                used throughout the page. */}
            <motion.div
              className="mt-7 h-px w-16 origin-center bg-paper/25"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE.out }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
