import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Treated as a wayfinding page rather than a joke. Someone landing here from a
 * stale link to the old WordPress site should be one click from what they were
 * looking for, so the full service index is offered directly.
 */
export default function NotFound() {
  return (
    <section className="bg-paper pb-24 pt-[calc(var(--header-h)+5rem)] md:pb-32 md:pt-[calc(var(--header-h)+7rem)]">
      <div className="page">
        <Logo className="h-16 w-auto" />

        <p className="mt-9 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute">
          Error 404
        </p>
        <h1 className="t-h1 mt-5 max-w-[14ch]">This page has moved on.</h1>
        <p className="measure mt-6 t-lead">
          The link you followed does not lead anywhere on the current site. Here
          is everything we handle. The page you wanted is very likely below.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/" size="lg" variant="primary" withArrow>
            Back to the homepage
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Contact us
          </Button>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-crimson">
            All services
          </h2>
          <ul className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group/nf flex items-baseline gap-3 py-2 text-[0.9375rem] text-slate transition-colors hover:text-ink"
                >
                  <span
                    className="h-px w-3 shrink-0 bg-line-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nf:w-5 group-hover/nf:bg-crimson"
                    aria-hidden="true"
                  />
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
