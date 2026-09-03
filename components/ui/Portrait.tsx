import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { consultant, org } from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * Portrait frame for the principal consultant.
 *
 * ⚠ CONTENT SLOT: no authentic photograph has been supplied yet. Rather than
 * fill the space with stock imagery of a stranger. Which on a page whose
 * entire argument is "you can verify who we are" would be actively
 * self-defeating: the empty state is designed as a deliberate typographic
 * panel carrying the licence record.
 *
 * To use a real photograph: drop the file in /public and pass `src`. Nothing
 * else needs to change. A real headshot should replace this as soon as one
 * exists; for a single-practitioner firm it is the highest-value asset on the
 * site.
 */
export function Portrait({
  src = "/photos/portrait.jpg",
  alt,
  className = "",
  priority = false,
}: {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-paper-3 ${className}`}>
        <Image
          src={asset(src)}
          alt={alt ?? `${consultant.name}, ${consultant.title} ${consultant.rcicNumber}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 34rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const initials = consultant.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden border border-line-dark bg-ink-2 p-8 sm:p-10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -bottom-24 -right-24"
        aria-hidden="true"
      >
        <Logo tone="light" className="h-80 w-auto opacity-[0.055]" />
      </div>

      {/* Hairline registration marks, a printer's crop-mark reference. It
          gives the empty state real craft instead of a grey avatar icon. */}
      <div className="pointer-events-none absolute inset-5" aria-hidden="true">
        {(
          [
            "left-0 top-0 border-l border-t",
            "right-0 top-0 border-r border-t",
            "left-0 bottom-0 border-l border-b",
            "right-0 bottom-0 border-r border-b",
          ] as const
        ).map((pos) => (
          <span key={pos} className={`absolute h-4 w-4 border-paper/15 ${pos}`} />
        ))}
      </div>

      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute-dark">
          Principal consultant
        </p>
        <p
          className="mt-8 font-display text-[4.5rem] leading-none tracking-[-0.03em] text-paper/90 sm:text-[5.5rem]"
          aria-hidden="true"
        >
          {initials}
        </p>
      </div>

      <div className="relative mt-16">
        <p className="font-display text-2xl leading-tight tracking-[-0.022em] text-paper">
          {consultant.name}
        </p>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-mute-dark">
          {consultant.title}
        </p>
        <p className="t-numeral mt-4 border-t border-line-dark pt-4 text-[0.8125rem] text-paper/70">
          {consultant.rcicNumber} · {org.city}, {org.regionCode}
        </p>
      </div>
    </div>
  );
}
