'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

const slides = [
  {
    id: 1,
    title: 'Tech Revolution',
    subtitle: 'Next-gen gadgets at yesterday\'s prices',
    cta: 'Shop Electronics',
    gradient: 'from-blue-600 to-cyan-600',
    icon: '💻'
  },
  {
    id: 2,
    title: 'Fresh Arrivals',
    subtitle: 'Discover what\'s trending this week',
    cta: 'View Collection',
    gradient: 'from-purple-600 to-pink-600',
    icon: '✨'
  },
  {
    id: 3,
    title: 'Premium Selection',
    subtitle: 'Luxury quality at accessible prices',
    cta: 'Explore Premium',
    gradient: 'from-indigo-600 to-purple-600',
    icon: '👑'
  },
  {
    id: 4,
    title: 'Flash Deals',
    subtitle: 'Limited time offers - Up to 60% off',
    cta: 'Grab Deals',
    gradient: 'from-orange-600 to-red-600',
    icon: '⚡'
  },
  {
    id: 5,
    title: 'Bundle & Save',
    subtitle: 'More value when you shop smart',
    cta: 'View Bundles',
    gradient: 'from-green-600 to-teal-600',
    icon: '🎁'
  }
];

export default function EcommercePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-gradient-to-r from-blue-600/90 to-purple-600/90 shadow-lg sticky top-0 z-40 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-white">Shop</h1>
              <nav className="hidden md:flex gap-6">
                <button className="text-white/80 hover:text-white transition-colors font-medium">Deals</button>
                <button className="text-white/80 hover:text-white transition-colors font-medium">New Arrivals</button>
                <button className="text-white/80 hover:text-white transition-colors font-medium">Best Sellers</button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white/30 transition-all text-white placeholder-white/70"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button className="p-2 backdrop-blur-sm bg-white/20 hover:bg-white/30 rounded-lg transition-all border border-white/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 backdrop-blur-sm bg-white/20 hover:bg-white/30 rounded-lg transition-all relative border border-white/30"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button className="p-2 backdrop-blur-sm bg-white/20 hover:bg-white/30 rounded-lg transition-all border border-white/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Slideshow */}
      <div className="relative overflow-hidden h-80">
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

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full transition-all z-10 flex items-center justify-center"
        >
          <span className="text-white text-xl">←</span>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full transition-all z-10 flex items-center justify-center"
        >
          <span className="text-white text-xl">→</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64">
            {/* Categories */}
            <div className="backdrop-blur-md bg-white/70 rounded-xl shadow-sm p-6 mb-6 border border-white/50">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md' 
                        : 'hover:bg-white/50 text-gray-700'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="backdrop-blur-md bg-white/70 rounded-xl shadow-sm p-6 border border-white/50">
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
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="backdrop-blur-md bg-white/70 rounded-xl shadow-sm p-4 mb-6 border border-white/50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-600">
                  Showing {sortedProducts.length} products
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                  
                  <div className="flex gap-2">
                    <button className="p-2 backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded-lg hover:bg-white/80 transition-all">
                      <span>⚏</span>
                    </button>
                    <button className="p-2 backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded-lg hover:bg-white/80 transition-all">
                      <span>☰</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="backdrop-blur-md bg-white/80 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-white/50">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden">
                    <span className="text-8xl">{product.image}</span>
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                        product.badge === 'SALE' ? 'bg-red-500/90' :
                        product.badge === 'NEW' ? 'bg-green-500/90' :
                        product.badge === 'HOT' ? 'bg-orange-500/90' :
                        'bg-purple-500/90'
                      } text-white`}>
                        {product.badge}
                      </span>
                    )}
                    {product.discount && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-red-500/90 text-white">
                        {product.discount}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => router.push(`/ecommerce/product/${product.id}`)}
                        className="backdrop-blur-md bg-white/90 p-2.5 rounded-lg hover:bg-white transition-all"
                      >
                        <span>👁️</span>
                      </button>
                      <button className="backdrop-blur-md bg-white/90 p-2.5 rounded-lg hover:bg-white transition-all">
                        <span>❤️</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 backdrop-blur-xl bg-white/90 shadow-2xl z-50 transform transition-transform border-l border-white/50 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Shopping Cart ({cartCount})</h3>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-2xl text-gray-500 hover:text-gray-700 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <span className="text-6xl block mb-4">🛒</span>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="backdrop-blur-sm bg-white/50 rounded-xl p-4 border border-white/50">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-3xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">${item.price}</p>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded hover:bg-white/80 transition-all"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded hover:bg-white/80 transition-all"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-600 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200/50 backdrop-blur-sm bg-white/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-gray-700">Total:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => router.push('/ecommerce/checkout')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}