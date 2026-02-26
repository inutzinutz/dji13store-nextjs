const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:8080/wp-json';
const WP_BASE = process.env.WP_BASE_URL || 'http://localhost:8080';

const WC_KEY    = process.env.WC_CONSUMER_KEY    || '';
const WC_SECRET = process.env.WC_CONSUMER_SECRET || '';

function wcAuth() {
  return { consumer_key: WC_KEY, consumer_secret: WC_SECRET };
}

/**
 * แปลง image URL จาก WordPress ให้เป็น relative path (/wp-content/...)
 * เพื่อให้ Next.js rewrites proxy ได้ทั้ง local dev และ production
 */
function normalizeImageUrl(url: string): string {
  if (!url) return '';
  let path = url;
  // แทนที่ WP base URL ด้วย relative path (รองรับทั้ง local และ production)
  path = path
    .replace(/https?:\/\/localhost:8080/g, '')
    .replace(/https?:\/\/api\.dji13store\.com/g, '')
    .replace(/https?:\/\/www\.dji13store\.com/g, '');
  // fallback: ถ้ายังเป็น absolute URL ของ WP_BASE ให้ strip ออก
  if (WP_BASE && path.startsWith(WP_BASE)) {
    path = path.replace(WP_BASE, '');
  }
  // Strip query string — Next.js Image ไม่รองรับ query string ใน local paths
  const qIdx = path.indexOf('?');
  if (qIdx !== -1) path = path.substring(0, qIdx);
  return path;
}

function normalizeProduct(p: WCProduct): WCProduct {
  return {
    ...p,
    images: p.images?.map((img) => ({ ...img, src: normalizeImageUrl(img.src) })) ?? [],
  };
}

function normalizePost(p: WPPost): WPPost {
  const featured = p._embedded?.['wp:featuredmedia']?.[0];
  if (featured?.source_url) {
    featured.source_url = normalizeImageUrl(featured.source_url);
  }
  return p;
}

// Types
interface WCProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  status: string;
  stock_status: string;
  images: { id: number; src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  short_description: string;
  description: string;
  attributes: { id: number; name: string; options: string[]; visible: boolean }[];
  meta_data?: { key: string; value: unknown }[];
  [key: string]: unknown;
}

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string; alt_text: string }[];
  };
  [key: string]: unknown;
}

// ---- Products (WooCommerce REST API) ----
export async function getProducts(params?: {
  category?: number;
  per_page?: number;
  page?: number;
  search?: string;
}) {
  const query = new URLSearchParams({
    per_page: String(params?.per_page ?? 12),
    page:     String(params?.page     ?? 1),
    ...wcAuth(),
    ...(params?.category ? { category: String(params.category) } : {}),
    ...(params?.search   ? { search:   params.search }           : {}),
  });
  try {
    const res = await fetch(`${WP_API}/wc/v3/products?${query}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: WCProduct[] = await res.json();
    return data.map(normalizeProduct);
  } catch {
    return [];
  }
}

export async function getProduct(slug: string) {
  const query = new URLSearchParams({ slug, ...wcAuth() });
  try {
    const res = await fetch(`${WP_API}/wc/v3/products?${query}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: WCProduct[] = await res.json();
    return data[0] ? normalizeProduct(data[0]) : null;
  } catch {
    return null;
  }
}

export async function getProductCategories() {
  const query = new URLSearchParams({ per_page: '100', ...wcAuth() });
  try {
    const res = await fetch(`${WP_API}/wc/v3/products/categories?${query}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    // normalize category image URLs
    return data.map((cat: any) => ({
      ...cat,
      image: cat.image ? { ...cat.image, src: normalizeImageUrl(cat.image.src) } : null,
    }));
  } catch {
    return [];
  }
}

// ---- Banner posts (posts ที่มี featured image สำหรับ hero slider) ----
export async function getBannerPosts(per_page = 5) {
  try {
    const res = await fetch(
      `${WP_API}/wp/v2/posts?per_page=${per_page}&_embed&_fields=id,slug,title,excerpt,_embedded`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data: WPPost[] = await res.json();
    return data
      .map(normalizePost)
      .filter((p) => p._embedded?.['wp:featuredmedia']?.[0]?.source_url);
  } catch {
    return [];
  }
}

// ---- Posts (WP REST API) ----
export async function getPosts(per_page = 6, page = 1) {
  try {
    const res = await fetch(
      `${WP_API}/wp/v2/posts?per_page=${per_page}&page=${page}&_embed`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data: WPPost[] = await res.json();
    return data.map(normalizePost);
  } catch {
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    const res = await fetch(`${WP_API}/wp/v2/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: WPPost[] = await res.json();
    return data[0] ? normalizePost(data[0]) : null;
  } catch {
    return null;
  }
}

// ---- Pages (WP REST API) ----
export async function getPage(slug: string) {
  try {
    const res = await fetch(`${WP_API}/wp/v2/pages?slug=${slug}&_embed`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

// ---- Paginated fetch helpers (for sitemap & catch-all) ----

/** Fetch ALL products (paginated, 20/page to stay under 2MB cache limit) */
export async function getAllProducts(): Promise<WCProduct[]> {
  const all: WCProduct[] = [];
  let page = 1;
  const PER_PAGE = 20;
  while (true) {
    const query = new URLSearchParams({
      per_page: String(PER_PAGE),
      page: String(page),
      ...wcAuth(),
    });
    try {
      const res = await fetch(`${WP_API}/wc/v3/products?${query}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) break;
      const data: WCProduct[] = await res.json();
      if (data.length === 0) break;
      all.push(...data.map(normalizeProduct));
      if (data.length < PER_PAGE) break;
      page++;
    } catch {
      break;
    }
  }
  return all;
}

/** Fetch ALL posts (paginated, 20/page to stay under 2MB cache limit) */
export async function getAllPosts(): Promise<WPPost[]> {
  const all: WPPost[] = [];
  let page = 1;
  const PER_PAGE = 20;
  while (true) {
    try {
      const res = await fetch(
        `${WP_API}/wp/v2/posts?per_page=${PER_PAGE}&page=${page}&_embed`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) break;
      const data: WPPost[] = await res.json();
      if (data.length === 0) break;
      all.push(...data.map(normalizePost));
      if (data.length < PER_PAGE) break;
      page++;
    } catch {
      break;
    }
  }
  return all;
}

/** Fetch ALL pages (paginated, 20/page to stay under 2MB cache limit) */
export async function getAllPages(): Promise<WPPost[]> {
  const all: WPPost[] = [];
  let page = 1;
  const PER_PAGE = 20;
  while (true) {
    try {
      const res = await fetch(
        `${WP_API}/wp/v2/pages?per_page=${PER_PAGE}&page=${page}&_embed`,
        { next: { revalidate: 86400 } },
      );
      if (!res.ok) break;
      const data: WPPost[] = await res.json();
      if (data.length === 0) break;
      all.push(...data.map(normalizePost));
      if (data.length < PER_PAGE) break;
      page++;
    } catch {
      break;
    }
  }
  return all;
}

/** Get product category by slug (for redirects) */
export async function getCategoryBySlug(slug: string) {
  const query = new URLSearchParams({ slug, ...wcAuth() });
  try {
    const res = await fetch(`${WP_API}/wc/v3/products/categories?${query}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

/** Normalize WP page/post content — fix image URLs inside HTML */
export function normalizeContent(html: string): string {
  if (!html) return '';
  return html
    .replace(/https?:\/\/localhost:8080/g, '')
    .replace(/https?:\/\/api\.dji13store\.com/g, '')
    .replace(/https?:\/\/www\.dji13store\.com/g, '');
}
