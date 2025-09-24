import { NextRequest, NextResponse } from 'next/server';
import { printfulAPI } from '../../../lib/printful';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    const search = searchParams.get('search');

    if (productId) {
      // Get specific product with variants
      const product = await printfulAPI.getProduct(parseInt(productId));
      return NextResponse.json(product);
    } else if (search) {
      // Search products
      const products = await printfulAPI.searchProducts(search);
      return NextResponse.json(products);
    } else {
      // Get all products
      const products = await printfulAPI.getProducts();
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error('Printful API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products from Printful' },
      { status: 500 }
    );
  }
}