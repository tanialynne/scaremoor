import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../lib/stripe-server';
import { CartItem } from '../../constants/DirectSales';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export async function POST(req: NextRequest) {
  try {
    const { items, customerData }: { items: CartItem[]; customerData: CustomerData } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Calculate total amount in cents including shipping and tax
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 35 ? 0 : 4.99; // Free shipping over $35
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + shipping + tax;
    const amount = Math.round(total * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_name: `${customerData.firstName} ${customerData.lastName}`,
        customer_email: customerData.email,
        customer_phone: customerData.phone,
        items: JSON.stringify(items.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          title: item.title,
          variantName: item.variantName,
          quantity: item.quantity,
          price: item.price,
        }))),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}