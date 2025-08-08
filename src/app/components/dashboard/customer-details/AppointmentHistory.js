"use client";

export default function AppointmentHistory({ appointments, getAppointmentStatusBadge }) {
  return (
    <div className="glass border border-white/20 rounded-2xl p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Appointment History</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
              Date
            </th>
            <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
              Service
            </th>
            <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
              Staff
            </th>
            <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
              Duration
            </th>
            <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
              Status
            </th>
            <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
              Amount
            </th>
            <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr
              key={index}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="py-5 text-sm">{appointment.date}</td>
              <td className="py-5 text-sm font-medium">{appointment.service}</td>
              <td className="py-5 text-sm">{appointment.staff}</td>
              <td className="py-5 text-sm">{appointment.duration}</td>
              <td className="py-5">
                <span
                  className={`px-3 py-1 ${getAppointmentStatusBadge(
                    appointment.status
                  )} rounded-full text-xs font-semibold`}
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1).replace("-", " ")}
                </span>
              </td>
              <td className="py-5 text-sm">${appointment.amount}</td>
              <td className="py-5">
                <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-xs font-semibold hover:bg-white/15 transition-colors">
                  {appointment.status === "completed" ? "Rebook" : "View"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}