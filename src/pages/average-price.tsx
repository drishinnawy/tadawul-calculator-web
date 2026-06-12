import Head from "next/head";

export default function AveragePriceSEOPage() {
  return (
    <>
      <Head>
        <title>حاسبة متوسط السعر | حساب متوسط تكلفة الأسهم</title>
        <meta
          name="description"
          content="شرح مفهوم متوسط السعر وكيفية حساب متوسط تكلفة السهم بعد عمليات شراء متعددة. صفحة مخصصة لرفع الظهور في محركات البحث."
        />
        <meta
          name="keywords"
          content="متوسط السعر, حاسبة متوسط السعر, متوسط التكلفة, تداول الأسهم, average price calculator"
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
          حساب متوسط السعر في التداول
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
          متوسط السعر هو القيمة التي تمثل متوسط تكلفة السهم بعد عمليات شراء
          متعددة بأسعار مختلفة. يساعد حساب متوسط السعر على معرفة نقطة التعادل
          الحقيقية وتقييم وضع الصفقة بدقة.
        </p>

        <p style={{ lineHeight: "1.9", marginBottom: "20px" }}>
          يعتمد حساب متوسط السعر على إجمالي تكلفة الشراء مقسومًا على إجمالي عدد
          الأسهم. فهم متوسط السعر يساعد المتداول على اتخاذ قرارات أفضل بشأن البيع
          أو الشراء، خاصة عند وجود عمليات شراء متكررة أو تعديل مراكز.
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
