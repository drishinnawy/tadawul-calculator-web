import Head from "next/head";

export default function PositionSizeSEOPage() {
  return (
    <>
      <Head>
        <title>حاسبة حجم الصفقة | تحديد حجم الصفقة المثالي في التداول</title>
        <meta
          name="description"
          content="شرح مفهوم حجم الصفقة وكيفية تحديد عدد الأسهم أو العقود المناسبة بناءً على نسبة المخاطرة ورأس المال. صفحة مخصصة لرفع الظهور في محركات البحث."
        />
        <meta
          name="keywords"
          content="حجم الصفقة, حاسبة حجم الصفقة, إدارة رأس المال, التداول, position size calculator"
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
          حجم الصفقة في التداول
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
          حجم الصفقة هو عدد الأسهم أو العقود التي تدخل بها في كل صفقة. تحديد حجم
          الصفقة بشكل صحيح يساعد على التحكم في المخاطرة والحفاظ على رأس المال،
          وهو من أهم مبادئ إدارة رأس المال في التداول.
        </p>

        <p style={{ lineHeight: "1.9", marginBottom: "20px" }}>
          يعتمد تحديد حجم الصفقة على نسبة المخاطرة التي يحددها المتداول، وسعر
          الدخول، ووقف الخسارة. الالتزام بحجم صفقة مناسب يقلل من احتمالية التعرض
          لخسائر كبيرة ويحافظ على استمرارية الحساب على المدى الطويل.
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
