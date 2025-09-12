"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Book } from '../../constants/Books';
import { formatPrice, calculateDiscount } from '../../constants/DirectSales';
import Button from '../Button';

import OrangeBackground from '../../../../public/images/orangeBackground.png';

interface BookPurchaseOptionsProps {
  book: Book;
  onPurchaseClick?: () => void;
}

const BookPurchaseOptions: React.FC<BookPurchaseOptionsProps> = ({ book, onPurchaseClick }) => {
  const { addItem } = useCart();
  const [selectedFormat, setSelectedFormat] = useState(
    book.directSales?.variants[0]?.format || 'paperback'
  );

  const hasDirectSales = book.directSales?.enabled && book.directSales.variants.length > 0;

  const selectedVariant = hasDirectSales 
    ? book.directSales!.variants.find(variant => variant.format === selectedFormat) || book.directSales!.variants[0]
    : null;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
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

  const hasDiscount = selectedVariant?.originalPrice && selectedVariant.originalPrice > selectedVariant.price;
  const discountPercentage = hasDiscount 
    ? calculateDiscount(selectedVariant.originalPrice!, selectedVariant.price)
    : 0;

  if (!hasDirectSales) {
    // Fallback to Amazon only
    return (
      <Link
        href={book.purchaseLink}
        rel="noreferrer"
        target="_blank"
        onClick={onPurchaseClick}
      >
        <Button
          buttonImage={OrangeBackground}
          altText="buy-amazon"
          text="Buy Now on Amazon"
        />
      </Link>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-trickordead text-white mb-4">Buy Direct & Save</h3>
        
        {/* Format Selection */}
        {book.directSales!.variants.length > 1 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Format:
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as "paperback" | "hardcover" | "ebook" | "audiobook")}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none"
            >
              {book.directSales!.variants.map((variant) => (
                <option key={variant.format} value={variant.format}>
                  {formatDisplayName(variant.format)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Pricing */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-orange-400">
            {formatPrice(selectedVariant!.price)}
          </span>
          {hasDiscount && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(selectedVariant!.originalPrice!)}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Features for different formats */}
        <div className="text-xs text-gray-400 text-center mb-4">
          {selectedVariant!.format === 'paperback' && "📖 Can be signed & personalized"}
          {selectedVariant!.format === 'hardcover' && "📘 Premium hardcover • Can be signed"}
          {selectedVariant!.format === 'ebook' && "📱 Instant download • All devices"}
          {selectedVariant!.format === 'audiobook' && "🎧 Professional narration • Instant download"}
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant!.inStock}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg font-medium"
          >
            <ShoppingCart className="w-5 h-5" />
            {selectedVariant!.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>

      {/* Alternative Purchase Option */}
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-3">Or buy from your preferred retailer:</p>
        <Link
          href={book.purchaseLink}
          rel="noreferrer"
          target="_blank"
          onClick={onPurchaseClick}
          className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          Buy on Amazon
        </Link>
      </div>
    </div>
  );
};

export default BookPurchaseOptions;