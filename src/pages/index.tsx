import Head from "next/head";
import VisitCounter from "../components/VisitCounter";
import TadawulCalculator from "../components/TadawulCalculator";

export default function HomePage() {
  return (
    <>
      <Head>
        {/* عنوان التبويب */}
        <title>أفضل حاسبة تداول</title>

        {/* وصف SEO */}
        <meta
          name="description"
          content="اكتشف أداة تداول مبتكرة تساعدك على حساب أرباحك وخسائرك بدقة، مصممة خصيصًا للمتداولين في السعودية."
        />

        {/* أيقونة التبويب */}
        <link rel="icon" href="/favicon-new.ico" sizes="any" />

        {/* صورة المشاركة الاجتماعية */}
        <meta property="og:title" content="أفضل حاسبة تداول" />
        <meta
          property="og:description"
          content="اكتشف أداة تداول مبتكرة تساعدك على حساب أرباحك وخسائرك بدقة."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tadawul-calculator-web.vercel.app" />
        <meta property="og:image" content="/preview.png" />

        {/* وسوم Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="أفضل حاسبة تداول" />
        <meta
          name="twitter:description"
          content="حاسبة تداول عربية لحساب الأرباح والخسائر بسهولة ووضوح."
        />
        <meta name="twitter:image" content="/preview.png" />
      </Head>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {/* العداد في الأعلى بالمنتصف مع تنسيق وأيقونة */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff", // خلفية فاتحة
            border: "2px solid #0070f3", // إطار أزرق
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

        {/* الحاسبة تحت العنوان */}
        <div style={{ marginTop: "40px" }}>
          <TadawulCalculator />
        </div>
      </div>
    </>
  );
}
