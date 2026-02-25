import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/wp-admin/", "/wp-json/"],
    },
    sitemap: "https://www.dji13store.com/sitemap.xml",
  };
}
