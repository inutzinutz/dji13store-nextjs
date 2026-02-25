import type { Metadata } from 'next';
import { getProducts, getProductCategories } from '@/lib/wordpress';
import ProductCard, { ProductCardSkeleton } from '@/components/ui/ProductCard';
import SearchBar from '@/components/ui/SearchBar';
import { Product, Category } from '@/types';
import { SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'สินค้าทั้งหมด',
  description: 'สินค้า DJI ทุกรุ่น โดรน กล้อง Gimbal และอุปกรณ์เสริม ของแท้ 100% มีประกัน',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}) {
  const params      = await searchParams;
  const currentPage = Number(params.page) || 1;
  const categoryId  = params.category ? Number(params.category) : undefined;
  const search      = params.search || undefined;

  const [products, categories] = await Promise.all([
    getProducts({ per_page: 16, page: currentPage, category: categoryId, search }),
    getProductCategories(),
  ]);

  const activeCategories = (categories as Category[]).filter(
    (c) => c.count > 0 && c.name !== 'Uncategorized',
  );

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const p = { ...params, ...overrides };
    const qs = new URLSearchParams(
      Object.entries(p).filter(([, v]) => v !== undefined) as [string, string][],
    );
    return `/products?${qs.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-black text-foreground mb-1">สินค้าทั้งหมด</h1>
          <p className="text-muted-foreground text-sm">
            สินค้า DJI ของแท้ 100% มีประกัน พร้อมบริการหลังการขาย
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + filter row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar defaultValue={params.search || ''} />
          </div>
        </div>

        {/* Category filter */}
        {activeCategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
            <a
              href="/products"
              className={`cat-pill shrink-0 ${!categoryId && !search ? 'active' : ''}`}
            >
              ทั้งหมด
            </a>
            {activeCategories.map((cat) => (
              <a
                key={cat.id}
                href={buildHref({ category: String(cat.id), page: '1' })}
                className={`cat-pill shrink-0 ${categoryId === cat.id ? 'active' : ''}`}
              >
                {cat.name}
                <span className="ml-1.5 text-[10px] opacity-50">({cat.count})</span>
              </a>
            ))}
          </div>
        )}

        {/* Search result info */}
        {search && (
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span>ผลการค้นหา:</span>
            <span className="font-semibold text-foreground">&ldquo;{search}&rdquo;</span>
            <span className="text-muted-foreground">({(products as Product[]).length} รายการ)</span>
            <a href="/products" className="text-primary hover:text-primary/80 ml-1 font-medium">× ล้าง</a>
          </div>
        )}

        {/* Grid */}
        {(products as Product[]).length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {(products as Product[]).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg font-medium">
              {search ? `ไม่พบสินค้า "${search}"` : 'ยังไม่มีสินค้า'}
            </p>
            <p className="text-muted-foreground/60 text-sm mt-2">
              {search && 'ลองค้นหาด้วยคำอื่น หรือ'}
              <a href="/products" className="text-primary hover:underline ml-1">ดูสินค้าทั้งหมด</a>
            </p>
          </div>
        )}

        {/* Pagination */}
        {(products as Product[]).length === 16 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {currentPage > 1 && (
              <a
                href={buildHref({ page: String(currentPage - 1) })}
                className="px-6 py-2.5 rounded-full border border-border text-muted-foreground text-sm font-medium hover:border-primary/50 transition-colors"
              >
                ← ก่อนหน้า
              </a>
            )}
            <span className="px-4 py-2 text-sm text-muted-foreground">หน้า {currentPage}</span>
            <a
              href={buildHref({ page: String(currentPage + 1) })}
              className="px-6 py-2.5 rounded-full bg-[hsl(222,47%,15%)] text-white text-sm font-medium hover:bg-[hsl(220,35%,25%)] transition-colors"
            >
              ถัดไป →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
