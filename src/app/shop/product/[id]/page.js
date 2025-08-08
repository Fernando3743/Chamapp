"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import ProductImages from "../../components/ProductImages";
import ProductInfo from "../../components/ProductInfo";
import ColorSelector from "../../components/ColorSelector";
import StorageSelector from "../../components/StorageSelector";
import SnapshotView from "../../components/SnapshotView";
import BottomActions from "../../components/BottomActions";
import { useCart } from "../../contexts/CartContext";
import { COLORS, STORAGE_OPTIONS } from "../../constants";

// Product data
const productData = {
  name: "iPhone 16 Pro Max",
  brand: "Apple",
  rating: "4.9",
  reviews: "2,761",
  price: "1399.99",
  originalPrice: "1499.99",
  images: [
    { id: 0, url: "/api/placeholder/300/400", alt: "Front view" },
    { id: 1, url: "/api/placeholder/300/400", alt: "Back view" },
    { id: 2, url: "/api/placeholder/300/400", alt: "Side view" },
    { id: 3, url: "/api/placeholder/300/400", alt: "Angle view" },
  ],
  colors: COLORS,
  storageOptions: STORAGE_OPTIONS,
  features: [
    "4K Ultra HD XDR Display",
    "Wireless Charging System"
  ]
};

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart, getCartCount } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("White Titanium");
  const [selectedStorage, setSelectedStorage] = useState("512 GB");
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 99) setQuantity(newQuantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/shop/cart');
  };

  const handleAddToCart = () => {
    const product = {
      id: resolvedParams.id || '1',
      name: productData.name,
      price: parseFloat(productData.price),
      color: selectedColor,
      storage: selectedStorage,
      quantity
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <Header 
        onBack={() => router.back()}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
        cartCount={getCartCount()}
      />

      <main className="pb-32">
        <ProductImages 
          images={productData.images}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        <ProductInfo 
          product={productData}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />

        <ColorSelector 
          colors={productData.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        <StorageSelector 
          options={productData.storageOptions}
          selectedStorage={selectedStorage}
          onSelectStorage={setSelectedStorage}
        />

        <SnapshotView 
          features={productData.features}
        />
      </main>

      <BottomActions 
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}