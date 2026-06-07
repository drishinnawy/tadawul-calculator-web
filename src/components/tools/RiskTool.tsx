import React, { useState, useMemo } from "react";
import { AlertTriangle } from "lucide-react";

export default function RiskTool() {
  const [capital, setCapital] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [shares, setShares] = useState("");

  const lossPerShare = useMemo(() => {
    const e = parseFloat(entryPrice);
    const sl = parseFloat(stopLossPrice);

    if (isNaN(e) || isNaN(sl) || e <= 0 || sl <= 0) return 0;

    return e - sl;
  }, [entryPrice, stopLossPrice]);

  const totalLoss = useMemo(() => {
    const lps = lossPerShare;
    const sh = parseFloat(shares);

    if (isNaN(sh) || sh <= 0) return 0;

    return lps * sh;
  }, [lossPerShare, shares]);

  const riskPercent = useMemo(() => {
    const c = parseFloat(capital);
    const tl = totalLoss;

    if (isNaN(c) || c <= 0 || tl <= 0) return 0;

    return (tl / c) * 100;
  }, [capital, totalLoss]);

  const format = (n: number) =>
    isNaN(n) ? "-" : n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm">
      <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        حاسبة نسبة المخاطرة
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 text-slate-700">رأس المال</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            className="w-full p-2 border rounded bg-yellow-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">سعر الدخول</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="w-full p-2 border rounded bg-yellow-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">سعر وقف الخسارة</label>
          <input
            type="number"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(e.target.value)}
            className="w-full p-2 border rounded bg-yellow-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">عدد الأسهم</label>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className="w-full p-2 border rounded bg-yellow-50"
          />
        </div>

      </div>

      <div className="mt-6 space-y-3 text-slate-800">

        <div className="flex justify-between">
          <span>الخسارة لكل سهم:</span>
          <span className="font-bold text-purple-700">
            {format(lossPerShare)} ر.س
          </span>
        </div>

        <div className="flex justify-between">
          <span>إجمالي الخسارة:</span>
          <span className="font-bold text-red-600">
            {format(totalLoss)} ر.س
          </span>
        </div>

        <div className="flex justify-between">
          <span>نسبة المخاطرة من رأس المال:</span>
          <span className="font-bold text-blue-700">
            {format(riskPercent)} %
          </span>
        </div>

      </div>
    </div>
  );
}
