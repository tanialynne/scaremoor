"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { isFeatureEnabled } from '../../constants/FeatureFlags';

const CartIcon: React.FC = () => {
  const { state, toggleCart } = useCart();

  // Don't render if direct sales is disabled
  if (!isFeatureEnabled("DIRECT_SALES_ENABLED")) {
    return null;
  }

  return (
    <button
      onClick={toggleCart}
      className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2 transition-transform hover:scale-110 focus:scale-110"
      aria-label={`Shopping cart with ${state.itemCount} items`}
    >
      <ShoppingCart className="w-6 h-6 text-white" />
      
      {/* Item Count Badge */}
      {state.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {state.itemCount > 9 ? '9+' : state.itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;