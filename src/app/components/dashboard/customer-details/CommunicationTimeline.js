"use client";

export default function CommunicationTimeline({ communications, getCommunicationIcon }) {
  return (
    <div className="glass border border-white/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Communication History</h3>
      </div>
      <div className="relative pl-8">
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-white/10"></div>
        {communications.map((comm, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            <div className="absolute -left-6 top-1 w-3 h-3 bg-primary-gradient rounded-full border-2 border-black"></div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span>{getCommunicationIcon(comm.type)}</span> {comm.action}
                </span>
                <span className="text-xs text-white/70">{comm.date}</span>
              </div>
              <div className="text-sm text-white/80 leading-relaxed">
                {comm.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}