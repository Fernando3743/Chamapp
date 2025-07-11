'use client';

import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Phone, Mail, Globe, Calendar, Users, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function BusinessDetailPage({ params }) {
  const { t } = useLanguage();
  const mockBusiness = {
    id: 1,
    name: "Elite Barber Shop",
    type: "barber",
    description: "Premium barbering services with skilled professionals. We've been serving the community for over 15 years with traditional techniques and modern styles.",
    address: "123 Main St, Downtown",
    phone: "(555) 123-4567",
    email: "info@elitebarbershop.com",
    website: "www.elitebarbershop.com",
    rating: 4.8,
    totalReviews: 156,
    image: "/api/placeholder/600/400",
    gallery: ["/api/placeholder/300/200", "/api/placeholder/300/200", "/api/placeholder/300/200"],
    hours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },
    services: [
      { name: "Classic Haircut", duration: "30 min", price: "$35" },
      { name: "Beard Trim", duration: "20 min", price: "$25" },
      { name: "Hot Towel Shave", duration: "45 min", price: "$50" },
      { name: "Haircut + Beard Trim", duration: "45 min", price: "$55" },
      { name: "Kids Haircut", duration: "25 min", price: "$28" }
    ],
    staff: [
      { name: "Mike Johnson", specialty: "Classic Cuts", image: "/api/placeholder/150/150" },
      { name: "Sarah Davis", specialty: "Modern Styles", image: "/api/placeholder/150/150" },
      { name: "Carlos Martinez", specialty: "Beard Specialist", image: "/api/placeholder/150/150" }
    ],
    reviews: [
      {
        name: "John D.",
        rating: 5,
        comment: "Excellent service! Mike gave me the best haircut I've had in years.",
        date: "2 days ago"
      },
      {
        name: "Maria S.",
        rating: 4,
        comment: "Great atmosphere and skilled barbers. Will definitely come back.",
        date: "1 week ago"
      },
      {
        name: "David L.",
        rating: 5,
        comment: "Professional service and attention to detail. Highly recommend!",
        date: "2 weeks ago"
      }
    ]
  };

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
          <Link href="/businesses" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToBusinesses')}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-80 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">{t('businessHeroImage')}</span>
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockBusiness.name}</h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${businessTypeColors[mockBusiness.type]}`}>
                  {mockBusiness.type.charAt(0).toUpperCase() + mockBusiness.type.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg font-semibold">{mockBusiness.rating}</span>
                  <span className="ml-1 text-gray-600">({mockBusiness.totalReviews} {t('reviewsCount')})</span>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('bookAppointment')}
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{mockBusiness.description}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{t('services')}</h2>
                  <div className="space-y-3">
                    {mockBusiness.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{service.price}</p>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            {t('bookNow')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{t('ourTeam')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockBusiness.staff.map((member, index) => (
                      <div key={index} className="text-center">
                        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-gray-500">{t('photo')}</span>
                        </div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.specialty}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('reviews')}</h2>
                  <div className="space-y-4">
                    {mockBusiness.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center mb-2">
                          <span className="font-medium mr-2">{review.name}</span>
                          <div className="flex text-yellow-400">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">{t('contactInformation')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">{t('address')}</p>
                        <p className="font-medium">{mockBusiness.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">{t('phone')}</p>
                        <p className="font-medium">{mockBusiness.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">{t('email')}</p>
                        <p className="font-medium">{mockBusiness.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">{t('website')}</p>
                        <p className="font-medium text-blue-600">{mockBusiness.website}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('businessHours')}</h3>
                  <div className="space-y-2">
                    {Object.entries(mockBusiness.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize text-gray-700">{t(day)}</span>
                        <span className="font-medium">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}