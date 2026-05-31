import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>حول الموقع</title>
        <meta
          name="description"
          content="تعرف على الهدف من إنشاء حاسبة التداول، وكيف تساعد المتداولين في السعودية على حساب الأرباح والخسائر بسهولة ودقة."
        />
      </Head>

      <div style={{ maxWidth: "700px", margin: "40px auto", lineHeight: "1.8" }}>
        <h1 style={{ textAlign: "center" }}>حول الموقع</h1>

        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          تم إنشاء <strong>تداول كالكوليتر</strong> بهدف توفير أداة بسيطة ودقيقة تساعد المتداولين
          في سوق الأسهم السعودي على حساب الأرباح والخسائر والعمولات بسهولة ووضوح.
        </p>

        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          يعتمد الموقع على واجهة سهلة الاستخدام، ويقدم نتائج فورية دون الحاجة إلى تسجيل أو تحميل
          أي تطبيقات. كما تم تصميمه ليكون مناسبًا للمبتدئين والمحترفين على حد سواء.
        </p>

        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          يتوفر أيضًا إصدار <strong>تطبيق أندرويد</strong> و<strong>تطبيق مكتبي</strong> سيتم الإعلان عنهما قريبًا.
        </p>

        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          إذا كان لديك أي اقتراحات أو ملاحظات، يسعدنا تواصلك عبر صفحة{" "}
          <a href="/contact" style={{ color: "#0070f3" }}>
            اتصل بنا
          </a>.
        </p>
      </div>
    </>
  );
}
