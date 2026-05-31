import Head from "next/head";
import VisitCounter from "../components/VisitCounter";
import TadawulCalculator from "../components/TadawulCalculator";

export default function HomePage() {
  return (
    <>
      <Head>
        {/* عنوان التبويب */}
        <title>أفضل حاسبة تداول</title>

        {/* وصف SEO المحسن */}
        <meta
          name="description"
          content="حاسبة تداول سعودية دقيقة لحساب الأرباح والخسائر، العمولات، نقاط الدخول والخروج، وحجم الصفقة. أداة مجانية وسهلة الاستخدام للمتداولين في سوق الأسهم السعودي."
        />

        {/* الكلمات المفتاحية */}
        <meta
          name="keywords"
          content="حاسبة تداول, حاسبة الأسهم, تداول السعودية, حساب الأرباح, حساب الخسائر, الأسهم السعودية, الاستثمار, سوق الأسهم, حاسبة المضاربة, حاسبة الأسهم السعودية"
        />

        {/* أيقونة التبويب */}
        <link rel="icon" href="/favicon-new.ico" sizes="any" />

        {/* صورة المشاركة الاجتماعية */}
        <meta property="og:title" content="أفضل حاسبة تداول" />
        <meta
          property="og:description"
          content="حاسبة تداول سعودية دقيقة لحساب الأرباح والخسائر بسهولة ووضوح."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tadawul-calculator-web-ufov.vercel.app" />
        <meta property="og:image" content="/preview.png" />

        {/* وسوم Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="أفضل حاسبة تداول" />
        <meta
          name="twitter:description"
          content="حاسبة تداول عربية لحساب الأرباح والخسائر بسهولة ووضوح."
        />
        <meta name="twitter:image" content="/preview.png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "أفضل حاسبة تداول",
              "url": "https://tadawul-calculator-web-ufov.vercel.app",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "All",
              "inLanguage": "ar",
              "description":
                "حاسبة تداول سعودية لحساب الأرباح والخسائر والعمولات وحجم الصفقة بسهولة وبدقة.",
              "creator": {
                "@type": "Person",
                "name": "Ibrahim Alnabegha"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Tadawul Calculator"
              },
              "mainEntity": {
                "@type": "WebPage",
                "@id": "https://tadawul-calculator-web-ufov.vercel.app"
              },
              "hasPart": [
                {
                  "@type": "WebPage",
                  "url": "https://tadawul-calculator-web-ufov.vercel.app/terms",
                  "name": "Terms of Service"
                },
                {
                  "@type": "WebPage",
                  "url": "https://tadawul-calculator-web-ufov.vercel.app/privacy",
                  "name": "Privacy Policy"
                },
                {
                  "@type": "WebPage",
                  "url": "https://tadawul-calculator-web-ufov.vercel.app/refund",
                  "name": "Refund Policy"
                },
                {
                  "@type": "WebPage",
                  "url": "https://tadawul-calculator-web-ufov.vercel.app/contact",
                  "name": "Contact Page"
                },
                {
                  "@type": "WebPage",
                  "url": "https://tadawul-calculator-web-ufov.vercel.app/about",
                  "name": "About Page"
                }
              ]
            }),
          }}
        />
</Head>

{/* Navbar */}
<nav
  style={{
    width: "100%",
    backgroundColor: "#e6f0ff",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #cdd7f3",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  }}
>
  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0044aa" }}>
    تداول كالكوليتر
  </div>

  <div style={{ display: "flex", gap: "20px", fontSize: "16px" }}>
    <a href="/" style={{ color: "#0044aa", textDecoration: "none" }}>
      الرئيسية
    </a>
    <a href="/about" style={{ color: "#0044aa", textDecoration: "none" }}>
      حول الموقع
    </a>
    <a href="/contact" style={{ color: "#0044aa", textDecoration: "none" }}>
      اتصل بنا
    </a>

    </div>
</nav>

{/* الشريط المتحرك */}

      <div
        style={{
          width: "100%",
          backgroundColor: "#e6f2ff",
          padding: "10px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#0055aa",
        }}
      >
        <div
          style={{
            display: "inline-block",
            paddingLeft: "100%",
            animation: "marquee 25s linear infinite",
          }}
        >
          🚀 إصدار تطبيق الأندرويد قريبًا — 💻 إصدار التطبيق المكتبي قيد التطوير — 📈 تابع آخر تحديثات سوق الأسهم السعودي
        </div>

        <style>
          {`
            @keyframes marquee {
              0% { transform: translate(0, 0); }
              100% { transform: translate(-100%, 0); }
            }
          `}
        </style>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {/* العداد */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #0070f3",
            borderRadius: "10px",
            padding: "15px 30px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#0070f3",
          }}
        >
          📊 عدد الزيارات: <VisitCounter />
        </div>

        {/* عنوان الصفحة */}
        <h1 style={{ marginTop: "30px", fontSize: "28px" }}>تداول كالكوليتر</h1>

        {/* الحاسبة */}
        <div style={{ marginTop: "40px" }}>
          <TadawulCalculator />
        </div>

        {/* الفوتر */}
        <footer
          style={{
            marginTop: "60px",
            padding: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
            borderTop: "1px solid #ddd",
          }}
        >
          <a href="/terms" style={{ margin: "0 10px", color: "#666" }}>
            Terms of Service
          </a>
          |
          <a href="/privacy" style={{ margin: "0 10px", color: "#666" }}>
            Privacy Policy
          </a>
          |
          <a href="/refund" style={{ margin: "0 10px", color: "#666" }}>
            Refund Policy
          </a>
          |
          <a href="/contact" style={{ margin: "0 10px", color: "#666" }}>
            اتصل بنا
          </a>
          |
          <a href="/about" style={{ margin: "0 10px", color: "#666" }}>
            حول الموقع
          </a>
        </footer>
      </div>
    </>
  );
}
