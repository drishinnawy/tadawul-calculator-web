import Head from "next/head";
import TadawulCalculator from "@/components/TadawulCalculator";

export default function StopLossCalculator() {
  return (
    <>
      <Head>
        <title>حاسبة وقف الخسارة — تحديد وقف الخسارة بدقة</title>
        <meta
          name="description"
          content="حاسبة وقف الخسارة تساعدك على تحديد نقطة الخروج المثالية وتقليل الخسائر. أداة دقيقة وسهلة الاستخدام للمتداولين في الأسهم والعملات."
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
        <span
          style={{
            fontSize: "22px",
            marginTop: "2px",
            opacity: 0.95,
          }}
        >
          ⚠️
        </span>

        <span style={{ flex: 1 }}>
          تساعدك هذه الحاسبة على تحديد وقف الخسارة المناسب لكل صفقة، مما يقلل
          المخاطر ويحسن إدارة رأس المال. أدخل بيانات الصفقة لتحصل على وقف خسارة
          دقيق يساعدك على حماية محفظتك.
        </span>
      </div>

      {/* محتوى الصفحة */}
      <div style={{ padding: "25px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "26px",
            color: "#1e3c72",
          }}
        >
          حاسبة وقف الخسارة
        </h1>

        <p
          style={{
            background: "#eaf3ff",
            padding: "18px 22px",
            borderRadius: "12px",
            lineHeight: "1.8",
            marginBottom: "25px",
            border: "1px solid #c7d9f5",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          وقف الخسارة هو أهم أداة لحماية رأس المال. تساعدك هذه الحاسبة على تحديد
          نقطة الخروج المثالية بناءً على سعر الدخول، ونسبة المخاطرة، وحجم الصفقة.
        </p>

        {/* استدعاء الحاسبة كما هي بدون أي تعديل */}
        <TadawulCalculator />
      </div>
    </>
  );
}

