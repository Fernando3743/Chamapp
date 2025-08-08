"use client";

import Link from "next/link";

/**
 * AppointmentsPreview component for dashboard home page
 * Shows upcoming appointments with a link to view all
 */
export default function AppointmentsPreview({
  title = "Upcoming Appointments",
  appointments = [],
  viewAllText = "View All",
  viewAllLink = "/dashboard/appointments",
  emptyStateIcon = "📅",
  emptyStateText = "No upcoming appointments",
  className = "",
}) {
  return (
    <div className={`lg:col-span-2 glass border border-white/20 rounded-2xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link
          href={viewAllLink}
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {viewAllText} →
        </Link>
      </div>
      
      {/* Appointments List */}
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="glass-darker border border-white/20 rounded-xl p-4 flex items-center gap-4 hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">{appointment.icon || "👤"}</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{appointment.customerName}</div>
                <div className="text-sm text-white/60">{appointment.service}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{appointment.time}</div>
                <div className="text-sm text-white/60">{appointment.date}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 text-white/60">
          <span className="text-4xl mb-4 block">{emptyStateIcon}</span>
          <p>{emptyStateText}</p>
        </div>
      )}
    </div>
  );
}