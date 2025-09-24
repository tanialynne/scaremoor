"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../constants/DirectSales';
import Button from '../Button';
import SimpleStripeForm from '../SimpleStripeForm';
import StripeProvider from '../StripeProvider';

import OrangeBackground from '../../../../public/images/orangeBackground.png';

const CheckoutForm: React.FC = () => {
  const { state, clearCart } = useCart();
  const [showSummary, setShowSummary] = useState(false);

  // Calculate totals
  const subtotal = state.subtotal;
  const shipping = subtotal >= 35 ? 0 : 4.99; // Free shipping over $35
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  const handlePaymentSuccess = (paymentIntentId: string) => {
    clearCart();
    // Redirect to success page
    window.location.href = `/checkout/success?payment_intent=${paymentIntentId}`;
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error}`);
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
      <div className="bg-gray-900 rounded-xl p-6 h-fit lg:block">
        {/* Mobile toggle button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="w-full flex justify-between items-center text-white"
          >
            <h2 className="text-xl font-trickordead">Order Summary ({state.items.length} item{state.items.length !== 1 ? 's' : ''})</h2>
            <span className="text-orange-400 font-bold">{formatPrice(total)}</span>
          </button>
        </div>

        {/* Desktop title */}
        <h2 className="hidden lg:block text-xl font-trickordead text-white mb-6">Order Summary</h2>

        {/* Summary content - hidden on mobile unless toggled */}
        <div className={`${showSummary ? 'block' : 'hidden'} lg:block`}>
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
      </div>

      {/* Checkout Form */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-trickordead text-white mb-6">Complete Your Order</h2>

        <StripeProvider>
          <SimpleStripeForm
            items={state.items}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </StripeProvider>

        {/* Info boxes moved below */}
        <div className="mt-8 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">🔒 Secure Payment with Stripe</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your payment information is processed securely by Stripe. We never store your card details.
            </p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>✓ 256-bit SSL encryption</li>
              <li>✓ PCI DSS compliant</li>
              <li>✓ Fraud protection included</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">What happens next?</h3>
            <ol className="text-gray-400 text-sm space-y-1">
              <li>1. Enter your payment and shipping details above</li>
              <li>2. Complete your order and receive confirmation</li>
              <li>3. Get tracking information within 1-2 business days</li>
            </ol>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Powered by Stripe • Your payment information is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;