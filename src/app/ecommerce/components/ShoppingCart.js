'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';

const ShoppingCart = memo(({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  cartTotal,
  cartCount 
}) => {
  const router = useRouter();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push('/ecommerce/checkout');
    }
  };

  return (
    <div 
      className={`fixed right-0 top-0 h-full w-96 backdrop-blur-xl bg-white/90 shadow-2xl z-50 transform transition-transform border-l border-white/50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      role="dialog"
      aria-label="Shopping Cart"
      aria-hidden={!isOpen}
    >
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Shopping Cart ({cartCount})
          </h3>
          <button 
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-label="Close shopping cart"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <div className="text-6xl mb-4" aria-hidden="true">🛒</div>
            <p>Your cart is empty</p>
            <button 
              onClick={onClose}
              className="mt-4 text-blue-600 hover:text-blue-700 underline"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="p-6 border-t border-gray-200/50 backdrop-blur-sm bg-white/50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg text-gray-700">Total:</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            aria-label="Proceed to checkout"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
});

// Cart Item Component
const CartItem = memo(({ item, onUpdateQuantity, onRemove }) => {
  const handleDecrease = () => {
    onUpdateQuantity(item.id, -1);
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, 1);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="backdrop-blur-sm bg-white/50 rounded-xl p-4 border border-white/50">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-3xl">
          <span role="img" aria-label={item.name}>{item.image}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
          <p className="text-gray-600 text-sm mb-2">${item.price}</p>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDecrease}
              className="w-8 h-8 backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded hover:bg-white/80 transition-all"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-12 text-center" aria-label={`Quantity: ${item.quantity}`}>
              {item.quantity}
            </span>
            <button 
              onClick={handleIncrease}
              className="w-8 h-8 backdrop-blur-sm bg-white/50 border border-gray-300/50 rounded hover:bg-white/80 transition-all"
              aria-label="Increase quantity"
            >
              +
            </button>
            <button 
              onClick={handleRemove}
              className="ml-auto text-red-500 hover:text-red-600 transition-colors p-2"
              aria-label={`Remove ${item.name} from cart`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ShoppingCart.displayName = 'ShoppingCart';
CartItem.displayName = 'CartItem';

export default ShoppingCart;