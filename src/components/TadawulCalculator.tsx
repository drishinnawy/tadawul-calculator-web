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

export default function TadawulCalculator() {
  // الحقول الأساسية
  const [activeTab, setActiveTab] = useState("byAmount");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [shares, setShares] = useState("");
  const [commission, setCommission] = useState("0.0015");
  const [vat, setVat] = useState("15");
  const [stockName, setStockName] = useState("");
  const [purchases, setPurchases] = useState([{ id: 1, shares: "", price: "" }]);

  // البيع الجزئي
  const [sellShares, setSellShares] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [netProceeds, setNetProceeds] = useState(0);
  const [remainingShares, setRemainingShares] = useState(0);
  const [remainingCost, setRemainingCost] = useState(0);
  const [newAverageCost, setNewAverageCost] = useState(0);
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState(0);
  const [sellCommissionRate, setSellCommissionRate] = useState("0.00015");

  // الثيم
  const [theme, setTheme] = useState<"mint" | "purple" | "sky">("mint");
  const themeClasses =
    theme === "mint"
      ? "bg-gradient-to-br from-emerald-50 to-sky-50"
      : theme === "purple"
      ? "bg-gradient-to-br from-purple-50 to-violet-100"
      : "bg-gradient-to-br from-sky-50 to-indigo-50";

  // Toast
  const [toastMsg, setToastMsg] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (m: string, t: "success" | "error" | "info" = "info") => {
    setToastMsg({ message: m, type: t });
    setTimeout(() => setToastMsg(null), 3000);
  };

  // تنسيق الأرقام
  const formatNumber = (n: number | string) =>
    isNaN(Number(n))
      ? "-"
      : Number(n).toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  // حسابات الشراء
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

  // متوسط التكلفة العام
  const totalSharesCalc = purchases.reduce(
    (s, p) => s + (parseFloat(p.shares) || 0),
    0
  );
  const totalCost = purchases.reduce(
    (s, p) =>
      s + (parseFloat(p.shares) || 0) * (parseFloat(p.price) || 0),
    0
  );
  const averagePrice = totalSharesCalc ? totalCost / totalSharesCalc : 0;

  // الربح لكل سهم
  const profitPerShare =
    sellPrice && averagePrice ? parseFloat(sellPrice) - averagePrice : 0;

  // دوال الشراء
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

  // التحقق الشرعي
  const handleShariaCheck = () => {
    if (!stockName || stockName.trim() === "")
      return showToast("يرجى إدخال اسم السهم أو رمزه للتحقق.", "error");
    window.open(
      "https://www.argaam.com/ar/company/shariahcompanies/3//3",
      "_blank"
    );
  };

  // حساب البيع
  const handleSellCalculation = () => {
    const ss = parseFloat(sellShares);
    const sp = parseFloat(sellPrice);
    const rate = parseFloat(sellCommissionRate || "0.00015");

    if (!totalSharesCalc || totalSharesCalc <= 0) {
      setNetProceeds(0);
      setProfitOrLoss(0);
      setRemainingShares(0);
      setRemainingCost(0);
      setNewAverageCost(0);
      setTotalProfitOrLoss(0);
      return;
    }

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
      newRemainingShares > 0 ? newRemainingCost / newRemainingShares : 0;

    setNetProceeds(netSell);
    setProfitOrLoss(realizedPL);
    setRemainingShares(newRemainingShares);
    setRemainingCost(newRemainingCost);
    setNewAverageCost(newAvg);
    setTotalProfitOrLoss(realizedPL);
  };

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

  // مسح البيانات
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
    setNewAverageCost(0);
    setTotalProfitOrLoss(0);
    showToast("تم مسح جميع البيانات بنجاح", "success");
  };

  // الواجهة
  return (
    <div className={`p-6 rounded-2xl ${themeClasses}`}>
      {toastMsg && (
        <Toast message={toastMsg.message} type={toastMsg.type} />
      )}

      {/* شريط الإعدادات */}
      <div className="mt-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 p-3 rounded-xl border border-purple-200 shadow-sm">
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

        <div className="text-center text-sm text-slate-700">
          بعض المنصات لا تضيف عمولة المنصة لكن الحاسبة تضيفها لتشمل جميع المنصات
        </div>

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
                        setPurchases([
                          { id: 1, shares: sh.toString(), price: pr.toString() },
                        ]);
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
                        setPurchases([
                          { id: 1, shares: sh.toString(), price: pr.toString() },
                        ]);
                      }
                    }}
                    className="text-slate-900 bg-yellow-50 border border-yellow-400"
                  />
                </div>
              </div>
            </TabsContent>

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
                        setPurchases([
                          { id: 1, shares: sh.toString(), price: pr.toString() },
                        ]);
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
                        setPurchases([
                          { id: 1, shares: sh.toString(), price: pr.toString() },
                        ]);
                      }
                    }}
                    className="text-slate-900 bg-yellow-50 border border-yellow-400"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

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
      </div>

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
        <a href="/terms" className="mx-2 hover:underline">
          Terms of Service
        </a>{" "}
        |
        <a href="/privacy" className="mx-2 hover:underline">
          Privacy Policy
        </a>{" "}
        |
        <a href="/refund" className="mx-2 hover:underline">
          Refund Policy
        </a>{" "}
        |
        <a href="/contact" className="mx-2 hover:underline">
          اتصل بنا
        </a>
      </div>
    </div>
  );
}
