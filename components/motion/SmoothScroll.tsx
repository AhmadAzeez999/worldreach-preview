"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Smooth scrolling, applied with restraint.
 *
 * Heavy scroll-hijacking is one of the fastest ways to make a professional
 * services site feel like a demo. The lerp here is high (0.12) and the
 * duration short, so the page still tracks the wheel closely. It takes the
 * mechanical edge off without introducing lag between gesture and response.
 *
 * Deliberately disabled for:
 *   • prefers-reduced-motion: momentum is exactly what that setting is about
 *   • touch devices: mobile browsers already do this well, and overriding it
 *     costs frames and breaks native overscroll behaviour
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({
      duration: 0.9,
      lerp: 0.12,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      infinite: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors must go through Lenis, or the browser's native jump
    // fights the smoothed scroll position.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -100 });
      // Keep the keyboard where the eye went.
      (el as HTMLElement).setAttribute("tabindex", "-1");
      (el as HTMLElement).focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // A route change must land at the top; Lenis keeps its own scroll value.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
