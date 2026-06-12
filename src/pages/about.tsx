import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>عن الموقع | أفضل حاسبة تداول للمتصفح</title>
        <meta
          name="description"
          content="تعرف على هدف موقع أفضل حاسبة تداول، وكيف يساعد المتداولين في إدارة رأس المال وحساب المخاطر والربح والخسارة بسهولة ودقة."
        />
        <meta
          name="keywords"
          content="عن الموقع, حاسبة تداول, إدارة رأس المال, وقف الخسارة, حجم الصفقة, نسبة المخاطرة"
        />
      </Head>

      <div style={{ padding: "25px", direction: "rtl", textAlign: "right" }}>
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "18px",
            color: "#1e3c72",
            textAlign: "center",
          }}
        >
          عن موقع أفضل حاسبة تداول
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
          تم إنشاء هذا الموقع بهدف توفير أدوات تداول بسيطة ودقيقة تساعد
          المتداولين على اتخاذ قرارات أفضل في إدارة رأس المال. يعتمد الموقع على
          مجموعة من الحاسبات الأساسية مثل وقف الخسارة، حجم الصفقة، نسبة المخاطرة،
          متوسط السعر، وحساب الربح والخسارة.
        </p>

        <p style={{ lineHeight: "1.9", marginBottom: "20px" }}>
          تم تصميم الموقع ليكون سريعًا، خفيفًا، وسهل الاستخدام على جميع الأجهزة،
          مع التركيز على تقديم تجربة واضحة ومباشرة دون أي تعقيد. كما تم تحسين
          الصفحات لمحركات البحث لضمان وصول المستخدمين إلى الأدوات التي يحتاجونها
          بسهولة.
        </p>

        <p style={{ lineHeight: "1.9", marginBottom: "20px" }}>
          يهدف الموقع إلى مساعدة المتداولين في فهم إدارة المخاطر، وتحديد حجم
          الصفقة المناسب، وحساب النتائج بدقة، مما يساهم في تحسين الأداء وتقليل
          الأخطاء الشائعة في التداول.
        </p>

        {/* زر العودة */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
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
