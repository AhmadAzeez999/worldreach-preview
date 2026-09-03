import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { principles } from "@/lib/content";

/**
 * The four principles.
 *
 * These are the client's own pillars: Interactive, Professional, Affordable
 * and Reliable. Their sentences are kept verbatim, because they are the
 * business's actual promises and not ours to rewrite into something it has not
 * agreed to.
 *
 * What changes is the framing. On the old site they were four identical boxes
 * of abstract adjectives. Here each one is paired with a short concrete gloss
 * that says what the promise means in practice, since "Affordable" persuades
 * nobody but "you are quoted before any work begins" does.
 */
export function Principles() {
  return (
    <section className="bg-paper-2 py-24 md:py-32">
      <div className="page">
        <SectionHead
          eyebrow="How we work"
          title="Four commitments, stated plainly."
          lead="Every consultancy claims these. The difference is whether they can be held to them, so here is what each one actually obliges us to do."
        />

        <RevealGroup
          as="ol"
          className="mt-14 grid gap-px bg-line-2 md:mt-16 md:grid-cols-2"
          amount={0.07}
        >
          {principles.map((p) => (
            <RevealItem
              as="li"
              key={p.title}
              className="group/p relative flex flex-col bg-paper-2 p-7 transition-colors duration-500 hover:bg-paper sm:p-9"
            >
              <div className="flex items-baseline gap-4">
                <span className="t-numeral text-[0.6875rem] text-crimson">{p.n}</span>
                <h3 className="t-h3 text-ink">{p.title}</h3>
              </div>

              <p className="measure-tight mt-5 text-[1rem] leading-relaxed text-slate">
                {p.verbatim}
              </p>

              {/* The concrete translation. Kept visually subordinate. It is a
                  gloss on the promise, not a competing claim. */}
              <p className="mt-5 flex items-start gap-3 border-t border-line pt-5 text-[0.875rem] leading-relaxed text-ink">
                <span
                  className="mt-[0.45rem] h-px w-4 shrink-0 bg-crimson transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/p:w-7"
                  aria-hidden="true"
                />
                <span>{p.gloss}</span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
