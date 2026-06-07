import React, { useState, useMemo } from "react";
import { ShieldAlert } from "lucide-react";

export default function StopLossTool() {
  const [entryPrice, setEntryPrice] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [shares, setShares] = useState("");

  const stopLossPrice = useMemo(() => {
    const e = parseFloat(entryPrice);
    const r = parseFloat(riskPercent);

    if (isNaN(e) || isNaN(r) || e <= 0 || r <= 0) return 0;

    return e - e * (r / 100);
  }, [entryPrice, riskPercent]);

  const lossPerShare = useMemo(() => {
    const sl = stopLossPrice;
    const e = parseFloat(entryPrice);

    if (!sl || isNaN(e) || e <= 0) return 0;

    return e - sl;
  }, [stopLossPrice, entryPrice]);

  const totalLoss = useMemo(() => {
    const lps = lossPerShare;
    const sh = parseFloat(shares);

    if (isNaN(sh) || sh <= 0) return 0;

    return lps * sh;
  }, [lossPerShare, shares]);

  const format = (n: number) =>
    isNaN(n) ? "-" : n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm">
      <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
        <ShieldAlert className="w-5 h-5" />
        حاسبة وقف الخسارة
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="block mb-1 text-slate-700">سعر الدخول</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="w-full p-2 border rounded bg-purple-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">نسبة المخاطرة %</label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            className="w-full p-2 border rounded bg-purple-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">عدد الأسهم (اختياري)</label>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className="w-full p-2 border rounded bg-purple-50"
          />
        </div>

      </div>

      <div className="mt-6 space-y-3 text-slate-800">

        <div className="flex justify-between">
          <span>سعر وقف الخسارة:</span>
          <span className="font-bold text-purple-700">
            {format(stopLossPrice)} ر.س
          </span>
        </div>

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

      </div>
    </div>
  );
}
