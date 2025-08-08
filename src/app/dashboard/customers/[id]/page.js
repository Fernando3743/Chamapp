"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";
import CustomerHeader from "@/app/components/dashboard/customer-details/CustomerHeader";
import TabNavigation from "@/app/components/dashboard/customer-details/TabNavigation";
import CustomerInfo from "@/app/components/dashboard/customer-details/CustomerInfo";
import AppointmentHistory from "@/app/components/dashboard/customer-details/AppointmentHistory";
import PurchaseHistory from "@/app/components/dashboard/customer-details/PurchaseHistory";
import NotesSection from "@/app/components/dashboard/customer-details/NotesSection";
import CommunicationTimeline from "@/app/components/dashboard/customer-details/CommunicationTimeline";

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("details");
  const [noteText, setNoteText] = useState("");

  // Mock customer data - in real app, fetch based on params.id
  const customer = {
    id: params.id,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    status: "vip",
    memberSince: "2021",
    totalSpent: 3847,
    totalAppointments: 48,
    appointmentsThisYear: 12,
    averageRating: 4.9,
    ratingsCount: 15,
    initials: "SM",
    loyaltyPoints: 2450,
    referrals: 5,
    birthDate: "March 15, 1985",
    gender: "Female",
    preferredLanguage: "English",
    address: "123 Main Street\nNew York, NY 10001",
    emergencyContact: "John Mitchell (Husband)\n+1 (555) 123-4568",
    preferredServices: ["Hair Cut", "Hair Color", "Manicure"],
    preferredStaff: ["Emily Johnson", "Maria Garcia"],
    allergies: "Sensitive to strong fragrances",
    marketingPreferences: { email: true, sms: false, push: true },
    membershipType: "Premium Member",
    memberSince: "August 15, 2021",
  };

  // Stats data
  const stats = [
    {
      icon: "💰",
      label: "Total Spent",
      value: `$${customer.totalSpent.toLocaleString()}`,
      subtext: "Last 12 months",
    },
    {
      icon: "📅",
      label: "Total Appointments",
      value: customer.totalAppointments,
      subtext: `${customer.appointmentsThisYear} this year`,
    },
    {
      icon: "⭐",
      label: "Average Rating",
      value: customer.averageRating,
      subtext: `Based on ${customer.ratingsCount} reviews`,
    },
    {
      icon: "🎂",
      label: "Customer Since",
      value: customer.memberSince,
      subtext: "3 years 4 months",
    },
  ];

  // Mock appointments data
  const appointments = [
    {
      date: "Dec 5, 2024",
      service: "Premium Hair Cut & Color",
      staff: "Emily Johnson",
      duration: "2h 30m",
      status: "completed",
      amount: 125,
    },
    {
      date: "Nov 20, 2024",
      service: "Gel Manicure",
      staff: "Maria Garcia",
      duration: "45m",
      status: "completed",
      amount: 35,
    },
    {
      date: "Nov 10, 2024",
      service: "Hair Cut",
      staff: "Emily Johnson",
      duration: "30m",
      status: "cancelled",
      amount: 0,
    },
    {
      date: "Oct 15, 2024",
      service: "Deep Tissue Massage",
      staff: "Robert Chen",
      duration: "1h",
      status: "completed",
      amount: 80,
    },
    {
      date: "Sep 28, 2024",
      service: "Hair Cut & Style",
      staff: "Emily Johnson",
      duration: "1h",
      status: "no-show",
      amount: 0,
    },
  ];

  // Mock purchases data
  const purchases = [
    {
      id: 1,
      name: "Organic Hair Care Set",
      date: "December 5, 2024",
      amount: 89,
      icon: "🧴",
    },
    {
      id: 2,
      name: "Premium Nail Polish Collection",
      date: "November 20, 2024",
      amount: 45,
      icon: "💅",
    },
    {
      id: 3,
      name: "Gift Card - $100",
      date: "October 1, 2024",
      amount: 100,
      icon: "🎁",
    },
    {
      id: 4,
      name: "Lipstick Set - Ruby Collection",
      date: "September 15, 2024",
      amount: 38,
      icon: "💄",
    },
  ];

  // Mock notes data
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: "Emily Johnson",
      date: "Dec 5, 2024",
      content:
        "Client loved the new hair color! She mentioned wanting to go slightly lighter next time. Recommended purple shampoo for maintenance.",
    },
    {
      id: 2,
      author: "Maria Garcia",
      date: "Nov 20, 2024",
      content:
        "Prefers gel polish in nude/pink tones. Has sensitive cuticles - use gentle technique. Interested in nail art for special occasions.",
    },
    {
      id: 3,
      author: "System",
      date: "Oct 1, 2024",
      content: "Customer purchased a $100 gift card for her sister's birthday.",
    },
    {
      id: 4,
      author: "Robert Chen",
      date: "Sep 15, 2024",
      content:
        "Has lower back tension. Focused on deep tissue work in that area. Recommended monthly sessions for maintenance.",
    },
  ]);

  // Mock communications data
  const communications = [
    {
      type: "email",
      action: "Email Sent",
      date: "Dec 6, 2024 - 10:30 AM",
      content:
        "Thank you email sent for recent visit. Included care instructions for new hair color.",
    },
    {
      type: "sms",
      action: "SMS Reminder",
      date: "Dec 4, 2024 - 2:00 PM",
      content:
        "Appointment reminder sent for Dec 5 at 2:00 PM with Emily Johnson.",
    },
    {
      type: "phone",
      action: "Phone Call",
      date: "Nov 10, 2024 - 11:15 AM",
      content:
        "Customer called to reschedule appointment. Moved from Nov 10 to Nov 20.",
    },
    {
      type: "email",
      action: "Marketing Email",
      date: "Oct 15, 2024 - 9:00 AM",
      content:
        "Monthly newsletter sent with seasonal promotions. Customer clicked on massage therapy offer.",
    },
    {
      type: "message",
      action: "In-App Message",
      date: "Sep 1, 2024 - 3:30 PM",
      content:
        "Birthday greeting sent with special 20% discount code. Code was redeemed on Sep 15.",
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      vip: "bg-purple-500/20 text-purple-400",
      active: "bg-green-500/20 text-green-400",
      loyal: "bg-indigo-500/20 text-indigo-400",
    };
    const labels = {
      vip: "VIP Customer",
      active: "Active",
      loyal: "Loyal (3+ years)",
    };
    return {
      style: styles[status] || styles.active,
      label: labels[status] || status,
    };
  };

  const getAppointmentStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-500/20 text-green-400",
      cancelled: "bg-red-500/20 text-red-400",
      "no-show": "bg-yellow-500/20 text-yellow-400",
    };
    return styles[status] || styles.completed;
  };

  const getCommunicationIcon = (type) => {
    const icons = {
      email: "📧",
      sms: "📱",
      phone: "📞",
      message: "💬",
    };
    return icons[type] || "📧";
  };

  const addNote = () => {
    if (noteText.trim()) {
      const newNote = {
        id: notes.length + 1,
        author: "John Doe", // Current user
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        content: noteText,
      };
      setNotes([newNote, ...notes]);
      setNoteText("");
    }
  };

  return (
    <main className="p-8">
      {/* Breadcrumb */}
      <div className="glass border border-white/20 rounded-2xl p-6 mb-8 flex justify-between items-center gap-5">
        <nav className="flex items-center gap-3 text-sm">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-white/70 hover:text-white transition-colors"
          >
            Dashboard
          </button>
          <span className="text-white/50">›</span>
          <button
            onClick={() => router.push("/dashboard/customers")}
            className="text-white/70 hover:text-white transition-colors"
          >
            Customers
          </button>
          <span className="text-white/50">›</span>
          <span className="text-white font-medium">{customer.name}</span>
        </nav>
      </div>

      {/* Customer Header */}
      <CustomerHeader customer={customer} getStatusBadge={getStatusBadge} />

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
            </div>
            <div className="text-sm text-white/70 mb-2">{stat.label}</div>
            <div className="text-3xl font-bold mb-3">{stat.value}</div>
            <div className="text-sm text-white/70">{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Content Tabs */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Contents */}
      {activeTab === "details" && (
        <CustomerInfo customer={customer} />
      )}

      {activeTab === "appointments" && (
        <AppointmentHistory
          appointments={appointments}
          getAppointmentStatusBadge={getAppointmentStatusBadge}
        />
      )}

      {activeTab === "purchases" && (
        <PurchaseHistory purchases={purchases} />
      )}

      {activeTab === "notes" && (
        <NotesSection
          notes={notes}
          setNotes={setNotes}
          noteText={noteText}
          setNoteText={setNoteText}
          addNote={addNote}
        />
      )}

      {activeTab === "communications" && (
        <CommunicationTimeline
          communications={communications}
          getCommunicationIcon={getCommunicationIcon}
        />
      )}
    </main>
  );
}
