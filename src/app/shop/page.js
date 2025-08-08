"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShopHeader from "./components/ShopHeader";
import HeroBanner from "./components/HeroBanner";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import BottomNavigation from "./components/BottomNavigation";
import { useCart } from "./contexts/CartContext";

// Mock data
const flashDeals = [
  { id: 1, name: "Black Smartphone", price: 999, discount: 20 },
  { id: 2, name: "Smart Watch", price: 299, discount: 15 },
  { id: 3, name: "Wireless Earbuds", price: 149, discount: 30 },
  { id: 4, name: "Tablet Pro", price: 799, discount: 25 },
  { id: 5, name: "Gaming Laptop", price: 1299, discount: 10 },
  { id: 6, name: "Bluetooth Speaker", price: 89, discount: 40 },
  { id: 7, name: "4K Webcam", price: 199, discount: 35 },
  { id: 8, name: "Power Bank 20000mAh", price: 59, discount: 50 },
];

export default function ShopPage() {
  const router = useRouter();
  const { getCartCount } = useCart();
  const [activeTab, setActiveTab] = useState("home");
  const [likedProducts, setLikedProducts] = useState({});

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleProductClick = (productId) => {
    router.push(`/shop/product/${productId}`);
  };

  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <ShopHeader cartCount={getCartCount()} />
      
      <main className="pb-16">
        <HeroBanner />
        
        <Categories onCategoryClick={handleCategoryClick} />

        {/* Flash Deals Section */}
        <div className="px-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Flash Deals for You
            </h3>
            <button className="text-blue-600 text-sm font-medium">
              See All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {flashDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isLiked={likedProducts[product.id]}
                onToggleLike={toggleLike}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}