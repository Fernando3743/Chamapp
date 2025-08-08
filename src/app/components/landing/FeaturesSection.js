'use client'

export default function FeaturesSection() {
  const features = [
    {
      icon: '📱',
      title: 'Custom Templates',
      description: 'Industry-specific templates to get you started in minutes. Fully customizable to match your brand.'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Real-time insights and reports to help you make data-driven decisions for your business.'
    },
    {
      icon: '🔐',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security measures to keep your business data safe and compliant.'
    },
    {
      icon: '🔄',
      title: 'Seamless Integration',
      description: 'Connect with your favorite tools and services. Import/export data with ease.'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Invite team members, assign roles, and collaborate in real-time across all your businesses.'
    },
    {
      icon: '🚀',
      title: 'Instant Deployment',
      description: 'Go live instantly with QR codes, booking pages, and customer portals ready to use.'
    }
  ]

  return (
    <section className="py-24 px-6 lg:px-12" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Everything You Need, <span className="gradient-text">Nothing You Don&apos;t</span>
          </h2>
          <p className="text-lg text-white/80">Powerful features designed for modern businesses</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-5 glass rounded-2xl flex items-center justify-center text-4xl">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}