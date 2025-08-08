// Shared constants to avoid duplication

export const CART_COUNT = 3; // This should come from global state/context

export const COLORS = [
  { name: "Desert Titanium", hex: "#C4B5A0", text: "Desert Titanium" },
  { name: "Natural Titanium", hex: "#8E8E93", text: "Natural Titanium" },
  { name: "White Titanium", hex: "#F5F5F7", text: "White Titanium" },
  { name: "Black Titanium", hex: "#1D1D1F", text: "Black Titanium" },
];

export const STORAGE_OPTIONS = ["256 GB", "512 GB", "1 TB"];

export const CATEGORIES = [
  { id: 1, name: "Mobile", icon: "📱" },
  { id: 2, name: "Headphone", icon: "🎧" },
  { id: 3, name: "Tablets", icon: "📋" },
  { id: 4, name: "Laptop", icon: "💻" },
  { id: 5, name: "Speakers", icon: "🔊" },
  { id: 6, name: "More", icon: "➕" },
];

export const BANNER_SLIDES = [
  {
    id: 1,
    title: "iPhone 16 Pro",
    subtitle: "Extraordinary Performance",
    description: "& Exceptional Power",
    gradient: "from-blue-600 to-purple-600",
    phoneColor: "bg-gray-900",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24",
    subtitle: "Innovation Meets",
    description: "Premium Design",
    gradient: "from-purple-600 to-pink-600",
    phoneColor: "bg-gray-800",
  },
  {
    id: 3,
    title: "iPad Pro M4",
    subtitle: "Unleash Your",
    description: "Creative Power",
    gradient: "from-indigo-600 to-blue-600",
    phoneColor: "bg-gray-700",
  },
  {
    id: 4,
    title: "MacBook Air",
    subtitle: "Light. Bright.",
    description: "Full of Might.",
    gradient: "from-pink-600 to-orange-600",
    phoneColor: "bg-gray-900",
  },
];

export const SWIPER_CONFIG = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !w-2 !h-2 !bg-white !opacity-40",
    bulletActiveClass: "swiper-pagination-bullet-active !bg-white !opacity-100",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
};