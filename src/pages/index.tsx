import type { NextPage } from "next";
import Head from "next/head";
import TadawulCalculator from "../components/TadawulCalculator";
import VisitCounter from "../components/VisitCounter";

import MetaTags from "../seo/MetaTags";
import OpenGraph from "../seo/OpenGraph";
import TwitterCards from "../seo/TwitterCards";
import Schema from "../seo/Schema";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>أفضل حاسبة تداول لحساب الربح والخسارة — دقيقة وسهلة الاستخدام</title>
        <meta
          name="description"
          content="حاسبة تداول احترافية لحساب الربح والخسارة، نسبة المخاطرة، وحجم الصفقة بدقة. أداة مجانية وسريعة للمتداولين في الأسهم والعملات."
        />

        <MetaTags />
        <OpenGraph />
        <TwitterCards />
        <Schema />
      </Head>

      {/* فقرة الكلمات المفتاحية */}
      <div
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          padding: "22px 28px",
          color: "white",
          direction: "rtl",
          textAlign: "right",
          lineHeight: "1.9",
          fontSize: "17px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: "22px",
            marginTop: "2px",
            opacity: 0.95,
          }}
        >
          ℹ️
        </span>

        <span style={{ flex: 1 }}>
          هذه الحاسبة تساعدك على حساب الربح والخسارة، وتحديد نسبة المخاطرة، وحجم
          الصفقة، وإدارة رأس المال بدقة. تعتبر أفضل حاسبة تداول للأسهم والعملات،
          وتوفر أدوات مهمة مثل حساب وقف الخسارة والهدف الربحي، مما يجعلها مناسبة
          للمتداولين المبتدئين والمحترفين.
        </span>
      </div>

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
        {/* Logo */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#0044aa",
            whiteSpace: "nowrap",
          }}
        >
          أفضل حاسبة تداول
        </div>

        {/* Center Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
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
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "20px" }}>📊</span>
            <span>
              عدد الزيارات: <VisitCounter />
            </span>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "20px", fontSize: "16px" }}>
          <a href="/" style={{ color: "#0044aa", textDecoration: "none" }}>
            الرئيسية
          </a>

          <a href="/about" style={{ color: "#0044aa", textDecoration: "none" }}>
            حول الموقع
          </a>

          <a
            href="/contact"
            style={{ color: "#0044aa", textDecoration: "none" }}
          >
            اتصل بنا
          </a>

          {/* روابط الحاسبات المتقدمة */}
          <a
            href="/advanced-calculators"
            style={{ color: "#0044aa", textDecoration: "none" }}
          >
            وقف الخسارة
          </a>

          <a
            href="/advanced-calculators"
            style={{ color: "#0044aa", textDecoration: "none" }}
          >
            حجم الصفقة
          </a>

          <a
            href="/advanced-calculators"
            style={{ color: "#0044aa", textDecoration: "none" }}
          >
            نسبة المخاطرة
          </a>

          <a
            href="/advanced-calculators"
            style={{ color: "#0044aa", textDecoration: "none" }}
          >
            الربح والخسارة
          </a>

          <a
            href="/advanced-calculators"
            style={{ color: "#0044aa", textDecoration: "none" }}
          >
            متوسط السعر
          </a>
        </div>
      </nav>

      {/* الشريط المتحرك */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#0044aa",
          color: "white",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "6px 0",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            paddingLeft: "100%",
            animation: "marquee 25s linear infinite",
          }}
        >
          تحديثات سوق الأسهم السعودي • راقب صفقاتك • احسب متوسطاتك • خطط
          لاستراتيجيتك بثقة • أفضل حاسبة تداول تساعدك على اتخاذ قرار مدروس •
          هذه الأداة ليست توصية استثمارية وإنما أداة مساعدة فقط.
        </div>

        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </div>

      {/* المحتوى الرئيسي */}
      <main
        style={{
          textAlign: "center",
          marginTop: "10px",
          padding: "10px 0 40px 0",
          background: "linear-gradient(to bottom, #f5f8ff, #eef3ff)",
        }}
      >
        <div style={{ marginTop: "10px" }}>
          <TadawulCalculator />
        </div>
      </main>
    </>
  );
};

export default Home;
