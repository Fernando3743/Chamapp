import { Heart } from "lucide-react";

export default function ProductCard({ product, isLiked, onToggleLike, onClick }) {
  return (
    <div
      className="bg-gradient-to-br from-white to-blue-50/20 rounded-xl shadow-sm overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className="h-40 bg-gradient-to-br from-blue-50/50 to-purple-50/50 flex items-center justify-center">
          <div className="w-24 h-32 bg-gray-900 rounded-lg shadow-lg"></div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(product.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full shadow-md"
        >
          <Heart
            className={`w-4 h-4 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>
      <div className="p-3">
        <h4 className="text-sm font-medium text-gray-900 mb-1">
          {product.name}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.discount && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-medium">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}