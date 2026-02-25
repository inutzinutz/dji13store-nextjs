import type { MetadataRoute } from "next";
import { getAllProducts, getAllPosts, getAllPages } from "@/lib/wordpress";

/**
 * Sitemap ที่ดึงทุก URL จาก WordPress:
 * - Static pages (Next.js routes)
 * - ทุก product (WooCommerce)
 * - ทุก post (WP blog)
 * - ทุก WP page (content pages)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.dji13store.com";

  // Next.js static routes
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/promotions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // Enterprise pages
    { url: `${baseUrl}/enterprise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/platform`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/altura`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/roi-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/drone-rental`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Slugs ที่มี dedicated Next.js route แล้ว — ไม่ต้องใส่ซ้ำจาก WP pages
  const dedicatedSlugs = new Set([
    'about', 'about-us', 'contact', 'where-to-buy', 'news', 'blog',
    'our-news', 'shop', 'product', 'products', 'promotions', 'promotion',
    'cart', 'checkout', 'my-account', 'wishlist', 'compare', 'compare-new',
    'home-2', 'confirm-payment', 'track-order', 'your-order-details', 'payment',
    // Enterprise pages
    'enterprise', 'platform', 'altura', 'solutions', 'case-studies',
    'roi-calculator', 'drone-rental',
  ]);

  try {
    const [products, posts, pages] = await Promise.all([
      getAllProducts(),
      getAllPosts(),
      getAllPages(),
    ]);

    // Products → /products/[slug]
    const productPages: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(p.date_modified as string || new Date().toISOString()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Posts → /news/[slug]
    const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${baseUrl}/news/${p.slug}`,
      lastModified: new Date((p as any).modified || p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    // WP Pages → /[slug] (excluding ones with dedicated routes)
    const wpPages: MetadataRoute.Sitemap = pages
      .filter((p) => p.slug && !dedicatedSlugs.has(p.slug))
      .map((p) => ({
        url: `${baseUrl}/${p.slug}`,
        lastModified: new Date((p as any).modified || p.date || new Date().toISOString()),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }));

    return [...staticPages, ...productPages, ...postPages, ...wpPages];
  } catch {
    return staticPages;
  }
}
