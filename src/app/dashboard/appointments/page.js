"use client";

import React, { useState } from "react";

export default function AppointmentsPage() {
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [dateFilter, setDateFilter] = useState("today");
  const [selectedDate, setSelectedDate] = useState(5); // December 5th
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear, setCurrentYear] = useState(2024);

  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    clientName: "",
    service: "",
    date: "",
    time: "",
    duration: "1 hour",
    notes: "",
  });

  // Mock data for today's appointments
  const todayAppointments = [
    {
      id: 1,
      time: "9:00 AM - 9:30 AM",
      service: "Hair Cut & Styling",
      client: "Sarah Mitchell",
      initials: "SM",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:00 AM - 11:00 AM",
      service: "Deep Tissue Massage",
      client: "James Wilson",
      initials: "JW",
      status: "confirmed",
    },
    {
      id: 3,
      time: "11:30 AM - 12:30 PM",
      service: "Business Consultation",
      client: "Emma Chen",
      initials: "EC",
      status: "pending",
    },
    {
      id: 4,
      time: "2:00 PM - 3:00 PM",
      service: "Personal Training Session",
      client: "Michael Davis",
      initials: "MD",
      status: "confirmed",
    },
    {
      id: 5,
      time: "3:30 PM - 4:00 PM",
      service: "Dental Checkup",
      client: "Lisa Thompson",
      initials: "LT",
      status: "cancelled",
    },
    {
      id: 6,
      time: "4:30 PM - 5:30 PM",
      service: "Legal Consultation",
      client: "Robert Johnson",
      initials: "RJ",
      status: "pending",
    },
  ];

  // Time slots for the day view
  const timeSlots = [
    { time: "8:00 AM", appointment: null, available: true },
    {
      time: "9:00 AM",
      appointment: todayAppointments[0],
      available: false,
    },
    {
      time: "10:00 AM",
      appointment: todayAppointments[1],
      available: false,
    },
    { time: "11:00 AM", appointment: null, available: true },
    { time: "12:00 PM", appointment: null, available: false, break: true },
    { time: "1:00 PM", appointment: null, available: true },
    {
      time: "2:00 PM",
      appointment: todayAppointments[3],
      available: false,
    },
    { time: "3:00 PM", appointment: null, available: true },
    { time: "4:00 PM", appointment: null, available: true },
    {
      time: "5:00 PM",
      appointment: todayAppointments[5],
      available: false,
    },
    { time: "6:00 PM", appointment: null, available: false, endOfDay: true },
  ];

  // Stats data
  const stats = [
    {
      icon: "📅",
      label: "Today's Appointments",
      value: 12,
      change: "↑ 20%",
      changeLabel: "vs yesterday",
      positive: true,
    },
    {
      icon: "✅",
      label: "Completed",
      value: 8,
      subtext: "67% completion rate",
    },
    {
      icon: "⏳",
      label: "Pending",
      value: 3,
      subtext: "Next in 30 mins",
    },
    {
      icon: "❌",
      label: "Cancelled",
      value: 1,
      change: "↓ 50%",
      changeLabel: "Great improvement",
      positive: true,
    },
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

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    console.log("New appointment:", appointmentForm);
    setShowNewAppointmentModal(false);
    setAppointmentForm({
      clientName: "",
      service: "",
      date: "",
      time: "",
      duration: "1 hour",
      notes: "",
    });
  };

  return (
    <main className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-5">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Appointments</h1>
            <p className="text-white/60 text-base">
              Manage your appointments and schedule
            </p>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <button
              onClick={() => setShowNewAppointmentModal(true)}
              className="flex-1 lg:flex-none px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              <span>+</span> New Appointment
            </button>
            <button className="flex-1 lg:flex-none px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/15">
              <span>📥</span> Export Schedule
            </button>
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex gap-2 bg-white/10 border border-white/20 rounded-xl p-1 w-fit">
          {["today", "week", "month", "custom"].map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                dateFilter === filter
                  ? "bg-indigo-500/20 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {filter === "today"
                ? "Today"
                : filter === "week"
                ? "This Week"
                : filter === "month"
                ? "This Month"
                : "Custom Range"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
            </div>
            <div className="text-sm text-white/60 mb-2">{stat.label}</div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="flex items-center gap-2 text-sm">
              {stat.change && (
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    stat.positive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              )}
              <span className="text-white/60">
                {stat.changeLabel || stat.subtext}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <div className="xl:col-span-2 glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Calendar View</h2>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => navigateMonth("prev")}
                className="w-9 h-9 bg-white/5 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/10"
              >
                ◀
              </button>
              <span className="text-base font-medium mx-4">
                {months[currentMonth]} {currentYear}
              </span>
              <button
                onClick={() => navigateMonth("next")}
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
                onClick={() => day.currentMonth && setSelectedDate(day.day)}
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

        {/* Appointments Sidebar */}
        <div className="space-y-5">
          {/* Today's Schedule */}
          <div className="glass border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold">Today's Schedule</h3>
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
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white/5 border border-white/20 rounded-2xl p-4 transition-all duration-300 relative overflow-hidden border-l-4 border-l-indigo-500 hover:bg-white/8 hover:-translate-x-1"
                >
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
      </div>

      {/* Time Slots Section */}
      <div className="glass border border-white/20 rounded-2xl p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Today's Time Slots</h2>
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
                  slot.available && !slot.appointment && setShowNewAppointmentModal(true)
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

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-modalSlideIn no-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold">New Appointment</h3>
              <button
                onClick={() => setShowNewAppointmentModal(false)}
                className="w-9 h-9 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 text-xl hover:bg-white/20"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitAppointment}>
              <div className="mb-5">
                <label className="block text-sm text-white/60 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={appointmentForm.clientName}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300"
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm text-white/60 mb-2">
                  Service
                </label>
                <select
                  name="service"
                  value={appointmentForm.service}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="hair-cut">Hair Cut & Styling</option>
                  <option value="massage">Deep Tissue Massage</option>
                  <option value="consultation">Business Consultation</option>
                  <option value="training">Personal Training Session</option>
                  <option value="dental">Dental Checkup</option>
                  <option value="legal">Legal Consultation</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-sm text-white/60 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={appointmentForm.date}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm text-white/60 mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={appointmentForm.time}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm text-white/60 mb-2">
                  Duration
                </label>
                <select
                  name="duration"
                  value={appointmentForm.duration}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300"
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1.5 hours">1.5 hours</option>
                  <option value="2 hours">2 hours</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-sm text-white/60 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={appointmentForm.notes}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300 resize-y min-h-[100px]"
                  placeholder="Add any special notes or requirements"
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}