'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const cartItems = [
    { id: 1, name: 'Wireless Headphones Pro', price: 299.99, quantity: 1, image: '🎧' },
    { id: 2, name: 'Smart Watch Ultra', price: 449.99, quantity: 1, image: '⌚' },
    { id: 3, name: 'Premium Leather Jacket', price: 189.99, quantity: 2, image: '🧥' }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 15.99 : shippingMethod === 'overnight' ? 29.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: 'Shipping', icon: '📦' },
    { number: 2, title: 'Payment', icon: '💳' },
    { number: 3, title: 'Review', icon: '✔️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Checkout</h1>
          <p className="text-white/60">Complete your purchase</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${
                  step >= s.number 
                    ? 'bg-primary-gradient text-white' 
                    : 'glass border border-white/20 text-white/60'
                }`}>
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-semibold">{s.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step > s.number ? 'bg-purple-500' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 border border-white/20">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="New York"
                          className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="NY"
                          className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">ZIP Code</label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="10001"
                          className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Shipping Method */}
                    <div>
                      <label className="block text-sm font-medium mb-4 text-white/80">Shipping Method</label>
                      <div className="space-y-3">
                        <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          shippingMethod === 'standard' 
                            ? 'border-purple-500 bg-purple-500/10' 
                            : 'border-white/20 hover:bg-white/5'
                        }`}>
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value="standard"
                              checked={shippingMethod === 'standard'}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="w-4 h-4 text-purple-500"
                            />
                            <div>
                              <p className="font-semibold">Standard Shipping</p>
                              <p className="text-sm text-white/60">5-7 business days</p>
                            </div>
                          </div>
                          <span className="font-semibold">FREE</span>
                        </label>

                        <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          shippingMethod === 'express' 
                            ? 'border-purple-500 bg-purple-500/10' 
                            : 'border-white/20 hover:bg-white/5'
                        }`}>
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value="express"
                              checked={shippingMethod === 'express'}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="w-4 h-4 text-purple-500"
                            />
                            <div>
                              <p className="font-semibold">Express Shipping</p>
                              <p className="text-sm text-white/60">2-3 business days</p>
                            </div>
                          </div>
                          <span className="font-semibold">$15.99</span>
                        </label>

                        <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          shippingMethod === 'overnight' 
                            ? 'border-purple-500 bg-purple-500/10' 
                            : 'border-white/20 hover:bg-white/5'
                        }`}>
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value="overnight"
                              checked={shippingMethod === 'overnight'}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="w-4 h-4 text-purple-500"
                            />
                            <div>
                              <p className="font-semibold">Overnight Shipping</p>
                              <p className="text-sm text-white/60">Next business day</p>
                            </div>
                          </div>
                          <span className="font-semibold">$29.99</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 p-4 rounded-xl border transition-all ${
                        paymentMethod === 'card'
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">💳</span>
                      <span className="font-semibold">Credit Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex-1 p-4 rounded-xl border transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">🅿️</span>
                      <span className="font-semibold">PayPal</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('apple')}
                      className={`flex-1 p-4 rounded-xl border transition-all ${
                        paymentMethod === 'apple'
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">🍎</span>
                      <span className="font-semibold">Apple Pay</span>
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Cardholder Name</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full glass px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="glass rounded-xl p-4 border border-purple-500/30 bg-purple-500/5">
                        <div className="flex items-start gap-3">
                          <span className="text-purple-400 text-xl">🔒</span>
                          <div>
                            <p className="font-semibold text-purple-300">Secure Payment</p>
                            <p className="text-sm text-white/60">Your payment information is encrypted and secure. We never store your card details.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-12">
                      <span className="text-6xl block mb-4">🅿️</span>
                      <p className="text-xl mb-4">Pay with PayPal</p>
                      <p className="text-white/60 mb-6">You will be redirected to PayPal to complete your purchase</p>
                      <button className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors">
                        Continue to PayPal
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'apple' && (
                    <div className="text-center py-12">
                      <span className="text-6xl block mb-4">🍎</span>
                      <p className="text-xl mb-4">Pay with Apple Pay</p>
                      <p className="text-white/60 mb-6">Use Touch ID or Face ID to complete your purchase</p>
                      <button className="bg-black text-white px-8 py-3 rounded-xl font-semibold border border-white/20 hover:bg-gray-900 transition-colors">
                        Pay with Apple Pay
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    {/* Shipping Address */}
                    <div className="glass rounded-xl p-6 border border-white/10">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <span>📦</span> Shipping Address
                      </h3>
                      <p className="text-white/80">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zip}<br />
                        {formData.phone}
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div className="glass rounded-xl p-6 border border-white/10">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <span>💳</span> Payment Method
                      </h3>
                      <p className="text-white/80">
                        {paymentMethod === 'card' && `Card ending in ${formData.cardNumber.slice(-4)}`}
                        {paymentMethod === 'paypal' && 'PayPal'}
                        {paymentMethod === 'apple' && 'Apple Pay'}
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="glass rounded-xl p-6 border border-white/10">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <span>🛍️</span> Order Items
                      </h3>
                      <div className="space-y-3">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.image}</span>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-white/60">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => step > 1 ? setStep(step - 1) : router.push('/ecommerce')}
                  className="glass px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors border border-white/20"
                >
                  ← {step === 1 ? 'Back to Shop' : 'Previous'}
                </button>
                <button
                  onClick={() => step < 3 ? setStep(step + 1) : router.push('/ecommerce/order-success')}
                  className="bg-primary-gradient px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  {step === 3 ? 'Place Order' : 'Continue'} →
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 border border-white/20 sticky top-8">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-white/60">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold gradient-text">${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 glass px-3 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 text-sm"
                  />
                  <button className="glass px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-sm font-semibold">
                    Apply
                  </button>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-center gap-4 mb-3">
                  <span className="text-2xl">🔒</span>
                  <span className="text-2xl">✓</span>
                  <span className="text-2xl">🛡️</span>
                </div>
                <p className="text-xs text-center text-white/60">
                  Secure checkout powered by SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}