'use client';

import React from 'react';
import styles from '../../styles/components/dashboard/OverviewPageNew.module.css';

export default function OverviewPageNew() {
  return (
    <div className="dashboard-content">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Good morning, Luis! ☀️</h1>
            <p>Your business is performing 23% better than last month</p>
          </div>
          <div className="header-actions">
            <button className={styles.btnPrimary}>
              <span>+</span> New Appointment
            </button>
            <button className={styles.btnSecondary}>
              <span>📊</span> Generate Report
            </button>
          </div>
        </div>
        <div className="date-filter">
          <button className="date-tab">Today</button>
          <button className="date-tab active">This Week</button>
          <button className="date-tab">This Month</button>
          <button className="date-tab">This Year</button>
          <button className="date-tab">Custom</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">💰</div>
            <div className="stat-menu">⋮</div>
          </div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">$124,563</div>
          <div className="stat-trend">
            <span className="trend-icon trend-up">↑ 14.5%</span>
            <span>vs last period</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">👥</div>
            <div className="stat-menu">⋮</div>
          </div>
          <div className="stat-label">Active Customers</div>
          <div className="stat-value">3,247</div>
          <div className="stat-trend">
            <span className="trend-icon trend-up">↑ 8.2%</span>
            <span>+248 new customers</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">📅</div>
            <div className="stat-menu">⋮</div>
          </div>
          <div className="stat-label">Total Appointments</div>
          <div className="stat-value">1,842</div>
          <div className="stat-trend">
            <span className="trend-icon trend-up">↑ 23.1%</span>
            <span>Fully booked this week</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">⭐</div>
            <div className="stat-menu">⋮</div>
          </div>
          <div className="stat-label">Average Rating</div>
          <div className="stat-value">4.9/5.0</div>
          <div className="stat-trend">
            <span className="trend-icon trend-neutral">→ 0%</span>
            <span>Based on 523 reviews</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Revenue Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Revenue Overview</h3>
            <div className="chart-options">
              <button className="chart-option">Daily</button>
              <button className="chart-option active">Weekly</button>
              <button className="chart-option">Monthly</button>
            </div>
          </div>
          <div className="revenue-chart">
            <div className="chart-bar" style={{ height: '60%' }}>
              <span className="chart-bar-label">Mon</span>
            </div>
            <div className="chart-bar" style={{ height: '80%' }}>
              <span className="chart-bar-label">Tue</span>
            </div>
            <div className="chart-bar" style={{ height: '45%' }}>
              <span className="chart-bar-label">Wed</span>
            </div>
            <div className="chart-bar" style={{ height: '90%' }}>
              <span className="chart-bar-label">Thu</span>
            </div>
            <div className="chart-bar" style={{ height: '75%' }}>
              <span className="chart-bar-label">Fri</span>
            </div>
            <div className="chart-bar" style={{ height: '95%' }}>
              <span className="chart-bar-label">Sat</span>
            </div>
            <div className="chart-bar" style={{ height: '65%' }}>
              <span className="chart-bar-label">Sun</span>
            </div>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Monthly Goal</h3>
          </div>
          <div className="progress-circle">
            <svg className="progress-svg" width="200" height="200">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle className="progress-bg" cx="100" cy="100" r="70"></circle>
              <circle className="progress-fill" cx="100" cy="100" r="70"></circle>
            </svg>
            <div className="progress-text">
              <div className="progress-value">73%</div>
              <div className="progress-label">of $150K goal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity and Tasks */}
      <div className="activity-grid">
        {/* Recent Activity */}
        <div className="activity-section">
          <div className="section-header">
            <h2 className="section-title">Recent Activity</h2>
            <a href="#" className="view-all">View all →</a>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon success">✓</div>
              <div className="activity-content">
                <div className="activity-title">Payment Received</div>
                <div className="activity-desc">$2,500 payment from Elite Spa Services for monthly subscription</div>
              </div>
              <div className="activity-time">2 min ago</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon info">📅</div>
              <div className="activity-content">
                <div className="activity-title">New Appointment Booked</div>
                <div className="activity-desc">Sarah Johnson booked a premium consultation for next Tuesday</div>
              </div>
              <div className="activity-time">15 min ago</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon warning">⭐</div>
              <div className="activity-content">
                <div className="activity-title">New Review Posted</div>
                <div className="activity-desc">Michael Chen left a 5-star review for your services</div>
              </div>
              <div className="activity-time">1 hour ago</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon info">👤</div>
              <div className="activity-content">
                <div className="activity-title">New Customer Registration</div>
                <div className="activity-desc">Emma Davis signed up through your referral program</div>
              </div>
              <div className="activity-time">3 hours ago</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon success">📧</div>
              <div className="activity-content">
                <div className="activity-title">Campaign Completed</div>
                <div className="activity-desc">Summer promotion email reached 2,847 customers with 34% open rate</div>
              </div>
              <div className="activity-time">5 hours ago</div>
            </div>
          </div>
        </div>

        {/* Tasks Widget */}
        <div className="tasks-widget">
          <div className="tasks-header">
            <h3 className="section-title">Today&apos;s Tasks</h3>
            <a href="#" className="view-all">Manage →</a>
          </div>
          <div className="task-stats">
            <div className="task-stat">
              <div className="task-stat-value">8</div>
              <div className="task-stat-label">Total</div>
            </div>
            <div className="task-stat">
              <div className="task-stat-value">5</div>
              <div className="task-stat-label">Completed</div>
            </div>
            <div className="task-stat">
              <div className="task-stat-value">3</div>
              <div className="task-stat-label">Pending</div>
            </div>
          </div>
          <div className="task-list">
            <div className="task-item completed">
              <div className="task-checkbox"></div>
              <div className="task-content">
                <div className="task-text">Review morning appointments</div>
                <div className="task-meta">Completed at 9:00 AM</div>
              </div>
              <div className="task-priority priority-low"></div>
            </div>
            <div className="task-item completed">
              <div className="task-checkbox"></div>
              <div className="task-content">
                <div className="task-text">Send invoice to corporate clients</div>
                <div className="task-meta">Completed at 10:30 AM</div>
              </div>
              <div className="task-priority priority-high"></div>
            </div>
            <div className="task-item">
              <div className="task-checkbox"></div>
              <div className="task-content">
                <div className="task-text">Call Jennifer about rescheduling</div>
                <div className="task-meta">Due by 2:00 PM</div>
              </div>
              <div className="task-priority priority-medium"></div>
            </div>
            <div className="task-item">
              <div className="task-checkbox"></div>
              <div className="task-content">
                <div className="task-text">Update service pricing catalog</div>
                <div className="task-meta">Due by 5:00 PM</div>
              </div>
              <div className="task-priority priority-medium"></div>
            </div>
            <div className="task-item">
              <div className="task-checkbox"></div>
              <div className="task-content">
                <div className="task-text">Prepare tomorrow&apos;s staff schedule</div>
                <div className="task-meta">Due by end of day</div>
              </div>
              <div className="task-priority priority-high"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}