"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { analyticsTranslations } from "@/lib/translations/pages/analytics";
import { useCallback } from "react";

export default function RevenueChart({ 
  selectedMetric, 
  setSelectedMetric, 
  metrics, 
  chartData, 
  chartDays 
}) {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      analyticsTranslations[key]?.[language] ||
      analyticsTranslations[key]?.en ||
      key,
    [language]
  );

  return (
    <div className="xl:col-span-2 glass border border-white/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">{t("revenueTrend")}</h3>
          <p className="text-sm text-white/80 mt-1">{t("dailyRevenue")}</p>
        </div>
        <div className="flex gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`px-3 py-1 rounded-lg text-xs transition-all duration-300 ${
                selectedMetric === metric.key
                  ? "bg-indigo-500/20 border border-indigo-500/50"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Simple Bar Chart */}
      <div className="h-[350px] relative mb-5">
        <div className="absolute left-0 top-0 bottom-10 w-12 flex flex-col justify-between text-xs text-white/80 text-right pr-2">
          <span>$25k</span>
          <span>$20k</span>
          <span>$15k</span>
          <span>$10k</span>
          <span>$5k</span>
          <span>$0</span>
        </div>
        <div className="ml-14 h-[calc(100%-40px)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            {[20, 40, 60, 80].map((percent) => (
              <div
                key={percent}
                className="absolute left-0 right-0 h-px bg-white/5"
                style={{ bottom: `${percent}%` }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-full flex gap-2 items-end p-2">
            {chartData.map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-primary-gradient rounded-t-lg relative cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
        <div className="ml-14 h-10 flex items-center text-xs text-white/80 p-2">
          {chartDays.map((day, index) => (
            <span key={index} className="flex-1 text-center">
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}