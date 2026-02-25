import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPost, normalizeContent } from "@/lib/wordpress";
import { BreadcrumbJsonLd } from "@/components/ui/JsonLd";
import { ChevronRight, Calendar } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "ไม่พบบทความ" };
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return {
    title: post.title.rendered.replace(/<[^>]*>/g, ""),
    description: post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      title: post.title.rendered.replace(/<[^>]*>/g, ""),
      images: img ? [{ url: img }] : [],
    },
    alternates: {
      canonical: `https://www.dji13store.com/news/${slug}`,
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const title = post.title.rendered.replace(/<[^>]*>/g, "");
  const content = normalizeContent(post.content.rendered);
  const baseUrl = "https://www.dji13store.com";

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbJsonLd
        items={[
          { name: "หน้าแรก", url: baseUrl },
          { name: "ข่าวสาร", url: `${baseUrl}/news` },
          { name: title, url: `${baseUrl}/news/${slug}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">หน้าแรก</Link>
          <ChevronRight size={14} />
          <Link href="/news" className="hover:text-primary">ข่าวสาร</Link>
          <ChevronRight size={14} />
          <span className="text-foreground truncate max-w-xs">{title}</span>
        </nav>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {img && (
            <div className="relative aspect-video overflow-hidden rounded-2xl mb-8 bg-muted">
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        <div className="mt-12 pt-6 border-t border-border">
          <Link href="/news" className="text-primary font-semibold hover:underline">
            ← กลับไปหน้าข่าวสาร
          </Link>
        </div>
      </div>
    </div>
  );
}
