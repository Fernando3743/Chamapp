'use client';

import { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, onSave, product }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    type: 'product',
    price: '',
    stock: '',
    duration: '',
    description: '',
    icon: '📦'
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        type: product.type || 'product',
        price: product.price || '',
        stock: product.stock || '',
        duration: product.duration || '',
        description: product.description || '',
        icon: product.icon || '📦'
      });
    } else {
      setFormData({
        name: '',
        category: '',
        type: 'product',
        price: '',
        stock: '',
        duration: '',
        description: '',
        icon: '📦'
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: formData.type === 'product' ? parseInt(formData.stock) : undefined,
      rating: product?.rating || 4.5,
      reviews: product?.reviews || 0,
      status: 'active'
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass backdrop-blur-20 rounded-3xl p-6 lg:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in bg-white/5 border border-white/10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold">
            {product ? 'Edit Product/Service' : 'Add New Product/Service'}
          </h3>
          <button 
            onClick={onClose}
            className="w-9 h-9 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center glass-hover text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center cursor-pointer hover:border-violet-500/50 hover:bg-white/5 transition-all">
              <div className="text-5xl mb-2.5">{formData.icon || '📸'}</div>
              <div className="text-sm text-white/60">Click to select icon</div>
              <div className="flex justify-center gap-2 mt-4">
                {['📦', '💇‍♀️', '🧴', '💅', '🧖‍♀️', '💄', '🏋️‍♀️', '🩺'].map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl hover:bg-white/10 transition-all ${
                      formData.icon === icon ? 'bg-violet-600/20 border border-violet-500' : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-white/60 mb-2">Product/Service Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/10 focus:border-violet-500/50 transition-all" 
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:bg-white/10 focus:border-violet-500/50 transition-all cursor-pointer"
                required
              >
                <option value="">Select category</option>
                <option value="Hair Care Services">Hair Care Services</option>
                <option value="Hair Care Products">Hair Care Products</option>
                <option value="Nail Services">Nail Services</option>
                <option value="Spa & Massage">Spa & Massage</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Fitness">Fitness</option>
                <option value="Health Services">Health Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:bg-white/10 focus:border-violet-500/50 transition-all cursor-pointer"
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Price</label>
              <input 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/10 focus:border-violet-500/50 transition-all" 
                placeholder="0.00" 
                step="0.01"
                required
              />
            </div>
            {formData.type === 'product' ? (
              <div>
                <label className="block text-sm text-white/60 mb-2">Stock Quantity</label>
                <input 
                  type="number" 
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/10 focus:border-violet-500/50 transition-all" 
                  placeholder="0"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm text-white/60 mb-2">Duration</label>
                <input 
                  type="text" 
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/10 focus:border-violet-500/50 transition-all" 
                  placeholder="e.g., 30 min"
                />
              </div>
            )}
          </div>
          
          <div className="mt-5">
            <label className="block text-sm text-white/60 mb-2">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/10 focus:border-violet-500/50 transition-all resize-y min-h-[100px]" 
              placeholder="Enter product or service description"
            />
          </div>
          
          <div className="flex gap-4 mt-8">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 glass backdrop-blur-20 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all bg-white/5 border border-white/10"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 gradient-bg px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all"
            >
              {product ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}