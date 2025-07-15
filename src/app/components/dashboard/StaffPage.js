'use client';

import React, { useState, useCallback, useMemo } from 'react';
import styles from '../../styles/components/dashboard/StaffPage.module.css'
import {
  Plus,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Star,
  Clock
} from 'lucide-react';

// Staff Card Component
const StaffCard = React.memo(({ staff, onAction }) => {
  return (
    <div className={styles.staffCard} onClick={() => onAction('view', staff)}>
      <div className={styles.staffCardHeader}>
        <div className={styles.staffAvatar}>
          {staff.initials}
          <div className={`staff-status-indicator ${staff.status}`}></div>
        </div>
        <div className={styles.staffInfo}>
          <h3 className={styles.staffName}>{staff.name}</h3>
          <p className={styles.staffRole}>{staff.role}</p>
          <div className={styles.staffBadges}>
            {staff.badges.map((badge, index) => (
              <span key={index} className={`badge ${badge.type || ''}`}>
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.staffStats}>
        <div className={styles.statItem}>
          <div className={styles.cardStatValue}>{staff.appointments}</div>
          <div className={styles.cardStatLabel}>Appointments</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.cardStatValue}>${staff.revenue}</div>
          <div className={styles.cardStatLabel}>Revenue</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.cardStatValue}>{staff.rating}</div>
          <div className={styles.cardStatLabel}>Rating</div>
        </div>
      </div>
      <div className={styles.staffActions}>
        <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); onAction('profile', staff); }}>
          View Profile
        </button>
        <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); onAction('schedule', staff); }}>
          Schedule
        </button>
        <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); onAction('message', staff); }}>
          Message
        </button>
      </div>
    </div>
  );
});

// Performance Card Component
const PerformanceCard = React.memo(({ icon, label, value, comparison, trend, trendValue }) => {
  return (
    <div className={styles.perfCard}>
      <div className={styles.perfHeader}>
        <div className={styles.perfIcon}>{icon}</div>
        <div className={`perf-trend trend-${trend}`}>
          <span>{trend === 'up' ? '↑' : '↓'}</span> {trendValue}
        </div>
      </div>
      <div className={styles.perfLabel}>{label}</div>
      <div className={styles.perfValue}>{value}</div>
      <div className={styles.perfComparison}>{comparison}</div>
    </div>
  );
});

// Schedule Row Component
const ScheduleRow = React.memo(({ staff, schedule }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className={styles.staffScheduleRow}>
      <div className={styles.staffLabel}>
        <div className={styles.staffMiniAvatar}>{staff.initials}</div>
        <span>{staff.name}</span>
      </div>
      {days.map((day, index) => (
        <div 
          key={day} 
          className={`schedule-cell ${schedule[index].status}`}
          title={`${staff.name} - ${day}: ${schedule[index].time}`}
        >
          {schedule[index].time}
        </div>
      ))}
    </div>
  );
});

// Activity Item Component
const ActivityItem = React.memo(({ activity }) => {
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityAvatar}>{activity.initials}</div>
      <div className={styles.activityContent}>
        <div className={styles.activityTitle}>{activity.title}</div>
        <div className={styles.activityDescription}>{activity.description}</div>
        <div className={styles.activityTime}>{activity.time}</div>
      </div>
    </div>
  );
});

// Goal Item Component
const GoalItem = React.memo(({ goal }) => {
  const isAchieved = goal.current >= goal.target;
  const percentage = Math.min((goal.current / goal.target) * 100, 100);
  
  return (
    <div className={styles.goalItem}>
      <div className={styles.goalHeader}>
        <span className={styles.goalTitle}>{goal.title}</span>
        <span className={styles.goalValue}>
          {goal.format === 'currency' && '$'}
          {goal.current.toLocaleString()}
          {goal.format === 'percentage' && '%'} / 
          {goal.format === 'currency' && '$'}
          {goal.target.toLocaleString()}
          {goal.format === 'percentage' && '%'}
        </span>
      </div>
      <div className={styles.goalProgress}>
        <div 
          className={styles.goalFill} 
          style={{
            width: `${percentage}%`,
            background: isAchieved ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' : ''
          }}
        ></div>
      </div>
      <div className={styles.goalStatus}>
        <span>{isAchieved ? 'Goal Achieved! 🎉' : `${percentage.toFixed(1)}% Complete`}</span>
        <span>
          {isAchieved 
            ? `+${(goal.current - goal.target).toLocaleString()} above target`
            : `${(goal.target - goal.current).toLocaleString()} to go`}
        </span>
      </div>
    </div>
  );
});

export default function StaffPage() {
  const [activeTimeFilter, setActiveTimeFilter] = useState('This Month');
  const [filterDepartment, setFilterDepartment] = useState('All Departments');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [sortBy, setSortBy] = useState('Sort by: Performance');

  // Mock staff data
  const staffMembers = [
    {
      id: 1,
      initials: 'EJ',
      name: 'Emily Johnson',
      role: 'Senior Hair Stylist',
      status: 'active',
      badges: [
        { text: '⭐ Top Performer', type: 'top-performer' },
        { text: '5 Years' }
      ],
      appointments: 152,
      revenue: '28.5k',
      rating: 4.9
    },
    {
      id: 2,
      initials: 'MG',
      name: 'Maria Garcia',
      role: 'Nail Technician',
      status: 'busy',
      badges: [
        { text: '3 Years' }
      ],
      appointments: 128,
      revenue: '24.2k',
      rating: 4.8
    },
    {
      id: 3,
      initials: 'RC',
      name: 'Robert Chen',
      role: 'Massage Therapist',
      status: 'active',
      badges: [
        { text: '4 Years' },
        { text: 'Certified' }
      ],
      appointments: 98,
      revenue: '21.8k',
      rating: 4.9
    },
    {
      id: 4,
      initials: 'LT',
      name: 'Lisa Thompson',
      role: 'Esthetician',
      status: 'offline',
      badges: [
        { text: '2 Years' }
      ],
      appointments: 76,
      revenue: '18.3k',
      rating: 4.7
    }
  ];

  // Performance data
  const performanceData = [
    {
      icon: '📅',
      label: 'Total Appointments',
      value: '1,842',
      comparison: 'vs 1,598 last month',
      trend: 'up',
      trendValue: '15.3%'
    },
    {
      icon: '💰',
      label: 'Team Revenue',
      value: '$112.6k',
      comparison: 'vs $91.2k last month',
      trend: 'up',
      trendValue: '23.5%'
    },
    {
      icon: '⭐',
      label: 'Average Rating',
      value: '4.8',
      comparison: 'Based on 523 reviews',
      trend: 'up',
      trendValue: '0.2'
    },
    {
      icon: '⏱️',
      label: 'Utilization Rate',
      value: '87%',
      comparison: 'vs 92% last month',
      trend: 'down',
      trendValue: '5%'
    }
  ];

  // Schedule data
  const scheduleData = [
    {
      staff: { initials: 'EJ', name: 'Emily J.' },
      schedule: [
        { time: '9-6', status: 'working' },
        { time: '9-6', status: 'working' },
        { time: '9-6', status: 'working' },
        { time: '9-8', status: 'working' },
        { time: '9-8', status: 'working' },
        { time: '10-5', status: 'working' },
        { time: 'Off', status: 'off' }
      ]
    },
    {
      staff: { initials: 'MG', name: 'Maria G.' },
      schedule: [
        { time: '10-7', status: 'working' },
        { time: '10-7', status: 'working' },
        { time: 'Off', status: 'off' },
        { time: '10-7', status: 'working' },
        { time: '10-7', status: 'working' },
        { time: '11-6', status: 'working' },
        { time: 'Off', status: 'off' }
      ]
    },
    {
      staff: { initials: 'RC', name: 'Robert C.' },
      schedule: [
        { time: 'Off', status: 'off' },
        { time: '12-8', status: 'working' },
        { time: '12-8', status: 'working' },
        { time: '12-8', status: 'working' },
        { time: '12-8', status: 'working' },
        { time: '10-6', status: 'working' },
        { time: '10-6', status: 'working' }
      ]
    },
    {
      staff: { initials: 'LT', name: 'Lisa T.' },
      schedule: [
        { time: '9-5', status: 'working' },
        { time: '9-5', status: 'working' },
        { time: '9-5', status: 'working' },
        { time: 'Off', status: 'off' },
        { time: '9-5', status: 'working' },
        { time: 'Off', status: 'off' },
        { time: 'Off', status: 'off' }
      ]
    }
  ];

  // Commission data
  const commissionData = [
    { name: 'Emily J.', amount: 5700, height: 90 },
    { name: 'Maria G.', amount: 4840, height: 75 },
    { name: 'Robert C.', amount: 4360, height: 68 },
    { name: 'Lisa T.', amount: 3660, height: 55 },
    { name: 'James W.', amount: 3020, height: 45 }
  ];

  // Activity data
  const activities = [
    {
      initials: 'EJ',
      title: 'Emily Johnson completed 5 appointments',
      description: 'Generated $485 in revenue',
      time: '2 hours ago'
    },
    {
      initials: 'MG',
      title: 'Maria Garcia received a 5-star review',
      description: '"Amazing service! Will definitely come back."',
      time: '3 hours ago'
    },
    {
      initials: 'RC',
      title: 'Robert Chen updated availability',
      description: 'Now available for evening appointments',
      time: '5 hours ago'
    },
    {
      initials: 'LT',
      title: 'Lisa Thompson completed training',
      description: 'Advanced Facial Techniques Certification',
      time: 'Yesterday'
    },
    {
      initials: 'JW',
      title: 'James Wilson joined the team',
      description: 'Welcome our new Hair Stylist!',
      time: '2 days ago'
    }
  ];

  // Goals data
  const goals = [
    {
      title: 'Monthly Revenue Target',
      current: 112600,
      target: 120000,
      format: 'currency'
    },
    {
      title: 'Customer Satisfaction',
      current: 4.8,
      target: 4.5,
      format: 'rating'
    },
    {
      title: 'New Client Acquisition',
      current: 248,
      target: 300,
      format: 'number'
    },
    {
      title: 'Retention Rate',
      current: 87,
      target: 85,
      format: 'percentage'
    }
  ];

  const handleStaffAction = useCallback((action, staff) => {
    console.log(`${action} action for ${staff.name}`);
    // Implement action handling
  }, []);

  const handleAddStaff = useCallback(() => {
    console.log('Opening add staff modal');
    // Implement add staff functionality
  }, []);

  return (
    <div className={styles.staffContainer}>
      {/* Staff Header */}
      <div className={styles.staffHeader}>
        <div className="layout-header-content">
          <div className="layout-page-title">
            <h1>Staff Dashboard</h1>
            <p>Manage your team performance and schedules</p>
          </div>
          <div className="layout-header-actions">
            <button className={styles.btnPrimary} onClick={handleAddStaff}>
              <Plus className={`styles.w-4 styles.h-4`} /> Add Staff Member
            </button>
            <button className={styles.btnSecondary}>
              <Calendar className={`styles.w-4 styles.h-4`} /> Schedule Builder
            </button>
            <button className={styles.btnSecondary}>
              <Download className={`styles.w-4 styles.h-4`} /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Staff Filters */}
      <div className={styles.staffFilters}>
        <select 
          className={styles.filterSelect} 
          value={filterDepartment} 
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option>All Departments</option>
          <option>Hair Stylists</option>
          <option>Nail Technicians</option>
          <option>Massage Therapists</option>
          <option>Estheticians</option>
        </select>
        <select 
          className={styles.filterSelect} 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>On Break</option>
          <option>Off Duty</option>
        </select>
        <select 
          className={styles.filterSelect} 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Sort by: Performance</option>
          <option>Sort by: Name</option>
          <option>Sort by: Revenue</option>
          <option>Sort by: Rating</option>
        </select>
      </div>

      {/* Staff Grid */}
      <div className={styles.staffGrid}>
        {staffMembers.map(staff => (
          <StaffCard key={staff.id} staff={staff} onAction={handleStaffAction} />
        ))}
      </div>

      {/* Performance Overview */}
      <div className={styles.performanceSection}>
        <div className={"card-section-header"}>
          <h2 className={"card-section-title"}>Team Performance</h2>
          <div className={styles.timeFilter}>
            {['Today', 'This Week', 'This Month', 'This Year'].map(period => (
              <button
                key={period}
                className={`time-btn ${activeTimeFilter === period ? 'active' : ''}`}
                onClick={() => setActiveTimeFilter(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Cards */}
      <div className={styles.performanceCards}>
        {performanceData.map((data, index) => (
          <PerformanceCard key={index} {...data} />
        ))}
      </div>

      {/* Schedule Overview */}
      <div className={styles.scheduleOverview}>
        <div className={"card-section-header"}>
          <h2 className={"card-section-title"}>This Week&apos;s Schedule</h2>
          <button className={styles.btnSecondary}>Edit Schedule</button>
        </div>
        <div className={styles.scheduleGrid}>
          {/* Headers */}
          <div></div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className={styles.scheduleHeader}>{day}</div>
          ))}
          
          {/* Staff Schedules */}
          {scheduleData.map((data, index) => (
            <ScheduleRow key={index} {...data} />
          ))}
        </div>
      </div>

      {/* Commission & Activity */}
      <div className={styles.commissionSection}>
        {/* Commission Chart */}
        <div className={styles.commissionChart}>
          <div className={"card-section-header"}>
            <h2 className={"card-section-title"}>Commission Overview</h2>
          </div>
          <div className={styles.barChart}>
            {commissionData.map((data, index) => (
              <div key={index} className={styles.bar} style={{ height: `${data.height}%` }}>
                <span className={styles.barValue}>${data.amount.toLocaleString()}</span>
                <span className={styles.barLabel}>{data.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Summary */}
        <div className={styles.commissionSummary}>
          <h3 className={"card-section-title"}>Commission Summary</h3>
          <div className={styles.summaryItem}>
            <div className={styles.summaryLabel}>Total Commissions</div>
            <div className={styles.summaryValue}>$21,580</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryLabel}>Average Commission</div>
            <div className={styles.summaryValue}>$4,316</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryLabel}>Commission Rate</div>
            <div className={styles.summaryValue}>20%</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryLabel}>Bonus Pool</div>
            <div className={styles.summaryValue}>$2,500</div>
          </div>
        </div>
      </div>

      {/* Activity Feed & Goals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Activity Feed */}
        <div className={styles.activityFeed}>
          <div className={"card-section-header"}>
            <h3 className={"card-section-title"}>Recent Activity</h3>
          </div>
          <div className={styles.activityList}>
            {activities.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className={styles.goalsSection}>
          <div className={"card-section-header"}>
            <h3 className={"card-section-title"}>Team Goals</h3>
          </div>
          <div className={styles.goalsList}>
            {goals.map((goal, index) => (
              <GoalItem key={index} goal={goal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

StaffCard.displayName = 'StaffCard';
PerformanceCard.displayName = 'PerformanceCard';
ScheduleRow.displayName = 'ScheduleRow';
ActivityItem.displayName = 'ActivityItem';
GoalItem.displayName = 'GoalItem';