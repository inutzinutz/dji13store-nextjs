import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getProductCategories, getBannerPosts } from '@/lib/wordpress';
import ProductCard from '@/components/ui/ProductCard';
import HeroParticle, { type HeroSlide } from '@/components/ui/HeroParticle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StatsCounter, { type StatItem } from '@/components/ui/StatsCounter';
import ProductSlider from '@/components/ui/ProductSlider';

/* ─── Stats ──────────────────────────────────────────────────── */
const STATS: StatItem[] = [
  { value: 110,  suffix: '+', label: 'สินค้า DJI' },
  { value: 10,   suffix: '+', label: 'ปีในวงการ' },
  { value: 2,    suffix: ' สาขา', label: 'กรุงเทพฯ' },
  { value: 5000, suffix: '+', label: 'ลูกค้าพึงพอใจ' },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default async function HomePage() {
  const [products, categories, bannerPosts] = await Promise.all([
    getProducts({ per_page: 12 }),
    getProductCategories(),
    getBannerPosts(5),
  ]);

  // Hero slides from banner posts
  const slides: HeroSlide[] = (bannerPosts as any[]).map((p) => ({
    id:      p.id,
    title:   p.title.rendered,
    excerpt: p.excerpt?.rendered || '',
    href:    `/news/${p.slug}`,
  }));

  // Featured categories — มี image + count > 0
  const featuredCats = (categories as any[])
    .filter((c) => c.image?.src && c.count > 0 && c.name !== 'Uncategorized')
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 8);

  // Split products: first 4 for grid feature, rest for slider
  const gridProducts    = (products as any[]).slice(0, 4);
  const sliderProducts  = (products as any[]).slice(4);

  return (
    <>
      {/* ══ 1. Hero ══════════════════════════════════════════════ */}
      <HeroParticle
        slides={slides}
        tagline="ผู้นำเข้าและตัวแทนจำหน่ายโดรน DJI และอุปกรณ์กันสั่น ราคาดี บริการดี"
      />

      {/* ══ 2. Category quick-nav ════════════════════════════════ */}
      {featuredCats.length > 0 && (
        <section className="bg-background border-b border-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ScrollReveal direction="up">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
                {featuredCats.map((cat: any, i: number) => (
                  <ScrollReveal key={cat.id} direction="up" delay={i * 50}>
                    <Link
                      href={`/products?category=${cat.id}`}
                      className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-accent transition-colors"
                    >
                      <div className="relative w-14 h-14 md:w-16 md:h-16">
                        <Image
                          src={cat.image.src}
                          alt={cat.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-200"
                          sizes="64px"
                        />
                      </div>
                      <span className="text-center text-[10px] md:text-xs text-muted-foreground font-medium leading-tight line-clamp-2">
                        {cat.name}
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ══ 3. Stats bar ════════════════════════════════════════ */}
      <section className="bg-[hsl(222,47%,15%)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StatsCounter stats={STATS} />
        </div>
      </section>

      {/* ══ 4. Featured grid (top 4) ════════════════════════════ */}
      <section className="bg-background pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal direction="up">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="section-label mb-1">
                  <span className="inline-block w-5 h-px bg-primary" />
                  สินค้าแนะนำ
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-foreground">
                  สินค้ายอดนิยม
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
              >
                ดูทั้งหมด
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          {gridProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gridProducts.map((product: any, i: number) => (
                <ScrollReveal key={product.id} direction="up" delay={i * 80}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">กำลังโหลดสินค้า...</p>
          )}
        </div>
      </section>

      {/* ══ 5. Product slider (remaining) ══════════════════════ */}
      {sliderProducts.length > 0 && (
        <section className="bg-background py-6 pb-14">
          <ScrollReveal direction="up">
            <ProductSlider
              title="สินค้าอื่น ๆ"
              viewAllHref="/products"
            >
              {sliderProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductSlider>
          </ScrollReveal>
        </section>
      )}

      {/* ══ 6. Brand strip ════════════════════════════════════ */}
      <ScrollReveal direction="up">
        <section className="bg-muted border-y border-border py-8 text-center">
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-3">
            Authorized DJI Dealer
          </p>
          <p className="text-foreground font-bold text-lg md:text-xl">
            DJI 13store — Camera Drones · Handheld Gimbal · Enterprise
          </p>
        </section>
      </ScrollReveal>

      {/* ══ 7. Contact CTA ════════════════════════════════════ */}
      <section className="bg-[hsl(222,47%,15%)] py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal direction="up">
            <p className="section-label justify-center mb-4">
              <span className="inline-block w-5 h-px bg-primary" />
              ต้องการคำแนะนำ?
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              ปรึกษาก่อนซื้อฟรี
            </h2>
            <p className="text-white/50 mb-8 text-base">
              ทีมงานผู้เชี่ยวชาญโดรนพร้อมให้คำแนะนำทุกวัน จ–อา 09:30–18:30 น.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+66894500055"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 text-sm tracking-wide transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                </svg>
                โทร 089-450-0055
              </a>
              <a
                href="https://line.me/ti/p/~@dji13store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34d] text-white font-bold px-8 py-3.5 text-sm tracking-wide transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.064-.022.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINE: @dji13store
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 hover:border-white hover:text-white font-semibold px-8 py-3.5 text-sm transition-colors"
              >
                ดูแผนที่สาขา
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
