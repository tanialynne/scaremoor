'use client';

import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Make sure to load Stripe outside of component render
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51S8nvFBSbZr6EENuESEeYrstjaErpdsNzlaXKGQTbBvJpMZ3iOrmwBBFXnnfQi9XYNE4SbI65ZBCqNJ0TOu0Gpno00vrKanCZ7';

console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- Publishable key from env:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Found' : 'Not found');
console.log('- Using key:', publishableKey.slice(0, 12) + '...');

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        console.log('Initializing Stripe...');
        const stripeInstance = await loadStripe(publishableKey);

        if (!stripeInstance) {
          throw new Error('Failed to initialize Stripe');
        }

        console.log('Stripe initialized successfully');
        setStripe(stripeInstance);
        setError(null);
      } catch (err) {
        console.error('Stripe initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Stripe');
      } finally {
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorBackground: '#1f2937',
      colorText: '#ffffff',
      colorDanger: '#ef4444',
      colorPrimary: '#ea580c',
      borderRadius: '8px',
    },
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading Stripe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">Failed to load payment system</p>
        <p className="text-gray-400 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <Elements stripe={stripe} options={{ appearance }}>
      {children}
    </Elements>
  );
};

export default StripeProvider;