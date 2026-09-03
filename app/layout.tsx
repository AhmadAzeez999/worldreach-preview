import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/chrome/Header";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { Footer } from "@/components/chrome/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Intro } from "@/components/brand/Intro";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { org, consultant, services } from "@/lib/content";

/* Newsreader carries the editorial voice. It has optical sizing and a warmth
   that keeps the ink palette from reading cold. Inter is deliberately neutral
   infrastructure underneath it. Plex Mono is reserved for record-like data:
   the licence number, process numerals, eyebrows. */
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1f33" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(org.url),
  title: {
    default: `${org.registeredName} | Licensed Canadian Immigration Consultant`,
    template: `%s | ${org.shortName} Immigration`,
  },
  description: `${org.registeredName} is the practice of ${consultant.name}, ${consultant.title} ${consultant.rcicNumber}, based in ${org.locality}. Study, work, visitor, permanent residence, sponsorship and citizenship applications. Free first consultation by video or phone.`,
  applicationName: org.registeredName,
  authors: [{ name: consultant.name }],
  keywords: [
    "immigration consultant Kamloops",
    "RCIC British Columbia",
    "Canadian immigration consultant",
    "Express Entry",
    "Provincial Nominee Program",
    "study permit Canada",
    "work permit Canada",
    "family sponsorship Canada",
    "Super Visa",
    "Canadian citizenship application",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: org.url,
    siteName: org.registeredName,
    title: `${org.registeredName} | Licensed Canadian Immigration Consultant`,
    description: `Licensed Canadian immigration help from ${org.locality}. ${consultant.titleShort} ${consultant.rcicNumber}. Free first consultation by video or phone.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${org.registeredName} | Licensed Canadian Immigration Consultant`,
    description: `Licensed Canadian immigration help from ${org.locality}. ${consultant.titleShort} ${consultant.rcicNumber}.`,
  },
  robots:
    process.env.NEXT_PUBLIC_STATIC_DEMO === "1"
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
  formatDetection: { telephone: true, address: false, email: true },
};

/* Structured data. Every value is drawn from lib/content.ts, so the markup
   can never drift from what the page actually says. No aggregateRating and no
   review markup: there are no verified reviews, and inventing them would
   breach CICC s.45 as well as Google's guidelines. */
function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${org.url}/#practice`,
        name: org.registeredName,
        description: `Licensed Canadian immigration consulting practice in ${org.locality}.`,
        url: org.url,
        telephone: org.phoneDisplay,
        email: org.email,
        areaServed: "Worldwide",
        address: {
          "@type": "PostalAddress",
          addressLocality: org.city,
          addressRegion: org.regionCode,
          addressCountry: "CA",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "15:00",
        },
        founder: { "@id": `${org.url}/#consultant` },
        employee: { "@id": `${org.url}/#consultant` },
        knowsAbout: services.map((s) => s.short),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Immigration services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.short,
              description: s.summary,
              url: `${org.url}/services/${s.slug}`,
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": `${org.url}/#consultant`,
        name: consultant.name,
        jobTitle: consultant.title,
        worksFor: { "@id": `${org.url}/#practice` },
        identifier: consultant.rcicNumber,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Professional licence",
          name: `${consultant.title} (${consultant.rcicNumber})`,
          recognizedBy: {
            "@type": "Organization",
            name: consultant.regulator,
            url: "https://college-ic.ca",
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": `${org.url}/#website`,
        url: org.url,
        name: org.registeredName,
        inLanguage: "en-CA",
        publisher: { "@id": `${org.url}/#practice` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-CA"
      className={`${newsreader.variable} ${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          RESILIENCE: Motion writes its `initial` state into the server HTML as
          inline `opacity:0` / `transform:translateY(...)`. If the client bundle
          never executes, whether blocked, failed to load, or thrown during
          hydration,
          those styles are permanent and the page renders as a header above a
          blank void. That is a catastrophic failure mode for a site whose job
          is generating enquiries, so it is defended against rather than
          assumed away.

          This runs before first paint and marks the document as
          motion-capable, which lets the CSS in globals.css stand down and
          motion take over: so there is no flash in the normal case. A
          watchdog then clears the flag if React has not signalled hydration in
          time, at which point the CSS forces every animated element to its
          resting, visible state.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.setAttribute('data-motion-ready','');" +
              "setTimeout(function(){if(!window.__wrHydrated)d.removeAttribute('data-motion-ready')},2500)})()",
          }}
        />
      </head>
      <body className="min-h-dvh bg-paper antialiased">
        <StructuredData />
        <MotionProvider>
          <SmoothScroll />
          <Intro />
          <ScrollProgress />
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
