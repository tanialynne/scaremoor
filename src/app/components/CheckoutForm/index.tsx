"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../constants/DirectSales';
import Button from '../Button';

import YellowBackground from '../../../../public/images/yellowBackground.png';
import OrangeBackground from '../../../../public/images/orangeBackground.png';

const CheckoutForm: React.FC = () => {
  const { state, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = state.subtotal;
  const shipping = subtotal >= 35 ? 0 : 4.99; // Free shipping over $35
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      alert("Demo: Payment would be processed here!\n\nIn a real implementation, this would integrate with:\n- Stripe\n- PayPal\n- Square\n- Or other payment processors");
      setIsProcessing(false);
      clearCart();
    }, 2000);
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-trickordead mb-4 text-orange-400">
          Your cart is empty
        </h2>
        <p className="text-gray-400 mb-6">Add some books to your cart before checking out.</p>
        <Button
          buttonImage={OrangeBackground}
          altText="shop-now"
          text="Shop Now"
        />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Order Summary */}
      <div className="bg-gray-900 rounded-xl p-6 h-fit">
        <h2 className="text-xl font-trickordead text-white mb-6">Order Summary</h2>
        
        <div className="space-y-4 mb-6">
          {state.items.map((item) => (
            <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
              <div className="w-12 h-16 bg-gray-800 rounded flex-shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-white text-sm font-medium leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  {item.variantName}
                </p>
                <p className="text-orange-400 text-sm font-semibold">
                  {formatPrice(item.price)} × {item.quantity}
                </p>
              </div>
              <div className="text-white font-medium">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4 space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Tax:</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-white border-t border-gray-700 pt-2">
            <span>Total:</span>
            <span className="text-orange-400">{formatPrice(total)}</span>
          </div>
        </div>

        {shipping === 0 && (
          <div className="mt-4 text-green-400 text-sm text-center">
            🎉 You qualify for free shipping!
          </div>
        )}
      </div>

      {/* Checkout Form */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-trickordead text-white mb-6">Payment Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Customer Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Payment Method</h3>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment-method"
                  defaultChecked
                  className="text-orange-400"
                />
                <label htmlFor="credit-card" className="text-white">
                  Credit Card
                </label>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                `Complete Order - ${formatPrice(total)}`
              )}
            </button>
          </div>

          <div className="text-xs text-gray-400 text-center">
            🔒 Your payment information is secure and encrypted
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;