"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { EASE } from "@/lib/motion";
import { nav, org, primaryCta, consultant } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  /** True while a dark-background section is behind the bar. */
  const [onDarkGround, setOnDarkGround] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Which ground is the bar currently sitting on?

     Sections with a dark background are tagged `data-dark-section`, and the
     header asks, on each scroll frame, whether any of them crosses its own
     midline. That is strictly more general than the previous approach of
     watching a single sentinel at the foot of the hero: the masthead now
     adapts over the image band, the closing call to action, the dark block on
     the About page and the footer, not just the hero.

     An IntersectionObserver is the wrong tool here. "Not intersecting" cannot
     distinguish "the dark section is still behind us" from "it is long gone",
     and observing several elements at different thresholds gets fiddly fast.
     One rAF-throttled measurement answers the question directly. */
  useEffect(() => {
    let raf = 0;
    let darkSections: HTMLElement[] = [];

    const collect = () => {
      darkSections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-dark-section]"),
      );
    };

    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > 16);

      const headerH = headerRef.current?.offsetHeight ?? 72;
      const line = headerH / 2; // test against the bar's midline, so the
      // treatment swaps once rather than flickering at a boundary.
      setOnDarkGround(
        darkSections.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= line && r.bottom >= line;
        }),
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    collect();
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    /* Sections arrive as reveals mount and images settle, so re-collect when
       the document changes rather than trusting a single pass at mount. */
    const mo = new MutationObserver(() => {
      collect();
      onScroll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, [pathname]);

  /* Close the overlay when navigation happens. React's documented pattern for
     "reset state when a prop changes" is to compare during render rather than
     to fire an effect, which avoids a second render pass. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Either a dark section is behind the bar, or the ink mobile overlay is
     (it sits below the header in z-order). Both need the light masthead. */
  const onDark = onDarkGround || open;

  /* Show the backdrop only once something is actually passing underneath the
     bar. While the mobile overlay is open the header sits on the overlay's own
     ink field, so a second surface there would just look like a seam. */
  const showBackdrop = scrolled && !open;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-[3px] focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/*
          The backdrop is its own layer rather than a background on the header.

          Two reasons. Transitioning `backdrop-filter` directly is janky across
          browsers, whereas fading a blurred layer's opacity is smooth
          everywhere. And it lets the bar be genuinely absent at the top of the
          page, so the hero reads full-bleed, then appear only once content
          starts sliding underneath it.

          It carries a tint as well as the blur: blur alone leaves dark hero
          text legible through light glass and vice versa, so the tint is what
          actually holds the separation. The `supports-` variants fall back to a
          more opaque fill where backdrop-filter is unavailable.
        */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0 -z-10 border-b transition-opacity duration-500",
            "ease-[cubic-bezier(0.25,1,0.5,1)] backdrop-blur-xl",
            showBackdrop ? "opacity-100" : "opacity-0",
            onDark
              ? "border-paper/10 bg-ink/92 supports-[backdrop-filter]:bg-ink/70"
              : "border-line bg-paper/95 supports-[backdrop-filter]:bg-paper/72",
          ].join(" ")}
        />

        <div className="page flex h-[var(--header-h)] items-center justify-between gap-6">
          <div className={onDark ? "on-ink text-paper" : "text-ink"}>
            <Wordmark tone={onDark ? "dark" : "light"} />
          </div>

          {/* ---------- Desktop navigation ---------- */}
          <nav
            aria-label="Primary"
            onPointerLeave={() => setHovered(null)}
            className={`hidden items-center gap-1 lg:flex ${onDark ? "on-ink" : ""}`}
          >
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onPointerEnter={() => setHovered(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group/nav relative rounded-sm px-3.5 py-2 text-[0.875rem] font-medium",
                    "transition-colors duration-300",
                    onDark
                      ? active
                        ? "text-paper"
                        : "text-paper/65 hover:text-paper"
                      : active
                        ? "text-ink"
                        : "text-mute hover:text-ink",
                  ].join(" ")}
                >
                  {/* A single indicator is shared across the whole nav via
                      layoutId, so it travels from one item to the next instead
                      of fading out and in. The eye follows one object, which is
                      what makes it feel considered rather than merely animated. */}
                  {hovered === item.href ? (
                    <motion.span
                      layoutId="nav-indicator"
                      aria-hidden="true"
                      className={`absolute inset-0 -z-10 rounded-[3px] ${
                        onDark ? "bg-paper/[0.09]" : "bg-paper-2"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}

                  <span className="relative">{item.label}</span>

                  {/* The current page keeps a persistent rule, so the hover
                      indicator never has to double as a location cue. */}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute bottom-0.5 left-3.5 right-3.5 h-px origin-center bg-current",
                      "transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                      active ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ---------- Desktop actions ---------- */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={org.phoneHref}
              className={`t-numeral rounded-sm px-2 py-1 text-[0.8125rem] font-medium transition-colors duration-300 ${
                onDark ? "text-paper/70 hover:text-paper" : "text-mute hover:text-ink"
              }`}
            >
              {org.phoneDisplay}
            </a>
            <Button
              href={primaryCta.href}
              size="sm"
              variant={onDark ? "on-ink-solid" : "primary"}
              withArrow
            >
              {primaryCta.labelShort}
            </Button>
          </div>

          {/* ---------- Mobile trigger ---------- */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-sm lg:hidden ${
              onDark ? "on-ink text-paper" : "text-ink"
            }`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {/* Two rules that cross into an X. The same converging-line idea
                as the mark, at UI scale. */}
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-[450ms] ease-[cubic-bezier(0.83,0,0.17,1)] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-[450ms] ease-[cubic-bezier(0.83,0,0.17,1)] ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* ---------- Mobile overlay ---------- */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col bg-ink text-paper lg:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: reduced ? 0.15 : 0.62, ease: EASE.inOut }}
          >
            <div className="page flex flex-1 flex-col justify-between pb-10 pt-[calc(var(--header-h)+2rem)]">
              <nav aria-label="Mobile" className="on-ink flex flex-col">
                {nav.map((item, idx) => {
                  const active =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.div
                      key={item.href}
                      initial={reduced ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: reduced ? 0 : 0.16 + idx * 0.06,
                        ease: EASE.out,
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline justify-between border-b border-line-dark py-5"
                      >
                        <span className="font-display text-[2rem] leading-none tracking-[-0.025em] text-paper">
                          {item.label}
                        </span>
                        <span className="t-numeral text-[0.6875rem] text-mute-dark">
                          0{idx + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                className="on-ink mt-10 flex flex-col gap-5"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: reduced ? 0 : 0.42, ease: EASE.out }}
              >
                <Button href={primaryCta.href} size="lg" variant="on-ink-solid" withArrow>
                  {primaryCta.label}
                </Button>

                <div className="flex flex-col gap-1.5">
                  <a
                    href={org.phoneHref}
                    className="t-numeral text-[1rem] font-medium text-paper"
                  >
                    {org.phoneDisplay}
                  </a>
                  <a
                    href={org.emailHref}
                    className="text-[0.9375rem] text-mute-dark underline-offset-4 hover:text-paper hover:underline"
                  >
                    {org.email}
                  </a>
                  <p className="t-small mt-1 text-mute-dark">{org.hours}</p>
                </div>

                <div className="pt-1">
                  <VerifyChip tone="dark" />
                  <p className="mt-3 max-w-xs font-mono text-[0.625rem] leading-relaxed tracking-[0.06em] text-mute-dark">
                    {consultant.name} · {consultant.titleShort} {consultant.rcicNumber}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
