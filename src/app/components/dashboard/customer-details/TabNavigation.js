"use client";

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = ["details", "appointments", "purchases", "notes", "communications"];

  return (
    <div className="flex gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1 w-fit mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === tab
              ? "bg-indigo-500/20 text-white"
              : "text-white/70 hover:text-white"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}