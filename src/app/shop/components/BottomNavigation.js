export default function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", label: "Shop", icon: HomeIcon },
    { id: "explore", label: "Explore", icon: ExploreIcon },
    { id: "cart", label: "Cart", icon: CartIcon },
    { id: "offer", label: "Offer", icon: OfferIcon },
    { id: "account", label: "Account", icon: AccountIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center p-2 ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <tab.icon active={activeTab === tab.id} />
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function HomeIcon({ active }) {
  return (
    <svg 
      className="w-6 h-6" 
      fill={active ? "currentColor" : "none"} 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={active ? 0 : 2} 
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
      />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
      <rect x="14" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
      <rect x="3" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
      <rect x="14" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
      />
    </svg>
  );
}

function OfferIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
      />
    </svg>
  );
}