import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const kitApiKey = process.env.KIT_API_KEY;
    if (!kitApiKey) {
      console.error('KIT_API_KEY not found in environment variables');
      return NextResponse.json({ error: 'Kit API key not configured' }, { status: 500 });
    }

    // Add subscriber to Kit (ConvertKit)
    const response = await fetch('https://api.convertkit.com/v3/tags/8579692/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: kitApiKey,
        email: email,
        first_name: firstName || '',
        last_name: lastName || '',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Kit API error:', errorData);
      return NextResponse.json({ error: 'Failed to add to Kit' }, { status: 500 });
    }

    const data = await response.json();
    console.log('Successfully added to Kit:', email);

    return NextResponse.json({
      success: true,
      message: 'Successfully added to Kit',
      data
    });

  } catch (error) {
    console.error('Error adding to Kit:', error);
    return NextResponse.json(
      { error: 'Failed to add to Kit' },
      { status: 500 }
    );
  }
}