import { StaticImageData } from "next/image";

// Product formats available for direct sale
export type ProductFormat = "paperback" | "hardcover" | "ebook" | "audiobook" | "bundle";

// Product variant (different formats of the same book)
export interface ProductVariant {
  id: string;
  format: ProductFormat;
  price: number;
  originalPrice?: number; // For showing discounts
  inStock: boolean;
  inventory?: number; // Optional inventory tracking
  description?: string;
  downloadUrl?: string; // For digital products
  fileSize?: string; // For digital products (e.g., "2.5 MB")
  isbn?: string;
  weight?: number; // For shipping calculations (in grams)
}

// Direct sales product data
export interface DirectSalesProduct {
  bookSlug: string; // Links to existing book
  isDirectSaleEnabled: boolean;
  variants: ProductVariant[];
  shippingRequired: boolean; // False for digital-only products
  taxable: boolean;
  category: string; // e.g., "Books", "Merchandise"
  tags: string[]; // For filtering/search
}

// Shopping cart item (updated to handle books and products)
export interface CartItem {
  productId: string; // bookSlug or productId
  variantId: string;
  quantity: number;
  title: string; // Product or book title
  variantName: string; // Format for books, variant name for products
  price: number;
  image?: StaticImageData;
  category?: string; // "books", "worksheets", "merchandise", etc.
}

// Direct sales configuration
export interface DirectSalesConfig {
  paymentMethods: string[]; // e.g., ["stripe", "paypal", "square"]
  currencies: string[];
  defaultCurrency: string;
  shippingZones: ShippingZone[];
  taxRates: TaxRate[];
  digitalDelivery: boolean;
  physicalShipping: boolean;
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  rates: ShippingRate[];
}

export interface ShippingRate {
  name: string; // e.g., "Standard", "Express"
  price: number;
  freeThreshold?: number; // Free shipping over this amount
  estimatedDays: string; // e.g., "5-7 business days"
}

export interface TaxRate {
  region: string;
  rate: number; // Percentage (e.g., 0.08 for 8%)
  name: string; // e.g., "Sales Tax", "VAT"
}

// Order data structure
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customerEmail: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export type OrderStatus = 
  | "pending" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled" 
  | "refunded";

// Default configuration for demo purposes
export const DIRECT_SALES_CONFIG: DirectSalesConfig = {
  paymentMethods: ["stripe"], // Simplified for demo
  currencies: ["USD"],
  defaultCurrency: "USD",
  digitalDelivery: true,
  physicalShipping: true,
  shippingZones: [
    {
      id: "us",
      name: "United States",
      countries: ["US"],
      rates: [
        {
          name: "Standard",
          price: 4.99,
          freeThreshold: 35.00,
          estimatedDays: "5-7 business days"
        },
        {
          name: "Express",
          price: 9.99,
          estimatedDays: "2-3 business days"
        }
      ]
    },
    {
      id: "international",
      name: "International",
      countries: ["*"], // All other countries
      rates: [
        {
          name: "International Standard",
          price: 12.99,
          estimatedDays: "10-15 business days"
        }
      ]
    }
  ],
  taxRates: [
    {
      region: "US",
      rate: 0.08,
      name: "Sales Tax"
    }
  ]
};

// Helper functions for formatting
export const formatPrice = (price: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
};

export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};