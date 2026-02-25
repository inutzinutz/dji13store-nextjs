import type { NextConfig } from "next";

const WP_URL = process.env.WP_BASE_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.dji13store.com" },
      { protocol: "https", hostname: "**.dji13store.com" },
      { protocol: "http",  hostname: "localhost", port: "8080" },
      { protocol: "http",  hostname: "localhost" },
    ],
  },
  // Proxy /wp-content/* → WordPress
  async rewrites() {
    return [
      {
        source: "/wp-content/:path*",
        destination: `${WP_URL}/wp-content/:path*`,
      },
    ];
  },
  // 301 Redirects จาก URL เดิม (WordPress) → URL ใหม่ (Next.js)
  async redirects() {
    return [
      // WP Admin proxy
      { source: "/wp-admin",     destination: `${WP_URL}/wp-admin`, permanent: false },
      { source: "/wp-admin/:path*", destination: `${WP_URL}/wp-admin/:path*`, permanent: false },
      { source: "/wp-login.php", destination: `${WP_URL}/wp-login.php`, permanent: false },

      // Products: /product/slug → /products/slug
      { source: "/product/:slug", destination: "/products/:slug", permanent: true },
      { source: "/shop",          destination: "/products",       permanent: true },
      { source: "/shop/:path*",   destination: "/products/:path*", permanent: true },

      // Key pages: old WP slug → new Next.js route
      { source: "/about-us",       destination: "/about",      permanent: true },
      { source: "/blog",           destination: "/news",       permanent: true },
      { source: "/our-news",       destination: "/news",       permanent: true },
      { source: "/where-to-buy",   destination: "/contact",    permanent: true },
      { source: "/promotion",      destination: "/promotions", permanent: true },
      { source: "/my-account",     destination: "/",           permanent: true },
      { source: "/cart",           destination: "/products",   permanent: true },
      { source: "/checkout",       destination: "/products",   permanent: true },
      { source: "/wishlist",       destination: "/products",   permanent: true },
      { source: "/compare",        destination: "/products",   permanent: true },
      { source: "/compare-new",    destination: "/products",   permanent: true },
      { source: "/home-2",         destination: "/",           permanent: true },

      // E-commerce utility pages (no longer needed in headless)
      { source: "/confirm-payment", destination: "/contact",   permanent: true },
      { source: "/track-order",     destination: "/contact",   permanent: true },
      { source: "/your-order-details", destination: "/contact", permanent: true },
      { source: "/payment",        destination: "/contact",    permanent: true },
    ];
  },
};

export default nextConfig;
