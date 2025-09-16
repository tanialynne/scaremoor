import { StaticImageData } from "next/image";

export type ProductCategory = "books" | "worksheets" | "merchandise" | "digital" | "courses";

export type ProductType = "physical" | "digital" | "bundle";

export interface BaseProduct {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: ProductCategory;
  type: ProductType;
  image: StaticImageData;
  gallery?: StaticImageData[];
  isActive: boolean;
  isFeatured?: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "PDF Download", "Physical Print", "XL", "Red"
  price: number;
  originalPrice?: number;
  inStock: boolean;
  inventory?: number;
  sku?: string;
  weight?: number; // for shipping
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  downloadUrl?: string; // for digital products
  fileSize?: string;
}

export interface Product extends BaseProduct {
  variants: ProductVariant[];
  relatedProducts?: string[]; // Product IDs
  minAge?: number;
  maxAge?: number;
  targetAudience?: string[];
  features?: string[];
  requirements?: string[]; // e.g., "Requires printer", "Compatible with iPad"
}

// Import book cover images for worksheets/merchandise
import WorksheetCover from "../../../public/images/books/haunted-locker-flat.png";
import TShirtImage from "../../../public/images/books/phantom-playground-flat.png";
import BookmarkImage from "../../../public/images/books/changing-portrait-flat.png";
import StickerImage from "../../../public/images/books/living-vines-flat.png";

// Sample products for different categories
const Products: Product[] = [
  // Worksheets & Educational Materials
  {
    id: "scaremoor-activity-pack",
    slug: "scaremoor-activity-pack",
    title: "SCAREMOOR Activity Pack",
    subtitle: "Spooky Fun for Young Readers",
    description: "A collection of 20+ printable activities including word searches, crosswords, creative writing prompts, and drawing challenges based on the SCAREMOOR book series. Perfect for classrooms, homeschooling, or rainy day fun!",
    category: "worksheets",
    type: "digital",
    image: WorksheetCover,
    isActive: true,
    isFeatured: true,
    tags: ["printable", "activities", "educational", "kids", "horror"],
    minAge: 8,
    maxAge: 14,
    targetAudience: ["students", "teachers", "parents", "homeschoolers"],
    features: [
      "20+ printable activities",
      "PDF format - print at home",
      "Educational and entertaining",
      "Based on SCAREMOOR series",
      "Answer keys included"
    ],
    requirements: ["Printer required", "PDF reader"],
    variants: [
      {
        id: "activity-pack-pdf",
        name: "PDF Download",
        price: 9.99,
        originalPrice: 12.99,
        inStock: true,
        downloadUrl: "/downloads/scaremoor-activity-pack.pdf",
        fileSize: "15.2 MB"
      }
    ]
  },
  {
    id: "reading-comprehension-worksheets",
    slug: "reading-comprehension-worksheets",
    title: "Reading Comprehension Worksheets",
    subtitle: "Boost Reading Skills with SCAREMOOR",
    description: "10 professionally designed reading comprehension worksheets featuring excerpts from the SCAREMOOR series. Includes multiple choice, short answer, and creative response questions.",
    category: "worksheets",
    type: "digital",
    image: WorksheetCover,
    isActive: true,
    tags: ["education", "reading", "comprehension", "teachers"],
    minAge: 8,
    maxAge: 12,
    targetAudience: ["teachers", "tutors", "homeschoolers"],
    features: [
      "10 comprehensive worksheets",
      "Multiple question types",
      "Teacher answer keys",
      "Aligned with reading standards",
      "Printable PDF format"
    ],
    variants: [
      {
        id: "comprehension-pdf",
        name: "PDF Download",
        price: 7.99,
        inStock: true,
        downloadUrl: "/downloads/reading-comprehension.pdf",
        fileSize: "8.5 MB"
      }
    ]
  },

  // Merchandise
  {
    id: "scaremoor-t-shirt",
    slug: "scaremoor-t-shirt",
    title: "SCAREMOOR T-Shirt",
    subtitle: "Official Series Merchandise",
    description: "Show your love for spine-tingling stories with this official SCAREMOOR t-shirt. Features the iconic series logo on a comfortable, high-quality cotton blend tee.",
    category: "merchandise",
    type: "physical",
    image: TShirtImage,
    isActive: true,
    isFeatured: true,
    tags: ["t-shirt", "merchandise", "cotton", "unisex"],
    targetAudience: ["fans", "readers", "kids", "adults"],
    features: [
      "100% cotton blend",
      "Pre-shrunk fabric",
      "Official series design",
      "Unisex sizing",
      "Machine washable"
    ],
    variants: [
      {
        id: "tshirt-small",
        name: "Small",
        price: 19.99,
        inStock: true,
        inventory: 25,
        sku: "SCMR-TEE-SM",
        weight: 150
      },
      {
        id: "tshirt-medium",
        name: "Medium",
        price: 19.99,
        inStock: true,
        inventory: 30,
        sku: "SCMR-TEE-MD",
        weight: 155
      },
      {
        id: "tshirt-large",
        name: "Large",
        price: 19.99,
        inStock: true,
        inventory: 35,
        sku: "SCMR-TEE-LG",
        weight: 160
      },
      {
        id: "tshirt-xl",
        name: "X-Large",
        price: 21.99,
        inStock: true,
        inventory: 20,
        sku: "SCMR-TEE-XL",
        weight: 165
      }
    ]
  },
  {
    id: "scaremoor-bookmarks",
    slug: "scaremoor-bookmarks",
    title: "SCAREMOOR Bookmark Set",
    subtitle: "Never Lose Your Place in a Good Scare",
    description: "Set of 6 premium bookmarks featuring artwork from each book in the SCAREMOOR series. Printed on durable cardstock with a matte finish.",
    category: "merchandise",
    type: "physical",
    image: BookmarkImage,
    isActive: true,
    tags: ["bookmarks", "set", "collectible", "readers"],
    targetAudience: ["readers", "collectors", "students"],
    features: [
      "Set of 6 unique designs",
      "Heavy-duty cardstock",
      "Matte finish coating",
      "Standard bookmark size",
      "Features all series books"
    ],
    variants: [
      {
        id: "bookmark-set",
        name: "Set of 6",
        price: 12.99,
        originalPrice: 15.99,
        inStock: true,
        inventory: 50,
        sku: "SCMR-BM-SET",
        weight: 25
      }
    ]
  },
  {
    id: "scaremoor-sticker-pack",
    slug: "scaremoor-sticker-pack",
    title: "SCAREMOOR Sticker Pack",
    subtitle: "Spooky Stickers for Every Fan",
    description: "Collection of 20 vinyl stickers featuring characters, quotes, and imagery from the SCAREMOOR series. Weather-resistant and perfect for laptops, water bottles, and more!",
    category: "merchandise",
    type: "physical",
    image: StickerImage,
    isActive: true,
    tags: ["stickers", "vinyl", "weatherproof", "collectible"],
    targetAudience: ["kids", "teens", "fans"],
    features: [
      "20 unique stickers",
      "High-quality vinyl",
      "Weather-resistant",
      "Various sizes (1-3 inches)",
      "Easy peel-and-stick"
    ],
    variants: [
      {
        id: "sticker-pack",
        name: "Pack of 20",
        price: 8.99,
        inStock: true,
        inventory: 100,
        sku: "SCMR-STK-20",
        weight: 50
      }
    ]
  }
];

export default Products;

// Helper functions
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return Products.filter(product => product.category === category && product.isActive);
};

export const getFeaturedProducts = (): Product[] => {
  return Products.filter(product => product.isFeatured && product.isActive);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return Products.find(product => product.slug === slug);
};

export const getAllActiveProducts = (): Product[] => {
  return Products.filter(product => product.isActive);
};