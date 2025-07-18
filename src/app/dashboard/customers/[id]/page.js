"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";

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
      <div className="glass border border-white/20 rounded-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 flex-1">
            <div className="relative">
              <div className="w-24 h-24 bg-primary-gradient rounded-full flex items-center justify-center text-3xl font-bold text-white">
                {customer.initials}
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black"></div>
            </div>
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{customer.name}</h1>
              <div className="flex flex-col lg:flex-row items-center gap-5 mb-4 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  📧 {customer.email}
                </span>
                <span className="flex items-center gap-2">
                  📱 {customer.phone}
                </span>
                <span className="flex items-center gap-2">
                  📍 {customer.location}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span
                  className={`px-4 py-1 ${
                    getStatusBadge("vip").style
                  } rounded-full text-sm font-medium`}
                >
                  {getStatusBadge("vip").label}
                </span>
                <span className="px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  Loyal (3+ years)
                </span>
                <span className="px-4 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium">
                  Premium Member
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <button className="px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30">
              <span>📅</span> Book Appointment
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/15">
              <span>💬</span> Send Message
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center hover:bg-white/15">
              <span>⋮</span>
            </button>
          </div>
        </div>
      </div>

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
      <div className="flex gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1 w-fit mb-8">
        {[
          "details",
          "appointments",
          "purchases",
          "notes",
          "communications",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-indigo-500/20 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === "details" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="glass border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <span className="text-white/70 cursor-pointer hover:text-white transition-colors">
                ✏️
              </span>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">Full Name</div>
                  <div className="text-sm font-medium">{customer.name}</div>
                </div>
              </div>
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Date of Birth
                  </div>
                  <div className="text-sm font-medium">
                    {customer.birthDate}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">Gender</div>
                  <div className="text-sm font-medium">{customer.gender}</div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Preferred Language
                  </div>
                  <div className="text-sm font-medium">
                    {customer.preferredLanguage}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="glass border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <span className="text-white/70 cursor-pointer hover:text-white transition-colors">
                ✏️
              </span>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">Email</div>
                  <div className="text-sm font-medium">{customer.email}</div>
                </div>
              </div>
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">Phone</div>
                  <div className="text-sm font-medium">{customer.phone}</div>
                </div>
              </div>
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">Address</div>
                  <div className="text-sm font-medium whitespace-pre-line">
                    {customer.address}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Emergency Contact
                  </div>
                  <div className="text-sm font-medium whitespace-pre-line">
                    {customer.emergencyContact}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <span className="text-white/70 cursor-pointer hover:text-white transition-colors">
                ✏️
              </span>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Preferred Services
                  </div>
                  <div className="text-sm font-medium">
                    {customer.preferredServices.join(", ")}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Preferred Staff
                  </div>
                  <div className="text-sm font-medium">
                    {customer.preferredStaff.join(", ")}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Allergies/Sensitivities
                  </div>
                  <div className="text-sm font-medium">
                    {customer.allergies}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Marketing Preferences
                  </div>
                  <div className="text-sm font-medium">
                    Email: {customer.marketingPreferences.email ? "✓" : "✗"}{" "}
                    SMS: {customer.marketingPreferences.sms ? "✓" : "✗"} Push:{" "}
                    {customer.marketingPreferences.push ? "✓" : "✗"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Membership & Loyalty */}
          <div className="glass border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Membership & Loyalty</h3>
              <span className="text-white/70 cursor-pointer hover:text-white transition-colors">
                ✏️
              </span>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Membership Type
                  </div>
                  <div className="text-sm font-medium">
                    {customer.membershipType}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">Member Since</div>
                  <div className="text-sm font-medium">
                    {customer.memberSince}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start pb-5 border-b border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Loyalty Points
                  </div>
                  <div className="text-sm font-medium">
                    {customer.loyaltyPoints.toLocaleString()} points
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-white/70 mb-1">
                    Referrals Made
                  </div>
                  <div className="text-sm font-medium">
                    {customer.referrals} customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "appointments" && (
        <div className="glass border border-white/20 rounded-2xl p-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Appointment History</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
                  Service
                </th>
                <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
                  Staff
                </th>
                <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
                  Duration
                </th>
                <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left py-4 text-xs font-semibold text-white/70 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-5 text-sm">{appointment.date}</td>
                  <td className="py-5 text-sm font-medium">
                    {appointment.service}
                  </td>
                  <td className="py-5 text-sm">{appointment.staff}</td>
                  <td className="py-5 text-sm">{appointment.duration}</td>
                  <td className="py-5">
                    <span
                      className={`px-3 py-1 ${getAppointmentStatusBadge(
                        appointment.status
                      )} rounded-full text-xs font-semibold`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1).replace("-", " ")}
                    </span>
                  </td>
                  <td className="py-5 text-sm">${appointment.amount}</td>
                  <td className="py-5">
                    <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-xs font-semibold hover:bg-white/15 transition-colors">
                      {appointment.status === "completed" ? "Rebook" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "purchases" && (
        <div className="glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Purchase History</h3>
          </div>
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-white/5 rounded-2xl p-5 flex justify-between items-center hover:bg-white/8 hover:translate-x-1 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl">
                    {purchase.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-medium">{purchase.name}</h4>
                    <span className="text-sm text-white/70">
                      {purchase.date}
                    </span>
                  </div>
                </div>
                <div className="text-xl font-bold gradient-text">
                  ${purchase.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "notes" && (
        <div className="glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Customer Notes</h3>
          </div>
          <div
            className="space-y-4 max-h-96 overflow-y-auto pr-3"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.2) rgba(255,255,255,0.05)",
            }}
          >
            {notes.map((note) => (
              <div key={note.id} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">{note.author}</span>
                  <span className="text-xs text-white/70">{note.date}</span>
                </div>
                <div className="text-sm text-white/80 leading-relaxed">
                  {note.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-white/10">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white text-sm resize-y min-h-20 mb-4 focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-colors"
              placeholder="Add a note about this customer..."
            />
            <button
              onClick={addNote}
              className="px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              Add Note
            </button>
          </div>
        </div>
      )}

      {activeTab === "communications" && (
        <div className="glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Communication History</h3>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-white/10"></div>
            {communications.map((comm, index) => (
              <div key={index} className="relative mb-8 last:mb-0">
                <div className="absolute -left-6 top-1 w-3 h-3 bg-primary-gradient rounded-full border-2 border-black"></div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span>{getCommunicationIcon(comm.type)}</span>{" "}
                      {comm.action}
                    </span>
                    <span className="text-xs text-white/70">{comm.date}</span>
                  </div>
                  <div className="text-sm text-white/80 leading-relaxed">
                    {comm.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
