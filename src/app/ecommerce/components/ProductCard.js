'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';

const ProductCard = memo(({ product, onAddToCart }) => {
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleViewProduct = () => {
    router.push(`/ecommerce/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden">
        <span className="text-8xl" role="img" aria-label={product.name}>
          {product.image}
        </span>
        {product.badge && (
          <span 
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
              product.badge === 'SALE' ? 'bg-red-500/90' :
              product.badge === 'NEW' ? 'bg-green-500/90' :
              product.badge === 'HOT' ? 'bg-orange-500/90' :
              'bg-purple-500/90'
            } text-white`}
            aria-label={`Product badge: ${product.badge}`}
          >
            {product.badge}
          </span>
        )}
        {product.discount && (
          <span 
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-red-500/90 text-white"
            aria-label={`Discount: ${product.discount}`}
          >
            {product.discount}
          </span>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={handleViewProduct}
            className="backdrop-blur-md bg-white/90 p-2.5 rounded-lg hover:bg-white transition-all"
            aria-label={`View ${product.name} details`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button 
            className="backdrop-blur-md bg-white/90 p-2.5 rounded-lg hover:bg-white transition-all"
            aria-label={`Add ${product.name} to wishlist`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                aria-hidden="true"
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;