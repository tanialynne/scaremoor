const PRINTFUL_API_BASE = 'https://api.printful.com';

export interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface PrintfulVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  main_category_id: number;
  warehouse_product_variant_id: number | null;
  retail_price: string;
  sku: string;
  currency: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    hash: string;
    url: string;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
  }>;
  options: Array<{
    id: string;
    value: string;
  }>;
  is_ignored: boolean;
}

class PrintfulAPI {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.PRINTFUL_API_KEY || '';
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${PRINTFUL_API_BASE}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  }

  // Get all sync products
  async getProducts(): Promise<PrintfulProduct[]> {
    return this.request('/store/products');
  }

  // Get product details with variants
  async getProduct(productId: number): Promise<{
    sync_product: PrintfulProduct;
    sync_variants: PrintfulVariant[];
  }> {
    return this.request(`/store/products/${productId}`);
  }

  // Get all variants for a product
  async getProductVariants(productId: number): Promise<PrintfulVariant[]> {
    const product = await this.getProduct(productId);
    return product.sync_variants;
  }

  // Search products by name or external ID
  async searchProducts(query: string): Promise<PrintfulProduct[]> {
    const products = await this.getProducts();
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.external_id?.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Get shipping rates for an order
  async getShippingRates(recipient: {
    country_code: string;
    state_code?: string;
    city?: string;
    zip?: string;
  }, items: Array<{
    external_id: string;
    quantity: number;
  }>) {
    return this.request('/shipping/rates', {
      method: 'POST',
      body: JSON.stringify({
        recipient,
        items,
      }),
    });
  }

  // Create an order
  async createOrder(orderData: {
    recipient: {
      name: string;
      company?: string;
      address1: string;
      address2?: string;
      city: string;
      state_code: string;
      country_code: string;
      zip: string;
      phone?: string;
      email: string;
    };
    items: Array<{
      external_id: string;
      quantity: number;
    }>;
    external_id?: string;
  }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Get order details
  async getOrder(orderId: number) {
    return this.request(`/orders/${orderId}`);
  }

  // Confirm order (actually place it for fulfillment)
  async confirmOrder(orderId: number) {
    return this.request(`/orders/${orderId}/confirm`, {
      method: 'POST',
    });
  }
}

export const printfulAPI = new PrintfulAPI();