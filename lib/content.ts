/**
 * SINGLE SOURCE OF TRUTH for everything the site asserts about the business.
 *
 * ---------------------------------------------------------------------------
 * RULE: nothing goes in this file that cannot be verified from the client's
 * own material or a public register. No invented statistics, success rates,
 * years in business, awards, client counts, partnerships or testimonials.
 *
 * The CICC Code of Professional Conduct governs how an RCIC may advertise:
 *   s.44(1)(a): the registered name must appear prominently at or near the
 *                beginning of any advertisement.
 *   s.44(1)(b): written advertising must carry the Public Register address.
 *   s.44(2):   no guaranteeing the success of an application, and no
 *                claiming special influence with IRCC or government.
 *   s.45:      testimonials must be real, accurate and approved in writing.
 *   s.46:      only the RCIC Licensee Insignia may be used, never the CICC
 *                corporate logo.
 * Anything added here later must clear those bars.
 * ---------------------------------------------------------------------------
 */

export const org = {
  /** Registered name exactly as held with the College. Do not stylise. */
  registeredName: "World Reach Immigration Consulting",
  /** Display lockup used in the masthead. */
  shortName: "World Reach",
  descriptor: "Immigration Consulting",
  tagline: "Canadian Immigration Services",
  url: "https://worldreachimmigration.ca",
  city: "Kamloops",
  region: "British Columbia",
  regionCode: "BC",
  country: "Canada",
  locality: "Kamloops, British Columbia",
  phoneDisplay: "+1 236 565 8438",
  phoneHref: "tel:+12365658438",
  email: "info@worldreachimmigration.ca",
  emailHref: "mailto:info@worldreachimmigration.ca",
  hours: "Monday to Friday, 9:00 a.m. – 3:00 p.m. Pacific",
  hoursShort: "Mon–Fri, 9–3 Pacific",
} as const;

export const consultant = {
  name: "Reuben Onyango",
  /** Regulated Canadian Immigration Consultant registration number. */
  rcicNumber: "R707677",
  title: "Regulated Canadian Immigration Consultant",
  titleShort: "RCIC",
  /** Verbatim status claim from the client's existing site. */
  standing:
    "a member in good standing with the College of Immigration & Citizenship Consultants (CICC)",
  regulator: "College of Immigration and Citizenship Consultants",
  regulatorShort: "CICC",
  registerUrl: "https://register.college-ic.ca",
  registerLabel: "register.college-ic.ca",
} as const;

/* ==========================================================================
   Services, grouped by what the visitor is actually trying to do rather
   than by IRCC's internal taxonomy. Every programme listed here appears on
   the client's existing services page; the explanatory copy describes public
   IRCC programme facts, never an outcome World Reach can promise.
   ========================================================================== */

export type Service = {
  slug: string;
  /** PLACEHOLDER photography. See public/photos/CREDITS.json. */
  image: string;
  imageAlt: string;
  /** Verb-led, because visitors search by intent, not programme name. */
  title: string;
  /** Used in nav and cards. */
  short: string;
  intent: string;
  summary: string;
  body: string[];
  programs: { name: string; note: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "permanent-residence",
    image: "/photos/canada-city.jpg",
    imageAlt: "A Canadian city skyline below coastal mountains",
    title: "Settle in Canada permanently",
    short: "Permanent Residence",
    intent: "You want to stay for good.",
    summary:
      "Economic pathways to permanent residence, including the federal programmes managed through Express Entry and provincial nomination.",
    body: [
      "Permanent residence is the outcome most people are working toward, and it is also where the most time and money gets lost. The programmes overlap, the eligibility rules move, and the same profile can score very differently depending on which stream it is put through.",
      "We assess your situation against the streams you actually qualify for, tell you plainly where you stand, and prepare the application so it is complete the first time it reaches an officer.",
    ],
    programs: [
      {
        name: "Federal Skilled Worker Program",
        note: "For skilled workers with foreign work experience. Managed through the Express Entry pool and ranked against other candidates.",
      },
      {
        name: "Canadian Experience Class",
        note: "For people who already hold skilled work experience gained inside Canada. It is often the natural next step after a post-graduation work permit.",
      },
      {
        name: "Provincial Nominee Program",
        note: "Provinces and territories nominate candidates who match their own labour needs. A nomination carries substantial weight in the federal system.",
      },
    ],
    metaTitle: "Permanent Residence in Canada",
    metaDescription:
      "Express Entry, Federal Skilled Worker, Canadian Experience Class and Provincial Nominee applications, prepared and filed by a Regulated Canadian Immigration Consultant.",
  },
  {
    slug: "work-permits",
    image: "/photos/work.jpg",
    imageAlt: "A worker on the floor of a busy warehouse",
    title: "Work in Canada",
    short: "Work Permits",
    intent: "You have an offer, or want one.",
    summary:
      "Employer-specific and open work permits, and the Labour Market Impact Assessment process that sits behind many of them.",
    body: [
      "A work permit is rarely a single form. Depending on the job, the employer, and where you are applying from, the file may need an LMIA first, may qualify for an exemption, or may hinge on how the position itself is described.",
      "We work out which route applies, prepare the supporting evidence, and keep both you and your employer clear on what each stage requires.",
    ],
    programs: [
      {
        name: "Work permit",
        note: "Employer-specific or open, applied for from outside Canada, at a port of entry, or from inside Canada depending on your status.",
      },
      {
        name: "Labour Market Impact Assessment (LMIA)",
        note: "The assessment an employer may need from Employment and Social Development Canada before a foreign worker can be hired.",
      },
    ],
    metaTitle: "Canadian Work Permits & LMIA",
    metaDescription:
      "Work permit and Labour Market Impact Assessment support for workers and employers, handled by a licensed Canadian immigration consultant in Kamloops, BC.",
  },
  {
    slug: "study-permits",
    image: "/photos/study.jpg",
    imageAlt: "Students working at desks in a study room",
    title: "Study in Canada",
    short: "Study Permits",
    intent: "You are about to apply.",
    summary:
      "Study permit applications, including the financial and intent evidence that decides most of them.",
    body: [
      "Study permit refusals usually come down to two things: whether an officer accepts that you can fund the stay, and whether they accept your stated purpose. Both are matters of evidence and presentation, not luck.",
      "We build the application around those two questions. We also set out what happens afterwards, including how study time can lead to work rights and, for some, to permanent residence.",
    ],
    programs: [
      {
        name: "Study permit",
        note: "For accepted students at a designated learning institution. Requires proof of acceptance, of funds, and of intent.",
      },
    ],
    metaTitle: "Canadian Study Permits",
    metaDescription:
      "Study permit applications prepared by a Regulated Canadian Immigration Consultant, with attention to the proof-of-funds and intent evidence that decides most files.",
  },
  {
    slug: "visit-canada",
    image: "/photos/arrival.jpg",
    imageAlt: "Travellers silhouetted against an airport terminal window",
    title: "Visit Canada",
    short: "Visitor & Super Visa",
    intent: "A short stay, or an extension.",
    summary:
      "Visitor visas, electronic travel authorisations, extensions of stay, and the Super Visa for parents and grandparents.",
    body: [
      "Short stays are the applications people most often try alone. They are also the ones where a refusal does the most quiet damage, because it sits on your record and follows every application that comes after it.",
      "We make sure the right document is being applied for in the first place, and that the file answers the questions an officer is actually weighing.",
    ],
    programs: [
      {
        name: "Visitor visa",
        note: "The temporary resident visa required by nationals of many countries to enter Canada.",
      },
      {
        name: "Electronic Travel Authorization (eTA)",
        note: "Required instead of a visa for visa-exempt travellers arriving by air.",
      },
      {
        name: "Visitor record",
        note: "Used to extend an authorised stay or change conditions while already inside Canada.",
      },
      {
        name: "Parent and Grandparent Super Visa",
        note: "A long-validity, multiple-entry visa allowing extended stays with family in Canada, subject to insurance and income requirements.",
      },
    ],
    metaTitle: "Visitor Visas, eTA & Super Visa",
    metaDescription:
      "Visitor visa, eTA, visitor record and Parent and Grandparent Super Visa applications, prepared by a licensed Canadian immigration consultant.",
  },
  {
    slug: "family-sponsorship",
    image: "/photos/family.jpg",
    imageAlt: "A couple walking together, hands held",
    title: "Bring your family",
    short: "Family Sponsorship",
    intent: "Someone you love is elsewhere.",
    summary:
      "Sponsorship of spouses, partners, children and other eligible relatives for permanent residence.",
    body: [
      "Sponsorship files are documentary, personal, and unforgiving of gaps. A relationship that is entirely genuine still has to be evidenced in the particular way the department expects, and the sponsor's own eligibility has to hold up alongside it.",
      "We handle both halves of the file, and we tell you early if something in the picture needs addressing rather than letting it surface months in.",
    ],
    programs: [
      {
        name: "Family sponsorship",
        note: "For eligible sponsors bringing a spouse, partner, dependent child or other qualifying relative to Canada as a permanent resident.",
      },
    ],
    metaTitle: "Family Sponsorship in Canada",
    metaDescription:
      "Spousal, partner and family sponsorship applications for Canadian permanent residence, prepared by a Regulated Canadian Immigration Consultant.",
  },
  {
    slug: "citizenship",
    image: "/photos/citizenship.jpg",
    imageAlt: "Trees turning colour in autumn",
    title: "Become a Canadian citizen",
    short: "Citizenship",
    intent: "You have been here long enough.",
    summary:
      "Citizenship applications for permanent residents who meet the residency and other requirements.",
    body: [
      "Citizenship is the most administrative step of the journey, and the easiest to get wrong on a technicality. Most often that technicality is how physical presence has been counted.",
      "We check the calculation, assemble the record, and prepare you for what follows the application.",
    ],
    programs: [
      {
        name: "Canadian citizenship",
        note: "For permanent residents who meet the physical presence, tax filing, and other requirements set out in the Citizenship Act.",
      },
    ],
    metaTitle: "Canadian Citizenship Applications",
    metaDescription:
      "Canadian citizenship applications for permanent residents, including physical presence calculations, prepared by a licensed immigration consultant.",
  },
  {
    slug: "reviews-and-records",
    image: "/photos/documents.jpg",
    imageAlt: "Passports resting on a plain surface",
    title: "Check a file, or find out what went wrong",
    short: "Review & Records",
    intent: "Something stalled, or was refused.",
    summary:
      "Independent review of an application before you file, and formal requests for the notes on your own file.",
    body: [
      "Two of the most useful things we do are also the least known. A review puts a second, licensed set of eyes on an application you have prepared yourself, before you submit it and while it can still be fixed.",
      "An ATIP request retrieves the officer's own notes from your file. After a refusal, it is very often the only way to learn the actual reason rather than the standard wording on the letter.",
    ],
    programs: [
      {
        name: "Application review",
        note: "A file you have prepared yourself, reviewed against the requirements before you submit it.",
      },
      {
        name: "Access to Information & Privacy request (ATIP)",
        note: "A formal request for the notes and records held on your own immigration file, commonly used to understand a refusal.",
      },
    ],
    metaTitle: "Application Review & ATIP Requests",
    metaDescription:
      "Independent pre-submission review of immigration applications, and ATIP requests to obtain the officer notes on your own file.",
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

/* ==========================================================================
   Principles. These are the client's own four pillars. The headline word is
   theirs; the sentence beneath each one is theirs verbatim, lightly set.
   ========================================================================== */

export const principles = [
  {
    n: "01",
    title: "Interactive",
    verbatim:
      "We believe that you are worth our time and keeping you updated at each stage of the application process is our priority.",
    gloss: "You will not have to chase us for an update.",
  },
  {
    n: "02",
    title: "Professional",
    verbatim:
      "Our processes are above board. You eliminate the risk of dealing with false agents.",
    gloss:
      "Every file is handled by a consultant you can look up on a public register.",
  },
  {
    n: "03",
    title: "Affordable",
    verbatim: "Our fees are affordable.",
    gloss: "You are quoted before any work begins, not after.",
  },
  {
    n: "04",
    title: "Reliable",
    verbatim:
      "You can count on us to guide and support you throughout the application process.",
    gloss: "We stay on the file until IRCC gives you a decision.",
  },
] as const;

/* ==========================================================================
   How the engagement works, drawn from the client's description of their
   own consultation and follow-through process.
   ========================================================================== */

export const process = [
  {
    n: "01",
    title: "A first conversation",
    body: "We meet by video or phone, wherever you are. You bring your questions and your situation as it actually is, including anything you are worried about.",
    aside: "Free · 30 minutes · video or phone",
  },
  {
    n: "02",
    title: "An honest assessment",
    body: "We tell you which options are genuinely open to you and which are not. If we are not the right help for your situation, we will say so.",
    aside: "No obligation to continue",
  },
  {
    n: "03",
    title: "The documents, set out clearly",
    body: "You get a specific list of what your application needs and why each item matters. It is not a generic checklist copied from a government page.",
    aside: "Written, and specific to your file",
  },
  {
    n: "04",
    title: "Preparation and submission",
    body: "We prepare the application, review it against the requirements, and submit it. You know what has been filed and what it says.",
    aside: "Reviewed before it is filed",
  },
  {
    n: "05",
    title: "We stay with it",
    body: "We continue to support you and provide updates until you receive a decision from Immigration, Refugees and Citizenship Canada.",
    aside: "Through to the IRCC decision",
  },
] as const;

/* ==========================================================================
   FAQ, written to answer the questions this market actually asks and to
   discharge the honesty obligations an RCIC carries.
   ========================================================================== */

export const faqs = [
  {
    q: "What is an RCIC, and how do I check that one is real?",
    a: `A Regulated Canadian Immigration Consultant is licensed by the ${consultant.regulator} and is one of only three categories of people permitted to represent you for a fee in dealings with IRCC. The other two are lawyers and Quebec notaries. Every licensee has a registration number beginning with "R". ${consultant.name}'s is ${consultant.rcicNumber}. You can enter that number, or any consultant's, into the College's public register at ${consultant.registerLabel} and see their status for yourself. We would encourage you to do it before you hire anyone, including us.`,
    category: "Credentials",
  },
  {
    q: "What is a “ghost consultant”, and why does it matter?",
    a: "It is someone who takes a fee to prepare or advise on your application while holding no licence at all. They are unaccountable to any regulator, and if the application fails you have no recourse. The risk is not theoretical. It is the single most common way people lose both their money and their chance at a status. The defence is simple: ask for a registration number and check it on the public register.",
    category: "Credentials",
  },
  {
    q: "Can you guarantee my application will be approved?",
    a: "No, and anyone who tells you otherwise is breaking the rules they practise under. Decisions are made by Immigration, Refugees and Citizenship Canada, not by us. What we can do is make sure your application is complete, accurate, properly evidenced, and filed under the right programme, then be straight with you about how it is likely to be received.",
    category: "Expectations",
  },
  {
    q: "Do you have any special relationship with IRCC?",
    a: "No. No consultant or lawyer does, and claiming to is prohibited. What professional representation gives you is a file prepared to the standard an officer expects, and someone accountable for it.",
    category: "Expectations",
  },
  {
    q: "What does the first consultation cost?",
    a: `Nothing. The first consultation is free, and it is held by video or phone so you can take it from home wherever you are. If your situation calls for work beyond that, we will tell you what it involves and what it costs before anything begins.`,
    category: "Fees",
  },
  {
    q: "Do I have to be in Kamloops, or in Canada, to work with you?",
    a: `No. The practice is based in ${org.locality}, but consultations are held by video or phone and applications are prepared and filed electronically. Clients work with us from wherever they currently are.`,
    category: "Working together",
  },
  {
    q: "Who will actually be handling my file?",
    a: `${consultant.name}, ${consultant.titleShort} ${consultant.rcicNumber}. This is a small practice by design. The person you speak with in your first consultation is the person who prepares your application. Your file is not passed to an unlicensed assistant.`,
    category: "Working together",
  },
  {
    q: "My application was refused. Is there anything to be done?",
    a: "Often, yes. The first step is finding out why it was actually refused, which the refusal letter frequently does not tell you in any useful detail. An ATIP request retrieves the officer's own notes from your file. With those in hand you can make an informed decision about reapplying or pursuing another route, rather than guessing.",
    category: "Refusals",
  },
  {
    q: "Can you review an application I have prepared myself?",
    a: "Yes. Plenty of people are capable of preparing their own application and simply want a licensed second opinion before they submit it. It is a defined piece of work and it is generally the cheapest way we can help you.",
    category: "Working together",
  },
] as const;

export const faqCategories = [
  "Credentials",
  "Expectations",
  "Fees",
  "Working together",
  "Refusals",
] as const;

/* ==========================================================================
   Navigation
   ========================================================================== */

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Contact" },
] as const;

export const primaryCta = {
  href: "/consultation",
  label: "Book a free consultation",
  labelShort: "Book a consultation",
} as const;
