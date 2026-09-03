import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Principles } from "@/components/sections/Principles";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Portrait } from "@/components/ui/Portrait";
import { AscentRule } from "@/components/brand/AscentRule";
import { Figure } from "@/components/ui/Figure";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { ArrowLink } from "@/components/ui/Button";
import { org, consultant } from "@/lib/content";

export const metadata: Metadata = {
  title: "About the Practice",
  description: `${org.registeredName} is the practice of ${consultant.name}, ${consultant.title} ${consultant.rcicNumber}, based in ${org.locality} and working with clients worldwide.`,
  alternates: { canonical: "/about" },
};

/**
 * ⚠ CONTENT SLOT: this page carries no invented biography. Career history,
 * education, languages spoken, and the year the practice opened would all
 * strengthen it considerably and none of them are on the record yet.
 *
 * What is here is verifiable: the licence, the regulator, the location, the
 * way the engagement runs. The page is structured so a real biography drops
 * into the "The person behind it" column without a redesign.
 */
export default function AboutPage() {
  const representationFacts = [
    {
      title: "Regulated Canadian Immigration Consultant",
      body: `Licensed by the ${consultant.regulator} and bound by its Code of Professional Conduct. Registration ${consultant.rcicNumber}.`,
    },
    {
      title: "Lawyer or Quebec notary",
      body: "Members of a Canadian provincial or territorial law society, or of the Chambre des notaires du Québec.",
    },
    {
      title: "Nobody else",
      body: "Anyone outside those categories charging a fee to advise on or prepare your application is doing so unlawfully, and is accountable to no regulator.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="About"
        title="One licensed consultant, accountable for the file."
        lead={`${org.registeredName} is an immigration consulting practice based in ${org.locality}, working with clients wherever they happen to be.`}
        meta={<VerifyChip />}
      />

      {/* ---------- The person ---------- */}
      <section className="bg-paper pb-24 md:pb-32">
        <div className="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <Portrait className="aspect-[4/5] w-full" priority />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <AscentRule className="h-5 w-full text-line-2" />
              </Reveal>

              <Reveal i={1} className="mt-9">
                <h2 className="t-h3">The person behind it</h2>
              </Reveal>

              <Reveal i={2} className="mt-6">
                <p className="measure t-lead">
                  {consultant.name} is a {consultant.title} and{" "}
                  {consultant.standing}.
                </p>
              </Reveal>

              <Reveal i={3} className="mt-6">
                <p className="measure t-body">
                  That licence is not a formality. It is what allows someone to
                  represent you to Immigration, Refugees and Citizenship Canada
                  for a fee, it carries professional obligations that are
                  enforceable, and it can be checked by anyone in under a
                  minute. It is the first thing you should confirm about any
                  person you are considering, here or anywhere else.
                </p>
              </Reveal>

              <Reveal i={4} className="mt-8">
                <ArrowLink href={consultant.registerUrl} external>
                  Look up {consultant.rcicNumber} on the public register
                </ArrowLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Who may represent you ---------- */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <div className="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead
                tone="dark"
                eyebrow="Why licensing matters"
                title="Only three kinds of people may represent you."
                lead="This is set out in law, and it is the clearest line you can use to protect yourself."
              />
            </div>

            <div className="lg:col-span-7 lg:pt-14">
              <RevealGroup as="ol" className="border-t border-line-dark" amount={0.08}>
                {representationFacts.map((f, i) => (
                  <RevealItem as="li" key={f.title} className="border-b border-line-dark py-7">
                    <div className="flex gap-5 sm:gap-7">
                      <span className="t-numeral shrink-0 text-[0.6875rem] text-crimson-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="t-h4 text-paper">{f.title}</h3>
                        <p className="measure mt-2.5 text-[0.9375rem] leading-relaxed text-mute-dark">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal i={1} className="mt-9">
                <p className="measure text-[0.875rem] leading-relaxed text-mute-dark">
                  The College keeps a public register of every licensed
                  consultant in Canada. Searching a name or a registration
                  number there is free, takes seconds, and is the single most
                  useful thing you can do before handing anyone your documents.
                </p>
              </Reveal>

              <Reveal i={2} className="on-ink mt-7">
                <VerifyChip tone="dark" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Principles />

      {/* ---------- Where we are ---------- */}
      <section className="bg-paper py-24 md:py-32">
        <div className="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead eyebrow="Where we are" title="Kamloops, British Columbia." />
            </div>

            <div className="lg:col-span-7 lg:pt-14">
              <Reveal>
                <p className="measure t-lead">
                  The practice is based in the interior of British Columbia,
                  where the North and South Thompson rivers meet. The city
                  takes its name from that confluence.
                </p>
              </Reveal>
              <Reveal i={1}>
                <p className="measure mt-6 t-body">
                  Being outside a major centre changes very little about the
                  work and quite a lot about the experience of it.
                  Consultations run by video or phone, applications are prepared
                  and filed electronically, and clients work with us from
                  wherever they currently live. What a smaller practice does
                  offer is the thing large firms find hardest: the person who
                  answers your first message is the person who handles your
                  file.
                </p>
              </Reveal>

              <Figure
                src="/photos/bc-interior.jpg"
                alt="A highway curving through the mountains of British Columbia"
                className="mt-10 aspect-[16/9] w-full"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />

              <Reveal i={2} className="mt-10">
                <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
                  {[
                    { k: "Office", v: org.locality },
                    { k: "Hours", v: org.hoursShort },
                    { k: "Consultations", v: "Video or phone" },
                    { k: "Clients", v: "Canada and worldwide" },
                  ].map((row) => (
                    <div key={row.k} className="bg-paper p-6">
                      <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mute">
                        {row.k}
                      </dt>
                      <dd className="mt-2.5 text-[0.9375rem] text-ink">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
