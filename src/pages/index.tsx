import Head from "next/head";
import VisitCounter from "../components/VisitCounter";
import TadawulCalculator from "../components/TadawulCalculator";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>أفضل حاسبة تداول</title>

        <meta
          name="description"
          content="حاسبة تداول سعودية دقيقة لحساب الأرباح والخسائر، العمولات، نقاط الدخول والخروج، وحجم الصفقة. أداة مجانية وسهلة الاستخدام للمتداولين في سوق الأسهم السعودي."
        />

        <meta
          name="keywords"
          content="حاسبة تداول, حاسبة الأسهم, تداول السعودية, حساب الأرباح, حساب الخسائر, الأسهم السعودية, الاستثمار, سوق الأسهم, حاسبة المضاربة, حاسبة الأسهم السعودية"
        />

        <link rel="icon" href="/favicon-new.ico" sizes="any" />

        <meta property="og:title" content="أفضل حاسبة تداول" />
        <meta
          property="og:description"
          content="حاسبة تداول سعودية دقيقة لحساب الأرباح والخسائر بسهولة ووضوح."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tadawul-calculator-web.vercel.app" />
        <meta property="og:image" content="/preview.png" />

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
              name: "أفضل حاسبة تداول",
              url: "https://tadawul-calculator-web.vercel.app",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              inLanguage: "ar",
              description:
                "حاسبة تداول سعودية لحساب الأرباح والخسائر والعمولات وحجم الصفقة بسهولة وبدقة.",
              creator: {
                "@type": "Person",
                name: "Ibrahim Alnabegha",
              },
              publisher: {
                "@type": "Organization",
                name: "Tadawul Calculator",
              },
            }),
          }}
        />
      </Head>

      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          backgroundColor: "#e6f0ff",
          padding: "12px 25px",
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
          أفضل حاسبة تداول
        </div>

        {/* Counter + Rotating Feature */}
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          {/* Counter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 18px",
              borderRadius: "14px",
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.35)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              fontSize: "17px",
              fontWeight: "bold",
              color: "#0044aa",
            }}
          >
            <span style={{ fontSize: "20px" }}>📊</span>
            <span>عدد الزيارات: <VisitCounter /></span>
          </div>

          {/* Rotating Feature */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 18px",
              borderRadius: "14px",
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.35)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              fontSize: "17px",
              fontWeight: "bold",
              minWidth: "200px",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "20px" }}>⚙️</span>
            <span id="rotating-feature"></span>
          </div>

          <style>
            {`
              @keyframes fadeInOut {
                0% { opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; }
              }
            `}
          </style>

          <script
            dangerouslySetInnerHTML={{
              __html: `
                const features = [
                  { text: "حاسبة الصفقة", color: "#0044aa" },
                  { text: "حاسبة البيع", color: "#006644" },
                  { text: "حاسبة المتوسط", color: "#6633cc" },
                  { text: "نظرة شاملة على المحفظة", color: "#cc6600" }
                ];

                let fIndex = 0;
                const featureBox = document.getElementById("rotating-feature");

                function updateFeature() {
                  featureBox.textContent = features[fIndex].text;
                  featureBox.style.color = features[fIndex].color;
                  featureBox.style.animation = "fadeInOut 3s linear";
                  fIndex = (fIndex + 1) % features.length;
                }

                updateFeature();
                setInterval(updateFeature, 3000);
              `,
            }}
          />
        </div>

        {/* Navbar Links */}
        <div style={{ display: "flex", gap: "20px", fontSize: "16px" }}>
          <a href="/" style={{ color: "#0044aa", textDecoration: "none" }}>الرئيسية</a>
          <a href="/about" style={{ color: "#0044aa", textDecoration: "none" }}>حول الموقع</a>
          <a href="/contact" style={{ color: "#0044aa", textDecoration: "none" }}>اتصل بنا</a>
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

      {/* الحاسبة */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "40px 0",
          background: "linear-gradient(to bottom, #f5f8ff, #eef3ff)",
          minHeight: "100vh",
        }}
      >
        <div style={{ marginTop: "40px" }}>
          <TadawulCalculator />
        </div>

        {/* Footer */}
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
          <a href="/terms" style={{ margin: "0 10px", color: "#666" }}>Terms of Service</a> |
          <a href="/privacy" style={{ margin: "0 10px", color: "#666" }}>Privacy Policy</a> |
          <a href="/refund" style={{ margin: "0 10px", color: "#666" }}>Refund Policy</a> |
          <a href="/contact" style={{ margin: "0 10px", color: "#666" }}>اتصل بنا</a> |
          <a href="/about" style={{ margin: "0 10px", color: "#666" }}>حول الموقع</a>
        </footer>
      </div>
    </>
  );
}
