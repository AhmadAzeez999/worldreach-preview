import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "on-ink" | "on-ink-solid";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden " +
  "font-sans font-medium tracking-[-0.006em] rounded-[3px] " +
  "transition-[color,background-color,border-color,box-shadow,transform] duration-300 " +
  "ease-[cubic-bezier(0.25,1,0.5,1)] disabled:opacity-50 disabled:pointer-events-none " +
  // A press should feel like a press. 1.5% is enough to register under the
  // finger without the label visibly resizing.
  "active:scale-[0.985] select-none";

/* Specular sweep. A narrow, skewed band of light crosses the face once on
   hover. It is a single transform on a pseudo-element, so it composites on the
   GPU and costs nothing, and it reads as material rather than as a "glow".
   Only the solid variants get it: on a transparent button there is no surface
   for light to travel across, and the effect looks like a stray artefact. */
const sheenBase =
  "after:pointer-events-none after:absolute after:inset-y-[-40%] after:z-[1] after:w-[45%] " +
  "after:-translate-x-[220%] after:skew-x-[-18deg] after:transition-transform " +
  "after:duration-[1100ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:after:translate-x-[320%]";

const sheen: Partial<Record<Variant, string>> = {
  primary:
    sheenBase +
    " after:bg-[linear-gradient(90deg,transparent,rgba(250,248,244,0.22),transparent)]",
  "on-ink":
    sheenBase +
    " after:bg-[linear-gradient(90deg,transparent,rgba(250,248,244,0.16),transparent)]",
  "on-ink-solid":
    sheenBase +
    " after:bg-[linear-gradient(90deg,transparent,rgba(14,31,51,0.10),transparent)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.875rem]",
  lg: "h-[3.25rem] px-7 text-[0.9375rem]",
};

/* The hover treatment is a fill that wipes up from the bottom edge rather than
   a colour fade: deliberate and mechanical rather than glowy, and it costs one
   transform on a pseudo-element. */
const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper border border-ink hover:text-paper " +
    "shadow-[0_1px_2px_rgba(14,31,51,0.14)] hover:shadow-[0_6px_18px_-6px_rgba(14,31,51,0.4)]",
  secondary:
    "bg-transparent text-ink border border-line-2 hover:border-ink/35 hover:bg-paper-2",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-paper-2",
  "on-ink":
    "bg-transparent text-paper border border-paper/25 hover:border-paper/55 hover:bg-paper/[0.06]",
  "on-ink-solid": "bg-paper text-ink border border-paper hover:bg-white",
};

const fillLayer: Partial<Record<Variant, string>> = {
  primary:
    "before:absolute before:inset-0 before:-z-0 before:bg-crimson before:origin-bottom " +
    "before:scale-y-0 before:transition-transform before:duration-[450ms] " +
    "before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-y-100",
};

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

type OwnProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Shows a right arrow that advances on hover. */
  withArrow?: boolean;
};

type ButtonAsLink = OwnProps & {
  href: string;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof OwnProps | "href">;

type ButtonAsButton = OwnProps & {
  href?: never;
  external?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof OwnProps>;

/**
 * Renders an <a>, a next/link, or a <button> from one call site, so every
 * action on the site shares a single set of sizes, variants and hover
 * behaviour regardless of what it actually does.
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    withArrow = false,
    ...rest
  } = props;

  const cls = [
    base,
    sizes[size],
    variants[variant],
    fillLayer[variant] ?? "",
    sheen[variant] ?? "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className="relative z-10 inline-flex items-center gap-2.5">
      {children}
      {withArrow ? (
        <Arrow className="transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1" />
      ) : null}
    </span>
  );

  if (typeof rest.href === "string") {
    const { href, external, ...anchorProps } = rest as ButtonAsLink;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={cls} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

/**
 * Inline text link whose rule retracts to the right and re-enters from the
 * left on hover. The movement is directional, echoing the logo's rising
 * trajectory.
 */
export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  arrow?: boolean;
}) {
  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 block h-px w-full origin-right scale-x-100 bg-current transition-transform duration-[400ms] ease-[cubic-bezier(0.83,0,0.17,1)] group-hover/link:origin-left group-hover/link:scale-x-0"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 block h-px w-full origin-left scale-x-0 bg-current transition-transform delay-[200ms] duration-[400ms] ease-[cubic-bezier(0.83,0,0.17,1)] group-hover/link:scale-x-100"
        />
      </span>
      {arrow ? (
        <Arrow className="transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1" />
      ) : null}
    </>
  );

  // py-2/-my-2 lifts the hit area past the 24px minimum (WCAG 2.5.8) without
  // moving the baseline the design was set to.
  const cls = `group/link -my-2 inline-flex items-center gap-2 py-2 text-[0.9375rem] font-medium text-ink ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export { Arrow };
