"use client";

import AppointmentCard from "./AppointmentCard";

/**
 * Today's Schedule sidebar component
 * Displays today's appointments in a scrollable list
 */
export default function TodaySchedule({ appointments }) {
  return (
    <div className="space-y-5">
      {/* Today's Schedule */}
      <div className="glass border border-white/20 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold">Today&apos;s Schedule</h3>
          <a
            href="#"
            className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
          >
            View all →
          </a>
        </div>
        <div
          className="space-y-3 max-h-[600px] overflow-y-auto pr-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.2) rgba(255,255,255,0.05)",
          }}
        >
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass border border-white/20 rounded-2xl p-5">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 bg-white/5 border border-white/20 rounded-xl text-white text-xs font-medium transition-all duration-300 text-center hover:bg-white/10 hover:-translate-y-0.5">
            📅 View Week
          </button>
          <button className="p-3 bg-white/5 border border-white/20 rounded-xl text-white text-xs font-medium transition-all duration-300 text-center hover:bg-white/10 hover:-translate-y-0.5">
            ⏰ Set Hours
          </button>
          <button className="p-3 bg-white/5 border border-white/20 rounded-xl text-white text-xs font-medium transition-all duration-300 text-center hover:bg-white/10 hover:-translate-y-0.5">
            🔄 Sync Calendar
          </button>
          <button className="p-3 bg-white/5 border border-white/20 rounded-xl text-white text-xs font-medium transition-all duration-300 text-center hover:bg-white/10 hover:-translate-y-0.5">
            📊 Reports
          </button>
        </div>
      </div>
    </div>
  );
}