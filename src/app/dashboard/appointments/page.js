"use client";

import React, { useState } from "react";
import StatsCard from "../../components/dashboard/common/StatsCard";
import Calendar from "../../components/dashboard/appointments/Calendar";
import TodaySchedule from "../../components/dashboard/appointments/TodaySchedule";
import TimeSlotGrid from "../../components/dashboard/appointments/TimeSlotGrid";
import AppointmentModal from "../../components/dashboard/appointments/AppointmentModal";

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
      change: "20%",
      changeLabel: "vs yesterday",
      trend: "up",
    },
    {
      icon: "✅",
      label: "Completed",
      value: 8,
      changeLabel: "67% completion rate",
    },
    {
      icon: "⏳",
      label: "Pending",
      value: 3,
      changeLabel: "Next in 30 mins",
    },
    {
      icon: "❌",
      label: "Cancelled",
      value: 1,
      change: "50%",
      changeLabel: "Great improvement",
      trend: "down",
    },
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
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeLabel={stat.changeLabel}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <Calendar
          currentMonth={currentMonth}
          currentYear={currentYear}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onNavigateMonth={navigateMonth}
        />

        {/* Appointments Sidebar */}
        <TodaySchedule appointments={todayAppointments} />
      </div>

      {/* Time Slots Section */}
      <TimeSlotGrid
        timeSlots={timeSlots}
        onSlotClick={() => setShowNewAppointmentModal(true)}
      />

      {/* New Appointment Modal */}
      <AppointmentModal
        isOpen={showNewAppointmentModal}
        onClose={() => setShowNewAppointmentModal(false)}
        appointmentForm={appointmentForm}
        onFormChange={handleFormChange}
        onSubmit={handleSubmitAppointment}
      />
    </main>
  );
}