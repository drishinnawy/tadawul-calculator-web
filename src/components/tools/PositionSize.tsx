import React, { useState, useMemo } from "react";
import { Scale } from "lucide-react";

export default function PositionSizeTool() {
  const [capital, setCapital] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");

  const riskAmount = useMemo(() => {
    const c = parseFloat(capital);
    const r = parseFloat(riskPercent);

    if (isNaN(c) || isNaN(r) || c <= 0 || r <= 0) return 0;

    return c * (r / 100);
  }, [capital, riskPercent]);

  const lossPerShare = useMemo(() => {
    const e = parseFloat(entryPrice);
    const sl = parseFloat(stopLossPrice);

    if (isNaN(e) || isNaN(sl) || e <= 0 || sl <= 0) return 0;

    return e - sl;
  }, [entryPrice, stopLossPrice]);

  const shares = useMemo(() => {
    const r = riskAmount;
    const lps = lossPerShare;

    if (lps <= 0 || r <= 0) return 0;

    return Math.floor(r / lps);
  }, [riskAmount, lossPerShare]);

  const positionValue = useMemo(() => {
    const e = parseFloat(entryPrice);
    if (isNaN(e) || e <= 0) return 0;

    return shares * e;
  }, [shares, entryPrice]);

  const format = (n: number) =>
    isNaN(n) ? "-" : n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm">
      <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
        <Scale className="w-5 h-5" />
        حاسبة حجم الصفقة
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 text-slate-700">رأس المال</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            className="w-full p-2 border rounded bg-blue-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">نسبة المخاطرة %</label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            className="w-full p-2 border rounded bg-blue-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">سعر الدخول</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="w-full p-2 border rounded bg-blue-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">سعر وقف الخسارة</label>
          <input
            type="number"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(e.target.value)}
            className="w-full p-2 border rounded bg-blue-50"
          />
        </div>

      </div>

      <div className="mt-6 space-y-3 text-slate-800">

        <div className="flex justify-between">
          <span>قيمة المخاطرة:</span>
          <span className="font-bold text-purple-700">
            {format(riskAmount)} ر.س
          </span>
        </div>

        <div className="flex justify-between">
          <span>الخسارة لكل سهم:</span>
          <span className="font-bold text-purple-700">
            {format(lossPerShare)} ر.س
          </span>
        </div>

        <div className="flex justify-between">
          <span>عدد الأسهم المناسب:</span>
          <span className="font-bold text-green-600">
            {format(shares)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>قيمة الصفقة:</span>
          <span className="font-bold text-blue-700">
            {format(positionValue)} ر.س
          </span>
        </div>

      </div>
    </div>
  );
}
