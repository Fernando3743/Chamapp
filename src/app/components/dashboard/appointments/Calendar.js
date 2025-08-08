"use client";

import React from "react";

/**
 * Calendar component for appointments page
 * Displays a monthly calendar view with appointment indicators
 */
export default function Calendar({
  currentMonth,
  currentYear,
  selectedDate,
  onDateSelect,
  onNavigateMonth,
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    // Previous month days
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        currentMonth: false,
        appointments: 0,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const appointmentCount =
        i === 1 ? 2 : i === 3 ? 1 : i === 5 ? 3 : i === 7 ? 1 : i === 9 ? 2 : i === 12 ? 1 : i === 15 ? 2 : 0;

      days.push({
        day: i,
        currentMonth: true,
        appointments: appointmentCount,
        isToday: i === 5,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        appointments: 0,
      });
    }

    return days;
  };

  return (
    <div className="xl:col-span-2 glass border border-white/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Calendar View</h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onNavigateMonth("prev")}
            className="w-9 h-9 bg-white/5 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/10"
          >
            ◀
          </button>
          <span className="text-base font-medium mx-4">
            {months[currentMonth]} {currentYear}
          </span>
          <button
            onClick={() => onNavigateMonth("next")}
            className="w-9 h-9 bg-white/5 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/10"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs text-white/60 py-2 font-semibold"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {generateCalendarDays().map((day, index) => (
          <div
            key={index}
            onClick={() => day.currentMonth && onDateSelect(day.day)}
            className={`aspect-square bg-white/5 border border-white/20 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
              day.currentMonth
                ? "cursor-pointer hover:bg-white/8 hover:scale-105"
                : "opacity-30"
            } ${
              day.isToday
                ? "bg-indigo-500/20 border-indigo-500/50"
                : selectedDate === day.day && day.currentMonth
                ? "bg-primary-gradient"
                : ""
            }`}
          >
            <span className="text-sm font-medium mb-1">{day.day}</span>
            {day.appointments > 0 && (
              <div className="flex gap-0.5">
                {[...Array(Math.min(day.appointments, 3))].map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-green-400 rounded-full"
                  ></span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}