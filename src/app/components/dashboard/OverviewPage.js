'use client';

import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  Clock,
  CheckCircle,
  Package,
  CreditCard,
  FileText
} from 'lucide-react';

const statsData = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    isPositive: true,
    icon: DollarSign,
    gradient: 'purple-gradient'
  },
  {
    title: 'Active Customers',
    value: '2,350',
    change: '+180',
    isPositive: true,
    icon: Users,
    gradient: 'blue-gradient'
  },
  {
    title: 'Total Orders',
    value: '1,423',
    change: '+12.5%',
    isPositive: true,
    icon: ShoppingCart,
    gradient: 'green-gradient'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-0.4%',
    isPositive: false,
    icon: Activity,
    gradient: 'orange-gradient'
  }
];

const recentActivity = [
  {
    icon: Package,
    title: 'New order received',
    time: '2 minutes ago',
    gradient: 'blue-gradient'
  },
  {
    icon: Users,
    title: 'New customer registered',
    time: '1 hour ago',
    gradient: 'green-gradient'
  },
  {
    icon: CreditCard,
    title: 'Payment processed',
    time: '3 hours ago',
    gradient: 'purple-gradient'
  },
  {
    icon: CheckCircle,
    title: 'Order delivered',
    time: '5 hours ago',
    gradient: 'orange-gradient'
  }
];

export default function OverviewPage() {
  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className={`stat-icon ${stat.gradient}`}>
                  <Icon />
                </div>
                <div className={`stat-change ${!stat.isPositive ? 'negative' : ''}`}>
                  <TrendIcon className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <div className="stat-content">
                <div className="stat-title">{stat.title}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="charts-grid">
        {/* Revenue Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Revenue Overview</h3>
            <div className="chart-options">
              <button className="chart-option active">Week</button>
              <button className="chart-option">Month</button>
              <button className="chart-option">Year</button>
            </div>
          </div>
          <div className="chart-container">
            <p>Chart will be implemented here</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Recent Activity</h3>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="activity-item">
                  <div className={`activity-icon ${activity.gradient}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-time">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="chart-card" style={{ marginTop: '1.5rem' }}>
        <div className="chart-header">
          <h3 className="chart-title">Quick Actions</h3>
        </div>
        <div className="stats-grid" style={{ marginBottom: 0 }}>
          <button className="stat-card" style={{ cursor: 'pointer' }}>
            <div className="stat-icon purple-gradient">
              <Package />
            </div>
            <div className="stat-content">
              <div className="stat-title">Create New Order</div>
              <div className="stat-value" style={{ fontSize: '1rem' }}>Start a new order</div>
            </div>
          </button>
          
          <button className="stat-card" style={{ cursor: 'pointer' }}>
            <div className="stat-icon blue-gradient">
              <Users />
            </div>
            <div className="stat-content">
              <div className="stat-title">Add Customer</div>
              <div className="stat-value" style={{ fontSize: '1rem' }}>Register new customer</div>
            </div>
          </button>
          
          <button className="stat-card" style={{ cursor: 'pointer' }}>
            <div className="stat-icon green-gradient">
              <FileText />
            </div>
            <div className="stat-content">
              <div className="stat-title">Generate Report</div>
              <div className="stat-value" style={{ fontSize: '1rem' }}>View analytics</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}