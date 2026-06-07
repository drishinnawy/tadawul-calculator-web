import Head from "next/head";
import TadawulCalculator from "@/components/TadawulCalculator";

export default function PositionSizeCalculator() {
  return (
    <>
      <Head>
        <title>حاسبة حجم الصفقة — تحديد حجم الصفقة المثالي</title>
        <meta
          name="description"
          content="حاسبة حجم الصفقة تساعدك على تحديد عدد الأسهم أو العقود المناسبة بناءً على نسبة المخاطرة ورأس المال. أداة دقيقة للمتداولين في الأسهم والعملات."
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
          📏
        </span>

        <span style={{ flex: 1 }}>
          تساعدك هذه الحاسبة على تحديد حجم الصفقة المثالي بناءً على نسبة المخاطرة
          ورأس المال المتاح. اختيار حجم الصفقة الصحيح يقلل المخاطر ويزيد من
          فعالية إدارة رأس المال في التداول.
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
          حاسبة حجم الصفقة
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
          تساعدك هذه الأداة على تحديد عدد الأسهم أو العقود المناسبة لكل صفقة،
          بناءً على نسبة المخاطرة التي تحددها وسعر الدخول ووقف الخسارة. هذه
          الطريقة تعتبر من أهم أساليب إدارة رأس المال الاحترافية.
        </p>

        {/* استدعاء الحاسبة كما هي بدون أي تعديل */}
        <TadawulCalculator />
      </div>
    </>
  );
}

