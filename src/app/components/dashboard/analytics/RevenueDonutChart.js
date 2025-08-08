"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { analyticsTranslations } from "@/lib/translations/pages/analytics";
import { useCallback } from "react";

export default function RevenueDonutChart({ revenueBySource }) {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      analyticsTranslations[key]?.[language] ||
      analyticsTranslations[key]?.en ||
      key,
    [language]
  );

  return (
    <div className="glass border border-white/20 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">{t("revenueBySource")}</h3>
      </div>
      
      {/* Simple Donut Chart Placeholder */}
      <div className="w-[200px] h-[200px] mx-auto mb-5 relative">
        <div className="absolute inset-0 rounded-full border-[20px] border-white/10"></div>
        <div className="absolute inset-0 rounded-full border-[20px] border-transparent"
             style={{
               borderTopColor: "#667eea",
               borderRightColor: "#764ba2",
               borderBottomColor: "#f093fb",
               borderLeftColor: "#4facfe",
               transform: "rotate(-90deg)"
             }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold">$148k</div>
          <div className="text-sm text-white/80">{t("total")}</div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        {revenueBySource.map((source, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white/5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/8"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: source.color }}
              />
              <span className="text-sm">{source.name}</span>
            </div>
            <span className="font-semibold">
              ${(source.value / 1000).toFixed(1)}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}