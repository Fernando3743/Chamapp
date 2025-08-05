'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const productsData = [
  {
    id: 1,
    name: 'Premium Hair Cut',
    category: 'Hair Care Services',
    price: 45,
    type: 'service',
    duration: '30 min',
    rating: 4.9,
    reviews: 124,
    status: 'active',
    badge: 'NEW',
    icon: '💇‍♀️'
  },
  {
    id: 2,
    name: 'Organic Shampoo',
    category: 'Hair Care Products',
    price: 24,
    type: 'product',
    stock: 45,
    rating: 4.7,
    reviews: 89,
    status: 'active',
    badge: '-20%',
    badgeColor: 'bg-red-500',
    icon: '🧴'
  },
  {
    id: 3,
    name: 'Gel Manicure',
    category: 'Nail Services',
    price: 35,
    type: 'service',
    duration: '45 min',
    rating: 4.8,
    reviews: 156,
    status: 'active',
    badge: 'FEATURED',
    badgeColor: 'bg-yellow-500',
    icon: '💅'
  },
  {
    id: 4,
    name: 'Deep Tissue Massage',
    category: 'Spa & Massage',
    price: 80,
    type: 'service',
    duration: '60 min',
    rating: 5.0,
    reviews: 203,
    status: 'active',
    icon: '🧖‍♀️'
  },
  {
    id: 5,
    name: 'Lipstick Collection',
    category: 'Cosmetics',
    price: 18,
    type: 'product',
    stock: 120,
    rating: 4.6,
    reviews: 67,
    status: 'active',
    icon: '💄'
  },
  {
    id: 6,
    name: 'Personal Training',
    category: 'Fitness',
    price: 60,
    type: 'service',
    duration: '60 min',
    rating: 4.9,
    reviews: 92,
    status: 'active',
    icon: '🏋️‍♀️'
  }
];

const categories = [
  { name: 'All Categories', icon: '🎯', count: 248, active: true },
  { name: 'Hair Care', icon: '💇', count: 56 },
  { name: 'Nail Services', icon: '💅', count: 34 },
  { name: 'Spa & Massage', icon: '🧖', count: 45 },
  { name: 'Cosmetics', icon: '💄', count: 67 },
  { name: 'Fitness', icon: '🏋️', count: 28 },
  { name: 'Health Services', icon: '🩺', count: 18 }
];

export default function ProductsDashboard() {
  const { t } = useLanguage();
  const [products, setProducts] = useState(productsData);
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddProduct = (product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p));
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleDuplicateProduct = (product) => {
    const newProduct = { ...product, id: Date.now(), name: `${product.name} (Copy)` };
    setProducts([...products, newProduct]);
  };

  const stats = [
    { 
      title: 'Total Products', 
      value: '248', 
      change: '+12%', 
      changeText: 'vs last month',
      icon: '📦',
      positive: true 
    },
    { 
      title: 'Total Value', 
      value: '$45,320', 
      change: '+8.5%', 
      changeText: 'inventory value',
      icon: '💰',
      positive: true 
    },
    { 
      title: 'Low Stock', 
      value: '23', 
      changeText: 'Items need restock',
      icon: '⚠️'
    },
    { 
      title: 'Top Rated', 
      value: '4.8/5', 
      changeText: 'Average rating',
      icon: '⭐'
    }
  ];

  return (
    <main className="p-8">
      {/* Page Header */}
      <div className="glass border border-white/20 rounded-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div>
            <h1 className="text-4xl font-bold mb-2">Products & Services</h1>
            <p className="text-white/80 text-base">Manage your inventory and service offerings</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className="glass backdrop-blur-20 px-6 py-3 rounded-xl font-semibold hover:bg-white/15 transition-all flex items-center justify-center gap-2 bg-white/10 border border-white/20">
              <span>📥</span> Import
            </button>
            <button className="glass backdrop-blur-20 px-6 py-3 rounded-xl font-semibold hover:bg-white/15 transition-all flex items-center justify-center gap-2 bg-white/10 border border-white/20">
              <span>📤</span> Export
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-gradient px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <span>+</span> Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-3">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 glass backdrop-blur-20 rounded-xl cursor-pointer hover:bg-white/10 transition-all bg-white/5 border border-white/10"
          >
            <option value="all">All Products</option>
            <option value="products">Products Only</option>
            <option value="services">Services Only</option>
          </select>
          <select className="px-4 py-2.5 glass backdrop-blur-20 rounded-xl cursor-pointer hover:bg-white/10 transition-all bg-white/5 border border-white/10">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Out of Stock</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 glass backdrop-blur-20 rounded-xl cursor-pointer hover:bg-white/10 transition-all bg-white/5 border border-white/10"
          >
            <option value="name">Sort by: Name</option>
            <option value="priceLow">Sort by: Price (Low to High)</option>
            <option value="priceHigh">Sort by: Price (High to Low)</option>
            <option value="stock">Sort by: Stock</option>
            <option value="date">Sort by: Date Added</option>
          </select>
        </div>
        <div className="flex gap-1 glass backdrop-blur-20 p-1.5 rounded-xl bg-white/5">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-violet-600/20 text-white' : 'text-white/60 hover:text-white'}`}
          >
            ⊞
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-violet-600/20 text-white' : 'text-white/60 hover:text-white'}`}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="glass backdrop-blur-20 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/20 transition-all bg-white/5 border border-white/10">
            <div className="flex justify-between items-start mb-5">
              <div className="w-12 h-12 bg-violet-600/10 rounded-xl flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
            </div>
            <div className="text-sm text-white/60 mb-2">{stat.title}</div>
            <div className="text-3xl font-bold mb-2.5">{stat.value}</div>
            <div className="flex items-center gap-2 text-sm">
              {stat.change && (
                <span className={`font-semibold flex items-center gap-1 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.positive ? '↑' : '↓'} {stat.change}
                </span>
              )}
              <span className="text-white/60">{stat.changeText}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Products Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar */}
        <aside className="w-full lg:w-[280px] flex-shrink-0">
          <div className="glass backdrop-blur-20 rounded-2xl p-6 lg:sticky lg:top-5 bg-white/5 border border-white/10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold">Categories</h3>
              <button className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-base">
                +
              </button>
            </div>
            <div className="space-y-1">
              {categories.map((category) => (
                <div 
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-3 rounded-xl flex justify-between items-center cursor-pointer transition-all ${
                    selectedCategory === category.name 
                      ? 'bg-violet-600/20 text-white' 
                      : 'hover:bg-white/5 text-white/80 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium">
                    <span>{category.icon}</span> {category.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">{category.count}</span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-base font-semibold mb-5">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Active Items</span>
                  <span className="font-semibold">212</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Out of Stock</span>
                  <span className="font-semibold">14</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Services</span>
                  <span className="font-semibold">85</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Products</span>
                  <span className="font-semibold">163</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Content */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'}}>
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onDuplicate={handleDuplicateProduct}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="glass backdrop-blur-20 rounded-2xl p-5 flex gap-5 items-center hover:translate-x-1 hover:shadow-lg hover:shadow-violet-500/20 transition-all bg-white/5 border border-white/10">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {product.icon}
                  </div>
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-5 items-center">
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-white/60">{product.category}</div>
                    </div>
                    <div className="text-lg font-semibold">${product.price}</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-sm">
                        {product.type === 'product' ? `${product.stock} in stock` : 'Active'}
                      </span>
                    </div>
                    <div className="text-sm text-white/60">⭐ {product.rating} ({product.reviews})</div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDuplicateProduct(product)}
                        className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
                      >
                        📋
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleAddProduct}
        product={editingProduct}
      />
    </main>
  );
}