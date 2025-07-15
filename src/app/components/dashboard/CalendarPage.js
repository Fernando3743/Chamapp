"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "../../styles/components/dashboard/CalendarPage.module.css";
import {
  Plus,
  RefreshCw,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

// Staff Sidebar Item Component
const StaffItem = React.memo(({ staff, checked, onChange }) => {
  return (
    <div className={`${styles.staffItem} ${checked ? styles.active : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(staff.id, e.target.checked)}
      />
      <div className={styles.staffAvatar}>{staff.initials}</div>
      <div className={styles.staffInfo}>
        <div className={styles.staffName}>{staff.name}</div>
        <div className={styles.staffRole}>{staff.role}</div>
      </div>
      {staff.status && (
        <div className={`${styles.staffStatus} ${styles[staff.status]}`}></div>
      )}
    </div>
  );
});

// Calendar Day Component for Month View
const CalendarDay = React.memo(
  ({ day, appointments, isToday, isOtherMonth, onClick }) => {
    return (
      <div
        className={`${styles.calendarDay} ${isToday ? styles.today : ""} ${
          isOtherMonth ? styles.otherMonth : ""
        }`}
        onClick={onClick}
      >
        <div className={styles.dayNumber}>{day}</div>
        <div className={styles.dayAppointments}>
          {appointments.slice(0, 3).map((apt, index) => (
            <div
              key={index}
              className={`${styles.appointmentItem} ${styles[apt.type]}`}
              onClick={(e) => {
                e.stopPropagation();
                console.log("View appointment:", apt);
              }}
            >
              {apt.time} - {apt.client}
            </div>
          ))}
          {appointments.length > 3 && (
            <div className={styles.moreAppointments}>
              +{appointments.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Week Appointment Component
const WeekAppointment = React.memo(({ appointment, style }) => {
  return (
    <div
      className={`${styles.weekAppointment} ${styles[appointment.type]}`}
      style={style}
      onClick={() => console.log("View appointment:", appointment)}
    >
      <div className={styles.weekAppointmentTime}>{appointment.time}</div>
      <div className={styles.weekAppointmentTitle}>{appointment.title}</div>
      <div className={styles.weekAppointmentClient}>{appointment.client}</div>
    </div>
  );
});

// Day Appointment Component
const DayAppointment = React.memo(({ appointment, style }) => {
  return (
    <div
      className={`${styles.dayAppointment} ${styles[appointment.type]}`}
      style={style}
      onClick={() => console.log("View appointment:", appointment)}
    >
      <div className={styles.weekAppointmentTime}>{appointment.time}</div>
      <div className={styles.weekAppointmentTitle}>{appointment.title}</div>
      <div className={styles.weekAppointmentClient}>
        Client: {appointment.client}
      </div>
    </div>
  );
});

// New Appointment Modal Component
const NewAppointmentModal = React.memo(({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    client: "",
    service: "",
    staff: "",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    duration: "1 hour",
    notes: "",
    sendConfirmation: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking appointment:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${styles.modalActive}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>New Appointment</h3>
          <button className={styles.modalClose} onClick={onClose}>
            <X className={styles.w5} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Client</label>
            <select
              className={styles.formSelect}
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
            >
              <option value="">Select a client...</option>
              <option value="sarah">Sarah Mitchell</option>
              <option value="john">John Doe</option>
              <option value="emma">Emma Chen</option>
              <option value="michael">Michael Davis</option>
              <option value="new">+ Add New Client</option>
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Service</label>
              <select
                className={styles.formSelect}
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
              >
                <option value="">Select service...</option>
                <option value="haircut">Hair Cut & Style</option>
                <option value="color">Hair Color</option>
                <option value="manicure">Gel Manicure</option>
                <option value="massage">Deep Tissue Massage</option>
                <option value="facial">Facial Treatment</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Staff Member</label>
              <select
                className={styles.formSelect}
                value={formData.staff}
                onChange={(e) =>
                  setFormData({ ...formData, staff: e.target.value })
                }
              >
                <option value="">Select staff...</option>
                <option value="emily">Emily Johnson</option>
                <option value="maria">Maria Garcia</option>
                <option value="robert">Robert Chen</option>
                <option value="lisa">Lisa Thompson</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date</label>
              <input
                type="date"
                className={styles.formInput}
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Time</label>
              <input
                type="time"
                className={styles.formInput}
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Duration</label>
            <select
              className={styles.formSelect}
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            >
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>1 hour</option>
              <option>1.5 hours</option>
              <option>2 hours</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Notes</label>
            <textarea
              className={styles.formTextarea}
              rows="3"
              placeholder="Add any special notes..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                style={{ width: "auto" }}
                checked={formData.sendConfirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sendConfirmation: e.target.checked,
                  })
                }
              />
              <span>Send confirmation to client</span>
            </label>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary}>
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(new Set(["all"]));

  // Staff data
  const staffMembers = [
    { id: "all", name: "All Staff", role: "View everyone", initials: "All" },
    {
      id: "emily",
      name: "Emily Johnson",
      role: "Hair Stylist",
      initials: "EJ",
      status: "active",
    },
    {
      id: "maria",
      name: "Maria Garcia",
      role: "Nail Technician",
      initials: "MG",
      status: "busy",
    },
    {
      id: "robert",
      name: "Robert Chen",
      role: "Massage Therapist",
      initials: "RC",
      status: "active",
    },
    {
      id: "lisa",
      name: "Lisa Thompson",
      role: "Esthetician",
      initials: "LT",
      status: "offline",
    },
    {
      id: "james",
      name: "James Wilson",
      role: "Hair Stylist",
      initials: "JW",
      status: "active",
    },
  ];

  // Mock appointments data
  const appointments = {
    "2024-12-01": [
      { time: "9:00 AM", client: "Sarah M.", type: "hair", title: "Hair Cut" },
      { time: "2:00 PM", client: "John D.", type: "spa", title: "Massage" },
    ],
    "2024-12-02": [
      {
        time: "10:00 AM",
        client: "Emma C.",
        type: "nail",
        title: "Gel Manicure",
      },
    ],
    "2024-12-03": [
      {
        time: "11:00 AM",
        client: "Mike R.",
        type: "hair",
        title: "Hair Color",
      },
      { time: "3:00 PM", client: "Lisa K.", type: "spa", title: "Facial" },
      { time: "5:00 PM", client: "Anna B.", type: "nail", title: "Pedicure" },
    ],
    "2024-12-05": [
      { time: "9:00 AM", client: "Client A", type: "hair", title: "Hair Cut" },
      {
        time: "10:30 AM",
        client: "Client B",
        type: "spa",
        title: "Deep Tissue",
      },
      { time: "2:00 PM", client: "Client C", type: "nail", title: "Manicure" },
      {
        time: "3:30 PM",
        client: "Client D",
        type: "hair",
        title: "Hair Style",
      },
      { time: "4:30 PM", client: "Client E", type: "spa", title: "Relaxation" },
      { time: "5:30 PM", client: "Client F", type: "nail", title: "Nail Art" },
    ],
  };

  // Get formatted date display
  const getDateDisplay = useCallback(() => {
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

    if (currentView === "month") {
      return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (currentView === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      return `${weekStart.getDate()} - ${weekEnd.getDate()} ${
        months[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    } else if (currentView === "day") {
      return `${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    }

    return "";
  }, [currentDate, currentView]);

  // Navigate calendar
  const handleNavigate = useCallback(
    (direction) => {
      const newDate = new Date(currentDate);

      if (direction === "prev") {
        if (currentView === "month") {
          newDate.setMonth(newDate.getMonth() - 1);
        } else if (currentView === "week") {
          newDate.setDate(newDate.getDate() - 7);
        } else if (currentView === "day") {
          newDate.setDate(newDate.getDate() - 1);
        }
      } else if (direction === "next") {
        if (currentView === "month") {
          newDate.setMonth(newDate.getMonth() + 1);
        } else if (currentView === "week") {
          newDate.setDate(newDate.getDate() + 7);
        } else if (currentView === "day") {
          newDate.setDate(newDate.getDate() + 1);
        }
      } else if (direction === "today") {
        setCurrentDate(new Date());
        return;
      }

      setCurrentDate(newDate);
    },
    [currentDate, currentView]
  );

  // Handle staff selection
  const handleStaffChange = useCallback(
    (staffId, checked) => {
      setSelectedStaff((prev) => {
        const newSet = new Set(prev);

        if (staffId === "all") {
          if (checked) {
            // Select all staff
            staffMembers.forEach((staff) => newSet.add(staff.id));
          } else {
            // Deselect all
            newSet.clear();
          }
        } else {
          if (checked) {
            newSet.add(staffId);
          } else {
            newSet.delete(staffId);
            newSet.delete("all"); // Remove "all" when individual staff is unchecked
          }

          // Check if all individual staff are selected
          const allIndividualSelected = staffMembers
            .slice(1)
            .every((staff) => newSet.has(staff.id));
          if (allIndividualSelected) {
            newSet.add("all");
          }
        }

        return newSet;
      });
    },
    [staffMembers]
  );

  // Generate calendar days for month view
  const getMonthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month days
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isOtherMonth: true,
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isOtherMonth: false,
        date: new Date(year, month, i),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isOtherMonth: true,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  }, [currentDate]);

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointments[dateStr] || [];
  };

  return (
    <div className={styles.calendarContainerWrapper}>
      {/* Calendar Header */}
      <div className={styles.calendarHeader}>
        <div className={styles.layoutHeaderContent}>
          <div className={styles.layoutPageTitle}>
            <h1>Calendar & Schedule</h1>
            <p>Manage appointments and staff schedules</p>
          </div>
          <div className={styles.layoutHeaderActions}>
            <button
              className={styles.btnPrimary}
              onClick={() => setShowAppointmentModal(true)}
            >
              <Plus className={styles.w4} /> New Appointment
            </button>
            <button className={styles.btnSecondary}>
              <RefreshCw className={styles.w4} /> Sync Calendar
            </button>
            <button className={styles.btnSecondary}>
              <Settings className={styles.w4} /> Settings
            </button>
          </div>
        </div>
      </div>

      {/* View Controls */}
      <div className={styles.viewControls}>
        <div className={styles.calendarNav}>
          <button
            className={styles.navBtn}
            onClick={() => handleNavigate("prev")}
          >
            <ChevronLeft className={styles.w4} />
          </button>
          <h2 className={styles.currentDate}>{getDateDisplay()}</h2>
          <button
            className={styles.navBtn}
            onClick={() => handleNavigate("next")}
          >
            <ChevronRight className={styles.w4} />
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => handleNavigate("today")}
          >
            Today
          </button>
        </div>
        <div className={styles.layoutViewToggle}>
          {["day", "week", "month", "resource"].map((view) => (
            <button
              key={view}
              className={`${styles.viewBtn} ${
                currentView === view ? styles.active : ""
              }`}
              onClick={() => setCurrentView(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Container */}
      <div className={styles.calendarContainer}>
        {/* Staff Sidebar */}
        <aside className={styles.staffSidebar}>
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>Staff Members</h3>
            <input
              type="checkbox"
              checked={selectedStaff.has("all")}
              onChange={(e) => handleStaffChange("all", e.target.checked)}
            />
          </div>
          <div className={styles.staffList}>
            {staffMembers.map((staff) => (
              <StaffItem
                key={staff.id}
                staff={staff}
                checked={selectedStaff.has(staff.id)}
                onChange={handleStaffChange}
              />
            ))}
          </div>
        </aside>

        {/* Calendar Content */}
        <div className={styles.calendarContent}>
          {/* Month View */}
          {currentView === "month" && (
            <div className={styles.monthView}>
              {/* Day headers */}
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <div key={day} className={styles.dayHeader}>
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {getMonthDays.map((dayInfo, index) => (
                <CalendarDay
                  key={index}
                  day={dayInfo.day}
                  appointments={getAppointmentsForDate(dayInfo.date)}
                  isToday={isToday(dayInfo.date)}
                  isOtherMonth={dayInfo.isOtherMonth}
                  onClick={() =>
                    !dayInfo.isOtherMonth && setShowAppointmentModal(true)
                  }
                />
              ))}
            </div>
          )}

          {/* Week View */}
          {currentView === "week" && (
            <div className={styles.weekView}>
              {/* Time column header */}
              <div style={{ gridColumn: 1, gridRow: 1 }}></div>

              {/* Day headers */}
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => {
                const date = new Date(currentDate);
                date.setDate(
                  currentDate.getDate() - currentDate.getDay() + index
                );

                return (
                  <div
                    key={day}
                    className={styles.weekDayHeader}
                    style={{ gridColumn: index + 2 }}
                  >
                    <div className={styles.weekDayName}>{day}</div>
                    <div className={styles.weekDayDate}>{date.getDate()}</div>
                  </div>
                );
              })}

              {/* Time labels and slots */}
              <div className={styles.timeColumn} style={{ gridRow: 2 }}>
                {[
                  "8:00 AM",
                  "9:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "1:00 PM",
                  "2:00 PM",
                  "3:00 PM",
                  "4:00 PM",
                  "5:00 PM",
                  "6:00 PM",
                ].map((time) => (
                  <div key={time} className={styles.timeSlotLabel}>
                    {time}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) => (
                <div
                  key={dayOffset}
                  className={styles.weekDayColumn}
                  style={{ gridColumn: dayOffset + 2, gridRow: 2 }}
                >
                  <div className={styles.timeGrid}>
                    {[...Array(11)].map((_, i) => (
                      <div
                        key={i}
                        className={styles.timeLine}
                        style={{ top: `${i * 60}px` }}
                      ></div>
                    ))}
                  </div>
                  {/* Sample appointments */}
                  {dayOffset === 0 && (
                    <WeekAppointment
                      appointment={{
                        time: "9:00 - 10:30",
                        title: "Hair Cut & Color",
                        client: "Sarah Mitchell",
                        type: "hair",
                      }}
                      style={{ top: "60px", height: "90px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Day View */}
          {currentView === "day" && (
            <div className={styles.dayView}>
              <div className={styles.timeColumn}>
                {[
                  "8:00 AM",
                  "9:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "1:00 PM",
                  "2:00 PM",
                  "3:00 PM",
                  "4:00 PM",
                  "5:00 PM",
                  "6:00 PM",
                ].map((time) => (
                  <div key={time} className={styles.timeSlotLabel}>
                    {time}
                  </div>
                ))}
              </div>
              <div className={styles.dayTimeSlots}>
                {[...Array(11)].map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.daySlot} ${
                      [0, 3, 4, 5, 7, 8, 9, 10].includes(index)
                        ? styles.available
                        : ""
                    }`}
                  >
                    {index === 1 && (
                      <DayAppointment
                        appointment={{
                          time: "9:00 - 10:30 AM",
                          title: "Premium Hair Cut",
                          client: "Sarah Mitchell",
                          type: "hair",
                        }}
                        style={{ height: "90px" }}
                      />
                    )}
                    {index === 6 && (
                      <DayAppointment
                        appointment={{
                          time: "2:00 - 3:00 PM",
                          title: "Gel Manicure",
                          client: "Emma Chen",
                          type: "nail",
                        }}
                        style={{ height: "60px" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resource View */}
          {currentView === "resource" && (
            <div className={styles.resourceView}>
              <div className={styles.resourceFilters}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Resource Type:</label>
                  <select className={styles.filterSelect}>
                    <option>All Resources</option>
                    <option>Treatment Rooms</option>
                    <option>Equipment</option>
                    <option>Staff</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Availability:</label>
                  <select className={styles.filterSelect}>
                    <option>All</option>
                    <option>Available</option>
                    <option>In Use</option>
                    <option>Maintenance</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "var(--text-secondary)",
                }}
              >
                Resource view coming soon...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Appointment Modal */}
      <NewAppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />
    </div>
  );
}

StaffItem.displayName = "StaffItem";
CalendarDay.displayName = "CalendarDay";
WeekAppointment.displayName = "WeekAppointment";
DayAppointment.displayName = "DayAppointment";
NewAppointmentModal.displayName = "NewAppointmentModal";
