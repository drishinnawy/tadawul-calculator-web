import Head from "next/head";

export default function RiskPercentageSEOPage() {
  return (
    <>
      <Head>
        <title>حاسبة نسبة المخاطرة | تحديد نسبة المخاطرة المثالية</title>
        <meta
          name="description"
          content="شرح مفهوم نسبة المخاطرة وكيفية تحديد النسبة المناسبة لكل صفقة لحماية رأس المال. صفحة مخصصة لرفع الظهور في محركات البحث."
        />
        <meta
          name="keywords"
          content="نسبة المخاطرة, حاسبة نسبة المخاطرة, إدارة رأس المال, التداول, risk percentage calculator"
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
          نسبة المخاطرة في التداول
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
          نسبة المخاطرة هي النسبة المئوية من رأس المال التي يوافق المتداول على
          المخاطرة بها في كل صفقة. اختيار نسبة مخاطرة ثابتة يساعد على حماية رأس
          المال وتقليل الخسائر الكبيرة.
        </p>

        <p style={{ lineHeight: "1.9", marginBottom: "20px" }}>
          ينصح معظم المتداولين المحترفين بعدم المخاطرة بأكثر من 1% إلى 3% من رأس
          المال في كل صفقة. الالتزام بهذه النسبة يساعد على الاستمرارية في السوق
          وتجنب التذبذب الكبير في الحساب.
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
