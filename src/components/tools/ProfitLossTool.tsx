import React, { useState, useMemo } from "react";
import { LineChart } from "lucide-react";

export default function ProfitLossTool() {
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [shares, setShares] = useState("");

  const profitPerShare = useMemo(() => {
    const e = parseFloat(entryPrice);
    const x = parseFloat(exitPrice);

    if (isNaN(e) || isNaN(x) || e <= 0 || x <= 0) return 0;

    return x - e;
  }, [entryPrice, exitPrice]);

  const totalProfit = useMemo(() => {
    const pps = profitPerShare;
    const sh = parseFloat(shares);

    if (isNaN(sh) || sh <= 0) return 0;

    return pps * sh;
  }, [profitPerShare, shares]);

  const profitPercent = useMemo(() => {
    const e = parseFloat(entryPrice);
    const pps = profitPerShare;

    if (isNaN(e) || e <= 0) return 0;

    return (pps / e) * 100;
  }, [profitPerShare, entryPrice]);

  const format = (n: number) =>
    isNaN(n) ? "-" : n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm">
      <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
        <LineChart className="w-5 h-5" />
        حاسبة الربح والخسارة
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="block mb-1 text-slate-700">سعر الدخول</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="w-full p-2 border rounded bg-green-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">سعر الخروج</label>
          <input
            type="number"
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
            className="w-full p-2 border rounded bg-green-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">عدد الأسهم</label>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className="w-full p-2 border rounded bg-green-50"
          />
        </div>

      </div>

      <div className="mt-6 space-y-3 text-slate-800">

        <div className="flex justify-between">
          <span>الربح/الخسارة لكل سهم:</span>
          <span
            className={`font-bold ${
              profitPerShare >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {format(profitPerShare)} ر.س
          </span>
        </div>

        <div className="flex justify-between">
          <span>إجمالي الربح/الخسارة:</span>
          <span
            className={`font-bold ${
              totalProfit >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {format(totalProfit)} ر.س
          </span>
        </div>

        <div className="flex justify-between">
          <span>نسبة الربح/الخسارة:</span>
          <span
            className={`font-bold ${
              profitPercent >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {format(profitPercent)} %
          </span>
        </div>

      </div>
    </div>
  );
}
