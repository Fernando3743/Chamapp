'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(0);

  const product = {
    id: params.id,
    name: 'Premium Wireless Headphones Pro',
    brand: 'TechBrand',
    price: 299.99,
    originalPrice: 399.99,
    discount: '-25%',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    images: ['🎧', '📦', '🎵', '🔊'],
    colors: ['black', 'white', 'blue', 'red'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Experience premium sound quality with our flagship wireless headphones. Featuring active noise cancellation, 30-hour battery life, and superior comfort for all-day wear.',
    features: [
      'Active Noise Cancellation (ANC)',
      '30-hour battery life',
      'Premium leather ear cushions',
      'Bluetooth 5.0 connectivity',
      'Built-in microphone for calls',
      'Foldable design with carrying case'
    ],
    specifications: {
      'Weight': '250g',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Bluetooth Version': '5.0',
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz'
    }
  };

  const relatedProducts = [
    { id: 2, name: 'Smart Watch Ultra', price: 449.99, image: '⌚', rating: 4.8 },
    { id: 3, name: 'Wireless Earbuds', price: 149.99, image: '🎧', rating: 4.6 },
    { id: 4, name: 'Phone Case Pro', price: 39.99, image: '📱', rating: 4.5 },
    { id: 5, name: 'Portable Charger', price: 59.99, image: '🔋', rating: 4.7 }
  ];

  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      date: '2 days ago',
      verified: true,
      comment: 'Amazing sound quality! The noise cancellation is top-notch. Very comfortable for long listening sessions.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      date: '1 week ago',
      verified: true,
      comment: 'Great headphones overall. Battery life is excellent. Only minor issue is they can get warm during extended use.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      rating: 5,
      date: '2 weeks ago',
      verified: true,
      comment: 'Best headphones I\'ve ever owned. The build quality is premium and they look fantastic.'
    }
  ];

  const addToCart = () => {
    console.log('Added to cart:', { product, quantity, size: selectedSize, color: selectedColor });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/60">
          <button onClick={() => router.push('/ecommerce')} className="hover:text-white transition-colors">
            Store
          </button>
          <span>/</span>
          <button className="hover:text-white transition-colors">Electronics</button>
          <span>/</span>
          <span className="text-white">Headphones</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8 border border-white/20 aspect-square flex items-center justify-center">
              <span className="text-[200px]">{product.images[mainImage]}</span>
              {product.discount && (
                <span className="absolute top-6 left-6 px-4 py-2 bg-red-500 text-white rounded-full font-semibold">
                  {product.discount}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`glass rounded-xl p-4 border transition-all aspect-square flex items-center justify-center text-5xl ${
                    mainImage === index 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-white/20 hover:bg-white/10'
                  }`}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-purple-400 mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-white/20'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-white/60">{product.rating} ({product.reviews} reviews)</span>
                {product.inStock ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <span>✓</span> In Stock
                  </span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-white/50 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Color</label>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-xl border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-purple-500 scale-110' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ 
                      backgroundColor: color === 'white' ? '#ffffff' : 
                                     color === 'black' ? '#000000' :
                                     color === 'blue' ? '#3B82F6' :
                                     color === 'red' ? '#EF4444' : color
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Size</label>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-xl border transition-all font-semibold ${
                      selectedSize === size 
                        ? 'border-purple-500 bg-purple-500/10 text-purple-300' 
                        : 'border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center glass rounded-xl border border-white/20">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-white/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-white/20">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-white/60 text-sm">Only 12 left in stock</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={addToCart}
                className="flex-1 bg-primary-gradient py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => router.push('/ecommerce/checkout')}
                className="flex-1 glass border border-white/20 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Buy Now
              </button>
              <button className="glass border border-white/20 p-3 rounded-xl hover:bg-white/10 transition-all">
                <span className="text-xl">❤️</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚚</span>
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-white/60">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">↩️</span>
                  <div>
                    <p className="font-semibold">30-Day Returns</p>
                    <p className="text-sm text-white/60">Easy returns & exchanges</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <p className="font-semibold">2-Year Warranty</p>
                    <p className="text-sm text-white/60">Extended protection included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="glass rounded-2xl border border-white/20 overflow-hidden mb-16">
          <div className="flex border-b border-white/10">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-semibold capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-primary-gradient text-white' 
                    : 'hover:bg-white/5 text-white/80'
                }`}
              >
                {tab} {tab === 'reviews' && `(${product.reviews})`}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p className="text-white/80 leading-relaxed">
                  {product.description}
                </p>
                
                <div>
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="glass rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-sm mb-1">{key}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="glass rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-bold">{product.rating}</span>
                        <div>
                          <div className="flex mb-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-white/20'}>
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-white/60">Based on {product.reviews} reviews</p>
                        </div>
                      </div>
                    </div>
                    <button className="bg-primary-gradient px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                      Write a Review
                    </button>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="glass rounded-xl p-6 border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-semibold">{review.name}</p>
                            {review.verified && (
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                                ✓ Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? 'text-yellow-400 text-sm' : 'text-white/20 text-sm'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-white/60">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/80">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(item => (
              <div 
                key={item.id}
                onClick={() => router.push(`/ecommerce/product/${item.id}`)}
                className="glass rounded-2xl overflow-hidden border border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                  <span className="text-6xl">{item.image}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(item.rating) ? 'text-yellow-400 text-sm' : 'text-white/20 text-sm'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-white/60">{item.rating}</span>
                  </div>
                  <p className="text-xl font-bold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}