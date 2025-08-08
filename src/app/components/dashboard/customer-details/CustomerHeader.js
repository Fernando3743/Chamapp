"use client";

export default function CustomerHeader({ customer, getStatusBadge }) {
  return (
    <div className="glass border border-white/20 rounded-2xl p-8 mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 flex-1">
          <div className="relative">
            <div className="w-24 h-24 bg-primary-gradient rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {customer.initials}
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black"></div>
          </div>
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-3xl font-bold mb-2">{customer.name}</h1>
            <div className="flex flex-col lg:flex-row items-center gap-5 mb-4 text-sm text-white/80">
              <span className="flex items-center gap-2">
                📧 {customer.email}
              </span>
              <span className="flex items-center gap-2">
                📱 {customer.phone}
              </span>
              <span className="flex items-center gap-2">
                📍 {customer.location}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <span
                className={`px-4 py-1 ${
                  getStatusBadge("vip").style
                } rounded-full text-sm font-medium`}
              >
                {getStatusBadge("vip").label}
              </span>
              <span className="px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                Loyal (3+ years)
              </span>
              <span className="px-4 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium">
                Premium Member
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
          <button className="px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30">
            <span>📅</span> Book Appointment
          </button>
          <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/15">
            <span>💬</span> Send Message
          </button>
          <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center hover:bg-white/15">
            <span>⋮</span>
          </button>
        </div>
      </div>
    </div>
  );
}