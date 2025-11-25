import Head from "next/head";
import TadawulCalculator from "@/components/TadawulCalculator";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>أفضل حاسبة تداول</title>
        <meta name="description" content="أفضل حاسبة تداول لحساب الأرباح والخسائر بسهولة" />
      </Head>
      <main className="container mx-auto py-10 px-4">
        <TadawulCalculator />
      </main>
    </>
  );
}
