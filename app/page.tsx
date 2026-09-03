import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Reality } from "@/components/sections/Reality";
import { ImageBand } from "@/components/sections/ImageBand";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { Principles } from "@/components/sections/Principles";
import { Consultant } from "@/components/sections/Consultant";
import { Process } from "@/components/sections/Process";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLink } from "@/components/ui/Button";
import { org, consultant } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: `Licensed Canadian immigration help from ${org.locality}. ${org.registeredName} is the practice of ${consultant.name}, ${consultant.titleShort} ${consultant.rcicNumber}. Study, work, visitor, permanent residence, sponsorship and citizenship applications. Free first consultation.`,
};

/**
 * Homepage narrative:
 *
 *   who is talking (and how to check them)  → Hero
 *   why this is hard                        → Reality
 *   what we handle                          → Services
 *   how we work                             → Principles
 *   who you actually get                    → Consultant
 *   what happens if you get in touch        → Process
 *   the uncomfortable questions, answered   → FAQ
 *   the single next step                    → CTA
 *
 * Trust is established before anything is asked for. The only conversion
 * request above the fold is the free consultation, and it stays the one
 * primary action all the way down the page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Reality />

      <ImageBand
        src="/photos/reunion.jpg"
        alt="Two people holding one another"
        quote="Behind every application is someone waiting: a partner, a parent, a job that starts in March, a life on hold until a decision arrives."
        attribution="What the paperwork is actually for"
      />

      <section className="bg-paper pb-24 md:pb-32" id="services">
        <div className="page">
          <SectionHead
            eyebrow="What we handle"
            title="Help with the whole of it."
            lead="Temporary and permanent applications, family sponsorship, citizenship, and second opinions on files you have prepared yourself."
            aside={<ArrowLink href="/services">All services</ArrowLink>}
          />
          <div className="mt-12 md:mt-16">
            <ServicesIndex />
          </div>
        </div>
      </section>

      <Principles />
      <Consultant />
      <Process />
      <FaqPreview />
      <CtaBand />
    </>
  );
}
