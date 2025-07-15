'use client';

import React, { useState, useCallback, useMemo } from 'react';
import styles from '../../styles/components/dashboard/ProductsPage.module.css';
import modalStyles from '../../styles/components/dashboard/shared/modal.module.css';
import formStyles from '../../styles/components/dashboard/shared/forms.module.css';
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  MoreVertical,
  Grid,
  List,
  Edit2,
  Copy,
  Trash2,
  X,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  AlertTriangle,
  Star
} from 'lucide-react';

// Product Card Component
const ProductCard = React.memo(({ product, onEdit, onDuplicate, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <span className={styles.emoji}>{product.emoji}</span>
        {product.badge && (
          <span className={`${styles.badge} ${styles[`badge${product.badge.charAt(0).toUpperCase() + product.badge.slice(1).toLowerCase()}`]}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.category}>{product.category}</p>
          </div>
          <div className={styles.price}>${product.price}</div>
        </div>
        <div className={styles.details}>
          <span className={styles.stat}>
            <Star style={{ width: '16px', height: '16px' }} /> {product.rating} ({product.reviews})
          </span>
          {product.type === 'product' ? (
            <span className={styles.stat}>
              <Package style={{ width: '16px', height: '16px' }} /> {product.stock} in stock
            </span>
          ) : (
            <span className={styles.stat}>📅 {product.duration}</span>
          )}
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={() => onEdit(product)}>
              <Edit2 style={{ width: '16px', height: '16px' }} />
            </button>
            <button className={styles.actionBtn} onClick={() => onDuplicate(product)}>
              <Copy style={{ width: '16px', height: '16px' }} />
            </button>
            <button className={styles.actionBtn} onClick={() => onDelete(product)}>
              <Trash2 style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Product List Item Component
const ProductListItem = React.memo(({ product, onEdit, onDuplicate, onDelete }) => {
  const stockIndicatorClass = product.stock > 20 ? styles.inStock : 
                             product.stock > 0 ? styles.lowStock : styles.outStock;

  return (
    <div className={styles.productListItem}>
      <div className={styles.productListImage}>{product.emoji}</div>
      <div className={styles.productListInfo}>
        <div className={styles.productListName}>
          <span className={styles.productListTitle}>{product.name}</span>
          <span className={styles.productListCategory}>{product.category}</span>
        </div>
        <div className={styles.productListPrice}>${product.price}</div>
        <div className={styles.productListStock}>
          {product.type === 'product' ? (
            <>
              <span className={`${styles.stockIndicator} ${stockIndicatorClass}`}></span>
              <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
            </>
          ) : (
            <span>Active</span>
          )}
        </div>
        <div className={styles.productStat}>
          <Star className={styles.w4} /> {product.rating} ({product.reviews})
        </div>
        <div className={styles.productActions}>
          <button className={styles.actionBtn} onClick={() => onEdit(product)}>
            <Edit2 className={styles.w4} />
          </button>
          <button className={styles.actionBtn} onClick={() => onDuplicate(product)}>
            <Copy className={styles.w4} />
          </button>
          <button className={styles.actionBtn} onClick={() => onDelete(product)}>
            <Trash2 className={styles.w4} />
          </button>
        </div>
      </div>
    </div>
  );
});

// Add/Edit Product Modal
const ProductModal = React.memo(({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    type: product?.type || 'product',
    price: product?.price || '',
    stock: product?.stock || '',
    duration: product?.duration || '',
    description: product?.description || ''
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  }, [formData, onSave, onClose]);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`${modalStyles.modalOverlay} ${modalStyles.modalActive}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h3 className={modalStyles.modalTitle}>{product ? 'Edit' : 'Add New'} Product/Service</h3>
          <button className={modalStyles.modalClose} onClick={onClose}>
            <X className={styles.w5} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`${formStyles.formGroup} ${styles.fullWidth}`}>
            <div className={styles.imageUpload}>
              <div className={styles.uploadIcon}>📸</div>
              <div className={styles.uploadText}>Click to upload image or drag and drop</div>
            </div>
          </div>
          
          <div className={styles.formGrid}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.formLabel}>Product/Service Name</label>
              <input 
                type="text" 
                className={formStyles.formInput} 
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.formLabel}>Category</label>
              <select 
                className={formStyles.formSelect}
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="Hair Care">Hair Care</option>
                <option value="Nail Services">Nail Services</option>
                <option value="Spa & Massage">Spa & Massage</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Fitness">Fitness</option>
                <option value="Health Services">Health Services</option>
              </select>
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.formLabel}>Type</label>
              <select 
                className={formStyles.formSelect}
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.formLabel}>Price</label>
              <input 
                type="number" 
                className={formStyles.formInput} 
                placeholder="0.00" 
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
              />
            </div>
            {formData.type === 'product' ? (
              <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel}>Stock Quantity</label>
                <input 
                  type="number" 
                  className={formStyles.formInput} 
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', e.target.value)}
                />
              </div>
            ) : (
              <div className={formStyles.formGroup}>
                <label className={formStyles.formLabel}>Duration</label>
                <input 
                  type="text" 
                  className={formStyles.formInput} 
                  placeholder="e.g., 30 min"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                />
              </div>
            )}
          </div>
          
          <div className={`${formStyles.formGroup} ${styles.fullWidth}`}>
            <label className={formStyles.formLabel}>Description</label>
            <textarea 
              className={formStyles.formTextarea} 
              placeholder="Enter product or service description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="4"
            />
          </div>
          
          <div className={formStyles.formActions}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.btnPrimary}>
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Stats data
  const stats = [
    { 
      icon: <Package className={styles.w7} />, 
      label: 'Total Products', 
      value: '248', 
      trend: 'up', 
      trendValue: '12%',
      trendText: 'vs last month' 
    },
    { 
      icon: <DollarSign className={styles.w7} />, 
      label: 'Total Value', 
      value: '$45,320', 
      trend: 'up', 
      trendValue: '8.5%',
      trendText: 'inventory value' 
    },
    { 
      icon: <AlertTriangle className={styles.w7} />, 
      label: 'Low Stock', 
      value: '23', 
      trend: 'none',
      trendText: 'Items need restock'
    },
    { 
      icon: <Star className={styles.w7} />, 
      label: 'Top Rated', 
      value: '4.8/5', 
      trend: 'none',
      trendText: 'Average rating'
    }
  ];

  // Categories data
  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎯', count: 248 },
    { id: 'hair', name: 'Hair Care', icon: '💇', count: 56 },
    { id: 'nail', name: 'Nail Services', icon: '💅', count: 34 },
    { id: 'spa', name: 'Spa & Massage', icon: '🧖', count: 45 },
    { id: 'cosmetics', name: 'Cosmetics', icon: '💄', count: 67 },
    { id: 'fitness', name: 'Fitness', icon: '🏋️', count: 28 },
    { id: 'health', name: 'Health Services', icon: '🩺', count: 18 }
  ];

  // Mock products data
  const products = [
    { 
      id: 1, 
      emoji: '💇‍♀️', 
      name: 'Premium Hair Cut', 
      category: 'Hair Care Services',
      type: 'service',
      price: 45, 
      rating: 4.9, 
      reviews: 124,
      duration: '30 min',
      badge: 'NEW'
    },
    { 
      id: 2, 
      emoji: '🧴', 
      name: 'Organic Shampoo', 
      category: 'Hair Care Products',
      type: 'product',
      price: 24, 
      stock: 45, 
      rating: 4.7, 
      reviews: 89,
      badge: 'SALE'
    },
    { 
      id: 3, 
      emoji: '💅', 
      name: 'Gel Manicure', 
      category: 'Nail Services',
      type: 'service',
      price: 35, 
      rating: 4.8, 
      reviews: 156,
      duration: '45 min',
      badge: 'FEATURED'
    },
    { 
      id: 4, 
      emoji: '🧖‍♀️', 
      name: 'Deep Tissue Massage', 
      category: 'Spa & Massage',
      type: 'service',
      price: 80, 
      rating: 5.0, 
      reviews: 203,
      duration: '60 min'
    },
    { 
      id: 5, 
      emoji: '💄', 
      name: 'Lipstick Collection', 
      category: 'Cosmetics',
      type: 'product',
      price: 18, 
      stock: 120, 
      rating: 4.6, 
      reviews: 67
    },
    { 
      id: 6, 
      emoji: '🏋️‍♀️', 
      name: 'Personal Training', 
      category: 'Fitness',
      type: 'service',
      price: 60, 
      rating: 4.9, 
      reviews: 92,
      duration: '60 min'
    }
  ];

  const handleEdit = useCallback((product) => {
    setEditingProduct(product);
    setShowModal(true);
  }, []);

  const handleDuplicate = useCallback((product) => {
    console.log('Duplicate product:', product);
  }, []);

  const handleDelete = useCallback((product) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      console.log('Delete product:', product);
    }
  }, []);

  const handleSaveProduct = useCallback((formData) => {
    console.log('Save product:', formData);
    // Add save logic here
  }, []);

  const handleAddNew = useCallback(() => {
    setEditingProduct(null);
    setShowModal(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                            product.category.toLowerCase().includes(selectedCategory);
      const matchesType = filterType === 'all' || product.type === filterType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [products, searchQuery, selectedCategory, filterType]);

  return (
    <div className={styles.productsContainer}>
      {/* Products Header */}
      <div className={styles.productsHeader}>
        <div className={styles.layoutHeaderContent}>
          <div className={styles.layoutPageTitle}>
            <h1>Products & Services</h1>
            <p>Manage your inventory and service offerings</p>
          </div>
          <div className={styles.layoutHeaderActions}>
            <button className={styles.btnPrimary} onClick={handleAddNew}>
              <Plus style={{ width: '16px', height: '16px' }} /> Add Product
            </button>
            <button className={styles.btnSecondary}>
              <Upload style={{ width: '16px', height: '16px' }} /> Import
            </button>
            <button className={styles.btnSecondary}>
              <Download style={{ width: '16px', height: '16px' }} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <select 
            className={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Products</option>
            <option value="product">Products Only</option>
            <option value="service">Services Only</option>
          </select>
          <select 
            className={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
          <select 
            className={styles.filterSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by: Name</option>
            <option value="price-low">Sort by: Price (Low to High)</option>
            <option value="price-high">Sort by: Price (High to Low)</option>
            <option value="stock">Sort by: Stock</option>
            <option value="date">Sort by: Date Added</option>
          </select>
        </div>
        <div className={styles.layoutViewToggle}>
          <button 
            className={`${styles.layoutViewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid style={{ width: '16px', height: '16px' }} />
          </button>
          <button 
            className={`${styles.layoutViewBtn} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsOverview}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.cardStat}>
            <div className={styles.statHeader}>
              <div className={styles.cardStatIcon}>{stat.icon}</div>
            </div>
            <div className={styles.cardStatLabel}>{stat.label}</div>
            <div className={styles.cardStatValue}>{stat.value}</div>
            <div className={styles.cardStatTrend}>
              {stat.trend !== 'none' && (
                <span className={styles.trendIcon} style={{ color: stat.trend === 'up' ? 'var(--success-color)' : 'var(--error-color)' }}>
                  {stat.trend === 'up' ? <TrendingUp className={styles.w3} /> : <TrendingDown className={styles.w3} />}
                  {stat.trendValue}
                </span>
              )}
              <span>{stat.trendText}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Products Layout */}
      <div className={styles.productsLayout}>
        {/* Categories Sidebar */}
        <aside className={styles.categoriesSidebar}>
          <div className={styles.categoriesHeader}>
            <h3 className={styles.categoriesTitle}>Categories</h3>
            <button className={styles.addCategoryBtn}>
              <Plus style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
          <div className={styles.categoriesList}>
            {categories.map(category => (
              <div 
                key={category.id}
                className={`${styles.categoryItem} ${selectedCategory === category.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className={styles.categoryName}>
                  <span>{category.icon}</span> {category.name}
                </span>
                <span className={styles.categoryCount}>{category.count}</span>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <h4 className={styles.quickStatsTitle}>Quick Stats</h4>
            <div className={styles.statsList}>
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Active Items</span>
                <span className={styles.statItemValue}>212</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Out of Stock</span>
                <span className={styles.statItemValue}>14</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Services</span>
                <span className={styles.statItemValue}>85</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Products</span>
                <span className={styles.statItemValue}>163</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Content */}
        <div className={styles.productsContent}>
          {/* Search Bar */}
          <div className={styles.productsSearch}>
            <Search className={formStyles.formSearchIcon} style={{ width: '20px', height: '20px' }} />
            <input 
              type="text" 
              className={formStyles.formSearchInput} 
              placeholder="Search products or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className={styles.productsGrid}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className={`${styles.list} ${styles.active}`}>
              {filteredProducts.map(product => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}

ProductCard.displayName = 'ProductCard';
ProductListItem.displayName = 'ProductListItem';
ProductModal.displayName = 'ProductModal';