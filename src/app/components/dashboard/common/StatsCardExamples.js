/**
 * StatsCard Component Usage Examples
 * This file demonstrates various ways to use the StatsCard component
 * across different dashboard scenarios.
 */

import StatsCard from './StatsCard';

export default function StatsCardExamples() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">StatsCard Usage Examples</h1>
      
      {/* Default Vertical Layout - Dashboard Overview Stats */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Default Vertical Layout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatsCard
            icon="💰"
            label="Total Revenue"
            value="$124,563"
            change="+14.5%"
            changeLabel="vs last period"
            trend="up"
            variant="default"
          />
          <StatsCard
            icon="👥"
            label="New Customers"
            value="1,234"
            change="+23.1%"
            changeLabel="vs last period"
            trend="up"
            variant="default"
          />
          <StatsCard
            icon="📅"
            label="Appointments"
            value="847"
            change="-5.2%"
            changeLabel="vs last period"
            trend="down"
            variant="default"
          />
          <StatsCard
            icon="📈"
            label="Growth Rate"
            value="23.5%"
            change="+4.3%"
            changeLabel="vs last period"
            trend="up"
            variant="default"
          />
        </div>
      </section>

      {/* Horizontal Layout - Customer Stats */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Horizontal Layout (Customer Style)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatsCard
            icon="👥"
            label="Total Customers"
            value="3,247"
            change="+12%"
            changeLabel="from last month"
            trend="up"
            variant="horizontal"
          />
          <StatsCard
            icon="✨"
            label="New This Month"
            value="248"
            change="+8%"
            changeLabel="growth rate"
            trend="up"
            variant="horizontal"
          />
          <StatsCard
            icon="💎"
            label="Retention Rate"
            value="89%"
            change="+3%"
            changeLabel="improvement"
            trend="up"
            variant="horizontal"
          />
          <StatsCard
            icon="💰"
            label="Avg Customer Value"
            value="$284"
            change="+$24"
            changeLabel="increase"
            trend="up"
            variant="horizontal"
          />
        </div>
      </section>

      {/* Appointment Stats */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Appointment Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatsCard
            icon="📅"
            label="Today's Appointments"
            value="12"
            change="+20%"
            changeLabel="vs yesterday"
            trend="up"
            variant="default"
          />
          <StatsCard
            icon="✅"
            label="Completed"
            value="8"
            changeLabel="67% completion rate"
            variant="default"
            showMoreMenu={false}
          />
          <StatsCard
            icon="⏳"
            label="Pending"
            value="3"
            changeLabel="Next in 30 mins"
            variant="default"
            showMoreMenu={false}
          />
          <StatsCard
            icon="❌"
            label="Cancelled"
            value="1"
            change="-50%"
            changeLabel="Great improvement"
            trend="up" // Even though it's a decrease in cancellations, it's positive
            variant="default"
          />
        </div>
      </section>

      {/* Custom Icon Background Colors */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Custom Icon Background Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatsCard
            icon="🛒"
            label="Orders"
            value="1,547"
            change="+18.2%"
            changeLabel="vs last week"
            trend="up"
            iconBgColor="green-500/10"
            variant="default"
          />
          <StatsCard
            icon="📦"
            label="Products"
            value="329"
            change="+5.1%"
            changeLabel="vs last week"
            trend="up"
            iconBgColor="blue-500/10"
            variant="default"
          />
          <StatsCard
            icon="⭐"
            label="Reviews"
            value="4.8"
            change="+0.2"
            changeLabel="rating improvement"
            trend="up"
            iconBgColor="yellow-500/10"
            variant="default"
          />
          <StatsCard
            icon="📊"
            label="Conversion Rate"
            value="3.2%"
            change="-0.5%"
            changeLabel="needs attention"
            trend="down"
            iconBgColor="red-500/10"
            variant="default"
          />
        </div>
      </section>

      {/* Mixed Usage */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Mixed Layout Example</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <StatsCard
                icon="💳"
                label="Monthly Revenue"
                value="$45,230"
                change="+12.5%"
                changeLabel="vs last month"
                trend="up"
                variant="horizontal"
              />
              <StatsCard
                icon="🎯"
                label="Goal Progress"
                value="78%"
                change="+15%"
                changeLabel="of monthly target"
                trend="up"
                variant="horizontal"
              />
            </div>
          </div>
          <StatsCard
            icon="🚀"
            label="Performance Score"
            value="94"
            change="+7"
            changeLabel="excellent!"
            trend="up"
            iconBgColor="purple-500/10"
            variant="default"
            className="lg:row-span-1"
          />
        </div>
      </section>
    </div>
  );
}