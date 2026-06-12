import Head from "next/head";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <Head>
        <title>اتصل بنا | أفضل حاسبة تداول</title>
        <meta
          name="description"
          content="صفحة اتصل بنا الخاصة بموقع أفضل حاسبة تداول. يمكنك التواصل معنا لأي استفسار أو اقتراح."
        />
        <meta
          name="keywords"
          content="اتصل بنا, تواصل, دعم فني, تداول, إدارة رأس المال"
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
          يسعدنا تواصلك معنا في أي وقت. إذا كان لديك استفسار، اقتراح، أو واجهت
          مشكلة أثناء استخدام أدوات الموقع، يمكنك مراسلتنا عبر النموذج التالي،
          وسيتم الرد عليك في أقرب وقت ممكن.
        </p>

        {/* نموذج التواصل */}
        <div
          style={{
            background: "#f7faff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #d6e4ff",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <label style={{ display: "block", marginBottom: "10px" }}>
            الاسم:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <label style={{ display: "block", marginBottom: "10px" }}>
            الرسالة:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "15px",
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "#1e3c72",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            إرسال الرسالة
          </button>
        </div>

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
