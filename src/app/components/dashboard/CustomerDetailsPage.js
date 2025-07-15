'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/components/dashboard/CustomerDetailsPage.module.css'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  MoreVertical,
  Edit2,
  DollarSign,
  Star,
  Cake,
  TrendingUp,
  Plus,
  Send
} from 'lucide-react';

// Customer Stats Card Component
const StatCard = React.memo(({ icon, label, value, trend }) => {
  return (
    <div className={styles.cardStat}>
      <div className={styles.statHeader}>
        <div className={styles.cardStatIcon}>{icon}</div>
      </div>
      <div className={styles.cardStatLabel}>{label}</div>
      <div className={styles.cardStatValue}>{value}</div>
      <div className={styles.cardStatTrend}>
        <span>{trend}</span>
      </div>
    </div>
  );
});

// Details Section Component
const DetailsSection = React.memo(({ title, onEdit, children }) => {
  return (
    <div className={styles.detailsSection}>
      <div className="card-section-header">
        <h3 className="card-section-title">{title}</h3>
        <button className={styles.editBtn} onClick={onEdit}>
          <Edit2 className={`styles.w-4 styles.h-4`} />
        </button>
      </div>
      <div className={styles.detailsList}>
        {children}
      </div>
    </div>
  );
});

// Detail Item Component
const DetailItem = React.memo(({ label, value }) => {
  return (
    <div className={styles.detailItem}>
      <div>
        <div className={styles.detailLabel}>{label}</div>
        <div className={styles.detailValue}>{value}</div>
      </div>
    </div>
  );
});

// Note Item Component
const NoteItem = React.memo(({ note }) => {
  return (
    <div className={styles.noteItem}>
      <div className={styles.noteHeader}>
        <span className={styles.noteAuthor}>{note.author}</span>
        <span className={styles.noteDate}>{note.date}</span>
      </div>
      <div className={styles.noteContent}>{note.content}</div>
    </div>
  );
});

// Communication Item Component
const CommunicationItem = React.memo(({ comm }) => {
  return (
    <div className={styles.commItem}>
      <div className={styles.commContent}>
        <div className={styles.commHeader}>
          <div className={styles.commType}>
            {comm.type === 'email' ? <Mail className={`styles.w-4 styles.h-4`} /> : <MessageSquare className={`styles.w-4 styles.h-4`} />}
            <span>{comm.type}</span>
          </div>
          <span className={styles.commTime}>{comm.time}</span>
        </div>
        <div className={styles.commMessage}>{comm.message}</div>
      </div>
    </div>
  );
});

export default function CustomerDetailsPage({ customerId = 1, onBack }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [noteText, setNoteText] = useState('');

  // Mock customer data
  const customer = {
    id: customerId,
    name: 'Sarah Mitchell',
    initials: 'SM',
    email: 'sarah.mitchell@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    status: 'active',
    tags: ['VIP Customer', 'Loyal (3+ years)', 'Premium Member'],
    totalSpent: 3847,
    totalAppointments: 48,
    appointmentsThisYear: 12,
    averageRating: 4.9,
    totalReviews: 15,
    customerSince: '2021',
    customerDuration: '3 years 4 months',
    // Personal Information
    dateOfBirth: 'March 15, 1985',
    gender: 'Female',
    preferredLanguage: 'English',
    // Contact Information
    address: '123 Main Street\nNew York, NY 10001',
    emergencyContact: 'John Mitchell (Husband)\n+1 (555) 123-4568',
    // Preferences
    preferredServices: 'Hair Cut, Hair Color, Manicure',
    preferredStaff: 'Emily Johnson, Maria Garcia',
    allergies: 'Sensitive to strong fragrances',
    marketingPreferences: 'Email: ✓ SMS: ✗ Push: ✓',
    // Membership
    membershipType: 'Premium Member',
    memberSince: 'August 15, 2021',
    loyaltyPoints: 2450,
    referralsMade: 5
  };

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      date: 'Dec 5, 2024',
      service: 'Premium Hair Cut & Color',
      staff: 'Emily Johnson',
      duration: '2h 30m',
      status: 'completed',
      amount: 125
    },
    {
      id: 2,
      date: 'Nov 20, 2024',
      service: 'Gel Manicure',
      staff: 'Maria Garcia',
      duration: '45m',
      status: 'completed',
      amount: 35
    },
    {
      id: 3,
      date: 'Nov 5, 2024',
      service: 'Deep Conditioning Treatment',
      staff: 'Emily Johnson',
      duration: '1h',
      status: 'completed',
      amount: 65
    },
    {
      id: 4,
      date: 'Oct 15, 2024',
      service: 'Hair Cut & Style',
      staff: 'Emily Johnson',
      duration: '1h 30m',
      status: 'no-show',
      amount: 0
    }
  ];

  // Mock purchases data
  const purchases = [
    {
      id: 1,
      name: 'Premium Hair Care Bundle',
      date: 'Dec 5, 2024',
      amount: 89,
      icon: '🧴'
    },
    {
      id: 2,
      name: 'Nail Polish Collection',
      date: 'Nov 20, 2024',
      amount: 45,
      icon: '💅'
    },
    {
      id: 3,
      name: 'Gift Card',
      date: 'Nov 1, 2024',
      amount: 100,
      icon: '🎁'
    }
  ];

  // Mock notes data
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: 'Emily Johnson',
      date: '2 days ago',
      content: 'Customer prefers appointments in the morning. Always uses organic hair products.'
    },
    {
      id: 2,
      author: 'Maria Garcia',
      date: '1 week ago',
      content: 'Allergic to certain nail polish brands. Prefers gel manicures.'
    },
    {
      id: 3,
      author: 'John Doe',
      date: '2 weeks ago',
      content: 'VIP customer - always offer complimentary beverages and priority booking.'
    }
  ]);

  // Mock communications data
  const communications = [
    {
      id: 1,
      type: 'email',
      time: 'Today, 10:30 AM',
      message: 'Appointment reminder sent for upcoming service on Dec 20, 2024'
    },
    {
      id: 2,
      type: 'sms',
      time: 'Yesterday, 2:00 PM',
      message: 'Thank you message sent after recent appointment'
    },
    {
      id: 3,
      type: 'email',
      time: '3 days ago',
      message: 'Promotional offer sent: 20% off next hair color service'
    }
  ];

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      router.push('/dashboard?page=customers');
    }
  }, [onBack, router]);

  const handleEdit = useCallback((section) => {
    console.log('Edit section:', section);
    // Implement edit functionality
  }, []);

  const handleAddNote = useCallback(() => {
    if (noteText.trim()) {
      const newNote = {
        id: notes.length + 1,
        author: 'John Doe', // Current user
        date: 'Just now',
        content: noteText
      };
      setNotes([newNote, ...notes]);
      setNoteText('');
    }
  }, [noteText, notes]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className={styles.detailsGrid}>
            {/* Personal Information */}
            <DetailsSection title="Personal Information" onEdit={() => handleEdit('personal')}>
              <DetailItem label="Full Name" value={customer.name} />
              <DetailItem label="Date of Birth" value={customer.dateOfBirth} />
              <DetailItem label="Gender" value={customer.gender} />
              <DetailItem label="Preferred Language" value={customer.preferredLanguage} />
            </DetailsSection>

            {/* Contact Information */}
            <DetailsSection title="Contact Information" onEdit={() => handleEdit('contact')}>
              <DetailItem label="Email" value={customer.email} />
              <DetailItem label="Phone" value={customer.phone} />
              <DetailItem label="Address" value={customer.address} />
              <DetailItem label="Emergency Contact" value={customer.emergencyContact} />
            </DetailsSection>

            {/* Preferences */}
            <DetailsSection title="Preferences" onEdit={() => handleEdit('preferences')}>
              <DetailItem label="Preferred Services" value={customer.preferredServices} />
              <DetailItem label="Preferred Staff" value={customer.preferredStaff} />
              <DetailItem label="Allergies/Sensitivities" value={customer.allergies} />
              <DetailItem label="Marketing Preferences" value={customer.marketingPreferences} />
            </DetailsSection>

            {/* Membership & Loyalty */}
            <DetailsSection title="Membership & Loyalty" onEdit={() => handleEdit('membership')}>
              <DetailItem label="Membership Type" value={customer.membershipType} />
              <DetailItem label="Member Since" value={customer.memberSince} />
              <DetailItem label="Loyalty Points" value={`${customer.loyaltyPoints} points`} />
              <DetailItem label="Referrals Made" value={`${customer.referralsMade} customers`} />
            </DetailsSection>
          </div>
        );

      case 'appointments':
        return (
          <div className={styles.appointmentsTable}>
            <div className={"card-section-header"}>
              <h3 className={"card-section-title"}>Appointment History</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Staff</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.date}</td>
                    <td className={styles.serviceName}>{appointment.service}</td>
                    <td>{appointment.staff}</td>
                    <td>{appointment.duration}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[`status${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1).replace(/-/g, '')}`]}`}>
                        {appointment.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>${appointment.amount}</td>
                    <td>
                      <button className={styles.btnSecondary} style={{ padding: '8px 16px', fontSize: '12px' }}>
                        Rebook
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'purchases':
        return (
          <div className={styles.purchasesSection}>
            <div className={"card-section-header"}>
              <h3 className={"card-section-title"}>Purchase History</h3>
            </div>
            <div className={styles.purchasesList}>
              {purchases.map(purchase => (
                <div key={purchase.id} className={styles.purchaseItem}>
                  <div className={styles.purchaseInfo}>
                    <div className={styles.purchaseIcon}>{purchase.icon}</div>
                    <div className={styles.purchaseDetails}>
                      <h4>{purchase.name}</h4>
                      <div className={styles.purchaseDate}>{purchase.date}</div>
                    </div>
                  </div>
                  <div className={styles.purchaseAmount}>${purchase.amount}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className={styles.notesSection}>
            <div className={"card-section-header"}>
              <h3 className={"card-section-title"}>Customer Notes</h3>
            </div>
            <div className={styles.notesList}>
              {notes.map(note => (
                <NoteItem key={note.id} note={note} />
              ))}
            </div>
            <div className={styles.addNoteForm}>
              <textarea
                className={styles.noteTextarea}
                placeholder="Add a note about this customer..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button className={styles.btnPrimary} onClick={handleAddNote}>
                <Plus className={`styles.w-4 styles.h-4`} /> Add Note
              </button>
            </div>
          </div>
        );

      case 'communications':
        return (
          <div className={styles.communicationsSection}>
            <div className={"card-section-header"}>
              <h3 className={"card-section-title"}>Communication History</h3>
              <button className={styles.btnPrimary}>
                <Send className={`styles.w-4 styles.h-4`} /> Send Message
              </button>
            </div>
            <div className={styles.commTimeline}>
              {communications.map(comm => (
                <CommunicationItem key={comm.id} comm={comm} />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.detailsContainer}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <nav className={styles.breadcrumb}>
          <a href="#" onClick={(e) => { e.preventDefault(); router.push('/dashboard'); }}>
            Dashboard
          </a>
          <span className={styles.breadcrumbSeparator}>›</span>
          <a href="#" onClick={(e) => { e.preventDefault(); handleBack(); }}>
            Customers
          </a>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>{customer.name}</span>
        </nav>
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeft className={`styles.w-4 styles.h-4`} /> Back
        </button>
      </div>

      {/* Customer Header */}
      <div className={styles.header}>
        <div className="layout-header-content">
          <div className={styles.profile}>
            <div className={styles.avatar}>
              {customer.initials}
              <div className={styles.statusIndicator}></div>
            </div>
            <div className={styles.info}>
              <h1 className={styles.name}>{customer.name}</h1>
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <Mail className={`styles.w-4 styles.h-4`} /> {customer.email}
                </span>
                <span className={styles.metaItem}>
                  <Phone className={`styles.w-4 styles.h-4`} /> {customer.phone}
                </span>
                <span className={styles.metaItem}>
                  <MapPin className={`styles.w-4 styles.h-4`} /> {customer.location}
                </span>
              </div>
              <div className={styles.tags}>
                {customer.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`customer-tag ${tag.includes('VIP') ? 'tag-vip' : tag.includes('Loyal') ? 'tag-loyal' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnPrimary}>
              <Calendar className={`styles.w-4 styles.h-4`} /> Book Appointment
            </button>
            <button className={styles.btnSecondary}>
              <MessageSquare className={`styles.w-4 styles.h-4`} /> Send Message
            </button>
            <button className={styles.btnSecondary}>
              <MoreVertical className={`styles.w-4 styles.h-4`} />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Stats */}
      <div className={styles.stats}>
        <StatCard 
          icon={<DollarSign className={`styles.w-6 styles.h-6`} />}
          label="Total Spent"
          value={`$${customer.totalSpent.toLocaleString()}`}
          trend="Last 12 months"
        />
        <StatCard 
          icon={<Calendar className={`styles.w-6 styles.h-6`} />}
          label="Total Appointments"
          value={customer.totalAppointments}
          trend={`${customer.appointmentsThisYear} this year`}
        />
        <StatCard 
          icon={<Star className={`styles.w-6 styles.h-6`} />}
          label="Average Rating"
          value={customer.averageRating}
          trend={`Based on ${customer.totalReviews} reviews`}
        />
        <StatCard 
          icon={<Cake className={`styles.w-6 styles.h-6`} />}
          label="Customer Since"
          value={customer.customerSince}
          trend={customer.customerDuration}
        />
      </div>

      {/* Content Tabs */}
      <div className={styles.contentTabs}>
        {['details', 'appointments', 'purchases', 'notes', 'communications'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`styles.tabContent ${styles.active}`}>
        {renderTabContent()}
      </div>
    </div>
  );
}

StatCard.displayName = 'StatCard';
DetailsSection.displayName = 'DetailsSection';
DetailItem.displayName = 'DetailItem';
NoteItem.displayName = 'NoteItem';
CommunicationItem.displayName = 'CommunicationItem';