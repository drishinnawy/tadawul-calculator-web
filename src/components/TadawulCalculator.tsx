"use client";
import React,{useState,useMemo}from"react";
import{Calculator,Info,BookOpen,ShieldCheck,ExternalLink,Repeat,PlusCircle,MinusCircle,Scale,TrendingUp,Sun,Moon}from"lucide-react";
import{Card,CardHeader,CardTitle,CardDescription,CardContent}from"@/components/ui/card";
import{Button}from"@/components/ui/button";
import{Input}from"@/components/ui/input";
import{Label}from"@/components/ui/label";
import{Tabs,TabsContent,TabsList,TabsTrigger}from"@/components/ui/tabs";
import{Alert,AlertDescription,AlertTitle}from"@/components/ui/alert";
import{Separator}from"@/components/ui/separator";

const Toast=({message,type}:{message:string;type:"success"|"error"|"info"})=>(
<div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm ${type==="success"?"bg-green-600":type==="error"?"bg-red-600":"bg-sky-600"}`}>{message}</div>
);

export default function TadawulCalculator(){
const[activeTab,setActiveTab]=useState("byAmount");
const[amount,setAmount]=useState("");
const[price,setPrice]=useState("");
const[shares,setShares]=useState("");
const[commission,setCommission]=useState("0.0015");
const[vat,setVat]=useState("15");
const[stockName,setStockName]=useState("");
const[purchases,setPurchases]=useState([{id:1,shares:"",price:""}]);
const[sellShares,setSellShares]=useState("");
const[sellPrice,setSellPrice]=useState("");
const[profitOrLoss,setProfitOrLoss]=useState(0);
const[netProceeds,setNetProceeds]=useState(0);
const[remainingShares,setRemainingShares]=useState(0);
const[remainingCost,setRemainingCost]=useState(0);
const[newAverageCost,setNewAverageCost]=useState(0);
const[totalProfitOrLoss,setTotalProfitOrLoss]=useState(0);
const[sellCommissionRate,setSellCommissionRate]=useState("0.00015");
const[theme,setTheme]=useState("mint");
const[toastMsg,setToastMsg]=useState<{message:string;type:"success"|"error"|"info"}|null>(null);

const showToast=(m:string,t:"success"|"error"|"info"="info")=>{
setToastMsg({message:m,type:t});
setTimeout(()=>setToastMsg(null),3000);
};

const themeClasses=theme==="mint"?"bg-gradient-to-br from-emerald-50 to-sky-50":"bg-gradient-to-br from-amber-50 to-beige-50";
const formatNumber=(n:number|string)=>isNaN(Number(n))?"-":Number(n).toLocaleString("ar-SA",{maximumFractionDigits:2});

const calculatedShares=useMemo(()=>{
if(activeTab==="byAmount"&&amount&&price){
const a=parseFloat(amount),p=parseFloat(price),c=parseFloat(commission),v=parseFloat(vat)/100;
return Math.floor((a-a*c*(1+v))/p);
}else if(activeTab==="byShares"&&shares&&price)return parseFloat(shares);
return 0;
},[activeTab,amount,price,shares,commission,vat]);

const calculatedCost=useMemo(()=>{
if(price&&calculatedShares){
const p=parseFloat(price),c=parseFloat(commission),v=parseFloat(vat)/100;
const base=p*calculatedShares;
return base+base*c*(1+v);
}
return 0;
},[price,calculatedShares,commission,vat]);

const averagePriceWithFees=useMemo(()=>calculatedShares&&price?calculatedCost/calculatedShares:0,[calculatedCost,calculatedShares]);

const totalShares=purchases.reduce((s,p)=>s+Number(p.shares||0),0);
const totalCost=purchases.reduce((s,p)=>s+Number(p.shares||0)*Number(p.price||0),0);
const averagePrice=totalShares?totalCost/totalShares:0;

const handlePurchaseChange=(id:number,f:string,v:string)=>setPurchases(purchases.map(p=>p.id===id?{...p,[f]:v}:p));
const handleAddNewPurchase=()=>setPurchases([...purchases,{id:Date.now(),shares:"",price:""}]);
const handleRemovePurchase=(id:number)=>setPurchases(purchases.filter(p=>p.id!==id));

const handleShariaCheck=()=>{
if(!stockName.trim())return showToast("يرجى إدخال اسم السهم أو رمزه للتحقق.","error");
window.open("https://www.argaam.com/ar/company/shariahcompanies/3//3","_blank");
};

const handleSellCalculation=()=>{
const ss=parseFloat(sellShares),sp=parseFloat(sellPrice),rate=parseFloat(sellCommissionRate||"0.00015");
if(isNaN(ss)||ss<=0)return showToast("الكمية غير صالحة.","error");
if(ss>totalShares)return showToast("لا يمكنك بيع أكثر من إجمالي الأسهم.","error");

const sellValue=ss*sp,sellCommission=sellValue*rate,netSell=sellValue-sellCommission;
const avgBuyPrice=totalShares?totalCost/totalShares:0;
const avgCostOfSold=avgBuyPrice*ss;
const realizedPL=netSell-avgCostOfSold;

const newRemainingShares=totalShares-ss;
const newRemainingCost=totalCost-avgCostOfSold;
const newAvg=newRemainingShares>0?(newRemainingCost+sellCommission)/newRemainingShares:0;

setNetProceeds(netSell);
setProfitOrLoss(realizedPL);
setRemainingShares(newRemainingShares);
setRemainingCost(newRemainingCost);
setNewAverageCost(newAvg);
setTotalProfitOrLoss(realizedPL);
};

const handleClearAll=()=>{
setAmount("");setPrice("");setShares("");
setPurchases([{id:1,shares:"",price:""}]);
setSellShares("");setSellPrice("");
setNetProceeds(0);setProfitOrLoss(0);
setRemainingShares(0);setRemainingCost(0);
showToast("تم مسح جميع البيانات بنجاح","success");
};

return(
<div className={`p-6 rounded-2xl ${themeClasses}`}>
{toastMsg&&<Toast message={toastMsg.message} type={toastMsg.type}/>}

{/* شريط الإعدادات الملون */}
<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 rounded-xl shadow-lg border border-gray-200 bg-gradient-to-r from-emerald-50 via-pink-50 to-purple-50">

  {/* الثيم */}
  <div className="flex items-center gap-3 order-1 md:order-none">
    <span className="text-sm font-semibold text-gray-800">الثيم:</span>

    <button
      onClick={() => setTheme("mint")}
      className={`w-7 h-7 rounded-full shadow-md transition-all ${
        theme === "mint"
          ? "ring-2 ring-emerald-500 bg-emerald-300"
          : "bg-emerald-200 hover:bg-emerald-300"
      }`}
    ></button>

    <button
      onClick={() => setTheme("pink")}
      className={`w-7 h-7 rounded-full shadow-md transition-all ${
        theme === "pink"
          ? "ring-2 ring-pink-500 bg-pink-300"
          : "bg-pink-200 hover:bg-pink-300"
      }`}
    ></button>

    <button
      onClick={() => setTheme("purple")}
      className={`w-7 h-7 rounded-full shadow-md transition-all ${
        theme === "purple"
          ? "ring-2 ring-purple-500 bg-purple-300"
          : "bg-purple-200 hover:bg-purple-300"
      }`}
    ></button>
  </div>

  {/* النص */}
  <p className="text-xs md:text-sm font-medium text-gray-700 text-center leading-relaxed flex-1">
    عمولة المنصة يمكن تعديلها حسب المنصة المستخدمة، والحاسبة تضيفها لتوحيد النتائج
  </p>

  {/* عمولة المنصة */}
  <div className="flex items-center gap-2 order-2 md:order-none">
    <span className="text-sm font-semibold text-gray-800">عمولة المنصة:</span>
    <Input
      type="number"
      step="0.00001"
      placeholder="0.00015"
      value={sellCommissionRate}
      onChange={(e) => setSellCommissionRate(e.target.value)}
      className="w-28 h-9 text-sm"
    />
  </div>

</div>

    <button
      onClick={() => setTheme("mint")}
      className={`w-7 h-7 rounded-full shadow-md transition-all ${
        theme === "mint"
          ? "ring-2 ring-emerald-500 bg-emerald-300"
          : "bg-emerald-200 hover:bg-emerald-300"
      }`}
    ></button>

    <button
      onClick={() => setTheme("pink")}
      className={`w-7 h-7 rounded-full shadow-md transition-all ${
        theme === "pink"
          ? "ring-2 ring-pink-500 bg-pink-300"
          : "bg-pink-200 hover:bg-pink-300"
      }`}
    ></button>

    <button
      onClick={() => setTheme("purple")}
      className={`w-7 h-7 rounded-full shadow-md transition-all ${
        theme === "purple"
          ? "ring-2 ring-purple-500 bg-purple-300"
          : "bg-purple-200 hover:bg-purple-300"
      }`}
    ></button>
  </div>

  {/* النص */}
  <p className="text-xs md:text-sm font-medium text-gray-700 text-center leading-relaxed flex-1">
    عمولة المنصة يمكن تعديلها حسب المنصة المستخدمة، والحاسبة تضيفها لتوحيد النتائج
  </p>

  {/* عمولة المنصة */}
  <div className="flex items-center gap-2 order-2 md:order-none">
    <span className="text-sm font-semibold text-gray-800">عمولة المنصة:</span>
    <Input
      type="number"
      step="0.00001"
      placeholder="0.00015"
      value={sellCommissionRate}
      onChange={(e) => setSellCommissionRate(e.target.value)}
      className="w-28 h-9 text-sm"
    />
  </div>

</div>

{/* شريط الإعدادات المحسّن */}
<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 bg-white/90 rounded-xl shadow-md border border-gray-300">

  {/* الثيم */}
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium text-gray-800">الثيم:</span>

    <button
      onClick={() => setTheme("mint")}
      className={`w-6 h-6 rounded-full shadow-sm transition-all ${
        theme === "mint"
          ? "ring-2 ring-emerald-500 bg-emerald-300"
          : "bg-emerald-200 hover:bg-emerald-300"
      }`}
    ></button>

    <button
      onClick={() => setTheme("pink")}
      className={`w-6 h-6 rounded-full shadow-sm transition-all ${
        theme === "pink"
          ? "ring-2 ring-pink-500 bg-pink-300"
          : "bg-pink-200 hover:bg-pink-300"
      }`}
    ></button>

    <button
      onClick={() => setTheme("purple")}
      className={`w-6 h-6 rounded-full shadow-sm transition-all ${
        theme === "purple"
          ? "ring-2 ring-purple-500 bg-purple-300"
          : "bg-purple-200 hover:bg-purple-300"
      }`}
    ></button>
  </div>

  {/* النص */}
  <p className="text-xs md:text-sm text-gray-700 text-center leading-relaxed">
    عمولة المنصة يمكن تعديلها حسب المنصة المستخدمة، والحاسبة تضيفها لتوحيد النتائج
  </p>

  {/* عمولة المنصة */}
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-800">عمولة المنصة:</span>
    <Input
      type="number"
      step="0.00001"
      placeholder="0.00015"
      value={sellCommissionRate}
      onChange={(e) => setSellCommissionRate(e.target.value)}
      className="w-28 h-9 text-sm"
    />
  </div>

</div>

<Card className="mb-6 bg-white/80 shadow-md border border-emerald-100">
<CardHeader><CardTitle className="flex items-center gap-2 text-emerald-700"><Calculator/> حاسبة الصفقة الرئيسية</CardTitle></CardHeader>
<CardContent>
<Tabs value={activeTab} onValueChange={setActiveTab}>
<TabsList className="grid grid-cols-2"><TabsTrigger value="byAmount">حسب المبلغ</TabsTrigger><TabsTrigger value="byShares">حسب عدد الأسهم</TabsTrigger></TabsList>
<TabsContent value="byAmount" className="pt-4"><div className="grid md:grid-cols-2 gap-4"><div><Label>مبلغ الصفقة</Label><Input type="number" value={amount} onChange={e=>setAmount(e.target.value)}/></div><div><Label>سعر السهم</Label><Input type="number" value={price} onChange={e=>setPrice(e.target.value)}/></div></div></TabsContent>
<TabsContent value="byShares" className="pt-4"><div className="grid md:grid-cols-2 gap-4"><div><Label>عدد الأسهم</Label><Input type="number" value={shares} onChange={e=>setShares(e.target.value)}/></div><div><Label>سعر السهم</Label><Input type="number" value={price} onChange={e=>setPrice(e.target.value)}/></div></div></TabsContent>
</Tabs>

<Separator className="my-4"/>

<div className="grid md:grid-cols-3 gap-4 text-center">
<div className="bg-emerald-50 p-3 rounded-lg"><p>عدد الأسهم</p><p className="font-bold text-emerald-700">{formatNumber(calculatedShares)}</p></div>
<div className="bg-emerald-50 p-3 rounded-lg"><p>التكلفة الإجمالية</p><p className="font-bold text-emerald-700">{formatNumber(calculatedCost)} ر.س</p></div>
<div className="bg-emerald-50 p-3 rounded-lg"><p>متوسط السهم بعد العمولة</p><p className="font-bold text-emerald-700">{formatNumber(averagePriceWithFees)} ر.س</p></div>
</div>
</CardContent>
</Card>

<div className="grid md:grid-cols-3 gap-6">
<Card className="bg-gradient-to-br from-sky-50 to-white shadow-sm border">
<CardHeader><CardTitle className="flex items-center gap-2 text-sky-700"><BookOpen/> أدوات السهم</CardTitle></CardHeader>
<CardContent className="space-y-3">
<Input placeholder="اسم السهم أو رمزه" value={stockName} onChange={e=>setStockName(e.target.value)}/>
<Button onClick={handleShariaCheck} className="w-full bg-sky-600 hover:bg-sky-700"><ShieldCheck className="mr-2 h-4 w-4"/> التحقق من الشرعية</Button>
<Button variant="outline" asChild className="w-full"><a href="https://trynaqua.com/calculator" target="_blank"><ExternalLink className="mr-2 h-4 w-4"/> صفحة التطهير</a></Button>
<Button variant="outline" asChild className="w-full"><a href="https://www.tickerchart.net/app/ar" target="_blank"><ExternalLink className="mr-2 h-4 w-4"/> تكرتشارت</a></Button>
<Button variant="outline" asChild className="w-full"><a href="https://ar.tradingview.com/" target="_blank"><ExternalLink className="mr-2 h-4 w-4"/> تريدينج فيو</a></Button>
</CardContent>
</Card>

<Card className="lg:col-span-2 bg-white/80 shadow-md border border-emerald-100">
<CardHeader><CardTitle className="flex items-center gap-2 text-emerald-700"><Repeat/> حاسبة متوسط التكلفة</CardTitle></CardHeader>
<CardContent>
{purchases.map(p=>(
<div key={p.id} className="flex gap-2 mb-2">
<Input type="number" placeholder="عدد الأسهم" value={p.shares} onChange={e=>handlePurchaseChange(p.id,"shares",e.target.value)}/>
<Input type="number" placeholder="سعر الشراء" value={p.price} onChange={e=>handlePurchaseChange(p.id,"price",e.target.value)}/>
<Button variant="ghost" size="icon" onClick={()=>handleRemovePurchase(p.id)}><MinusCircle className="text-red-500"/></Button>
</div>
))}
<Button variant="outline" size="sm" onClick={handleAddNewPurchase} className="mt-2"><PlusCircle className="mr-2 h-4 w-4"/> إضافة عملية شراء</Button>

<Alert variant="default" className="mt-4 bg-emerald-50 border-emerald-200">
<Info className="h-5 w-5"/>
<AlertTitle className="text-emerald-700">النتائج</AlertTitle>
<AlertDescription className="space-y-2">
<div className="flex justify-between"><span>إجمالي الأسهم:</span><span>{formatNumber(totalShares)}</span></div>
<div className="flex justify-between"><span>متوسط سعر السهم:</span><span>{formatNumber(averagePrice)} ر.س</span></div>
<div className="flex justify-between"><span>إجمالي التكلفة:</span><span>{formatNumber(totalCost)} ر.س</span></div>
</AlertDescription>
</Alert>
</CardContent>
</Card>
</div>

<Card className="mt-6 bg-white/80 shadow-md border border-amber-100">
<CardHeader><CardTitle className="flex items-center gap-2 text-amber-700"><Scale/> حاسبة البيع الجزئي</CardTitle></CardHeader>
<CardContent>
<div className="grid md:grid-cols-2 gap-4">
<Input type="number" placeholder="عدد أسهم البيع" value={sellShares} onChange={e=>setSellShares(e.target.value)}/>
<Input type="number" placeholder="سعر البيع" value={sellPrice} onChange={e=>setSellPrice(e.target.value)}/>
</div>

<div className="flex gap-2 mt-3">
{[5,10,25,50,100].map(p=>(
<Button key={p} variant="outline" onClick={()=>setSellShares(Math.floor((totalShares*p)/100).toString())}>{p}%</Button>
))}
</div>

<Input type="number" placeholder="أدخل نسبة البيع %" className="mt-3" onChange={e=>{
const v=parseFloat(e.target.value);
if(!isNaN(v))setSellShares(Math.floor((totalShares*v)/100).toString());
}}/>

<Button onClick={handleSellCalculation} className="mt-4 bg-amber-500 hover:bg-amber-600 text-white">احسب</Button>

<Alert className="mt-4" variant={profitOrLoss>=0?"default":"destructive"}>
<AlertTitle>النتائج</AlertTitle>
<AlertDescription className="space-y-2">
<div className="flex justify-between"><span>صافي البيع:</span><span className="font-bold text-primary">{formatNumber(netProceeds)} ر.س</span></div>
<div className="flex justify-between"><span>إجمالي الربح / الخسارة:</span><span className={`font-bold ${profitOrLoss>0?"text-green-600":profitOrLoss<0?"text-red-600":"text-gray-600"}`}>{formatNumber(profitOrLoss)} ر.س</span></div>
</AlertDescription>
</Alert>

<Card className="mt-6 bg-white/80 shadow-md border border-blue-100">
<CardHeader><CardTitle className="flex items-center gap-2 text-blue-700"><TrendingUp/> نظرة شاملة على محفظتك</CardTitle></CardHeader>
<CardContent className="space-y-3">
<div className="flex justify-between"><span>الأسهم المتبقية:</span><span className="font-bold">{formatNumber(remainingShares)}</span></div>
<div className="flex justify-between"><span>التكلفة المتبقية:</span><span className="font-bold">{formatNumber(remainingCost)} ر.س</span></div>
<div className="flex justify-between"><span>متوسط التكلفة الجديد:</span><span className="font-bold">{formatNumber(newAverageCost)} ر.س</span></div>
<div className="flex justify-between"><span>الربح / الخسارة الكلي:</span><span className={`font-bold ${totalProfitOrLoss>0?"text-green-600":totalProfitOrLoss<0?"text-red-600":"text-gray-600"}`}>{formatNumber(totalProfitOrLoss)} ر.س</span></div>
</CardContent>
</Card>

</CardContent>
</Card>

<div className="mt-6 flex justify-center">
<Button onClick={handleClearAll} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">مسح جميع البيانات</Button>
</div>

<div className="mt-10 text-center text-sm text-gray-600">
<a href="/terms" className="mx-2 hover:underline">Terms of Service</a> |
<a href="/privacy" className="mx-2 hover:underline">Privacy Policy</a> |
<a href="/refund" className="mx-2 hover:underline">Refund Policy</a> |
<a href="/contact" className="mx-2 hover:underline">اتصل بنا</a>
</div>

</div>
);
}
