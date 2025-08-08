'use client'

export default function StatsSection() {
  return (
    <section className="py-20 bg-white/[0.02] stats-section">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass rounded-3xl p-8 text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-5xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-lg text-white/80">Active Businesses</div>
          </div>
          <div className="glass rounded-3xl p-8 text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-5xl font-bold gradient-text mb-2">50M+</div>
            <div className="text-lg text-white/80">Transactions Processed</div>
          </div>
          <div className="glass rounded-3xl p-8 text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-5xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-lg text-white/80">Uptime Guarantee</div>
          </div>
          <div className="glass rounded-3xl p-8 text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-5xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-lg text-white/80">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}