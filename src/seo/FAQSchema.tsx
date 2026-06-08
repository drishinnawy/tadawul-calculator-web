export default function FAQSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "ما هي حاسبة تداول الأسهم؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "هي أداة تساعد المتداولين على حساب الربح والخسارة، ومتوسط السعر، وحجم الصفقة، ونسبة المخاطرة بدقة وسرعة."
        }
      },
      {
        "@type": "Question",
        "name": "هل تعمل الحاسبة على جميع الأجهزة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، تعمل الحاسبة على جميع الأجهزة مثل الجوال والكمبيوتر والمتصفح دون الحاجة إلى تثبيت أي برنامج."
        }
      },
      {
        "@type": "Question",
        "name": "هل يمكن استخدام الحاسبة لحساب متوسط السعر؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، توفر الحاسبة أداة مخصصة لحساب متوسط السعر بعد عمليات الشراء المتعددة."
        }
      },
      {
        "@type": "Question",
        "name": "هل يمكن استخدام الحاسبة لحساب وقف الخسارة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، تحتوي الحاسبة على أداة لحساب مستوى وقف الخسارة المناسب بناءً على نسبة المخاطرة."
        }
      },
      {
        "@type": "Question",
        "name": "هل سيتم إضافة أدوات جديدة لاحقًا؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، سيتم إضافة أدوات جديدة بشكل مستمر مثل حاسبة حجم الصفقة، وحاسبة المخاطرة، وأدوات تحليل إضافية."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
