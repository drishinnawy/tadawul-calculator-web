export default function Schema() {
  const jsonLd = [
    /* ---------------------- FinancialProduct Schema ---------------------- */
    {
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
    },

    /* ---------------------- Organization Schema ---------------------- */
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Tadawul Calculator",
      url: "https://tadawul-calculator-web.vercel.app/",
      logo: "https://tadawul-calculator-web.vercel.app/icon.png",
      sameAs: [
        "https://tadawul-calculator-web.vercel.app/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["Arabic", "English"],
        url: "https://tadawul-calculator-web.vercel.app/contact",
      },
    },

    /* ---------------------- WebSite Schema ---------------------- */
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "أفضل حاسبة تداول",
      url: "https://tadawul-calculator-web.vercel.app/",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://tadawul-calculator-web.vercel.app/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },

    /* ---------------------- FAQ Schema ---------------------- */
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ما هي حاسبة التداول؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "هي أداة تساعد المتداولين على حساب الربح والخسارة، وحجم الصفقة، ونسبة المخاطرة بدقة وسرعة.",
          },
        },
        {
          "@type": "Question",
          name: "هل تعمل الحاسبة على جميع الأجهزة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، تعمل على الجوال والكمبيوتر والمتصفح دون الحاجة إلى تثبيت أي برنامج.",
          },
        },
        {
          "@type": "Question",
          name: "هل يمكن حساب وقف الخسارة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، توفر الحاسبة أداة مخصصة لحساب مستوى وقف الخسارة بناءً على نسبة المخاطرة.",
          },
        },
        {
          "@type": "Question",
          name: "هل يمكن حساب متوسط السعر؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، يمكنك حساب متوسط السعر بعد عمليات الشراء المتعددة بسهولة.",
          },
        },
        {
          "@type": "Question",
          name: "هل سيتم إضافة أدوات جديدة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، يتم تطوير أدوات جديدة بشكل مستمر لتلبية احتياجات المتداولين.",
          },
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
