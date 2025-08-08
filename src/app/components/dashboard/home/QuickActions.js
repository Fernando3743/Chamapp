"use client";

/**
 * QuickActions component for dashboard home page
 * Displays a list of quick action buttons for common tasks
 */
export default function QuickActions({
  title = "Quick Actions",
  actions = [],
  className = "",
}) {
  const defaultActions = [
    {
      icon: "👥",
      label: "Add New Customer",
      action: () => console.log("Add customer"),
    },
    {
      icon: "📦",
      label: "Add Product/Service",
      action: () => console.log("Add product"),
    },
    {
      icon: "📧",
      label: "Send Campaign",
      action: () => console.log("Send campaign"),
    },
    {
      icon: "💳",
      label: "Process Payment",
      action: () => console.log("Process payment"),
    },
  ];

  const displayActions = actions.length > 0 ? actions : defaultActions;

  return (
    <div className={`glass border border-white/20 rounded-2xl p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-5">{title}</h2>
      <div className="space-y-3">
        {displayActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="w-full px-4 py-3 glass-darker border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
          >
            <span>{action.icon}</span> {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}