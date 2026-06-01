"use client";

import { useState, useMemo } from "react";

type Theme = "pink" | "mint" | "purple";

export default function StockCalculatorPage() {
  const [theme, setTheme] = useState<Theme>("pink");

  // ====== حالات الإدخال الأساسية (اربطها لاحقًا بمنطقك الحقيقي) ======
  const [buyPrice, setBuyPrice] = useState("50");
  const [buyShares, setBuyShares] = useState("100");
  const [commissionRate, setCommissionRate] = useState("0.0015");

  const [sellMode, setSellMode] =
    useState<"shares" | "percentShares" | "percentAmount">("shares");
  const [sellShares, setSellShares] = useState("0");
  const [sellPrice, setSellPrice] = useState("60");

  const [currentPrice, setCurrentPrice] = useState("60");

  // ====== حسابات مبسطة (يمكنك استبدالها بمنطقك الحالي) ======
  const totalShares = useMemo(() => {
    const s = parseFloat(buyShares) || 0;
    return s;
  }, [buyShares]);

  const averagePrice = useMemo(() => {
    const p = parseFloat(buyPrice) || 0;
    const c = parseFloat(commissionRate) || 0;
    if (!p) return 0;
    const total = p * totalShares;
    const commission = total * c;
    return (total + commission) / (totalShares || 1);
  }, [buyPrice, commissionRate, totalShares]);

  const totalCostWithCommission = useMemo(() => {
    const p = parseFloat(buyPrice) || 0;
    const c = parseFloat(commissionRate) || 0;
    const total = p * totalShares;
    const commission = total * c;
    return total + commission;
  }, [buyPrice, commissionRate, totalShares]);

  const costPerShareWithCommission = useMemo(() => {
    return (totalCostWithCommission || 0) / (totalShares || 1);
  }, [totalCostWithCommission, totalShares]);

  const numericSellShares = useMemo(
    () => parseFloat(sellShares) || 0,
    [sellShares]
  );

  const remainingShares = useMemo(
    () => Math.max(totalShares - numericSellShares, 0),
    [totalShares, numericSellShares]
  );

  const profitOrLoss = useMemo(() => {
    const sp = parseFloat(sellPrice) || 0;
    const avg = averagePrice || 0;
    return (sp - avg) * numericSellShares;
  }, [sellPrice, averagePrice, numericSellShares]);

  const totalProfit = useMemo(() => {
    const cp = parseFloat(currentPrice) || 0;
    const avg = averagePrice || 0;
    return (cp - avg) * totalShares;
  }, [currentPrice, averagePrice, totalShares]);

  const portfolioValue = useMemo(() => {
    const cp = parseFloat(currentPrice) || 0;
    return cp * totalShares;
  }, [currentPrice, totalShares]);

  const profitPercent = useMemo(() => {
    const base = averagePrice * (totalShares || 1);
    if (!base) return 0;
    return (totalProfit / base) * 100;
  }, [totalProfit, averagePrice, totalShares]);

  const formatNumber = (n: number) =>
    isNaN(n) ? "0" : n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  // ====== ثيمات (ألوان) ======
  const themeClasses = useMemo(() => {
    switch (theme) {
      case "pink":
        return {
          pageBg:
            "bg-[linear-gradient(135deg,#FDF2F8_0%,#FCE7F3_35%,#FBCFE8_100%)]",
          cardBg: "bg-white/90 border-pink-200",
          title: "text-pink-700",
          accent: "text-pink-700",
          buttonActive: "bg-pink-400 text-pink-900 shadow-md",
          buttonInactive: "bg-pink-100 text-pink-700",
          alertBg: "bg-pink-50 border-pink-200",
        };
      case "mint":
        return {
          pageBg:
            "bg-[linear-gradient(135deg,#ECFDF5_0%,#D1FAE5_35%,#A7F3D0_100%)]",
          cardBg: "bg-white/90 border-emerald-200",
          title: "text-emerald-700",
          accent: "text-emerald-700",
          buttonActive: "bg-emerald-400 text-emerald-950 shadow-md",
          buttonInactive: "bg-emerald-100 text-emerald-700",
          alertBg: "bg-emerald-50 border-emerald-200",
        };
      case "purple":
        return {
          pageBg:
            "bg-[linear-gradient(135deg,#1E1B4B_0%,#312E81_40%,#4C1D95_100%)]",
          cardBg: "bg-indigo-900/70 border-indigo-500",
          title: "text-indigo-100",
          accent: "text-indigo-200",
          buttonActive: "bg-violet-500 text-indigo-50 shadow-md",
          buttonInactive: "bg-indigo-700 text-indigo-100",
          alertBg: "bg-indigo-900/60 border-indigo-500",
        };
      default:
        return {} as any;
    }
  }, [theme]);

  const isDark = theme === "purple";

  return (
    <div
      className={`min-h-screen ${themeClasses.pageBg} bg-fixed bg-cover bg-center`}
    >
      <div className="min-h-screen bg-white/40 dark:bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
          {/* ===== الهيدر ===== */}
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1
                className={`text-2xl md:text-3xl font-bold ${
                  isDark ? "text-indigo-50" : "text-slate-800"
                }`}
              >
                حاسبة السهم المتقدمة
              </h1>
              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-indigo-200/80" : "text-slate-600"
                }`}
              >
                متوسط التكلفة، البيع الجزئي، ونظرة شاملة على محفظتك في واجهة
                واحدة.
              </p>
            </div>

            {/* تبديل الثيمات بالأيقونات */}
            <div className="flex items-center gap-3">
              <span
                className={`text-xs ${
                  isDark ? "text-indigo-200/80" : "text-slate-600"
                }`}
              >
                الثيم:
              </span>
              <button
                onClick={() => setTheme("pink")}
                className={`text-2xl transition ${
                  theme === "pink" ? "opacity-100 scale-110" : "opacity-40"
                }`}
              >
                💗
              </button>
              <button
                onClick={() => setTheme("mint")}
                className={`text-2xl transition ${
                  theme === "mint" ? "opacity-100 scale-110" : "opacity-40"
                }`}
              >
                🌿
              </button>
              <button
                onClick={() => setTheme("purple")}
                className={`text-2xl transition ${
                  theme === "purple" ? "opacity-100 scale-110" : "opacity-40"
                }`}
              >
                💜
              </button>
            </div>
          </header>

          {/* ===== تخطيط الصفحة: يسار حاسبات – يمين روابط مفيدة ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(260px,0.9fr)] gap-6">
            {/* ===== العمود الأيسر: الحاسبات ===== */}
            <div className="space-y-6">
              {/* حاسبة متوسط التكلفة */}
              <section
                className={`rounded-2xl border shadow-sm p-4 md:p-5 ${themeClasses.cardBg}`}
              >
                <h2
                  className={`flex items-center gap-2 text-lg font-semibold ${themeClasses.title}`}
                >
                  📈 حاسبة متوسط التكلفة
                </h2>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">سعر الشراء</label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">عدد الأسهم</label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                      value={buyShares}
                      onChange={(e) => setBuyShares(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      عمولة المنصة (يمكن تعديلها)
                    </label>
                    <input
                      type="number"
                      step="0.00001"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                    />
                  </div>
                </div>

                <p
                  className={`text-xs mt-2 ${
                    isDark ? "text-indigo-200/80" : "text-slate-600"
                  }`}
                >
                  الحاسبة تضيف العمولة إلى تكلفة الشراء للحصول على{" "}
                  <span className="font-semibold">متوسط تكلفة أدق</span>.
                </p>

                {/* النتائج */}
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 text-sm ${themeClasses.alertBg}`}
                >
                  <div className="flex justify-between">
                    <span>متوسط التكلفة الجديد:</span>
                    <span className="font-bold">
                      {formatNumber(averagePrice)} ر.س
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>إجمالي التكلفة بعد العمولة:</span>
                    <span className="font-bold">
                      {formatNumber(totalCostWithCommission)} ر.س
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>إجمالي الأسهم:</span>
                    <span className="font-bold">
                      {formatNumber(totalShares)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>تكلفة السهم بعد العمولة:</span>
                    <span className="font-bold">
                      {formatNumber(costPerShareWithCommission)} ر.س
                    </span>
                  </div>
                </div>
              </section>

              {/* حاسبة البيع الجزئي */}
              <section
                className={`rounded-2xl border shadow-sm p-4 md:p-5 ${themeClasses.cardBg}`}
              >
                <h2
                  className={`flex items-center gap-2 text-lg font-semibold ${themeClasses.title}`}
                >
                  ⚖️ حاسبة البيع الجزئي
                </h2>

                {/* وضعيات البيع */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => setSellMode("shares")}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 transition ${
                      sellMode === "shares"
                        ? themeClasses.buttonActive
                        : themeClasses.buttonInactive
                    }`}
                  >
                    📦 بيع حسب عدد الأسهم
                  </button>
                  <button
                    onClick={() => setSellMode("percentShares")}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 transition ${
                      sellMode === "percentShares"
                        ? themeClasses.buttonActive
                        : themeClasses.buttonInactive
                    }`}
                  >
                    📊 بيع حسب نسبة الأسهم
                  </button>
                  <button
                    onClick={() => setSellMode("percentAmount")}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 transition ${
                      sellMode === "percentAmount"
                        ? themeClasses.buttonActive
                        : themeClasses.buttonInactive
                    }`}
                  >
                    💰 بيع حسب نسبة المبلغ
                  </button>
                </div>

                {/* سعر البيع */}
                <div className="mt-4 max-w-xs">
                  <label className="block text-sm mb-1">سعر البيع</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                  />
                </div>

                {/* محتوى كل وضع */}
                {sellMode === "shares" && (
                  <div className="mt-3 max-w-xs">
                    <label className="block text-sm mb-1">
                      أدخل عدد الأسهم التي تريد بيعها
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                      value={sellShares}
                      onChange={(e) => setSellShares(e.target.value)}
                    />
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-indigo-200/80" : "text-slate-600"
                      }`}
                    >
                      سيتم حساب الربح/الخسارة بناءً على متوسط تكلفتك الحالية.
                    </p>
                  </div>
                )}

                {sellMode === "percentShares" && (
                  <div className="mt-3">
                    <div className="max-w-xs">
                      <label className="block text-sm mb-1">
                        أدخل نسبة البيع من إجمالي أسهمك
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                        placeholder="مثال: 25"
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          if (!isNaN(v)) {
                            const shares = Math.floor((totalShares * v) / 100);
                            setSellShares(shares.toString());
                          }
                        }}
                      />
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-indigo-200/80" : "text-slate-600"
                      }`}
                    >
                      هذه النسبة من إجمالي أسهمك الحالية.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[5, 10, 25, 50, 100].map((p) => (
                        <button
                          key={p}
                          type="button"
                          className={`px-3 py-1 rounded-full text-xs ${
                            themeClasses.buttonInactive
                          }`}
                          onClick={() => {
                            const shares = Math.floor((totalShares * p) / 100);
                            setSellShares(shares.toString());
                          }}
                        >
                          {p}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {sellMode === "percentAmount" && (
                  <div className="mt-3">
                    <div className="max-w-xs">
                      <label className="block text-sm mb-1">
                        أدخل نسبة البيع من إجمالي قيمة محفظتك
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                        placeholder="مثال: 10"
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          if (!isNaN(v)) {
                            const totalValue = portfolioValue;
                            const amountToSell = (totalValue * v) / 100;
                            const sp = parseFloat(sellPrice) || 1;
                            const sharesToSell = Math.floor(amountToSell / sp);
                            setSellShares(sharesToSell.toString());
                          }
                        }}
                      />
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-indigo-200/80" : "text-slate-600"
                      }`}
                    >
                      سيتم حساب عدد الأسهم تلقائيًا بناءً على قيمة محفظتك.
                    </p>
                  </div>
                )}

                {/* النتائج */}
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 text-sm ${themeClasses.alertBg}`}
                >
                  <div className="flex justify-between">
                    <span>الأسهم المباعة:</span>
                    <span className="font-bold">
                      {formatNumber(numericSellShares)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>الأسهم المتبقية:</span>
                    <span className="font-bold">
                      {formatNumber(remainingShares)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>الربح/الخسارة للعملية الحالية:</span>
                    <span
                      className={`font-bold ${
                        profitOrLoss >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatNumber(profitOrLoss)} ر.س
                    </span>
                  </div>
                </div>
              </section>

              {/* نظرة شاملة */}
              <section
                className={`rounded-2xl border shadow-sm p-4 md:p-5 ${themeClasses.cardBg}`}
              >
                <h2
                  className={`flex items-center gap-2 text-lg font-semibold ${themeClasses.title}`}
                >
                  📊 نظرة شاملة على محفظتك
                </h2>

                {/* سعر السوق الحالي */}
                <div className="mt-4 max-w-xs">
                  <label className="block text-sm mb-1">
                    سعر السوق الحالي
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                  />
                </div>

                {/* معلومات أساسية */}
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${themeClasses.alertBg}`}
                >
                  <div className="flex justify-between">
                    <span>إجمالي الأسهم:</span>
                    <span className="font-bold">
                      {formatNumber(totalShares)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط التكلفة:</span>
                    <span className="font-bold">
                      {formatNumber(averagePrice)} ر.س
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>قيمة المحفظة الحالية:</span>
                    <span className="font-bold">
                      {formatNumber(portfolioValue)} ر.س
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>الربح/الخسارة الإجمالي:</span>
                    <span
                      className={`font-bold ${
                        totalProfit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatNumber(totalProfit)} ر.س
                    </span>
                  </div>
                </div>

                {/* نتائج شاملة */}
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 text-sm ${themeClasses.alertBg}`}
                >
                  <div className="flex justify-between">
                    <span>📈 الربح/الخسارة الإجمالي:</span>
                    <span
                      className={`font-bold ${
                        totalProfit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatNumber(totalProfit)} ر.س
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>📉 نسبة الربح/الخسارة:</span>
                    <span
                      className={`font-bold ${
                        profitPercent >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {profitPercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>💰 قيمة المحفظة الحالية:</span>
                    <span className="font-bold">
                      {formatNumber(portfolioValue)} ر.س
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* ===== العمود الأيمن: روابط مفيدة ===== */}
            <aside>
              <div
                className={`rounded-2xl border shadow-sm p-4 md:p-5 ${themeClasses.cardBg}`}
              >
                <h2
                  className={`flex items-center gap-2 text-lg font-semibold ${themeClasses.title}`}
                >
                  🔗 روابط مفيدة
                </h2>

                <div className="mt-4 space-y-3">
                  <a
                    href="#"
                    className={`block w-full text-center text-sm font-medium rounded-lg px-3 py-2 transition ${themeClasses.buttonActive}`}
                  >
                    الشرعية – أرقام 📜
                  </a>
                  <a
                    href="#"
                    className={`block w-full text-center text-sm font-medium rounded-lg px-3 py-2 transition ${themeClasses.buttonInactive}`}
                  >
                    صفحة التطهير 💧
                  </a>
                  <a
                    href="#"
                    className={`block w-full text-center text-sm font-medium rounded-lg px-3 py-2 transition ${themeClasses.buttonInactive}`}
                  >
                    التحليل الفني – تكرتشارت 📈
                  </a>
                  <a
                    href="#"
                    className={`block w-full text-center text-sm font-medium rounded-lg px-3 py-2 transition ${themeClasses.buttonInactive}`}
                  >
                    TradingView – تريدينج فيو 📊
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
