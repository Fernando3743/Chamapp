"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { analyticsTranslations } from "@/lib/translations/pages/analytics";
import { useCallback } from "react";
import MetricCard from "./MetricCard";

export default function PerformanceMetrics({ 
  topProducts, 
  customerSegments, 
  marketingChannels 
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Top Products */}
      <MetricCard 
        title={t("topProducts")}
        data={topProducts}
        valueType="currency"
      />

      {/* Customer Segments */}
      <MetricCard 
        title={t("customerSegments")}
        data={customerSegments}
        valueType="percentage"
      />

      {/* Marketing Channels */}
      <MetricCard 
        title={t("marketingChannels")}
        data={marketingChannels}
        valueType="percentage"
      />
    </div>
  );
}