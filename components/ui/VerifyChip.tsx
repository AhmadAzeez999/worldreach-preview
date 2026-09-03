import { consultant } from "@/lib/content";

/**
 * THE TRUST OBJECT.
 *
 * Most consultancy sites bury the licence number in the footer. For a
 * single-practitioner firm competing against unlicensed "ghost consultants",
 * that number is the strongest asset the business has. It is the one claim on
 * the entire site a stranger can independently check in ten seconds.
 *
 * So it is treated as a piece of evidence, not decoration: set in mono like a
 * record, and wired directly to the College's public register. CICC Code
 * s.44(1)(b) requires the register address in written advertising anyway; this
 * turns an obligation into the site's central credibility gesture.
 */
export function VerifyChip({
  tone = "light",
  className = "",
  showLabel = true,
}: {
  tone?: "light" | "dark";
  className?: string;
  showLabel?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <a
      href={consultant.registerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group/verify inline-flex items-center gap-0 rounded-[3px] border",
        "transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
        dark
          ? "border-paper/20 bg-paper/[0.04] hover:border-paper/40 hover:bg-paper/[0.08]"
          : "border-line-2 bg-paper-2/60 hover:border-crimson/40 hover:bg-crimson-4",
        className,
      ].join(" ")}
    >
      {/* Status dot, a quiet "live record" cue, not a fake badge. */}
      <span className="flex items-center gap-2 py-2.5 pl-3.5 pr-2.5">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-70 ${
              dark ? "bg-crimson-2" : "bg-crimson"
            }`}
          />
        </span>
        <span
          className={`font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${
            dark ? "text-mute-dark" : "text-mute"
          }`}
        >
          {consultant.titleShort}
        </span>
        <span
          className={`t-numeral text-[0.8125rem] font-medium ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {consultant.rcicNumber}
        </span>
      </span>

      <span
        className={`h-5 w-px shrink-0 ${dark ? "bg-paper/15" : "bg-line-2"}`}
        aria-hidden="true"
      />

      <span className="flex items-center gap-1.5 py-2.5 pl-2.5 pr-3.5">
        <span
          className={`text-[0.75rem] font-medium ${
            dark ? "text-mute-dark group-hover/verify:text-paper" : "text-mute group-hover/verify:text-crimson"
          } transition-colors duration-300`}
        >
          {showLabel ? "Verify" : ""}
        </span>
        <svg
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 shrink-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/verify:translate-x-0.5 group-hover/verify:-translate-y-0.5 ${
            dark ? "text-mute-dark" : "text-mute"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 9 9 3M4.2 3H9v4.8" />
        </svg>
      </span>

      <span className="sr-only">
        Verify {consultant.name}, {consultant.title} {consultant.rcicNumber}, on the{" "}
        {consultant.regulator} public register (opens in a new tab)
      </span>
    </a>
  );
}
