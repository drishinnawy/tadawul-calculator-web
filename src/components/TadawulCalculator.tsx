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

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

/* ---------------- Toast ---------------- */

const Toast = ({ message, type }: { message: string; type: string }) => (
  <div
    className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm ${type === "success"
        ? "bg-green-600"
        : type === "error"
          ? "bg-red-600"
          : "bg-sky-600"
      }`}
  >
    {message}
  </div>
);

/* ---------------- الثيمات ---------------- */

const THEMES = {
  mint: {
    name: "Mint",
    bg: "linear-gradient(to bottom right, #e8fff5, #e9faff)",
    card: "rgba(255,255,255,0.9)",
    accent: "#0b7d5c",
    title: "#0b7d5c",
  },
  pink: {
    name: "Pink",
    bg: "linear-gradient(to bottom right, #ffe8f3, #fff0f6)",
    card: "rgba(255,255,255,0.92)",
    accent: "#cc2e72",
    title: "#cc2e72",
  },
  purple: {
    name: "Purple",
    bg: "linear-gradient(to bottom right, #f4eaff, #f7f2ff)",
    card: "rgba(255,255,255,0.94)",
    accent: "#7a4bc2",
    title: "#7a4bc2",
  },
};

export default function TadawulCalculator() {
  const [theme, setTheme] = useState<"mint" | "pink" | "purple">("mint");
  const t = THEMES[theme];

  /* ---------------- الحقول ---------------- */

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

  const [sellShares, setSellShares] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellCommissionRate, setSellCommissionRate] =
    useState("0.00015");

  const [netProceeds, setNetProceeds] = useState(0);
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [remainingShares, setRemainingShares] = useState(0);
  const [remainingCost, setRemainingCost] = useState(0);
  const [newAverageCost, setNewAverageCost] = useState(0);
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState(0);

  const [toastMsg, setToastMsg] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (m: string, t: "success" | "error" | "info" = "info") => {
    setToastMsg({ message: m, type: t });
    setTimeout(() => setToastMsg(null), 3000);
  };

  /* ---------------- الحسابات ---------------- */

  const formatNumber = (n) =>
    isNaN(Number(n))
      ? "-"
      : Number(n).toLocaleString("ar-SA", {
        maximumFractionDigits: 2,
      });

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

  const totalShares = purchases.reduce(
    (s, p) => s + Number(p.shares || 0),
    0
  );
  const totalCost = purchases.reduce(
    (s, p) => s + Number(p.shares || 0) * Number(p.price || 0),
    0
  );
  const averagePrice = totalShares ? totalCost / totalShares : 0;

  /* ---------------- واجهة الحاسبة — الجزء الأول ---------------- */

  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "20px",
        background: t.bg,
        transition: "0.3s",
      }}
    >
      {toastMsg && (
        <Toast message={toastMsg.message} type={toastMsg.type} />
      )}

      {/* زر الثيم */}
      <div className="flex justify-center mb-4 gap-4">
        <button
          onClick={() => setTheme("pink")}
          style={{ fontSize: "26px" }}
        >
          💗
        </button>
        <button
          onClick={() => setTheme("mint")}
          style={{ fontSize: "26px" }}
        >
          🌿
        </button>
        <button
          onClick={() => setTheme("purple")}
          style={{ fontSize: "26px" }}
        >
          💜
        </button>
      </div>

      {/* إعدادات عامة */}
      <Card
        className="mb-6 shadow-md border border-blue-200"
        style={{ background: t.card }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-2"
            style={{ color: t.title }}
          >
            <Info /> إعدادات عامة
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            يمكنك تعديل نسبة عمولة البيع حسب منصتك.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label>نسبة عمولة البيع (تداول)</Label>
          <Input
            type="number"
            step="0.00001"
            value={sellCommissionRate}
            onChange={(e) => setSellCommissionRate(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* حاسبة الصفقة */}
      <Card
        className="mb-6 shadow-md border border-emerald-100"
        style={{ background: t.card }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-2"
            style={{ color: t.title }}
          >
            <Calculator /> حاسبة الصفقة الرئيسية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="byAmount">حسب المبلغ</TabsTrigger>
              <TabsTrigger value="byShares">حسب عدد الأسهم</TabsTrigger>
            </TabsList>

            <TabsContent value="byAmount" className="pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>مبلغ الصفقة</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label>سعر السهم</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="byShares" className="pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>عدد الأسهم</Label>
                  <Input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                  />
                </div>
                <div>
                  <Label>سعر السهم</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg" style={{ background: t.bg }}>
              <p>عدد الأسهم</p>
              <p className="font-bold" style={{ color: t.accent }}>
                {formatNumber(calculatedShares)}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: t.bg }}>
              <p>التكلفة الإجمالية</p>
              <p className="font-bold" style={{ color: t.accent }}>
                {formatNumber(calculatedCost)} ر.س
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: t.bg }}>
              <p>متوسط السهم بعد العمولة</p>
              <p className="font-bold" style={{ color: t.accent }}>
                {formatNumber(averagePriceWithFees)} ر.س
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* روابط مفيدة + متوسط التكلفة */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* روابط مفيدة */}
        <Card
          className="shadow-sm border"
          style={{ background: t.card }}
        >
          <CardHeader>
            <CardTitle
              className="flex items-center gap-2"
              style={{ color: t.title }}
            >
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
              className="w-full"
              style={{ background: t.accent, color: "white" }}
            >
              <ShieldCheck className="mr-2 h-4 w-4" /> التحقق من الشرعية
            </Button>

            <Button variant="outline" asChild className="w-full">
              <a
                href="https://trynaqua.com/calculator"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> صفحة التطهير
              </a>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <a
                href="https://www.tickerchart.net/app/ar"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> تكرتشارت
              </a>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <a
                href="https://ar.tradingview.com/"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> تريدينج فيو
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* متوسط التكلفة */}
        <Card
          className="lg:col-span-2 shadow-md border border-emerald-100"
          style={{ background: t.card }}
        >
          <CardHeader>
            <CardTitle
              className="flex items-center gap-2"
              style={{ color: t.title }}
            >
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
              className="mt-4"
              style={{ background: t.bg }}
            >
              <Info className="h-5 w-5" />

              <AlertTitle style={{ color: t.title }}>النتائج</AlertTitle>

              <AlertDescription className="space-y-2">
                <div className="flex justify-between">
                  <span>إجمالي الأسهم:</span>
                  <span>{formatNumber(totalShares)}</span>
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

      {/* البيع الجزئي */}
      <Card
        className="mt-6 shadow-md border border-amber-100"
        style={{ background: t.card }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center gap-2"
            style={{ color: t.title }}
          >
            <Scale /> حاسبة البيع الجزئي
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="عدد أسهم البيع"
              value={sellShares}
              onChange={(e) => setSellShares(e.target.value)}
            />

            <Input
              type="number"
              placeholder="سعر البيع"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
          </div>

          {/* أزرار النسب */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {[5, 10, 25, 50, 100].map((p) => (
              <Button
                key={p}
                variant="outline"
                onClick={() =>
                  setSellShares(
                    Math.floor((totalShares * p) / 100).toString()
                  )
                }
              >
                {p}%
              </Button>
            ))}
          </div>

          {/* إدخال نسبة مخصصة */}
          <Input
            type="number"
            placeholder="أدخل نسبة البيع %"
            className="mt-3"
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v))
                setSellShares(
                  Math.floor((totalShares * v) / 100).toString()
                );
            }}
          />

          <Button
            onClick={handleSellCalculation}
            className="mt-4 text-white"
            style={{ background: t.accent }}
          >
            احسب
          </Button>

          {/* نتائج البيع */}
          <Alert
            className="mt-4"
            variant={profitOrLoss >= 0 ? "default" : "destructive"}
          >
            <AlertTitle>النتائج</AlertTitle>

            <AlertDescription className="space-y-2">
              <div className="flex justify-between">
                <span>صافي البيع:</span>
                <span className="font-bold text-primary">
                  {formatNumber(netProceeds)} ر.س
                </span>
              </div>

              <div className="flex justify-between">
                <span>إجمالي الربح / الخسارة:</span>
                <span
                  className={`font-bold ${profitOrLoss > 0
                      ? "text-green-600"
                      : profitOrLoss < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                >
                  {formatNumber(profitOrLoss)} ر.س
                </span>
              </div>
            </AlertDescription>
          </Alert>
</CardContent>   // ← هذا السطر كان مفقودًا

{/* نظرة شاملة على المحفظة */}
<Card
            className="mt-6 shadow-md border border-blue-100"
            style={{ background: t.card }}
          >
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2"
                style={{ color: t.title }}
              >
                <TrendingUp /> نظرة شاملة على محفظتك
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>الأسهم المتبقية:</span>
                <span className="font-bold">
                  {formatNumber(remainingShares)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>التكلفة المتبقية:</span>
                <span className="font-bold">
                  {formatNumber(remainingCost)} ر.س
                </span>
              </div>

              <div className="flex justify-between">
                <span>متوسط التكلفة الجديد:</span>
                <span className="font-bold">
                  {formatNumber(newAverageCost)} ر.س
                </span>
              </div>

              <div className="flex justify-between">
                <span>الربح / الخسارة الكلي:</span>
                <span
                  className={`font-bold ${totalProfitOrLoss > 0
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
          className="text-white px-6 py-2 rounded-lg"
          style={{ background: "#ef4444" }}
        >
          مسح جميع البيانات
        </Button>
      </div>

      {/* روابط أسفل الحاسبة */}
      <div className="mt-10 text-center text-sm text-gray-600">
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
