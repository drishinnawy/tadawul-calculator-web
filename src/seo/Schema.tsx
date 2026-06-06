export default function Schema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "حاسبة تداول الأسهم",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://tadawul-calculator-web.vercel.app/",
    description:
      "حاسبة تداول الأسهم السعودية لحساب الربح والخسارة ومتوسط السعر بدقة.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
