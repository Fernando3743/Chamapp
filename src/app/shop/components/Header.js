import { ChevronLeft, Heart, Share2, ShoppingCart } from "lucide-react";
import CartBadge from "./CartBadge";

export default function Header({ onBack, isFavorite, onToggleFavorite, cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
      <button onClick={onBack} className="p-2">
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      <div className="flex items-center gap-4">
        <button onClick={onToggleFavorite} className="p-2">
          <Heart
            className={`w-6 h-6 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        <button className="p-2">
          <Share2 className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 relative">
          <ShoppingCart className="w-6 h-6 text-gray-600" />
          <CartBadge count={cartCount} />
        </button>
      </div>
    </header>
  );
}