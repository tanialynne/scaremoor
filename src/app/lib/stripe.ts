import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js';

// Client-side Stripe instance
let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
      throw new Error('Stripe publishable key is missing');
    }

    console.log('Loading Stripe with key:', publishableKey.slice(0, 12) + '...');
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};