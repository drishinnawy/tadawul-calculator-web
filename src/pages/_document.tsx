import { Html, Head, Main, NextScript } from "next/document";

// استدعاء ملفات الـ Schema
import Schema from "@/seo/Schema";
import FAQSchema from "@/seo/FAQSchema";

export default function Document() {
  return (
    <Html lang="ar">
      <Head>
        <meta charSet="UTF-8" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QWF8J7K69F"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QWF8J7K69F');
            `,
          }}
        />

        {/* Schema الأساسي */}
        <Schema />

        {/* FAQ Schema */}
        <FAQSchema />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
