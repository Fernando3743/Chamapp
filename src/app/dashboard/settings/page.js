"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";

export default function SettingsPage() {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  const [activeSection, setActiveSection] = useState("general");

  const showSettings = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-[600px] h-[600px] bg-primary-gradient rounded-full blur-[100px] opacity-50 -top-[300px] -right-[200px] animate-float"></div>
        <div className="absolute w-[400px] h-[400px] bg-sphere-2 rounded-full blur-[100px] opacity-50 -bottom-[200px] -left-[100px] animate-float-delayed"></div>
        <div className="absolute w-[300px] h-[300px] bg-sphere-3 rounded-full blur-[100px] opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-delayed-10"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8 relative z-10">
        {/* Settings Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">{t("settings")}</h1>
          <p className="text-text-secondary">{t("settingsDescription")}</p>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Settings Navigation */}
          <nav className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-5 h-fit sticky top-5 lg:block flex overflow-x-auto">
            <a 
              href="#" 
              className={`nav-item ${activeSection === 'general' ? 'active' : ''} flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-300 whitespace-nowrap lg:whitespace-normal`}
              onClick={(e) => { e.preventDefault(); showSettings('general'); }}
            >
              <span className="text-lg w-5 text-center">⚙️</span>
              <span className="text-sm font-medium">{t("general")}</span>
            </a>
            <a 
              href="#" 
              className={`nav-item ${activeSection === 'business' ? 'active' : ''} flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-300 whitespace-nowrap lg:whitespace-normal`}
              onClick={(e) => { e.preventDefault(); showSettings('business'); }}
            >
              <span className="text-lg w-5 text-center">🏢</span>
              <span className="text-sm font-medium">{t("businessProfile")}</span>
            </a>
            <a 
              href="#" 
              className={`nav-item ${activeSection === 'team' ? 'active' : ''} flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-300 whitespace-nowrap lg:whitespace-normal`}
              onClick={(e) => { e.preventDefault(); showSettings('team'); }}
            >
              <span className="text-lg w-5 text-center">👥</span>
              <span className="text-sm font-medium">{t("teamStaff")}</span>
            </a>
            <a 
              href="#" 
              className={`nav-item ${activeSection === 'notifications' ? 'active' : ''} flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-300 whitespace-nowrap lg:whitespace-normal`}
              onClick={(e) => { e.preventDefault(); showSettings('notifications'); }}
            >
              <span className="text-lg w-5 text-center">🔔</span>
              <span className="text-sm font-medium">{t("notifications")}</span>
            </a>
            <a 
              href="#" 
              className={`nav-item ${activeSection === 'billing' ? 'active' : ''} flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-300 whitespace-nowrap lg:whitespace-normal`}
              onClick={(e) => { e.preventDefault(); showSettings('billing'); }}
            >
              <span className="text-lg w-5 text-center">💳</span>
              <span className="text-sm font-medium">{t("billingPlans")}</span>
            </a>
            <a 
              href="#" 
              className={`nav-item ${activeSection === 'integrations' ? 'active' : ''} flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-300 whitespace-nowrap lg:whitespace-normal`}
              onClick={(e) => { e.preventDefault(); showSettings('integrations'); }}
            >
              <span className="text-lg w-5 text-center">🔗</span>
              <span className="text-sm font-medium">{t("integrations")}</span>
            </a>
            <a 
              href="#" 
              className={`nav-item ${activeSection === 'security' ? 'active' : ''} flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-300 whitespace-nowrap lg:whitespace-normal`}
              onClick={(e) => { e.preventDefault(); showSettings('security'); }}
            >
              <span className="text-lg w-5 text-center">🔒</span>
              <span className="text-sm font-medium">{t("security")}</span>
            </a>
          </nav>

          {/* Settings Content */}
          <div className="settings-wrapper">
            {/* General Settings */}
            <div className={`settings-content ${activeSection === 'general' ? 'block' : 'hidden'}`} id="general-settings">
              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("accountInformation")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("accountInformationDesc")}</p>
                  </div>
                </div>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-3">{t("firstName")}</label>
                      <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="John" />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium mb-3">{t("lastName")}</label>
                      <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="form-group mb-6">
                    <label className="block text-sm font-medium mb-3">{t("emailAddress")}</label>
                    <input type="email" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="john.doe@businesshub.com" />
                    <p className="text-xs text-text-secondary mt-2">{t("emailNote")}</p>
                  </div>
                  <div className="form-group mb-6">
                    <label className="block text-sm font-medium mb-3">{t("phoneNumber")}</label>
                    <input type="tel" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                      {t("saveChanges")}
                    </button>
                    <button type="button" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      {t("cancel")}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("preferences")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("preferencesDesc")}</p>
                  </div>
                </div>
                <div className="form-group mb-6">
                  <label className="block text-sm font-medium mb-3">{t("language")}</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50">
                    <option>{t("englishUS")}</option>
                    <option>{t("spanish")}</option>
                    <option>{t("french")}</option>
                    <option>{t("german")}</option>
                  </select>
                </div>
                <div className="form-group mb-6">
                  <label className="block text-sm font-medium mb-3">{t("timezone")}</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50">
                    <option>{t("easternTime")}</option>
                    <option>{t("centralTime")}</option>
                    <option>{t("mountainTime")}</option>
                    <option>{t("pacificTime")}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium mb-3">{t("dateFormat")}</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Business Profile Settings */}
            <div className={`settings-content ${activeSection === 'business' ? 'block' : 'hidden'}`} id="business-settings">
              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("businessInformation")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("businessInformationDesc")}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                  <div className="w-30 h-30 rounded-full bg-primary-gradient flex items-center justify-center text-5xl font-bold text-white">BH</div>
                  <div className="flex-1 text-center md:text-left">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15 mb-3 upload-btn">
                      {t("uploadLogo")}
                    </button>
                    <p className="text-xs text-text-secondary">{t("logoRecommendation")}</p>
                  </div>
                </div>
                <div className="form-group mb-6">
                  <label className="block text-sm font-medium mb-3">{t("businessName")}</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="Elite Beauty Salon" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label className="block text-sm font-medium mb-3">{t("businessType")}</label>
                    <select className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50">
                      <option>{t("beautySalon")}</option>
                      <option>{t("spaWellness")}</option>
                      <option>{t("fitnessCenter")}</option>
                      <option>{t("medicalPractice")}</option>
                      <option>{t("other")}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium mb-3">{t("businessPhone")}</label>
                    <input type="tel" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="+1 (555) 987-6543" />
                  </div>
                </div>
                <div className="form-group mb-6">
                  <label className="block text-sm font-medium mb-3">{t("businessAddress")}</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="123 Main Street, Suite 100" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label className="block text-sm font-medium mb-3">{t("city")}</label>
                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="New York" />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium mb-3">{t("state")}</label>
                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="NY" />
                  </div>
                </div>
                <div className="form-group mb-6">
                  <label className="block text-sm font-medium mb-3">{t("businessDescription")}</label>
                  <textarea className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50 resize-y min-h-[100px]" rows="4" defaultValue="Elite Beauty Salon offers premium hair care, nail services, and spa treatments in a luxurious setting. Our experienced team is dedicated to making you look and feel your best."></textarea>
                </div>
                <div className="flex gap-4">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                    {t("saveChanges")}
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                    {t("cancel")}
                  </button>
                </div>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("businessHours")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("businessHoursDesc")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("monday")}</div>
                      <div className="text-xs text-text-secondary">9:00 AM - 6:00 PM</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("tuesday")}</div>
                      <div className="text-xs text-text-secondary">9:00 AM - 6:00 PM</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("wednesday")}</div>
                      <div className="text-xs text-text-secondary">9:00 AM - 6:00 PM</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("thursday")}</div>
                      <div className="text-xs text-text-secondary">9:00 AM - 8:00 PM</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("friday")}</div>
                      <div className="text-xs text-text-secondary">9:00 AM - 8:00 PM</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("saturday")}</div>
                      <div className="text-xs text-text-secondary">10:00 AM - 5:00 PM</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("sunday")}</div>
                      <div className="text-xs text-text-secondary">{t("closed")}</div>
                    </div>
                    <div className="toggle-switch relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team & Staff Settings */}
            <div className={`settings-content ${activeSection === 'team' ? 'block' : 'hidden'}`} id="team-settings">
              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{t("teamMembers")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("teamMembersDesc")}</p>
                  </div>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                    <span>+</span> {t("addTeamMember")}
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-300 hover:bg-white/8 gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center font-semibold text-white">EJ</div>
                      <div className="text-center md:text-left">
                        <h4 className="text-base font-medium">Emily Johnson</h4>
                        <p className="text-xs text-text-secondary">{t("seniorStylist")} • {t("fullAccess")}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">{t("edit")}</button>
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">{t("remove")}</button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-300 hover:bg-white/8 gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center font-semibold text-white">MG</div>
                      <div className="text-center md:text-left">
                        <h4 className="text-base font-medium">Maria Garcia</h4>
                        <p className="text-xs text-text-secondary">{t("nailTechnician")} • {t("limitedAccess")}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">{t("edit")}</button>
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">{t("remove")}</button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-300 hover:bg-white/8 gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center font-semibold text-white">RC</div>
                      <div className="text-center md:text-left">
                        <h4 className="text-base font-medium">Robert Chen</h4>
                        <p className="text-xs text-text-secondary">{t("massageTherapist")} • {t("limitedAccess")}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">{t("edit")}</button>
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">{t("remove")}</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("permissionSettings")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("permissionSettingsDesc")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("viewAppointments")}</div>
                      <div className="text-xs text-text-secondary">{t("viewAppointmentsDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("manageAppointments")}</div>
                      <div className="text-xs text-text-secondary">{t("manageAppointmentsDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("accessCustomerData")}</div>
                      <div className="text-xs text-text-secondary">{t("accessCustomerDataDesc")}</div>
                    </div>
                    <div className="toggle-switch relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-0.5"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("processPayments")}</div>
                      <div className="text-xs text-text-secondary">{t("processPaymentsDesc")}</div>
                    </div>
                    <div className="toggle-switch relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-0.5"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("viewReports")}</div>
                      <div className="text-xs text-text-secondary">{t("viewReportsDesc")}</div>
                    </div>
                    <div className="toggle-switch relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className={`settings-content ${activeSection === 'notifications' ? 'block' : 'hidden'}`} id="notifications-settings">
              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("emailNotifications")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("emailNotificationsDesc")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("newAppointments")}</div>
                      <div className="text-xs text-text-secondary">{t("newAppointmentsDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("cancellations")}</div>
                      <div className="text-xs text-text-secondary">{t("cancellationsDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("newCustomers")}</div>
                      <div className="text-xs text-text-secondary">{t("newCustomersDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("reviews")}</div>
                      <div className="text-xs text-text-secondary">{t("reviewsDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("marketingUpdates")}</div>
                      <div className="text-xs text-text-secondary">{t("marketingUpdatesDesc")}</div>
                    </div>
                    <div className="toggle-switch relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("pushNotifications")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("pushNotificationsDesc")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("desktopNotifications")}</div>
                      <div className="text-xs text-text-secondary">{t("desktopNotificationsDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("mobilePush")}</div>
                      <div className="text-xs text-text-secondary">{t("mobilePushDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("soundAlerts")}</div>
                      <div className="text-xs text-text-secondary">{t("soundAlertsDesc")}</div>
                    </div>
                    <div className="toggle-switch relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("smsNotifications")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("smsNotificationsDesc")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("appointmentReminders")}</div>
                      <div className="text-xs text-text-secondary">{t("appointmentRemindersDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-white/10 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("noShowAlerts")}</div>
                      <div className="text-xs text-text-secondary">{t("noShowAlertsDesc")}</div>
                    </div>
                    <div className="toggle-switch active relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300 bg-primary-gradient">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("paymentConfirmations")}</div>
                      <div className="text-xs text-text-secondary">{t("paymentConfirmationsDesc")}</div>
                    </div>
                    <div className="toggle-switch relative w-12 h-6 bg-white/20 rounded-full cursor-pointer transition-all duration-300">
                      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing & Plans Settings */}
            <div className={`settings-content ${activeSection === 'billing' ? 'block' : 'hidden'}`} id="billing-settings">
              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("currentPlan")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("currentPlanDesc")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]">
                    <div className="text-xl font-semibold mb-3">{t("starter")}</div>
                    <div className="text-4xl font-bold mb-1 gradient-text">$29</div>
                    <div className="text-sm text-text-secondary mb-5">{t("perMonth")}</div>
                    <ul className="space-y-3 mb-6">
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("upToAppointments")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("staffMember")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("basicReports")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("emailSupport")}
                      </li>
                    </ul>
                    <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      {t("selectPlan")}
                    </button>
                  </div>
                  <div className="bg-white/5 border border-blue-400/50 rounded-xl p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] relative bg-blue-400/10">
                    <span className="absolute top-4 right-4 px-3 py-1 bg-primary-gradient rounded-full text-xs font-semibold text-white">{t("currentPlan")}</span>
                    <div className="text-xl font-semibold mb-3">{t("professional")}</div>
                    <div className="text-4xl font-bold mb-1 gradient-text">$79</div>
                    <div className="text-sm text-text-secondary mb-5">{t("perMonth")}</div>
                    <ul className="space-y-3 mb-6">
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("unlimitedAppointments")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("upToStaff")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("advancedReports")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("prioritySupport")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("smsReminders")}
                      </li>
                    </ul>
                    <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                      {t("currentPlan")}
                    </button>
                  </div>
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]">
                    <div className="text-xl font-semibold mb-3">{t("enterprise")}</div>
                    <div className="text-4xl font-bold mb-1 gradient-text">$199</div>
                    <div className="text-sm text-text-secondary mb-5">{t("perMonth")}</div>
                    <ul className="space-y-3 mb-6">
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("everythingInProfessional")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("unlimitedStaff")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("customIntegrations")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("dedicatedSupport")}
                      </li>
                      <li className="text-sm flex items-center gap-3">
                        <span className="text-green-400">✓</span> {t("multipleLocations")}
                      </li>
                    </ul>
                    <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      {t("upgrade")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("paymentMethod")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("paymentMethodDesc")}</p>
                  </div>
                </div>
                <div className="form-group mb-6">
                  <label className="block text-sm font-medium mb-3">{t("cardNumber")}</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="•••• •••• •••• 4242" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label className="block text-sm font-medium mb-3">{t("expiryDate")}</label>
                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="12/25" />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium mb-3">CVV</label>
                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" defaultValue="•••" />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                    {t("updatePaymentMethod")}
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                    {t("addNewCard")}
                  </button>
                </div>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("billingHistory")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("billingHistoryDesc")}</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4">{t("date")}</th>
                        <th className="text-left py-4">{t("description")}</th>
                        <th className="text-left py-4">{t("amount")}</th>
                        <th className="text-left py-4">{t("status")}</th>
                        <th className="text-left py-4">{t("invoice")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-5">Dec 1, 2024</td>
                        <td className="py-5">Professional Plan - Monthly</td>
                        <td className="py-5">$79.00</td>
                        <td className="py-5"><span className="text-green-400">{t("paid")}</span></td>
                        <td className="py-5"><a href="#" className="text-blue-400 hover:text-blue-300">{t("download")}</a></td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-5">Nov 1, 2024</td>
                        <td className="py-5">Professional Plan - Monthly</td>
                        <td className="py-5">$79.00</td>
                        <td className="py-5"><span className="text-green-400">{t("paid")}</span></td>
                        <td className="py-5"><a href="#" className="text-blue-400 hover:text-blue-300">{t("download")}</a></td>
                      </tr>
                      <tr>
                        <td className="py-5">Oct 1, 2024</td>
                        <td className="py-5">Professional Plan - Monthly</td>
                        <td className="py-5">$79.00</td>
                        <td className="py-5"><span className="text-green-400">{t("paid")}</span></td>
                        <td className="py-5"><a href="#" className="text-blue-400 hover:text-blue-300">{t("download")}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Integrations Settings */}
            <div className={`settings-content ${activeSection === 'integrations' ? 'block' : 'hidden'}`} id="integrations-settings">
              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("connectedIntegrations")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("connectedIntegrationsDesc")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">📅</div>
                    <h3 className="text-base font-semibold mb-2">Google Calendar</h3>
                    <p className="text-xs text-green-400 mb-4">{t("connected")}</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      {t("disconnect")}
                    </button>
                  </div>
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">💳</div>
                    <h3 className="text-base font-semibold mb-2">Stripe</h3>
                    <p className="text-xs text-green-400 mb-4">{t("connected")}</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      {t("settings")}
                    </button>
                  </div>
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">📧</div>
                    <h3 className="text-base font-semibold mb-2">Mailchimp</h3>
                    <p className="text-xs text-text-secondary mb-4">{t("notConnected")}</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                      {t("connect")}
                    </button>
                  </div>
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">📱</div>
                    <h3 className="text-base font-semibold mb-2">Twilio SMS</h3>
                    <p className="text-xs text-text-secondary mb-4">{t("notConnected")}</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                      {t("connect")}
                    </button>
                  </div>
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">📹</div>
                    <h3 className="text-base font-semibold mb-2">Zoom</h3>
                    <p className="text-xs text-text-secondary mb-4">{t("notConnected")}</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                      {t("connect")}
                    </button>
                  </div>
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">💼</div>
                    <h3 className="text-base font-semibold mb-2">QuickBooks</h3>
                    <p className="text-xs text-text-secondary mb-4">{t("notConnected")}</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                      {t("connect")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("availableIntegrations")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("availableIntegrationsDesc")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">📊</div>
                    <h3 className="text-base font-semibold mb-2">Google Analytics</h3>
                    <p className="text-xs text-text-secondary mb-4">Track website traffic</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      Learn More
                    </button>
                  </div>
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">📞</div>
                    <h3 className="text-base font-semibold mb-2">WhatsApp Business</h3>
                    <p className="text-xs text-text-secondary mb-4">Customer messaging</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      Learn More
                    </button>
                  </div>
                  <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
                    <div className="text-5xl mb-4">📸</div>
                    <h3 className="text-base font-semibold mb-2">Instagram</h3>
                    <p className="text-xs text-text-secondary mb-4">Social media sync</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className={`settings-content ${activeSection === 'security' ? 'block' : 'hidden'}`} id="security-settings">
              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("passwordSecurity")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("passwordSecurityDesc")}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">{t("changePassword")}</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">{t("currentPassword")}</label>
                      <input type="password" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">{t("newPassword")}</label>
                      <input type="password" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">{t("confirmNewPassword")}</label>
                      <input type="password" className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50" />
                    </div>
                  </div>
                  <button className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary-gradient border-0 rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]">
                    {t("updatePassword")}
                  </button>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1">{t("twoFactorAuth")}</h3>
                      <p className="text-sm text-text-secondary">{t("twoFactorAuthDesc")}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                      {t("enable2FA")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("loginHistory")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("loginHistoryDesc")}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="p-6 bg-white/5 rounded-xl transition-all duration-300 hover:bg-white/8 border border-blue-400/30">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          Chrome on MacBook Pro
                          <span className="ml-2 px-2 py-0.5 bg-blue-400/20 text-blue-400 text-xs rounded">
                            Current
                          </span>
                        </div>
                        <div className="text-xs text-text-secondary mt-1">
                          New York, US • 2 hours ago
                        </div>
                        <div className="text-xs text-text-secondary">
                          {t("ipAddress")}: 192.168.1.100
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl transition-all duration-300 hover:bg-white/8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-medium">Safari on iPhone</div>
                        <div className="text-xs text-text-secondary mt-1">
                          New York, US • 1 day ago
                        </div>
                        <div className="text-xs text-text-secondary">
                          {t("ipAddress")}: 192.168.1.105
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-lg text-white font-medium text-xs transition-all duration-300 hover:bg-white/15">
                        {t("endSession")}
                      </button>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl transition-all duration-300 hover:bg-white/8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-medium">Chrome on Windows</div>
                        <div className="text-xs text-text-secondary mt-1">
                          Brooklyn, US • 3 days ago
                        </div>
                        <div className="text-xs text-text-secondary">
                          {t("ipAddress")}: 192.168.1.120
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-lg text-white font-medium text-xs transition-all duration-300 hover:bg-white/15">
                        {t("endSession")}
                      </button>
                    </div>
                  </div>
                </div>
                <button className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-[rgba(255,255,255,0.2)] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 text-sm hover:bg-white/15">
                  {t("endAllSessions")}
                </button>
              </div>

              <div className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{t("sessions")}</h2>
                    <p className="text-sm text-text-secondary mt-1">{t("sessionsDesc")}</p>
                  </div>
                </div>
                <div className="text-sm text-text-secondary">
                  <p>You have 3 active sessions across different devices.</p>
                  <p className="mt-2">
                    Managing your sessions helps you maintain account security by ensuring
                    only authorized devices have access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}