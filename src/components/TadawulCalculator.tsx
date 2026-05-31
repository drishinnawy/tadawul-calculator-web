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
  Trash2,
  Sun,
  Moon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

// ✅ Toast بديل بسيط مدمج داخل نفس الملف
const Toast = ({ message, type }: { message: string; type: "success" | "error" | "info" }) => (
  <div
    className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm ${
      type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-sky-600"
    }`}
  >
    {message}
  </div>
);

export default function TadawulCalculator() {
  const [activeTab, setActiveTab] = useState("byAmount");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [shares, setShares] = useState("");
  const [commission, setCommission] = useState("0.0015");
  const [vat, setVat] = useState("15");
  const [stockName, setStockName] = useState("");
  const [purchases, setPurchases] = useState([{ id: 1, shares: "", price: "" }]);
  const [sellShares, setSellShares] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [netProceeds, setNetProceeds] = useState(0);
  const [remainingShares, setRemainingShares] = useState(0);
  const [remainingCost, setRemainingCost] = useState(0);
  const [theme, setTheme] = useState("mint");
  const [toastMsg, setToastMsg] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Roller داخل الحاسبة
  const features = [
    "حاسبة الصفقة",
    "حاسبة البيع",
    "حاسبة المتوسط",
    "نظرة شاملة على المحفظة",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % features.length),
      3000
    );
    return () => clearInterval(interval);
  }, [features.length]);

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const themeClasses =
    theme === "mint"
      ? "bg-gradient-to-br from-emerald-50 to-sky-50"
      : "bg-gradient-to-br from-amber-50 to-beige-50";

  const formatNumber = (num: number | string) =>
    isNaN(Number(num)) ? "-" : Number(num).toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  const calculatedShares = useMemo(() => {
    if (activeTab === "byAmount" && amount && price) {
      const a = parseFloat(amount);
      const p = parseFloat(price);
      const c = parseFloat(commission);
      const v = parseFloat(vat) / 100;
      const totalFees = a * c * (1 + v);
      return Math.floor((a - totalFees) / p);
    } else if (activeTab === "byShares" && shares && price) {
      return parseFloat(shares);
    }
    return 0;
  }, [activeTab, amount, price, shares, commission, vat]);

  const calculatedCost = useMemo(() => {
    if (price && calculatedShares) {
      const p = parseFloat(price);
      const c = parseFloat(commission);
      const v = parseFloat(vat) / 100;
      const base = p * calculatedShares;
      const fees = base * c * (1 + v);
      return base + fees;
    }
    return 0;
  }, [price, calculatedShares, commission, vat]);

  const averagePriceWithFees = useMemo(() => {
    if (calculatedShares && price) {
      return calculatedCost / calculatedShares;
    }
    return 0;
  }, [calculatedCost, calculatedShares]);

  const totalShares = purchases.reduce((sum, p) => sum + Number(p.shares || 0), 0);
  const totalCost = purchases.reduce(
    (sum, p) => sum + Number(p.shares || 0) * Number(p.price || 0),
    0
  );
  const averagePrice = totalShares ? totalCost / totalShares : 0;

  const handlePurchaseChange = (id: number, field: string, value: string) => {
    setPurchases(purchases.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleAddNewPurchase = () => {
    setPurchases([...purchases, { id: Date.now(), shares: "", price: "" }]);
  };

  const handleRemovePurchase = (id: number) => {
    setPurchases(purchases.filter((p) => p.id !== id));
  };

  const handleShariaCheck = () => {
    if (!stockName.trim()) {
      showToast("يرجى إدخال اسم السهم أو رمزه للتحقق.", "error");
      return;
    }
    window.open("https://www.argaam.com/ar/company/shariahcompanies/3//3", "_blank");
  };

  // ✅ تعديل حاسبة البيع لتستخدم الصفقة أو المتوسط
  const handleSellCalculation = () => {
    const ss = parseFloat(sellShares);
    const sp = parseFloat(sellPrice);
    const c = parseFloat(commission);
    const v = parseFloat(vat);

    const effectiveShares = totalShares > 0 ? totalShares : calculatedShares;
    const effectiveAveragePrice = totalShares > 0 ? averagePrice : averagePriceWithFees;

    if (isNaN(ss) || ss <= 0 || ss > effectiveShares) {
      showToast("الكمية غير صالحة أو أكبر من إجمالي الأسهم.", "error");
      return;
    }

    const proceeds = ss * sp;
    const fees = proceeds * c * (1 + v / 100);
    const net = proceeds - fees;
    const avgCost = effectiveAveragePrice * ss;
    const profit = net - avgCost;

    setNetProceeds(net);
    setProfitOrLoss(profit);
    const remainingS = effectiveShares - ss;
    const remainingC = effectiveShares * effectiveAveragePrice - avgCost;
    setRemainingShares(remainingS);
    setRemainingCost(remainingC);
  };

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

  return (
    <div className={`p-6 rounded-2xl ${themeClasses}`}>
      {toastMsg && <Toast message={toastMsg.message} type={toastMsg.type} />}

      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => setTheme(theme === "mint" ? "royal" : "mint")}
          className="flex items-center gap-2"
        >
          {theme === "mint" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          تبديل الثيم
        </Button>
      </div>

      {/* Roller */}
      <div
        style={{
          overflow: "hidden",
          height: "36px",
          width: "100%",
          maxWidth: "300px",
          margin: "15px auto",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.35)",
          border: "1px solid rgba(255,255,255,0.4)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold",
          direction: "rtl",
          color: "black",
          mixBlendMode: "normal",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            transform: `translateY(-${currentIndex * 36}px)`,
            transition: "transform 0.6s ease-in-out",
          }}
        >
          {features.map((text, idx) => (
            <div
              key={idx}
              style={{
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* حاسبة الصفقة */}
      <Card className="mb-6 bg-white/80 shadow-md border border-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Calculator /> حاسبة الصفقة الرئيسية
          </CardTitle>
          <CardDescription>احسب تكلفة صفقتك أو عدد الأسهم</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="byAmount">حسب المبلغ</TabsTrigger>
              <TabsTrigger value="byShares">حسب عدد الأسهم</TabsTrigger>
            </TabsList>

            <TabsContent value="byAmount" className="space-y-4 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>مبلغ الصفقة (ر.س)</Label>
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

            <TabsContent value="byShares" className="space-y-4 pt-4">
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
            <div className="bg-emerald-50 p-3 rounded-lg">
              <p>عدد الأسهم</p>
              <p className="font-bold text-emerald-700">
                {formatNumber(calculatedShares)}
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <p>التكلفة الإجمالية</p>
              <p className="font-bold text-emerald-700">
                {formatNumber(calculatedCost)} ر.س
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <p>متوسط السهم بعد العمولة</p>
              <p className="font-bold text-emerald-700">
                {formatNumber(averagePriceWithFees)} ر.س
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* أدوات السهم + حاسبة المتوسط */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* أدوات السهم */}
        <Card className="bg-gradient-to-br from-sky-50 to-white shadow-sm border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sky-700">
              <BookOpen /> أدوات السهم
            </CardTitle>
            <CardDescription>تحقق من شرعية السهم وتابع تحليله</CardDescription>
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
              <ShieldCheck className="mr-2 h-4 w-4" /> التحقق من الشرعية في أرقام
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a
                href="https://trynaqua.com/calculator"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> صفحة تطهير الأسهم
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a
                href="https://www.tickerchart.net/app/ar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> تكرتشارت
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a
                href="https://ar.tradingview.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> تريدينج فيو
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* حاسبة المتوسط */}
        <Card className="lg:col-span-2 bg-white/80 shadow-md border border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Repeat /> حاسبة متوسط التكلفة
            </CardTitle>
            <CardDescription>أدخل عمليات الشراء المتعددة</CardDescription>
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

            <Alert variant="default" className="mt-4 bg-emerald-50 border-emerald-200">
              <Info className="h-5 w-5" />
              <AlertTitle className="text-emerald-700">النتائج</AlertTitle>
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

      {/* حاسبة البيع الجزئي */}
      <Card className="mt-6 bg-white/80 shadow-md border border-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <Scale /> حاسبة البيع الجزئي
          </CardTitle>
          <CardDescription>
            احسب الربح أو الخسارة عند بيع جزء من الأسهم
          </CardDescription>
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
          <Button
            onClick={handleSellCalculation}
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white"
          >
            احسب
          </Button>

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
                <span>الربح / الخسارة لكل سهم:</span>
                <span
                  className={`font-bold ${
                    profitOrLoss > 0
                      ? "text-green-600"
                      : profitOrLoss < 0
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {sellShares && parseFloat(sellShares) > 0
                    ? formatNumber(profitOrLoss / parseFloat(sellShares))
                    : "0"}{" "}
                  ر.س
                </span>
              </div>
              <div className="flex justify-between">
                <span>إجمالي الربح / الخسارة:</span>
                <span
                  className={`font-bold ${
                    profitOrLoss > 0
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
        </CardContent>
      </Card>

      {/* الخلاصة */}
      <Card className="shadow-lg mt-8 bg-white/80 border border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <TrendingUp /> الخلاصة المالية
          </CardTitle>
          <CardDescription>
            نظرة شاملة على محفظتك بعد الصفقات والبيع
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-4 text-center">
          <div className="border rounded-xl p-3 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-500">الأسهم المتبقية</p>
            <p className="text-xl font-bold text-primary">
              {remainingShares && remainingShares > 0
                ? formatNumber(remainingShares)
                : formatNumber(totalShares)}
            </p>
          </div>
          <div className="border rounded-xl p-3 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-500">المتوسط بعد البيع</p>
            <p className="text-xl font-bold text-primary">
              {remainingShares && remainingShares > 0
                ? formatNumber(remainingCost / remainingShares) + " ر.س"
                : totalShares > 0
                ? formatNumber(totalCost / totalShares) + " ر.س"
                : "0"}
            </p>
          </div>
          <div className="border rounded-xl p-3 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-500">إجمالي التكلفة</p>
            <p className="text-xl font-bold text-primary">
              {remainingCost && remainingCost > 0
                ? formatNumber(remainingCost) + " ر.س"
                : totalCost > 0
                ? formatNumber(totalCost) + " ر.س"
                : "0"}
            </p>
          </div>
          <div className="border rounded-xl p-3 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-500">صافي الأرباح / الخسائر</p>
            <p
              className={`text-xl font-bold ${
                profitOrLoss > 0
                  ? "text-green-600"
                  : profitOrLoss < 0
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {formatNumber(profitOrLoss)} ر.س
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Button variant="destructive" onClick={handleClearAll}>
          <Trash2 className="mr-2 h-4 w-4" /> مسح جميع الإدخالات
        </Button>
      </div>
    </div>
  );
}
