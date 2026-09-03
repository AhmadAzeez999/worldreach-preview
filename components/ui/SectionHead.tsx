import type { ReactNode } from "react";
import { Reveal, RuleDraw } from "@/components/motion/Reveal";

/**
 * Section header.
 *
 * Consistent anatomy across the whole site: a drawn hairline, a mono eyebrow,
 * a serif heading, and an optional lead. Having one component own this is what
 * stops the site drifting into a dozen slightly different section treatments.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className = "",
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Optional right-hand content, a link, usually, on wide screens. */
  aside?: ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <div className={className}>
      <RuleDraw className={dark ? "bg-line-dark" : "bg-line"} />

      <div
        className={[
          "pt-7",
          align === "center" ? "flex flex-col items-center text-center" : "",
          aside ? "md:flex md:items-end md:justify-between md:gap-10" : "",
        ].join(" ")}
      >
        <div className={align === "center" ? "flex flex-col items-center" : ""}>
          {eyebrow ? (
            <Reveal as="p" variant="fade">
              <span
                className={`font-mono text-[0.625rem] uppercase tracking-[0.18em] sm:text-[0.6875rem] ${
                  dark ? "text-crimson-2" : "text-crimson"
                }`}
              >
                {eyebrow}
              </span>
            </Reveal>
          ) : null}

          <Reveal i={1} className={eyebrow ? "mt-5" : ""}>
            <Tag
              className={`t-h2 ${align === "center" ? "mx-auto max-w-[20ch]" : "max-w-[22ch]"} ${
                dark ? "text-paper" : "text-ink"
              }`}
            >
              {title}
            </Tag>
          </Reveal>

          {lead ? (
            <Reveal
              i={2}
              as="div"
              className={`measure mt-6 ${align === "center" ? "mx-auto" : ""}`}
            >
              <p
                className={`text-[1.0625rem] leading-relaxed sm:text-[1.125rem] ${
                  dark ? "text-mute-dark" : "text-slate"
                }`}
              >
                {lead}
              </p>
            </Reveal>
          ) : null}
        </div>

        {aside ? (
          <Reveal i={3} className="mt-8 shrink-0 md:mt-0 md:pb-2">
            {aside}
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
