"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  ShieldAlert,
  Scale,
  AlertTriangle,
  LineChart,
  BarChart3,
  Pin,
  PinOff,
} from "lucide-react";

export default function AdvancedCalculatorsPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);

  const [activeTool, setActiveTool] = useState<
    "stoploss" | "position" | "risk" | "profitloss" | "average"
  >("stoploss");

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
        <LayoutDashboard className="w-6 h-6" />
        الحاسبات المتقدمة
      </h1>

      <div className="flex gap-6">

        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarExpanded ? "w-56" : "w-20"
          }`}
        >
          <div className="sticky top-4 h-fit bg-white/90 border border-slate-200 rounded-xl shadow-sm flex flex-col">

            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-purple-600" />
                {isSidebarExpanded && (
                  <span className="text-sm font-semibold text-slate-800">
                    الحاسبات المتقدمة
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  const nextPinned = !isSidebarPinned;
                  setIsSidebarPinned(nextPinned);
                  if (!nextPinned) setIsSidebarExpanded(false);
                  else setIsSidebarExpanded(true);
                }}
                className="p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                {isSidebarPinned ? (
                  <Pin className="w-4 h-4 text-slate-700" />
                ) : (
                  <PinOff className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>

            <div
              className="flex-1 py-2"
              onMouseEnter={() => !isSidebarPinned && setIsSidebarExpanded(true)}
              onMouseLeave={() => !isSidebarPinned && setIsSidebarExpanded(false)}
            >
              {[
                { id: "stoploss", label: "وقف الخسارة", icon: ShieldAlert },
                { id: "position", label: "حجم الصفقة", icon: Scale },
                { id: "risk", label: "نسبة المخاطرة", icon: AlertTriangle },
                { id: "profitloss", label: "الربح والخسارة", icon: LineChart },
                { id: "average", label: "متوسط السعر", icon: BarChart3 },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTool === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTool(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all ${
                      active
                        ? "bg-purple-50 text-purple-700 border-r-4 border-purple-500"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-purple-600" : "text-slate-500"
                      }`}
                    />
                    {isSidebarExpanded && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tools Area */}
        <div className="flex-1 max-h-[75vh] overflow-y-auto pr-1 space-y-8">

          <div
            className={`transition-all duration-300 rounded-xl ${
              activeTool === "stoploss"
                ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
                : "scale-100"
            }`}
          >
            <div className="p-6 bg-white rounded-xl border">
              <h2 className="text-lg font-bold text-purple-700 mb-3">
                حاسبة وقف الخسارة
              </h2>
              <p className="text-slate-600">ضع كود الحاسبة هنا…</p>
            </div>
          </div>

          <div
            className={`transition-all duration-300 rounded-xl ${
              activeTool === "position"
                ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
                : "scale-100"
            }`}
          >
            <div className="p-6 bg-white rounded-xl border">
              <h2 className="text-lg font-bold text-purple-700 mb-3">
                حاسبة حجم الصفقة
              </h2>
              <p className="text-slate-600">ضع كود الحاسبة هنا…</p>
            </div>
          </div>

          <div
            className={`transition-all duration-300 rounded-xl ${
              activeTool === "risk"
                ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
                : "scale-100"
            }`}
          >
            <div className="p-6 bg-white rounded-xl border">
              <h2 className="text-lg font-bold text-purple-700 mb-3">
                حاسبة نسبة المخاطرة
              </h2>
              <p className="text-slate-600">ضع كود الحاسبة هنا…</p>
            </div>
          </div>

          <div
            className={`transition-all duration-300 rounded-xl ${
              activeTool === "profitloss"
                ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
                : "scale-100"
            }`}
          >
            <div className="p-6 bg-white rounded-xl border">
              <h2 className="text-lg font-bold text-purple-700 mb-3">
                حاسبة الربح والخسارة
              </h2>
              <p className="text-slate-600">ضع كود الحاسبة هنا…</p>
            </div>
          </div>

          <div
            className={`transition-all duration-300 rounded-xl ${
              activeTool === "average"
                ? "scale-[1.01] ring-2 ring-purple-400 shadow-md"
                : "scale-100"
            }`}
          >
            <div className="p-6 bg-white rounded-xl border">
              <h2 className="text-lg font-bold text-purple-700 mb-3">
                حاسبة متوسط السعر
              </h2>
              <p className="text-slate-600">ضع كود الحاسبة هنا…</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
