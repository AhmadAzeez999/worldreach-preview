import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { org, consultant } from "@/lib/content";

export const metadata: Metadata = {
  title: "Immigration Services",
  description: `Study permits, work permits and LMIA, visitor visas and Super Visa, permanent residence through Express Entry and the PNP, family sponsorship, citizenship, and application reviews, handled by ${consultant.titleShort} ${consultant.rcicNumber} in ${org.locality}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we handle."
        lead="Applications are grouped here by what you are trying to do rather than by the department's own categories, because that is how the decision actually presents itself to you."
      />

      <section className="bg-paper pb-24 md:pb-32">
        <div className="page">
          <ServicesIndex />
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-32">
        <div className="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead
                eyebrow="If you are not sure"
                title="You do not need to know which one you need."
              />
            </div>
            <div className="lg:col-span-7 lg:pt-14">
              <Reveal>
                <p className="measure t-lead">
                  Most people arrive without knowing which programme fits, and
                  a fair number arrive convinced of one that does not. Working
                  that out is the job of the first conversation, and it is free.
                </p>
              </Reveal>
              <Reveal i={1}>
                <p className="measure mt-6 t-body">
                  If your situation turns out to need a lawyer rather than a
                  consultant, or if there is no realistic pathway at the moment,
                  we will tell you that directly. It is a better outcome for
                  you than a retainer against an application that was never
                  going to succeed.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
