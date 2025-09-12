"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Package, Download, Shirt } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../constants/Products';
import { formatPrice, calculateDiscount } from '../../constants/DirectSales';

interface GenericProductCardProps {
  product: Product;
}

const GenericProductCard: React.FC<GenericProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      image: product.image,
      category: product.category
    });
  };

  const hasDiscount = selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price;
  const discountPercentage = hasDiscount 
    ? calculateDiscount(selectedVariant.originalPrice!, selectedVariant.price)
    : 0;

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'worksheets':
        return <Download className="w-4 h-4" />;
      case 'merchandise':
        return <Shirt className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = () => {
    switch (product.category) {
      case 'worksheets':
        return 'Digital Download';
      case 'merchandise':
        return 'Physical Item';
      case 'digital':
        return 'Digital Product';
      default:
        return 'Product';
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-gray-700 transition-colors group">
      {/* Product Image & Badges */}
      <div className="relative w-full h-[250px] bg-gray-800">
        <Image
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          {getCategoryIcon()}
          <span className="text-xs text-white">{getCategoryLabel()}</span>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}%
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute bottom-2 left-2">
            <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-trickordead text-white mb-1 group-hover:text-orange-400 transition-colors">
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="text-gray-400 text-sm leading-tight">{product.subtitle}</p>
          )}
        </div>

        {/* Age Range */}
        {product.minAge && product.maxAge && (
          <div>
            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
              Ages {product.minAge}-{product.maxAge}
            </span>
          </div>
        )}

        {/* Variant Selection */}
        {product.variants.length > 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {product.category === 'merchandise' ? 'Size:' : 'Option:'}
            </label>
            <select
              value={selectedVariant.id}
              onChange={(e) => {
                const variant = product.variants.find(v => v.id === e.target.value);
                if (variant) setSelectedVariant(variant);
              }}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} - {formatPrice(variant.price)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Pricing */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-lg font-bold text-orange-400">
            {formatPrice(selectedVariant.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(selectedVariant.originalPrice!)}
            </span>
          )}
          {!selectedVariant.inStock && (
            <span className="text-sm text-red-400 font-medium">Out of Stock</span>
          )}
        </div>

        {/* Key Features */}
        {product.features && product.features.length > 0 && (
          <div className="text-xs text-gray-400 leading-tight">
            • {product.features.slice(0, 2).join(' • ')}
          </div>
        )}

        {/* Description Preview */}
        <p className="text-gray-300 text-sm line-clamp-2 leading-tight">{product.description}</p>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant.inStock}
            className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            {selectedVariant.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
          
          <Link href={`/product/${product.slug}`}>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              Details
            </button>
          </Link>
        </div>

        {/* File Size for Digital Products */}
        {product.type === 'digital' && selectedVariant.fileSize && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
            File Size: {selectedVariant.fileSize}
          </div>
        )}

        {/* SKU for Physical Products */}
        {product.type === 'physical' && selectedVariant.sku && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
            SKU: {selectedVariant.sku}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericProductCard;