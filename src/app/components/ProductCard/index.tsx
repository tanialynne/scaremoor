"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Book } from '../../constants/Books';
import { formatPrice, calculateDiscount } from '../../constants/DirectSales';

interface ProductCardProps {
  book: Book;
}

const ProductCard: React.FC<ProductCardProps> = ({ book }) => {
  const { addItem } = useCart();
  const [selectedFormat, setSelectedFormat] = useState(
    book.directSales?.variants[0]?.format || 'paperback'
  );

  if (!book.directSales?.enabled || !book.directSales.variants.length) {
    return null;
  }

  const selectedVariant = book.directSales.variants.find(
    variant => variant.format === selectedFormat
  ) || book.directSales.variants[0];

  const handleAddToCart = () => {
    addItem({
      productId: book.bookSlug,
      variantId: `${book.bookSlug}-${selectedVariant.format}`,
      title: book.bookTitle,
      variantName: selectedVariant.format,
      price: selectedVariant.price,
      image: book.bookImage.close,
      category: 'books'
    });
  };

  const formatDisplayName = (format: string) => {
    return format.charAt(0).toUpperCase() + format.slice(1);
  };

  const hasDiscount = selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price;
  const discountPercentage = hasDiscount 
    ? calculateDiscount(selectedVariant.originalPrice!, selectedVariant.price)
    : 0;

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-gray-700 transition-colors group">
      {/* Book Image & Discount Badge */}
      <div className="relative w-full h-[250px] bg-gray-800">
        {book.bookImage.close && (
          <Image
            src={book.bookImage.close}
            alt={`${book.bookTitle} - ${book.bookSubHeading}`}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}%
            </div>
          </div>
        )}

      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-trickordead text-white mb-1 group-hover:text-orange-400 transition-colors">
            {book.bookTitle}
          </h3>
          <p className="text-gray-400 text-sm leading-tight">{book.bookSubHeading}</p>
        </div>

        {/* Format Selection */}
        {book.directSales.variants.length > 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Format:
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as "paperback" | "hardcover" | "ebook" | "audiobook")}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
            >
              {book.directSales.variants.map((variant) => (
                <option key={variant.format} value={variant.format}>
                  {formatDisplayName(variant.format)}
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

        {/* Features for different formats */}
        <div className="text-xs text-gray-400 leading-tight">
          {selectedVariant.format === 'paperback' && "📖 Can be signed & personalized"}
          {selectedVariant.format === 'hardcover' && "📘 Premium hardcover • Can be signed"}
          {selectedVariant.format === 'ebook' && "📱 Instant download • All devices"}
          {selectedVariant.format === 'audiobook' && "🎧 Professional narration • Instant download"}
        </div>

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
          
          <Link href={`/book/${book.bookSlug}`}>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              Details
            </button>
          </Link>
        </div>

        {/* Additional Info */}
        {selectedVariant.isbn && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
            ISBN: {selectedVariant.isbn}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;