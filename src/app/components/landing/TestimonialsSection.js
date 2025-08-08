'use client'

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "BusinessHub transformed how we manage our real estate portfolio. The automation features alone save us 20+ hours per week. Absolutely game-changing!",
      name: "John Davis",
      role: "Real Estate Agency Owner",
      initial: "JD"
    },
    {
      text: "The appointment scheduling system is perfect for our barbershop. Clients love the easy booking process, and we've reduced no-shows by 40%.",
      name: "Marcus Williams",
      role: "Barbershop Owner",
      initial: "MW"
    },
    {
      text: "Managing multiple restaurant locations has never been easier. The real-time analytics help us make better decisions every day.",
      name: "Sarah Chen",
      role: "Restaurant Chain Manager",
      initial: "SC"
    },
    {
      text: "BusinessHub's gym management features are incredible. Member check-ins, class bookings, and payment processing all in one place!",
      name: "Alex Lopez",
      role: "Fitness Center Owner",
      initial: "AL"
    },
    {
      text: "The customization options are endless. We've built exactly what we need for our medical practice without any coding knowledge.",
      name: "Dr. Rachel Park",
      role: "Medical Practice Owner",
      initial: "RP"
    }
  ]

  return (
    <section className="py-24 bg-white/[0.02] overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Loved by <span className="gradient-text">Thousands of Businesses</span>
          </h2>
          <p className="text-lg text-white/80">See what our customers have to say about BusinessHub</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex gap-8 animate-scroll hover:animation-play-state-paused testimonials-track">
          {/* First set of testimonials */}
          {testimonials.map((testimonial, index) => (
            <div key={`first-${index}`} className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;{testimonial.text}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-white/80">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless scrolling */}
          {testimonials.map((testimonial, index) => (
            <div key={`second-${index}`} className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;{testimonial.text}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-white/80">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}