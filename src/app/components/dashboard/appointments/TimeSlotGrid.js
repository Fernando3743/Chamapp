"use client";

import React from "react";

/**
 * Time slots grid component for appointments
 * Displays hourly time slots with appointments and availability
 */
export default function TimeSlotGrid({ timeSlots, onSlotClick }) {
  return (
    <div className="glass border border-white/20 rounded-2xl p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Today&apos;s Time Slots</h2>
        <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2 hover:bg-white/15">
          <span>⚙️</span> Manage Availability
        </button>
      </div>
      <div
        className="grid grid-cols-[80px_1fr] gap-4 max-h-[600px] overflow-y-auto pr-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.2) rgba(255,255,255,0.05)",
        }}
      >
        {timeSlots.map((slot, index) => (
          <React.Fragment key={index}>
            <div className="text-xs text-white/60 pt-2 text-right">
              {slot.time}
            </div>
            <div
              className={`${
                slot.appointment
                  ? "bg-primary-gradient"
                  : slot.break
                  ? "bg-white/5"
                  : slot.endOfDay
                  ? "bg-white/5"
                  : slot.available
                  ? "bg-white/5 border-dashed cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/10"
                  : "bg-white/5"
              } border border-white/20 rounded-xl p-4 min-h-[60px] transition-all duration-300 ${
                slot.available && !slot.appointment ? "hover:bg-white/8" : ""
              }`}
              onClick={() =>
                slot.available && !slot.appointment && onSlotClick()
              }
            >
              <div className="flex justify-between items-center">
                {slot.appointment ? (
                  <>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-sm">
                        {slot.appointment.client}
                      </span>
                      <span className="text-xs opacity-80">
                        {slot.appointment.service}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 text-sm hover:bg-white/20">
                        ✏️
                      </button>
                      <button className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 text-sm hover:bg-white/20">
                        ❌
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="text-white/60">
                    {slot.break
                      ? "Lunch Break"
                      : slot.endOfDay
                      ? "End of Day"
                      : "Available"}
                  </span>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}