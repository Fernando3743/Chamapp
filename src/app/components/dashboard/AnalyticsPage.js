'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Calendar,
  Download,
  DollarSign,
  Package,
  Target,
  Gem,
  Eye,
  ShoppingCart,
  UserCheck,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import styles from '../../styles/components/dashboard/AnalyticsPage.module.css';

// KPI Card Component
const KPICard = React.memo(({ title, value, icon, change, changeType = 'positive' }) => {
  const changeColors = {
    positive: { bg: 'rgba(74, 222, 128, 0.1)', text: '#4ade80' },
    negative: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' },
    neutral: { bg: 'rgba(251, 191, 36, 0.1)', text: '#fbbf24' }
  };

  const colors = changeColors[changeType];

  return (
    <div className={styles.kpiCard}>
      <div className={styles.kpiHeader}>
        <div>
          <div className={styles.kpiTitle}>{title}</div>
          <div className={styles.kpiValue}>{value}</div>
        </div>
        <div className={styles.kpiIcon}>{icon}</div>
      </div>
      <div className={styles.kpiChange}>
        <span className={styles.changeBadge} style={{ background: colors.bg, color: colors.text }}>
          {changeType === 'positive' ? <TrendingUp style={{ width: '12px', height: '12px' }} /> : 
           changeType === 'negative' ? <TrendingDown style={{ width: '12px', height: '12px' }} /> : 
           '→'} {change}
        </span>
        <span className={styles.kpiPeriod}>vs last period</span>
      </div>
    </div>
  );
});

// Progress Item Component
const ProgressItem = React.memo(({ label, value, percentage, color = '#667eea' }) => {
  return (
    <div className={styles.progressItem}>
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>{label}</span>
        <span className={styles.progressValue}>{value}</span>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ 
            width: `${percentage}%`,
            background: color
          }}
        />
      </div>
    </div>
  );
});

// Funnel Stage Component
const FunnelStage = React.memo(({ icon, title, description, count, rate, color = '#667eea' }) => {
  return (
    <div className={styles.funnelStage}>
      <div className={styles.funnelContent}>
        <div className={styles.funnelInfo}>
          <div className={styles.funnelIcon} style={{ background: `${color}20`, color }}>
            {icon}
          </div>
          <div className={styles.funnelDetails}>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.funnelMetrics}>
          <div className={styles.funnelCount}>{count}</div>
          <div className={styles.funnelRate}>{rate}</div>
        </div>
      </div>
    </div>
  );
});

// Table Row Component
const TableRow = React.memo(({ source, icon, visitors, orders, revenue, conversionRate }) => {
  return (
    <tr>
      <td>
        <div className={styles.sourceInfo}>
          <div className={styles.sourceIcon}>{icon}</div>
          <span>{source}</span>
        </div>
      </td>
      <td>{visitors}</td>
      <td>{orders}</td>
      <td>{revenue}</td>
      <td>{conversionRate}</td>
    </tr>
  );
});

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('last7days');
  const [chartOption, setChartOption] = useState('revenue');

  // Mock data for KPIs
  const kpis = [
    { title: 'Total Revenue', value: '$148,235', icon: <DollarSign style={{ width: '20px', height: '20px' }} />, change: '22.4%', changeType: 'positive' },
    { title: 'Total Orders', value: '1,847', icon: <Package style={{ width: '20px', height: '20px' }} />, change: '15.3%', changeType: 'positive' },
    { title: 'Conversion Rate', value: '3.82%', icon: <Target style={{ width: '20px', height: '20px' }} />, change: '0.45%', changeType: 'positive' },
    { title: 'Avg Order Value', value: '$80.25', icon: <Gem style={{ width: '20px', height: '20px' }} />, change: '3.2%', changeType: 'negative' }
  ];

  // Mock data for revenue chart
  const chartData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 78 },
    { day: 'Wed', value: 52 },
    { day: 'Thu', value: 88 },
    { day: 'Fri', value: 92 },
    { day: 'Sat', value: 75 },
    { day: 'Sun', value: 70 }
  ];

  // Mock data for revenue sources
  const revenueSources = [
    { name: 'Direct Sales', value: '$59.3k', percentage: 40, color: '#667eea' },
    { name: 'Online Store', value: '$44.5k', percentage: 30, color: '#764ba2' },
    { name: 'Marketplace', value: '$29.6k', percentage: 20, color: '#f093fb' },
    { name: 'Partners', value: '$14.8k', percentage: 10, color: '#4facfe' }
  ];

  // Mock data for performance metrics
  const performanceMetrics = [
    { label: 'Page Views', value: '245,823', percentage: 85 },
    { label: 'Unique Visitors', value: '68,543', percentage: 72 },
    { label: 'Bounce Rate', value: '32.4%', percentage: 32 },
    { label: 'Session Duration', value: '3m 42s', percentage: 65 }
  ];

  // Mock data for conversion funnel
  const funnelStages = [
    { icon: <Eye style={{ width: '20px', height: '20px' }} />, title: 'Page Views', description: 'Total website visits', count: '245,823', rate: '100%', color: '#667eea' },
    { icon: <ShoppingCart style={{ width: '20px', height: '20px' }} />, title: 'Add to Cart', description: 'Products added to cart', count: '18,456', rate: '7.5%', color: '#764ba2' },
    { icon: <UserCheck style={{ width: '20px', height: '20px' }} />, title: 'Checkout', description: 'Started checkout process', count: '9,228', rate: '3.8%', color: '#f093fb' },
    { icon: <Package style={{ width: '20px', height: '20px' }} />, title: 'Completed', description: 'Successfully purchased', count: '1,847', rate: '0.75%', color: '#4facfe' }
  ];

  // Mock data for traffic sources
  const trafficSources = [
    { source: 'Google Search', icon: '🔍', visitors: '45,234', orders: '423', revenue: '$33,845', conversionRate: '0.93%' },
    { source: 'Direct Traffic', icon: '🔗', visitors: '32,156', orders: '385', revenue: '$30,800', conversionRate: '1.20%' },
    { source: 'Social Media', icon: '📱', visitors: '28,456', orders: '256', revenue: '$20,480', conversionRate: '0.90%' },
    { source: 'Email Campaign', icon: '📧', visitors: '15,234', orders: '198', revenue: '$15,840', conversionRate: '1.30%' },
    { source: 'Referral Sites', icon: '🌐', visitors: '12,345', orders: '145', revenue: '$11,600', conversionRate: '1.17%' }
  ];

  return (
    <div className={styles.analyticsContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <div className={styles.pageTitle}>
            <h1>Analytics & Insights</h1>
            <p>Track your business performance and make data-driven decisions</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.customDate}>
              <Calendar style={{ width: '16px', height: '16px' }} /> Custom Range
            </button>
            <button className={styles.exportBtn}>
              <Download style={{ width: '16px', height: '16px' }} /> Export Report
            </button>
          </div>
        </div>
        <div className={styles.dateRangeSelector}>
          {['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map((range) => (
            <button
              key={range}
              className={`${styles.dateOption} ${dateRange === range.toLowerCase().replace(/ /g, '') ? styles.active : ''}`}
              onClick={() => setDateRange(range.toLowerCase().replace(/ /g, ''))}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Revenue Chart & Breakdown */}
      <div className={styles.chartsRow}>
        {/* Revenue Trend Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.chartTitle}>Revenue Trend</h3>
              <p className={styles.chartSubtitle}>Daily revenue over the selected period</p>
            </div>
            <div className={styles.chartOptions}>
              {['Revenue', 'Orders', 'Customers'].map((option) => (
                <button
                  key={option}
                  className={`${styles.chartOption} ${chartOption === option.toLowerCase() ? styles.active : ''}`}
                  onClick={() => setChartOption(option.toLowerCase())}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.revenueChart}>
            <div className={styles.chartYAxis}>
              <span>$25k</span>
              <span>$20k</span>
              <span>$15k</span>
              <span>$10k</span>
              <span>$5k</span>
              <span>$0</span>
            </div>
            <div className={styles.chartArea}>
              <div className={styles.chartGrid}>
                {[20, 40, 60, 80].map((position) => (
                  <div key={position} className={styles.gridLine} style={{ bottom: `${position}%` }} />
                ))}
              </div>
              <div className={styles.chartBars}>
                {chartData.map((data, index) => (
                  <div key={index} className={styles.chartBar} style={{ height: `${data.value}%` }} />
                ))}
              </div>
            </div>
            <div className={styles.chartXAxis}>
              {chartData.map((data, index) => (
                <span key={index} className={styles.xLabel}>{data.day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Revenue by Source</h3>
          </div>
          <div className={styles.donutChart}>
            <svg className={styles.donutSvg} width="200" height="200">
              <circle className={styles.donutBg} cx="100" cy="100" r="80" />
              {revenueSources.map((source, index) => {
                const offset = revenueSources
                  .slice(0, index)
                  .reduce((sum, s) => sum + s.percentage * 5.02, 0);
                return (
                  <circle
                    key={index}
                    className={styles.donutSegment}
                    cx="100"
                    cy="100"
                    r="80"
                    stroke={source.color}
                    strokeDasharray={`${source.percentage * 5.02} 502`}
                    strokeDashoffset={`-${offset}`}
                  />
                );
              })}
            </svg>
            <div className={styles.donutCenter}>
              <div className={styles.donutValue}>$148k</div>
              <div className={styles.donutLabel}>Total</div>
            </div>
          </div>
          <div className={styles.chartLegend}>
            {revenueSources.map((source, index) => (
              <div key={index} className={styles.legendItem}>
                <div className={styles.legendInfo}>
                  <div className={styles.legendColor} style={{ background: source.color }} />
                  <span className={styles.legendName}>{source.name}</span>
                </div>
                <span className={styles.legendValue}>{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics & Conversion Funnel */}
      <div className={styles.metricsGrid}>
        {/* Website Performance */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3 className={styles.metricTitle}>Website Performance</h3>
            <button className={styles.metricMenu}>
              <MoreVertical style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
          {performanceMetrics.map((metric, index) => (
            <ProgressItem key={index} {...metric} />
          ))}
        </div>

        {/* Device Breakdown */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3 className={styles.metricTitle}>Traffic by Device</h3>
            <button className={styles.metricMenu}>
              <MoreVertical style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
          <ProgressItem label="Desktop" value="58%" percentage={58} color="#667eea" />
          <ProgressItem label="Mobile" value="35%" percentage={35} color="#764ba2" />
          <ProgressItem label="Tablet" value="7%" percentage={7} color="#f093fb" />
        </div>

        {/* Conversion Funnel */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3 className={styles.metricTitle}>Conversion Funnel</h3>
            <button className={styles.metricMenu}>
              <MoreVertical style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
          <div className={styles.funnelContainer}>
            {funnelStages.map((stage, index) => (
              <FunnelStage key={index} {...stage} />
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h3 className={styles.chartTitle}>Traffic Sources</h3>
          <button className={styles.viewAll}>View detailed report →</button>
        </div>
        <table className={styles.analyticsTable}>
          <thead>
            <tr>
              <th>Source</th>
              <th>Visitors</th>
              <th>Orders</th>
              <th>Revenue</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {trafficSources.map((source, index) => (
              <TableRow key={index} {...source} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

KPICard.displayName = 'KPICard';
ProgressItem.displayName = 'ProgressItem';
FunnelStage.displayName = 'FunnelStage';
TableRow.displayName = 'TableRow';