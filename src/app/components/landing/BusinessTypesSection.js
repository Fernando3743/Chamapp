'use client'

export default function BusinessTypesSection() {
  const businessTypes = [
    {
      icon: '🏠',
      title: 'Real Estate',
      features: [
        'Property listings management',
        'Virtual tours & galleries',
        'Client CRM & follow-ups',
        'Document management',
        'Commission tracking'
      ]
    },
    {
      icon: '✂️',
      title: 'Barbershop & Salon',
      features: [
        'Online appointment booking',
        'Staff scheduling',
        'Customer feedback system',
        'Inventory management',
        'Loyalty programs'
      ]
    },
    {
      icon: '🍔',
      title: 'Restaurant & Cafe',
      features: [
        'Digital menu with QR codes',
        'Table reservations',
        'Order management',
        'Kitchen display system',
        'Delivery integration'
      ]
    },
    {
      icon: '🏋️',
      title: 'Fitness & Gym',
      features: [
        'Member management',
        'Class scheduling',
        'Personal training bookings',
        'Payment processing',
        'Progress tracking'
      ]
    },
    {
      icon: '🏥',
      title: 'Healthcare',
      features: [
        'Patient appointments',
        'Medical records',
        'Prescription management',
        'Billing & insurance',
        'Telemedicine support'
      ]
    },
    {
      icon: '🛍️',
      title: 'Retail & E-commerce',
      features: [
        'Inventory tracking',
        'POS integration',
        'Customer database',
        'Sales analytics',
        'Multi-channel selling'
      ]
    }
  ]

  return (
    <section className="py-24 px-6 lg:px-12" id="solutions">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Solutions for <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-lg text-white/80">Pre-built solutions tailored to your specific business needs</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessTypes.map((business, index) => (
            <div key={index} className="glass rounded-3xl p-8 text-center cursor-pointer hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-5 bg-primary-gradient rounded-3xl flex items-center justify-center text-5xl hover:scale-110 hover:rotate-[5deg] transition-all duration-300">
                {business.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{business.title}</h3>
              <ul className="text-white/80 text-sm space-y-2">
                {business.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}