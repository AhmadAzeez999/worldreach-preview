import Link from "next/link";
import { Logo } from "./Logo";
import { org } from "@/lib/content";

/**
 * The masthead lockup.
 *
 * The full registered name is rendered as real text, never baked into an
 * image, in both the header and the footer. CICC Code s.44(1)(a) requires the
 * registered name to appear prominently at or near the beginning of any
 * advertisement, and a website is one, so "Immigration Consulting" is never
 * dropped for tidiness; it is only set quieter than the dominant "World Reach".
 *
 * The globe takes the surrounding text colour so the lockup works on both
 * grounds; only the trajectory keeps the brand red, which is exactly how the
 * supplied logo is weighted.
 */
export function Wordmark({
  className = "",
  href = "/",
  tone = "light",
  }: {
  className?: string;
  href?: string | null;
  /** "dark" = sitting on the ink ground, where the red must lighten to hold
   *  its contrast against the navy. */
  tone?: "light" | "dark";
}) {
  const inner = (
    <span className={`group/wm inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <Logo
        tone={tone === "dark" ? "light" : "colour"}
        priority
        className="h-11 w-auto shrink-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/wm:scale-[1.06] sm:h-12"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] leading-none tracking-[-0.02em] text-current sm:text-[1.1875rem]">
          {org.shortName}
        </span>
        <span className="mt-1 font-mono text-[0.5rem] uppercase leading-none tracking-[0.19em] opacity-60 sm:text-[0.5625rem]">
          {org.descriptor}
        </span>
      </span>
    </span>
  );

  if (!href) return inner;

  return (
    <Link
      href={href}
      className="-m-2 flex rounded-sm p-2"
      aria-label={`${org.registeredName}, home`}
    >
      {inner}
    </Link>
  );
}
