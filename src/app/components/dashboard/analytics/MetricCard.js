"use client";

export default function MetricCard({ title, data, valueType = "currency" }) {
  const formatValue = (item) => {
    if (valueType === "currency") {
      return item.revenue;
    } else if (valueType === "percentage") {
      return `${item.percentage}%`;
    }
    return item.value;
  };

  const getPercentage = (item) => {
    if (valueType === "percentage") {
      return item.percentage;
    }
    return item.percentage;
  };

  return (
    <div className="glass border border-white/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-md transition-all duration-300 hover:bg-white/10">
          ⋮
        </div>
      </div>
      <div className="space-y-5">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm">{item.name}</span>
              <span className="text-sm font-semibold">{formatValue(item)}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-gradient rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(item)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}