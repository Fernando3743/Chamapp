"use client";

/**
 * Individual appointment card component
 * Displays appointment details with status indicator
 */
export default function AppointmentCard({ appointment }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-white/5 border border-white/20 rounded-2xl p-4 transition-all duration-300 relative overflow-hidden border-l-4 border-l-indigo-500 hover:bg-white/8 hover:-translate-x-1">
      <div className="text-xs text-white/60 mb-2">
        {appointment.time}
      </div>
      <div className="text-sm font-medium mb-1">
        {appointment.service}
      </div>
      <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
        <div className="w-6 h-6 bg-primary-gradient rounded-full flex items-center justify-center text-[10px] font-semibold text-white">
          {appointment.initials}
        </div>
        <span>{appointment.client}</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getStatusColor(
            appointment.status
          )}`}
        >
          {appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
        </span>
      </div>
    </div>
  );
}