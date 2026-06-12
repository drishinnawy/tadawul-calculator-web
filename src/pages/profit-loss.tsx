import Head from "next/head";

export default function ProfitLossSEOPage() {
  return (
    <>
      <Head>
        <title>حاسبة الربح والخسارة | حساب نتائج الصفقة بدقة</title>
        <meta
          name="description"
          content="شرح مفهوم الربح والخسارة وكيفية حساب نتيجة الصفقة بناءً على سعر الدخول وسعر الخروج وعدد الأسهم. صفحة مخصصة لرفع الظهور في محركات البحث."
        />
        <meta
          name="keywords"
          content="الربح والخسارة, حاسبة الربح والخسارة, تداول الأسهم, حساب الربح, profit loss calculator"
        />
      </Head>

      <div style={{ padding: "25px", direction: "rtl", textAlign: "right" }}>
        <h1
          style={{
            fontSize: "26px",
            marginBottom: "18px",
            color: "#1e3c72",
            textAlign: "center",
          }}
        >
          حساب الربح والخسارة في التداول
        </h1>

        <p
          style={{
            background: "#eaf3ff",
            padding: "18px 22px",
            borderRadius: "12px",
            lineHeight: "1.8",
            marginBottom: "25px",
            border: "1px solid #c7d9f5",
          }}
        >
          الربح والخسارة هو الفرق بين سعر الدخول وسعر الخروج مضروبًا في عدد
          الأسهم. يساعد حساب الربح والخسارة على تقييم أداء الصفقة ومعرفة ما إذا
          كانت ناجحة أم لا، وهو من أهم أساسيات التداول.
        </p>

        <p style={{ lineHeight: "1.9", marginBottom: "20px" }}>
          يعتمد حساب الربح والخسارة على عدة عوامل مثل: سعر الدخول، سعر الخروج،
          حجم الصفقة، والعمولات. فهم هذه العناصر يساعد المتداول على اتخاذ قرارات
          أفضل وتحسين استراتيجياته في السوق.
        </p>

        {/* زر العودة */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <a
            href="/"
            style={{
              color: "#1e3c72",
              textDecoration: "underline",
              fontSize: "16px",
            }}
          >
            العودة إلى الصفحة الرئيسية
          </a>
        </div>
      </div>
    </>
  );
}
