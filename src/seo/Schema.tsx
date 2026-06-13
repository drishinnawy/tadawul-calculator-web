export default function Schema() {
  const jsonLd = [
    /* ---------------------- Organization Schema ---------------------- */
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Tadawul Calculator",
      url: "https://tadawul-calculator-web.vercel.app/",
      logo: "https://tadawul-calculator-web.vercel.app/icon.png",
      sameAs: ["https://tadawul-calculator-web.vercel.app/"],
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
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
