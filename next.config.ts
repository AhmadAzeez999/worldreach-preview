import type { NextConfig } from "next";

/**
 * STATIC PREVIEW MODE
 *
 * Set NEXT_PUBLIC_STATIC_DEMO=1 to build a fully static copy for a host with
 * no Node runtime (GitHub Pages, in this case), so the client can click
 * through the site before anything is deployed for real.
 *
 * What changes, and why:
 *   • `output: "export"` writes plain HTML to ./out
 *   • image optimisation is off, since it needs a server
 *   • `basePath` lets the site live in a repository subpath
 *   • redirects and headers are dropped, because a static host cannot honour
 *     them. They are config rather than code, so nothing else has to change.
 *
 * The forms detect this build (see lib/enquiry.ts) and compose their mail link
 * in the browser instead of calling the server action.
 *
 * The production build is untouched by any of this.
 */
const isStaticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "1";
const basePath = process.env.DEMO_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  /* `next dev` refuses to serve /_next/* to origins other than localhost.
     Opening the dev server from the machine's LAN address (or a phone on the
     same network) therefore loads the HTML but silently blocks the client
     bundle, and the page renders unhydrated. Allowing private ranges here
     makes on-device testing work. Dev only; it has no effect on a build. */
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    // Add your own address here if it falls outside these patterns.
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
  ],

  images: isStaticDemo
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },

  ...(isStaticDemo
    ? {
        output: "export" as const,
        trailingSlash: true,
        // Swap the server action for a client-side stand-in. A "use server"
        // module anywhere in the graph fails an export build outright, so it
        // has to be replaced rather than merely left uncalled.
        turbopack: {
          resolveAlias: { "@/lib/submit": "./lib/submit.static.ts" },
        },
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
      }
    : {
        /**
         * The site being replaced is a WordPress install whose URLs are already
         * indexed. Permanent redirects preserve whatever ranking and inbound
         * links exist rather than throwing them away on launch day.
         *
         * `/workshop` was the old services page, an artefact of the theme and a
         * genuinely harmful URL for a page about immigration services.
         */
        async redirects() {
          return [
            { source: "/workshop", destination: "/services", permanent: true },
            { source: "/contact-us", destination: "/contact", permanent: true },
            { source: "/coming-soon", destination: "/", permanent: true },
            { source: "/elementor-landing-page-407", destination: "/", permanent: true },
            { source: "/elementor-landing-page-454", destination: "/", permanent: true },
            // Common WordPress paths that should not 404 into nothing.
            { source: "/home", destination: "/", permanent: true },
            { source: "/about-us", destination: "/about", permanent: true },
            { source: "/services/:slug/amp", destination: "/services/:slug", permanent: true },
          ];
        },

        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
