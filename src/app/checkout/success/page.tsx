"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Mail } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface SessionDetails {
  id: string;
  amount_total: number;
  customer_details: {
    email: string;
    name: string;
  };
}

const CheckoutSuccess: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Clear the cart since checkout was successful
      clearCart();

      // Fetch session details (you would implement this API endpoint)
      const fetchSessionDetails = async () => {
        try {
          const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);
          if (response.ok) {
            const data = await response.json();
            setSessionDetails(data);
          } else {
            throw new Error('Failed to fetch session details');
          }
        } catch (err) {
          console.error('Error fetching session details:', err);
          setError('Unable to load order details');
        } finally {
          setLoading(false);
        }
      };

      fetchSessionDetails();
    } else {
      setLoading(false);
      setError('No session ID provided');
    }
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-trickordead text-orange-400 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-400 mb-8">
            Your order has been completed successfully. You should receive a confirmation email shortly.
          </p>
          <Link href="/">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Return to Site
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h1 className="text-4xl font-trickordead text-orange-400 mb-4">
            Order Complete!
          </h1>
          <p className="text-lg text-gray-300">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
        </div>

        {sessionDetails && (
          <div className="bg-gray-900 rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Order Details</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="text-white font-mono text-sm">{sessionDetails.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Total:</span>
                <span className="text-orange-400 font-semibold">
                  ${(sessionDetails.amount_total / 100).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Customer:</span>
                <span className="text-white">{sessionDetails.customer_details.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{sessionDetails.customer_details.email}</span>
              </div>

            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 text-center">
            <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Confirmation Email</h3>
            <p className="text-gray-400 text-sm">
              A confirmation email with your order details has been sent to your email address.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 text-center">
            <Package className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Shipping Updates</h3>
            <p className="text-gray-400 text-sm">
              You'll receive tracking information once your order ships (typically within 1-2 business days).
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Return to Site
            </button>
          </Link>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Need help? Contact us at{' '}
            <a href="mailto:support@scaremoor.com" className="text-orange-400 hover:underline">
              support@scaremoor.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;