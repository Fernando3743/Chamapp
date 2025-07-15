'use client';

import React, { useState, useCallback, useMemo } from 'react';
import styles from '../../styles/components/dashboard/TransactionsPage.module.css';
import modalStyles from '../../styles/components/dashboard/shared/modal.module.css';
import formStyles from '../../styles/components/dashboard/shared/forms.module.css';
import {
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';

// Transaction Row Component
const TransactionRow = React.memo(({ transaction, onViewDetails }) => {
  const typeIcon = transaction.type === 'income' ? 
    <ArrowDownLeft className={styles.w4} /> : 
    <ArrowUpRight className={styles.w4} />;
  
  const statusIcon = {
    completed: <CheckCircle className={styles.w4} />,
    pending: <Clock className={styles.w4} />,
    failed: <XCircle className={styles.w4} />,
    refunded: <AlertCircle className={styles.w4} />
  };

  return (
    <tr onClick={() => onViewDetails(transaction)}>
      <td>
        <div className={`${styles.transactionTypeIcon} ${styles[transaction.type]}`}>
          {typeIcon}
        </div>
      </td>
      <td>
        <div className={styles.transactionInfo}>
          <div className={styles.transactionTitle}>{transaction.title}</div>
          <div className={styles.transactionSubtitle}>{transaction.customer}</div>
        </div>
      </td>
      <td>
        <span className={`${styles.statusBadge} ${styles[`status${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}`]}`}>
          {statusIcon[transaction.status]}
          {transaction.status}
        </span>
      </td>
      <td>{transaction.date}</td>
      <td>{transaction.time}</td>
      <td>
        <div className={`${styles.transactionAmount} ${styles[transaction.type]}`}>
          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
        </div>
      </td>
      <td>
        <button className={styles.tableActionMenu} onClick={(e) => { e.stopPropagation(); }}>
          <MoreVertical className={styles.w4} />
        </button>
      </td>
    </tr>
  );
});

// Transaction Details Modal
const TransactionModal = React.memo(({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className={`${modalStyles.modalOverlay} ${modalStyles.modalActive}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h3 className={modalStyles.modalTitle}>Transaction Details</h3>
          <button className={modalStyles.modalClose} onClick={onClose}>
            <X className={styles.w5} />
          </button>
        </div>
        
        <div className={styles.transactionModalContent}>
          <div className={styles.detailSection}>
            <div className={styles.detailHeader}>
              <div className={`${styles.transactionTypeIcon} ${styles.large} ${styles[transaction.type]}`}>
                {transaction.type === 'income' ? 
                  <ArrowDownLeft className={styles.w6} /> : 
                  <ArrowUpRight className={styles.w6} />
                }
              </div>
              <div>
                <h4>{transaction.title}</h4>
                <p className={styles.textSecondary}>Transaction ID: {transaction.id}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <label>Amount</label>
              <div className={`${styles.transactionAmount} ${styles.large} ${styles[transaction.type]}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
              </div>
            </div>
            <div className={styles.detailItem}>
              <label>Status</label>
              <span className={`${styles.statusBadge} ${styles[`status${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}`]}`}>
                {transaction.status}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Date & Time</label>
              <p>{transaction.date} at {transaction.time}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Payment Method</label>
              <p>{transaction.paymentMethod}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Customer</label>
              <p>{transaction.customer}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Reference</label>
              <p>{transaction.reference || 'N/A'}</p>
            </div>
          </div>

          {transaction.items && (
            <div className={styles.detailSection}>
              <h4>Items</h4>
              <div className={styles.itemsList}>
                {transaction.items.map((item, index) => (
                  <div key={index} className={styles.itemRow}>
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={modalStyles.modalFooter}>
            <button className={styles.btnSecondary}>
              <FileText className={styles.w4} /> Download Receipt
            </button>
            {transaction.status === 'completed' && (
              <button className={styles.btnSecondary}>Refund</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// Filter Modal Component
const FilterModal = React.memo(({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: '',
    paymentMethod: 'all'
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`${modalStyles.modalOverlay} ${modalStyles.modalActive}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h3 className={modalStyles.modalTitle}>Filter Transactions</h3>
          <button className={modalStyles.modalClose} onClick={onClose}>
            <X className={styles.w5} />
          </button>
        </div>

        <div className={styles.filterContent}>
          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Transaction Type</label>
            <div className={styles.filterOptions}>
              {['all', 'income', 'expense'].map(type => (
                <button
                  key={type}
                  className={`${styles.filterOption} ${filters.type === type ? styles.active : ''}`}
                  onClick={() => handleFilterChange('type', type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Status</label>
            <div className={styles.filterOptions}>
              {['all', 'completed', 'pending', 'failed', 'refunded'].map(status => (
                <button
                  key={status}
                  className={`${styles.filterOption} ${filters.status === status ? styles.active : ''}`}
                  onClick={() => handleFilterChange('status', status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Date Range</label>
            <div className={styles.filterOptions}>
              {['all', 'today', 'week', 'month', 'year'].map(range => (
                <button
                  key={range}
                  className={`${styles.filterOption} ${filters.dateRange === range ? styles.active : ''}`}
                  onClick={() => handleFilterChange('dateRange', range)}
                >
                  {range === 'all' ? 'All Time' : 
                   range === 'today' ? 'Today' :
                   range === 'week' ? 'This Week' :
                   range === 'month' ? 'This Month' : 'This Year'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Amount Range</label>
            <div className={styles.amountInputs}>
              <input
                type="number"
                placeholder="Min amount"
                className={styles.filterInput}
                value={filters.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max amount"
                className={styles.filterInput}
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Payment Method</label>
            <select
              className={styles.filterSelect}
              value={filters.paymentMethod}
              onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
            >
              <option value="all">All Methods</option>
              <option value="card">Credit/Debit Card</option>
              <option value="cash">Cash</option>
              <option value="transfer">Bank Transfer</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className={modalStyles.modalActions}>
          <button className={styles.btnSecondary} onClick={() => setFilters({
            type: 'all',
            status: 'all',
            dateRange: 'all',
            minAmount: '',
            maxAmount: '',
            paymentMethod: 'all'
          })}>
            Clear All
          </button>
          <button className={styles.btnPrimary} onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
});

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('month');

  // Stats data
  const stats = [
    { 
      icon: <DollarSign className={styles.w7} />, 
      label: 'Total Revenue', 
      value: '$24,580', 
      trend: 'up', 
      trendValue: '12.5%',
      trendText: 'from last month' 
    },
    { 
      icon: <CreditCard className={styles.w7} />, 
      label: 'Total Expenses', 
      value: '$8,420', 
      trend: 'down', 
      trendValue: '8.2%',
      trendText: 'from last month' 
    },
    { 
      icon: <TrendingUp className={styles.w7} />, 
      label: 'Net Profit', 
      value: '$16,160', 
      trend: 'up', 
      trendValue: '18.7%',
      trendText: 'profit increase' 
    },
    { 
      icon: <Clock className={styles.w7} />, 
      label: 'Pending', 
      value: '12', 
      trend: 'none',
      trendText: 'transactions pending'
    }
  ];

  // Mock transactions data
  const transactions = [
    { 
      id: 'TRX001',
      type: 'income',
      title: 'Hair Cut & Styling',
      customer: 'Sarah Johnson',
      amount: 85.00,
      status: 'completed',
      date: 'Dec 15, 2024',
      time: '2:30 PM',
      paymentMethod: 'Credit Card',
      items: [
        { name: 'Premium Hair Cut', price: 45 },
        { name: 'Hair Styling', price: 40 }
      ]
    },
    { 
      id: 'TRX002',
      type: 'expense',
      title: 'Product Purchase',
      customer: 'Beauty Supplies Co.',
      amount: 320.00,
      status: 'completed',
      date: 'Dec 15, 2024',
      time: '11:00 AM',
      paymentMethod: 'Bank Transfer',
      reference: 'INV-2024-1234'
    },
    { 
      id: 'TRX003',
      type: 'income',
      title: 'Spa Package',
      customer: 'Emma Davis',
      amount: 250.00,
      status: 'pending',
      date: 'Dec 14, 2024',
      time: '5:00 PM',
      paymentMethod: 'Credit Card'
    },
    { 
      id: 'TRX004',
      type: 'income',
      title: 'Nail Services',
      customer: 'Lisa Thompson',
      amount: 65.00,
      status: 'completed',
      date: 'Dec 14, 2024',
      time: '3:15 PM',
      paymentMethod: 'Cash'
    },
    { 
      id: 'TRX005',
      type: 'expense',
      title: 'Utility Bill',
      customer: 'Electric Company',
      amount: 185.50,
      status: 'completed',
      date: 'Dec 13, 2024',
      time: '9:00 AM',
      paymentMethod: 'Bank Transfer'
    },
    { 
      id: 'TRX006',
      type: 'income',
      title: 'Massage Therapy',
      customer: 'Robert Wilson',
      amount: 120.00,
      status: 'refunded',
      date: 'Dec 13, 2024',
      time: '1:00 PM',
      paymentMethod: 'Credit Card'
    }
  ];

  const handleViewDetails = useCallback((transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  }, []);

  const handleApplyFilters = useCallback((filters) => {
    console.log('Applying filters:', filters);
    // Implement filter logic here
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => 
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, transactions]);

  return (
    <div className={styles.transactionsContainer}>
      {/* Page Header */}
      <div className={styles.layoutPageHeader}>
        <div className={styles.headerTop}>
          <div className={styles.layoutPageTitle}>
            <h1>Transactions</h1>
            <p>Track all your business transactions and financial activity</p>
          </div>
          <div className={styles.layoutHeaderActions}>
            <button className={styles.btnSecondary}>
              <Download className={styles.w4} /> Export
            </button>
            <select className={styles.dateRangeSelect} value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsOverview}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.cardStat}>
            <div className={styles.cardStatIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <div className={styles.cardStatLabel}>{stat.label}</div>
              <div className={styles.cardStatValue}>{stat.value}</div>
              {stat.trend !== 'none' && (
                <div className={`${styles.statTrend} ${styles[`trend-${stat.trend}`]}`}>
                  {stat.trend === 'up' ? 
                    <TrendingUp className={styles.w3} /> : 
                    <TrendingDown className={styles.w3} />
                  }
                  {stat.trendValue} {stat.trendText}
                </div>
              )}
              {stat.trend === 'none' && (
                <div className={styles.cardStatTrend}>{stat.trendText}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className={styles.layoutSearchFilters}>
        <div className={formStyles.formSearchBox}>
          <Search className={formStyles.formSearchIcon} />
          <input 
            type="text" 
            className={formStyles.formSearchInput} 
            placeholder="Search by transaction, customer, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className={styles.layoutFilterBtn} onClick={() => setShowFilterModal(true)}>
          <Filter className={styles.w4} /> Filters
        </button>
      </div>

      {/* Transactions Table */}
      <div className={styles.transactionsTableContainer}>
        <div className={styles.layoutTableHeader}>
          <div className={styles.layoutResultsInfo}>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </div>

        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>Type</th>
              <th>Transaction</th>
              <th>Status</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onViewDetails={handleViewDetails}
              />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="table-pagination-container">
          <div className={styles.tablePaginationInfo}>Page {currentPage} of 10</div>
          <div className={styles.tablePagination}>
            <button className={styles.tablePageBtn} disabled={currentPage === 1}>
              <ChevronLeft className={styles.w4} />
            </button>
            <button className={`${styles.tablePageBtn} ${styles.tableActive}`}>1</button>
            <button className={styles.tablePageBtn}>2</button>
            <button className={styles.tablePageBtn}>3</button>
            <button className={styles.tablePageBtn}>...</button>
            <button className={styles.tablePageBtn}>10</button>
            <button className={styles.tablePageBtn}>
              <ChevronRight className={styles.w4} />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

TransactionRow.displayName = 'TransactionRow';
TransactionModal.displayName = 'TransactionModal';
FilterModal.displayName = 'FilterModal';