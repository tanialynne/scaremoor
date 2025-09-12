"use client";

import React, { useState } from 'react';
import Books from '../../constants/Books';
import Products, { getAllActiveProducts, getProductsByCategory } from '../../constants/Products';
import ProductCard from '../ProductCard';
import GenericProductCard from '../GenericProductCard';

const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get books with direct sales enabled
  const availableBooks = Books.filter(book => book.directSales?.enabled);
  
  // Get all other products
  const otherProducts = getAllActiveProducts();

  // Filter products based on selected category
  const getFilteredProducts = () => {
    switch (selectedCategory) {
      case 'books':
        return { books: availableBooks, products: [] };
      case 'worksheets':
        return { books: [], products: getProductsByCategory('worksheets') };
      case 'merchandise':
        return { books: [], products: getProductsByCategory('merchandise') };
      case 'all':
      default:
        return { books: availableBooks, products: otherProducts };
    }
  };

  const { books, products } = getFilteredProducts();
  const totalProducts = books.length + products.length;

  if (totalProducts === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">No products available for direct sale at this time.</p>
        <p className="text-gray-300 text-sm">
          Check back soon or visit our external retailers!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { key: 'all', label: 'All Products' },
          { key: 'books', label: 'Books' },
          { key: 'worksheets', label: 'Worksheets' },
          { key: 'merchandise', label: 'Merchandise' }
        ].map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.key
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Books */}
        {books.map((book) => (
          <ProductCard key={book.bookSlug} book={book} />
        ))}
        
        {/* Other Products */}
        {products.map((product) => (
          <GenericProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;