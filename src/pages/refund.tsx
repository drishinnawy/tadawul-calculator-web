import Head from "next/head";

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>سياسة الاسترجاع | أفضل حاسبة تداول</title>
        <meta
          name="description"
          content="سياسة الاسترجاع الخاصة بموقع أفضل حاسبة تداول. توضح هذه الصفحة شروط استرجاع المبالغ في حال وجود مشكلة تقنية."
        />
        <meta
          name="keywords"
          content="سياسة الاسترجاع, refund policy, تداول, إدارة رأس المال"
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
          السلام عليكم ورحمة الله وبركاته
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
          نرحب بك في صفحة سياسة الاسترجاع الخاصة بموقع أفضل حاسبة تداول. تهدف
          هذه الصفحة إلى توضيح الحالات التي يمكن فيها طلب استرجاع المبلغ، وكيفية
          التعامل مع المشكلات التقنية إن وجدت.
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          1. المنتجات الرقمية
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          جميع الخدمات المقدمة في الموقع هي منتجات رقمية (Digital SaaS). وبمجرد
          منحك صلاحية الوصول إلى الأداة أو الخدمة، يعتبر المنتج مستلماً بالكامل،
          ولا يمكن استرجاع المبلغ إلا في حالات محددة.
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          2. الحالات التي يمكن فيها طلب استرجاع
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          يمكن طلب استرجاع المبلغ فقط في حال وجود مشكلة تقنية تمنعك من استخدام
          الخدمة بشكل كامل، مثل:
          <br />– عدم القدرة على تسجيل الدخول
          <br />– عدم ظهور الأداة بعد الدفع
          <br />– خطأ تقني يمنع استخدام الخدمة نهائيًا
          <br />
          في هذه الحالات، يمكنك التواصل معنا خلال **7 أيام** من تاريخ الدفع ليتم
          مراجعة حالتك.
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          3. الحالات التي لا يمكن فيها الاسترجاع
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          لا يمكن استرجاع المبلغ في الحالات التالية:
          <br />– إذا كانت الخدمة تعمل بشكل طبيعي
          <br />– إذا كان سبب الطلب هو عدم الرغبة في الاستمرار
          <br />– إذا تم استخدام الأداة بالفعل
          <br />– إذا انتهت فترة الـ 7 أيام من تاريخ الدفع
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          4. كيفية طلب الاسترجاع
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          يمكنك التواصل معنا عبر صفحة{" "}
          <a href="/contact" style={{ color: "#1e3c72", textDecoration: "underline" }}>
            اتصل بنا
          </a>{" "}
          وشرح المشكلة التقنية بالتفصيل. سيتم مراجعة الطلب والرد عليك خلال 24–48
          ساعة.
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
