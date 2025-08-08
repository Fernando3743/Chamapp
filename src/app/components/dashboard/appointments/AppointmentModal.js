"use client";

/**
 * Modal component for creating/editing appointments
 * Handles form state and submission
 */
export default function AppointmentModal({
  isOpen,
  onClose,
  appointmentForm,
  onFormChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-modalSlideIn no-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold">New Appointment</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 text-xl hover:bg-white/20"
          >
            ×
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label className="block text-sm text-white/60 mb-2">
              Client Name
            </label>
            <input
              type="text"
              name="clientName"
              value={appointmentForm.clientName}
              onChange={onFormChange}
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
              onChange={onFormChange}
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
              onChange={onFormChange}
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
              onChange={onFormChange}
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
              onChange={onFormChange}
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
              onChange={onFormChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300 resize-y min-h-[100px]"
              placeholder="Add any special notes or requirements"
            />
          </div>
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
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
  );
}