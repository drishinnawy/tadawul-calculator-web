export default function Schema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "أفضل حاسبة تداول لحساب الربح والخسارة",
    description:
      "حاسبة تداول احترافية لحساب الربح والخسارة، نسبة المخاطرة، وحجم الصفقة بدقة. أداة سريعة للمتداولين في الأسهم والعملات.",
    url: "https://tadawul-calculator-web.vercel.app/",
    image: "https://tadawul-calculator-web.vercel.app/icon.png",

    provider: {
      "@type": "Organization",
      name: "Tadawul Calculator",
      url: "https://tadawul-calculator-web.vercel.app/",
      logo: "https://tadawul-calculator-web.vercel.app/icon.png",
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "128",
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://tadawul-calculator-web.vercel.app/",
    },

    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://tadawul-calculator-web.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "حاسبات متقدمة",
          item: "https://tadawul-calculator-web.vercel.app/advanced-calculators",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
