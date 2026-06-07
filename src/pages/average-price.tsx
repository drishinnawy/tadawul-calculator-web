import Head from "next/head";
import TadawulCalculator from "@/components/TadawulCalculator";

export default function AveragePriceCalculator() {
  return (
    <>
      <Head>
        <title>حاسبة متوسط السعر — حساب متوسط تكلفة الأسهم</title>
        <meta
          name="description"
          content="حاسبة متوسط السعر تساعدك على حساب متوسط تكلفة الأسهم بعد عمليات الشراء المتعددة. أداة دقيقة وسهلة الاستخدام للمتداولين في الأسهم."
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
          📊
        </span>

        <span style={{ flex: 1 }}>
          تساعدك هذه الحاسبة على حساب متوسط السعر الحقيقي لأسهمك بعد عمليات شراء
          متعددة. معرفة متوسط السعر بدقة يساعدك على اتخاذ قرارات بيع وشراء أفضل
          وتقييم وضع محفظتك بشكل صحيح.
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
          حاسبة متوسط السعر
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
          تساعدك هذه الأداة على حساب متوسط تكلفة السهم بعد عمليات شراء متعددة،
          سواء كانت بكميات مختلفة أو أسعار مختلفة. هذه الطريقة ضرورية لكل متداول
          يريد معرفة نقطة التعادل الحقيقية لأسهمه.
        </p>

        {/* استدعاء الحاسبة كما هي بدون أي تعديل */}
        <TadawulCalculator />
      </div>
    </>
  );
}

