export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'DJI13Store',
    url: 'https://www.dji13store.com',
    logo: 'https://www.dji13store.com/logo.png',
    description: 'ตัวแทนจำหน่าย DJI อย่างเป็นทางการ โดรน กล้อง Gimbal ครบครัน',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TH',
      addressLocality: 'กรุงเทพมหานคร',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Thai',
    },
    sameAs: ['https://www.facebook.com/dji13store'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: any }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description?.replace(/<[^>]*>/g, '') || product.name,
    image: product.images?.map((img: any) => img.src) || [],
    url: `https://www.dji13store.com/products/${product.slug}`,
    brand: { '@type': 'Brand', name: 'DJI' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'THB',
      price: product.price || '0',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'DJI13Store' },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
