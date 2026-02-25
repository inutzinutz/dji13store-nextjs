import type { Metadata } from 'next';
import Link from 'next/link';
import { getProducts } from '@/lib/wordpress';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';
import { Tag, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'โปรโมชั่น & ส่วนลด',
  description: 'โปรโมชั่นสินค้า DJI ราคาพิเศษ ลดสูงสุด พร้อมของแถมมากมาย อัปเดตทุกสัปดาห์',
};

export default async function PromotionsPage() {
  const saleProducts = await getProducts({ per_page: 24 }) as Product[];
  const onSale       = saleProducts.filter((p) => p.on_sale);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[hsl(222,47%,15%)] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[300px] h-[200px] bg-primary/15 blur-[80px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="section-label mb-4">
            <Tag size={11} />
            โปรโมชั่น
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-white mb-3 leading-tight">
            Flash Sale สินค้า DJI
          </h1>
          <p className="text-white/50 mb-8 max-w-md">
            ลดราคาพิเศษ อัปเดตทุกสัปดาห์ อย่าพลาดโอกาสนี้
          </p>
          <a
            href="https://line.me/ti/p/~@dji13store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34d] text-white font-bold px-7 py-3.5 rounded-full transition-colors"
          >
            สอบถามโปรโมชั่นผ่าน LINE <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Sale products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {onSale.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <h2 className="font-bold text-foreground">สินค้าลดราคาตอนนี้ ({onSale.length} รายการ)</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {onSale.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-2 font-medium">ไม่มีสินค้าลดราคาในขณะนี้</p>
            <p className="text-muted-foreground/60 text-sm mb-8">ติดต่อเราเพื่อสอบถามโปรโมชั่นพิเศษ</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[hsl(222,47%,15%)] hover:bg-[hsl(220,35%,25%)] text-white font-bold px-7 py-3.5 rounded-full transition-colors"
              >
                ดูสินค้าทั้งหมด
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold px-7 py-3.5 rounded-full hover:border-primary/50 transition-colors"
              >
                ติดต่อสอบถาม
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
