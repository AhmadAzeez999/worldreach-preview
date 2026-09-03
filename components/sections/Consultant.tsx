import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Portrait } from "@/components/ui/Portrait";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { ArrowLink } from "@/components/ui/Button";
import { consultant, org } from "@/lib/content";

/**
 * Who you will actually be working with.
 *
 * ⚠ CONTENT SLOT: no biography has been supplied. No career history, no
 * education, no year the practice opened. None of that is invented here.
 *
 * Instead the copy describes the *structure* of the practice, every element of
 * which is verifiable from the client's own material: one licensed consultant,
 * consultations by video or phone, support continuing until IRCC decides. When
 * a real biography and headshot arrive they slot straight in and make this the
 * strongest section on the site.
 */
export function Consultant() {
  const commitments = [
    {
      title: "You deal with one person",
      body: `The consultant you meet in your first conversation is the one who prepares your application. Your file is not passed to unlicensed staff.`,
    },
    {
      title: "Your consultant is on a public register",
      body: `${consultant.titleShort} ${consultant.rcicNumber}. ${consultant.standing.charAt(0).toUpperCase()}${consultant.standing.slice(1)}. Look it up before you commit to anything.`,
    },
    {
      title: "Distance is not a problem",
      body: `The practice is based in ${org.locality}, and consultations run by video or phone. Clients work with us from wherever they are.`,
    },
    {
      title: "We stay until there is a decision",
      body: `Support and updates continue after submission, through to the decision from Immigration, Refugees and Citizenship Canada.`,
    },
  ];

  return (
    <section className="bg-paper py-24 md:py-32" id="consultant">
      <div className="page">
        <SectionHead
          eyebrow="Who you work with"
          title="A small practice, on purpose."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <Portrait className="aspect-[4/5] w-full" />
            </Reveal>

            <Reveal i={1} className="mt-6">
              <VerifyChip />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-[1.5rem] leading-[1.35] tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                {org.registeredName} is the practice of {consultant.name}, a{" "}
                {consultant.title} registered with the {consultant.regulator}.
              </p>
            </Reveal>

            <Reveal i={1}>
              <p className="measure mt-6 t-body">
                Only three kinds of professional may represent you to IRCC for a
                fee: a licensed consultant, a lawyer, or a Quebec notary.
                Everyone else offering to handle your application is operating
                outside that system, with no regulator behind them and no
                recourse for you if it goes wrong.
              </p>
            </Reveal>

            <RevealGroup as="ul" className="mt-10 border-t border-line" amount={0.07}>
              {commitments.map((c) => (
                <RevealItem as="li" key={c.title} className="border-b border-line py-6">
                  <div className="flex gap-5">
                    <span
                      className="mt-[0.7rem] h-px w-5 shrink-0 bg-crimson"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="t-h4">{c.title}</h3>
                      <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-slate">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal i={1} className="mt-9">
              <ArrowLink href="/about">More about the practice</ArrowLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
