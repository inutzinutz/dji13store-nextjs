import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border aspect-[3/4]">
      <div className="w-full h-full skeleton" />
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const image      = product.images[0];
  const category   = product.categories?.[0];
  const hasDiscount = product.on_sale && product.sale_price && Number(product.regular_price) > 0;
  const discount    = hasDiscount
    ? Math.round(((Number(product.regular_price) - Number(product.sale_price)) / Number(product.regular_price)) * 100)
    : 0;

  // short description — strip HTML, truncate
  const shortDesc = product.short_description
    ?.replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .slice(0, 80);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-card overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-200"
    >
      {/* Image area — รูปสินค้าเต็ม */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Category tag — top-left เหมือนเว็บเดิม */}
        {category && (
          <div className="absolute top-0 left-0 z-10">
            <span className="block bg-[hsl(222,47%,15%)]/80 text-white text-[10px] font-semibold px-2.5 py-1 tracking-wide">
              {category.name}
            </span>
          </div>
        )}

        {/* Sale badge */}
        {discount > 0 && (
          <div className="absolute top-0 right-0 z-10">
            <span className="block bg-red-600 text-white text-[10px] font-black px-2 py-1">
              -{discount}%
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-bold text-foreground text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {shortDesc && (
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-2">
            {shortDesc}
          </p>
        )}
        {Number(product.price) > 0 && (
          <div className="flex items-baseline gap-1.5">
            <span className="text-primary font-black text-sm">
              ฿{Number(product.price).toLocaleString('th-TH')}
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground text-xs line-through">
                ฿{Number(product.regular_price).toLocaleString('th-TH')}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
