import type { MetadataRoute } from "next";

// Required by `output: "export"`: these are generated once at build time.
export const dynamic = "force-static";
import { org } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  /* A preview deployment is a duplicate of a real business's site. Letting it
     be indexed would split the client's search presence and compete with their
     own domain, so the static demo build asks robots to stay away entirely. */
  if (process.env.NEXT_PUBLIC_STATIC_DEMO === "1") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here is secret; these simply have no business in an index.
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${org.url}/sitemap.xml`,
    host: org.url,
  };
}
