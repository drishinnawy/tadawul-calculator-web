import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>اتصل بنا</title>
        <meta
          name="description"
          content="تواصل معنا لأي استفسار أو مشكلة تقنية في حاسبة التداول."
        />
      </Head>

      <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
        <h1>اتصل بنا</h1>
        <p style={{ marginTop: "20px", fontSize: "18px", lineHeight: "1.8" }}>
          إذا واجهت أي مشكلة أو لديك استفسار حول استخدام الحاسبة، يمكنك التواصل معنا عبر البريد التالي:
        </p>

        <a
          href="mailto:your-email@example.com"
          style={{
            display: "inline-block",
            marginTop: "20px",
            fontSize: "20px",
            color: "#0070f3",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          your-email@example.com
        </a>

        <p style={{ marginTop: "30px", fontSize: "16px", color: "#555" }}>
          نرد عادة خلال 24 ساعة.
        </p>
      </div>
    </>
  );
}
