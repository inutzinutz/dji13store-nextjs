import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/wordpress';
import { Post } from '@/types';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ข่าวสาร & บทความ',
  description: 'ข่าวสารล่าสุด รีวิวสินค้า DJI และบทความน่าสนใจจาก DJI13Store',
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params      = await searchParams;
  const currentPage = Number(params.page) || 1;
  const posts       = await getPosts(9, currentPage) as Post[];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="section-label mb-2">
            <span className="w-4 h-px bg-primary inline-block" />
            บทความ
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground mb-1">ข่าวสาร & บทความ</h1>
          <p className="text-muted-foreground text-sm">อัปเดตสินค้าใหม่ โปรโมชั่น และบทความรีวิว DJI</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => {
              const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              return (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[16/9] bg-muted overflow-hidden">
                    {img
                      ? <img src={img} alt={post.title.rendered} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
                          <span className="text-3xl opacity-30">📰</span>
                        </div>
                    }
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground mb-2">
                      {new Date(post.date).toLocaleDateString('th-TH', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                    <h2
                      className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div
                      className="text-muted-foreground text-sm line-clamp-2 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                      อ่านต่อ <ArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg font-medium">ยังไม่มีบทความ</p>
          </div>
        )}

        {/* Pagination */}
        {posts.length === 9 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {currentPage > 1 && (
              <Link
                href={`/news?page=${currentPage - 1}`}
                className="px-6 py-2.5 rounded-full border border-border text-muted-foreground text-sm font-medium hover:border-primary/50 transition-colors"
              >
                ← ก่อนหน้า
              </Link>
            )}
            <span className="text-sm text-muted-foreground">หน้า {currentPage}</span>
            <Link
              href={`/news?page=${currentPage + 1}`}
              className="px-6 py-2.5 rounded-full bg-[hsl(222,47%,15%)] text-white text-sm font-medium hover:bg-[hsl(220,35%,25%)] transition-colors"
            >
              ถัดไป →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
