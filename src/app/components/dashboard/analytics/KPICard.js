"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { analyticsTranslations } from "@/lib/translations/pages/analytics";
import { useCallback } from "react";

export default function KPICard({ kpiData }) {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      analyticsTranslations[key]?.[language] ||
      analyticsTranslations[key]?.en ||
      key,
    [language]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className="glass border border-white/20 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-white/80 uppercase tracking-wider mb-2">
                {kpi.title}
              </div>
              <div className="text-4xl font-bold gradient-text">{kpi.value}</div>
            </div>
            <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-xl">
              {kpi.icon}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                kpi.trend === "up"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              <span>{kpi.trend === "up" ? "↑" : "↓"}</span> {kpi.change}
            </span>
            <span className="text-sm text-white/80">{t("vsLastPeriod")}</span>
          </div>
        </div>
      ))}
    </div>
  );
}