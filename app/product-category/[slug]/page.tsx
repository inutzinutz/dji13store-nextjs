import { redirect } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/wordpress';

type Props = { params: Promise<{ slug: string }> };

/**
 * WordPress เดิมใช้ /product-category/[slug]
 * Next.js ใช้ /products?category=[id]
 * Route นี้ดึง category ID จาก slug แล้ว 301 redirect
 */
export default async function ProductCategoryRedirect({ params }: Props) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (cat?.id) {
    redirect(`/products?category=${cat.id}`);
  }
  // fallback: redirect ไปหน้าสินค้าทั้งหมด
  redirect('/products');
}
