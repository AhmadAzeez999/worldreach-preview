import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { org, consultant, services, nav } from "@/lib/content";

/**
 * The footer carries the compliance load so the rest of the site does not have
 * to argue with itself: registered name in full, licence number, the College's
 * public register address (CICC Code s.44(1)(b)), and a plain statement that
 * no outcome is being promised (s.44(2)).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-dark-section className="relative overflow-hidden bg-ink text-mute-dark">
      {/* Oversized mark, cropped off the edge, the logo as architecture
          rather than a sticker. Very low contrast; it should register as
          texture, not as a second logo. */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 hidden md:block"
        aria-hidden="true"
      >
        <Logo tone="light" className="h-[32rem] w-auto opacity-[0.045]" />
      </div>

      <div className="page relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ---- Identity ---- */}
          <div className="lg:col-span-4">
            <Link href="/" className="-m-2 inline-flex items-center gap-3 p-2">
              <Logo tone="light" className="h-12 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl leading-none tracking-[-0.02em] text-paper">
                  {org.shortName}
                </span>
                <span className="mt-1.5 font-mono text-[0.5625rem] uppercase leading-none tracking-[0.19em] text-mute-dark">
                  {org.descriptor}
                </span>
              </span>
            </Link>

            <p className="measure-tight mt-6 text-[0.9375rem] leading-relaxed text-mute-dark">
              Canadian immigration services from {org.locality}, for clients
              wherever they are.
            </p>

            <div className="mt-7">
              <VerifyChip tone="dark" />
            </div>
          </div>

          {/* ---- Services ---- */}
          <nav className="lg:col-span-3" aria-label="Services">
            <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute-dark">
              Services
            </h2>
            <ul className="mt-3 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-block py-1.5 text-[0.9375rem] text-paper/75 underline-offset-4 transition-colors duration-300 hover:text-paper hover:underline"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Site + contact ---- */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-12">
              <nav aria-label="Footer">
                <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute-dark">
                  Site
                </h2>
                <ul className="mt-3 space-y-1">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-block py-1.5 text-[0.9375rem] text-paper/75 underline-offset-4 transition-colors duration-300 hover:text-paper hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/consultation"
                      className="inline-block py-1.5 text-[0.9375rem] text-paper/75 underline-offset-4 transition-colors duration-300 hover:text-paper hover:underline"
                    >
                      Book a consultation
                    </Link>
                  </li>
                </ul>
              </nav>

              <div>
                <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute-dark">
                  Contact
                </h2>
                <ul className="mt-3 space-y-1">
                  <li>
                    <a
                      href={org.phoneHref}
                      className="t-numeral inline-block py-1.5 text-[0.9375rem] text-paper/75 transition-colors duration-300 hover:text-paper"
                    >
                      {org.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={org.emailHref}
                      className="inline-block py-1.5 text-[0.9375rem] leading-snug text-paper/75 underline-offset-4 transition-colors duration-300 hover:text-paper hover:underline"
                    >
                      {org.email}
                    </a>
                  </li>
                  <li className="text-[0.9375rem] leading-relaxed text-mute-dark">
                    {org.locality}
                  </li>
                  <li className="text-[0.9375rem] leading-relaxed text-mute-dark">
                    {org.hoursShort}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Regulatory strip ---- */}
        <div className="mt-14 border-t border-line-dark pt-8">
          <p className="measure text-[0.8125rem] leading-relaxed text-mute-dark">
            <span className="text-paper/80">{org.registeredName}</span> is the
            registered practice of {consultant.name}, {consultant.title}{" "}
            <span className="t-numeral">{consultant.rcicNumber}</span>, {consultant.standing}.
            You can confirm this registration on the College&rsquo;s public register at{" "}
            <a
              href={consultant.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/80 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
            >
              {consultant.registerLabel}
            </a>
            .
          </p>

          <p className="measure mt-4 text-[0.8125rem] leading-relaxed text-mute-dark">
            Information on this site is general and does not constitute legal
            advice for your particular circumstances. No consultant can
            guarantee the outcome of an application. Decisions are made solely
            by Immigration, Refugees and Citizenship Canada.
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-line-dark pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mute-dark">
              © {year} {org.registeredName}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="inline-block py-1.5 text-[0.8125rem] text-mute-dark underline-offset-4 transition-colors hover:text-paper hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="inline-block py-1.5 text-[0.8125rem] text-mute-dark underline-offset-4 transition-colors hover:text-paper hover:underline"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
