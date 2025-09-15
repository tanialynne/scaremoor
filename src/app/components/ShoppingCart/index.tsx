"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../constants/DirectSales';

const ShoppingCart: React.FC = () => {
  const { state, removeItem, updateQuantity, closeCart, clearCart } = useCart();

  if (!state.isOpen) return null;

  const formatProductName = (title: string, variantName: string, category?: string) => {
    if (category === 'books') {
      const formatDisplay = variantName.charAt(0).toUpperCase() + variantName.slice(1);
      return `${title} (${formatDisplay})`;
    }
    return `${title} - ${variantName}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm" onClick={closeCart}>
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl border-l border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-trickordead text-white">
              Cart ({state.itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-200px)]">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <Link href="/shop" onClick={closeCart}>
                <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Shop Now
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-4 bg-gray-800 rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-20 flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm leading-tight mb-1">
                      {formatProductName(item.title, item.variantName, item.category)}
                    </h3>
                    <p className="text-orange-400 font-semibold text-lg">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-gray-700 rounded">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="p-1 text-white hover:bg-gray-600 rounded-l transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-white text-sm min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="p-1 text-white hover:bg-gray-600 rounded-r transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {state.items.length > 1 && (
                <button
                  onClick={clearCart}
                  className="w-full text-red-400 hover:text-red-300 text-sm py-2 transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-700 p-6 bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-white">Subtotal:</span>
              <span className="text-xl font-bold text-orange-400">
                {formatPrice(state.subtotal)}
              </span>
            </div>
            
            <div className="space-y-3">
              <Link href="/checkout" className="block w-full" onClick={closeCart}>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors">
                  Checkout
                </button>
              </Link>
              
              <Link href="/shop" className="block w-full" onClick={closeCart}>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              Free shipping on orders over $35
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;