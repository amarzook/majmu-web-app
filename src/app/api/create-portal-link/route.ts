import { stripe } from '@/src/lib/utils/stripe/config';
import { createClient } from '@/src/lib/utils/supabase/server';
import { createOrRetrieveCustomer } from '@/src/lib/utils/supabase/admin';
import { getURL } from '@/src/lib/utils/helpers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
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

    if (!customer) {
      return NextResponse.json(
        { error: 'Could not get customer.' },
        { status: 500 }
      );
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`
    });

    return NextResponse.json({ url });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: { statusCode: 500, message: err.message } },
      { status: 500 }
    );
  }
}