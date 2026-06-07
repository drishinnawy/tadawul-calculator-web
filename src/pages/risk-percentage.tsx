import Head from "next/head";
import TadawulCalculator from "@/components/TadawulCalculator";

export default function RiskPercentageCalculator() {
  return (
    <>
      <Head>
        <title>حاسبة نسبة المخاطرة — إدارة رأس المال باحتراف</title>
        <meta
          name="description"
          content="حاسبة نسبة المخاطرة تساعدك على تحديد نسبة المخاطرة المناسبة لكل صفقة بناءً على رأس المال ووقف الخسارة. أداة دقيقة للمتداولين في الأسهم والعملات."
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
          🎯
        </span>

        <span style={{ flex: 1 }}>
          تساعدك هذه الحاسبة على تحديد نسبة المخاطرة المناسبة لكل صفقة، مما
          يساعدك على حماية رأس المال وتقليل الخسائر. تحديد نسبة المخاطرة هو أحد
          أهم مبادئ إدارة رأس المال الاحترافية في التداول.
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
          حاسبة نسبة المخاطرة
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
          تساعدك هذه الأداة على تحديد نسبة المخاطرة المناسبة بناءً على رأس المال
          المتاح وسعر الدخول ووقف الخسارة. اختيار نسبة مخاطرة ثابتة هو أساس
          التداول الاحترافي وإدارة رأس المال السليمة.
        </p>

        {/* استدعاء الحاسبة كما هي بدون أي تعديل */}
        <TadawulCalculator />
      </div>
    </>
  );
}

