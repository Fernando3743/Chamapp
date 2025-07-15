'use client';

import React from 'react';
import styles from '../../styles/components/dashboard/OverviewPage.module.css';

const OverviewPage = () => {
    // Date filter state
    const [dateFilter, setDateFilter] = React.useState('This Week');

    // Stats data
    const stats = [
        {
            icon: '💰',
            label: 'Total Revenue',
            value: '$124,563',
            trend: '+14.5%',
            trendType: 'up',
            description: 'vs last period'
        },
        {
            icon: '👥',
            label: 'Active Customers',
            value: '3,247',
            trend: '+8.2%',
            trendType: 'up',
            description: '+248 new customers'
        },
        {
            icon: '📅',
            label: 'Total Appointments',
            value: '1,842',
            trend: '+23.1%',
            trendType: 'up',
            description: 'Fully booked this week'
        },
        {
            icon: '⭐',
            label: 'Average Rating',
            value: '4.9/5.0',
            trend: '0%',
            trendType: 'neutral',
            description: 'Based on 523 reviews'
        }
    ];

    // Recent activity data
    const activities = [
        {
            icon: '✓',
            type: 'success',
            title: 'Payment Received',
            description: '$2,500 payment from Elite Spa Services for monthly subscription',
            time: '2 min ago'
        },
        {
            icon: '📅',
            type: 'info',
            title: 'New Appointment Booked',
            description: 'Sarah Johnson booked a premium consultation for next Tuesday',
            time: '15 min ago'
        },
        {
            icon: '⭐',
            type: 'warning',
            title: 'New Review Posted',
            description: 'Michael Chen left a 5-star review for your services',
            time: '1 hour ago'
        },
        {
            icon: '👤',
            type: 'info',
            title: 'New Customer Registration',
            description: 'Emma Davis signed up through your referral program',
            time: '3 hours ago'
        },
        {
            icon: '📧',
            type: 'success',
            title: 'Campaign Completed',
            description: 'Summer promotion email reached 2,847 customers with 34% open rate',
            time: '5 hours ago'
        }
    ];

    // Tasks data
    const [tasks, setTasks] = React.useState([
        {
            id: 1,
            text: 'Review morning appointments',
            meta: 'Completed at 9:00 AM',
            priority: 'low',
            completed: true
        },
        {
            id: 2,
            text: 'Send invoice to corporate clients',
            meta: 'Completed at 10:30 AM',
            priority: 'high',
            completed: true
        },
        {
            id: 3,
            text: 'Call Jennifer about rescheduling',
            meta: 'Due by 2:00 PM',
            priority: 'medium',
            completed: false
        },
        {
            id: 4,
            text: 'Update service pricing catalog',
            meta: 'Due by 5:00 PM',
            priority: 'medium',
            completed: false
        },
        {
            id: 5,
            text: 'Prepare tomorrow&apos;s staff schedule',
            meta: 'Due by end of day',
            priority: 'high',
            completed: false
        }
    ]);

    const toggleTask = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className={styles.overviewPage}>
            {/* Dashboard Header */}
            <div className={styles.dashboardHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.welcomeSection}>
                        <h1>Good morning, John! ☀️</h1>
                        <p>Your business is performing 23% better than last month</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button className={styles.btnPrimary}>
                            <span>+</span> New Appointment
                        </button>
                        <button className={styles.btnSecondary}>
                            <span>📊</span> Generate Report
                        </button>
                    </div>
                </div>
                <div className={styles.dateFilter}>
                    {['Today', 'This Week', 'This Month', 'This Year', 'Custom'].map(filter => (
                        <button 
                            key={filter}
                            className={`${styles.dateTab} ${dateFilter === filter ? styles.active : ''}`}
                            onClick={() => setDateFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.cardStat}>
                        <div className={styles.statHeader}>
                            <div className={styles.cardStatIcon}>{stat.icon}</div>
                            <div className={styles.statMenu}>⋮</div>
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.cardStatLabel}>{stat.label}</div>
                            <div className={styles.cardStatValue}>{stat.value}</div>
                            <div className={styles.statTrend}>
                                <span className={`${styles.statusTrend} ${styles[`status${stat.trendType.charAt(0).toUpperCase() + stat.trendType.slice(1)}`]}`}>
                                    {stat.trendType === 'up' ? '↑' : stat.trendType === 'down' ? '↓' : '→'} {stat.trend}
                                </span>
                                <span>{stat.description}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className={styles.chartsGrid}>
                {/* Revenue Chart */}
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <h3 className={styles.chartTitle}>Revenue Overview</h3>
                        <div className={styles.chartOptions}>
                            <button className={styles.chartOption}>Daily</button>
                            <button className={`${styles.chartOption} ${styles.active}`}>Weekly</button>
                            <button className={styles.chartOption}>Monthly</button>
                        </div>
                    </div>
                    <div className={styles.revenueChart}>
                        {[
                            { day: 'Mon', height: 60 },
                            { day: 'Tue', height: 80 },
                            { day: 'Wed', height: 45 },
                            { day: 'Thu', height: 90 },
                            { day: 'Fri', height: 75 },
                            { day: 'Sat', height: 95 },
                            { day: 'Sun', height: 65 }
                        ].map((bar, index) => (
                            <div 
                                key={index} 
                                className={styles.chartBar} 
                                style={{ height: `${bar.height}%` }}
                            >
                                <span className={styles.chartBarLabel}>{bar.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Goal Progress */}
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <h3 className={styles.chartTitle}>Monthly Goal</h3>
                    </div>
                    <div className={styles.progressCircle}>
                        <svg className={styles.progressSvg} width="200" height="200">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <circle className={styles.progressBg} cx="100" cy="100" r="70"></circle>
                            <circle className={styles.progressFill} cx="100" cy="100" r="70"></circle>
                        </svg>
                        <div className={styles.progressText}>
                            <div className={styles.progressValue}>73%</div>
                            <div className={styles.progressLabel}>of $150K goal</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity and Tasks */}
            <div className={styles.activityGrid}>
                {/* Recent Activity */}
                <div className={styles.activitySection}>
                    <div className={styles.cardSectionHeader}>
                        <h2 className={styles.cardSectionTitle}>Recent Activity</h2>
                        <a href="#" className={styles.viewAll}>View all →</a>
                    </div>
                    <div className={styles.activityList}>
                        {activities.map((activity, index) => (
                            <div key={index} className={styles.activityItem}>
                                <div className={`${styles.activityIcon} ${styles[activity.type]}`}>
                                    {activity.icon}
                                </div>
                                <div className={styles.activityContent}>
                                    <div className={styles.activityTitle}>{activity.title}</div>
                                    <div className={styles.activityDesc}>{activity.description}</div>
                                </div>
                                <div className={styles.activityTime}>{activity.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tasks Widget */}
                <div className={styles.tasksWidget}>
                    <div className={styles.tasksHeader}>
                        <h3 className={styles.cardSectionTitle}>Today&apos;s Tasks</h3>
                        <a href="#" className={styles.viewAll}>Manage →</a>
                    </div>
                    <div className={styles.taskStats}>
                        <div className={styles.taskStat}>
                            <div className={styles.taskStatValue}>{totalTasks}</div>
                            <div className={styles.taskStatLabel}>Total</div>
                        </div>
                        <div className={styles.taskStat}>
                            <div className={styles.taskStatValue}>{completedTasks}</div>
                            <div className={styles.taskStatLabel}>Completed</div>
                        </div>
                        <div className={styles.taskStat}>
                            <div className={styles.taskStatValue}>{pendingTasks}</div>
                            <div className={styles.taskStatLabel}>Pending</div>
                        </div>
                    </div>
                    <div className={styles.taskList}>
                        {tasks.map(task => (
                            <div 
                                key={task.id} 
                                className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
                                onClick={() => toggleTask(task.id)}
                            >
                                <div className={styles.taskCheckbox}></div>
                                <div className={styles.taskContent}>
                                    <div className={styles.taskText}>{task.text}</div>
                                    <div className={styles.taskMeta}>{task.meta}</div>
                                </div>
                                <div className={`${styles.taskPriority} ${styles[`priority${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`]}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;