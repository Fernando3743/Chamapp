'use client';

import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Phone, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BusinessesPage() {
  const { t } = useLanguage();
  const mockBusinesses = [
    {
      id: 1,
      name: "Elite Barber Shop",
      type: "barber",
      description: "Premium barbering services with skilled professionals",
      address: "123 Main St, Downtown",
      phone: "(555) 123-4567",
      rating: 4.8,
      image: "/api/placeholder/300/200",
      services: ["Haircut", "Beard Trim", "Hot Towel Shave"],
      price_range: "$25-60"
    },
    {
      id: 2,
      name: "Bella Vista Restaurant",
      type: "restaurant",
      description: "Authentic Italian cuisine in a cozy atmosphere",
      address: "456 Oak Ave, Midtown",
      phone: "(555) 234-5678",
      rating: 4.6,
      image: "/api/placeholder/300/200",
      services: ["Dinner", "Lunch", "Private Events"],
      price_range: "$15-45"
    },
    {
      id: 3,
      name: "Premier Properties",
      type: "real_estate",
      description: "Your trusted real estate partner for buying and selling",
      address: "789 Business Blvd, Commercial District",
      phone: "(555) 345-6789",
      rating: 4.9,
      image: "/api/placeholder/300/200",
      services: ["Property Sales", "Property Rentals", "Property Management"],
      price_range: "Commission Based"
    },
    {
      id: 4,
      name: "Zen Wellness Spa",
      type: "wellness",
      description: "Relaxation and rejuvenation services for mind and body",
      address: "321 Wellness Way, Spa District",
      phone: "(555) 456-7890",
      rating: 4.7,
      image: "/api/placeholder/300/200",
      services: ["Massage", "Facial", "Aromatherapy"],
      price_range: "$50-120"
    },
    {
      id: 5,
      name: "FitZone Gym",
      type: "fitness",
      description: "State-of-the-art fitness facility with personal training",
      address: "654 Fitness St, Sports Complex",
      phone: "(555) 567-8901",
      rating: 4.5,
      image: "/api/placeholder/300/200",
      services: ["Personal Training", "Group Classes", "Equipment Access"],
      price_range: "$30-80"
    },
    {
      id: 6,
      name: "TechConsult Pro",
      type: "professional",
      description: "Professional consulting services for technology solutions",
      address: "987 Tech Park, Innovation Hub",
      phone: "(555) 678-9012",
      rating: 4.8,
      image: "/api/placeholder/300/200",
      services: ["IT Consulting", "Software Development", "System Integration"],
      price_range: "$100-300"
    }
  ];

  const businessTypeColors = {
    barber: "bg-blue-100 text-blue-800",
    restaurant: "bg-green-100 text-green-800",
    real_estate: "bg-purple-100 text-purple-800",
    wellness: "bg-pink-100 text-pink-800",
    fitness: "bg-orange-100 text-orange-800",
    professional: "bg-indigo-100 text-indigo-800"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToHome')}
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('browseBusiness')}</h1>
          <p className="text-gray-600">{t('discoverBusinesses')}</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {t('all')}
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              {t('barberShops')}
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              {t('restaurants')}
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              {t('realEstate')}
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              {t('healthWellness')}
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              {t('fitnessSports')}
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              {t('professionalServices')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBusinesses.map((business) => (
            <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Business Image</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{business.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${businessTypeColors[business.type]}`}>
                    {business.type.charAt(0).toUpperCase() + business.type.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{business.description}</p>
                
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{business.rating}</span>
                </div>
                
                <div className="text-sm text-gray-500 mb-3">
                  <div className="flex items-center mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <p>{business.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    <p>{business.phone}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">{t('services')}:</p>
                  <div className="flex flex-wrap gap-1">
                    {business.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{business.price_range}</span>
                  <Link 
                    href={`/businesses/${business.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}