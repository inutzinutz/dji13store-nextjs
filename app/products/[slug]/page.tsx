import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct, getProducts } from '@/lib/wordpress';
import { Phone, MessageCircle, ChevronRight, Shield, Package, Headphones, Check } from 'lucide-react';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/ui/JsonLd';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product   = await getProduct(slug);
  if (!product) return { title: 'ไม่พบสินค้า' };
  return {
    title: product.name,
    description: product.short_description?.replace(/<[^>]*>/g, '').slice(0, 160)
      || `${product.name} ราคา ฿${Number(product.price).toLocaleString()} — DJI13Store`,
    openGraph: {
      title: product.name,
      images: product.images[0] ? [{ url: product.images[0].src }] : [],
    },
    alternates: {
      canonical: `https://www.dji13store.com/products/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug }   = await params;
  const product    = await getProduct(slug);
  if (!product) notFound();

  const mainImage   = product.images[0];
  const baseUrl     = 'https://www.dji13store.com';
  const hasDiscount = product.on_sale && product.sale_price && Number(product.regular_price) > 0;
  const discount    = hasDiscount
    ? Math.round(((Number(product.regular_price) - Number(product.sale_price)) / Number(product.regular_price)) * 100)
    : 0;
  const price = Number(product.price || 0);

  return (
    <div className="min-h-screen bg-background">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={[
        { name: 'หน้าแรก', url: baseUrl },
        { name: 'สินค้า',  url: `${baseUrl}/products` },
        { name: product.name, url: `${baseUrl}/products/${slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">หน้าแรก</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-foreground transition-colors">สินค้า</Link>
          <ChevronRight size={12} />
          {product.categories?.[0] && (
            <>
              <Link href={`/products?category=${product.categories[0].id}`} className="hover:text-foreground transition-colors">
                {product.categories[0].name}
              </Link>
              <ChevronRight size={12} />
            </>
          )}
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* ── Images ─────────────────────────────────────────── */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
              {mainImage ? (
                <Image
                  src={mainImage.src}
                  alt={mainImage.alt || product.name}
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img: any) => (
                  <div
                    key={img.id}
                    className="w-16 h-16 relative rounded-xl border border-border bg-muted overflow-hidden shrink-0 cursor-pointer hover:border-primary/40 transition-colors"
                  >
                    <Image src={img.src} alt={img.alt || product.name} fill className="object-contain p-1.5" sizes="64px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ────────────────────────────────────── */}
          <div>
            {/* Categories */}
            {product.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.categories.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className="text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-5">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
              {price > 0 ? (
                <>
                  <span className="text-3xl md:text-4xl font-black text-primary">
                    ฿{price.toLocaleString('th-TH')}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-muted-foreground line-through font-normal">
                        ฿{Number(product.regular_price).toLocaleString('th-TH')}
                      </span>
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-lg">
                        ประหยัด ฿{(Number(product.regular_price) - Number(product.sale_price)).toLocaleString('th-TH')}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-xl font-semibold text-muted-foreground">สอบถามราคา</span>
              )}
            </div>

            {/* Short description */}
            {product.short_description && (
              <div
                className="text-muted-foreground text-sm leading-relaxed mb-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Attributes */}
            {product.attributes?.filter((a: any) => a.visible !== false).length > 0 && (
              <div className="mb-6 space-y-2">
                {product.attributes.filter((a: any) => a.visible !== false).map((attr: any) => (
                  <div key={attr.name} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground min-w-[6rem] shrink-0">{attr.name}</span>
                    <span className="text-foreground font-medium">{attr.options?.join(', ')}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <a
                href="tel:+66894500055"
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground font-bold py-4 rounded-2xl transition-colors text-base"
              >
                <Phone size={18} />
                โทรสอบถาม / สั่งซื้อ — 089-450-0055
              </a>
              <a
                href="https://line.me/ti/p/~@dji13store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34d] text-white font-bold py-4 rounded-2xl transition-colors text-base"
              >
                <MessageCircle size={18} />
                สอบถามผ่าน LINE: @dji13store
              </a>
            </div>

            {/* Assurance pills */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Shield,     text: 'ของแท้ 100%' },
                { icon: Package,    text: 'มีประกัน' },
                { icon: Headphones, text: 'บริการดี' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-muted rounded-xl text-center">
                  <Icon size={16} className="text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Full Description ──────────────────────────────────── */}
        {product.description && (
          <div className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xl font-black text-foreground mb-6">รายละเอียดสินค้า</h2>
            <div
              className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground prose-headings:font-bold prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
