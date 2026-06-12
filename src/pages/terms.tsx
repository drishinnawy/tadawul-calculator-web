import Head from "next/head";

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>شروط الخدمة | أفضل حاسبة تداول</title>
        <meta
          name="description"
          content="شروط استخدام موقع أفضل حاسبة تداول. يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع."
        />
        <meta
          name="keywords"
          content="شروط الخدمة, شروط الاستخدام, تداول, إدارة رأس المال"
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
          مرحبًا بك في موقع أفضل حاسبة تداول. باستخدامك لهذا الموقع، فإنك توافق
          على الالتزام بشروط الخدمة الموضحة في هذه الصفحة. يرجى قراءة الشروط
          بعناية قبل استخدام أي من الأدوات أو الخدمات المتاحة.
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          1. قبول الشروط
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          باستخدامك للموقع، فإنك تقر بأنك قرأت وفهمت ووافقت على شروط الخدمة هذه.
          إذا كنت لا توافق على أي جزء من الشروط، يرجى التوقف عن استخدام الموقع.
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          2. استخدام الموقع
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          الأدوات المتوفرة في الموقع تهدف إلى المساعدة في حسابات التداول وإدارة
          رأس المال. لا يقدم الموقع أي نصائح مالية أو استثمارية، ويجب على
          المستخدم الاعتماد على حكمه الشخصي قبل اتخاذ أي قرار تداول.
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          3. حدود المسؤولية
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          لا يتحمل الموقع أي مسؤولية عن أي خسائر مالية ناتجة عن استخدام الأدوات
          أو الاعتماد على النتائج. جميع الحسابات تقريبية ويجب التحقق منها قبل
          اتخاذ أي قرار.
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          4. التعديلات على الشروط
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          يحتفظ الموقع بالحق في تعديل شروط الخدمة في أي وقت. سيتم نشر أي تحديثات
          على هذه الصفحة، ويعتبر استمرارك في استخدام الموقع موافقة على التعديلات.
        </p>

        <h2 style={{ color: "#1e3c72", marginTop: "25px" }}>
          5. التواصل معنا
        </h2>
        <p style={{ lineHeight: "1.9" }}>
          إذا كان لديك أي استفسار حول شروط الخدمة، يمكنك التواصل معنا عبر صفحة{" "}
          <a href="/contact" style={{ color: "#1e3c72", textDecoration: "underline" }}>
            اتصل بنا
          </a>
          .
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
