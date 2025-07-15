'use client';

import React, { useState, useCallback } from 'react';
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext';
import styles from '../../styles/components/dashboard/SettingsPage.module.css'
import {
  Settings,
  Building2,
  Users,
  Bell,
  CreditCard,
  Link2,
  Lock,
  Camera,
  Check,
  Plus,
  Edit2,
  Trash2,
  Download
} from 'lucide-react';

// Toggle Switch Component
const ToggleSwitch = React.memo(({ active, onChange }) => {
  return (
    <div 
      className={`toggle-switch ${active ? 'active' : ''}`}
      onClick={() => onChange(!active)}
    />
  );
});

// General Settings Component
const GeneralSettings = React.memo(() => {
  const { user, userProfile } = useSupabaseAuth();
  const [formData, setFormData] = useState({
    firstName: userProfile?.first_name || 'John',
    lastName: userProfile?.last_name || 'Doe',
    email: user?.email || 'john.doe@businesshub.com',
    phone: '+1 (555) 123-4567',
    language: 'en',
    timezone: 'EST',
    dateFormat: 'MM/DD/YYYY'
  });

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Saving general settings:', formData);
  }, [formData]);

  return (
    <div className={`${styles.settingsContent} ${styles.active}`} id="general-settings">
      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Account Information</h2>
            <p className={"card-section-description"}>Update your personal account details</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={"form-row"}>
            <div className={"form-group"}>
              <label className={"form-label"}>First Name</label>
              <input 
                type="text" 
                className={"form-input"} 
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            </div>
            <div className={"form-group"}>
              <label className={"form-label"}>Last Name</label>
              <input 
                type="text" 
                className={"form-input"} 
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </div>
          </div>
          <div className={"form-group"}>
            <label className={"form-label"}>Email Address</label>
            <input 
              type="email" 
              className={"form-input"} 
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <p className={"form-helper"}>This email will be used for login and notifications</p>
          </div>
          <div className={"form-group"}>
            <label className={"form-label"}>Phone Number</label>
            <input 
              type="tel" 
              className={"form-input"} 
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className={"form-actions"}>
            <button type="submit" className={styles.btnPrimary}>Save Changes</button>
            <button type="button" className={styles.btnSecondary}>Cancel</button>
          </div>
        </form>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Preferences</h2>
            <p className={"card-section-description"}>Customize your account preferences</p>
          </div>
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Language</label>
          <select 
            className={"form-select"}
            value={formData.language}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            <option value="en">English (US)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Timezone</label>
          <select 
            className={"form-select"}
            value={formData.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
          >
            <option value="EST">Eastern Time (US & Canada)</option>
            <option value="CST">Central Time (US & Canada)</option>
            <option value="MST">Mountain Time (US & Canada)</option>
            <option value="PST">Pacific Time (US & Canada)</option>
          </select>
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Date Format</label>
          <select 
            className={"form-select"}
            value={formData.dateFormat}
            onChange={(e) => handleChange('dateFormat', e.target.value)}
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );
});

// Business Profile Settings Component
const BusinessSettings = React.memo(() => {
  const [businessHours, setBusinessHours] = useState({
    monday: { open: true, hours: '9:00 AM - 6:00 PM' },
    tuesday: { open: true, hours: '9:00 AM - 6:00 PM' },
    wednesday: { open: true, hours: '9:00 AM - 6:00 PM' },
    thursday: { open: true, hours: '9:00 AM - 8:00 PM' },
    friday: { open: true, hours: '9:00 AM - 8:00 PM' },
    saturday: { open: true, hours: '10:00 AM - 5:00 PM' },
    sunday: { open: false, hours: 'Closed' }
  });

  const toggleDay = useCallback((day) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: { ...prev[day], open: !prev[day].open }
    }));
  }, []);

  return (
    <div className={styles.settingsContent} id="business-settings">
      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Business Information</h2>
            <p className={"card-section-description"}>Manage your business details and branding</p>
          </div>
        </div>
        <div className={styles.imageUploadContainer}>
          <div className={styles.currentImage}>BH</div>
          <div className={styles.uploadSection}>
            <button className={`${styles.btnSecondary} ${styles.uploadBtn}`}>
              <Camera className={`styles.w-4 styles.h-4`} /> Upload Logo
            </button>
            <p className={"form-helper"}>Recommended: 200x200px, PNG or JPG</p>
          </div>
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Business Name</label>
          <input type="text" className={"form-input"} defaultValue="Elite Beauty Salon" />
        </div>
        <div className={"form-row"}>
          <div className={"form-group"}>
            <label className={"form-label"}>Business Type</label>
            <select className={"form-select"}>
              <option>Beauty Salon</option>
              <option>Spa & Wellness</option>
              <option>Fitness Center</option>
              <option>Medical Practice</option>
              <option>Other</option>
            </select>
          </div>
          <div className={"form-group"}>
            <label className={"form-label"}>Business Phone</label>
            <input type="tel" className={"form-input"} defaultValue="+1 (555) 987-6543" />
          </div>
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Business Address</label>
          <input type="text" className={"form-input"} defaultValue="123 Main Street, Suite 100" />
        </div>
        <div className={"form-row"}>
          <div className={"form-group"}>
            <label className={"form-label"}>City</label>
            <input type="text" className={"form-input"} defaultValue="New York" />
          </div>
          <div className={"form-group"}>
            <label className={"form-label"}>State</label>
            <input type="text" className={"form-input"} defaultValue="NY" />
          </div>
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Business Description</label>
          <textarea 
            className={"form-textarea"} 
            rows="4"
            defaultValue="Elite Beauty Salon offers premium hair care, nail services, and spa treatments in a luxurious setting. Our experienced team is dedicated to making you look and feel your best."
          />
        </div>
        <div className={"form-actions"}>
          <button className={styles.btnPrimary}>Save Changes</button>
          <button className={styles.btnSecondary}>Cancel</button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Business Hours</h2>
            <p className={"card-section-description"}>Set your regular business hours</p>
          </div>
        </div>
        {Object.entries(businessHours).map(([day, config]) => (
          <div key={day} className={styles.toggleGroup}>
            <div className={styles.toggleInfo}>
              <div className={styles.toggleLabel}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
              <div className={styles.toggleDescription}>{config.hours}</div>
            </div>
            <ToggleSwitch 
              active={config.open} 
              onChange={() => toggleDay(day)}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

// Team Settings Component
const TeamSettings = React.memo(() => {
  const teamMembers = [
    { id: 1, name: 'Emily Johnson', initials: 'EJ', role: 'Senior Stylist', access: 'Full Access' },
    { id: 2, name: 'Michael Chen', initials: 'MC', role: 'Hair Specialist', access: 'Limited Access' },
    { id: 3, name: 'Sarah Williams', initials: 'SW', role: 'Receptionist', access: 'Basic Access' }
  ];

  return (
    <div className={styles.settingsContent} id="team-settings">
      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Team Members</h2>
            <p className={"card-section-description"}>Manage your staff and their permissions</p>
          </div>
          <button className={styles.btnPrimary}>
            <Plus className={`styles.w-4 styles.h-4`} /> Add Team Member
          </button>
        </div>
        <div className={styles.teamList}>
          {teamMembers.map(member => (
            <div key={member.id} className={styles.teamMember}>
              <div className={styles.memberInfo}>
                <div className={styles.memberAvatar}>{member.initials}</div>
                <div className={styles.memberDetails}>
                  <h4>{member.name}</h4>
                  <p className={styles.memberRole}>{member.role} • {member.access}</p>
                </div>
              </div>
              <div className={styles.memberActions}>
                <button className={styles.btnSecondary}>
                  <Edit2 className={`styles.w-4 styles.h-4`} /> Edit
                </button>
                <button className={styles.btnSecondary}>
                  <Trash2 className={`styles.w-4 styles.h-4`} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Permissions</h2>
            <p className={"card-section-description"}>Configure role-based access control</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Allow staff to view reports</div>
            <div className={styles.toggleDescription}>Staff can access business analytics and reports</div>
          </div>
          <ToggleSwitch active={true} onChange={() => {}} />
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Allow staff to manage inventory</div>
            <div className={styles.toggleDescription}>Staff can add, edit, and remove products</div>
          </div>
          <ToggleSwitch active={false} onChange={() => {}} />
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Allow staff to process refunds</div>
            <div className={styles.toggleDescription}>Staff can issue refunds without approval</div>
          </div>
          <ToggleSwitch active={false} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
});

// Notifications Settings Component
const NotificationSettings = React.memo(() => {
  const [notifications, setNotifications] = useState({
    emailNewBooking: true,
    emailCancellation: true,
    emailReminders: false,
    pushNewBooking: true,
    pushCancellation: true,
    pushReminders: true,
    smsNewBooking: false,
    smsCancellation: false,
    smsReminders: true
  });

  const toggleNotification = useCallback((key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className={styles.settingsContent} id="notifications-settings">
      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Email Notifications</h2>
            <p className={"card-section-description"}>Choose which emails you&apos;d like to receive</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>New Booking</div>
            <div className={styles.toggleDescription}>Get notified when a customer books an appointment</div>
          </div>
          <ToggleSwitch 
            active={notifications.emailNewBooking} 
            onChange={() => toggleNotification('emailNewBooking')}
          />
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Cancellation</div>
            <div className={styles.toggleDescription}>Get notified when an appointment is cancelled</div>
          </div>
          <ToggleSwitch 
            active={notifications.emailCancellation} 
            onChange={() => toggleNotification('emailCancellation')}
          />
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Daily Reminders</div>
            <div className={styles.toggleDescription}>Receive daily summary of upcoming appointments</div>
          </div>
          <ToggleSwitch 
            active={notifications.emailReminders} 
            onChange={() => toggleNotification('emailReminders')}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Push Notifications</h2>
            <p className={"card-section-description"}>Manage your mobile push notifications</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>New Booking</div>
            <div className={styles.toggleDescription}>Instant notification for new bookings</div>
          </div>
          <ToggleSwitch 
            active={notifications.pushNewBooking} 
            onChange={() => toggleNotification('pushNewBooking')}
          />
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Cancellation</div>
            <div className={styles.toggleDescription}>Instant notification for cancellations</div>
          </div>
          <ToggleSwitch 
            active={notifications.pushCancellation} 
            onChange={() => toggleNotification('pushCancellation')}
          />
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Appointment Reminders</div>
            <div className={styles.toggleDescription}>Remind me 1 hour before appointments</div>
          </div>
          <ToggleSwitch 
            active={notifications.pushReminders} 
            onChange={() => toggleNotification('pushReminders')}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>SMS Notifications</h2>
            <p className={"card-section-description"}>Manage text message notifications</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>New Booking</div>
            <div className={styles.toggleDescription}>SMS alert for new bookings</div>
          </div>
          <ToggleSwitch 
            active={notifications.smsNewBooking} 
            onChange={() => toggleNotification('smsNewBooking')}
          />
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Cancellation</div>
            <div className={styles.toggleDescription}>SMS alert for cancellations</div>
          </div>
          <ToggleSwitch 
            active={notifications.smsCancellation} 
            onChange={() => toggleNotification('smsCancellation')}
          />
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Customer Reminders</div>
            <div className={styles.toggleDescription}>Send SMS reminders to customers</div>
          </div>
          <ToggleSwitch 
            active={notifications.smsReminders} 
            onChange={() => toggleNotification('smsReminders')}
          />
        </div>
      </div>
    </div>
  );
});

// Billing Settings Component
const BillingSettings = React.memo(() => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: 'per month',
      features: ['Up to 100 appointments', '5 staff members', 'Basic analytics', 'Email support'],
      current: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: 'per month',
      features: ['Unlimited appointments', '15 staff members', 'Advanced analytics', 'Priority support', 'SMS reminders'],
      current: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      features: ['Everything in Pro', 'Unlimited staff', 'Custom integrations', 'Dedicated support', 'API access'],
      current: false
    }
  ];

  return (
    <div className={styles.settingsContent} id="billing-settings">
      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Current Plan</h2>
            <p className={"card-section-description"}>Manage your subscription and billing</p>
          </div>
        </div>
        <div className={styles.plansGrid}>
          {plans.map((plan, index) => (
            <div key={index} className={`plan-card ${plan.current ? 'current' : ''}`}>
              {plan.current && <span className={styles.currentBadge}>Current Plan</span>}
              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.planPrice}>{plan.price}</div>
              <div className={styles.planPeriod}>{plan.period}</div>
              <ul className={styles.planFeatures}>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check className={`styles.checkIcon styles.w-4 styles.h-4`} /> {feature}
                  </li>
                ))}
              </ul>
              <button className={plan.current ? styles.btnSecondary : styles.btnPrimary}>
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Payment Method</h2>
            <p className={"card-section-description"}>Manage your payment information</p>
          </div>
          <button className={styles.btnSecondary}>
            <Plus className={`styles.w-4 styles.h-4`} /> Add Payment Method
          </button>
        </div>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentCard}>
            <CreditCard className={`styles.w-5 styles.h-5`} />
            <div className={styles.paymentInfo}>
              <div className={styles.paymentType}>Visa ending in 4242</div>
              <div className={styles.paymentExpiry}>Expires 12/2025</div>
            </div>
            <button className={styles.btnSecondary}>Update</button>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Billing History</h2>
            <p className={"card-section-description"}>Download your past invoices</p>
          </div>
        </div>
        <div className={styles.billingHistory}>
          <div className={styles.invoiceItem}>
            <div className={styles.invoiceInfo}>
              <div className={styles.invoiceDate}>December 1, 2024</div>
              <div className={styles.invoiceAmount}>$79.00</div>
            </div>
            <button className={styles.btnSecondary}>
              <Download className={`styles.w-4 styles.h-4`} /> Download
            </button>
          </div>
          <div className={styles.invoiceItem}>
            <div className={styles.invoiceInfo}>
              <div className={styles.invoiceDate}>November 1, 2024</div>
              <div className={styles.invoiceAmount}>$79.00</div>
            </div>
            <button className={styles.btnSecondary}>
              <Download className={`styles.w-4 styles.h-4`} /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Integrations Settings Component
const IntegrationsSettings = React.memo(() => {
  const integrations = [
    { name: 'Google Calendar', icon: '📅', status: 'connected' },
    { name: 'Stripe', icon: '💳', status: 'connected' },
    { name: 'Mailchimp', icon: '📧', status: 'disconnected' },
    { name: 'QuickBooks', icon: '📊', status: 'disconnected' },
    { name: 'Facebook', icon: '👍', status: 'connected' },
    { name: 'Instagram', icon: '📷', status: 'disconnected' }
  ];

  return (
    <div className={styles.settingsContent} id="integrations-settings">
      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Connected Apps</h2>
            <p className={"card-section-description"}>Manage your third-party integrations</p>
          </div>
        </div>
        <div className={styles.integrationsGrid}>
          {integrations.map((integration, index) => (
            <div key={index} className={styles.integrationCard}>
              <div className={styles.integrationIcon}>{integration.icon}</div>
              <div className={styles.integrationName}>{integration.name}</div>
              <div className={`integration-status status-${integration.status}`}>
                {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
              </div>
              <button className={integration.status === 'connected' ? styles.btnSecondary : styles.btnPrimary}>
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>API Access</h2>
            <p className={"card-section-description"}>Manage your API keys and webhooks</p>
          </div>
        </div>
        <div className={styles.apiSection}>
          <div className={"form-group"}>
            <label className={"form-label"}>API Key</label>
            <div className={styles.apiKeyContainer}>
              <input 
                type="text" 
                className={"form-input"} 
                value="bh_live_1234567890abcdef" 
                readOnly 
              />
              <button className={styles.btnSecondary}>Regenerate</button>
            </div>
            <p className={"form-helper"}>Use this key to authenticate API requests</p>
          </div>
          <div className={"form-group"}>
            <label className={"form-label"}>Webhook URL</label>
            <input 
              type="url" 
              className={"form-input"} 
              placeholder="https://your-domain.com/webhook" 
            />
            <p className={"form-helper"}>We&apos;ll send event notifications to this URL</p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Security Settings Component
const SecuritySettings = React.memo(() => {
  const [twoFactor, setTwoFactor] = useState(false);
  const activities = [
    { action: 'Password changed', time: '2 hours ago', icon: '🔒' },
    { action: 'Logged in from new device', time: '1 day ago', icon: '💻' },
    { action: 'API key regenerated', time: '3 days ago', icon: '🔑' },
    { action: 'Team member added', time: '1 week ago', icon: '👤' }
  ];

  return (
    <div className={styles.settingsContent} id="security-settings">
      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Password & Authentication</h2>
            <p className={"card-section-description"}>Manage your security settings</p>
          </div>
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Current Password</label>
          <input type="password" className={"form-input"} placeholder="Enter current password" />
        </div>
        <div className={"form-row"}>
          <div className={"form-group"}>
            <label className={"form-label"}>New Password</label>
            <input type="password" className={"form-input"} placeholder="Enter new password" />
          </div>
          <div className={"form-group"}>
            <label className={"form-label"}>Confirm Password</label>
            <input type="password" className={"form-input"} placeholder="Confirm new password" />
          </div>
        </div>
        <div className={"form-actions"}>
          <button className={styles.btnPrimary}>Update Password</button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Two-Factor Authentication</h2>
            <p className={"card-section-description"}>Add an extra layer of security to your account</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div className={styles.toggleInfo}>
            <div className={styles.toggleLabel}>Enable Two-Factor Authentication</div>
            <div className={styles.toggleDescription}>
              Require a verification code in addition to your password
            </div>
          </div>
          <ToggleSwitch active={twoFactor} onChange={setTwoFactor} />
        </div>
        {twoFactor && (
          <div className={styles.twoFactorSetup}>
            <p className={"form-helper"}>
              Scan the QR code with your authenticator app to set up two-factor authentication
            </p>
            <div className={styles.qrPlaceholder}>QR Code Placeholder</div>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Recent Activity</h2>
            <p className={"card-section-description"}>Monitor recent security-related activities</p>
          </div>
        </div>
        <div className={styles.activityLog}>
          {activities.map((activity, index) => (
            <div key={index} className={styles.logItem}>
              <div className={styles.logIcon}>{activity.icon}</div>
              <div className={styles.logContent}>
                <div className={styles.logTitle}>{activity.action}</div>
                <div className={styles.logTime}>{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`styles.section styles.dangerZone`}>
        <div className={"card-section-header"}>
          <div>
            <h2 className={"card-section-title"}>Danger Zone</h2>
            <p className={"card-section-description"}>Irreversible and destructive actions</p>
          </div>
        </div>
        <div className={styles.dangerActions}>
          <button className={"btn-danger"}>Delete Account</button>
          <p className={"form-helper"}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
        </div>
      </div>
    </div>
  );
});

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <Settings className={`styles.w-4 styles.h-4`} /> },
    { id: 'business', label: 'Business Profile', icon: <Building2 className={`styles.w-4 styles.h-4`} /> },
    { id: 'team', label: 'Team & Staff', icon: <Users className={`styles.w-4 styles.h-4`} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className={`styles.w-4 styles.h-4`} /> },
    { id: 'billing', label: 'Billing & Plans', icon: <CreditCard className={`styles.w-4 styles.h-4`} /> },
    { id: 'integrations', label: 'Integrations', icon: <Link2 className={`styles.w-4 styles.h-4`} /> },
    { id: 'security', label: 'Security', icon: <Lock className={`styles.w-4 styles.h-4`} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'business':
        return <BusinessSettings />;
      case 'team':
        return <TeamSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className={styles.settingsContainer}>
      {/* Settings Header */}
      <div className={styles.settingsHeader}>
        <h1 className={"layout-page-title"}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage your account settings and preferences</p>
      </div>

      {/* Settings Layout */}
      <div className={styles.settingsLayout}>
        {/* Settings Navigation */}
        <nav className={styles.settingsNav}>
          {tabs.map(tab => (
            <a
              key={tab.id}
              href="#"
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
            >
              <span className={styles.navIcon}>{tab.icon}</span>
              <span className={styles.navText}>{tab.label}</span>
            </a>
          ))}
        </nav>

        {/* Settings Content */}
        <div className={styles.settingsWrapper}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

ToggleSwitch.displayName = 'ToggleSwitch';
GeneralSettings.displayName = 'GeneralSettings';
BusinessSettings.displayName = 'BusinessSettings';
TeamSettings.displayName = 'TeamSettings';
NotificationSettings.displayName = 'NotificationSettings';
BillingSettings.displayName = 'BillingSettings';
IntegrationsSettings.displayName = 'IntegrationsSettings';
SecuritySettings.displayName = 'SecuritySettings';