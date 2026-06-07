import Head from "next/head";
import TadawulCalculator from "@/components/TadawulCalculator";

export default function ProfitLossCalculator() {
  return (
    <>
      <Head>
        <title>حاسبة الربح والخسارة — حساب نتائج الصفقة بدقة</title>
        <meta
          name="description"
          content="حاسبة الربح والخسارة تساعدك على معرفة صافي الربح أو الخسارة لكل صفقة بناءً على سعر الدخول وسعر الخروج وعدد الأسهم. أداة دقيقة وسهلة الاستخدام للمتداولين."
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
          💰
        </span>

        <span style={{ flex: 1 }}>
          تساعدك هذه الحاسبة على حساب الربح أو الخسارة بدقة لكل صفقة تداول، بناءً
          على سعر الدخول وسعر الخروج وعدد الأسهم. معرفة نتيجة الصفقة قبل تنفيذها
          يساعدك على اتخاذ قرارات تداول أفضل وأكثر وعيًا.
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
          حاسبة الربح والخسارة
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
          تساعدك هذه الأداة على معرفة صافي الربح أو الخسارة قبل تنفيذ الصفقة،
          وذلك من خلال إدخال سعر الدخول وسعر الخروج وعدد الأسهم. هذه الطريقة
          ضرورية لكل متداول يريد تقييم صفقاته بدقة.
        </p>

        {/* استدعاء الحاسبة كما هي بدون أي تعديل */}
        <TadawulCalculator />
      </div>
    </>
  );
}

