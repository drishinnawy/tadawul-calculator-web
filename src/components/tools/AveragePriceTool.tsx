import React, { useState, useMemo } from "react";
import { BarChart3 } from "lucide-react";

export default function AveragePriceTool() {
  const [firstPrice, setFirstPrice] = useState("");
  const [firstShares, setFirstShares] = useState("");
  const [secondPrice, setSecondPrice] = useState("");
  const [secondShares, setSecondShares] = useState("");

  const totalShares = useMemo(() => {
    const s1 = parseFloat(firstShares);
    const s2 = parseFloat(secondShares);

    const v1 = isNaN(s1) ? 0 : s1;
    const v2 = isNaN(s2) ? 0 : s2;

    return v1 + v2;
  }, [firstShares, secondShares]);

  const totalCost = useMemo(() => {
    const p1 = parseFloat(firstPrice);
    const s1 = parseFloat(firstShares);
    const p2 = parseFloat(secondPrice);
    const s2 = parseFloat(secondShares);

    const c1 = (isNaN(p1) || isNaN(s1)) ? 0 : p1 * s1;
    const c2 = (isNaN(p2) || isNaN(s2)) ? 0 : p2 * s2;

    return c1 + c2;
  }, [firstPrice, firstShares, secondPrice, secondShares]);

  const averagePrice = useMemo(() => {
    if (totalShares <= 0) return 0;
    return totalCost / totalShares;
  }, [totalCost, totalShares]);

  const format = (n: number) =>
    isNaN(n) ? "-" : n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm">
      <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        حاسبة متوسط السعر
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <h3 className="font-semibold text-slate-800 mb-1">الشراء الأول</h3>

          <div>
            <label className="block mb-1 text-slate-700">سعر الشراء الأول</label>
            <input
              type="number"
              value={firstPrice}
              onChange={(e) => setFirstPrice(e.target.value)}
              className="w-full p-2 border rounded bg-purple-50"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700">عدد الأسهم في الشراء الأول</label>
            <input
              type="number"
              value={firstShares}
              onChange={(e) => setFirstShares(e.target.value)}
              className="w-full p-2 border rounded bg-purple-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-slate-800 mb-1">الشراء الثاني</h3>

          <div>
            <label className="block mb-1 text-slate-700">سعر الشراء الثاني</label>
            <input
              type="number"
              value={secondPrice}
              onChange={(e) => setSecondPrice(e.target.value)}
              className="w-full p-2 border rounded bg-purple-50"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700">عدد الأسهم في الشراء الثاني</label>
            <input
              type="number"
              value={secondShares}
              onChange={(e) => setSecondShares(e.target.value)}
              className="w-full p-2 border rounded bg-purple-50"
            />
          </div>
        </div>

      </div>

      <div className="mt-6 space-y-3 text-slate-800">

        <div className="flex justify-between">
          <span>إجمالي عدد الأسهم:</span>
          <span className="font-bold text-blue-700">
            {format(totalShares)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>إجمالي التكلفة:</span>
          <span className="font-bold text-purple-700">
            {format(totalCost)} ر.س
          </span>
        </div>

        <div className="flex justify-between">
          <span>متوسط سعر السهم:</span>
          <span className="font-bold text-green-700">
            {format(averagePrice)} ر.س
          </span>
        </div>

      </div>
    </div>
  );
}

