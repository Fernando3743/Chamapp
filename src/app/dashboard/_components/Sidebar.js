"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/app/contexts/SupabaseAuthContext";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { dashboardTranslations } from "@/lib/translations/pages/dashboard";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useSupabaseAuth();
  const { language } = useLanguage();
  const t = (key) =>
    dashboardTranslations[key]?.[language] ||
    dashboardTranslations[key]?.en ||
    key;

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userName = user?.user_metadata?.firstName || user?.user_metadata?.first_name || "User";
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const menuSections = [
    {
      title: "Main",
      items: [
        { icon: "🏠", label: t("dashboard"), href: "/dashboard" },
        { icon: "📊", label: t("analytics"), href: "/dashboard/analytics" },
        { icon: "📋", label: "Orders", href: "/dashboard/orders", badge: "12" },
        { icon: "👥", label: t("customers"), href: "/dashboard/customers" },
      ],
    },
    {
      title: "Business",
      items: [
        { icon: "🏢", label: "Properties", href: "/dashboard/properties" },
        { icon: "📅", label: t("appointments"), href: "/dashboard/appointments" },
        { icon: "💰", label: "Finance", href: "/dashboard/finance" },
        { icon: "📱", label: t("marketing"), href: "/dashboard/marketing" },
      ],
    },
    {
      title: t("settings"),
      items: [
        { icon: "⚙️", label: t("settings"), href: "/dashboard/settings" },
        { icon: "🔔", label: t("notifications"), href: "/dashboard/notifications", badge: "3" },
      ],
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar w-[280px] h-screen glass backdrop-blur-20 border-r border-white/20 p-8 pt-7 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 pb-7 border-b border-white/10">
          <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center text-xl font-bold">
            B
          </div>
          <div className="text-xl font-bold">BusinessHub</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <div className="text-xs uppercase text-white/50 mb-4 tracking-wider">
                {section.title}
              </div>
              {section.items.map((item, itemIndex) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={`nav-item flex items-center gap-4 p-3 mb-1 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5 hover:text-white nav-item-hover relative ${
                      isActive
                        ? "bg-primary-gradient text-white nav-item-active"
                        : "text-white/80"
                    }`}
                    onClick={() => onClose && onClose()}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-7 border-t border-white/10">
          <div
            className="profile-info flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5 relative"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center font-semibold">
              {userInitials}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold mb-0.5">{userName}</div>
              <div className="text-xs text-white/60">{t("businessOwner")}</div>
            </div>
            <div className="w-5 h-5 flex items-center justify-center text-white/60 transition-transform duration-300">
              {showProfileMenu ? "▲" : "▼"}
            </div>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute bottom-20 left-8 right-8 bg-black/90 backdrop-blur-20 border border-white/20 rounded-xl overflow-hidden">
              <Link
                href="/dashboard/profile"
                className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                onClick={() => {
                  setShowProfileMenu(false);
                  onClose && onClose();
                }}
              >
                <span className="mr-2">👤</span> {t("profile")}
              </Link>
              <Link
                href="/dashboard/settings"
                className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                onClick={() => {
                  setShowProfileMenu(false);
                  onClose && onClose();
                }}
              >
                <span className="mr-2">⚙️</span> {t("settings")}
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 border-t border-white/10"
              >
                <span className="mr-2">🚪</span> {t("signOut")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <style jsx>{`
        .nav-item-hover:hover {
          transform: translateX(5px);
        }

        .nav-item-active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 70%;
          background: white;
          border-radius: 2px;
        }

        /* Hide scrollbar while maintaining scroll functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </>
  );
}