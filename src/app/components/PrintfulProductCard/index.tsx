"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../constants/DirectSales';
import { PrintfulProduct, PrintfulVariant } from '../../lib/printful';

interface PrintfulProductCardProps {
  product: PrintfulProduct;
}

const PrintfulProductCard: React.FC<PrintfulProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [variants, setVariants] = useState<PrintfulVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<PrintfulVariant | null>(null);
  const [loading, setLoading] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  // Fetch product variants
  useEffect(() => {
    const fetchVariants = async () => {
      if (showVariants && variants.length === 0) {
        setLoading(true);
        try {
          const response = await fetch(`/api/products/printful?productId=${product.id}`);
          if (response.ok) {
            const data = await response.json();
            setVariants(data.sync_variants || []);
            if (data.sync_variants?.length > 0) {
              setSelectedVariant(data.sync_variants[0]);
            }
          }
        } catch (error) {
          console.error('Failed to fetch variants:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVariants();
  }, [showVariants, product.id, variants.length]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      productId: product.external_id || product.id.toString(),
      variantId: selectedVariant.external_id || selectedVariant.id.toString(),
      title: product.name,
      variantName: selectedVariant.name,
      price: parseFloat(selectedVariant.retail_price),
      image: selectedVariant.product?.image ? {
        src: selectedVariant.product.image,
        height: 400,
        width: 300,
        blurDataURL: ''
      } : undefined,
      category: 'printful'
    });
  };

  const toggleVariants = () => {
    setShowVariants(!showVariants);
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      {/* Product Image */}
      <div className="relative h-64 bg-gray-800 overflow-hidden">
        <Image
          src={product.thumbnail_url || '/images/placeholder-product.png'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!product.synced && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-xs font-semibold">
            Not Synced
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {product.variants} variant{product.variants !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Show variants button */}
        <button
          onClick={toggleVariants}
          className="flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm transition-colors"
        >
          <Eye className="w-4 h-4" />
          {showVariants ? 'Hide Options' : 'View Options'}
        </button>

        {/* Variants Section */}
        {showVariants && (
          <div className="space-y-3 border-t border-gray-700 pt-4">
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-orange-400 border-t-transparent mx-auto"></div>
              </div>
            ) : variants.length > 0 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Option:
                  </label>
                  <select
                    value={selectedVariant?.id || ''}
                    onChange={(e) => {
                      const variant = variants.find(v => v.id.toString() === e.target.value);
                      setSelectedVariant(variant || null);
                    }}
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-orange-400 focus:outline-none"
                  >
                    {variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name} - {formatPrice(parseFloat(variant.retail_price))}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedVariant && (
                  <div className="bg-gray-800 rounded p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Price:</span>
                      <span className="text-orange-400 font-semibold">
                        {formatPrice(parseFloat(selectedVariant.retail_price))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">SKU:</span>
                      <span className="text-gray-400 text-sm">{selectedVariant.sku}</span>
                    </div>
                    {selectedVariant.product?.image && (
                      <div className="mt-2">
                        <Image
                          src={selectedVariant.product.image}
                          alt={selectedVariant.name}
                          width={100}
                          height={100}
                          className="rounded object-cover mx-auto"
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">
                No variants available
              </p>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        {selectedVariant && (
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart - {formatPrice(parseFloat(selectedVariant.retail_price))}
          </button>
        )}

        {showVariants && !selectedVariant && variants.length > 0 && (
          <div className="text-center text-gray-400 text-sm py-2">
            Select a variant to add to cart
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintfulProductCard;