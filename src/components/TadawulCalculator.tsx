"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const Toast = ({ message, type }) => (
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

export default function TadawulCalculator() {
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

  const [purchases, setPurchases] = useState([{ id: 1, shares: "", price: "" }]);

  // -----------------------------
  // 🟦 البيع الجزئي
  // -----------------------------
  const [sellShares, setSellShares] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellMode, setSellMode] = useState("shares");
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [netProceeds, setNetProceeds] = useState(0);
  const [remainingShares, setRemainingShares] = useState(0);
  const [remainingCost, setRemainingCost] = useState(0);
  const [newAverageCost, setNewAverageCost] = useState(0);
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState(0);
  const [sellCommissionRate, setSellCommissionRate] = useState("0.00015");

  // -----------------------------
  // 🟦 الثيم
  // -----------------------------
  const [theme, setTheme] = useState("mint");

  const themeClasses =
    theme === "mint"
      ? "bg-gradient-to-br from-emerald-50 to-sky-50"
      : "bg-gradient-to-br from-amber-50 to-beige-50";

  // -----------------------------
  // 🟦 Toast
  // -----------------------------
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (m, t = "info") => {
    setToastMsg({ message: m, type: t });
    setTimeout(() => setToastMsg(null), 3000);
  };

  // -----------------------------
  // 🟦 تنسيق الأرقام
  // -----------------------------
  const formatNumber = (n) =>
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
    (s, p) => s + Number(p.shares || 0),
    0
  );

  const totalCost = purchases.reduce(
    (s, p) => s + Number(p.shares || 0) * Number(p.price || 0),
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
  const handlePurchaseChange = (id, f, v) =>
    setPurchases(purchases.map((p) => (p.id === id ? { ...p, [f]: v } : p)));

  const handleAddNewPurchase = () =>
    setPurchases([...purchases, { id: Date.now(), shares: "", price: "" }]);

  const handleRemovePurchase = (id) =>
    setPurchases(purchases.filter((p) => p.id !== id));

  // -----------------------------
  // 🟦 دالة التحقق الشرعي
  // -----------------------------
  const handleShariaCheck = () => {
    if (!stockName.trim())
      return showToast("يرجى إدخال اسم السهم أو رمزه للتحقق.", "error");
    window.open(
      "https://www.argaam.com/ar/company/shariahcompanies/3//3",
      "_blank"
    );
  };

  // -----------------------------
  // 🟦 حساب البيع
  // -----------------------------
  const handleSellCalculation = () => {
    const ss = parseFloat(sellShares),
      sp = parseFloat(sellPrice),
      rate = parseFloat(sellCommissionRate || "0.00015");

    if (isNaN(ss) || ss <= 0)
      return showToast("الكمية غير صالحة.", "error");

    if (ss > totalSharesCalc)
      return showToast("لا يمكنك بيع أكثر من إجمالي الأسهم.", "error");

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
        ? (newRemainingCost + sellCommission) / newRemainingShares
        : 0;

    setNetProceeds(netSell);
    setProfitOrLoss(realizedPL);
    setRemainingShares(newRemainingShares);
    setRemainingCost(newRemainingCost);
    setNewAverageCost(newAvg);
    setTotalProfitOrLoss(realizedPL);
  };

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
    setNetProceeds(0);
    setProfitOrLoss(0);
    setRemainingShares(0);
    setRemainingCost(0);
    showToast("تم مسح جميع البيانات بنجاح", "success");
  };

  // -----------------------------
  // 🟦 بداية الواجهة (هنا ينتهي ج1)
  // -----------------------------
  // -----------------------------
  // 🟦 الواجهة — بداية return
  // -----------------------------
  return (
    <div className={`p-6 rounded-2xl ${themeClasses}`}>
      {toastMsg && (
        <Toast message={toastMsg.message} type={toastMsg.type} />
      )}

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
            />

            <Button
              onClick={handleShariaCheck}
              className="w-full bg-sky-600 hover:bg-sky-700"
            >
              <ShieldCheck className="mr-2 h-4 w-4" /> التحقق من الشرعية
            </Button>

            <Button variant="outline" asChild className="w-full">
              <a href="https://trynaqua.com/calculator" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> صفحة التطهير
              </a>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <a href="https://www.tickerchart.net/app/ar" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> تكرتشارت
              </a>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <a href="https://ar.tradingview.com/" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> تريدينج فيو
              </a>
            </Button>
          </CardContent>
        </Card>

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
                />

                <Input
                  type="number"
                  placeholder="سعر الشراء"
                  value={p.price}
                  onChange={(e) =>
                    handlePurchaseChange(p.id, "price", e.target.value)
                  }
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
              className="mt-2"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> إضافة عملية شراء
            </Button>

            <Alert
              variant="default"
              className="mt-4 bg-emerald-50 border-emerald-200"
            >
              <Info className="h-5 w-5" />
              <AlertTitle className="text-emerald-700">النتائج</AlertTitle>

              <AlertDescription className="space-y-2">
                <div className="flex justify-between">
                  <span>إجمالي الأسهم:</span>
                  <span>{formatNumber(totalSharesCalc)}</span>
                </div>

                <div className="flex justify-between">
                  <span>متوسط سعر السهم:</span>
                  <span>{formatNumber(averagePrice)} ر.س</span>
                </div>

                <div className="flex justify-between">
                  <span>إجمالي التكلفة:</span>
                  <span>{formatNumber(totalCost)} ر.س</span>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

      </div>
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
              <Label>عدد الأسهم المراد بيعها</Label>
              <Input
                type="number"
                value={sellShares}
                onChange={(e) => setSellShares(e.target.value)}
              />
            </div>
          )}

          {/* وضع 2: بيع حسب نسبة الأسهم */}
          {sellMode === "percentShares" && (
            <div className="space-y-3">
              <Label>نسبة البيع من إجمالي الأسهم</Label>
              <Input
                type="number"
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  if (!isNaN(v))
                    setSellShares(
                      Math.floor((totalSharesCalc * v) / 100).toString()
                    );
                }}
              />

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
            </div>
          )}

          {/* وضع 3: بيع حسب نسبة المبلغ */}
          {sellMode === "percentValue" && (
            <div className="space-y-3">
              <Label>نسبة البيع من قيمة المحفظة</Label>
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
              />
            </div>
          )}

          {/* النتائج */}
          <Alert
            className="mt-4"
            variant={profitOrLoss >= 0 ? "default" : "destructive"}
          >
            <AlertTitle>النتائج</AlertTitle>

            <AlertDescription className="space-y-3">
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
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* نظرة شاملة على المحفظة */}
      <Card className="mt-6 bg-white/80 shadow-md border border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <TrendingUp /> نظرة شاملة على محفظتك
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>الأسهم المتبقية:</span>
            <span className="font-bold">{formatNumber(remainingShares)}</span>
          </div>

          <div className="flex justify-between">
            <span>التكلفة المتبقية:</span>
            <span className="font-bold">{formatNumber(remainingCost)} ر.س</span>
          </div>

          <div className="flex justify-between">
            <span>متوسط التكلفة الجديد:</span>
            <span className="font-bold">{formatNumber(newAverageCost)} ر.س</span>
          </div>

          <div className="flex justify-between">
            <span>الربح / الخسارة الكلي:</span>
            <span
              className={`font-bold ${
                totalProfitOrLoss > 0
                  ? "text-green-600"
                  : totalProfitOrLoss < 0
                  ? "text-red-600"
                  : "text-gray-600"
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
      <div className="mt-10 text-center text-sm text-gray-600">
        <a href="/terms" className="mx-2 hover:underline">Terms of Service</a> |
        <a href="/privacy" className="mx-2 hover:underline">Privacy Policy</a> |
        <a href="/refund" className="mx-2 hover:underline">Refund Policy</a> |
        <a href="/contact" className="mx-2 hover:underline">اتصل بنا</a>
      </div>

    </div>
  );
}
