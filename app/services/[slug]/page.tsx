import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServicesQuickList } from "@/components/sections/ServicesIndex";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { Figure } from "@/components/ui/Figure";
import { AscentRule } from "@/components/brand/AscentRule";
import { Button } from "@/components/ui/Button";
import { services, serviceBySlug, org, consultant, primaryCta } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | ${org.shortName} Immigration`,
      description: service.metaDescription,
      url: `${org.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: org.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${org.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.short,
        item: `${org.url}/services/${service.slug}`,
      },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.metaTitle,
    description: service.summary,
    serviceType: service.short,
    url: `${org.url}/services/${service.slug}`,
    provider: { "@type": "ProfessionalService", "@id": `${org.url}/#practice` },
    areaServed: "CA",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, serviceLd]) }}
      />

      <PageHero
        breadcrumb={{ href: "/services", label: "All services" }}
        eyebrow={service.short}
        title={service.title}
        lead={service.summary}
        meta={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button href={primaryCta.href} size="md" variant="primary" withArrow>
              {primaryCta.labelShort}
            </Button>
            <VerifyChip />
          </div>
        }
      />

      <section className="bg-paper pb-16 md:pb-20">
        <div className="page">
          <Figure
            src={service.image}
            alt={service.imageAlt}
            className="aspect-[21/9] w-full"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* ---------- Substance ---------- */}
      <section className="bg-paper pb-20 md:pb-28">
        <div className="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <AscentRule className="h-5 w-full text-line-2" />
              </Reveal>
              <div className="mt-9 space-y-6">
                {service.body.map((para, i) => (
                  <Reveal key={para.slice(0, 24)} i={i}>
                    <p
                      className={
                        i === 0
                          ? "measure font-display text-[1.375rem] leading-[1.42] tracking-[-0.018em] text-ink sm:text-[1.5rem]"
                          : "measure t-body"
                      }
                    >
                      {para}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* ---------- Programme reference ---------- */}
            <aside className="lg:col-span-5">
              <Reveal>
                <div className="border border-line bg-paper-2 p-7 sm:p-8">
                  <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-crimson">
                    Programmes covered
                  </h2>

                  <RevealGroup as="dl" className="mt-7 space-y-6" amount={0.06}>
                    {service.programs.map((p) => (
                      <RevealItem key={p.name} as="div">
                        <dt className="t-h4 text-[1rem]">{p.name}</dt>
                        <dd className="mt-2 text-[0.875rem] leading-relaxed text-slate">
                          {p.note}
                        </dd>
                      </RevealItem>
                    ))}
                  </RevealGroup>

                  <p className="mt-8 border-t border-line-2 pt-6 text-[0.8125rem] leading-relaxed text-mute">
                    Programme rules are set by Immigration, Refugees and
                    Citizenship Canada and change without notice. Nothing here
                    is advice for your particular circumstances, and no outcome
                    can be guaranteed.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- How this runs ---------- */}
      <section className="bg-paper-2 py-20 md:py-28">
        <div className="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead eyebrow="Working together" title="How this one runs." />
            </div>
            <div className="lg:col-span-7 lg:pt-14">
              <Reveal>
                <p className="measure t-body">
                  Every file starts the same way: a free conversation by video
                  or phone, an honest read on where you stand, and a written
                  list of what your application needs. If we take the file on,{" "}
                  {consultant.name} prepares and submits it, and stays with it
                  until IRCC decides.
                </p>
              </Reveal>
              <Reveal i={1} className="mt-8">
                <Button href="/#how-it-works" variant="secondary" size="md" withArrow>
                  See the full process
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      <section className="bg-paper py-20 md:py-28">
        <div className="page">
          <SectionHead eyebrow="Also handled" title="Other services." />
          <div className="mt-12">
            <ServicesQuickList excludeSlug={service.slug} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
