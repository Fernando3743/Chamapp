'use client';

import React, { useState, useCallback, useMemo } from 'react';
import styles from '../../styles/components/dashboard/AppointmentsPage.module.css';
import {
  Calendar,
  Clock,
  Plus,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Check,
  X,
  Edit2,
  MoreVertical,
  User,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Appointment Card Component
const AppointmentCard = React.memo(({ time, title, client, status, onEdit, onCancel }) => {
  const statusStyles = {
    confirmed: { bg: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', label: 'Confirmed' },
    pending: { bg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24', label: 'Pending' },
    cancelled: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', label: 'Cancelled' }
  };

  const style = statusStyles[status] || statusStyles.pending;

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.appointmentTime}>{time}</div>
      <div className={styles.appointmentTitle}>{title}</div>
      <div className={styles.appointmentClient}>
        <div className={styles.clientAvatar}>{client.initials}</div>
        <span>{client.name}</span>
      </div>
      <div className={styles.appointmentStatus}>
        <span className={`${styles.statusBadge} ${styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]}`} style={{ background: style.bg, color: style.color }}>
          {style.label}
        </span>
      </div>
    </div>
  );
});

// Calendar Day Component
const CalendarDay = React.memo(({ day, isOtherMonth, isToday, isSelected, appointments, onClick }) => {
  return (
    <div className={`${styles.calendarDay} ${isOtherMonth ? styles.otherMonth : ''} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      <span className={styles.calendarDayNumber}>{day}</span>
      {appointments > 0 && (
        <div className={styles.calendarDayAppointments}>
          {[...Array(Math.min(appointments, 3))].map((_, i) => (
            <span key={i} className={styles.appointmentDot}></span>
          ))}
        </div>
      )}
    </div>
  );
});

// Time Slot Component
const TimeSlot = React.memo(({ time, isBooked, client, service, onEdit, onCancel, onBook }) => {
  if (!isBooked) {
    return (
      <div className={`${styles.timeSlot} ${styles.available}`} onClick={onBook}>
        <div className={styles.slotContent}>
          <span style={{ color: 'var(--text-secondary)' }}>Available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.timeSlot} ${styles.booked}`}>
      <div className={styles.slotContent}>
        <div className={styles.slotInfo}>
          <span className={styles.slotClient}>{client}</span>
          <span className={styles.slotService}>{service}</span>
        </div>
        <div className={styles.slotActions}>
          <button className={styles.slotActionBtn} onClick={onEdit}>
            <Edit2 className={styles.w3} />
          </button>
          <button className={styles.slotActionBtn} onClick={onCancel}>
            <X className={styles.w3} />
          </button>
        </div>
      </div>
    </div>
  );
});

// Modal Component
const AppointmentModal = React.memo(({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    date: '',
    time: '',
    duration: '1 hour',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${styles.modalActive}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>New Appointment</h3>
          <button className={styles.modalClose} onClick={onClose}>
            <X className={styles.w5} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Client Name</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Enter client name"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Service</label>
            <select
              className={styles.formSelect}
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              required
            >
              <option value="">Select a service</option>
              <option>Hair Cut & Styling</option>
              <option>Deep Tissue Massage</option>
              <option>Business Consultation</option>
              <option>Personal Training Session</option>
              <option>Dental Checkup</option>
              <option>Legal Consultation</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Date</label>
            <input
              type="date"
              className={styles.formInput}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Time</label>
            <input
              type="time"
              className={styles.formInput}
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Duration</label>
            <select
              className={styles.formSelect}
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            >
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>1.5 hours</option>
              <option>2 hours</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Notes</label>
            <textarea
              className={styles.formTextarea}
              placeholder="Add any special notes or requirements"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
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

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateFilter, setSelectedDateFilter] = useState('today');
  const [currentMonth, setCurrentMonth] = useState(11); // December
  const [currentYear, setCurrentYear] = useState(2024);
  const [showModal, setShowModal] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  // Mock data for stats
  const stats = [
    { icon: <Calendar className={styles.w5} />, label: "Today's Appointments", value: '12', trend: 'up', trendValue: '20%', subtext: 'vs yesterday' },
    { icon: <CheckCircle className={styles.w5} />, label: 'Completed', value: '8', subtext: '67% completion rate' },
    { icon: <Clock className={styles.w5} />, label: 'Pending', value: '3', subtext: 'Next in 30 mins' },
    { icon: <XCircle className={styles.w5} />, label: 'Cancelled', value: '1', trend: 'down', trendValue: '50%', subtext: 'Great improvement' }
  ];

  // Mock appointments data
  const todaysAppointments = [
    { id: 1, time: '9:00 AM - 9:30 AM', title: 'Hair Cut & Styling', client: { name: 'Sarah Mitchell', initials: 'SM' }, status: 'confirmed' },
    { id: 2, time: '10:00 AM - 11:00 AM', title: 'Deep Tissue Massage', client: { name: 'James Wilson', initials: 'JW' }, status: 'confirmed' },
    { id: 3, time: '11:30 AM - 12:30 PM', title: 'Business Consultation', client: { name: 'Emma Chen', initials: 'EC' }, status: 'pending' },
    { id: 4, time: '2:00 PM - 3:00 PM', title: 'Personal Training Session', client: { name: 'Michael Davis', initials: 'MD' }, status: 'confirmed' },
    { id: 5, time: '3:30 PM - 4:00 PM', title: 'Dental Checkup', client: { name: 'Lisa Thompson', initials: 'LT' }, status: 'cancelled' },
    { id: 6, time: '4:30 PM - 5:30 PM', title: 'Legal Consultation', client: { name: 'Robert Johnson', initials: 'RJ' }, status: 'pending' }
  ];

  // Mock time slots data
  const timeSlots = [
    { time: '8:00 AM', isBooked: false },
    { time: '9:00 AM', isBooked: true, client: 'Sarah Mitchell', service: 'Hair Cut & Styling' },
    { time: '10:00 AM', isBooked: true, client: 'James Wilson', service: 'Deep Tissue Massage' },
    { time: '11:00 AM', isBooked: false },
    { time: '12:00 PM', isBooked: false, isLunch: true },
    { time: '1:00 PM', isBooked: false },
    { time: '2:00 PM', isBooked: true, client: 'Michael Davis', service: 'Personal Training Session' },
    { time: '3:00 PM', isBooked: false },
    { time: '4:00 PM', isBooked: false },
    { time: '5:00 PM', isBooked: true, client: 'Robert Johnson', service: 'Legal Consultation' },
    { time: '6:00 PM', isBooked: false, isEndOfDay: true }
  ];

  // Calendar generation logic
  const generateCalendarDays = useCallback(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isOtherMonth: true,
        appointments: 0
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === new Date().toDateString();
      days.push({
        day,
        isOtherMonth: false,
        isToday,
        appointments: Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isOtherMonth: true,
        appointments: 0
      });
    }
    
    return days;
  }, [currentMonth, currentYear]);

  const calendarDays = useMemo(() => generateCalendarDays(), [generateCalendarDays]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className={styles.appointmentsContainer}>
      {/* Appointments Header */}
      <div className={styles.appointmentsHeader}>
        <div className={styles.layoutHeaderContent}>
          <div className={styles.layoutPageTitle}>
            <h1>Appointments</h1>
            <p>Manage your appointments and schedule</p>
          </div>
          <div className={styles.layoutHeaderActions}>
            <button className={styles.btnPrimary} onClick={() => setShowModal(true)}>
              <Plus className={styles.w5} /> New Appointment
            </button>
            <button className={styles.btnSecondary}>
              <Download className={styles.w5} /> Export Schedule
            </button>
          </div>
        </div>
        <div className={styles.dateFilter}>
          {['Today', 'This Week', 'This Month', 'Custom Range'].map((filter) => (
            <button
              key={filter}
              className={`${styles.dateTab} ${selectedDateFilter === filter.toLowerCase().replace(' ', '') ? styles.active : ''}`}
              onClick={() => setSelectedDateFilter(filter.toLowerCase().replace(' ', ''))}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsOverview}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.cardStat}>
            <div className={styles.statHeader}>
              <div className={styles.cardStatIcon}>{stat.icon}</div>
            </div>
            <div className={styles.cardStatLabel}>{stat.label}</div>
            <div className={styles.cardStatValue}>{stat.value}</div>
            <div className={styles.cardStatTrend}>
              {stat.trend && (
                <span className={`${styles.trendIcon} ${stat.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                  {stat.trend === 'up' ? <TrendingUp className={styles.w3} /> : <TrendingDown className={styles.w3} />}
                  {stat.trendValue}
                </span>
              )}
              <span>{stat.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Appointments Layout */}
      <div className={styles.appointmentsLayout}>
        {/* Calendar Section */}
        <div className={styles.calendarSection}>
          <div className={styles.calendarHeader}>
            <h2 className={styles.calendarTitle}>Calendar View</h2>
            <div className={styles.calendarNav}>
              <button className={styles.calendarNavBtn} onClick={handlePrevMonth}>
                <ChevronLeft className={styles.w4} />
              </button>
              <span className={styles.calendarMonth}>{months[currentMonth]} {currentYear}</span>
              <button className={styles.calendarNavBtn} onClick={handleNextMonth}>
                <ChevronRight className={styles.w4} />
              </button>
            </div>
          </div>
          <div className={styles.calendarGrid}>
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={styles.calendarDayHeader}>{day}</div>
            ))}
            
            {/* Calendar Days */}
            {calendarDays.map((day, index) => (
              <CalendarDay
                key={index}
                day={day.day}
                isOtherMonth={day.isOtherMonth}
                isToday={day.isToday}
                isSelected={false}
                appointments={day.appointments}
                onClick={() => !day.isOtherMonth && setSelectedDate(new Date(currentYear, currentMonth, day.day))}
              />
            ))}
          </div>
        </div>

        {/* Appointments Sidebar */}
        <div className={styles.appointmentsSidebar}>
          {/* Upcoming Appointments */}
          <div className={styles.upcomingAppointments}>
            <div className={styles.cardSectionHeader}>
              <h3 className={styles.cardSectionTitle}>Today&apos;s Schedule</h3>
              <a href="#" className={styles.viewAll}>View all →</a>
            </div>
            <div className={styles.appointmentsList}>
              {todaysAppointments.map(appointment => (
                <AppointmentCard
                  key={appointment.id}
                  {...appointment}
                  onEdit={() => console.log('Edit appointment', appointment.id)}
                  onCancel={() => console.log('Cancel appointment', appointment.id)}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <h3 className={styles.cardSectionTitle} style={{ marginBottom: '15px' }}>Quick Actions</h3>
            <div className={styles.quickActionsGrid}>
              <button className={styles.quickActionBtn}>📅 View Week</button>
              <button className={styles.quickActionBtn}>⏰ Set Hours</button>
              <button className={styles.quickActionBtn}>🔄 Sync Calendar</button>
              <button className={styles.quickActionBtn}>📊 Reports</button>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots Section */}
      <div className={styles.timeSlotsSection}>
        <div className={styles.timeSlotsHeader}>
          <h2 className={styles.cardSectionTitle}>Today&apos;s Time Slots</h2>
          <button className={styles.btnSecondary}>
            <Calendar className={styles.w4} /> Manage Availability
          </button>
        </div>
        <div className={styles.timeSlotsGrid}>
          {timeSlots.map((slot, index) => (
            <React.Fragment key={index}>
              <div className={styles.timeLabel}>{slot.time}</div>
              {slot.isLunch ? (
                <div className={`${styles.timeSlot} ${styles.available}`}>
                  <div className={styles.slotContent}>
                    <span style={{ color: 'var(--text-secondary)' }}>Lunch Break</span>
                  </div>
                </div>
              ) : slot.isEndOfDay ? (
                <div className={`${styles.timeSlot} ${styles.available}`}>
                  <div className={styles.slotContent}>
                    <span style={{ color: 'var(--text-secondary)' }}>End of Day</span>
                  </div>
                </div>
              ) : (
                <TimeSlot
                  time={slot.time}
                  isBooked={slot.isBooked}
                  client={slot.client}
                  service={slot.service}
                  onEdit={() => console.log('Edit slot')}
                  onCancel={() => console.log('Cancel slot')}
                  onBook={() => setShowModal(true)}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* New Appointment Modal */}
      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => console.log('New appointment:', data)}
      />
    </div>
  );
}

AppointmentCard.displayName = 'AppointmentCard';
CalendarDay.displayName = 'CalendarDay';
TimeSlot.displayName = 'TimeSlot';
AppointmentModal.displayName = 'AppointmentModal';