import Head from "next/head";

export default function CalculatorsIndex() {
  return (
    <>
      <Head>
        <title>جميع الحاسبات — أفضل أدوات التداول</title>
        <meta
          name="description"
          content="جميع حاسبات التداول في مكان واحد: وقف الخسارة، حجم الصفقة، نسبة المخاطرة، الربح والخسارة، ومتوسط السعر. أدوات احترافية للمتداولين."
        />
      </Head>

      {/* خلفية كاملة منسجمة مع الحاسبة */}
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
        <span style={{ fontSize: "22px", marginTop: "2px", opacity: 0.95 }}>
          🧮
        </span>

        <span style={{ flex: 1 }}>
          هنا تجد جميع الحاسبات المتوفرة في الموقع، مصممة خصيصًا لمساعدتك في
          إدارة رأس المال واتخاذ قرارات تداول أفضل. اختر الحاسبة المناسبة لاحتياجك.
        </span>
      </div>

      {/* قائمة الحاسبات */}
      <div
        style={{
          padding: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px",
          direction: "rtl",
        }}
      >
        {/* بطاقة */}
        <a
          href="/stop-loss"
          style={{
            background: "#eaf3ff",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #c7d9f5",
            textDecoration: "none",
            color: "#003c8f",
            fontSize: "18px",
            fontWeight: "bold",
            lineHeight: "1.7",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: "22px" }}>⚠️</span> حاسبة وقف الخسارة
          <p style={{ fontSize: "14px", marginTop: "8px", color: "#555" }}>
            تحديد نقطة الخروج المثالية وتقليل الخسائر.
          </p>
        </a>

        <a
          href="/position-size"
          style={{
            background: "#eaf3ff",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #c7d9f5",
            textDecoration: "none",
            color: "#003c8f",
            fontSize: "18px",
            fontWeight: "bold",
            lineHeight: "1.7",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: "22px" }}>📏</span> حاسبة حجم الصفقة
          <p style={{ fontSize: "14px", marginTop: "8px", color: "#555" }}>
            تحديد عدد الأسهم المناسب لكل صفقة.
          </p>
        </a>

        <a
          href="/risk-percentage"
          style={{
            background: "#eaf3ff",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #c7d9f5",
            textDecoration: "none",
            color: "#003c8f",
            fontSize: "18px",
            fontWeight: "bold",
            lineHeight: "1.7",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: "22px" }}>🎯</span> حاسبة نسبة المخاطرة
          <p style={{ fontSize: "14px", marginTop: "8px", color: "#555" }}>
            تحديد نسبة المخاطرة المناسبة لرأس المال.
          </p>
        </a>

        <a
          href="/profit-loss"
          style={{
            background: "#eaf3ff",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #c7d9f5",
            textDecoration: "none",
            color: "#003c8f",
            fontSize: "18px",
            fontWeight: "bold",
            lineHeight: "1.7",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: "22px" }}>💰</span> حاسبة الربح والخسارة
          <p style={{ fontSize: "14px", marginTop: "8px", color: "#555" }}>
            حساب صافي الربح أو الخسارة لكل صفقة.
          </p>
        </a>

        <a
          href="/average-price"
          style={{
            background: "#eaf3ff",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #c7d9f5",
            textDecoration: "none",
            color: "#003c8f",
            fontSize: "18px",
            fontWeight: "bold",
            lineHeight: "1.7",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: "22px" }}>📊</span> حاسبة متوسط السعر
          <p style={{ fontSize: "14px", marginTop: "8px", color: "#555" }}>
            حساب متوسط تكلفة السهم بعد عمليات شراء متعددة.
          </p>
        </a>
      </div>
    </>
  );
}
