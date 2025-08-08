'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
import ErrorBoundary from './components/ErrorBoundary';

// Input sanitization utility
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  // Remove HTML tags and dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[<>\"']/g, '')
    .trim();
};

// Validate price range
const validatePriceRange = (value) => {
  const num = parseInt(value);
  if (isNaN(num)) return 0;
  return Math.max(0, Math.min(10000, num)); // Cap at reasonable max
};

const categories = [
  { id: 'all', name: 'All Products', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )},
  { id: 'electronics', name: 'Electronics', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )},
  { id: 'clothing', name: 'Clothing', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  )},
  { id: 'home', name: 'Home & Garden', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )},
  { id: 'sports', name: 'Sports & Outdoors', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { id: 'books', name: 'Books', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )},
  { id: 'toys', name: 'Toys & Games', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  )},
  { id: 'beauty', name: 'Beauty & Health', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )}
];

const products = [
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    category: 'electronics',
    price: 299.99,
    originalPrice: 399.99,
    image: '🎧',
    rating: 4.5,
    reviews: 234,
    badge: 'SALE',
    discount: '-25%'
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    category: 'electronics',
    price: 449.99,
    image: '⌚',
    rating: 4.8,
    reviews: 567,
    badge: 'NEW'
  },
  {
    id: 3,
    name: 'Premium Leather Jacket',
    category: 'clothing',
    price: 189.99,
    originalPrice: 299.99,
    image: '🧥',
    rating: 4.6,
    reviews: 123,
    discount: '-37%'
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    category: 'home',
    price: 599.99,
    image: '🪑',
    rating: 4.7,
    reviews: 891,
    badge: 'BESTSELLER'
  },
  {
    id: 5,
    name: 'Professional Yoga Mat',
    category: 'sports',
    price: 79.99,
    image: '🧘',
    rating: 4.9,
    reviews: 456
  },
  {
    id: 6,
    name: 'Organic Face Cream',
    category: 'beauty',
    price: 54.99,
    image: '🧴',
    rating: 4.4,
    reviews: 234
  },
  {
    id: 7,
    name: 'Gaming Console Bundle',
    category: 'toys',
    price: 499.99,
    originalPrice: 599.99,
    image: '🎮',
    rating: 4.9,
    reviews: 1234,
    badge: 'HOT',
    discount: '-17%'
  },
  {
    id: 8,
    name: 'Bestseller Novel Collection',
    category: 'books',
    price: 39.99,
    image: '📚',
    rating: 4.6,
    reviews: 789
  }
];

// This would normally come from the database based on the store URL/ID
const storeProfile = {
  businessName: "TechHub Electronics",
  tagline: "Your Premium Tech Destination",
  logo: "🏪", // Would be an actual image URL
  owner: "John Smith",
  rating: 4.8,
  totalReviews: 1234,
  verified: true,
  memberSince: "2023",
  description: "We specialize in premium electronics and gadgets with exceptional customer service and warranty support.",
  location: "New York, NY",
  responseTime: "Typically responds within 1 hour",
  policies: {
    shipping: "Free shipping on orders over $50",
    returns: "30-day return policy",
    warranty: "1-year warranty on all products"
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "support@techhub.com",
    whatsapp: "+1 (555) 123-4567"
  },
  socialMedia: {
    instagram: "@techhub",
    facebook: "techhubelectronics",
    twitter: "@techhub"
  },
  stats: {
    products: 248,
    sales: "10K+",
    followers: "5.2K"
  }
};

const slides = [
  {
    id: 1,
    title: 'Welcome to Our Store',
    subtitle: 'Discover amazing products curated just for you',
    cta: 'Shop Now',
    gradient: 'from-blue-600 to-purple-600',
    icon: '🛍️'
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Check out our latest collection',
    cta: 'View Collection',
    gradient: 'from-purple-600 to-pink-600',
    icon: '✨'
  },
  {
    id: 3,
    title: 'Special Offers',
    subtitle: 'Limited time deals you don\'t want to miss',
    cta: 'View Deals',
    gradient: 'from-orange-600 to-red-600',
    icon: '🎯'
  }
];

function EcommercePageContent() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Memoized filtered products for performance
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchQuery, priceRange]);

  // Memoized sorted products for performance
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // Optimized cart functions with useCallback
  const addToCart = useCallback((product) => {
    if (!product || !product.id) return;
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId) => {
    if (!productId) return;
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, change) => {
    if (!productId || typeof change !== 'number') return;
    
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  }, []);

  // Sanitized search handler
  const handleSearchChange = useCallback((e) => {
    const sanitized = sanitizeInput(e.target.value);
    setSearchQuery(sanitized);
  }, []);

  // Validated price range handler
  const handlePriceChange = useCallback((e) => {
    const validatedPrice = validatePriceRange(e.target.value);
    setPriceRange([priceRange[0], validatedPrice]);
  }, [priceRange]);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  {storeProfile.logo}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{storeProfile.businessName}</h1>
                  <p className="text-xs text-gray-600">{storeProfile.tagline}</p>
                </div>
              </div>
              <nav className="hidden lg:flex gap-6 ml-8">
                <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Home</button>
                <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Products</button>
                <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">About</button>
                <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Contact</button>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  maxLength={50}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Slideshow */}
      <div 
        className="relative overflow-hidden h-80"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide 
                  ? 'opacity-100 transform translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 transform -translate-x-full'
                    : 'opacity-0 transform translate-x-full'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
              <div className="relative backdrop-blur-sm bg-white/10 h-full flex items-center">
                <div className="container mx-auto px-8 md:px-12 lg:px-16">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-6xl animate-bounce">{slide.icon}</span>
                      <h2 className="text-4xl md:text-5xl font-bold text-white">{slide.title}</h2>
                    </div>
                    <p className="text-xl mb-6 text-white/90">{slide.subtitle}</p>
                    <button className="backdrop-blur-md bg-white/90 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all shadow-lg">
                      {slide.cta} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all ${
                index === currentSlide 
                  ? 'w-8 h-2 bg-white rounded-full' 
                  : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="hidden md:flex absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full transition-all z-10 items-center justify-center"
        >
          <span className="text-white text-xl">←</span>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="hidden md:flex absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full transition-all z-10 items-center justify-center"
        >
          <span className="text-white text-xl">→</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Brand Profile Sidebar */}
          <aside className="hidden xl:block w-80">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-24">
              {/* Store Profile Header */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                  {storeProfile.logo}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{storeProfile.businessName}</h2>
                {storeProfile.verified && (
                  <div className="inline-flex items-center gap-1 text-blue-600 text-sm mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Seller
                  </div>
                )}
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(storeProfile.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({storeProfile.totalReviews})</span>
                </div>
                <p className="text-sm text-gray-600">Member since {storeProfile.memberSince}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{storeProfile.stats.products}</p>
                  <p className="text-xs text-gray-600">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{storeProfile.stats.sales}</p>
                  <p className="text-xs text-gray-600">Sales</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{storeProfile.stats.followers}</p>
                  <p className="text-xs text-gray-600">Followers</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-sm text-gray-700 leading-relaxed">{storeProfile.description}</p>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-2 mb-6">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  Follow Store
                </button>
                <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
                  Contact Seller
                </button>
              </div>

              {/* Store Policies */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                    <p className="text-xs text-gray-600">{storeProfile.policies.shipping}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Returns</p>
                    <p className="text-xs text-gray-600">{storeProfile.policies.returns}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Warranty</p>
                    <p className="text-xs text-gray-600">{storeProfile.policies.warranty}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex justify-center gap-3">
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex gap-6">
              {/* Categories Sidebar */}
              <aside className="hidden lg:block w-64">
                {/* Categories */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-1">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                          selectedCategory === category.id 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {category.icon}
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full accent-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </aside>

              {/* Products Area */}
              <main className="flex-1">
                {/* Toolbar */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-600">
                  Showing {sortedProducts.length} products
                </div>
                
                    <div className="flex gap-4">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                        <option value="reviews">Most Reviews</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProducts.length > 0 ? (
                    sortedProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={addToCart}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-600">Try adjusting your filters or search terms</p>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />
    </div>
  );
}

// Export with ErrorBoundary wrapper
export default function EcommercePage() {
  return (
    <ErrorBoundary>
      <EcommercePageContent />
    </ErrorBoundary>
  );
}