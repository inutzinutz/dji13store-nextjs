import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPage, getPost, normalizeContent } from '@/lib/wordpress';
import { BreadcrumbJsonLd } from '@/components/ui/JsonLd';

type Props = { params: Promise<{ slug: string }> };

/**
 * Catch-all route สำหรับ:
 * 1. WordPress pages (render เนื้อหา)
 * 2. WordPress posts ที่ URL เดิมเป็น root-level (301 redirect ไป /news/slug)
 *
 * Routes ที่มี folder เฉพาะ (about, contact, products, news, promotions)
 * จะถูก Next.js จัดการก่อนโดยไม่เข้ามาที่นี่
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = 'https://www.dji13store.com';

  // ลอง fetch เป็น page ก่อน
  const page = await getPage(slug);
  if (page) {
    const title = page.title?.rendered?.replace(/<[^>]*>/g, '') || slug;
    const desc =
      page.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim().slice(0, 160) ||
      `${title} — DJI13Store`;
    const image = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        url: `${baseUrl}/${slug}`,
        ...(image ? { images: [{ url: image }] } : {}),
      },
      alternates: { canonical: `${baseUrl}/${slug}` },
    };
  }

  // ถ้าไม่ใช่ page ก็ไม่ต้องสร้าง metadata (จะ redirect หรือ 404)
  return { title: 'DJI13Store' };
}

export default async function WPCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const baseUrl = 'https://www.dji13store.com';

  // 1) ลอง fetch เป็น WordPress page
  const page = await getPage(slug);
  if (page) {
    const title = page.title?.rendered || slug;
    const content = normalizeContent(page.content?.rendered || '');
    const featuredImage = page._embedded?.['wp:featuredmedia']?.[0];

    return (
      <div className="min-h-screen bg-white">
        <BreadcrumbJsonLd
          items={[
            { name: 'หน้าแรก', url: baseUrl },
            { name: title.replace(/<[^>]*>/g, ''), url: `${baseUrl}/${slug}` },
          ]}
        />

        {/* Header */}
        <div className="border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <nav className="flex items-center gap-1 text-xs text-gray-400 mb-4">
              <Link href="/" className="hover:text-gray-600 transition-colors">
                หน้าแรก
              </Link>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </nav>
            <h1
              className="text-2xl md:text-3xl font-black text-gray-900"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>

        {/* Featured Image */}
        {featuredImage?.source_url && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={featuredImage.source_url}
                alt={featuredImage.alt_text || title.replace(/<[^>]*>/g, '')}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div
            className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-red-600 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    );
  }

  // 2) ลอง fetch เป็น WordPress post — 301 redirect ไป /news/slug
  const post = await getPost(slug);
  if (post) {
    redirect(`/news/${slug}`);
  }

  // 3) ไม่พบทั้ง page และ post → 404
  notFound();
}
