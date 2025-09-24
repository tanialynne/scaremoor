'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CartItem } from '../../constants/DirectSales';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface StripeElementsFormProps {
  items: CartItem[];
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

const StripeElementsForm: React.FC<StripeElementsFormProps> = ({
  items,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 35 ? 0 : 4.99; // Free shipping over $35
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (stripe && elements) {
      setStripeLoading(false);
    }
  }, [stripe, elements]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerData,
        }),
      });

      const { clientSecret } = await response.json();

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${customerData.firstName} ${customerData.lastName}`,
              email: customerData.email,
              phone: customerData.phone,
            },
          },
        }
      );

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Add customer to Kit for purchasers
        try {
          await fetch('/api/add-to-kit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: customerData.email,
              firstName: customerData.firstName,
              lastName: customerData.lastName,
            }),
          });
          console.log('Successfully added customer to Kit');
        } catch (kitError) {
          console.error('Failed to add customer to Kit:', kitError);
          // Don't fail the checkout if Kit fails
        }

        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      onError('Something went wrong. Please try again.');
      console.error('Payment error:', err);
    }

    setProcessing(false);
  };

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const cardElementOptions = {
    style: {
      base: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
        iconColor: '#ffffff',
        '::placeholder': {
          color: '#9ca3af',
        },
        ':-webkit-autofill': {
          color: '#ffffff',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
      complete: {
        color: '#10b981',
        iconColor: '#10b981',
      },
    },
  };

  if (stripeLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading payment form...</p>
      </div>
    );
  }

  if (!stripe || !elements) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Failed to load Stripe. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              First Name:
              <input
                type="text"
                value={customerData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded mt-1 text-white focus:border-orange-400 focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Last Name:
              <input
                type="text"
                value={customerData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded mt-1 text-white focus:border-orange-400 focus:outline-none"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Email:
            <input
              type="email"
              value={customerData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded mt-1 text-white focus:border-orange-400 focus:outline-none"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Phone:
            <input
              type="tel"
              value={customerData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded mt-1 text-white focus:border-orange-400 focus:outline-none"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white">
            Payment Details:
            <div className="bg-gray-800 border border-gray-600 rounded p-4 mt-1 focus-within:border-orange-400 min-h-[45px] flex items-center">
              <div className="w-full">
                <CardElement options={cardElementOptions} />
              </div>
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-lg"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            `🔒 Pay ${total.toFixed(2)}`
          )}
        </button>
      </form>

      {processing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <div className="text-xl">Processing Payment...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StripeElementsForm;