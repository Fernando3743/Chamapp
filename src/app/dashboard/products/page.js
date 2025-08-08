'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import FilterBar from '@/app/components/dashboard/products/FilterBar';
import CategorySidebar from '@/app/components/dashboard/products/CategorySidebar';
import ProductGrid from '@/app/components/dashboard/products/ProductGrid';
import ProductList from '@/app/components/dashboard/products/ProductList';
import ProductModal from '@/app/components/dashboard/products/ProductModal';

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
      <FilterBar 
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

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
        <CategorySidebar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Products Content */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <ProductGrid 
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onDuplicate={handleDuplicateProduct}
            />
          ) : (
            <ProductList 
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onDuplicate={handleDuplicateProduct}
            />
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