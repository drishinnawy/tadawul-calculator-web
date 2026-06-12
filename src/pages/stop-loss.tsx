import Head from "next/head";

export default function StopLossSEOPage() {
  return (
    <>
      <Head>
        <title>حاسبة وقف الخسارة | حساب نقطة وقف الخسارة بدقة</title>
        <meta
          name="description"
          content="شرح مفهوم وقف الخسارة وكيفية تحديد نقطة الخروج المثالية لحماية رأس المال. صفحة مخصصة لرفع الظهور في محركات البحث."
        />
        <meta
          name="keywords"
          content="وقف الخسارة, حاسبة وقف الخسارة, إدارة رأس المال, التداول, stop loss calculator"
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
          وقف الخسارة في التداول
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
          وقف الخسارة هو مستوى سعري يتم تحديده مسبقًا للخروج من الصفقة في حال
          تحرك السعر عكس التوقعات. يساعد وقف الخسارة على حماية رأس المال وتقليل
          الخسائر، وهو من أهم أدوات إدارة المخاطر في التداول.
        </p>

        <p style={{ lineHeight: "1.9", marginBottom: "20px" }}>
          يعتمد تحديد وقف الخسارة على عدة عوامل مثل: سعر الدخول، نسبة المخاطرة،
          حجم الصفقة، ونقاط الدعم والمقاومة. الالتزام بوقف الخسارة يعتبر من أهم
          أسباب نجاح المتداولين على المدى الطويل.
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
