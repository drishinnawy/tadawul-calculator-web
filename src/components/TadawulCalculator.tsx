"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Info,
  BookOpen,
  ShieldCheck,
  ExternalLink,
  Repeat,
  PlusCircle,
  MinusCircle,
  Scale,
  TrendingUp,
  ShieldAlert,
  AlertTriangle,
  LineChart,
  BarChart3,
  LayoutDashboard,
  Pin,
  PinOff,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const Toast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error" | "info";
}) => (
  <div
    className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm ${
      type === "success"
        ? "bg-green-600"
        : type === "error"
        ? "bg-red-600"
        : "bg-sky-600"
    }`}
  >
    {message}
  </div>
);

/* ⭐ استقبال الـ mode هنا فقط */
export default function TadawulCalculator({
  mode = "default",
}: {
  mode?: string;
}) {
  /* ⭐ تعريف حالات الـ mode */
  const isStopLoss = mode === "stoploss";
  const isPosition = mode === "position";
  const isRisk = mode === "risk";
  const isProfitLoss = mode === "profitloss";
  const isAverage = mode === "average";

  /* ⭐ عناوين ووصف الحاسبة حسب الـ mode */
  const calculatorTitle = {
    stoploss: "حاسبة وقف الخسارة",
    position: "حاسبة حجم الصفقة",
    risk: "حاسبة نسبة المخاطرة",
    profitloss: "حاسبة الربح والخسارة",
    average: "حاسبة متوسط السعر",
    default: "حاسبة التداول",
  }[mode];

  const calculatorDescription = {
    stoploss: "احسب وقف الخسارة المثالي بناءً على سعر الدخول ونسبة المخاطرة.",
    position: "احسب حجم الصفقة المناسب بناءً على رأس المال ونسبة المخاطرة.",
    risk: "احسب نسبة المخاطرة المناسبة لكل صفقة.",
    profitloss: "احسب صافي الربح أو الخسارة بناءً على سعر الدخول والخروج.",
    average: "احسب متوسط تكلفة السهم بعد عمليات شراء متعددة.",
    default: "حاسبة تداول شاملة.",
  }[mode];

  // -----------------------------
  // 🟦 الحقول الأساسية
  // -----------------------------
  const [activeTab, setActiveTab] = useState("byAmount");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [shares, setShares] = useState("");
  const [commission, setCommission] = useState("0.0015");
  const [vat, setVat] = useState("15");
  const [stockName, setStockName] = useState("");

  const [purchases, setPurchases] = useState([
    { id: 1, shares: "", price: "" },
  ]);

  // -----------------------------
  // 🟦 البيع الجزئي
  // -----------------------------
  const [sellShares, setSellShares] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellMode, setSellMode] = useState<
    "shares" | "percentShares" | "percentValue"
  >("shares");
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [netProceeds, setNetProceeds] = useState(0);
  const [remainingShares, setRemainingShares] = useState(0);
  const [remainingCost, setRemainingCost] = useState(0);
  const [newAverageCost, setNewAverageCost] = useState(0);
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState(0);
  const [sellCommissionRate, setSellCommissionRate] = useState("0.00015");

  // -----------------------------
  // 🟦 الثيم (الحالي: mint / purple / sky)
  // -----------------------------
  const [theme, setTheme] = useState<"mint" | "purple" | "sky">("mint");

  const themeClasses =
    theme === "mint"
      ? "bg-gradient-to-br from-emerald-50 to-sky-50"
      : theme === "purple"
      ? "bg-gradient-to-br from-purple-50 to-violet-100"
      : "bg-gradient-to-br from-sky-50 to-indigo-50";

  // -----------------------------
  // 🟦 وضع العرض العام (الحاسبة الأصلية / الحاسبات المتقدمة)
  // -----------------------------
  const [viewMode, setViewMode] = useState<"original" | "new">("original");

  // -----------------------------
  // 🟦 Sidebar القابل للطي + التثبيت
  // -----------------------------
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);

  // -----------------------------
  // 🟦 الأداة النشطة داخل الحاسبات المتقدمة
  // -----------------------------
  const [activeTool, setActiveTool] = useState<
    "stoploss" | "position" | "risk" | "profitloss" | "average"
  >("stoploss");

  // -----------------------------
  // 🟦 Toast
  // -----------------------------
  const [toastMsg, setToastMsg] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (m: string, t: "success" | "error" | "info" = "info") => {
    setToastMsg({ message: m, type: t });
    setTimeout(() => setToastMsg(null), 3000);
  };

  // -----------------------------
  // 🟦 تنسيق الأرقام
  // -----------------------------
  const formatNumber = (n: number | string) =>
    isNaN(Number(n))
      ? "-"
      : Number(n).toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  // -----------------------------
  // 🟦 حسابات الشراء
  // -----------------------------
  const calculatedShares = useMemo(() => {
    if (activeTab === "byAmount" && amount && price) {
      const a = parseFloat(amount),
        p = parseFloat(price),
        c = parseFloat(commission),
        v = parseFloat(vat) / 100;
      return Math.floor((a - a * c * (1 + v)) / p);
    } else if (activeTab === "byShares" && shares && price)
      return parseFloat(shares);
    return 0;
  }, [activeTab, amount, price, shares, commission, vat]);

  const calculatedCost = useMemo(() => {
    if (price && calculatedShares) {
      const p = parseFloat(price),
        c = parseFloat(commission),
        v = parseFloat(vat) / 100;
      const base = p * calculatedShares;
      return base + base * c * (1 + v);
    }
    return 0;
  }, [price, calculatedShares, commission, vat]);

  const averagePriceWithFees = useMemo(
    () => (calculatedShares && price ? calculatedCost / calculatedShares : 0),
    [calculatedCost, calculatedShares]
  );

  // -----------------------------
  // 🟦 حساب متوسط التكلفة العام
  // -----------------------------
  const totalSharesCalc = purchases.reduce(
    (s, p) => s + (parseFloat(p.shares) || 0),
    0
  );

  const totalCost = purchases.reduce(
    (s, p) =>
      s +
      (parseFloat(p.shares) || 0) * (parseFloat(p.price) || 0),
    0
  );

  const averagePrice = totalSharesCalc ? totalCost / totalSharesCalc : 0;

  // -----------------------------
  // 🟦 حساب الربح لكل سهم
  // -----------------------------
  const profitPerShare =
    sellPrice && averagePrice
      ? parseFloat(sellPrice) - averagePrice
      : 0;

  // -----------------------------
  // 🟦 دوال الشراء
  // -----------------------------
  const handlePurchaseChange = (
    id: number,
    f: "shares" | "price",
    v: string
  ) =>
    setPurchases(purchases.map((p) => (p.id === id ? { ...p, [f]: v } : p)));

  const handleAddNewPurchase = () =>
    setPurchases([
      ...purchases,
      {
        id: Date.now(),
        shares: "",
        price: "",
      } as {
        id: number;
        shares: string;
        price: string;
      },
    ]);

  const handleRemovePurchase = (id: number) =>
    setPurchases(purchases.filter((p) => p.id !== id));

  // -----------------------------
  // 🟦 دالة التحقق الشرعي
  // -----------------------------
  const handleShariaCheck = () => {
    if (!stockName || stockName.trim() === "")
      return showToast("يرجى إدخال اسم السهم أو رمزه للتحقق.", "error");

    window.open(
      "https://www.argaam.com/ar/company/shariahcompanies/3//3",
      "_blank"
    );
  };

  // -----------------------------
  // 🟦 حساب البيع (تلقائي)
  // -----------------------------
  const handleSellCalculation = () => {
    const ss = parseFloat(sellShares);
    const sp = parseFloat(sellPrice);
    const rate = parseFloat(sellCommissionRate || "0.00015");

    // لا يوجد مشتريات أصلاً
    if (!totalSharesCalc || totalSharesCalc <= 0) {
      setNetProceeds(0);
      setProfitOrLoss(0);
      setRemainingShares(0);
      setRemainingCost(0);
      setNewAverageCost(0);
      setTotalProfitOrLoss(0);
      return;
    }

    // مدخلات بيع غير مكتملة أو غير صالحة → نظهر وضع المحفظة قبل البيع
    if (
      isNaN(ss) ||
      ss <= 0 ||
      ss > totalSharesCalc ||
      isNaN(sp) ||
      sp <= 0
    ) {
      setNetProceeds(0);
      setProfitOrLoss(0);
      setRemainingShares(totalSharesCalc);
      setRemainingCost(totalCost);
      setNewAverageCost(averagePrice || 0);
      setTotalProfitOrLoss(0);
      return;
    }

    const sellValue = ss * sp;
    const sellCommission = sellValue * rate;
    const netSell = sellValue - sellCommission;

    const avgBuyPrice = averagePrice;
    const avgCostOfSold = avgBuyPrice * ss;
    const realizedPL = netSell - avgCostOfSold;

    const newRemainingShares = totalSharesCalc - ss;
    const newRemainingCost = totalCost - avgCostOfSold;

    const newAvg =
      newRemainingShares > 0
        ? newRemainingCost / newRemainingShares
        : 0;

    setNetProceeds(netSell);
    setProfitOrLoss(realizedPL);
    setRemainingShares(newRemainingShares);
    setRemainingCost(newRemainingCost);
    setNewAverageCost(newAvg);
    setTotalProfitOrLoss(realizedPL);
  };

  // -----------------------------
  // 🟦 تفعيل الحساب التلقائي
  // -----------------------------
  useEffect(() => {
    handleSellCalculation();
  }, [
    sellShares,
    sellPrice,
    totalSharesCalc,
    totalCost,
    averagePrice,
    sellCommissionRate,
  ]);

  // -----------------------------
  // 🟦 مسح البيانات
  // -----------------------------
  const handleClearAll = () => {
    setAmount("");
    setPrice("");
    setShares("");
    setPurchases([{ id: 1, shares: "", price: "" }]);

    setSellShares("");
    setSellPrice("");
    setSellMode("shares");
    setNetProceeds(0);
    setProfitOrLoss(0);
    setRemainingShares(0);
    setRemainingCost(0);
    setNewAverageCost(0);
    setTotalProfitOrLoss(0);

    showToast("تم مسح جميع البيانات بنجاح", "success");
  };

  // -----------------------------
// 🟦 الواجهة — بداية return
// -----------------------------
return (
  <div className={`p-6 rounded-2xl ${themeClasses}`}>
    {toastMsg && (
      <Toast message={toastMsg.message} type={toastMsg.type} />
    )}

    {/* ⭐ أزرار التبديل بين الوضعين */}
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => setViewMode("original")}
        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
          viewMode === "original"
            ? "bg-blue-600 text-white shadow"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        🧮 الحاسبة الكاملة
      </button>

      <button
        onClick={() => setViewMode("new")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
          viewMode === "new"
            ? "bg-purple-600 text-white shadow"
            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
        }`}
      >
        <LayoutDashboard className="w-4 h-4" />
        الحاسبات المتقدمة
      </button>
    </div>

    {/* ⭐⭐ الوضع الأول: الحاسبة الأصلية ⭐⭐ */}
    {viewMode === "original" && (
      <>
        {/* شريط الإعدادات (الثيم + عمولة المنصة + التوضيح) */}
        <div className="mt-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 p-3 rounded-xl border border-purple-200 shadow-sm">

          {/* الثيم */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">الثيم:</span>

            <button
              onClick={() => setTheme("mint")}
              className={`w-5 h-5 rounded-full border bg-emerald-100 ${
                theme === "mint" ? "ring-2 ring-emerald-500" : ""
              }`}
            />

            <button
              onClick={() => setTheme("purple")}
              className={`w-5 h-5 rounded-full border bg-purple-100 ${
                theme === "purple" ? "ring-2 ring-purple-500" : ""
              }`}
            />

            <button
              onClick={() => setTheme("sky")}
              className={`w-5 h-5 rounded-full border bg-sky-100 ${
                theme === "sky" ? "ring-2 ring-sky-500" : ""
              }`}
            />
          </div>

          {/* التوضيح */}
          <div className="text-center text-sm text-slate-700">
            بعض المنصات لا تضيف عمولة المنصة لكن الحاسبة تضيفها لتشمل جميع المنصات
          </div>

          {/* عمولة المنصة */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">عمولة المنصة:</span>
            <Input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="w-24 text-slate-800"
            />
          </div>

        </div>

        {/* حاسبة الصفقة */}
        <Card className="mt-6 bg-white/90 shadow-md border border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Calculator /> حاسبة الصفقة
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger
                  value="byAmount"
                  className="
                    bg-purple-100 text-purple-700
                    data-[state=active]:bg-purple-600
                    data-[state=active]:text-white
                  "
                >
                  حسب المبلغ
                </TabsTrigger>

                <TabsTrigger
                  value="byShares"
                  className="
                    bg-purple-100 text-purple-700
                    data-[state=active]:bg-purple-600
                    data-[state=active]:text-white
                  "
                >
                  حسب عدد الأسهم
                </TabsTrigger>
              </TabsList>

              {/* حسب المبلغ */}
              <TabsContent value="byAmount" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-800">المبلغ المراد استثماره</Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        const v = e.target.value;
                        setAmount(v);

                        const amt = parseFloat(v);
                        const pr = parseFloat(price);
                        if (!isNaN(amt) && !isNaN(pr) && pr > 0) {
                          const sh = Math.floor(amt / pr);
                          setShares(sh.toString());
                          setPurchases([{ id: 1, shares: sh.toString(), price: pr.toString() }]);
                        }
                      }}
                      className="text-slate-900 bg-yellow-50 border border-yellow-400"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-800">سعر السهم</Label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => {
                        const v = e.target.value;
                        setPrice(v);

                        const amt = parseFloat(amount);
                        const pr = parseFloat(v);
                        if (!isNaN(amt) && !isNaN(pr) && pr > 0) {
                          const sh = Math.floor(amt / pr);
                          setShares(sh.toString());
                          setPurchases([{ id: 1, shares: sh.toString(), price: pr.toString() }]);
                        }
                      }}
                      className="text-slate-900 bg-yellow-50 border border-yellow-400"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* حسب عدد الأسهم */}
              <TabsContent value="byShares" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-800">عدد الأسهم</Label>
                    <Input
                      type="number"
                      value={shares}
                      onChange={(e) => {
                        const v = e.target.value;
                        setShares(v);

                        const sh = parseFloat(v);
                        const pr = parseFloat(price);
                        if (!isNaN(sh) && !isNaN(pr) && pr > 0) {
                          setPurchases([{ id: 1, shares: sh.toString(), price: pr.toString() }]);
                        }
                      }}
                      className="text-slate-900 bg-yellow-50 border border-yellow-400"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-800">سعر السهم</Label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => {
                        const v = e.target.value;
                        setPrice(v);

                        const sh = parseFloat(shares);
                        const pr = parseFloat(v);
                        if (!isNaN(sh) && !isNaN(pr) && pr > 0) {
                          setPurchases([{ id: 1, shares: sh.toString(), price: pr.toString() }]);
                        }
                      }}
                      className="text-slate-900 bg-yellow-50 border border-yellow-400"
                    />
                  </div>
                </div>
              </TabsContent>

            </Tabs>

            {/* النتائج */}
            <Alert className="mt-4 bg-purple-50 border-purple-200">
              <AlertTitle className="text-purple-700">نتائج الصفقة</AlertTitle>
              <AlertDescription className="space-y-2">

                <div className="flex justify-between text-slate-800">
                  <span>عدد الأسهم المتوقع:</span>
                  <span className="font-bold text-purple-700">
                    {formatNumber(calculatedShares)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-800">
                  <span>إجمالي التكلفة مع العمولة:</span>
                  <span className="font-bold text-purple-700">
                    {formatNumber(calculatedCost)} ر.س
                  </span>
                </div>

                <div className="flex justify-between text-slate-800">
                  <span>متوسط سعر السهم بعد الرسوم:</span>
                  <span className="font-bold text-purple-700">
                    {formatNumber(averagePriceWithFees)} ر.س
                  </span>
                </div>

              </AlertDescription>
            </Alert>

          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* روابط مفيدة + حاسبة متوسط التكلفة */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* روابط مفيدة */}
          <Card className="bg-gradient-to-br from-sky-50 to-white shadow-sm border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-700">
                <BookOpen /> روابط مفيدة
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Input
                placeholder="اسم السهم أو رمزه"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                className="text-slate-800"
              />

              <Button
                onClick={handleShariaCheck}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white"
              >
                <ShieldCheck className="mr-2 h-4 w-4" /> التحقق من الشرعية
              </Button>

              <Button variant="outline" asChild className="w-full text-slate-700">
                <a href="https://trynaqua.com/calculator" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" /> صفحة التطهير
                </a>
              </Button>

              <Button variant="outline" asChild className="w-full text-slate-700">
                <a href="https://www.tickerchart.net/app/ar" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" /> تكرتشارت
                </a>
              </Button>

              <Button variant="outline" asChild className="w-full text-slate-700">
                <a href="https://ar.tradingview.com/" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" /> تريدينج فيو
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )}

            {/* ⭐⭐⭐ تكملة الحاسبة الأصلية — ج4 ⭐⭐⭐ */}

        {/* حاسبة متوسط التكلفة */}
        <Card className="lg:col-span-2 bg-white/80 shadow-md border border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Repeat /> حاسبة متوسط التكلفة
            </CardTitle>
          </CardHeader>

          <CardContent>
            {purchases.map((p) => (
              <div key={p.id} className="flex gap-2 mb-2">
                <Input
                  type="number"
                  placeholder="عدد الأسهم"
                  value={p.shares}
                  onChange={(e) =>
                    handlePurchaseChange(p.id, "shares", e.target.value)
                  }
                  className="text-slate-800"
                />

                <Input
                  type="number"
                  placeholder="سعر الشراء"
                  value={p.price}
                  onChange={(e) =>
                    handlePurchaseChange(p.id, "price", e.target.value)
                  }
                  className="text-slate-800"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemovePurchase(p.id)}
                >
                  <MinusCircle className="text-red-500" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={handleAddNewPurchase}
              className="mt-2 border-emerald-400 text-emerald-700 hover:bg-emerald-100"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> إضافة عملية شراء
            </Button>

            <Alert
              variant="default"
              className="mt-4 bg-emerald-50 border-emerald-200"
            >
              <Info className="h-5 w-5 text-emerald-700" />
              <AlertTitle className="text-emerald-700">النتائج</AlertTitle>

              <AlertDescription className="space-y-2 text-slate-800">
                <div className="flex justify-between">
                  <span>إجمالي الأسهم:</span>
                  <span className="font-bold text-emerald-700">
                    {formatNumber(totalSharesCalc)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>متوسط سعر السهم:</span>
                  <span className="font-bold text-emerald-700">
                    {formatNumber(averagePrice)} ر.س
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>إجمالي التكلفة:</span>
                  <span className="font-bold text-emerald-700">
                    {formatNumber(totalCost)} ر.س
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

{/* حاسبة البيع الجزئي */}
<Card className="mt-6 bg-white/90 shadow-md border border-blue-200">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-blue-700">
      <Scale /> حاسبة البيع الجزئي
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">

    {/* أزرار اختيار وضع البيع */}
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => setSellMode("shares")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          sellMode === "shares"
            ? "bg-blue-600 text-white shadow"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        📦 بيع حسب عدد الأسهم
      </button>

      <button
        onClick={() => setSellMode("percentShares")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          sellMode === "percentShares"
            ? "bg-blue-600 text-white shadow"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        📊 بيع حسب نسبة الأسهم
      </button>

      <button
        onClick={() => setSellMode("percentValue")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          sellMode === "percentValue"
            ? "bg-blue-600 text-white shadow"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        💰 بيع حسب نسبة المبلغ
      </button>
    </div>

    {/* وضع 1: بيع حسب عدد الأسهم */}
    {sellMode === "shares" && (
      <div className="space-y-3">
        <Label className="text-slate-800">عدد الأسهم المراد بيعها</Label>
        <Input
          type="number"
          value={sellShares}
          onChange={(e) => setSellShares(e.target.value)}
          className="text-slate-900 bg-yellow-50 border border-yellow-400"
        />
      </div>
    )}

    {/* وضع 2: بيع حسب نسبة الأسهم */}
    {sellMode === "percentShares" && (
      <div className="space-y-3">
        <Label className="text-slate-800">نسبة البيع من إجمالي الأسهم</Label>
        <Input
          type="number"
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v))
              setSellShares(
                Math.floor((totalSharesCalc * v) / 100).toString()
              );
          }}
          className="text-slate-800"
        />
      </div>
    )}

    {/* وضع 3: بيع حسب نسبة المبلغ */}
    {sellMode === "percentValue" && (
      <div className="space-y-3">
        <Label className="text-slate-800">نسبة البيع من قيمة الصفقة</Label>
        <Input
          type="number"
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v) && sellPrice) {
              const sp = parseFloat(sellPrice);
              const totalValue = totalSharesCalc * sp;
              setSellShares(
                Math.floor((totalValue * v) / 100 / sp).toString()
              );
            }
          }}
          className="text-slate-800"
        />
      </div>
    )}

  </CardContent>
</Card>

        {/* ⭐⭐⭐ تكملة الحاسبة الأصلية — ج5 ⭐⭐⭐ */}

{/* أزرار النسب السريعة */}
<div className="flex gap-2">
  {[5, 10, 25, 50, 100].map((p) => (
    <Button
      key={p}
      variant="outline"
      onClick={() =>
        setSellShares(
          Math.floor((totalSharesCalc * p) / 100).toString()
        )
      }
      className="border-blue-400 text-blue-700 hover:bg-blue-100"
    >
      {p}%
    </Button>
  ))}
</div>

{/* وضع 3: بيع حسب نسبة المبلغ */}
{sellMode === "percentValue" && (
  <div className="space-y-3">
    <Label className="text-slate-800">نسبة البيع من قيمة المحفظة</Label>
    <Input
      type="number"
      onChange={(e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) {
          const portfolioValue = totalSharesCalc * averagePrice;
          const targetValue = (portfolioValue * v) / 100;
          const sharesToSell = Math.floor(
            targetValue / parseFloat(sellPrice || "1")
          );
          setSellShares(sharesToSell.toString());
        }
      }}
      className="text-slate-800"
    />
  </div>
)}

{/* سعر البيع */}
<div className="space-y-3">
  <Label className="text-slate-800">سعر البيع</Label>
  <Input
    type="number"
    value={sellPrice}
    onChange={(e) => setSellPrice(e.target.value)}
    className="text-slate-900 bg-purple-50 border border-purple-400"
  />
</div>

{/* النتائج */}
<Alert
  className="mt-4 bg-blue-50 border-blue-200"
  variant={profitOrLoss >= 0 ? "default" : "destructive"}
>
  <AlertTitle className="text-blue-700">نتائج البيع</AlertTitle>

  <AlertDescription className="space-y-3 text-slate-800">
    <div className="flex justify-between">
      <span>صافي البيع:</span>
      <span className="font-bold text-blue-700">
        {formatNumber(netProceeds)} ر.س
      </span>
    </div>

    <div className="flex justify-between">
      <span>الربح/الخسارة لكل سهم:</span>
      <span className="font-bold text-blue-700">
        {formatNumber(profitPerShare)} ر.س
      </span>
    </div>

    <div className="flex justify-between">
      <span>الربح/الخسارة الإجمالي:</span>
      <span className="font-bold text-blue-700">
        {formatNumber(profitOrLoss)} ر.س
      </span>
    </div>

    <div className="flex justify-between">
      <span>الأسهم المتبقية:</span>
      <span className="font-bold text-blue-700">
        {formatNumber(remainingShares)}
      </span>
    </div>

    <div className="flex justify-between">
      <span>متوسط سعر السهم بعد البيع:</span>
      <span className="font-bold text-blue-700">
        {formatNumber(newAverageCost)} ر.س
      </span>
    </div>
  </AlertDescription>
</Alert>

</CardContent>
</Card>

{/* نظرة شاملة */}
<Card className="mt-6 bg-white/80 shadow-md border border-blue-100">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-blue-700">
      <TrendingUp /> نظرة شاملة على محفظتك
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-3 text-slate-800">
    <div className="flex justify-between">
      <span>الأسهم المتبقية:</span>
      <span className="font-bold text-blue-700">
        {formatNumber(remainingShares)}
      </span>
    </div>

    <div className="flex justify-between">
      <span>التكلفة المتبقية:</span>
      <span className="font-bold text-blue-700">
        {formatNumber(remainingCost)} ر.س
      </span>
    </div>

    <div className="flex justify-between">
      <span>متوسط التكلفة الجديد:</span>
      <span className="font-bold text-blue-700">
        {formatNumber(newAverageCost)} ر.س
      </span>
    </div>

    <div className="flex justify-between">
      <span>الربح / الخسارة الكلي:</span>
      <span
        className={`font-bold ${
          totalProfitOrLoss > 0
            ? "text-green-600"
            : totalProfitOrLoss < 0
            ? "text-red-600"
            : "text-slate-600"
        }`}
      >
        {formatNumber(totalProfitOrLoss)} ر.س
      </span>
    </div>
  </CardContent>
</Card>

{/* زر مسح البيانات */}
<div className="mt-6 flex justify-center">
  <Button
    onClick={handleClearAll}
    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
  >
    مسح جميع البيانات
  </Button>
</div>

{/* روابط أسفل الصفحة */}
<div className="mt-10 text-center text-sm text-slate-600">
  <a href="/terms" className="mx-2 hover:underline">Terms of Service</a> |
  <a href="/privacy" className="mx-2 hover:underline">Privacy Policy</a> |
  <a href="/refund" className="mx-2 hover:underline">Refund Policy</a> |
  <a href="/contact" className="mx-2 hover:underline">اتصل بنا</a>
</div>

</div> {/* ← إغلاق الحاسبة الأصلية بالكامل */}

{/* ⭐⭐⭐ الوضع الثاني: الحاسبات المتقدمة ⭐⭐⭐ */}
{viewMode === "new" && (
  <div className="mt-10 flex gap-6">

    {/* ─────────────────────────────── */}
    {/* 🟣 Sidebar الاحترافي (Sticky + Collapse + Pin) */}
    {/* ─────────────────────────────── */}
    <div
      className={`transition-all duration-300 ${
        isSidebarExpanded ? "w-56" : "w-20"
      }`}
    >
      <div className="sticky top-4 h-fit bg-white/90 border border-slate-200 rounded-xl shadow-sm flex flex-col">

        {/* شريط علوي + Pin */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-purple-600" />
            {isSidebarExpanded && (
              <span className="text-sm font-semibold text-slate-800">
                الحاسبات المتقدمة
              </span>
            )}
          </div>

          <button
            onClick={() => {
              const nextPinned = !isSidebarPinned;
              setIsSidebarPinned(nextPinned);
              if (!nextPinned) setIsSidebarExpanded(false);
              else setIsSidebarExpanded(true);
            }}
            className="p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            {isSidebarPinned ? (
              <Pin className="w-4 h-4 text-slate-700" />
            ) : (
              <PinOff className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* عناصر القائمة */}
        <div
          className="flex-1 py-2"
          onMouseEnter={() => {
            if (!isSidebarPinned) setIsSidebarExpanded(true);
          }}
          onMouseLeave={() => {
            if (!isSidebarPinned) setIsSidebarExpanded(false);
          }}
        >
          {[
            { id: "stoploss", label: "وقف الخسارة", icon: ShieldAlert },
            { id: "position", label: "حجم الصفقة", icon: Scale },
            { id: "risk", label: "نسبة المخاطرة", icon: AlertTriangle },
            { id: "profitloss", label: "الربح والخسارة", icon: LineChart },
            { id: "average", label: "متوسط السعر", icon: BarChart3 },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTool === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTool(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all ${
                  active
                    ? "bg-purple-50 text-purple-700 border-r-4 border-purple-500"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    active ? "text-purple-600" : "text-slate-500"
                  }`}
                />
                {isSidebarExpanded && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>

    {/* ─────────────────────────────── */}
    {/* 🟢 منطقة الحاسبات المتقدمة (Scroll داخلي + Animation) */}
    {/* ─────────────────────────────── */}
    <div className="flex-1 max-h-[75vh] overflow-y-auto pr-1 space-y-8">

      {/* ─────────────── */}
      {/* 🔴 حاسبة وقف الخسارة */}
      {/* ─────────────── */}
      <div
        className={`transition-all duration-300 rounded-xl ${
          activeTool === "stoploss"
            ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
            : "scale-100"
        }`}
      >
        {/* ⭐ ضع هنا كود حاسبة وقف الخسارة كما هو عندك */}
      </div>

      {/* ─────────────── */}
      {/* 🟣 حاسبة حجم الصفقة */}
      {/* ─────────────── */}
      <div
        className={`transition-all duration-300 rounded-xl ${
          activeTool === "position"
            ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
            : "scale-100"
        }`}
      >
        {/* ⭐ ضع هنا كود حاسبة حجم الصفقة كما هو عندك */}
      </div>

      {/* ─────────────── */}
      {/* 🔶 حاسبة نسبة المخاطرة */}
      {/* ─────────────── */}
      <div
        className={`transition-all duration-300 rounded-xl ${
          activeTool === "risk"
            ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
            : "scale-100"
        }`}
      >
        {/* ⭐ ضع هنا كود حاسبة نسبة المخاطرة كما هو عندك
            ✔ مع تعديل ألوان المخاطرة:
              - عالية: أحمر
              - متوسطة: أصفر
              - منخفضة: أزرق سماوي
        */}
      </div>

      {/* ─────────────── */}
      {/* 🟢 حاسبة الربح والخسارة */}
      {/* ─────────────── */}
      <div
        className={`transition-all duration-300 rounded-xl ${
          activeTool === "profitloss"
            ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
            : "scale-100"
        }`}
      >
        {/* ⭐ ضع هنا كود حاسبة الربح والخسارة كما هو عندك
            ✔ مع إضافة هدف الربح:
              targetPrice = entryPrice * (1 + targetPercent/100)
        */}
      </div>

      {/* ─────────────── */}
      {/* 🔵 حاسبة متوسط السعر */}
      {/* ─────────────── */}
      <div
        className={`transition-all duration-300 rounded-xl ${
          activeTool === "average"
            ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
            : "scale-100"
        }`}
      >
        {/* ⭐ ضع هنا كود حاسبة متوسط السعر (نسخة مبسطة أو كاملة) */}
      </div>

    </div>
  </div>
)}
