import { stripe } from '@/src/lib/utils/stripe/config';
import { createClient } from '@/src/lib/utils/supabase/server';
import { createOrRetrieveCustomer } from '@/src/lib/utils/supabase/admin';
import { getURL } from '@/src/lib/utils/helpers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { price, quantity = 1, metadata = {} } = await request.json();

  try {
    const supabase = createClient();
    
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Could not get user session.' },
        { status: 401 }
      );
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user.id || '',
      email: user.email || ''
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity
        }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        metadata
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}/pricing`
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: { statusCode: 500, message: err.message } },
      { status: 500 }
    );
  }
}