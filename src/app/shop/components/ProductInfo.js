import { Star } from "lucide-react";

export default function ProductInfo({ product, quantity, onQuantityChange }) {
  return (
    <div className="px-4 py-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {product.name}
      </h1>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          <span className="text-gray-600 text-sm">By</span>
          <span className="text-blue-600 font-medium text-sm">{product.brand}</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-lg text-gray-400 line-through">
            ${product.originalPrice}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onQuantityChange(quantity - 1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <span className="text-black text-xl">−</span>
          </button>
          <span className="font-medium text-lg text-black">{quantity}</span>
          <button 
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <span className="text-black text-xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}