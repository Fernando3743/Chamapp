'use client';

import React, { useState, useCallback, useMemo } from 'react';
import styles from '../../styles/components/dashboard/CustomersPage.module.css';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Mail,
  Tag,
  Trash2,
  X,
  TrendingUp,
  TrendingDown,
  Users,
  Sparkles,
  Gem,
  DollarSign,
  Star
} from 'lucide-react';

// Customer Row Component for Table View
const CustomerRow = React.memo(({ customer, onSelect, selected, onAction, onCustomerClick }) => {
  return (
    <tr>
      <td>
        <input 
          type="checkbox" 
          className={styles.customerCheckbox}
          checked={selected}
          onChange={(e) => onSelect(customer.id, e.target.checked)}
        />
      </td>
      <td onClick={() => onCustomerClick(customer)} style={{ cursor: 'pointer' }}>
        <div className={styles.customerCell}>
          <div className={styles.customerAvatar}>{customer.initials}</div>
          <div className={styles.customerInfo}>
            <div className={styles.customerName}>{customer.name}</div>
            <div className={styles.customerEmail}>{customer.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span className={`${styles.statusBadge} ${styles[`status${customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}`]}`}>
          {customer.status}
        </span>
      </td>
      <td>{customer.orders}</td>
      <td>${customer.totalSpent.toLocaleString()}</td>
      <td>{customer.lastVisit}</td>
      <td>
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < customer.rating ? '⭐' : '☆'}</span>
          ))}
        </div>
      </td>
      <td>
        <button className={styles.tableActionMenu} onClick={(e) => onAction(e, customer)}>
          <MoreVertical className={styles.w4} />
        </button>
      </td>
    </tr>
  );
});

// Customer Card Component for Grid View
const CustomerCard = React.memo(({ customer, onClick }) => {
  return (
    <div className={styles.customerCard} onClick={() => onClick(customer)}>
      <div className={styles.cardHeader}>
        <div className={styles.cardAvatar}>{customer.initials}</div>
        <span className={`${styles.statusBadge} ${styles[`status${customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}`]}`}>
          {customer.status}
        </span>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardName}>{customer.name}</div>
        <div className={styles.cardEmail}>{customer.email}</div>
        <div className={styles.cardPhone}>{customer.phone}</div>
      </div>
      <div className={styles.cardStats}>
        <div className={styles.cardStat}>
          <div className={styles.cardStatValue}>{customer.orders}</div>
          <div className={styles.cardStatLabel}>Orders</div>
        </div>
        <div className={styles.cardStat}>
          <div className={styles.cardStatValue}>${customer.totalSpent.toLocaleString()}</div>
          <div className={styles.cardStatLabel}>Total Spent</div>
        </div>
      </div>
    </div>
  );
});

// Filter Modal Component
const FilterModal = React.memo(({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    status: 'All',
    customerType: 'All',
    lastActivity: 'Any time',
    totalSpent: 'Any amount',
    rating: 'Any rating'
  });

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({ ...prev, [category]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      status: 'All',
      customerType: 'All',
      lastActivity: 'Any time',
      totalSpent: 'Any amount',
      rating: 'Any rating'
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.filterModal} ${styles.active}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.filterContent}>
        <div className={styles.filterHeader}>
          <h2 className={styles.filterTitle}>Filter Customers</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X className={styles.w5} />
          </button>
        </div>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Status</label>
          <div className={styles.filterOptions}>
            {['All', 'Active', 'Inactive', 'Pending'].map(status => (
              <div 
                key={status}
                className={`${styles.filterOption} ${filters.status === status ? styles.selected : ''}`}
                onClick={() => handleFilterChange('status', status)}
              >
                {status}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Customer Type</label>
          <div className={styles.filterOptions}>
            {['All', 'New', 'Returning', 'VIP'].map(type => (
              <div 
                key={type}
                className={`${styles.filterOption} ${filters.customerType === type ? styles.selected : ''}`}
                onClick={() => handleFilterChange('customerType', type)}
              >
                {type}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Last Activity</label>
          <div className={styles.filterOptions}>
            {['Any time', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map(time => (
              <div 
                key={time}
                className={`${styles.filterOption} ${filters.lastActivity === time ? styles.selected : ''}`}
                onClick={() => handleFilterChange('lastActivity', time)}
              >
                {time}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Total Spent</label>
          <div className={styles.filterOptions}>
            {['Any amount', '$0 - $100', '$100 - $500', '$500 - $1000', '$1000+'].map(amount => (
              <div 
                key={amount}
                className={`${styles.filterOption} ${filters.totalSpent === amount ? styles.selected : ''}`}
                onClick={() => handleFilterChange('totalSpent', amount)}
              >
                {amount}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Rating</label>
          <div className={styles.filterOptions}>
            {['Any rating', '5 stars', '4+ stars', '3+ stars'].map(rating => (
              <div 
                key={rating}
                className={`${styles.filterOption} ${filters.rating === rating ? styles.selected : ''}`}
                onClick={() => handleFilterChange('rating', rating)}
              >
                {rating}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterActions}>
          <button className={styles.btnSecondary} onClick={handleClearAll}>Clear All</button>
          <button className={styles.btnPrimary} onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
});

export default function CustomersPage({ onCustomerSelect }) {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Stats data
  const stats = [
    { 
      icon: <Users className={styles.w7} />, 
      label: 'Total Customers', 
      value: '3,247', 
      trend: 'up', 
      trendValue: '12%',
      trendText: 'from last month' 
    },
    { 
      icon: <Sparkles className={styles.w7} />, 
      label: 'New This Month', 
      value: '248', 
      trend: 'up', 
      trendValue: '8%',
      trendText: 'growth rate' 
    },
    { 
      icon: <Gem className={styles.w7} />, 
      label: 'Retention Rate', 
      value: '89%', 
      trend: 'up', 
      trendValue: '3%',
      trendText: 'improvement' 
    },
    { 
      icon: <DollarSign className={styles.w7} />, 
      label: 'Avg. Customer Value', 
      value: '$284', 
      trend: 'up', 
      trendValue: '$24',
      trendText: 'increase' 
    }
  ];

  // Mock customers data
  const customers = [
    { 
      id: 1, 
      initials: 'JD', 
      name: 'John Doe', 
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      status: 'Active', 
      orders: 42, 
      totalSpent: 3842, 
      lastVisit: '2 days ago',
      rating: 5
    },
    { 
      id: 2, 
      initials: 'SJ', 
      name: 'Sarah Johnson', 
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678',
      status: 'Active', 
      orders: 28, 
      totalSpent: 2156, 
      lastVisit: '1 week ago',
      rating: 4
    },
    { 
      id: 3, 
      initials: 'MC', 
      name: 'Michael Chen', 
      email: 'm.chen@company.com',
      phone: '+1 (555) 345-6789',
      status: 'Inactive', 
      orders: 15, 
      totalSpent: 987, 
      lastVisit: '2 months ago',
      rating: 5
    },
    { 
      id: 4, 
      initials: 'ED', 
      name: 'Emma Davis', 
      email: 'emma.davis@email.com',
      phone: '+1 (555) 456-7890',
      status: 'Pending', 
      orders: 3, 
      totalSpent: 245, 
      lastVisit: 'Today',
      rating: 3
    },
    { 
      id: 5, 
      initials: 'RW', 
      name: 'Robert Wilson', 
      email: 'r.wilson@business.com',
      phone: '+1 (555) 567-8901',
      status: 'Active', 
      orders: 67, 
      totalSpent: 5432, 
      lastVisit: 'Yesterday',
      rating: 5
    },
    { 
      id: 6, 
      initials: 'LT', 
      name: 'Lisa Thompson', 
      email: 'lisa.t@email.com',
      phone: '+1 (555) 678-9012',
      status: 'Active', 
      orders: 19, 
      totalSpent: 1234, 
      lastVisit: '3 days ago',
      rating: 5
    }
  ];

  const handleSelectCustomer = useCallback((customerId, isSelected) => {
    setSelectedCustomers(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(customerId);
      } else {
        newSet.delete(customerId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback((isSelected) => {
    if (isSelected) {
      setSelectedCustomers(new Set(customers.map(c => c.id)));
    } else {
      setSelectedCustomers(new Set());
    }
  }, [customers]);

  const handleApplyFilters = useCallback((filters) => {
    setActiveFilters(filters);
    // Apply filters to customers data
  }, []);

  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).filter(
      value => !['All', 'Any time', 'Any amount', 'Any rating'].includes(value)
    ).length;
  }, [activeFilters]);

  return (
    <div className={styles.customersContainer}>
      {/* Page Header */}
      <div className={styles.layoutPageHeader}>
        <div className={styles.headerTop}>
          <div className={styles.layoutPageTitle}>
            <h1>Customers</h1>
            <p>Manage and track all your customer relationships</p>
          </div>
          <div className={styles.layoutHeaderActions}>
            <button className={styles.btnSecondary}>
              <Upload className={styles.w4} /> Import
            </button>
            <button className={styles.btnSecondary}>
              <Download className={styles.w4} /> Export
            </button>
            <button className={styles.btnPrimary}>
              <Plus className={styles.w4} /> Add Customer
            </button>
          </div>
        </div>

        <div className={styles.layoutSearchFilters}>
          <div className={styles.formSearchBox}>
            <Search className={styles.formSearchIcon} style={{ width: '20px', height: '20px' }} />
            <input 
              type="text" 
              className={styles.formSearchInput} 
              placeholder="Search by name, email, phone, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className={styles.layoutFilterBtn} onClick={() => setShowFilterModal(true)}>
            <Filter className={styles.w4} /> Filters
            {activeFilterCount > 0 && <span className={styles.layoutFilterBadge}>{activeFilterCount}</span>}
          </button>
          <div className={styles.layoutViewToggle}>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'table' ? styles.active : ''}`}
              onClick={() => setViewMode('table')}
            >
              <List className={styles.w4} />
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className={styles.w4} />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Stats */}
      <div className={styles.customerStats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.cardStat}>
            <div className={styles.cardStatIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <div className={styles.cardStatValue}>{stat.value}</div>
              <div className={styles.cardStatLabel}>{stat.label}</div>
              <div className={`${styles.statTrend} ${styles[`trend${stat.trend.charAt(0).toUpperCase() + stat.trend.slice(1)}`]}`}>
                {stat.trend === 'up' ? <TrendingUp className={styles.w3} /> : <TrendingDown className={styles.w3} />}
                {stat.trendValue} {stat.trendText}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className={styles.customersTableContainer}>
          <div className={styles.layoutTableHeader}>
            <div className={styles.layoutResultsInfo}>Showing 1-{customers.length} of 3,247 customers</div>
            <div className={styles.layoutBulkActions}>
              <button className={styles.layoutBulkActionBtn}>
                <Mail className={styles.w4} /> Send Email
              </button>
              <button className={styles.layoutBulkActionBtn}>
                <Tag className={styles.w4} /> Add Tags
              </button>
              <button className={styles.layoutBulkActionBtn}>
                <Trash2 className={styles.w4} /> Delete
              </button>
            </div>
          </div>

          <table className={styles.customersTable}>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>
                  <input 
                    type="checkbox" 
                    className={styles.customerCheckbox}
                    checked={selectedCustomers.size === customers.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th>Customer <span className={styles.sortIcon}>↕</span></th>
                <th>Status <span className={styles.sortIcon}>↕</span></th>
                <th>Orders <span className={styles.sortIcon}>↕</span></th>
                <th>Total Spent <span className={styles.sortIcon}>↕</span></th>
                <th>Last Visit <span className={styles.sortIcon}>↕</span></th>
                <th>Rating <span className={styles.sortIcon}>↕</span></th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  selected={selectedCustomers.has(customer.id)}
                  onSelect={handleSelectCustomer}
                  onAction={(e, customer) => console.log('Action for', customer)}
                  onCustomerClick={onCustomerSelect || ((customer) => console.log('View customer', customer))}
                />
              ))}
            </tbody>
          </table>

          <div className={styles.tablePaginationContainer}>
            <div className={styles.tablePaginationInfo}>Page {currentPage} of 325</div>
            <div className={styles.tablePagination}>
              <button className={styles.tablePageBtn} disabled={currentPage === 1}>
                <ChevronLeft className={styles.w4} />
              </button>
              <button className={`${styles.tablePageBtn} ${styles.tableActive}`}>1</button>
              <button className={styles.tablePageBtn}>2</button>
              <button className={styles.tablePageBtn}>3</button>
              <button className={styles.tablePageBtn}>...</button>
              <button className={styles.tablePageBtn}>325</button>
              <button className={styles.tablePageBtn}>
                <ChevronRight className={styles.w4} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className={styles.customersGrid}>
          {customers.map(customer => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={onCustomerSelect || ((customer) => console.log('View customer', customer))}
            />
          ))}
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

CustomerRow.displayName = 'CustomerRow';
CustomerCard.displayName = 'CustomerCard';
FilterModal.displayName = 'FilterModal';